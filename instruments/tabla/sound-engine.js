/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { bayanPitchSemitones, clamp } from './tabla-model.js';

function midiToFrequency(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

export class TablaSoundEngine {
  constructor() {
    this.context = null;
    this.master = null;
    this.analyser = null;
    this.analyserData = null;
    this.dayanVoices = new Set();
    this.bayanVoice = null;
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

      compressor.threshold.value = -22;
      compressor.knee.value = 20;
      compressor.ratio.value = 5;
      compressor.attack.value = 0.002;
      compressor.release.value = 0.18;
      this.master.gain.value = 0.78;

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

  createNoise(duration = 0.2) {
    const context = this.ensureContext();
    const length = Math.max(1, Math.round(context.sampleRate * duration));
    const buffer = context.createBuffer(1, length, context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let index = 0; index < length; index += 1) {
      data[index] = (Math.random() * 2 - 1) * (1 - index / length);
    }
    const source = context.createBufferSource();
    source.buffer = buffer;
    return source;
  }

  play(event, options = {}) {
    if (event.drum === 'dayan') {
      this.playDayan(event.stroke.id, event.velocity, options.tonicMidi ?? 49);
    } else {
      this.playBayan(event.stroke.id, event.velocity, event.heelPressure, options.maximumBend ?? 7);
    }
  }

  playDayan(strokeId, velocity = 0.8, tonicMidi = 49) {
    const context = this.ensureContext();
    if (!context) return;
    const now = context.currentTime;
    const gain = context.createGain();
    const body = context.createBiquadFilter();
    const pan = context.createStereoPanner ? context.createStereoPanner() : null;
    const oscillators = [];

    body.type = 'bandpass';
    body.Q.value = 0.7;
    body.frequency.value = strokeId === 'te' ? 1600 : 950;
    gain.connect(body);
    if (pan) {
      pan.pan.value = 0.24;
      body.connect(pan);
      pan.connect(this.master);
    } else {
      body.connect(this.master);
    }

    const profiles = {
      na: { midi: tonicMidi, peak: 0.13, duration: 1.05, partials: [[1, 0.64], [2.02, 0.32], [3.98, 0.15], [5.2, 0.08]], noise: [2100, 0.045, 0.045] },
      tin: { midi: tonicMidi + 7, peak: 0.105, duration: 0.92, partials: [[1, 0.56], [1.52, 0.26], [2.42, 0.16], [3.8, 0.07]], noise: [1750, 0.028, 0.04] },
      tun: { midi: tonicMidi + 2, peak: 0.14, duration: 1.15, partials: [[1, 0.68], [2.01, 0.23], [3.04, 0.12], [4.88, 0.06]], noise: [1450, 0.025, 0.035] },
      te: { midi: tonicMidi + 10, peak: 0.105, duration: 0.11, partials: [[1, 0.28], [2.3, 0.16]], noise: [2450, 0.12, 0.085] },
    };

    const profile = profiles[strokeId] ?? profiles.te;
    const amplitude = profile.peak * clamp(velocity, 0.08, 1.25);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(amplitude, now + 0.0035);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + profile.duration);

    profile.partials.forEach(([ratio, level]) => {
      const oscillator = context.createOscillator();
      const partialGain = context.createGain();
      oscillator.type = ratio === 1 ? 'triangle' : 'sine';
      oscillator.frequency.value = midiToFrequency(profile.midi) * ratio;
      partialGain.gain.value = level;
      oscillator.connect(partialGain);
      partialGain.connect(gain);
      oscillator.start(now);
      oscillator.stop(now + profile.duration + 0.04);
      oscillators.push(oscillator);
    });

    const [noiseFrequency, noiseLevel, noiseDuration] = profile.noise;
    const noise = this.createNoise(noiseDuration);
    const noiseFilter = context.createBiquadFilter();
    const noiseGain = context.createGain();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = noiseFrequency;
    noiseFilter.Q.value = 1.1;
    noiseGain.gain.setValueAtTime(noiseLevel * clamp(velocity, 0.1, 1.25), now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + noiseDuration);
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.master);
    noise.start(now);
    noise.stop(now + noiseDuration + 0.01);

    const voice = {
      gain,
      oscillators,
      stopped: false,
      stop: (release = 0.035) => {
        if (voice.stopped) return;
        voice.stopped = true;
        const time = context.currentTime;
        gain.gain.cancelScheduledValues(time);
        gain.gain.setValueAtTime(Math.max(gain.gain.value, 0.0001), time);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + release);
        oscillators.forEach((oscillator) => {
          try { oscillator.stop(time + release + 0.02); } catch { /* already stopped */ }
        });
        window.setTimeout(() => this.dayanVoices.delete(voice), (release + 0.05) * 1000);
      },
    };
    this.dayanVoices.add(voice);
    window.setTimeout(() => this.dayanVoices.delete(voice), (profile.duration + 0.12) * 1000);
  }

  playBayan(strokeId, velocity = 0.8, heelPressure = 0, maximumBend = 7) {
    const context = this.ensureContext();
    if (!context) return;
    if (strokeId === 'ke') {
      this.playBayanKe(velocity);
      return;
    }

    this.dampBayan(0.035);
    const now = context.currentTime;
    const gain = context.createGain();
    const body = context.createBiquadFilter();
    const pan = context.createStereoPanner ? context.createStereoPanner() : null;
    const baseMidi = strokeId === 'ghe' ? 34 : 33;
    const bend = bayanPitchSemitones(heelPressure, maximumBend);
    const fundamental = midiToFrequency(baseMidi + bend);
    const oscillators = [];

    body.type = 'lowpass';
    body.frequency.value = 850 + heelPressure * 620;
    body.Q.value = 0.55;
    gain.connect(body);
    if (pan) {
      pan.pan.value = -0.28;
      body.connect(pan);
      pan.connect(this.master);
    } else {
      body.connect(this.master);
    }

    const amplitude = 0.19 * clamp(velocity, 0.08, 1.25);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(amplitude, now + 0.006);
    gain.gain.exponentialRampToValueAtTime(amplitude * 0.34, now + 0.42);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.55);

    [[1, 'sine', 0.72], [2.01, 'triangle', 0.26], [3.25, 'sine', 0.13], [4.8, 'sine', 0.06]].forEach(([ratio, type, level]) => {
      const oscillator = context.createOscillator();
      const partialGain = context.createGain();
      oscillator.type = type;
      oscillator.frequency.value = fundamental * ratio;
      partialGain.gain.value = level;
      oscillator.connect(partialGain);
      partialGain.connect(gain);
      oscillator.start(now);
      oscillator.stop(now + 1.72);
      oscillators.push({ oscillator, ratio });
    });

    const attackNoise = this.createNoise(0.045);
    const attackFilter = context.createBiquadFilter();
    const attackGain = context.createGain();
    attackFilter.type = 'lowpass';
    attackFilter.frequency.value = 680;
    attackGain.gain.setValueAtTime(0.08 * velocity, now);
    attackGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);
    attackNoise.connect(attackFilter);
    attackFilter.connect(attackGain);
    attackGain.connect(this.master);
    attackNoise.start(now);

    const voice = {
      baseMidi,
      oscillators,
      gain,
      body,
      stopped: false,
      stop: (release = 0.055) => {
        if (voice.stopped) return;
        voice.stopped = true;
        const time = context.currentTime;
        gain.gain.cancelScheduledValues(time);
        gain.gain.setValueAtTime(Math.max(gain.gain.value, 0.0001), time);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + release);
        oscillators.forEach(({ oscillator }) => {
          try { oscillator.stop(time + release + 0.03); } catch { /* already stopped */ }
        });
        window.setTimeout(() => {
          if (this.bayanVoice === voice) this.bayanVoice = null;
        }, (release + 0.06) * 1000);
      },
    };
    this.bayanVoice = voice;
  }

  playBayanKe(velocity = 0.8) {
    const context = this.ensureContext();
    if (!context) return;
    this.dampBayan(0.02);
    const now = context.currentTime;
    const noise = this.createNoise(0.12);
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    filter.type = 'bandpass';
    filter.frequency.value = 430;
    filter.Q.value = 0.8;
    gain.gain.setValueAtTime(0.16 * clamp(velocity, 0.08, 1.25), now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.095);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    noise.start(now);
  }

  updateHeelPressure(heelPressure, maximumBend = 7) {
    const voice = this.bayanVoice;
    if (!voice || voice.stopped || !this.context) return;
    const now = this.context.currentTime;
    const bend = bayanPitchSemitones(heelPressure, maximumBend);
    const fundamental = midiToFrequency(voice.baseMidi + bend);
    voice.oscillators.forEach(({ oscillator, ratio }) => {
      oscillator.frequency.setTargetAtTime(fundamental * ratio, now, 0.025);
    });
    voice.body.frequency.setTargetAtTime(820 + heelPressure * 760, now, 0.03);
  }

  dampDayan(release = 0.035) {
    [...this.dayanVoices].forEach((voice) => voice.stop(release));
  }

  dampBayan(release = 0.045) {
    this.bayanVoice?.stop(release);
  }

  dampAll(release = 0.04) {
    this.dampDayan(release);
    this.dampBayan(release);
  }

  peakLevel() {
    if (!this.analyser || !this.analyserData) return 0;
    this.analyser.getByteTimeDomainData(this.analyserData);
    let sum = 0;
    for (const value of this.analyserData) {
      const normalised = (value - 128) / 128;
      sum += normalised * normalised;
    }
    return Math.min(100, Math.round(Math.sqrt(sum / this.analyserData.length) * 500));
  }
}
