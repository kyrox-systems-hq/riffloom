/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { clamp } from './tabla-model.js';

export class TablaGestureController {
  constructor({ model, audio, ui }) {
    this.model = model;
    this.audio = audio;
    this.ui = ui;
    this.drumPointers = new Map();
    this.heelPointer = null;
    this.bindDrum(ui.bayanSurface, 'bayan');
    this.bindDrum(ui.dayanSurface, 'dayan');
    this.bindHeelRail();
  }

  drumPoint(surface, event) {
    const head = surface.querySelector('.drum-head');
    const rect = head.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centreX = rect.width / 2;
    const centreY = rect.height / 2;
    const radiusPixels = Math.min(rect.width, rect.height) / 2;
    const radius = clamp(Math.hypot(x - centreX, y - centreY) / radiusPixels, 0, 1);
    return {
      radius,
      xPercent: clamp((x / rect.width) * 100, 0, 100),
      yPercent: clamp((y / rect.height) * 100, 0, 100),
    };
  }

  velocityFor(event, distance = 0, elapsed = 100) {
    if (event.pointerType !== 'mouse' && event.pressure > 0) {
      return clamp(0.35 + event.pressure * 0.9, 0.25, 1.25);
    }
    const speed = distance / Math.max(12, elapsed);
    return clamp(0.68 + speed * 0.85, 0.42, 1.18);
  }

  bindDrum(surface, drum) {
    surface.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      surface.setPointerCapture(event.pointerId);
      const point = this.drumPoint(surface, event);
      const now = performance.now();
      const stroke = this.model.classify(drum, point.radius);
      const state = {
        drum,
        surface,
        lastX: event.clientX,
        lastY: event.clientY,
        lastTime: now,
        lastHitTime: now,
        lastStrokeId: stroke.id,
        dampTimer: null,
      };
      this.drumPointers.set(event.pointerId, state);
      this.triggerHit(event.pointerId, event, point, 0, 100);
      this.scheduleDamp(event.pointerId, state, stroke);
    });

    surface.addEventListener('pointermove', (event) => {
      const state = this.drumPointers.get(event.pointerId);
      if (!state) return;
      event.preventDefault();
      const now = performance.now();
      const point = this.drumPoint(surface, event);
      const distance = Math.hypot(event.clientX - state.lastX, event.clientY - state.lastY);
      const elapsed = Math.max(8, now - state.lastTime);
      const stroke = this.model.classify(drum, point.radius);
      const sinceHit = now - state.lastHitTime;

      if (distance > 12) this.cancelDamp(state);
      if ((stroke.id !== state.lastStrokeId && sinceHit > 42) || (distance > 26 && sinceHit > 72)) {
        this.triggerHit(event.pointerId, event, point, distance, elapsed);
        state.lastHitTime = now;
        state.lastStrokeId = stroke.id;
        this.scheduleDamp(event.pointerId, state, stroke);
      }

      state.lastX = event.clientX;
      state.lastY = event.clientY;
      state.lastTime = now;
    });

    const release = (event) => {
      const state = this.drumPointers.get(event.pointerId);
      if (!state) return;
      this.cancelDamp(state);
      this.drumPointers.delete(event.pointerId);
    };

    surface.addEventListener('pointerup', release);
    surface.addEventListener('pointercancel', release);
    surface.addEventListener('lostpointercapture', release);
    surface.addEventListener('contextmenu', (event) => event.preventDefault());
  }

  triggerHit(pointerId, event, point, distance, elapsed) {
    const state = this.drumPointers.get(pointerId);
    if (!state) return;
    const tablaEvent = this.model.registerHit({
      drum: state.drum,
      radius: point.radius,
      velocity: this.velocityFor(event, distance, elapsed),
      timestamp: performance.now(),
      pointerId,
    });

    this.audio.play(tablaEvent, {
      tonicMidi: this.model.dayanTonicMidi,
      maximumBend: this.model.maximumBend,
    });
    this.ui.handleEvent(tablaEvent);
    this.ui.flashHit(state.drum, point.xPercent, point.yPercent);
    this.ui.setAudio(this.audio.status());
  }

  scheduleDamp(pointerId, state, stroke) {
    this.cancelDamp(state);
    if (!stroke.resonant) return;
    state.dampTimer = window.setTimeout(() => {
      if (!this.drumPointers.has(pointerId)) return;
      if (state.drum === 'bayan') this.audio.dampBayan(0.055);
      else this.audio.dampDayan(0.045);
      this.ui.setDamped(state.drum);
    }, 230);
  }

  cancelDamp(state) {
    if (state.dampTimer) window.clearTimeout(state.dampTimer);
    state.dampTimer = null;
  }

  bindHeelRail() {
    const rail = this.ui.heelRail;

    const update = (event) => {
      const rect = rail.getBoundingClientRect();
      const vertical = 1 - clamp((event.clientY - rect.top) / rect.height, 0, 1);
      const hardwarePressure = event.pointerType !== 'mouse' && event.pressure > 0 ? event.pressure : 0;
      const pressure = clamp(Math.max(vertical, hardwarePressure * 0.86), 0, 1);
      this.model.setHeelPressure(pressure);
      this.audio.updateHeelPressure(pressure, this.model.maximumBend);
      this.ui.updatePressure();
      this.ui.techniqueStatus.textContent = pressure > 0.04 ? 'Bayan heel pressure' : 'Ready';
    };

    rail.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      this.heelPointer = event.pointerId;
      rail.setPointerCapture(event.pointerId);
      update(event);
      this.ui.setReport('Heel pressure is active. Keep this finger on the rail while another finger strikes Ge or Ghe, then move vertically to bend the ringing bayan.');
    });

    rail.addEventListener('pointermove', (event) => {
      if (event.pointerId !== this.heelPointer) return;
      event.preventDefault();
      update(event);
    });

    const release = (event) => {
      if (event.pointerId !== this.heelPointer) return;
      this.heelPointer = null;
      this.model.setHeelPressure(0);
      this.audio.updateHeelPressure(0, this.model.maximumBend);
      this.ui.updatePressure();
    };

    rail.addEventListener('pointerup', release);
    rail.addEventListener('pointercancel', release);
    rail.addEventListener('lostpointercapture', release);
  }
}
