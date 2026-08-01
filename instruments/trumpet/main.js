/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { HARMONIC_SLOTS, TrumpetModel, noteName } from './trumpet-model.js';
import { TrumpetSoundEngine } from './sound-engine.js';
import { TrumpetUI } from './trumpet-ui.js';
import { TrumpetGestureController } from './gesture-controller.js';

const model = new TrumpetModel();
const audio = new TrumpetSoundEngine();
const ui = new TrumpetUI(model);

const pitchMode = document.getElementById('pitchMode');
const valveMode = document.getElementById('valveMode');
const airMode = document.getElementById('airMode');
const noteDisplay = document.getElementById('noteDisplay');
const bendRange = document.getElementById('bendRange');
const labelsToggle = document.getElementById('labelsToggle');

new TrumpetGestureController({
  model,
  audio,
  ui,
  getAirMode: () => airMode.value,
  getValveMode: () => valveMode.value,
});

pitchMode.addEventListener('change', () => {
  model.setPitchMode(pitchMode.value);
  audio.sync(model, { transition: 0.04 });
  ui.refreshPitchLabels();
  ui.setTechnique(pitchMode.value === 'free' ? 'Free lip enabled' : 'Assisted harmonics enabled');
  ui.setReport(
    pitchMode.value === 'free'
      ? 'Free lip mode keeps the harmonic field continuous. Vertical movement produces continuous lip slurs, while horizontal movement provides the selected bend range.'
      : 'Assisted mode snaps vertical embouchure movement to stable harmonic slots and limits horizontal movement to fine intonation.',
  );
});

valveMode.addEventListener('change', () => {
  model.setValveMode(valveMode.value);
  model.clearValves();
  audio.sync(model, { transition: 0.02 });
  ui.refreshPitchLabels();
  ui.setTechnique(`${valveMode.value === 'hold' ? 'Hold' : 'Latch'} valve mode`);
});

airMode.addEventListener('change', () => {
  model.setAirMode(airMode.value);
  if (airMode.value === 'hold') {
    model.setAir(0);
    audio.sync(model, { release: 0.06 });
  }
  ui.update();
  ui.setTechnique(`${airMode.value === 'hold' ? 'Hold' : 'Latch'} air mode`);
});

noteDisplay.addEventListener('change', () => {
  model.setDisplay(noteDisplay.value);
  ui.refreshPitchLabels();
  ui.setReport(
    noteDisplay.value === 'written'
      ? 'Written-note display shows the notation used by a B-flat trumpet player, two semitones above concert pitch. The sound itself remains at concert pitch.'
      : 'Concert-note display shows the pitch actually heard. B-flat written notation can be selected separately.',
  );
});

bendRange.addEventListener('change', () => {
  model.setBendRange(Number(bendRange.value));
  ui.update();
  ui.setTechnique(`Lip bend range ±${bendRange.value}`);
});

labelsToggle.addEventListener('change', () => {
  ui.lipField.classList.toggle('labels-hidden', !labelsToggle.checked);
});

document.getElementById('clearValves').addEventListener('click', () => {
  model.clearValves();
  audio.sync(model, { transition: 0.02 });
  ui.refreshPitchLabels();
  ui.setTechnique('Valves open');
});

document.getElementById('stopTrumpet').addEventListener('click', () => {
  model.setAir(0);
  model.clearValves();
  audio.stop(0.05);
  ui.refreshPitchLabels();
  ui.setTechnique('Stopped');
});

document.getElementById('testHarmonics').addEventListener('click', () => {
  HARMONIC_SLOTS.slice(0, 6).forEach((slot, index) => {
    window.setTimeout(() => {
      audio.preview(slot.concertMidi, 0.48, 0.72 + index * 0.025);
      ui.setTechnique(`Open harmonic H${slot.harmonic}`);
      ui.setReport(`Diagnostic open harmonic: ${noteName(slot.concertMidi)} concert pitch.`);
    }, index * 620);
  });
});

document.getElementById('testValves').addEventListener('click', () => {
  const base = HARMONIC_SLOTS[2].concertMidi;
  [0, -1, -2, -3, -4, -5, -6].forEach((shift, index) => {
    window.setTimeout(() => {
      audio.preview(base + shift, 0.42, 0.72);
      ui.setTechnique(`Valve test ${shift === 0 ? 'open' : `${shift} semitones`}`);
    }, index * 540);
  });
});

function meterLoop() {
  ui.setMeter(audio.peakLevel());
  ui.setAudio(audio.status());
  requestAnimationFrame(meterLoop);
}

ui.render();
ui.setTechnique('Ready');
meterLoop();

export { audio, model, ui };
