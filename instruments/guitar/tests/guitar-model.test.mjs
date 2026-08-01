import test from 'node:test';
import assert from 'node:assert/strict';

import {
  GuitarModel,
  STRINGS,
  noteName,
} from '../guitar-model.js';

test('standard tuning maps to E2 A2 D3 G3 B3 E4', () => {
  const model = new GuitarModel();
  assert.deepEqual(model.currentNotes(), ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']);
  assert.equal(STRINGS.length, 6);
});

test('position window remains within 24 frets', () => {
  const model = new GuitarModel();
  model.setWindowStart(30);
  assert.equal(model.windowStart, 19);
  assert.equal(model.windowEnd, 24);
  model.setWindowStart(-5);
  assert.equal(model.windowStart, 1);
});

test('highest held fret wins on a string', () => {
  const model = new GuitarModel();
  model.beginFinger(1, 0, 2);
  model.beginFinger(2, 0, 5);
  assert.equal(model.activeFret(0), 5);
  model.releaseFinger(2);
  assert.equal(model.activeFret(0), 2);
});

test('one pointer can create and slide a barre', () => {
  const model = new GuitarModel();
  model.beginFinger(1, 0, 1);
  model.addBarreString(1, 1);
  model.addBarreString(1, 2);
  assert.deepEqual([model.activeFret(0), model.activeFret(1), model.activeFret(2)], [1, 1, 1]);
  const transitions = model.slideFinger(1, 3);
  assert.equal(transitions.length, 3);
  assert.deepEqual([model.activeFret(0), model.activeFret(1), model.activeFret(2)], [3, 3, 3]);
});

test('E chord preset has the expected shape', () => {
  const model = new GuitarModel();
  model.loadChord('E');
  assert.deepEqual(STRINGS.map((string) => model.activeFret(string.id)), [0, 2, 2, 1, 0, 0]);
  assert.deepEqual(model.currentNotes(), ['E2', 'B2', 'E3', 'G♯3', 'B3', 'E4']);
});

test('muted strings are reported as X', () => {
  const model = new GuitarModel();
  model.toggleMute(0);
  assert.equal(model.currentNotes()[0], 'X');
});

test('note naming covers open and fretted guitar notes', () => {
  assert.equal(noteName(40), 'E2');
  assert.equal(noteName(64), 'E4');
  assert.equal(noteName(66), 'F♯4');
});
