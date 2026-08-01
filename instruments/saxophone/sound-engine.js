/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

function midiToFrequency(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

export class SaxophoneSoundEngine {
  constructor() {
    this.context = null;
    this.master = null;
    this.analyser = null;
    this.analyserData = null;
    this.voice = null;
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

      this.master.gain.value = 0.78;
      compressor.threshold.value = -22;
      compressor.knee.value = 18;
      compressor.ratio.value = 4;
      compressor.attack.value = 0.003;
      compressor.release.value = 0.2;

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
    const data = buffer.getChannelData(0);
    for (let index = 0; index < length; index += 1) {
      data[index] = (Math.random() * 2 - 1) * (0.85 + Math.random() * 0.15);
    }
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    return source;
  }

  makeWave() {
    const context = this.ensureContext();
    const real = new Float32Array(12);
    const imag = new Float32Array(12);
    imag[1] = 0.82;
    imag[2] = 0.46;
    imag[3] = 0.31;
    imag[4] = 0.24;
    imag[5] = 0.19;
    imag[6] = 0.13;
    imag[7] = 0.1;
    imag[8] = 0.075;
    imag[9] = 0.052;
    imag[10] = 0.04;
    imag[11] = 0.028;
    return context.createPeriodicWave(real, imag, { disableNormalization: false });
  }

  createVoice(midi, air, brightness) {
    const context = this.ensureContext();
    if (!context) return null;
    const now = context.currentTime;

    const oscillator = context.createOscillator();
    const subOscillator = context.createOscillator();
    const oscillatorGain = context.createGain();
    const subGain = context.createGain();
    const voiceGain = context.createGain();
    const reedFilter = context.createBiquadFilter();
    const bodyFilter = context.createBiquadFilter();
    const breathFilter = context.createBiquadFilter();
    const breathGain = context.createGain();
    const shaper = context.createWaveShaper();

    oscillator.setPeriodicWave(this.makeWave());
    subOscillator.type = 'triangle';
    oscillator.frequency.value = midiToFrequency(midi);
    subOscillator.frequency.value = midiToFrequency(midi) * 0.5;
    oscillatorGain.gain.value = 0.72;
    subGain.gain.value = 0.13;

    reedFilter.type = 'bandpass';
    reedFilter.frequency.value = 1300 + brightness * 1800;
    reedFilter.Q.value = 0.58;

    bodyFilter.type = 'lowpass';
    bodyFilter.frequency.value = 3600 + brightness * 4400;
    bodyFilter.Q.value = 0.7;

    breathFilter.type = 'bandpass';
    breathFilter.frequency.value = 1600 + brightness * 3000;
    breathFilter.Q.value = 0.75;

    const curve = new Float32Array(2048);
    for (let index = 0; index < curve.length; index += 1) {
      const x = index * 2 / (curve.length - 1) - 1;
      curve[index] = Math.tanh(x * 1.6);
    }
    shaper.curve = curve;
    shaper.oversample = '2x';

    voiceGain.gain.setValueAtTime(0.0001, now);
    breathGain.gain.setValueAtTime(0.0001, now);

    oscillator.connect(oscillatorGain);
    subOscillator.connect(subGain);
    oscillatorGain.connect(shaper);
    subGain.connect(shaper);
    shaper.connect(reedFilter);
    reedFilter.connect(bodyFilter);
    bodyFilter.connect(voiceGain);
    voiceGain.connect(this.master);

    const breath = this.createNoiseSource();
    breath.connect(breathFilter);
    breathFilter.connect(breathGain);
    breathGain.connect(this.master);

    oscillator.start(now);
    subOscillator.start(now);
    breath.start(now);

    const voice = {
      oscillator,
      subOscillator,
      oscillatorGain,
      subGain,
      voiceGain,
      reedFilter,
      bodyFilter,
      breath,
      breathFilter,
      breathGain,
      stopped: false,
      midi,
    };
    this.voice = voice;
    this.applyVoice(voice, midi, air, brightness, 0.02);
    return voice;
  }

  applyVoice(voice, midi, air, brightness, transition = 0.03) {
    if (!voice || voice.stopped || !this.context) return;
    const now = this.context.currentTime;
    const frequency = midiToFrequency(midi);
    const safeAir = clamp(air, 0, 1);
    const safeBrightness = clamp(brightness, 0, 1);
    voice.midi = midi;

    voice.oscillator.frequency.setTargetAtTime(frequency, now, Math.max(0.006, transition / 3));
    voice.subOscillator.frequency.setTargetAtTime(frequency * 0.5, now, Math.max(0.006, transition / 3));

    const level = Math.max(0.0001, 0.045 + safeAir * 0.21);
    voice.voiceGain.gain.cancelScheduledValues(now);
    voice.voiceGain.gain.setTargetAtTime(level, now, Math.max(0.01, transition));

    const breathLevel = Math.max(0.0001, 0.004 + safeAir * (0.015 + (1 - safeBrightness) * 0.023));
    voice.breathGain.gain.cancelScheduledValues(now);
    voice.breathGain.gain.setTargetAtTime(breathLevel, now, Math.max(0.01, transition));

    voice.reedFilter.frequency.setTargetAtTime(850 + safeBrightness * 3200 + safeAir * 350, now, 0.025);
    voice.bodyFilter.frequency.setTargetAtTime(2200 + safeBrightness * 5900 + safeAir * 450, now, 0.025);
    voice.breathFilter.frequency.setTargetAtTime(1000 + safeBrightness * 3700, now, 0.035);
    voice.oscillatorGain.gain.setTargetAtTime(0.58 + safeBrightness * 0.26, now, 0.03);
    voice.subGain.gain.setTargetAtTime(0.18 - safeBrightness * 0.08, now, 0.03);
  }

  sync(model, options = {}) {
    const context = this.ensureContext();
    if (!context) return;
    const midi = model.concertMidi();
    const air = model.air;
    if (midi === null || air < 0.015) {
      this.stop(options.release ?? 0.055);
      return;
    }

    if (!this.voice || this.voice.stopped) {
      this.createVoice(midi, air, model.reedBrightness);
      this.tongue(model, { strength: options.attackStrength ?? 0.75 });
      return;
    }
    this.applyVoice(this.voice, midi, air, model.reedBrightness, options.transition ?? 0.035);
    if (options.tongue) this.tongue(model, { strength: options.attackStrength ?? 0.75 });
  }

  tongue(model, options = {}) {
    const context = this.ensureContext();
    const midi = model.concertMidi();
    if (!context || midi === null) return;
    if (model.air < 0.015) {
      this.preview(midi, 0.22, model.reedBrightness);
      return;
    }
    if (!this.voice || this.voice.stopped) this.createVoice(midi, model.air, model.reedBrightness);
    const voice = this.voice;
    const now = context.currentTime;
    const strength = clamp(options.strength ?? 0.75, 0.2, 1.2);

    voice.voiceGain.gain.cancelScheduledValues(now);
    voice.voiceGain.gain.setValueAtTime(Math.max(voice.voiceGain.gain.value, 0.0001), now);
    voice.voiceGain.gain.exponentialRampToValueAtTime(0.0005, now + 0.012);
    voice.voiceGain.gain.exponentialRampToValueAtTime((0.055 + model.air * 0.21) * strength, now + 0.035);

    const length = Math.round(context.sampleRate * 0.035);
    const buffer = context.createBuffer(1, length, context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let index = 0; index < length; index += 1) data[index] = (Math.random() * 2 - 1) * (1 - index / length);
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    source.buffer = buffer;
    filter.type = 'bandpass';
    filter.frequency.value = 900 + model.reedBrightness * 2500;
    filter.Q.value = 1.1;
    gain.gain.setValueAtTime(0.04 * strength, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    source.start(now);
  }

  stop(release = 0.06) {
    const voice = this.voice;
    if (!voice || voice.stopped || !this.context) return;
    voice.stopped = true;
    const now = this.context.currentTime;
    voice.voiceGain.gain.cancelScheduledValues(now);
    voice.voiceGain.gain.setValueAtTime(Math.max(voice.voiceGain.gain.value, 0.0001), now);
    voice.voiceGain.gain.exponentialRampToValueAtTime(0.0001, now + release);
    voice.breathGain.gain.cancelScheduledValues(now);
    voice.breathGain.gain.setValueAtTime(Math.max(voice.breathGain.gain.value, 0.0001), now);
    voice.breathGain.gain.exponentialRampToValueAtTime(0.0001, now + release * 0.8);
    const stopAt = now + release + 0.04;
    try { voice.oscillator.stop(stopAt); } catch { /* already stopped */ }
    try { voice.subOscillator.stop(stopAt); } catch { /* already stopped */ }
    try { voice.breath.stop(stopAt); } catch { /* already stopped */ }
    window.setTimeout(() => {
      if (this.voice === voice) this.voice = null;
    }, (release + 0.08) * 1000);
  }

  preview(midi, duration = 0.35, brightness = 0.58) {
    const context = this.ensureContext();
    if (!context) return;
    const now = context.currentTime;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();
    oscillator.setPeriodicWave(this.makeWave());
    oscillator.frequency.value = midiToFrequency(midi);
    filter.type = 'lowpass';
    filter.frequency.value = 2500 + brightness * 4300;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.17, now + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.04);
  }

  peakLevel() {
    if (!this.analyser || !this.analyserData) return 0;
    this.analyser.getByteTimeDomainData(this.analyserData);
    let sum = 0;
    for (const value of this.analyserData) {
      const sample = (value - 128) / 128;
      sum += sample * sample;
    }
    return Math.min(100, Math.round(Math.sqrt(sum / this.analyserData.length) * 500));
  }
}
