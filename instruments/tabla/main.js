/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { TablaModel } from './tabla-model.js';
import { TablaSoundEngine } from './sound-engine.js';
import { TablaUI } from './tabla-ui.js';
import { TablaGestureController } from './gesture-controller.js';

const model = new TablaModel();
const audio = new TablaSoundEngine();
const ui = new TablaUI(model);

const tonicSelect = document.getElementById('dayanTonic');
const bendSelect = document.getElementById('bayanBend');
const labelsToggle = document.getElementById('labelsToggle');

new TablaGestureController({ model, audio, ui });

const TEST_STROKES = {
  ge: { drum: 'bayan', radius: 0.48 },
  ke: { drum: 'bayan', radius: 0.86 },
  na: { drum: 'dayan', radius: 0.86 },
  tin: { drum: 'dayan', radius: 0.58 },
  tun: { drum: 'dayan', radius: 0.34 },
  te: { drum: 'dayan', radius: 0.12 },
};

function playRegisteredEvent(event) {
  audio.play(event, {
    tonicMidi: model.dayanTonicMidi,
    maximumBend: model.maximumBend,
  });
  ui.handleEvent(event);
  ui.setAudio(audio.status());
}

function playSingleTest(id, timestamp = performance.now()) {
  const definition = TEST_STROKES[id];
  if (!definition) return null;
  const event = model.registerHit({
    drum: definition.drum,
    radius: definition.radius,
    velocity: 0.94,
    timestamp,
    pointerId: `test-${id}`,
  });
  playRegisteredEvent(event);
  ui.flashHit(definition.drum, 50, definition.radius * 50 + 25);
  return event;
}

function playCompoundTest(type) {
  const start = performance.now();
  const dayanStroke = type === 'dha' ? 'na' : 'tin';
  playSingleTest('ge', start);
  window.setTimeout(() => playSingleTest(dayanStroke, start + 36), 36);
}

for (const button of document.querySelectorAll('[data-test-bol]')) {
  button.addEventListener('click', () => {
    const bol = button.dataset.testBol;
    if (bol === 'dha' || bol === 'dhin') playCompoundTest(bol);
    else playSingleTest(bol);
  });
}

document.getElementById('testAllBols').addEventListener('click', () => {
  const sequence = ['ge', 'ke', 'na', 'tin', 'tun', 'te', 'dha', 'dhin'];
  sequence.forEach((bol, index) => {
    window.setTimeout(() => {
      if (bol === 'dha' || bol === 'dhin') playCompoundTest(bol);
      else playSingleTest(bol);
    }, index * 620);
  });
  ui.setReport('Testing the Phase 1 bol palette. Compare resonant open strokes with short closed strokes, then compare the compound bols Dha and Dhin.');
});

document.getElementById('clearBolHistory').addEventListener('click', () => {
  model.clearHistory();
  ui.renderBolHistory();
  ui.lastBol.textContent = 'None';
  ui.lastStroke.textContent = 'Ready';
  ui.techniqueStatus.textContent = 'Ready';
});

document.getElementById('dampAll').addEventListener('click', () => {
  audio.dampAll(0.035);
  ui.techniqueStatus.textContent = 'Both drums damped';
  ui.setReport('All currently ringing tabla voices were damped.');
});

tonicSelect.addEventListener('change', () => {
  model.setDayanTonic(Number(tonicSelect.value));
  ui.updateTonic();
  ui.setReport(`Dayan tonic changed to ${tonicSelect.options[tonicSelect.selectedIndex].text}. The Na and related resonant profiles now follow this tuning.`);
});

bendSelect.addEventListener('change', () => {
  model.setMaximumBend(Number(bendSelect.value));
  audio.updateHeelPressure(model.heelPressure, model.maximumBend);
  ui.updatePressure();
  ui.setReport(`Maximum bayan pressure bend set to ${model.maximumBend} semitones.`);
});

labelsToggle.addEventListener('change', () => ui.updateLabels());

function meterLoop() {
  ui.setMeter(audio.peakLevel());
  ui.setAudio(audio.status());
  requestAnimationFrame(meterLoop);
}

ui.render();
meterLoop();

export { audio, model, ui };
