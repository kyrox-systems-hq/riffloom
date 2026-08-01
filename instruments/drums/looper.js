/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { clamp, loopDurationMs, quantiseTime } from './drum-model.js';

export class EventLooper {
  constructor({ getSettings, onEvent, onMetronome, onState, onClock }) {
    this.getSettings = getSettings;
    this.onEvent = onEvent;
    this.onMetronome = onMetronome;
    this.onState = onState;
    this.onClock = onClock;
    this.events = [];
    this.mode = 'idle';
    this.playbackStart = 0;
    this.recordStart = 0;
    this.timerIds = new Set();
    this.clockFrame = 0;
  }

  settings() {
    const raw = this.getSettings();
    return {
      bpm: clamp(Number(raw.bpm) || 100, 50, 220),
      bars: [1, 2, 4].includes(Number(raw.bars)) ? Number(raw.bars) : 1,
      quantise: [0, 8, 16].includes(Number(raw.quantise)) ? Number(raw.quantise) : 0,
      metronome: Boolean(raw.metronome),
      countIn: Boolean(raw.countIn),
    };
  }

  duration() {
    const { bpm, bars } = this.settings();
    return loopDurationMs(bpm, bars);
  }

  isRecording() { return this.mode === 'recording' || this.mode === 'overdubbing'; }
  isPlaying() { return this.mode === 'playing' || this.mode === 'overdubbing'; }

  clearTimers() {
    this.timerIds.forEach((id) => clearTimeout(id));
    this.timerIds.clear();
    cancelAnimationFrame(this.clockFrame);
  }

  setMode(mode) {
    this.mode = mode;
    this.onState({ mode, eventCount: this.events.length });
  }

  startRecord() {
    this.stop();
    this.events = [];
    const settings = this.settings();
    const begin = () => {
      this.recordStart = performance.now();
      this.setMode('recording');
      this.scheduleAutomaticClose();
      this.startClock();
      this.scheduleMetronome(this.recordStart);
    };

    if (settings.countIn) {
      this.setMode('count-in');
      const beatMs = 60000 / settings.bpm;
      for (let beat = 0; beat < 4; beat += 1) {
        this.addTimer(() => this.onMetronome(beat === 0), beat * beatMs);
      }
      this.addTimer(begin, beatMs * 4);
    } else begin();
  }

  startPlayback() {
    if (!this.events.length) return false;
    this.stop();
    this.playbackStart = performance.now();
    this.setMode('playing');
    this.scheduleCycle(0);
    this.startClock();
    return true;
  }

  startOverdub() {
    if (!this.events.length) {
      this.startRecord();
      return 'recording';
    }
    this.stop();
    this.playbackStart = performance.now();
    this.recordStart = this.playbackStart;
    this.setMode('overdubbing');
    this.scheduleCycle(0);
    this.startClock();
    return 'overdubbing';
  }

  stop() {
    this.clearTimers();
    this.setMode('idle');
    this.onClock({ elapsed: 0, duration: this.duration(), step: -1 });
  }

  clear() {
    this.stop();
    this.events = [];
    this.onState({ mode: 'idle', eventCount: 0 });
  }

  recordEvent(event) {
    if (!this.isRecording()) return;
    const settings = this.settings();
    const duration = this.duration();
    const elapsed = this.mode === 'overdubbing'
      ? (performance.now() - this.playbackStart) % duration
      : performance.now() - this.recordStart;
    const timeMs = Math.min(duration - 1, quantiseTime(elapsed, settings.bpm, settings.quantise));
    this.events.push({ ...event, timeMs });
    this.events.sort((a, b) => a.timeMs - b.timeMs);
    this.onState({ mode: this.mode, eventCount: this.events.length });
  }

  scheduleAutomaticClose() {
    this.addTimer(() => {
      if (this.mode !== 'recording') return;
      if (this.events.length) this.startPlayback();
      else this.stop();
    }, this.duration());
  }

  scheduleCycle(cycleIndex) {
    const duration = this.duration();
    const cycleStart = this.playbackStart + cycleIndex * duration;
    const now = performance.now();

    this.events.forEach((event) => {
      const delay = Math.max(0, cycleStart + event.timeMs - now);
      this.addTimer(() => this.onEvent(event), delay);
    });

    const settings = this.settings();
    if (settings.metronome) this.scheduleMetronome(cycleStart);

    const nextDelay = Math.max(0, cycleStart + duration - performance.now());
    this.addTimer(() => {
      if (this.isPlaying()) this.scheduleCycle(cycleIndex + 1);
    }, nextDelay);
  }

  scheduleMetronome(startTime) {
    const settings = this.settings();
    if (!settings.metronome && this.mode !== 'count-in') return;
    const beatMs = 60000 / settings.bpm;
    const beats = settings.bars * 4;
    const now = performance.now();
    for (let beat = 0; beat < beats; beat += 1) {
      const delay = Math.max(0, startTime + beat * beatMs - now);
      this.addTimer(() => this.onMetronome(beat % 4 === 0), delay);
    }
  }

  addTimer(callback, delay) {
    const id = setTimeout(() => {
      this.timerIds.delete(id);
      callback();
    }, delay);
    this.timerIds.add(id);
  }

  startClock() {
    cancelAnimationFrame(this.clockFrame);
    const tick = () => {
      if (this.mode === 'idle') return;
      const duration = this.duration();
      let elapsed = 0;
      if (this.mode === 'recording') elapsed = performance.now() - this.recordStart;
      else if (this.mode === 'count-in') elapsed = 0;
      else elapsed = (performance.now() - this.playbackStart) % duration;
      const step = Math.min(15, Math.floor((elapsed / duration) * 16));
      this.onClock({ elapsed: Math.min(elapsed, duration), duration, step });
      this.clockFrame = requestAnimationFrame(tick);
    };
    tick();
  }
}
