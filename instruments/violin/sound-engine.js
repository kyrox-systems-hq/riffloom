/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { VIOLIN_STRINGS } from './violin-model.js';

function midiToFrequency(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

export class ViolinSoundEngine {
  constructor() {
    this.context = null;
    this.master = null;
    this.analyser = null;
    this.analyserData = null;
    this.bowVoices = new Map();
    this.pluckVoices = new Map();
  }

  ensureContext() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;

    if (!this.context) {
      try {
        this.context = new AudioContextClass({ latencyHint: 'interactive' });
      } catch {
        this.context = new AudioContextClass();
      }

      this.master = this.context.createGain();
      const compressor = this.context.createDynamicsCompressor();
      this.analyser = this.context.createAnalyser();
      this.analyser.fftSize = 512;
      this.analyserData = new Uint8Array(this.analyser.fftSize);

      compressor.threshold.value = -20;
      compressor.knee.value = 18;
      compressor.ratio.value = 4.5;
      compressor.attack.value = 0.003;
      compressor.release.value = 0.22;
      this.master.gain.value = 0.72;

      this.master.connect(compressor);
      compressor.connect(this.analyser);
      this.analyser.connect(this.context.destination);
    }

    if (this.context.state === 'suspended') void this.context.resume();
    return this.context;
  }

  status() {
    return this.context ? this.context.state : 'Locked';
  }

  createNoiseSource(duration = 2) {
    const context = this.ensureContext();
    const length = Math.max(1, Math.round(context.sampleRate * duration));
    const buffer = context.createBuffer(1, length, context.sampleRate);
    const channel = buffer.getChannelData(0);
    for (let index = 0; index < length; index += 1) {
      channel[index] = Math.random() * 2 - 1;
    }
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    return source;
  }

  createBowVoice(stringId, midi) {
    const context = this.ensureContext();
    if (!context) return null;

    const now = context.currentTime;
    const voiceGain = context.createGain();
    const bodyFilter = context.createBiquadFilter();
    const presenceFilter = context.createBiquadFilter();
    const noiseFilter = context.createBiquadFilter();
    const noiseGain = context.createGain();
    const pan = context.createStereoPanner ? context.createStereoPanner() : null;

    bodyFilter.type = 'bandpass';
    bodyFilter.frequency.value = 620 + stringId * 210;
    bodyFilter.Q.value = 0.55;

    presenceFilter.type = 'lowpass';
    presenceFilter.frequency.value = 5200;
    presenceFilter.Q.value = 0.35;

    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 1500 + stringId * 320;
    noiseFilter.Q.value = 1.1;

    voiceGain.gain.setValueAtTime(0.0001, now);
    noiseGain.gain.setValueAtTime(0.0001, now);

    const oscillators = [
      { ratio: 1, type: 'sawtooth', level: 0.42 },
      { ratio: 2, type: 'triangle', level: 0.22 },
      { ratio: 3, type: 'sine', level: 0.12 },
      { ratio: 4, type: 'sine', level: 0.055 },
    ].map((definition) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = definition.type;
      oscillator.frequency.value = midiToFrequency(midi) * definition.ratio;
      gain.gain.value = definition.level;
      oscillator.connect(gain);
      gain.connect(voiceGain);
      oscillator.start(now);
      return { oscillator, gain, ratio: definition.ratio };
    });

    const noise = this.createNoiseSource();
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(voiceGain);
    noise.start(now);

    voiceGain.connect(bodyFilter);
    bodyFilter.connect(presenceFilter);
    if (pan) {
      pan.pan.value = -0.3 + stringId * 0.2;
      presenceFilter.connect(pan);
      pan.connect(this.master);
    } else {
      presenceFilter.connect(this.master);
    }

    const voice = {
      stringId,
      midi,
      oscillators,
      noise,
      noiseGain,
      voiceGain,
      bodyFilter,
      presenceFilter,
      pan,
      stopped: false,
      lastBowAt: performance.now(),
    };
    this.bowVoices.set(stringId, voice);
    return voice;
  }

  bow(stringId, midi, options = {}) {
    const context = this.ensureContext();
    if (!context) return;

    const velocity = clamp(options.velocity ?? 0.65, 0, 1.25);
    const pressure = clamp(options.pressure ?? 0.55, 0, 1);
    const contact = clamp(options.contact ?? 0.5, 0, 1);
    const direction = options.direction ?? 'down';
    const now = context.currentTime;

    let voice = this.bowVoices.get(stringId);
    if (!voice || voice.stopped) voice = this.createBowVoice(stringId, midi);
    if (!voice) return;

    voice.lastBowAt = performance.now();
    voice.midi = midi;
    const fundamental = midiToFrequency(midi);
    voice.oscillators.forEach(({ oscillator, ratio }) => {
      oscillator.frequency.setTargetAtTime(fundamental * ratio, now, 0.012);
    });

    const stringBalance = [1.08, 1.02, 0.98, 0.94][stringId] ?? 1;
    const bowLevel = Math.max(0.0001, velocity * (0.055 + pressure * 0.09) * stringBalance);
    voice.voiceGain.gain.cancelScheduledValues(now);
    voice.voiceGain.gain.setTargetAtTime(bowLevel, now, 0.018);

    const friction = Math.max(0.0001, velocity * (0.008 + pressure * 0.032));
    voice.noiseGain.gain.cancelScheduledValues(now);
    voice.noiseGain.gain.setTargetAtTime(friction, now, 0.018);

    voice.presenceFilter.frequency.setTargetAtTime(2600 + contact * 6500 + pressure * 900, now, 0.025);
    voice.bodyFilter.frequency.setTargetAtTime(520 + stringId * 200 + pressure * 130, now, 0.03);

    if (voice.pan) {
      const directionShift = direction === 'down' ? 0.035 : -0.035;
      voice.pan.pan.setTargetAtTime(clamp(-0.3 + stringId * 0.2 + directionShift, -1, 1), now, 0.02);
    }
  }

  updatePitch(stringId, midi, transitionSeconds = 0.06) {
    const voice = this.bowVoices.get(stringId);
    if (!voice || voice.stopped || !this.context) return;
    const now = this.context.currentTime;
    const fundamental = midiToFrequency(midi);
    voice.midi = midi;
    voice.oscillators.forEach(({ oscillator, ratio }) => {
      oscillator.frequency.cancelScheduledValues(now);
      oscillator.frequency.setTargetAtTime(fundamental * ratio, now, Math.max(0.008, transitionSeconds / 3));
    });
  }

  stopBow(stringId, release = 0.08) {
    const voice = this.bowVoices.get(stringId);
    if (!voice || voice.stopped || !this.context) return;
    voice.stopped = true;
    const now = this.context.currentTime;

    voice.voiceGain.gain.cancelScheduledValues(now);
    voice.voiceGain.gain.setValueAtTime(Math.max(voice.voiceGain.gain.value, 0.0001), now);
    voice.voiceGain.gain.exponentialRampToValueAtTime(0.0001, now + release);
    voice.noiseGain.gain.cancelScheduledValues(now);
    voice.noiseGain.gain.setValueAtTime(Math.max(voice.noiseGain.gain.value, 0.0001), now);
    voice.noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + release * 0.8);

    const stopTime = now + release + 0.04;
    voice.oscillators.forEach(({ oscillator }) => {
      try { oscillator.stop(stopTime); } catch { /* already stopped */ }
    });
    try { voice.noise.stop(stopTime); } catch { /* already stopped */ }

    window.setTimeout(() => {
      if (this.bowVoices.get(stringId) === voice) this.bowVoices.delete(stringId);
    }, (release + 0.1) * 1000);
  }

  pluck(stringId, midi, options = {}) {
    const context = this.ensureContext();
    if (!context) return;

    this.stopBow(stringId, 0.025);
    const previous = this.pluckVoices.get(stringId);
    if (previous) previous.stop?.();

    const now = context.currentTime;
    const gain = context.createGain();
    const filter = context.createBiquadFilter();
    const oscillators = [];
    const velocity = clamp(options.velocity ?? 0.8, 0.1, 1.2);
    const contact = clamp(options.contact ?? 0.5, 0, 1);
    const fundamental = midiToFrequency(midi);

    filter.type = 'lowpass';
    filter.frequency.value = 2500 + contact * 7000;
    filter.Q.value = 0.4;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.15 * velocity, now + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.15 + stringId * 0.08);
    gain.connect(filter);
    filter.connect(this.master);

    [
      [1, 'triangle', 0.66],
      [2, 'sine', 0.22],
      [3, 'sine', 0.09],
    ].forEach(([ratio, type, level]) => {
      const oscillator = context.createOscillator();
      const partialGain = context.createGain();
      oscillator.type = type;
      oscillator.frequency.value = fundamental * ratio;
      partialGain.gain.value = level;
      oscillator.connect(partialGain);
      partialGain.connect(gain);
      oscillator.start(now);
      oscillator.stop(now + 1.3 + stringId * 0.08);
      oscillators.push(oscillator);
    });

    const voice = {
      stop: () => {
        const time = context.currentTime;
        gain.gain.cancelScheduledValues(time);
        gain.gain.setTargetAtTime(0.0001, time, 0.02);
      },
    };
    this.pluckVoices.set(stringId, voice);
  }

  stopAll(release = 0.06) {
    VIOLIN_STRINGS.forEach((string) => this.stopBow(string.id, release));
    this.pluckVoices.forEach((voice) => voice.stop?.());
    this.pluckVoices.clear();
  }

  isBowing(stringId) {
    const voice = this.bowVoices.get(stringId);
    return Boolean(voice && !voice.stopped);
  }

  peakLevel() {
    if (!this.analyser || !this.analyserData) return 0;
    this.analyser.getByteTimeDomainData(this.analyserData);
    let sum = 0;
    for (const value of this.analyserData) {
      const normalised = (value - 128) / 128;
      sum += normalised * normalised;
    }
    return Math.min(100, Math.round(Math.sqrt(sum / this.analyserData.length) * 480));
  }
}
