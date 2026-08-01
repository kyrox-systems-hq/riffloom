/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { STRINGS } from './guitar-model.js';

const STRING_PROFILES = Object.freeze([
  { gain: 1.34, decay: 3.6, harmonics: [[1, 0.36], [2, 0.42], [3, 0.28], [4, 0.18], [6, 0.10]] },
  { gain: 1.23, decay: 3.3, harmonics: [[1, 0.43], [2, 0.37], [3, 0.23], [4, 0.13]] },
  { gain: 1.13, decay: 3.0, harmonics: [[1, 0.50], [2, 0.31], [3, 0.18], [4, 0.09]] },
  { gain: 1.06, decay: 2.7, harmonics: [[1, 0.56], [2, 0.27], [3, 0.14], [4, 0.06]] },
  { gain: 0.98, decay: 2.4, harmonics: [[1, 0.63], [2, 0.22], [3, 0.09]] },
  { gain: 0.91, decay: 2.2, harmonics: [[1, 0.68], [2, 0.19], [3, 0.07]] },
]);

function frequencyFromMidi(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function clamp(value, minimum, maximum) {
  return Math.max(minimum, Math.min(maximum, value));
}

export class GuitarSoundEngine {
  constructor() {
    this.context = null;
    this.master = null;
    this.compressor = null;
    this.analyser = null;
    this.analyserData = null;
    this.voices = new Map();
    this.globalPalmMute = 0;
    this.lastPeak = 0;
  }

  ensureStarted() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;

    if (!this.context) {
      try {
        this.context = new AudioContextClass({ latencyHint: 'interactive' });
      } catch {
        this.context = new AudioContextClass();
      }

      this.master = this.context.createGain();
      this.compressor = this.context.createDynamicsCompressor();
      this.analyser = this.context.createAnalyser();
      this.analyser.fftSize = 512;
      this.analyserData = new Uint8Array(this.analyser.fftSize);

      this.master.gain.value = 0.72;
      this.compressor.threshold.value = -23;
      this.compressor.knee.value = 18;
      this.compressor.ratio.value = 5;
      this.compressor.attack.value = 0.002;
      this.compressor.release.value = 0.2;

      this.master.connect(this.compressor);
      this.compressor.connect(this.analyser);
      this.analyser.connect(this.context.destination);
    }

    if (this.context.state === 'suspended') void this.context.resume();
    return this.context;
  }

  status() {
    return this.context?.state ?? 'locked';
  }

  isRinging(stringId) {
    const voice = this.voices.get(stringId);
    return Boolean(voice && !voice.stopped);
  }

  currentMidi(stringId) {
    return this.voices.get(stringId)?.midi ?? null;
  }

  createNoise(durationSeconds) {
    const length = Math.max(1, Math.round(this.context.sampleRate * durationSeconds));
    const buffer = this.context.createBuffer(1, length, this.context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let index = 0; index < length; index += 1) {
      const envelope = 1 - index / length;
      data[index] = (Math.random() * 2 - 1) * envelope;
    }
    return buffer;
  }

  playAttack({ velocity, pickPosition, direction, muted = false }) {
    const context = this.ensureStarted();
    if (!context) return;
    const now = context.currentTime;
    const duration = muted ? 0.085 : 0.038;
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();

    source.buffer = this.createNoise(duration);
    filter.type = muted ? 'bandpass' : 'highpass';
    filter.frequency.value = muted
      ? 900 + pickPosition * 1700
      : 1050 + pickPosition * 3600 + (direction === 'up' ? 450 : 0);
    filter.Q.value = muted ? 0.9 : 0.45;

    const directionLevel = direction === 'down' ? 1 : direction === 'up' ? 0.84 : 0.92;
    const peak = (muted ? 0.18 : 0.055) * velocity * directionLevel;
    gain.gain.setValueAtTime(Math.max(0.0001, peak), now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    source.start(now);
  }

  playMuted(stringId, options = {}) {
    const velocity = clamp(options.velocity ?? 0.85, 0.25, 1.25);
    const pickPosition = clamp(options.pickPosition ?? 0.55, 0, 1);
    this.playAttack({
      velocity: velocity * STRING_PROFILES[stringId].gain,
      pickPosition,
      direction: options.direction ?? 'neutral',
      muted: true,
    });
  }

  pluck(stringId, midi, options = {}) {
    const context = this.ensureStarted();
    if (!context) return false;
    const profile = STRING_PROFILES[stringId];
    if (!profile) throw new RangeError(`Invalid guitar string: ${stringId}`);

    this.stopString(stringId, 0.025);

    if (options.muted) {
      this.playMuted(stringId, options);
      return true;
    }

    const now = context.currentTime;
    const velocity = clamp(options.velocity ?? 0.82, 0.2, 1.25);
    const pickPosition = clamp(options.pickPosition ?? 0.55, 0, 1);
    const palmDepth = clamp(Math.max(this.globalPalmMute, options.palmMute ?? 0), 0, 1);
    const direction = options.direction ?? 'neutral';
    const directionGain = direction === 'down' ? 1 : direction === 'up' ? 0.9 : 0.95;
    const baseFrequency = frequencyFromMidi(midi);

    const voiceGain = context.createGain();
    const toneFilter = context.createBiquadFilter();
    const bodyFilter = context.createBiquadFilter();
    const oscillators = [];

    toneFilter.type = 'lowpass';
    toneFilter.frequency.value = this.cutoffFor(pickPosition, palmDepth, direction);
    toneFilter.Q.value = 0.35;
    bodyFilter.type = 'peaking';
    bodyFilter.frequency.value = 190 + stringId * 45;
    bodyFilter.Q.value = 0.7;
    bodyFilter.gain.value = 2.2;

    const peak = clamp(0.105 * profile.gain * velocity * directionGain, 0.025, 0.18);
    const decay = this.decayFor(profile.decay, palmDepth);
    voiceGain.gain.setValueAtTime(0.0001, now);
    voiceGain.gain.exponentialRampToValueAtTime(peak, now + 0.006);
    voiceGain.gain.exponentialRampToValueAtTime(peak * 0.52, now + 0.11);
    voiceGain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

    voiceGain.connect(toneFilter);
    toneFilter.connect(bodyFilter);
    bodyFilter.connect(this.master);

    profile.harmonics.forEach(([multiple, level], index) => {
      const oscillator = context.createOscillator();
      const harmonicGain = context.createGain();
      oscillator.type = index === 0 ? 'triangle' : 'sine';
      oscillator.frequency.value = baseFrequency * multiple;
      harmonicGain.gain.value = level;
      oscillator.connect(harmonicGain);
      harmonicGain.connect(voiceGain);
      oscillator.start(now);
      oscillator.stop(now + Math.max(decay + 0.12, 0.3));
      oscillators.push({ oscillator, multiple });
    });

    this.playAttack({ velocity, pickPosition, direction, muted: false });

    this.voices.set(stringId, {
      stringId,
      midi,
      gain: voiceGain,
      toneFilter,
      oscillators,
      bendCents: 0,
      pickPosition,
      palmDepth,
      profile,
      stopped: false,
      startedAt: now,
      nominalPeak: peak,
    });
    return true;
  }

  cutoffFor(pickPosition, palmDepth, direction = 'neutral') {
    const directionBrightness = direction === 'up' ? 450 : direction === 'down' ? -120 : 0;
    return clamp(2300 + pickPosition * 6200 + directionBrightness - palmDepth * 5100, 650, 9000);
  }

  decayFor(baseDecay, palmDepth) {
    return clamp(baseDecay * (1 - palmDepth * 0.9), 0.13, baseDecay);
  }

  articulate(stringId, midi, type, options = {}) {
    const voice = this.voices.get(stringId);
    const velocity = clamp(options.velocity ?? 0.72, 0.2, 1.15);
    if (!voice || voice.stopped) {
      return this.pluck(stringId, midi, {
        velocity: velocity * (type === 'hammer-on' ? 0.68 : 0.58),
        direction: 'neutral',
        pickPosition: 0.52,
        palmMute: this.globalPalmMute,
      });
    }

    const context = this.ensureStarted();
    const now = context.currentTime;
    const duration = type === 'slide'
      ? clamp(options.duration ?? 0.14, 0.035, 0.65)
      : type === 'hammer-on' ? 0.032 : 0.045;
    const newFrequency = frequencyFromMidi(midi);

    voice.oscillators.forEach(({ oscillator, multiple }) => {
      oscillator.frequency.cancelScheduledValues(now);
      oscillator.frequency.setValueAtTime(frequencyFromMidi(voice.midi) * multiple, now);
      oscillator.frequency.exponentialRampToValueAtTime(newFrequency * multiple, now + duration);
    });

    voice.gain.gain.cancelScheduledValues(now);
    const current = Math.max(voice.gain.gain.value, 0.0001);
    const bumpMultiplier = type === 'hammer-on' ? 0.72 : type === 'pull-off' ? 0.56 : 0.48;
    const bump = Math.max(current, voice.nominalPeak * bumpMultiplier * velocity);
    voice.gain.gain.setValueAtTime(current, now);
    voice.gain.gain.linearRampToValueAtTime(bump, now + Math.min(duration, 0.035));
    const decay = this.decayFor(voice.profile.decay, Math.max(this.globalPalmMute, voice.palmDepth));
    voice.gain.gain.exponentialRampToValueAtTime(0.0001, now + Math.max(0.16, decay * 0.68));

    if (type !== 'slide') {
      this.playAttack({
        velocity: velocity * (type === 'hammer-on' ? 0.25 : 0.18),
        pickPosition: voice.pickPosition,
        direction: 'neutral',
        muted: false,
      });
    }

    voice.midi = midi;
    return true;
  }

  bend(stringId, cents, transitionSeconds = 0.025) {
    const voice = this.voices.get(stringId);
    if (!voice || voice.stopped || !this.context) return false;
    const target = clamp(cents, -40, 400);
    const now = this.context.currentTime;
    voice.oscillators.forEach(({ oscillator }) => {
      oscillator.detune.cancelScheduledValues(now);
      oscillator.detune.setTargetAtTime(target, now, Math.max(0.006, transitionSeconds));
    });
    voice.bendCents = target;
    return true;
  }

  releaseBend(stringId, seconds = 0.07) {
    return this.bend(stringId, 0, seconds);
  }

  setPalmMuteDepth(depth) {
    this.globalPalmMute = clamp(depth, 0, 1);
    if (!this.context) return;
    const now = this.context.currentTime;
    for (const voice of this.voices.values()) {
      if (voice.stopped) continue;
      const combined = Math.max(this.globalPalmMute, voice.palmDepth);
      voice.toneFilter.frequency.setTargetAtTime(
        this.cutoffFor(voice.pickPosition, combined),
        now,
        0.02,
      );
      if (combined > 0.55) {
        const release = this.decayFor(voice.profile.decay, combined);
        voice.gain.gain.cancelScheduledValues(now);
        voice.gain.gain.setValueAtTime(Math.max(voice.gain.gain.value, 0.0001), now);
        voice.gain.gain.exponentialRampToValueAtTime(0.0001, now + release);
      }
    }
  }

  stopString(stringId, release = 0.06) {
    const voice = this.voices.get(stringId);
    if (!voice || voice.stopped) return;
    voice.stopped = true;
    if (!this.context) {
      this.voices.delete(stringId);
      return;
    }
    const now = this.context.currentTime;
    voice.gain.gain.cancelScheduledValues(now);
    voice.gain.gain.setValueAtTime(Math.max(voice.gain.gain.value, 0.0001), now);
    voice.gain.gain.exponentialRampToValueAtTime(0.0001, now + release);
    window.setTimeout(() => {
      if (this.voices.get(stringId) === voice) this.voices.delete(stringId);
    }, (release + 0.08) * 1000);
  }

  stopAll(release = 0.05) {
    for (const string of STRINGS) this.stopString(string.id, release);
  }

  peakLevel() {
    if (!this.analyser || !this.analyserData) return 0;
    this.analyser.getByteTimeDomainData(this.analyserData);
    let sum = 0;
    this.analyserData.forEach((value) => {
      const normalised = (value - 128) / 128;
      sum += normalised * normalised;
    });
    const level = clamp(Math.round(Math.sqrt(sum / this.analyserData.length) * 520), 0, 100);
    this.lastPeak = level;
    return level;
  }
}
