/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { clamp, valveCombinationLabel } from './trumpet-model.js';

export class TrumpetGestureController {
  constructor({ model, audio, ui, getAirMode, getValveMode }) {
    this.model = model;
    this.audio = audio;
    this.ui = ui;
    this.getAirMode = getAirMode;
    this.getValveMode = getValveMode;
    this.airPointers = new Map();
    this.lipPointers = new Map();
    this.valvePointers = new Map();
    this.lastLipSlot = model.slotPosition;
    this.lastLipDirection = 0;
    this.lipDirectionChanges = [];
    this.bindAir();
    this.bindLip();
    this.bindTongue();
    this.bindValves();
  }

  bindAir() {
    const rail = this.ui.airRail;
    rail.addEventListener('pointerdown', (event) => {
      if (event.target.closest('#airRelease')) return;
      event.preventDefault();
      rail.setPointerCapture(event.pointerId);
      this.airPointers.set(event.pointerId, true);
      const wasActive = this.model.airActive();
      this.model.setAir(this.airFromEvent(event));
      this.audio.sync(this.model, { articulate: true, tongueStrength: wasActive ? 0.58 : 0.86 });
      this.ui.update();
      this.ui.setTechnique(wasActive ? 'Re-tongued attack' : 'Air started');
      this.ui.setAudio(this.audio.status());
    });

    rail.addEventListener('pointermove', (event) => {
      if (!this.airPointers.has(event.pointerId)) return;
      event.preventDefault();
      const before = this.model.air;
      this.model.setAir(this.airFromEvent(event));
      this.audio.sync(this.model, { transition: 0.04 });
      this.ui.update();
      if (Math.abs(this.model.air - before) > 0.035) {
        this.ui.setTechnique(this.model.air > before ? 'Crescendo' : 'Decrescendo');
      }
    });

    const release = (event) => {
      if (!this.airPointers.has(event.pointerId)) return;
      this.airPointers.delete(event.pointerId);
      if (this.getAirMode() === 'hold') {
        this.model.setAir(0);
        this.audio.sync(this.model, { release: 0.075 });
        this.ui.update();
        this.ui.setTechnique('Air released');
      }
    };

    rail.addEventListener('pointerup', release);
    rail.addEventListener('pointercancel', release);
    rail.addEventListener('lostpointercapture', release);

    this.ui.airRelease.addEventListener('click', (event) => {
      event.stopPropagation();
      this.model.setAir(0);
      this.audio.sync(this.model, { release: 0.06 });
      this.ui.update();
      this.ui.setTechnique('Air off');
    });
  }

  airFromEvent(event) {
    const rect = this.ui.airRail.getBoundingClientRect();
    const position = 1 - clamp((event.clientY - rect.top) / rect.height, 0, 1);
    if (event.pointerType !== 'mouse' && event.pressure > 0) {
      return clamp(position * 0.68 + event.pressure * 0.46, 0.03, 1);
    }
    return clamp(position, 0.03, 1);
  }

  bindLip() {
    const field = this.ui.lipField;
    field.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      field.setPointerCapture(event.pointerId);
      const point = this.embouchurePoint(event);
      this.model.setEmbouchure(point.x, point.y);
      this.lipPointers.set(event.pointerId, {
        lastX: event.clientX,
        lastTime: performance.now(),
      });
      this.handleLipChange(true);
    });

    field.addEventListener('pointermove', (event) => {
      const state = this.lipPointers.get(event.pointerId);
      if (!state) return;
      event.preventDefault();
      const previousSlot = this.model.slotPosition;
      const previousBend = this.model.lipBend;
      const point = this.embouchurePoint(event);
      this.model.setEmbouchure(point.x, point.y);
      this.handleLipChange(false, previousSlot, previousBend);
      this.detectLipVibrato(state, event);
      state.lastX = event.clientX;
      state.lastTime = performance.now();
    });

    const release = (event) => {
      this.lipPointers.delete(event.pointerId);
    };
    field.addEventListener('pointerup', release);
    field.addEventListener('pointercancel', release);
    field.addEventListener('lostpointercapture', release);
  }

  embouchurePoint(event) {
    const rect = this.ui.lipField.getBoundingClientRect();
    return {
      x: clamp((event.clientX - rect.left) / rect.width, 0, 1),
      y: clamp((event.clientY - rect.top) / rect.height, 0, 1),
    };
  }

  handleLipChange(initial, previousSlot = this.lastLipSlot, previousBend = this.model.lipBend) {
    const slotDelta = Math.abs(this.model.slotPosition - previousSlot);
    const bendDelta = Math.abs(this.model.lipBend - previousBend);
    this.audio.sync(this.model, { transition: slotDelta > 0.4 ? 0.055 : 0.025 });
    this.ui.refreshPitchLabels();
    this.ui.setAudio(this.audio.status());

    if (initial) {
      this.ui.setTechnique('Embouchure selected');
    } else if (slotDelta > 0.35 && this.model.airActive()) {
      this.ui.setTechnique('Lip slur');
      this.ui.setReport('Moving vertically changes the harmonic slot without using the valves. With air held, this becomes a lip slur rather than a newly tongued note.');
    } else if (bendDelta > 0.08) {
      this.ui.setTechnique(this.model.lipBend >= previousBend ? 'Lip bend up' : 'Lip bend down');
    }
    this.lastLipSlot = this.model.slotPosition;
  }

  detectLipVibrato(state, event) {
    if (this.model.pitchMode !== 'free') return;
    const deltaX = event.clientX - state.lastX;
    if (Math.abs(deltaX) < 2 || Math.abs(deltaX) > 35) return;
    const direction = Math.sign(deltaX);
    const now = performance.now();
    if (this.lastLipDirection && direction !== this.lastLipDirection) {
      this.lipDirectionChanges.push(now);
      this.lipDirectionChanges = this.lipDirectionChanges.filter((time) => now - time < 850);
      if (this.lipDirectionChanges.length >= 4) {
        this.ui.setTechnique('Lip vibrato');
        this.ui.setReport('Small repeated horizontal movement in Free lip mode creates continuous lip vibrato. Wider movement produces a shake or larger pitch bend.');
      }
    }
    this.lastLipDirection = direction;
  }

  bindTongue() {
    this.ui.tonguePad.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      this.ui.flashTongue();
      if (this.model.airActive()) {
        this.audio.tongue(event.pressure > 0 ? clamp(event.pressure, 0.35, 1) : 0.72);
        this.ui.setTechnique('Tongued articulation');
      } else {
        this.model.setAir(0.58);
        this.audio.sync(this.model, { articulate: true, tongueStrength: 0.8 });
        this.ui.update();
        this.ui.setTechnique('Short tongued note');
        window.setTimeout(() => {
          if (this.getAirMode() === 'hold') {
            this.model.setAir(0);
            this.audio.sync(this.model, { release: 0.07 });
            this.ui.update();
          }
        }, 180);
      }
      this.ui.setAudio(this.audio.status());
    });
  }

  bindValves() {
    const bank = this.ui.valveBank;
    bank.addEventListener('pointerdown', (event) => {
      const pad = event.target.closest('.valve-pad');
      if (!pad) return;
      event.preventDefault();
      const valveId = Number(pad.dataset.valve);

      if (this.getValveMode() === 'latch') {
        this.model.toggleValve(valveId);
        this.onValveChange(valveId);
        return;
      }

      bank.setPointerCapture(event.pointerId);
      this.valvePointers.set(event.pointerId, valveId);
      this.model.pressValve(event.pointerId, valveId);
      this.onValveChange(valveId);
    });

    bank.addEventListener('pointermove', (event) => {
      if (!this.valvePointers.has(event.pointerId) || this.getValveMode() !== 'hold') return;
      const pad = document.elementFromPoint(event.clientX, event.clientY)?.closest('.valve-pad');
      if (!pad || !bank.contains(pad)) return;
      const valveId = Number(pad.dataset.valve);
      if (this.valvePointers.get(event.pointerId) === valveId) return;
      this.valvePointers.set(event.pointerId, valveId);
      this.model.moveValve(event.pointerId, valveId);
      this.onValveChange(valveId);
    });

    const release = (event) => {
      if (!this.valvePointers.has(event.pointerId)) return;
      const valveId = this.valvePointers.get(event.pointerId);
      this.valvePointers.delete(event.pointerId);
      this.model.releaseValve(event.pointerId);
      this.onValveChange(valveId);
    };

    bank.addEventListener('pointerup', release);
    bank.addEventListener('pointercancel', release);
    bank.addEventListener('lostpointercapture', release);
  }

  onValveChange(valveId) {
    this.audio.sync(this.model, { transition: 0.018 });
    this.ui.refreshPitchLabels();
    this.ui.flashValve(valveId);
    this.ui.setTechnique(`Valves ${valveCombinationLabel(this.model.valveMask())}`);
    this.ui.setAudio(this.audio.status());
  }
}
