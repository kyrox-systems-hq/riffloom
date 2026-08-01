/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { PAD_DEFINITIONS, classifyZone, clamp } from './drum-model.js';

export class DrumGestureController {
  constructor({ model, audio, looper, ui }) {
    this.model = model;
    this.audio = audio;
    this.looper = looper;
    this.ui = ui;
    this.pointers = new Map();
    this.padNames = new Map(PAD_DEFINITIONS.map((pad) => [pad.id, pad.name]));
    this.attach();
  }

  attach() {
    this.ui.padGrid.addEventListener('pointerdown', (event) => this.pointerDown(event));
    this.ui.padGrid.addEventListener('pointermove', (event) => this.pointerMove(event));
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((name) => this.ui.padGrid.addEventListener(name, (event) => this.pointerEnd(event)));
    this.ui.padGrid.addEventListener('contextmenu', (event) => event.preventDefault());
  }

  padAt(clientX, clientY) { return document.elementFromPoint(clientX, clientY)?.closest('.drum-pad') ?? null; }

  normalisedPoint(pad, event) {
    const rect = pad.getBoundingClientRect();
    return {
      x: clamp((event.clientX - rect.left) / rect.width, 0, 1),
      y: clamp((event.clientY - rect.top) / rect.height, 0, 1),
    };
  }

  velocity(event, speed = 0) {
    const usablePressure = event.pressure > 0.05 && Math.abs(event.pressure - 0.5) > 0.04;
    if (usablePressure) return clamp(0.35 + event.pressure * 0.9, 0.25, 1.2);
    return clamp(0.72 + speed / 1400, 0.45, 1.12);
  }

  pointerDown(event) {
    const pad = event.target.closest('.drum-pad');
    if (!pad) return;
    event.preventDefault();
    this.ui.padGrid.setPointerCapture(event.pointerId);
    const point = this.normalisedPoint(pad, event);
    const state = { padId: pad.dataset.pad, startTime: performance.now(), lastTime: performance.now(), lastX: event.clientX, lastY: event.clientY, visited: new Set(), chokeTimer: 0 };
    this.pointers.set(event.pointerId, state);
    this.triggerPad(state.padId, point, event, 0, event.pointerId, false);
    state.visited.add(state.padId);

    if (state.padId === 'crash' || state.padId === 'ride') {
      state.chokeTimer = window.setTimeout(() => {
        if (!this.pointers.has(event.pointerId)) return;
        if (this.audio.choke(state.padId)) {
          this.ui.flashPad(state.padId, 'choked', 180);
          this.ui.setTechnique('cymbal choke');
          this.ui.setReport(`${this.padNames.get(state.padId)} choked by holding the cymbal surface after the strike.`);
        }
      }, 260);
    }
  }

  pointerMove(event) {
    const state = this.pointers.get(event.pointerId);
    if (!state) return;
    event.preventDefault();
    const now = performance.now();
    const distance = Math.hypot(event.clientX - state.lastX, event.clientY - state.lastY);
    const speed = distance / Math.max(1, now - state.lastTime) * 1000;
    const pad = this.padAt(event.clientX, event.clientY);
    if (pad && !state.visited.has(pad.dataset.pad)) {
      const point = this.normalisedPoint(pad, event);
      this.triggerPad(pad.dataset.pad, point, event, speed, event.pointerId, true);
      state.visited.add(pad.dataset.pad);
      this.ui.setReport(`Drag fill crossed ${state.visited.size} surfaces. Gesture speed controls hit strength.`);
    }
    state.lastTime = now; state.lastX = event.clientX; state.lastY = event.clientY;
  }

  pointerEnd(event) {
    const state = this.pointers.get(event.pointerId);
    if (!state) return;
    clearTimeout(state.chokeTimer);
    this.pointers.delete(event.pointerId);
  }

  triggerPad(padId, point, event, speed, pointerId, dragged) {
    const articulation = classifyZone(padId, point.x, point.y);
    const velocity = this.velocity(event, speed);
    const registered = this.model.registerHit(padId, pointerId, performance.now());
    const hit = { padId, articulation, velocity, x: point.x, y: point.y, hiHatState: this.model.hiHatState };
    this.audio.hit(hit);
    this.looper.recordEvent(hit);
    this.ui.flashPad(padId);
    this.ui.setHit(this.padNames.get(padId), articulation, velocity);
    if (registered.technique !== 'single hit') this.ui.setTechnique(registered.technique);
    else if (dragged) this.ui.setTechnique('drag fill');
    this.ui.setAudioStatus(this.audio.status());
  }
}
