/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

export const STRINGS = Object.freeze([
  { id: 0, name: 'Low E', short: 'E', openMidi: 40, gauge: 7.2 },
  { id: 1, name: 'A', short: 'A', openMidi: 45, gauge: 6.1 },
  { id: 2, name: 'D', short: 'D', openMidi: 50, gauge: 5.1 },
  { id: 3, name: 'G', short: 'G', openMidi: 55, gauge: 4.1 },
  { id: 4, name: 'B', short: 'B', openMidi: 59, gauge: 3.2 },
  { id: 5, name: 'High E', short: 'e', openMidi: 64, gauge: 2.4 },
]);

export const POSITION_STARTS = Object.freeze([1, 5, 9, 13, 17, 19]);
export const MAX_FRET = 24;
export const WINDOW_SIZE = 6;

export const CHORD_PRESETS = Object.freeze({
  E: [0, 2, 2, 1, 0, 0],
  G: [3, 2, 0, 0, 0, 3],
  C: [null, 3, 2, 0, 1, 0],
  Am: [null, 0, 2, 2, 1, 0],
  D: [null, null, 0, 2, 3, 2],
  F: [1, 3, 3, 2, 1, 1],
});

const PITCH_NAMES = Object.freeze(['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B']);

export function noteName(midi) {
  const pitch = PITCH_NAMES[midi % 12];
  const octave = Math.floor(midi / 12) - 1;
  return `${pitch}${octave}`;
}

function validateStringId(stringId) {
  if (!Number.isInteger(stringId) || stringId < 0 || stringId >= STRINGS.length) {
    throw new RangeError(`Invalid guitar string: ${stringId}`);
  }
}

function validateFret(fret) {
  if (!Number.isInteger(fret) || fret < 0 || fret > MAX_FRET) {
    throw new RangeError(`Invalid fret: ${fret}`);
  }
}

export class GuitarModel {
  constructor() {
    this.windowStart = 1;
    this.latchedFrets = Array.from({ length: STRINGS.length }, () => new Set());
    this.heldPointers = new Map();
    this.mutedStrings = new Set();
  }

  get windowEnd() {
    return Math.min(MAX_FRET, this.windowStart + WINDOW_SIZE - 1);
  }

  setWindowStart(start) {
    const maximumStart = MAX_FRET - WINDOW_SIZE + 1;
    this.windowStart = Math.max(1, Math.min(maximumStart, Math.round(start)));
    return this.windowStart;
  }

  isMuted(stringId) {
    validateStringId(stringId);
    return this.mutedStrings.has(stringId);
  }

  toggleMute(stringId) {
    validateStringId(stringId);
    if (this.mutedStrings.has(stringId)) {
      this.mutedStrings.delete(stringId);
      return false;
    }
    this.mutedStrings.add(stringId);
    return true;
  }

  activeFret(stringId) {
    validateStringId(stringId);
    const frets = [...this.latchedFrets[stringId]];
    for (const pointer of this.heldPointers.values()) {
      const fret = pointer.cells.get(stringId);
      if (fret !== undefined) frets.push(fret);
    }
    return frets.length ? Math.max(...frets) : 0;
  }

  midiForString(stringId) {
    validateStringId(stringId);
    return STRINGS[stringId].openMidi + this.activeFret(stringId);
  }

  currentNotes() {
    return STRINGS.map((string) => (
      this.isMuted(string.id) ? 'X' : noteName(this.midiForString(string.id))
    ));
  }

  pointer(pointerId) {
    return this.heldPointers.get(pointerId) ?? null;
  }

  snapshot(stringIds) {
    const ids = [...new Set(stringIds)];
    return new Map(ids.map((stringId) => [stringId, this.activeFret(stringId)]));
  }

  transitions(before, stringIds, reason) {
    return [...new Set(stringIds)].map((stringId) => ({
      stringId,
      oldFret: before.get(stringId) ?? 0,
      newFret: this.activeFret(stringId),
      reason,
    })).filter((transition) => transition.oldFret !== transition.newFret);
  }

  toggleLatchedFret(stringId, fret) {
    validateStringId(stringId);
    validateFret(fret);
    const before = this.snapshot([stringId]);
    const frets = this.latchedFrets[stringId];
    const alreadySelected = frets.has(fret);
    frets.clear();
    if (!alreadySelected && fret > 0) frets.add(fret);
    return this.transitions(before, [stringId], 'latch');
  }

  beginFinger(pointerId, stringId, fret, point = {}) {
    validateStringId(stringId);
    validateFret(fret);
    if (this.heldPointers.has(pointerId)) {
      throw new Error(`Pointer ${pointerId} is already fretting`);
    }
    const before = this.snapshot([stringId]);
    this.heldPointers.set(pointerId, {
      pointerId,
      anchorFret: fret,
      cells: new Map([[stringId, fret]]),
      startedAt: point.time ?? performance.now(),
      lastPoint: {
        x: point.x ?? 0,
        y: point.y ?? 0,
        time: point.time ?? performance.now(),
      },
    });
    return this.transitions(before, [stringId], 'press');
  }

  addBarreString(pointerId, stringId) {
    validateStringId(stringId);
    const pointer = this.heldPointers.get(pointerId);
    if (!pointer) return [];
    const affected = [stringId];
    const before = this.snapshot(affected);
    pointer.cells.set(stringId, pointer.anchorFret);
    return this.transitions(before, affected, 'barre');
  }

  slideFinger(pointerId, fret, point = {}) {
    validateFret(fret);
    const pointer = this.heldPointers.get(pointerId);
    if (!pointer) return [];
    const affected = [...pointer.cells.keys()];
    const before = this.snapshot(affected);
    pointer.anchorFret = fret;
    for (const stringId of affected) pointer.cells.set(stringId, fret);
    pointer.lastPoint = {
      x: point.x ?? pointer.lastPoint.x,
      y: point.y ?? pointer.lastPoint.y,
      time: point.time ?? performance.now(),
    };
    return this.transitions(before, affected, 'slide');
  }

  updatePointerPoint(pointerId, point) {
    const pointer = this.heldPointers.get(pointerId);
    if (!pointer) return;
    pointer.lastPoint = {
      x: point.x,
      y: point.y,
      time: point.time ?? performance.now(),
    };
  }

  releaseFinger(pointerId) {
    const pointer = this.heldPointers.get(pointerId);
    if (!pointer) return [];
    const affected = [...pointer.cells.keys()];
    const before = this.snapshot(affected);
    this.heldPointers.delete(pointerId);
    return this.transitions(before, affected, 'release');
  }

  clearFretting() {
    const before = this.snapshot(STRINGS.map((string) => string.id));
    this.latchedFrets = Array.from({ length: STRINGS.length }, () => new Set());
    this.heldPointers.clear();
    this.mutedStrings.clear();
    return this.transitions(before, STRINGS.map((string) => string.id), 'clear');
  }

  loadChord(name) {
    const shape = CHORD_PRESETS[name];
    if (!shape) throw new Error(`Unknown chord preset: ${name}`);
    const ids = STRINGS.map((string) => string.id);
    const before = this.snapshot(ids);
    this.latchedFrets = Array.from({ length: STRINGS.length }, () => new Set());
    this.heldPointers.clear();
    this.mutedStrings.clear();

    shape.forEach((fret, stringId) => {
      if (fret === null) {
        this.mutedStrings.add(stringId);
      } else if (fret > 0) {
        this.latchedFrets[stringId].add(fret);
      }
    });

    const highestFret = Math.max(1, ...shape.filter((fret) => Number.isInteger(fret)));
    if (highestFret > this.windowEnd || highestFret < this.windowStart) {
      this.setWindowStart(Math.max(1, highestFret - 2));
    }

    return this.transitions(before, ids, 'preset');
  }
}
