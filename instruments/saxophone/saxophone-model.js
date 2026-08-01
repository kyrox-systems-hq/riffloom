/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

export const MAIN_KEYS = ['L1', 'L2', 'L3', 'R1', 'R2', 'R3'];
export const AUX_KEYS = [
  'OCT', 'BIS', 'GSHARP', 'LOW_C', 'LOW_CSHARP', 'LOW_B', 'LOW_BB', 'LOW_EB',
  'SIDE_BB', 'SIDE_C', 'PALM_D', 'PALM_E', 'PALM_F',
];
export const ALL_KEYS = [...MAIN_KEYS, ...AUX_KEYS];

const NOTE_NAMES = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];

export function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

export function noteName(midi) {
  const rounded = Math.round(midi);
  const pitch = NOTE_NAMES[((rounded % 12) + 12) % 12];
  const octave = Math.floor(rounded / 12) - 1;
  const cents = Math.round((midi - rounded) * 100);
  return cents === 0 ? `${pitch}${octave}` : `${pitch}${octave} ${cents > 0 ? '+' : ''}${cents}¢`;
}

function keySet(...keys) {
  return new Set(keys);
}

const BASE_FINGERINGS = [
  { id: 'low-bb', writtenMidi: 58, keys: keySet(...MAIN_KEYS, 'LOW_BB'), label: 'Low B♭' },
  { id: 'low-b', writtenMidi: 59, keys: keySet(...MAIN_KEYS, 'LOW_B'), label: 'Low B' },
  { id: 'low-c', writtenMidi: 60, keys: keySet(...MAIN_KEYS, 'LOW_C'), label: 'Low C' },
  { id: 'low-csharp', writtenMidi: 61, keys: keySet(...MAIN_KEYS, 'LOW_CSHARP'), label: 'Low C♯' },
  { id: 'low-d', writtenMidi: 62, keys: keySet(...MAIN_KEYS), label: 'D' },
  { id: 'low-eb', writtenMidi: 63, keys: keySet(...MAIN_KEYS, 'LOW_EB'), label: 'E♭' },
  { id: 'low-e', writtenMidi: 64, keys: keySet('L1', 'L2', 'L3', 'R1', 'R2'), label: 'E' },
  { id: 'low-f', writtenMidi: 65, keys: keySet('L1', 'L2', 'L3', 'R1'), label: 'F' },
  { id: 'low-fsharp', writtenMidi: 66, keys: keySet('L1', 'L2', 'L3', 'R2'), label: 'F♯' },
  { id: 'low-g', writtenMidi: 67, keys: keySet('L1', 'L2', 'L3'), label: 'G' },
  { id: 'low-gsharp', writtenMidi: 68, keys: keySet('L1', 'L2', 'L3', 'GSHARP'), label: 'G♯' },
  { id: 'low-a', writtenMidi: 69, keys: keySet('L1', 'L2'), label: 'A' },
  { id: 'low-bb-bis', writtenMidi: 70, keys: keySet('L1', 'BIS'), label: 'B♭' },
  { id: 'low-bb-side', writtenMidi: 70, keys: keySet('L1', 'SIDE_BB'), label: 'B♭ side' },
  { id: 'low-b-natural', writtenMidi: 71, keys: keySet('L1'), label: 'B' },
  { id: 'middle-c', writtenMidi: 72, keys: keySet('L2'), label: 'C' },
  { id: 'middle-c-side', writtenMidi: 72, keys: keySet('L1', 'SIDE_C'), label: 'C side' },
  { id: 'middle-csharp', writtenMidi: 73, keys: keySet(), label: 'C♯' },
];

const OCTAVE_FINGERINGS = BASE_FINGERINGS
  .filter((item) => item.writtenMidi >= 62)
  .map((item) => ({
    ...item,
    id: `${item.id}-octave`,
    writtenMidi: item.writtenMidi + 12,
    keys: new Set([...item.keys, 'OCT']),
    label: `${item.label} + octave`,
  }));

const PALM_FINGERINGS = [
  { id: 'palm-d', writtenMidi: 86, keys: keySet('OCT', 'PALM_D'), label: 'Palm D' },
  { id: 'palm-e', writtenMidi: 88, keys: keySet('OCT', 'PALM_D', 'PALM_E'), label: 'Palm E' },
  { id: 'palm-f', writtenMidi: 89, keys: keySet('OCT', 'PALM_D', 'PALM_E', 'PALM_F'), label: 'Palm F' },
];

export const FINGERINGS = [...BASE_FINGERINGS, ...OCTAVE_FINGERINGS, ...PALM_FINGERINGS];

function setDistance(left, right) {
  let distance = 0;
  for (const key of left) if (!right.has(key)) distance += 1;
  for (const key of right) if (!left.has(key)) distance += 1;
  return distance;
}

function hasSameKeys(left, right) {
  return left.size === right.size && [...left].every((key) => right.has(key));
}

function weightedDistance(active, target) {
  let score = setDistance(active, target);
  const strictModifiers = ['OCT', 'PALM_D', 'PALM_E', 'PALM_F', 'LOW_BB', 'LOW_B', 'LOW_C', 'LOW_CSHARP'];
  strictModifiers.forEach((key) => {
    if (active.has(key) !== target.has(key)) score += 2.5;
  });
  return score;
}

export class SaxophoneModel {
  constructor() {
    this.fingeringMode = 'assisted';
    this.keyMode = 'hold';
    this.airMode = 'hold';
    this.displayMode = 'concert';
    this.activeKeyPointers = new Map();
    this.latchedKeys = new Set();
    this.air = 0;
    this.embouchureX = 0;
    this.reedBrightness = 0.55;
    this.bendRange = 2;
    this.lastResolved = FINGERINGS.find((item) => item.id === 'middle-csharp');
  }

  setFingeringMode(mode) {
    if (!['assisted', 'exact'].includes(mode)) throw new Error(`Unsupported fingering mode: ${mode}`);
    this.fingeringMode = mode;
  }

  setKeyMode(mode) {
    if (!['hold', 'latch'].includes(mode)) throw new Error(`Unsupported key mode: ${mode}`);
    this.keyMode = mode;
  }

  setAirMode(mode) {
    if (!['hold', 'latch'].includes(mode)) throw new Error(`Unsupported air mode: ${mode}`);
    this.airMode = mode;
  }

  setDisplayMode(mode) {
    if (!['concert', 'written'].includes(mode)) throw new Error(`Unsupported display mode: ${mode}`);
    this.displayMode = mode;
  }

  setBendRange(semitones) {
    this.bendRange = clamp(Number(semitones), 0.5, 4);
  }

  setAir(value) {
    this.air = clamp(Number(value), 0, 1);
  }

  setEmbouchure(x, brightness) {
    this.embouchureX = clamp(Number(x), -1, 1);
    this.reedBrightness = clamp(Number(brightness), 0, 1);
  }

  heldKeys() {
    return new Set(this.activeKeyPointers.values());
  }

  activeKeys() {
    return new Set([...this.heldKeys(), ...this.latchedKeys]);
  }

  keyDown(pointerId, key) {
    if (!ALL_KEYS.includes(key)) throw new Error(`Unknown saxophone key: ${key}`);
    this.activeKeyPointers.set(pointerId, key);
    return this.resolveFingering();
  }

  keyMove(pointerId, key) {
    if (!this.activeKeyPointers.has(pointerId)) return this.resolveFingering();
    if (!ALL_KEYS.includes(key)) throw new Error(`Unknown saxophone key: ${key}`);
    this.activeKeyPointers.set(pointerId, key);
    return this.resolveFingering();
  }

  keyUp(pointerId) {
    this.activeKeyPointers.delete(pointerId);
    return this.resolveFingering();
  }

  toggleLatch(key) {
    if (!ALL_KEYS.includes(key)) throw new Error(`Unknown saxophone key: ${key}`);
    this.latchedKeys.has(key) ? this.latchedKeys.delete(key) : this.latchedKeys.add(key);
    return this.resolveFingering();
  }

  clearKeys() {
    this.activeKeyPointers.clear();
    this.latchedKeys.clear();
    return this.resolveFingering();
  }

  resolveFingering() {
    const active = this.activeKeys();
    const exact = FINGERINGS.find((item) => hasSameKeys(active, item.keys));
    if (exact) {
      this.lastResolved = exact;
      return { fingering: exact, exact: true, distance: 0 };
    }

    if (this.fingeringMode === 'exact') {
      return { fingering: null, exact: false, distance: Infinity };
    }

    let best = FINGERINGS[0];
    let bestDistance = weightedDistance(active, best.keys);
    for (const candidate of FINGERINGS.slice(1)) {
      const distance = weightedDistance(active, candidate.keys);
      if (distance < bestDistance || (distance === bestDistance && candidate.writtenMidi > best.writtenMidi)) {
        best = candidate;
        bestDistance = distance;
      }
    }
    this.lastResolved = best;
    return { fingering: best, exact: false, distance: bestDistance };
  }

  writtenMidi() {
    const resolved = this.resolveFingering().fingering;
    if (!resolved) return null;
    const range = this.fingeringMode === 'exact' ? Math.min(this.bendRange, 0.5) : this.bendRange;
    return resolved.writtenMidi + this.embouchureX * range;
  }

  concertMidi() {
    const written = this.writtenMidi();
    return written === null ? null : written - 9;
  }

  displayMidi() {
    return this.displayMode === 'written' ? this.writtenMidi() : this.concertMidi();
  }

  currentNoteName() {
    const midi = this.displayMidi();
    return midi === null ? 'Unsupported fingering' : noteName(midi);
  }

  activeKeyLabel() {
    const keys = [...this.activeKeys()];
    return keys.length ? keys.join(' + ') : 'Open';
  }
}
