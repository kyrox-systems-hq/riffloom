/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { POSITION_STARTS, STRINGS, noteName } from './guitar-model.js';

export class GuitarUI {
  constructor(model) {
    this.model = model;
    this.positionButtons = document.getElementById('positionButtons');
    this.positionReadout = document.getElementById('positionReadout');
    this.fretboard = document.getElementById('fretboard');
    this.stringLanes = document.getElementById('stringLanes');
    this.palmRail = document.getElementById('palmRail');
    this.palmFill = document.getElementById('palmFill');
    this.currentNotes = document.getElementById('currentNotes');
    this.lastAction = document.getElementById('lastAction');
    this.strokeStatus = document.getElementById('strokeStatus');
    this.bendStatus = document.getElementById('bendStatus');
    this.palmStatus = document.getElementById('palmStatus');
    this.audioStatus = document.getElementById('audioStatus');
    this.report = document.getElementById('report');
    this.level = document.getElementById('level');
    this.meter = document.getElementById('meter');
    this.labelsToggle = document.getElementById('labelsToggle');
    this.handlers = {};
  }

  bindHandlers(handlers) {
    this.handlers = handlers;
  }

  render() {
    this.renderPositionButtons();
    this.renderFretboard();
    this.renderPickingLanes();
    this.update();
  }

  renderPositionButtons() {
    this.positionButtons.replaceChildren();
    POSITION_STARTS.forEach((start) => {
      const end = Math.min(24, start + 5);
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'position-button';
      button.textContent = `${start}–${end}`;
      button.setAttribute('aria-pressed', String(this.model.windowStart === start));
      button.addEventListener('click', () => this.handlers.onPosition?.(start));
      this.positionButtons.appendChild(button);
    });
    this.positionReadout.textContent = `${this.model.windowStart} to ${this.model.windowEnd}`;
  }

  renderFretboard() {
    this.fretboard.replaceChildren();
    const fragment = document.createDocumentFragment();

    STRINGS.forEach((string) => {
      const row = document.createElement('div');
      row.className = 'fret-row';
      row.dataset.string = String(string.id);

      const head = document.createElement('button');
      head.type = 'button';
      head.className = 'string-head';
      head.dataset.string = String(string.id);
      head.innerHTML = `<strong>${string.short}</strong><small>${this.model.isMuted(string.id) ? 'X' : 'O'}</small>`;
      head.classList.toggle('muted', this.model.isMuted(string.id));
      head.setAttribute('aria-label', `${string.name} string, ${this.model.isMuted(string.id) ? 'muted' : 'open'}`);
      head.addEventListener('click', () => this.handlers.onToggleMute?.(string.id));
      row.appendChild(head);

      for (let fret = this.model.windowStart; fret <= this.model.windowEnd; fret += 1) {
        const cell = document.createElement('div');
        cell.className = 'fret-cell';
        cell.dataset.string = String(string.id);
        cell.dataset.fret = String(fret);
        cell.style.setProperty('--string-width', `${Math.max(1.3, string.gauge * 0.42)}px`);
        cell.innerHTML = `<span>${noteName(string.openMidi + fret)}</span><b>${fret}</b>`;
        row.appendChild(cell);
      }

      fragment.appendChild(row);
    });

    this.fretboard.appendChild(fragment);
    this.fretboard.classList.toggle('labels-hidden', !this.labelsToggle.checked);
  }

  renderPickingLanes() {
    this.stringLanes.replaceChildren();
    const fragment = document.createDocumentFragment();
    STRINGS.forEach((string) => {
      const lane = document.createElement('div');
      lane.className = 'string-lane';
      lane.dataset.string = String(string.id);
      lane.style.setProperty('--string-width', `${string.gauge}px`);
      lane.innerHTML = `
        <strong>${string.short}</strong>
        <span class="lane-note"></span>
        <span class="bend-readout">0¢</span>
      `;
      fragment.appendChild(lane);
    });
    this.stringLanes.appendChild(fragment);
  }

  update() {
    document.querySelectorAll('.fret-cell').forEach((cell) => {
      const stringId = Number(cell.dataset.string);
      const fret = Number(cell.dataset.fret);
      const latched = this.model.latchedFrets[stringId].has(fret);
      const held = [...this.model.heldPointers.values()].some((pointer) => pointer.cells.get(stringId) === fret);
      cell.classList.toggle('active', latched || held);
    });

    document.querySelectorAll('.string-head').forEach((head) => {
      const stringId = Number(head.dataset.string);
      const muted = this.model.isMuted(stringId);
      head.classList.toggle('muted', muted);
      head.querySelector('small').textContent = muted ? 'X' : 'O';
    });

    document.querySelectorAll('.string-lane').forEach((lane) => {
      const stringId = Number(lane.dataset.string);
      const muted = this.model.isMuted(stringId);
      lane.classList.toggle('muted', muted);
      lane.querySelector('.lane-note').textContent = muted
        ? 'X'
        : noteName(this.model.midiForString(stringId));
    });

    this.currentNotes.textContent = this.model.currentNotes().join(' · ');
    this.positionReadout.textContent = `${this.model.windowStart} to ${this.model.windowEnd}`;
    document.querySelectorAll('.position-button').forEach((button, index) => {
      button.setAttribute('aria-pressed', String(POSITION_STARTS[index] === this.model.windowStart));
    });
  }

  fretCellAt(clientX, clientY) {
    return document.elementFromPoint(clientX, clientY)?.closest('.fret-cell') ?? null;
  }

  laneAt(clientX, clientY) {
    return document.elementFromPoint(clientX, clientY)?.closest('.string-lane') ?? null;
  }

  setAction(message) {
    this.lastAction.textContent = message;
  }

  setStroke(message) {
    this.strokeStatus.textContent = message;
  }

  setBend(stringId, cents, vibrato = false) {
    const lane = document.querySelector(`.string-lane[data-string="${stringId}"]`);
    if (lane) lane.querySelector('.bend-readout').textContent = `${Math.round(cents)}¢`;
    this.bendStatus.textContent = vibrato
      ? `${STRINGS[stringId].short}: vibrato`
      : Math.abs(cents) > 2
        ? `${STRINGS[stringId].short}: ${Math.round(cents)}¢`
        : 'None';
  }

  setPalmMute(depth) {
    const percentage = Math.round(depth * 100);
    this.palmFill.style.width = `${percentage}%`;
    this.palmStatus.textContent = depth > 0 ? `${percentage}%` : 'Off';
    this.palmRail.setAttribute('aria-valuenow', String(percentage));
  }

  setAudioStatus(status) {
    this.audioStatus.textContent = status;
  }

  flashString(stringId) {
    const lane = document.querySelector(`.string-lane[data-string="${stringId}"]`);
    if (!lane) return;
    lane.classList.add('played');
    window.setTimeout(() => lane.classList.remove('played'), 130);
  }

  setReport(message) {
    this.report.textContent = message;
  }

  setMeter(value) {
    this.level.style.width = `${value}%`;
    this.meter.setAttribute('aria-valuenow', String(value));
  }
}
