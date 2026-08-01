/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { CHORD_PRESETS, GuitarModel, STRINGS, noteName } from './guitar-model.js';
import { GuitarSoundEngine } from './sound-engine.js';
import { GuitarUI } from './guitar-ui.js';
import { GuitarGestureController } from './gesture-controller.js';

const model = new GuitarModel();
const audio = new GuitarSoundEngine();
const ui = new GuitarUI(model);
const fretMode = document.getElementById('fretMode');
const bendRange = document.getElementById('bendRange');
const labelsToggle = document.getElementById('labelsToggle');

ui.bindHandlers({
  onPosition(start) {
    model.setWindowStart(start);
    model.heldPointers.clear();
    ui.renderPositionButtons();
    ui.renderFretboard();
    ui.update();
    ui.setAction(`Fret window ${model.windowStart}–${model.windowEnd}`);
  },
  onToggleMute(stringId) {
    const muted = model.toggleMute(stringId);
    if (muted) audio.stopString(stringId, 0.035);
    ui.renderFretboard();
    ui.renderPickingLanes();
    ui.update();
    ui.setAction(`${STRINGS[stringId].name}: ${muted ? 'muted' : 'open'}`);
  },
});

new GuitarGestureController({
  model,
  audio,
  ui,
  getMode: () => fretMode.value,
  getBendRange: () => Number(bendRange.value),
});

for (const button of document.querySelectorAll('[data-chord]')) {
  button.addEventListener('click', () => {
    const chord = button.dataset.chord;
    audio.stopAll(0.04);
    model.loadChord(chord);
    fretMode.value = 'latch';
    ui.render();
    ui.setAction(`${chord} loaded`);
    ui.setReport(`${chord} loaded in Latch mode. Strum downward from Low E towards High E, or upward in the opposite direction.`);
  });
}

document.getElementById('clearFingering').addEventListener('click', () => {
  const transitions = model.clearFretting();
  transitions.forEach(({ stringId }) => audio.stopString(stringId, 0.04));
  ui.render();
  ui.setAction('Fretting cleared');
  ui.setStroke('None');
  ui.setBend(0, 0, false);
});

for (const button of document.querySelectorAll('[data-test-string]')) {
  button.addEventListener('click', () => {
    const stringId = Number(button.dataset.testString);
    audio.pluck(stringId, model.midiForString(stringId), {
      velocity: 1,
      pickPosition: 0.55,
      direction: 'down',
      muted: model.isMuted(stringId),
    });
    ui.flashString(stringId);
    ui.setAction(`${STRINGS[stringId].name}: ${noteName(model.midiForString(stringId))}`);
    ui.setAudioStatus(audio.status());
    ui.setReport(`${STRINGS[stringId].name} diagnostic pluck. Each string now has its own loudness, decay and harmonic profile.`);
  });
}

document.getElementById('testAllStrings').addEventListener('click', () => {
  STRINGS.forEach((string, index) => {
    window.setTimeout(() => {
      audio.pluck(string.id, model.midiForString(string.id), {
        velocity: 1,
        pickPosition: 0.55,
        direction: 'down',
        muted: model.isMuted(string.id),
      });
      ui.flashString(string.id);
      ui.setAction(`${string.name}: ${noteName(model.midiForString(string.id))}`);
    }, index * 480);
  });
  ui.setAudioStatus(audio.status());
});

labelsToggle.addEventListener('change', () => {
  ui.fretboard.classList.toggle('labels-hidden', !labelsToggle.checked);
});

fretMode.addEventListener('change', () => {
  model.heldPointers.clear();
  ui.update();
  ui.setAction(`${fretMode.value === 'hold' ? 'Hold' : 'Latch'} fretting mode`);
});

bendRange.addEventListener('change', () => {
  ui.setReport(`Maximum bend set to ${bendRange.value} semitone${bendRange.value === '1' ? '' : 's'}. Hold a sounding string lane and drag right to bend.`);
});

function meterLoop() {
  const level = audio.peakLevel();
  ui.setMeter(level);
  ui.setAudioStatus(audio.status());
  requestAnimationFrame(meterLoop);
}

ui.render();
ui.setPalmMute(0);
meterLoop();

export { audio, model, ui, CHORD_PRESETS };
