/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { clamp } from './drum-model.js';

export class DrumSoundEngine {
  constructor() {
    this.context = null;
    this.master = null;
    this.analyser = null;
    this.analyserData = null;
    this.cymbalVoices = new Map();
  }

  ensure() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    if (!this.context) {
      try { this.context = new AudioContextClass({ latencyHint: 'interactive' }); }
      catch { this.context = new AudioContextClass(); }
      this.master = this.context.createGain();
      const compressor = this.context.createDynamicsCompressor();
      this.analyser = this.context.createAnalyser();
      this.analyser.fftSize = 512;
      this.analyserData = new Uint8Array(this.analyser.fftSize);
      this.master.gain.value = 0.82;
      compressor.threshold.value = -18;
      compressor.knee.value = 18;
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

  status() { return this.context?.state ?? 'locked'; }

  noiseBuffer(seconds = 1) {
    const context = this.ensure();
    if (!context) return null;
    const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * seconds), context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let index = 0; index < data.length; index += 1) data[index] = Math.random() * 2 - 1;
    return buffer;
  }

  hit(event) {
    const context = this.ensure();
    if (!context) return;
    const velocity = clamp(event.velocity ?? 0.82, 0.15, 1.2);
    switch (event.padId) {
      case 'kick': this.kick(velocity, event.articulation); break;
      case 'snare': this.snare(velocity, event.articulation); break;
      case 'highTom': this.tom(185, velocity, event.articulation); break;
      case 'midTom': this.tom(142, velocity, event.articulation); break;
      case 'floorTom': this.tom(92, velocity, event.articulation); break;
      case 'hihat': this.hihat(velocity, event.hiHatState ?? 'closed', event.articulation); break;
      case 'crash': this.cymbal('crash', velocity, event.articulation); break;
      case 'ride': this.cymbal('ride', velocity, event.articulation); break;
      default: break;
    }
  }

  kick(velocity, articulation) {
    const c = this.context;
    const now = c.currentTime;
    const oscillator = c.createOscillator();
    const gain = c.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(articulation === 'hard-beater' ? 155 : 125, now);
    oscillator.frequency.exponentialRampToValueAtTime(47, now + 0.13);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.9 * velocity, now + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.52);
    oscillator.connect(gain); gain.connect(this.master);
    oscillator.start(now); oscillator.stop(now + 0.56);
    if (articulation === 'hard-beater') this.transient(1800, 0.045 * velocity, 0.024);
  }

  snare(velocity, articulation) {
    const c = this.context;
    const now = c.currentTime;
    if (articulation === 'cross-stick') {
      this.transient(1320, 0.24 * velocity, 0.07, 'square');
      this.transient(720, 0.13 * velocity, 0.09, 'triangle');
      return;
    }
    const noise = c.createBufferSource();
    const noiseFilter = c.createBiquadFilter();
    const noiseGain = c.createGain();
    noise.buffer = this.noiseBuffer(0.4);
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = articulation === 'rimshot' ? 1050 : 720;
    noiseGain.gain.setValueAtTime(0.0001, now);
    noiseGain.gain.exponentialRampToValueAtTime((articulation === 'rimshot' ? 0.62 : 0.48) * velocity, now + 0.003);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + (articulation === 'rimshot' ? 0.22 : 0.3));
    noise.connect(noiseFilter); noiseFilter.connect(noiseGain); noiseGain.connect(this.master);
    noise.start(now); noise.stop(now + 0.34);
    this.transient(articulation === 'rimshot' ? 245 : 185, 0.3 * velocity, 0.18, 'triangle');
  }

  tom(frequency, velocity, articulation) {
    const c = this.context;
    const now = c.currentTime;
    const oscillator = c.createOscillator();
    const gain = c.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency * (articulation === 'rim' ? 1.22 : 1), now);
    oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.72, now + 0.22);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.55 * velocity, now + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + (articulation === 'rim' ? 0.33 : 0.66));
    oscillator.connect(gain); gain.connect(this.master);
    oscillator.start(now); oscillator.stop(now + 0.72);
    if (articulation === 'rim') this.transient(frequency * 5.1, 0.06 * velocity, 0.045);
  }

  hihat(velocity, state, articulation) {
    const duration = state === 'closed' ? 0.09 : state === 'half' ? 0.38 : 1.05;
    const c = this.context;
    const now = c.currentTime;
    const noise = c.createBufferSource();
    const highpass = c.createBiquadFilter();
    const bandpass = c.createBiquadFilter();
    const gain = c.createGain();
    noise.buffer = this.noiseBuffer(duration + 0.08);
    highpass.type = 'highpass'; highpass.frequency.value = articulation === 'edge' ? 5100 : 6800;
    bandpass.type = 'bandpass'; bandpass.frequency.value = articulation === 'edge' ? 9200 : 11200; bandpass.Q.value = 0.7;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime((state === 'open' ? 0.25 : 0.18) * velocity, now + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    noise.connect(highpass); highpass.connect(bandpass); bandpass.connect(gain); gain.connect(this.master);
    noise.start(now); noise.stop(now + duration + 0.04);
  }

  pedalChick(velocity = 0.9) {
    this.hihat(velocity, 'closed', 'edge');
    this.transient(3100, 0.06 * velocity, 0.04, 'square');
  }

  cymbal(id, velocity, articulation) {
    this.choke(id, 0.025);
    const c = this.context;
    const now = c.currentTime;
    const duration = id === 'crash' ? 3.4 : 2.5;
    const gain = c.createGain();
    const filter = c.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = articulation === 'bell' ? 1800 : articulation === 'edge' ? 900 : 1250;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime((id === 'crash' ? 0.25 : 0.18) * velocity, now + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    gain.connect(filter); filter.connect(this.master);

    const oscillators = [];
    const base = id === 'crash' ? 310 : 410;
    const ratios = articulation === 'bell' ? [1, 1.47, 2.41, 3.76] : [1, 1.31, 1.93, 2.71, 4.09];
    ratios.forEach((ratio, index) => {
      const oscillator = c.createOscillator();
      const partialGain = c.createGain();
      oscillator.type = 'square';
      oscillator.frequency.value = base * ratio;
      partialGain.gain.value = 0.09 / (index + 1);
      oscillator.connect(partialGain); partialGain.connect(gain);
      oscillator.start(now); oscillator.stop(now + duration + 0.05);
      oscillators.push(oscillator);
    });

    const noise = c.createBufferSource();
    const noiseGain = c.createGain();
    noise.buffer = this.noiseBuffer(duration + 0.05);
    noiseGain.gain.value = articulation === 'edge' ? 0.22 : 0.11;
    noise.connect(noiseGain); noiseGain.connect(gain);
    noise.start(now); noise.stop(now + duration + 0.05);
    this.cymbalVoices.set(id, { gain, oscillators, noise, stopped: false });
  }

  choke(id, release = 0.055) {
    const voice = this.cymbalVoices.get(id);
    if (!voice || voice.stopped || !this.context) return false;
    voice.stopped = true;
    const now = this.context.currentTime;
    voice.gain.gain.cancelScheduledValues(now);
    voice.gain.gain.setValueAtTime(Math.max(voice.gain.gain.value, 0.0001), now);
    voice.gain.gain.exponentialRampToValueAtTime(0.0001, now + release);
    this.cymbalVoices.delete(id);
    return true;
  }

  transient(frequency, volume, duration, type = 'triangle') {
    const c = this.context;
    const now = c.currentTime;
    const oscillator = c.createOscillator();
    const gain = c.createGain();
    oscillator.type = type; oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(Math.max(0.0001, volume), now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    oscillator.connect(gain); gain.connect(this.master);
    oscillator.start(now); oscillator.stop(now + duration + 0.01);
  }

  metronome(accent = false) {
    this.ensure();
    this.transient(accent ? 1450 : 1050, accent ? 0.1 : 0.065, 0.045, 'square');
  }

  peakLevel() {
    if (!this.analyser || !this.analyserData) return 0;
    this.analyser.getByteTimeDomainData(this.analyserData);
    let sum = 0;
    for (const value of this.analyserData) {
      const normalised = (value - 128) / 128;
      sum += normalised * normalised;
    }
    return Math.min(100, Math.round(Math.sqrt(sum / this.analyserData.length) * 540));
  }
}
