/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

export const PAD_DEFINITIONS = [
  { id: 'crash', name: 'Crash', family: 'cymbal', hint: 'edge · bow · bell' },
  { id: 'highTom', name: 'High tom', family: 'tom', hint: 'rim · head' },
  { id: 'midTom', name: 'Mid tom', family: 'tom', hint: 'rim · head' },
  { id: 'ride', name: 'Ride', family: 'cymbal', hint: 'edge · bow · bell' },
  { id: 'hihat', name: 'Hi-hat', family: 'hihat', hint: 'edge · bow' },
  { id: 'snare', name: 'Snare', family: 'snare', hint: 'cross · head · rim' },
  { id: 'floorTom', name: 'Floor tom', family: 'tom', hint: 'rim · head' },
  { id: 'kick', name: 'Kick', family: 'kick', hint: 'soft · hard beater' },
];

export const HI_HAT_STATES = ['closed', 'half', 'open'];

export function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

export function classifyZone(padId, x, y) {
  const dx = x - 0.5;
  const dy = y - 0.5;
  const radius = Math.sqrt(dx * dx + dy * dy) / Math.sqrt(0.5);

  if (padId === 'snare') {
    if (radius > 0.64) return x < 0.28 || x > 0.72 ? 'cross-stick' : 'rimshot';
    return 'head';
  }

  if (padId === 'crash' || padId === 'ride') {
    if (radius < 0.22) return 'bell';
    if (radius > 0.56) return 'edge';
    return 'bow';
  }

  if (padId === 'hihat') return radius > 0.62 ? 'edge' : 'bow';
  if (padId === 'kick') return radius < 0.34 ? 'hard-beater' : 'soft-beater';
  if (padId.toLowerCase().includes('tom')) return radius > 0.64 ? 'rim' : 'head';
  return 'head';
}

export function quantiseTime(timeMs, bpm, division) {
  if (!division) return Math.max(0, timeMs);
  const beatMs = 60000 / bpm;
  const stepMs = beatMs * (4 / division);
  return Math.max(0, Math.round(timeMs / stepMs) * stepMs);
}

export function loopDurationMs(bpm, bars) {
  return (60000 / bpm) * 4 * bars;
}

export class DrumPerformanceModel {
  constructor() {
    this.hiHatState = 'closed';
    this.lastHits = new Map();
    this.hitHistory = new Map();
  }

  setHiHatState(state) {
    if (!HI_HAT_STATES.includes(state)) throw new RangeError(`Unknown hi-hat state: ${state}`);
    this.hiHatState = state;
    return state;
  }

  registerHit(padId, pointerId, timeMs) {
    const previous = this.lastHits.get(padId);
    const interval = previous ? timeMs - previous.timeMs : Infinity;
    const alternatingPointer = previous ? previous.pointerId !== pointerId : false;
    this.lastHits.set(padId, { pointerId, timeMs });

    const history = this.hitHistory.get(padId) ?? [];
    history.push(timeMs);
    while (history.length && timeMs - history[0] > 650) history.shift();
    this.hitHistory.set(padId, history);

    let technique = 'single hit';
    if (interval >= 28 && interval <= 95 && alternatingPointer) technique = 'flam';
    if (history.length >= 4) {
      const gaps = history.slice(1).map((value, index) => value - history[index]);
      if (gaps.every((gap) => gap <= 165)) technique = 'roll';
    }

    return { interval, technique };
  }
}
