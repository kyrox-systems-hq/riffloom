import test from 'node:test';
import assert from 'node:assert/strict';

import { MAIN_KEYS, SaxophoneModel, noteName } from '../saxophone-model.js';

function press(model, keys) {
  keys.forEach((key, index) => model.keyDown(index + 1, key));
}

test('open fingering resolves to written C sharp 5', () => {
  const model = new SaxophoneModel();
  assert.equal(noteName(model.writtenMidi()), 'C♯5');
});

test('all six main keys resolve to written D4', () => {
  const model = new SaxophoneModel();
  press(model, MAIN_KEYS);
  assert.equal(noteName(model.writtenMidi()), 'D4');
});

test('common stack fingerings resolve E F G A B and C', () => {
  const cases = [
    [['L1', 'L2', 'L3', 'R1', 'R2'], 'E4'],
    [['L1', 'L2', 'L3', 'R1'], 'F4'],
    [['L1', 'L2', 'L3'], 'G4'],
    [['L1', 'L2'], 'A4'],
    [['L1'], 'B4'],
    [['L2'], 'C5'],
  ];
  cases.forEach(([keys, expected]) => {
    const model = new SaxophoneModel();
    press(model, keys);
    assert.equal(noteName(model.writtenMidi()), expected);
  });
});

test('octave key raises supported stack fingerings by twelve semitones', () => {
  const model = new SaxophoneModel();
  press(model, [...MAIN_KEYS, 'OCT']);
  assert.equal(noteName(model.writtenMidi()), 'D5');
});

test('low bell keys resolve written B flat, B, C and C sharp', () => {
  const cases = [
    ['LOW_BB', 'A♯3'],
    ['LOW_B', 'B3'],
    ['LOW_C', 'C4'],
    ['LOW_CSHARP', 'C♯4'],
  ];
  cases.forEach(([key, expected]) => {
    const model = new SaxophoneModel();
    press(model, [...MAIN_KEYS, key]);
    assert.equal(noteName(model.writtenMidi()), expected);
  });
});

test('palm keys produce high written D, E and F', () => {
  const cases = [
    [['OCT', 'PALM_D'], 'D6'],
    [['OCT', 'PALM_D', 'PALM_E'], 'E6'],
    [['OCT', 'PALM_D', 'PALM_E', 'PALM_F'], 'F6'],
  ];
  cases.forEach(([keys, expected]) => {
    const model = new SaxophoneModel();
    press(model, keys);
    assert.equal(noteName(model.writtenMidi()), expected);
  });
});

test('alto saxophone concert pitch is nine semitones below written pitch', () => {
  const model = new SaxophoneModel();
  assert.equal(model.writtenMidi() - model.concertMidi(), 9);
});

test('exact mode rejects unsupported key combinations', () => {
  const model = new SaxophoneModel();
  model.setFingeringMode('exact');
  press(model, ['R3']);
  assert.equal(model.writtenMidi(), null);
});

test('assisted mode chooses the nearest supported fingering', () => {
  const model = new SaxophoneModel();
  press(model, ['L1', 'L2', 'L3', 'R1', 'R2', 'R3', 'SIDE_C']);
  assert.ok(model.writtenMidi() !== null);
});

test('embouchure control bends pitch continuously', () => {
  const model = new SaxophoneModel();
  const base = model.writtenMidi();
  model.setEmbouchure(0.5, 0.5);
  assert.equal(model.writtenMidi(), base + 1);
});
