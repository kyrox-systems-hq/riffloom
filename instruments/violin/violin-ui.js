/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { POSITION_WINDOWS, VIOLIN_STRINGS, noteName } from './violin-model.js';

export class ViolinUI {
  constructor(model) {
    this.model = model;
    this.positionButtons = document.getElementById('positionButtons');
    this.positionReadout = document.getElementById('positionReadout');
    this.fingerboard = document.getElementById('fingerboard');
    this.bowLanes = document.getElementById('bowLanes');
    this.currentNotes = document.getElementById('currentNotes');
    this.lastAction = document.getElementById('lastAction');
    this.bowStatus = document.getElementById('bowStatus');
    this.techniqueStatus = document.getElementById('techniqueStatus');
    this.intonationStatus = document.getElementById('intonationStatus');
    this.audioStatus = document.getElementById('audioStatus');
    this.report = document.getElementById('report');
    this.level = document.getElementById('level');
    this.meter = document.getElementById('meter');
    this.labelsToggle = document.getElementById('labelsToggle');
    this.bowWeight = document.getElementById('bowWeight');
    this.onPosition = null;
  }

  bindHandlers({ onPosition }) {
    this.onPosition = onPosition;
  }

  render() {
    this.renderPositionButtons();
    this.renderFingerboard();
    this.renderBowLanes();
    this.update();
  }

  renderPositionButtons() {
    this.positionButtons.replaceChildren();
    POSITION_WINDOWS.forEach((start) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'position-button';
      button.textContent = `${start}–${Math.min(33, start + this.model.windowSpan)}`;
      button.setAttribute('aria-pressed', String(start === this.model.windowStart));
      button.addEventListener('click', () => this.onPosition?.(start));
      this.positionButtons.appendChild(button);
    });
    this.positionReadout.textContent = `${this.model.windowStart} to ${this.model.windowEnd} semitones`;
  }

  renderFingerboard() {
    this.fingerboard.replaceChildren();
    const span = this.model.windowEnd - this.model.windowStart;

    VIOLIN_STRINGS.forEach((string) => {
      const row = document.createElement('div');
      row.className = 'finger-row';

      const label = document.createElement('div');
      label.className = 'string-label';
      label.innerHTML = `<strong>${string.name}</strong><span>${noteName(this.model.midiForString(string.id), this.model.intonationMode === 'free')}</span>`;

      const track = document.createElement('div');
      track.className = 'finger-track';
      track.dataset.string = String(string.id);
      track.setAttribute('aria-label', `${string.name} string fingerboard`);

      for (let offset = Math.ceil(this.model.windowStart); offset <= Math.floor(this.model.windowEnd); offset += 1) {
        const percent = ((offset - this.model.windowStart) / span) * 100;
        const line = document.createElement('div');
        line.className = 'pitch-line';
        line.style.left = `${percent}%`;
        const text = document.createElement('span');
        text.textContent = offset === 0 ? 'open' : noteName(string.openMidi + offset);
        line.appendChild(text);
        track.appendChild(line);
      }

      const markers = document.createElement('div');
      markers.className = 'finger-markers';
      for (const marker of this.model.markersForString(string.id)) {
        if (marker.offset < this.model.windowStart || marker.offset > this.model.windowEnd) continue;
        const percent = ((marker.offset - this.model.windowStart) / span) * 100;
        const element = document.createElement('div');
        element.className = `finger-marker ${marker.kind}`;
        element.style.left = `${percent}%`;
        element.innerHTML = `<b>${noteName(string.openMidi + marker.offset, this.model.intonationMode === 'free')}</b><small>${marker.offset.toFixed(this.model.intonationMode === 'free' ? 2 : 0)}</small>`;
        markers.appendChild(element);
      }
      track.appendChild(markers);

      row.append(label, track);
      this.fingerboard.appendChild(row);
    });

    this.fingerboard.classList.toggle('labels-hidden', !this.labelsToggle.checked);
  }

  renderBowLanes() {
    this.bowLanes.replaceChildren();
    VIOLIN_STRINGS.forEach((string) => {
      const lane = document.createElement('div');
      lane.className = 'bow-lane';
      lane.dataset.string = String(string.id);
      lane.innerHTML = `
        <div class="double-zone top-zone"></div>
        <strong>${string.name}</strong>
        <span>${noteName(this.model.midiForString(string.id), this.model.intonationMode === 'free')}</span>
        <div class="bow-string"></div>
        <div class="double-zone bottom-zone"></div>`;
      this.bowLanes.appendChild(lane);
    });
  }

  update() {
    this.currentNotes.textContent = VIOLIN_STRINGS
      .map((string) => noteName(this.model.midiForString(string.id), this.model.intonationMode === 'free'))
      .join(' · ');

    this.intonationStatus.textContent = this.model.intonationMode === 'free' ? 'Free pitch' : 'Assisted';

    for (const row of this.fingerboard.querySelectorAll('.finger-row')) {
      const stringId = Number(row.querySelector('.finger-track').dataset.string);
      row.querySelector('.string-label span').textContent = noteName(
        this.model.midiForString(stringId),
        this.model.intonationMode === 'free',
      );
    }

    for (const lane of this.bowLanes.querySelectorAll('.bow-lane')) {
      const stringId = Number(lane.dataset.string);
      lane.querySelector('span').textContent = noteName(
        this.model.midiForString(stringId),
        this.model.intonationMode === 'free',
      );
    }
  }

  refreshFingerboard() {
    this.renderPositionButtons();
    this.renderFingerboard();
    this.renderBowLanes();
    this.update();
  }

  flashStrings(stringIds, duration = 120) {
    stringIds.forEach((stringId) => {
      const lane = this.bowLanes.querySelector(`[data-string="${stringId}"]`);
      lane?.classList.add('active');
      window.setTimeout(() => lane?.classList.remove('active'), duration);
    });
  }

  setAction(text) {
    this.lastAction.textContent = text;
  }

  setBow(text) {
    this.bowStatus.textContent = text;
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

  baselineBowPressure() {
    return Number(this.bowWeight.value);
  }
}
