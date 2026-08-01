/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { FINGERINGS, noteName } from './saxophone-model.js';

export class SaxophoneUI {
  constructor(model) {
    this.model = model;
    this.saxPhone = document.getElementById('saxPhone');
    this.airRail = document.getElementById('airRail');
    this.airFill = document.getElementById('airFill');
    this.airThumb = document.getElementById('airThumb');
    this.reedField = document.getElementById('reedField');
    this.reedMarker = document.getElementById('reedMarker');
    this.tongueStrip = document.getElementById('tongueStrip');
    this.currentNote = document.getElementById('currentNote');
    this.fingeringStatus = document.getElementById('fingeringStatus');
    this.activeKeysStatus = document.getElementById('activeKeys');
    this.airStatus = document.getElementById('airStatus');
    this.reedStatus = document.getElementById('reedStatus');
    this.techniqueStatus = document.getElementById('techniqueStatus');
    this.audioStatus = document.getElementById('audioStatus');
    this.noteHistory = document.getElementById('noteHistory');
    this.report = document.getElementById('report');
    this.level = document.getElementById('level');
    this.meter = document.getElementById('meter');
    this.labelsToggle = document.getElementById('labelsToggle');
    this.history = [];
    this.lastHistoryMidi = null;
  }

  render() {
    this.update();
  }

  update() {
    const resolution = this.model.resolveFingering();
    const displayMidi = this.model.displayMidi();
    const concertMidi = this.model.concertMidi();
    const writtenMidi = this.model.writtenMidi();
    const displaySuffix = this.model.displayMode === 'written' ? 'written' : 'concert';

    this.currentNote.textContent = displayMidi === null ? 'Unsupported fingering' : `${noteName(displayMidi)} ${displaySuffix}`;
    if (!resolution.fingering) {
      this.fingeringStatus.textContent = 'Unsupported';
    } else {
      this.fingeringStatus.textContent = resolution.exact
        ? resolution.fingering.label
        : `${resolution.fingering.label} · assisted`;
    }
    this.activeKeysStatus.textContent = this.model.activeKeyLabel();
    this.airStatus.textContent = `${Math.round(this.model.air * 100)}%`;

    const bend = this.model.embouchureX * this.model.bendRange;
    const tone = this.model.reedBrightness > 0.68 ? 'bright' : this.model.reedBrightness < 0.34 ? 'subtone' : 'centred';
    this.reedStatus.textContent = `${bend >= 0 ? '+' : ''}${bend.toFixed(2)} · ${tone}`;

    const active = this.model.activeKeys();
    const assistedKeys = resolution.fingering && !resolution.exact ? resolution.fingering.keys : new Set();
    document.querySelectorAll('[data-sax-key]').forEach((button) => {
      const key = button.dataset.saxKey;
      button.classList.toggle('pressed', active.has(key));
      button.classList.toggle('assisted', !active.has(key) && assistedKeys.has(key));
      button.setAttribute('aria-pressed', String(active.has(key)));
    });

    this.airFill.style.height = `${this.model.air * 100}%`;
    this.airThumb.style.bottom = `${this.model.air * 100}%`;
    this.airRail.setAttribute('aria-valuenow', String(Math.round(this.model.air * 100)));

    this.reedMarker.style.left = `${50 + this.model.embouchureX * 42}%`;
    this.reedMarker.style.top = `${92 - this.model.reedBrightness * 84}%`;

    this.saxPhone.classList.toggle('labels-hidden', !this.labelsToggle.checked);

    if (concertMidi !== null && writtenMidi !== null && this.model.air > 0.02) {
      const historyMidi = this.model.displayMode === 'written' ? writtenMidi : concertMidi;
      if (this.lastHistoryMidi === null || Math.abs(historyMidi - this.lastHistoryMidi) > 0.12) {
        this.pushHistory(noteName(historyMidi));
        this.lastHistoryMidi = historyMidi;
      }
    }
  }

  pushHistory(label) {
    this.history.push(label);
    this.history = this.history.slice(-12);
    this.noteHistory.replaceChildren();
    this.history.forEach((entry) => {
      const item = document.createElement('span');
      item.className = 'history-note';
      item.textContent = entry;
      this.noteHistory.appendChild(item);
    });
  }

  clearHistory() {
    this.history = [];
    this.lastHistoryMidi = null;
    this.noteHistory.innerHTML = '<span>Recent notes appear here</span>';
  }

  flashTongue(duration = 90) {
    this.tongueStrip.classList.add('active');
    window.setTimeout(() => this.tongueStrip.classList.remove('active'), duration);
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
    const safe = Math.max(0, Math.min(100, value));
    this.level.style.width = `${safe}%`;
    this.meter.setAttribute('aria-valuenow', String(safe));
  }

  setFingeringFromMidi(writtenMidi) {
    const target = FINGERINGS.find((item) => item.writtenMidi === writtenMidi);
    if (!target) return false;
    this.model.activeKeyPointers.clear();
    this.model.latchedKeys = new Set(target.keys);
    this.update();
    return true;
  }
}
