import test from 'node:test';
import assert from 'node:assert/strict';

import {
  TablaModel,
  bayanPitchSemitones,
  classifyBayanZone,
  classifyDayanZone,
} from '../tabla-model.js';

test('maps dayan radial zones to common Phase 1 bols', () => {
  assert.equal(classifyDayanZone(0.9).id, 'na');
  assert.equal(classifyDayanZone(0.6).id, 'tin');
  assert.equal(classifyDayanZone(0.33).id, 'tun');
  assert.equal(classifyDayanZone(0.1).id, 'te');
});

test('maps the bayan outer ring to Ke', () => {
  assert.equal(classifyBayanZone(0.82, 0).id, 'ke');
});

test('uses heel pressure to distinguish Ge from Ghe', () => {
  assert.equal(classifyBayanZone(0.45, 0.1).id, 'ge');
  assert.equal(classifyBayanZone(0.45, 0.5).id, 'ghe');
});

test('bayan heel pressure bends pitch continuously', () => {
  assert.equal(bayanPitchSemitones(0, 7), 0);
  assert.ok(bayanPitchSemitones(0.5, 7) > 2);
  assert.equal(bayanPitchSemitones(1, 7), 7);
});

test('recognises Dha from an open bayan stroke and Na', () => {
  const model = new TablaModel();
  model.registerHit({ drum: 'bayan', radius: 0.5, timestamp: 1000 });
  const event = model.registerHit({ drum: 'dayan', radius: 0.85, timestamp: 1040 });
  assert.equal(event.compound, 'Dha');
});

test('recognises Dhin from an open bayan stroke and Tin', () => {
  const model = new TablaModel();
  model.registerHit({ drum: 'dayan', radius: 0.58, timestamp: 1000 });
  const event = model.registerHit({ drum: 'bayan', radius: 0.5, timestamp: 1050 });
  assert.equal(event.compound, 'Dhin');
});

test('detects a flam on the same drum', () => {
  const model = new TablaModel();
  model.registerHit({ drum: 'dayan', radius: 0.2, timestamp: 1000 });
  const event = model.registerHit({ drum: 'dayan', radius: 0.2, timestamp: 1060 });
  assert.equal(event.technique, 'Flam');
});

test('detects a rapid roll', () => {
  const model = new TablaModel();
  let event;
  [1000, 1060, 1120, 1180, 1240].forEach((timestamp) => {
    event = model.registerHit({ drum: 'dayan', radius: 0.2, timestamp });
  });
  assert.equal(event.technique, 'Roll');
});

test('validates supported dayan tonic pitches', () => {
  const model = new TablaModel();
  assert.equal(model.setDayanTonic(52), 52);
  assert.throws(() => model.setDayanTonic(70));
});
