import test from 'node:test';
import assert from 'node:assert/strict';

import {
  MAX_OFFSET,
  POSITION_WINDOWS,
  VIOLIN_STRINGS,
  ViolinModel,
  bowStringsAt,
  noteName,
} from '../violin-model.js';

test('uses standard violin tuning', () => {
  assert.deepEqual(VIOLIN_STRINGS.map((string) => noteName(string.openMidi)), ['G3', 'D4', 'A4', 'E5']);
});

test('position windows remain within the supported fingerboard range', () => {
  const model = new ViolinModel();
  for (const start of POSITION_WINDOWS) {
    model.setWindow(start);
    assert.ok(model.windowStart >= 0);
    assert.ok(model.windowEnd <= MAX_OFFSET);
  }
});

test('assisted intonation snaps to semitones', () => {
  const model = new ViolinModel();
  model.setIntonationMode('assisted');
  assert.equal(model.normaliseOffset(4.42), 4);
  assert.equal(model.normaliseOffset(4.58), 5);
});

test('free intonation preserves continuous pitch', () => {
  const model = new ViolinModel();
  model.setIntonationMode('free');
  assert.equal(model.normaliseOffset(4.42), 4.42);
});

test('the highest held finger controls the string pitch', () => {
  const model = new ViolinModel();
  model.pointerDown(1, 0, 2);
  model.pointerDown(2, 0, 7);
  assert.equal(model.activeOffset(0), 7);
  assert.equal(model.midiForString(0), 62);
});

test('releasing a higher finger reveals the lower held finger', () => {
  const model = new ViolinModel();
  model.pointerDown(1, 1, 3);
  model.pointerDown(2, 1, 8);
  const transition = model.pointerUp(2);
  assert.equal(transition.type, 'lower-finger');
  assert.equal(model.activeOffset(1), 3);
});

test('releasing the last finger returns to the open string', () => {
  const model = new ViolinModel();
  model.pointerDown(1, 2, 5);
  const transition = model.pointerUp(1);
  assert.equal(transition.type, 'release-open');
  assert.equal(model.midiForString(2), VIOLIN_STRINGS[2].openMidi);
});

test('bow boundary zones select adjacent strings for double stops', () => {
  assert.deepEqual(bowStringsAt(0.24), [0, 1]);
  assert.deepEqual(bowStringsAt(0.5), [1, 2]);
  assert.deepEqual(bowStringsAt(0.88), [3]);
});
