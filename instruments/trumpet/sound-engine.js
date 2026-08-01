/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

function midiToFrequency(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

function makeSaturationCurve(amount = 2.2) {
  const samples = 2048;
  const curve = new Float32Array(samples);
  for (let index = 0; index < samples; index += 1) {
    const x = (index / (samples - 1)) * 2 - 1;
    curve[index] = Math.tanh(x * amount) / Math.tanh(amount);
  }
  return curve;
}

export class TrumpetSoundEngine {
  constructor() {
    this.context = null;
    this.master = null;
    this.analyser = null;
    this.analyserData = null;
    this.voice = null;
    this.stopTimer = null;
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

      this.master.gain.value = 0.68;
      compressor.threshold.value = -18;
      compressor.knee.value = 17;
      compressor.ratio.value = 5;
      compressor.attack.value = 0.002;
      compressor.release.value = 0.18;

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
    for (let index = 0; index < length; index += 1) channel[index] = Math.random() * 2 - 1;
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    return source;
  }

  createVoice(midi) {
    const context = this.ensureContext();
    if (!context) return null;
    const now = context.currentTime;

    const fundamental = context.createOscillator();
    const support = context.createOscillator();
    const supportGain = context.createGain();
    const breath = this.createNoiseSource();
    const breathFilter = context.createBiquadFilter();
    const breathGain = context.createGain();
    const voiceGain = context.createGain();
    const saturation = context.createWaveShaper();
    const body = context.createBiquadFilter();
    const presence = context.createBiquadFilter();
    const brilliance = context.createBiquadFilter();

    const real = new Float32Array(12);
    const imag = new Float32Array(12);
    [0, 1, 0.86, 0.68, 0.52, 0.4, 0.31, 0.24, 0.18, 0.13, 0.09, 0.06]
      .forEach((value, index) => { imag[index] = value; });
    fundamental.setPeriodicWave(context.createPeriodicWave(real, imag, { disableNormalization: false }));
    fundamental.frequency.value = midiToFrequency(midi);

    support.type = 'sine';
    support.frequency.value = midiToFrequency(midi) * 0.5;
    supportGain.gain.value = 0.045;

    breathFilter.type = 'bandpass';
    breathFilter.frequency.value = 2400;
    breathFilter.Q.value = 0.7;
    breathGain.gain.value = 0.0001;
    voiceGain.gain.value = 0.0001;

    saturation.curve = makeSaturationCurve();
    saturation.oversample = '2x';

    body.type = 'bandpass';
    body.frequency.value = 930;
    body.Q.value = 0.55;

    presence.type = 'peaking';
    presence.frequency.value = 1900;
    presence.Q.value = 0.8;
    presence.gain.value = 5;

    brilliance.type = 'lowpass';
    brilliance.frequency.value = 6200;
    brilliance.Q.value = 0.3;

    fundamental.connect(voiceGain);
    support.connect(supportGain);
    supportGain.connect(voiceGain);
    breath.connect(breathFilter);
    breathFilter.connect(breathGain);
    breathGain.connect(voiceGain);
    voiceGain.connect(saturation);
    saturation.connect(body);
    body.connect(presence);
    presence.connect(brilliance);
    brilliance.connect(this.master);

    fundamental.start(now);
    support.start(now);
    breath.start(now);

    this.voice = {
      fundamental,
      support,
      supportGain,
      breath,
      breathFilter,
      breathGain,
      voiceGain,
      body,
      presence,
      brilliance,
      midi,
      targetGain: 0.0001,
      stopped: false,
    };
    return this.voice;
  }

  sync(model, options = {}) {
    const context = this.ensureContext();
    if (!context) return;

    if (!model.airActive()) {
      this.stop(options.release ?? 0.08);
      return;
    }

    if (this.stopTimer) {
      window.clearTimeout(this.stopTimer);
      this.stopTimer = null;
    }

    const voice = this.voice && !this.voice.stopped ? this.voice : this.createVoice(model.currentConcertMidi());
    if (!voice) return;

    const now = context.currentTime;
    const transition = clamp(options.transition ?? 0.025, 0.005, 0.2);
    const frequency = midiToFrequency(model.currentConcertMidi());
    voice.midi = model.currentConcertMidi();
    voice.fundamental.frequency.setTargetAtTime(frequency, now, transition / 3);
    voice.support.frequency.setTargetAtTime(frequency * 0.5, now, transition / 3);

    const air = clamp(model.air, 0, 1);
    const gain = 0.018 + Math.pow(air, 1.35) * 0.17;
    voice.targetGain = gain;
    voice.voiceGain.gain.cancelScheduledValues(now);
    voice.voiceGain.gain.setTargetAtTime(gain, now, options.articulate ? 0.018 : 0.04);

    voice.breathGain.gain.cancelScheduledValues(now);
    voice.breathGain.gain.setTargetAtTime(0.004 + air * 0.028, now, 0.03);
    voice.breathFilter.frequency.setTargetAtTime(1500 + air * 3100, now, 0.04);
    voice.body.frequency.setTargetAtTime(720 + frequency * 0.42, now, 0.05);
    voice.presence.frequency.setTargetAtTime(1300 + air * 1900, now, 0.05);
    voice.presence.gain.setTargetAtTime(2 + air * 7, now, 0.04);
    voice.brilliance.frequency.setTargetAtTime(3200 + air * 6200, now, 0.04);

    if (options.articulate) this.tongue(options.tongueStrength ?? 0.75);
  }

  tongue(strength = 0.75) {
    const context = this.ensureContext();
    const voice = this.voice;
    if (!context || !voice || voice.stopped) return;
    const now = context.currentTime;
    const target = Math.max(0.0001, voice.targetGain);

    voice.voiceGain.gain.cancelScheduledValues(now);
    voice.voiceGain.gain.setValueAtTime(Math.max(voice.voiceGain.gain.value, 0.0001), now);
    voice.voiceGain.gain.exponentialRampToValueAtTime(0.0008, now + 0.012);
    voice.voiceGain.gain.exponentialRampToValueAtTime(target * (0.9 + strength * 0.18), now + 0.035);
    voice.voiceGain.gain.setTargetAtTime(target, now + 0.04, 0.04);

    const noise = this.createNoiseSource(0.08);
    noise.loop = false;
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    filter.type = 'bandpass';
    filter.frequency.value = 1800 + strength * 2300;
    filter.Q.value = 1.2;
    gain.gain.setValueAtTime(0.025 + strength * 0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    noise.start(now);
    noise.stop(now + 0.06);
  }

  stop(release = 0.08) {
    const voice = this.voice;
    if (!voice || voice.stopped || !this.context) return;
    voice.stopped = true;
    const now = this.context.currentTime;
    const safeRelease = clamp(release, 0.02, 0.4);

    voice.voiceGain.gain.cancelScheduledValues(now);
    voice.voiceGain.gain.setValueAtTime(Math.max(voice.voiceGain.gain.value, 0.0001), now);
    voice.voiceGain.gain.exponentialRampToValueAtTime(0.0001, now + safeRelease);
    voice.breathGain.gain.cancelScheduledValues(now);
    voice.breathGain.gain.setValueAtTime(Math.max(voice.breathGain.gain.value, 0.0001), now);
    voice.breathGain.gain.exponentialRampToValueAtTime(0.0001, now + safeRelease * 0.8);

    const stopAt = now + safeRelease + 0.05;
    try { voice.fundamental.stop(stopAt); } catch { /* already stopped */ }
    try { voice.support.stop(stopAt); } catch { /* already stopped */ }
    try { voice.breath.stop(stopAt); } catch { /* already stopped */ }

    this.stopTimer = window.setTimeout(() => {
      if (this.voice === voice) this.voice = null;
      this.stopTimer = null;
    }, (safeRelease + 0.1) * 1000);
  }

  preview(midi, duration = 0.55, air = 0.72) {
    const temporaryModel = {
      air,
      airActive: () => true,
      currentConcertMidi: () => midi,
    };
    this.sync(temporaryModel, { articulate: true, transition: 0.01 });
    window.setTimeout(() => this.stop(0.09), duration * 1000);
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
