/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { DAYAN_TONICS } from './tabla-model.js';

export class TablaUI {
  constructor(model) {
    this.model = model;
    this.heelRail = document.getElementById('heelRail');
    this.heelFill = document.getElementById('heelFill');
    this.heelThumb = document.getElementById('heelThumb');
    this.heelReadout = document.getElementById('heelReadout');
    this.bayanSurface = document.getElementById('bayanSurface');
    this.dayanSurface = document.getElementById('dayanSurface');
    this.bolStrip = document.getElementById('bolStrip');
    this.lastBol = document.getElementById('lastBol');
    this.lastStroke = document.getElementById('lastStroke');
    this.techniqueStatus = document.getElementById('techniqueStatus');
    this.pressureStatus = document.getElementById('pressureStatus');
    this.tonicStatus = document.getElementById('tonicStatus');
    this.audioStatus = document.getElementById('audioStatus');
    this.report = document.getElementById('report');
    this.level = document.getElementById('level');
    this.meter = document.getElementById('meter');
    this.labelsToggle = document.getElementById('labelsToggle');
  }

  surfaceFor(drum) {
    return drum === 'bayan' ? this.bayanSurface : this.dayanSurface;
  }

  updatePressure() {
    const percent = Math.round(this.model.heelPressure * 100);
    this.heelFill.style.height = `${percent}%`;
    this.heelThumb.style.bottom = `${percent}%`;
    this.heelReadout.textContent = `${percent}%`;
    this.pressureStatus.textContent = `${percent}% · +${this.model.currentBayanBend().toFixed(1)} st`;
    this.heelRail.setAttribute('aria-valuenow', String(percent));
  }

  updateTonic() {
    const option = DAYAN_TONICS.find((candidate) => candidate.midi === this.model.dayanTonicMidi);
    this.tonicStatus.textContent = option?.label ?? String(this.model.dayanTonicMidi);
  }

  updateLabels() {
    document.getElementById('tablaPhone').classList.toggle('labels-hidden', !this.labelsToggle.checked);
  }

  renderBolHistory() {
    this.bolStrip.replaceChildren();
    if (!this.model.bolHistory.length) {
      const empty = document.createElement('span');
      empty.className = 'empty-bol';
      empty.textContent = 'Recent bols appear here';
      this.bolStrip.appendChild(empty);
      return;
    }

    this.model.bolHistory.slice(-14).forEach((bol) => {
      const chip = document.createElement('span');
      chip.className = `bol-chip${bol.label === 'Dha' || bol.label === 'Dhin' ? ' compound' : ''}`;
      chip.textContent = bol.label;
      this.bolStrip.appendChild(chip);
    });
  }

  handleEvent(event) {
    const label = event.compound ?? event.stroke.label;
    this.lastBol.textContent = label;
    this.lastStroke.textContent = `${event.stroke.label} · ${event.drum === 'bayan' ? 'Bayan' : 'Dayan'}`;
    this.techniqueStatus.textContent = event.technique ?? (event.compound ? 'Combined bol' : 'Single stroke');
    this.renderBolHistory();

    if (event.compound) {
      this.report.textContent = `${event.compound} recognised from ${event.stroke.label} and the opposite-drum stroke within the compound-bol window.`;
    } else if (event.technique === 'Roll') {
      this.report.textContent = `Rapid ${event.drum} hits were recognised as a roll. The timing remains based on the actual finger sequence rather than a pre-recorded roll button.`;
    } else if (event.technique === 'Flam') {
      this.report.textContent = `Two close ${event.drum} hits were recognised as a flam.`;
    }
  }

  flashHit(drum, xPercent, yPercent) {
    const surface = this.surfaceFor(drum);
    const marker = surface.querySelector('.hit-marker');
    marker.style.left = `${xPercent}%`;
    marker.style.top = `${yPercent}%`;
    marker.classList.remove('visible');
    void marker.offsetWidth;
    marker.classList.add('visible');
  }

  setDamped(drum) {
    this.techniqueStatus.textContent = `${drum === 'bayan' ? 'Bayan' : 'Dayan'} damped`;
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

  render() {
    this.updatePressure();
    this.updateTonic();
    this.updateLabels();
    this.renderBolHistory();
  }
}
