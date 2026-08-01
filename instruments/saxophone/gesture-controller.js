/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { clamp } from './saxophone-model.js';

export class SaxophoneGestureController {
  constructor({ model, audio, ui, getKeyMode, getAirMode }) {
    this.model = model;
    this.audio = audio;
    this.ui = ui;
    this.getKeyMode = getKeyMode;
    this.getAirMode = getAirMode;
    this.airPointer = null;
    this.reedPointer = null;
    this.keyPointers = new Map();
    this.reedMotion = null;
    this.bindAir();
    this.bindReed();
    this.bindKeys();
    this.bindTongue();
  }

  bindAir() {
    const rail = this.ui.airRail;
    const update = (event, attack = false) => {
      const rect = rail.getBoundingClientRect();
      let value = 1 - clamp((event.clientY - rect.top) / rect.height, 0, 1);
      if (event.pointerType !== 'mouse' && event.pressure > 0) {
        value = clamp(value * 0.72 + event.pressure * 0.38, 0, 1);
      }
      const wasSilent = this.model.air < 0.015;
      this.model.setAir(value);
      this.audio.sync(this.model, {
        transition: 0.025,
        tongue: attack || wasSilent,
        attackStrength: 0.72 + value * 0.25,
      });
      this.ui.update();
      this.ui.setTechnique(attack || wasSilent ? 'Tongued attack' : value > 0.72 ? 'Strong air' : value < 0.28 ? 'Soft air' : 'Sustained air');
      this.ui.setAudio(this.audio.status());
    };

    rail.addEventListener('pointerdown', (event) => {
      if (event.target.closest('button')) return;
      event.preventDefault();
      if (this.getAirMode() === 'latch') {
        update(event, true);
        return;
      }
      this.airPointer = event.pointerId;
      rail.setPointerCapture(event.pointerId);
      update(event, true);
    });

    rail.addEventListener('pointermove', (event) => {
      if (this.airPointer !== event.pointerId || this.getAirMode() !== 'hold') return;
      event.preventDefault();
      update(event, false);
    });

    const release = (event) => {
      if (this.airPointer !== event.pointerId) return;
      this.airPointer = null;
      if (this.getAirMode() === 'hold') {
        this.model.setAir(0);
        this.audio.sync(this.model, { release: 0.065 });
        this.ui.update();
        this.ui.setTechnique('Air released');
      }
    };
    rail.addEventListener('pointerup', release);
    rail.addEventListener('pointercancel', release);
    rail.addEventListener('lostpointercapture', release);
  }

  bindReed() {
    const field = this.ui.reedField;
    const update = (event) => {
      const rect = field.getBoundingClientRect();
      const x = clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
      const brightness = 1 - clamp((event.clientY - rect.top) / rect.height, 0, 1);
      const now = performance.now();

      if (this.reedMotion) {
        const dx = x - this.reedMotion.lastX;
        const direction = Math.sign(dx);
        if (Math.abs(dx) > 0.012 && Math.abs(dx) < 0.28 && this.reedMotion.lastDirection && direction !== this.reedMotion.lastDirection) {
          this.reedMotion.reversals.push(now);
          this.reedMotion.reversals = this.reedMotion.reversals.filter((time) => now - time < 800);
          if (this.reedMotion.reversals.length >= 4) {
            this.ui.setTechnique('Reed vibrato');
            this.ui.setReport('Small repeated horizontal embouchure movement is being treated as saxophone vibrato while air and fingering remain independent.');
          }
        }
        if (direction) this.reedMotion.lastDirection = direction;
        this.reedMotion.lastX = x;
      }

      this.model.setEmbouchure(x, brightness);
      this.audio.sync(this.model, { transition: 0.018 });
      this.ui.update();
      if (Math.abs(x) > 0.55) this.ui.setTechnique(x > 0 ? 'Lip bend sharp' : 'Lip bend flat');
      else if (brightness < 0.24) this.ui.setTechnique('Subtone embouchure');
      else if (brightness > 0.8) this.ui.setTechnique('Firm bright embouchure');
    };

    field.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      this.reedPointer = event.pointerId;
      field.setPointerCapture(event.pointerId);
      this.reedMotion = { lastX: 0, lastDirection: 0, reversals: [] };
      update(event);
    });
    field.addEventListener('pointermove', (event) => {
      if (this.reedPointer !== event.pointerId) return;
      event.preventDefault();
      update(event);
    });
    const release = (event) => {
      if (this.reedPointer !== event.pointerId) return;
      this.reedPointer = null;
      this.reedMotion = null;
      this.model.setEmbouchure(0, 0.55);
      this.audio.sync(this.model, { transition: 0.04 });
      this.ui.update();
    };
    field.addEventListener('pointerup', release);
    field.addEventListener('pointercancel', release);
    field.addEventListener('lostpointercapture', release);
  }

  bindKeys() {
    const buttons = [...document.querySelectorAll('[data-sax-key]')];
    const keyAt = (x, y) => document.elementFromPoint(x, y)?.closest('[data-sax-key]');

    buttons.forEach((button) => {
      button.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        const key = button.dataset.saxKey;
        if (this.getKeyMode() === 'latch') {
          this.model.toggleLatch(key);
          this.audio.sync(this.model, { transition: 0.025 });
          this.ui.update();
          this.ui.setTechnique(`${key} ${this.model.activeKeys().has(key) ? 'latched' : 'released'}`);
          return;
        }
        button.setPointerCapture(event.pointerId);
        this.keyPointers.set(event.pointerId, key);
        this.model.keyDown(event.pointerId, key);
        this.audio.sync(this.model, { transition: 0.018 });
        this.ui.update();
        this.ui.setTechnique(`${key} pressed`);
      });

      button.addEventListener('pointermove', (event) => {
        if (!this.keyPointers.has(event.pointerId) || this.getKeyMode() !== 'hold') return;
        const target = keyAt(event.clientX, event.clientY);
        if (!target) return;
        const nextKey = target.dataset.saxKey;
        if (this.keyPointers.get(event.pointerId) === nextKey) return;
        this.keyPointers.set(event.pointerId, nextKey);
        this.model.keyMove(event.pointerId, nextKey);
        this.audio.sync(this.model, { transition: 0.018 });
        this.ui.update();
        this.ui.setTechnique(`Finger moved to ${nextKey}`);
      });

      const release = (event) => {
        if (!this.keyPointers.has(event.pointerId)) return;
        const key = this.keyPointers.get(event.pointerId);
        this.keyPointers.delete(event.pointerId);
        this.model.keyUp(event.pointerId);
        this.audio.sync(this.model, { transition: 0.018 });
        this.ui.update();
        this.ui.setTechnique(`${key} released`);
      };
      button.addEventListener('pointerup', release);
      button.addEventListener('pointercancel', release);
      button.addEventListener('lostpointercapture', release);
    });
  }

  bindTongue() {
    this.ui.tongueStrip.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      this.audio.tongue(this.model, { strength: event.pressure > 0 ? 0.65 + event.pressure * 0.55 : 0.86 });
      this.ui.flashTongue();
      this.ui.setTechnique('Tongued articulation');
      this.ui.setAudio(this.audio.status());
    });
  }
}
