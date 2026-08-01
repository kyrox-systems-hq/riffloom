import test from 'node:test';
import assert from 'node:assert/strict';
import { DrumPerformanceModel, PAD_DEFINITIONS, classifyZone, loopDurationMs, quantiseTime } from '../drum-model.js';

test('kit exposes eight packed surfaces', () => {
  assert.equal(PAD_DEFINITIONS.length, 8);
  assert.deepEqual(PAD_DEFINITIONS.map((pad) => pad.id), ['crash', 'highTom', 'midTom', 'ride', 'hihat', 'snare', 'floorTom', 'kick']);
});

test('snare zones distinguish head, rimshot and cross-stick', () => {
  assert.equal(classifyZone('snare', 0.5, 0.5), 'head');
  assert.equal(classifyZone('snare', 0.5, 0.02), 'rimshot');
  assert.equal(classifyZone('snare', 0.02, 0.5), 'cross-stick');
});

test('ride centre is bell and outside is edge', () => {
  assert.equal(classifyZone('ride', 0.5, 0.5), 'bell');
  assert.equal(classifyZone('ride', 0.5, 0.92), 'edge');
});

test('loop duration follows four beats per bar', () => {
  assert.equal(loopDurationMs(120, 1), 2000);
  assert.equal(loopDurationMs(120, 4), 8000);
});

test('sixteenth quantisation rounds to nearest step', () => {
  assert.equal(quantiseTime(117, 120, 16), 125);
  assert.equal(quantiseTime(55, 120, 16), 0);
});

test('hi-hat state rejects invalid values', () => {
  const model = new DrumPerformanceModel();
  model.setHiHatState('open');
  assert.equal(model.hiHatState, 'open');
  assert.throws(() => model.setHiHatState('broken'), RangeError);
});

test('two alternating close hits are recognised as a flam', () => {
  const model = new DrumPerformanceModel();
  model.registerHit('snare', 1, 1000);
  const result = model.registerHit('snare', 2, 1060);
  assert.equal(result.technique, 'flam');
});

test('four rapid hits are recognised as a roll', () => {
  const model = new DrumPerformanceModel();
  model.registerHit('snare', 1, 1000);
  model.registerHit('snare', 2, 1110);
  model.registerHit('snare', 1, 1220);
  const result = model.registerHit('snare', 2, 1330);
  assert.equal(result.technique, 'roll');
});
