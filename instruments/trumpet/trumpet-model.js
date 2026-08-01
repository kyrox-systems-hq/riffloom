/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

export const TRUMPET_KEY = 'B♭';
export const OPEN_FUNDAMENTAL_MIDI = 46;

export const VALVES = [
  { id: 1, bit: 1, label: '1', semitones: 2 },
  { id: 2, bit: 2, label: '2', semitones: 1 },
  { id: 3, bit: 4, label: '3', semitones: 3 },
];

export const VALVE_SHIFT_BY_MASK = Object.freeze({
  0: 0,
  1: -2,
  2: -1,
  3: -3,
  4: -3,
  5: -5,
  6: -4,
  7: -6,
});

export const HARMONIC_SLOTS = Object.freeze([
  { harmonic: 2, concertMidi: 58, role: 'Low register' },
  { harmonic: 3, concertMidi: 65, role: 'Middle register' },
  { harmonic: 4, concertMidi: 70, role: 'Middle register' },
  { harmonic: 5, concertMidi: 74, role: 'Upper register' },
  { harmonic: 6, concertMidi: 77, role: 'Upper register' },
  { harmonic: 7, concertMidi: 80, role: 'Upper register' },
  { harmonic: 8, concertMidi: 82, role: 'High register' },
  { harmonic: 9, concertMidi: 84, role: 'High register' },
  { harmonic: 10, concertMidi: 86, role: 'High register' },
]);

const NOTE_NAMES = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B'];

export function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

export function noteName(midi, includeCents = false) {
  const rounded = Math.round(midi);
  const note = NOTE_NAMES[((rounded % 12) + 12) % 12];
  const octave = Math.floor(rounded / 12) - 1;
  if (!includeCents) return `${note}${octave}`;

  const cents = Math.round((midi - rounded) * 100);
  return cents === 0 ? `${note}${octave}` : `${note}${octave} ${cents > 0 ? '+' : ''}${cents}¢`;
}

export function valveMaskFromIds(ids) {
  return ids.reduce((mask, id) => mask | (VALVES.find((valve) => valve.id === id)?.bit ?? 0), 0);
}

export function valveCombinationLabel(mask) {
  if (mask === 0) return 'Open';
  return VALVES.filter((valve) => mask & valve.bit).map((valve) => valve.label).join('+');
}

export function freeHarmonicMidi(slotPosition) {
  const harmonic = 2 + clamp(slotPosition, 0, HARMONIC_SLOTS.length - 1);
  return OPEN_FUNDAMENTAL_MIDI + 12 * Math.log2(harmonic);
}

export class TrumpetModel {
  constructor() {
    this.pitchMode = 'assisted';
    this.valveMode = 'hold';
    this.airMode = 'hold';
    this.noteDisplay = 'concert';
    this.bendRange = 2;
    this.slotPosition = 1;
    this.lipBend = 0;
    this.air = 0;
    this.heldValves = new Map();
    this.latchedValves = new Set();
  }

  setPitchMode(mode) {
    if (!['assisted', 'free'].includes(mode)) throw new Error(`Unsupported pitch mode: ${mode}`);
    this.pitchMode = mode;
    if (mode === 'assisted') this.slotPosition = Math.round(this.slotPosition);
  }

  setValveMode(mode) {
    if (!['hold', 'latch'].includes(mode)) throw new Error(`Unsupported valve mode: ${mode}`);
    this.valveMode = mode;
    this.heldValves.clear();
  }

  setAirMode(mode) {
    if (!['hold', 'latch'].includes(mode)) throw new Error(`Unsupported air mode: ${mode}`);
    this.airMode = mode;
  }

  setDisplay(mode) {
    if (!['concert', 'written'].includes(mode)) throw new Error(`Unsupported note display: ${mode}`);
    this.noteDisplay = mode;
  }

  setBendRange(semitones) {
    this.bendRange = clamp(Number(semitones), 0.5, 4);
  }

  setAir(value) {
    this.air = clamp(value, 0, 1);
    return this.air;
  }

  airActive() {
    return this.air > 0.025;
  }

  setEmbouchure(normalisedX, normalisedY) {
    const x = clamp(normalisedX, 0, 1);
    const y = clamp(normalisedY, 0, 1);
    const rawSlot = (1 - y) * (HARMONIC_SLOTS.length - 1);

    if (this.pitchMode === 'assisted') {
      this.slotPosition = Math.round(rawSlot);
      this.lipBend = (x - 0.5) * Math.min(0.7, this.bendRange);
    } else {
      this.slotPosition = rawSlot;
      this.lipBend = (x - 0.5) * 2 * this.bendRange;
    }

    return {
      slotPosition: this.slotPosition,
      lipBend: this.lipBend,
      concertMidi: this.currentConcertMidi(),
    };
  }

  pressValve(pointerId, valveId) {
    if (!VALVES.some((valve) => valve.id === valveId)) return this.valveMask();
    this.heldValves.set(pointerId, valveId);
    return this.valveMask();
  }

  moveValve(pointerId, valveId) {
    if (!this.heldValves.has(pointerId)) return this.valveMask();
    this.heldValves.set(pointerId, valveId);
    return this.valveMask();
  }

  releaseValve(pointerId) {
    this.heldValves.delete(pointerId);
    return this.valveMask();
  }

  toggleValve(valveId) {
    if (this.latchedValves.has(valveId)) this.latchedValves.delete(valveId);
    else this.latchedValves.add(valveId);
    return this.valveMask();
  }

  clearValves() {
    this.heldValves.clear();
    this.latchedValves.clear();
  }

  activeValveIds() {
    return [...new Set([...this.heldValves.values(), ...this.latchedValves])].sort((a, b) => a - b);
  }

  valveMask() {
    return valveMaskFromIds(this.activeValveIds());
  }

  valveShift() {
    return VALVE_SHIFT_BY_MASK[this.valveMask()] ?? 0;
  }

  assistedSlotIndex() {
    return clamp(Math.round(this.slotPosition), 0, HARMONIC_SLOTS.length - 1);
  }

  openConcertMidi() {
    if (this.pitchMode === 'assisted') return HARMONIC_SLOTS[this.assistedSlotIndex()].concertMidi;
    return freeHarmonicMidi(this.slotPosition);
  }

  currentConcertMidi() {
    return this.openConcertMidi() + this.valveShift() + this.lipBend;
  }

  displayMidi() {
    return this.currentConcertMidi() + (this.noteDisplay === 'written' ? 2 : 0);
  }

  currentNoteName() {
    return noteName(this.displayMidi(), this.pitchMode === 'free' || Math.abs(this.lipBend) > 0.01);
  }

  harmonicLabel() {
    const slot = HARMONIC_SLOTS[this.assistedSlotIndex()];
    return `H${slot.harmonic}`;
  }

  snapshot() {
    return {
      air: this.air,
      airActive: this.airActive(),
      pitchMode: this.pitchMode,
      slotPosition: this.slotPosition,
      lipBend: this.lipBend,
      valveMask: this.valveMask(),
      valveLabel: valveCombinationLabel(this.valveMask()),
      valveShift: this.valveShift(),
      concertMidi: this.currentConcertMidi(),
      displayMidi: this.displayMidi(),
      noteName: this.currentNoteName(),
    };
  }
}
