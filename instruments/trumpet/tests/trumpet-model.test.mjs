import test from 'node:test';
import assert from 'node:assert/strict';

import {
  HARMONIC_SLOTS,
  TrumpetModel,
  freeHarmonicMidi,
  noteName,
  valveCombinationLabel,
  valveMaskFromIds,
} from '../trumpet-model.js';

test('uses a B-flat trumpet open harmonic ladder in concert pitch', () => {
  assert.deepEqual(HARMONIC_SLOTS.slice(0, 5).map((slot) => noteName(slot.concertMidi)), ['B♭3', 'F4', 'B♭4', 'D5', 'F5']);
});

test('maps valve combinations to the expected semitone shifts', () => {
  const model = new TrumpetModel();
  model.toggleValve(1);
  assert.equal(model.valveShift(), -2);
  model.toggleValve(2);
  assert.equal(model.valveShift(), -3);
  model.toggleValve(3);
  assert.equal(model.valveShift(), -6);
});

test('hold valves use independent pointer identities', () => {
  const model = new TrumpetModel();
  model.pressValve(101, 1);
  model.pressValve(102, 3);
  assert.equal(model.valveMask(), 5);
  model.releaseValve(101);
  assert.equal(model.valveMask(), 4);
});

test('assisted embouchure snaps to a harmonic slot', () => {
  const model = new TrumpetModel();
  model.setPitchMode('assisted');
  model.setEmbouchure(0.5, 0.52);
  assert.equal(Number.isInteger(model.slotPosition), true);
});

test('free embouchure preserves a continuous harmonic position', () => {
  const model = new TrumpetModel();
  model.setPitchMode('free');
  model.setEmbouchure(0.5, 0.52);
  assert.equal(Number.isInteger(model.slotPosition), false);
});

test('written B-flat trumpet display transposes two semitones above concert pitch', () => {
  const model = new TrumpetModel();
  model.setDisplay('concert');
  const concert = model.displayMidi();
  model.setDisplay('written');
  assert.equal(model.displayMidi(), concert + 2);
});

test('air values are clamped and report active state', () => {
  const model = new TrumpetModel();
  model.setAir(2);
  assert.equal(model.air, 1);
  assert.equal(model.airActive(), true);
  model.setAir(-1);
  assert.equal(model.air, 0);
  assert.equal(model.airActive(), false);
});

test('free harmonic function follows the harmonic series', () => {
  assert.ok(Math.abs(freeHarmonicMidi(0) - 58) < 0.001);
  assert.ok(Math.abs(freeHarmonicMidi(1) - 65.01955) < 0.01);
});

test('valve helpers produce stable masks and labels', () => {
  assert.equal(valveMaskFromIds([1, 3]), 5);
  assert.equal(valveCombinationLabel(5), '1+3');
  assert.equal(valveCombinationLabel(0), 'Open');
});
