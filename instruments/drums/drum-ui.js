/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { PAD_DEFINITIONS } from './drum-model.js';

export class DrumUI {
  constructor() {
    this.padGrid = document.getElementById('padGrid');
    this.stepView = document.getElementById('stepView');
    this.lastHit = document.getElementById('lastHit');
    this.technique = document.getElementById('technique');
    this.hatStatus = document.getElementById('hatStatus');
    this.loopStatus = document.getElementById('loopStatus');
    this.eventCount = document.getElementById('eventCount');
    this.audioStatus = document.getElementById('audioStatus');
    this.report = document.getElementById('report');
    this.level = document.getElementById('level');
    this.meter = document.getElementById('meter');
    this.loopClock = document.getElementById('loopClock');
    this.screenMode = document.getElementById('screenMode');
    this.recordButton = document.getElementById('recordButton');
    this.overdubButton = document.getElementById('overdubButton');
    this.playButton = document.getElementById('playButton');
    this.buildPads();
    this.buildSteps();
  }

  buildPads() {
    this.padGrid.replaceChildren();
    PAD_DEFINITIONS.forEach((definition) => {
      const pad = document.createElement('button');
      pad.type = 'button';
      pad.className = `drum-pad ${definition.family}`;
      pad.dataset.pad = definition.id;
      pad.setAttribute('aria-label', `${definition.name} drum surface`);
      pad.innerHTML = `<span class="pad-label"><strong>${definition.name}</strong><span>${definition.hint}</span></span><span class="zone-hints"><span>edge</span><span>centre</span><span>edge</span></span>`;
      this.padGrid.appendChild(pad);
    });
  }

  buildSteps() {
    this.stepView.replaceChildren();
    for (let index = 0; index < 16; index += 1) {
      const step = document.createElement('span');
      step.className = 'step';
      step.dataset.step = String(index);
      this.stepView.appendChild(step);
    }
  }

  padElement(padId) { return this.padGrid.querySelector(`[data-pad="${padId}"]`); }

  flashPad(padId, className = 'hit', duration = 120) {
    const pad = this.padElement(padId);
    if (!pad) return;
    pad.classList.add(className);
    window.setTimeout(() => pad.classList.remove(className), duration);
  }

  setHatState(state) {
    const label = state === 'half' ? 'Half-open' : state[0].toUpperCase() + state.slice(1);
    document.getElementById('hatReadout').textContent = label;
    this.hatStatus.textContent = label;
    document.querySelectorAll('[data-hat]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.hat === state)));
  }

  setHit(padName, articulation, velocity) {
    this.lastHit.textContent = padName;
    this.technique.textContent = `${articulation} · ${Math.round(velocity * 100)}%`;
  }

  setTechnique(value) { this.technique.textContent = value; }
  setReport(value) { this.report.textContent = value; }
  setAudioStatus(value) { this.audioStatus.textContent = value; }

  setLoopState({ mode, eventCount }) {
    const labels = { idle: eventCount ? 'Ready' : 'Empty', 'count-in': 'Count-in', recording: 'Recording', playing: 'Playing', overdubbing: 'Overdubbing' };
    this.loopStatus.textContent = labels[mode] ?? mode;
    this.screenMode.textContent = labels[mode] ?? mode;
    this.eventCount.textContent = String(eventCount);
    this.recordButton.classList.toggle('active', mode === 'recording' || mode === 'count-in');
    this.overdubButton.classList.toggle('active', mode === 'overdubbing');
    this.playButton.classList.toggle('active', mode === 'playing');
  }

  updateSteps(events, duration, playhead = -1) {
    const occupied = new Set(events.map((event) => Math.min(15, Math.floor((event.timeMs / duration) * 16))));
    [...this.stepView.children].forEach((step, index) => {
      step.classList.toggle('has-event', occupied.has(index));
      step.classList.toggle('playhead', index === playhead);
    });
  }

  setClock(elapsed, duration) { this.loopClock.textContent = `${(elapsed / 1000).toFixed(1)} / ${(duration / 1000).toFixed(1)}s`; }

  setMeter(value) {
    this.level.style.width = `${value}%`;
    this.meter.setAttribute('aria-valuenow', String(value));
  }
}
