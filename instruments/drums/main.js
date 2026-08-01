/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { DrumPerformanceModel } from './drum-model.js';
import { DrumSoundEngine } from './sound-engine.js';
import { EventLooper } from './looper.js';
import { DrumUI } from './drum-ui.js';
import { DrumGestureController } from './gesture-controller.js';

const model = new DrumPerformanceModel();
const audio = new DrumSoundEngine();
const ui = new DrumUI();

const settings = {
  bpm: document.getElementById('bpm'),
  bars: document.getElementById('bars'),
  quantise: document.getElementById('quantise'),
  metronome: document.getElementById('metronome'),
  countIn: document.getElementById('countIn'),
};

const looper = new EventLooper({
  getSettings: () => ({
    bpm: settings.bpm.value,
    bars: settings.bars.value,
    quantise: settings.quantise.value,
    metronome: settings.metronome.checked,
    countIn: settings.countIn.checked,
  }),
  onEvent: (event) => {
    audio.hit(event);
    ui.flashPad(event.padId);
  },
  onMetronome: (accent) => audio.metronome(accent),
  onState: (state) => {
    ui.setLoopState(state);
    ui.updateSteps(looper.events, looper.duration());
  },
  onClock: ({ elapsed, duration, step }) => {
    ui.setClock(elapsed, duration);
    ui.updateSteps(looper.events, duration, step);
  },
});

new DrumGestureController({ model, audio, looper, ui });

for (const button of document.querySelectorAll('[data-hat]')) {
  button.addEventListener('click', () => {
    model.setHiHatState(button.dataset.hat);
    ui.setHatState(model.hiHatState);
    ui.setReport(`Hi-hat set to ${model.hiHatState}. The same hi-hat pad now uses the matching decay and openness.`);
  });
}

document.getElementById('hatPedal').addEventListener('pointerdown', (event) => {
  event.preventDefault();
  const button = event.currentTarget;
  button.classList.add('active');
  audio.pedalChick();
  ui.flashPad('hihat');
  ui.setTechnique('pedal chick');
  ui.setAudioStatus(audio.status());
});
document.getElementById('hatPedal').addEventListener('pointerup', (event) => event.currentTarget.classList.remove('active'));
document.getElementById('hatPedal').addEventListener('pointercancel', (event) => event.currentTarget.classList.remove('active'));

document.getElementById('recordButton').addEventListener('click', () => {
  looper.startRecord();
  ui.setReport(settings.countIn.checked ? 'One-bar count-in started. Recording begins after four beats.' : 'Recording a new loop now. The loop closes automatically at the selected length.');
});

document.getElementById('overdubButton').addEventListener('click', () => {
  const result = looper.startOverdub();
  ui.setReport(result === 'recording' ? 'No loop existed, so a new recording has started.' : 'Overdub is active. Existing hits play while new hits are added to the same loop.');
});

document.getElementById('playButton').addEventListener('click', () => {
  if (!looper.startPlayback()) ui.setReport('The loop is empty. Record a performance first.');
  else ui.setReport('Loop playback started.');
});

document.getElementById('stopButton').addEventListener('click', () => {
  looper.stop();
  ui.setReport('Playback and recording stopped. The recorded events remain available.');
});

document.getElementById('clearLoopButton').addEventListener('click', () => {
  looper.clear();
  ui.updateSteps([], looper.duration());
  ui.setReport('Loop cleared.');
});

for (const control of [settings.bpm, settings.bars, settings.quantise]) {
  control.addEventListener('change', () => {
    if (looper.mode !== 'idle') looper.stop();
    ui.updateSteps(looper.events, looper.duration());
    ui.setClock(0, looper.duration());
  });
}

function meterLoop() {
  const value = audio.peakLevel();
  ui.setMeter(value);
  ui.setAudioStatus(audio.status());
  requestAnimationFrame(meterLoop);
}

ui.setHatState(model.hiHatState);
ui.setLoopState({ mode: 'idle', eventCount: 0 });
ui.setClock(0, looper.duration());
ui.updateSteps([], looper.duration());
meterLoop();

export { audio, looper, model, ui };
