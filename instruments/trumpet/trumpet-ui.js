/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { HARMONIC_SLOTS, VALVES, noteName, valveCombinationLabel } from './trumpet-model.js';

export class TrumpetUI {
  constructor(model) {
    this.model = model;
    this.airRail = document.getElementById('airRail');
    this.airFill = document.getElementById('airFill');
    this.airThumb = document.getElementById('airThumb');
    this.airReadout = document.getElementById('airReadout');
    this.airRelease = document.getElementById('airRelease');
    this.lipField = document.getElementById('lipField');
    this.lipBands = document.getElementById('lipBands');
    this.lipMarker = document.getElementById('lipMarker');
    this.tonguePad = document.getElementById('tonguePad');
    this.valveBank = document.getElementById('valveBank');
    this.currentNote = document.getElementById('currentNote');
    this.currentNoteMetric = document.getElementById('currentNoteMetric');
    this.concertNote = document.getElementById('concertNote');
    this.harmonicStatus = document.getElementById('harmonicStatus');
    this.valveStatus = document.getElementById('valveStatus');
    this.airStatus = document.getElementById('airStatus');
    this.techniqueStatus = document.getElementById('techniqueStatus');
    this.audioStatus = document.getElementById('audioStatus');
    this.report = document.getElementById('report');
    this.level = document.getElementById('level');
    this.meter = document.getElementById('meter');
    this.labelsToggle = document.getElementById('labelsToggle');
  }

  render() {
    this.renderLipBands();
    this.renderValves();
    this.update();
  }

  renderLipBands() {
    this.lipBands.replaceChildren();
    [...HARMONIC_SLOTS].reverse().forEach((slot, reverseIndex) => {
      const actualIndex = HARMONIC_SLOTS.length - 1 - reverseIndex;
      const band = document.createElement('div');
      band.className = 'lip-band';
      band.dataset.slot = String(actualIndex);
      const concertMidi = slot.concertMidi + this.model.valveShift();
      const displayMidi = concertMidi + (this.model.noteDisplay === 'written' ? 2 : 0);
      band.innerHTML = `<span class="band-role">${slot.role}</span><strong>${noteName(displayMidi)}</strong><small>H${slot.harmonic}</small>`;
      this.lipBands.appendChild(band);
    });
    this.lipField.classList.toggle('labels-hidden', !this.labelsToggle.checked);
  }

  renderValves() {
    this.valveBank.replaceChildren();
    VALVES.forEach((valve) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'valve-pad';
      button.dataset.valve = String(valve.id);
      button.setAttribute('aria-pressed', String(this.model.activeValveIds().includes(valve.id)));
      button.innerHTML = `<span class="valve-cap"></span><strong>${valve.label}</strong><small>−${valve.semitones} semitone${valve.semitones === 1 ? '' : 's'}</small><span class="valve-stem"></span>`;
      this.valveBank.appendChild(button);
    });
  }

  updateLipMarker() {
    const denominator = this.model.pitchMode === 'assisted'
      ? Math.min(0.7, this.model.bendRange)
      : 2 * this.model.bendRange;
    const x = denominator > 0 ? 0.5 + this.model.lipBend / denominator : 0.5;
    const y = 1 - this.model.slotPosition / (HARMONIC_SLOTS.length - 1);
    this.lipMarker.style.left = `${Math.max(0, Math.min(100, x * 100))}%`;
    this.lipMarker.style.top = `${Math.max(0, Math.min(100, y * 100))}%`;
    this.lipMarker.querySelector('strong').textContent = this.model.currentNoteName();
    this.lipMarker.querySelector('small').textContent = `${this.model.harmonicLabel()} · ${this.model.lipBend >= 0 ? '+' : ''}${this.model.lipBend.toFixed(2)}`;
  }

  updateAir() {
    const percent = Math.round(this.model.air * 100);
    this.airFill.style.height = `${percent}%`;
    this.airThumb.style.bottom = `calc(${percent}% - 12px)`;
    this.airReadout.textContent = `${percent}%`;
    this.airRail.setAttribute('aria-valuenow', String(percent));
    this.airStatus.textContent = percent === 0 ? 'Off' : `${percent}%`;
  }

  updateValves() {
    const active = this.model.activeValveIds();
    for (const pad of this.valveBank.querySelectorAll('.valve-pad')) {
      const valveId = Number(pad.dataset.valve);
      const pressed = active.includes(valveId);
      pad.classList.toggle('pressed', pressed);
      pad.setAttribute('aria-pressed', String(pressed));
    }
    this.valveStatus.textContent = valveCombinationLabel(this.model.valveMask());
  }

  update() {
    this.currentNote.textContent = this.model.currentNoteName();
    this.currentNoteMetric.textContent = this.model.currentNoteName();
    this.concertNote.textContent = noteName(this.model.currentConcertMidi(), this.model.pitchMode === 'free' || Math.abs(this.model.lipBend) > 0.01);
    this.harmonicStatus.textContent = `${this.model.harmonicLabel()} · ${this.model.pitchMode === 'free' ? 'Free lip' : 'Assisted'}`;
    this.updateAir();
    this.updateValves();
    this.updateLipMarker();
  }

  refreshPitchLabels() {
    this.renderLipBands();
    this.update();
  }

  flashValve(valveId) {
    const pad = this.valveBank.querySelector(`[data-valve="${valveId}"]`);
    pad?.classList.add('hit');
    window.setTimeout(() => pad?.classList.remove('hit'), 90);
  }

  flashTongue() {
    this.tonguePad.classList.add('active');
    window.setTimeout(() => this.tonguePad.classList.remove('active'), 100);
  }

  setTechnique(text) {
    this.techniqueStatus.textContent = text;
  }

  setAudio(text) {
    this.audioStatus.textContent = text;
  }

  setReport(text) {
    this.report.textContent = text;
  }

  setMeter(value) {
    const clamped = Math.max(0, Math.min(100, value));
    this.level.style.width = `${clamped}%`;
    this.meter.setAttribute('aria-valuenow', String(clamped));
  }
}
