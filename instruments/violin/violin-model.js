/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

export const VIOLIN_STRINGS = [
  { id: 0, name: 'G', openMidi: 55, colour: 'G3' },
  { id: 1, name: 'D', openMidi: 62, colour: 'D4' },
  { id: 2, name: 'A', openMidi: 69, colour: 'A4' },
  { id: 3, name: 'E', openMidi: 76, colour: 'E5' },
];

export const POSITION_WINDOWS = [0, 7, 14, 21];
export const WINDOW_SPAN = 12;
export const MAX_OFFSET = 33;

const PITCH_NAMES = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];

export function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

export function noteName(midi, includeCents = false) {
  const rounded = Math.round(midi);
  const name = PITCH_NAMES[((rounded % 12) + 12) % 12];
  const octave = Math.floor(rounded / 12) - 1;
  if (!includeCents) return `${name}${octave}`;

  const cents = Math.round((midi - rounded) * 100);
  if (cents === 0) return `${name}${octave}`;
  return `${name}${octave} ${cents > 0 ? '+' : ''}${cents}¢`;
}

export function bowStringsAt(normalisedY, boundary = 0.16) {
  const y = clamp(normalisedY, 0, 0.999999);
  const scaled = y * VIOLIN_STRINGS.length;
  const lane = Math.floor(scaled);
  const withinLane = scaled - lane;

  if (withinLane < boundary && lane > 0) return [lane - 1, lane];
  if (withinLane > 1 - boundary && lane < VIOLIN_STRINGS.length - 1) return [lane, lane + 1];
  return [lane];
}

export class ViolinModel {
  constructor() {
    this.windowStart = 0;
    this.windowSpan = WINDOW_SPAN;
    this.intonationMode = 'assisted';
    this.fingerMode = 'hold';
    this.heldPointers = new Map();
    this.latchedOffsets = new Map();
  }

  get windowEnd() {
    return Math.min(MAX_OFFSET, this.windowStart + this.windowSpan);
  }

  setWindow(start) {
    const nearest = POSITION_WINDOWS.reduce((best, candidate) => (
      Math.abs(candidate - start) < Math.abs(best - start) ? candidate : best
    ), POSITION_WINDOWS[0]);
    this.windowStart = nearest;
    return this.windowStart;
  }

  followOffset(offset) {
    const value = clamp(offset, 0, MAX_OFFSET);
    if (value < this.windowStart + 0.3 && this.windowStart > 0) {
      this.windowStart = clamp(this.windowStart - 1, 0, MAX_OFFSET - this.windowSpan);
    } else if (value > this.windowEnd - 0.3 && this.windowEnd < MAX_OFFSET) {
      this.windowStart = clamp(this.windowStart + 1, 0, MAX_OFFSET - this.windowSpan);
    }
    return this.windowStart;
  }

  setIntonationMode(mode) {
    if (!['assisted', 'free'].includes(mode)) throw new Error(`Unsupported intonation mode: ${mode}`);
    this.intonationMode = mode;
  }

  setFingerMode(mode) {
    if (!['hold', 'latch'].includes(mode)) throw new Error(`Unsupported finger mode: ${mode}`);
    this.fingerMode = mode;
  }

  normaliseOffset(offset) {
    const clamped = clamp(offset, 0, MAX_OFFSET);
    return this.intonationMode === 'assisted' ? Math.round(clamped) : clamped;
  }

  activeOffsetsForString(stringId) {
    const offsets = [];
    for (const pointer of this.heldPointers.values()) {
      if (pointer.stringId === stringId) offsets.push(pointer.offset);
    }
    const latched = this.latchedOffsets.get(stringId);
    if (typeof latched === 'number') offsets.push(latched);
    return offsets.sort((a, b) => a - b);
  }

  activeOffset(stringId) {
    const offsets = this.activeOffsetsForString(stringId);
    return offsets.length ? offsets[offsets.length - 1] : 0;
  }

  midiForString(stringId) {
    return VIOLIN_STRINGS[stringId].openMidi + this.activeOffset(stringId);
  }

  pointerDown(pointerId, stringId, rawOffset) {
    const before = this.activeOffset(stringId);
    const offset = this.normaliseOffset(rawOffset);
    this.heldPointers.set(pointerId, { stringId, offset });
    const after = this.activeOffset(stringId);
    return this.transition(stringId, before, after, 'finger-down');
  }

  pointerMove(pointerId, rawOffset) {
    const pointer = this.heldPointers.get(pointerId);
    if (!pointer) return null;
    const before = this.activeOffset(pointer.stringId);
    pointer.offset = this.normaliseOffset(rawOffset);
    const after = this.activeOffset(pointer.stringId);
    return this.transition(pointer.stringId, before, after, 'finger-move');
  }

  pointerUp(pointerId) {
    const pointer = this.heldPointers.get(pointerId);
    if (!pointer) return null;
    const before = this.activeOffset(pointer.stringId);
    this.heldPointers.delete(pointerId);
    const after = this.activeOffset(pointer.stringId);
    return this.transition(pointer.stringId, before, after, 'finger-up');
  }

  toggleLatch(stringId, rawOffset) {
    const before = this.activeOffset(stringId);
    const offset = this.normaliseOffset(rawOffset);
    const existing = this.latchedOffsets.get(stringId);

    if (typeof existing === 'number' && Math.abs(existing - offset) < 0.2) {
      this.latchedOffsets.delete(stringId);
    } else {
      this.latchedOffsets.set(stringId, offset);
    }

    const after = this.activeOffset(stringId);
    return this.transition(stringId, before, after, 'latch');
  }

  clear() {
    const transitions = VIOLIN_STRINGS.map((string) => {
      const before = this.activeOffset(string.id);
      return { stringId: string.id, before, after: 0, type: before === 0 ? 'none' : 'release-open' };
    });
    this.heldPointers.clear();
    this.latchedOffsets.clear();
    return transitions;
  }

  markersForString(stringId) {
    const markers = [];
    for (const [pointerId, pointer] of this.heldPointers.entries()) {
      if (pointer.stringId === stringId) markers.push({ id: `p-${pointerId}`, offset: pointer.offset, kind: 'held' });
    }
    const latched = this.latchedOffsets.get(stringId);
    if (typeof latched === 'number') markers.push({ id: `l-${stringId}`, offset: latched, kind: 'latched' });
    return markers;
  }

  transition(stringId, before, after, source) {
    if (Math.abs(before - after) < 0.0001) {
      return { stringId, before, after, type: 'none', source };
    }

    let type = 'pitch-change';
    if (source === 'finger-move') type = 'slide';
    else if (after > before) type = before === 0 ? 'finger-down' : 'higher-finger';
    else if (after === 0) type = 'release-open';
    else type = 'lower-finger';

    return { stringId, before, after, type, source };
  }
}
