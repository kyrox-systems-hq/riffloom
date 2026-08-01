/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { ViolinModel, VIOLIN_STRINGS, noteName } from './violin-model.js';
import { ViolinSoundEngine } from './sound-engine.js';
import { ViolinUI } from './violin-ui.js';
import { ViolinGestureController } from './gesture-controller.js';

const model = new ViolinModel();
const audio = new ViolinSoundEngine();
const ui = new ViolinUI(model);

const fingerMode = document.getElementById('fingerMode');
const intonationMode = document.getElementById('intonationMode');
const playMode = document.getElementById('playMode');
const labelsToggle = document.getElementById('labelsToggle');

ui.bindHandlers({
  onPosition(start) {
    model.setWindow(start);
    model.heldPointers.clear();
    ui.refreshFingerboard();
    ui.setAction(`Pitch window ${model.windowStart}–${model.windowEnd}`);
  },
});

new ViolinGestureController({
  model,
  audio,
  ui,
  getFingerMode: () => fingerMode.value,
  getPlayMode: () => playMode.value,
});

fingerMode.addEventListener('change', () => {
  model.setFingerMode(fingerMode.value);
  model.heldPointers.clear();
  ui.refreshFingerboard();
  ui.setAction(`${fingerMode.value === 'hold' ? 'Hold' : 'Latch'} finger mode`);
});

intonationMode.addEventListener('change', () => {
  model.setIntonationMode(intonationMode.value);
  model.heldPointers.clear();
  ui.refreshFingerboard();
  ui.setTechnique(intonationMode.value === 'free' ? 'Continuous pitch enabled' : 'Semitone assistance enabled');
  ui.setReport(
    intonationMode.value === 'free'
      ? 'Free intonation preserves continuous pitch. Slide and vibrato gestures are no longer snapped to semitone centres.'
      : 'Assisted intonation snaps finger positions to semitones while keeping the same bowing gestures.',
  );
  VIOLIN_STRINGS.forEach((string) => {
    if (audio.isBowing(string.id)) audio.updatePitch(string.id, model.midiForString(string.id), 0.04);
  });
});

playMode.addEventListener('change', () => {
  audio.stopAll(0.04);
  ui.setBow(playMode.value === 'bow' ? 'Move left or right' : 'Tap or sweep strings');
  ui.setTechnique(playMode.value === 'bow' ? 'Bowed mode' : 'Pizzicato mode');
  ui.setReport(
    playMode.value === 'bow'
      ? 'Swipe right for down-bow and left for up-bow. Bow speed controls energy. Touch near a lane boundary for an adjacent-string double stop.'
      : 'Tap a string for pizzicato. Drag vertically through several lanes for a pizzicato arpeggio.',
  );
});

labelsToggle.addEventListener('change', () => {
  ui.fingerboard.classList.toggle('labels-hidden', !labelsToggle.checked);
});

document.getElementById('clearFingering').addEventListener('click', () => {
  model.clear();
  audio.stopAll(0.04);
  ui.refreshFingerboard();
  ui.setAction('Fingering cleared');
  ui.setTechnique('Open strings');
  ui.setBow('Stopped');
});

for (const button of document.querySelectorAll('[data-test-string]')) {
  button.addEventListener('click', () => {
    const stringId = Number(button.dataset.testString);
    const midi = model.midiForString(stringId);
    const weight = ui.baselineBowPressure();
    audio.bow(stringId, midi, {
      velocity: 0.72,
      pressure: weight,
      contact: 0.5,
      direction: 'down',
    });
    ui.flashStrings([stringId], 650);
    ui.setAction(`${VIOLIN_STRINGS[stringId].name}: ${noteName(midi, model.intonationMode === 'free')}`);
    ui.setBow('Down-bow test');
    ui.setTechnique('Sustained open-string test');
    ui.setAudio(audio.status());
    window.setTimeout(() => audio.stopBow(stringId, 0.1), 650);
  });
}

document.getElementById('testAllStrings').addEventListener('click', () => {
  VIOLIN_STRINGS.forEach((string, index) => {
    window.setTimeout(() => {
      const midi = model.midiForString(string.id);
      audio.bow(string.id, midi, {
        velocity: 0.75,
        pressure: ui.baselineBowPressure(),
        contact: 0.5,
        direction: index % 2 ? 'up' : 'down',
      });
      ui.flashStrings([string.id], 560);
      ui.setAction(`${string.name}: ${noteName(midi, model.intonationMode === 'free')}`);
      window.setTimeout(() => audio.stopBow(string.id, 0.08), 520);
    }, index * 700);
  });
  ui.setTechnique('Four-string balance test');
});

function meterLoop() {
  ui.setMeter(audio.peakLevel());
  ui.setAudio(audio.status());
  requestAnimationFrame(meterLoop);
}

ui.render();
ui.setBow('Move left or right');
ui.setTechnique('Ready');
meterLoop();

export { audio, model, ui };
