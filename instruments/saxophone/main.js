/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { SaxophoneModel, noteName } from './saxophone-model.js';
import { SaxophoneSoundEngine } from './sound-engine.js';
import { SaxophoneUI } from './saxophone-ui.js';
import { SaxophoneGestureController } from './gesture-controller.js';

const model = new SaxophoneModel();
const audio = new SaxophoneSoundEngine();
const ui = new SaxophoneUI(model);

const fingeringMode = document.getElementById('fingeringMode');
const keyMode = document.getElementById('keyMode');
const airMode = document.getElementById('airMode');
const noteDisplay = document.getElementById('noteDisplay');
const bendRange = document.getElementById('bendRange');
const labelsToggle = document.getElementById('labelsToggle');

new SaxophoneGestureController({
  model,
  audio,
  ui,
  getKeyMode: () => keyMode.value,
  getAirMode: () => airMode.value,
});

fingeringMode.addEventListener('change', () => {
  model.setFingeringMode(fingeringMode.value);
  audio.sync(model, { transition: 0.025 });
  ui.update();
  ui.setTechnique(fingeringMode.value === 'assisted' ? 'Assisted fingering' : 'Exact fingering');
  ui.setReport(
    fingeringMode.value === 'assisted'
      ? 'Assisted mode resolves the nearest supported saxophone fingering and outlines any inferred keys. It is designed for immediate touchscreen playability.'
      : 'Exact mode only sounds a recognised Phase 1 key combination. Unsupported combinations stop the voice rather than silently changing the fingering.',
  );
});

keyMode.addEventListener('change', () => {
  model.setKeyMode(keyMode.value);
  model.clearKeys();
  audio.sync(model, { transition: 0.02 });
  ui.update();
  ui.setTechnique(`${keyMode.value === 'hold' ? 'Hold' : 'Latch'} key mode`);
});

airMode.addEventListener('change', () => {
  model.setAirMode(airMode.value);
  if (airMode.value === 'hold') {
    model.setAir(0);
    audio.sync(model, { release: 0.055 });
  }
  ui.update();
  ui.setTechnique(`${airMode.value === 'hold' ? 'Hold' : 'Latch'} air mode`);
});

noteDisplay.addEventListener('change', () => {
  model.setDisplayMode(noteDisplay.value);
  ui.clearHistory();
  ui.update();
  ui.setReport(
    noteDisplay.value === 'written'
      ? 'E-flat written display shows the note read by an alto saxophonist. It is nine semitones above the concert pitch that the engine sounds.'
      : 'Concert display shows the pitch actually heard. The alto saxophone fingering model still uses E-flat written notes internally.',
  );
});

bendRange.addEventListener('change', () => {
  model.setBendRange(Number(bendRange.value));
  audio.sync(model, { transition: 0.025 });
  ui.update();
  ui.setTechnique(`Reed bend range ±${bendRange.value}`);
});

labelsToggle.addEventListener('change', () => ui.update());

document.getElementById('airOff').addEventListener('click', () => {
  model.setAir(0);
  audio.stop(0.05);
  ui.update();
  ui.setTechnique('Air off');
});

document.getElementById('clearKeys').addEventListener('click', () => {
  model.clearKeys();
  audio.sync(model, { transition: 0.02 });
  ui.update();
  ui.setTechnique('Keys cleared');
});

document.getElementById('stopSax').addEventListener('click', () => {
  model.setAir(0);
  model.clearKeys();
  model.setEmbouchure(0, 0.55);
  audio.stop(0.04);
  ui.clearHistory();
  ui.update();
  ui.setTechnique('Stopped');
});

function previewWrittenSequence(sequence, delay = 430) {
  sequence.forEach((writtenMidi, index) => {
    window.setTimeout(() => {
      audio.preview(writtenMidi - 9, 0.34, 0.58 + index * 0.012);
      ui.setTechnique(`Diagnostic ${noteName(writtenMidi)} written`);
      ui.setReport(`${noteName(writtenMidi)} written sounds as ${noteName(writtenMidi - 9)} concert on E-flat alto saxophone.`);
    }, index * delay);
  });
}

document.getElementById('testScale').addEventListener('click', () => previewWrittenSequence([62, 64, 65, 66, 67, 69, 71, 72, 73]));
document.getElementById('testLow').addEventListener('click', () => previewWrittenSequence([58, 59, 60, 61, 62], 520));
document.getElementById('testPalm').addEventListener('click', () => previewWrittenSequence([86, 88, 89], 620));

function meterLoop() {
  ui.setMeter(audio.peakLevel());
  ui.setAudio(audio.status());
  requestAnimationFrame(meterLoop);
}

ui.render();
ui.setTechnique('Ready');
meterLoop();

export { audio, model, ui };
