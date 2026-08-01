/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { STRINGS, noteName } from './guitar-model.js';

function clamp(value, minimum, maximum) {
  return Math.max(minimum, Math.min(maximum, value));
}

export class GuitarGestureController {
  constructor({ model, audio, ui, getMode, getBendRange }) {
    this.model = model;
    this.audio = audio;
    this.ui = ui;
    this.getMode = getMode;
    this.getBendRange = getBendRange;
    this.fretPointers = new Map();
    this.pickPointers = new Map();
    this.palmPointers = new Map();
    this.bindFretboard();
    this.bindPickingArea();
    this.bindPalmRail();
  }

  processFretTransitions(transitions, context = {}) {
    transitions.forEach((transition) => {
      const { stringId, oldFret, newFret, reason } = transition;
      if (!this.audio.isRinging(stringId)) return;
      if (this.model.isMuted(stringId)) {
        this.audio.stopString(stringId, 0.04);
        return;
      }

      const midi = this.model.midiForString(stringId);
      if (reason === 'slide') {
        this.audio.articulate(stringId, midi, 'slide', {
          duration: context.duration ?? 0.13,
          velocity: context.velocity ?? 0.74,
        });
        this.ui.setAction(`${STRINGS[stringId].short}: slide ${oldFret}→${newFret}`);
      } else if (newFret > oldFret) {
        this.audio.articulate(stringId, midi, 'hammer-on', { velocity: 0.78 });
        this.ui.setAction(`${STRINGS[stringId].short}: hammer-on ${oldFret}→${newFret}`);
      } else if (newFret < oldFret) {
        this.audio.articulate(stringId, midi, 'pull-off', { velocity: 0.68 });
        this.ui.setAction(`${STRINGS[stringId].short}: pull-off ${oldFret}→${newFret}`);
      }
    });
  }

  bindFretboard() {
    const board = this.ui.fretboard;

    board.addEventListener('pointerdown', (event) => {
      const cell = event.target.closest('.fret-cell');
      if (!cell) return;
      event.preventDefault();
      const stringId = Number(cell.dataset.string);
      const fret = Number(cell.dataset.fret);
      const now = performance.now();

      if (this.getMode() === 'latch') {
        const transitions = this.model.toggleLatchedFret(stringId, fret);
        this.processFretTransitions(transitions);
        this.ui.update();
        return;
      }

      board.setPointerCapture(event.pointerId);
      const transitions = this.model.beginFinger(event.pointerId, stringId, fret, {
        x: event.clientX,
        y: event.clientY,
        time: now,
      });
      this.fretPointers.set(event.pointerId, {
        stringId,
        currentFret: fret,
        lastX: event.clientX,
        lastY: event.clientY,
        lastTime: now,
        velocity: 0,
        edgeSince: null,
      });
      this.processFretTransitions(transitions);
      this.ui.setAction(`${STRINGS[stringId].short}: fret ${fret}`);
      this.ui.update();
    });

    board.addEventListener('pointermove', (event) => {
      const state = this.fretPointers.get(event.pointerId);
      if (!state) return;
      event.preventDefault();
      const now = performance.now();
      const elapsed = Math.max(1, now - state.lastTime);
      const distance = Math.hypot(event.clientX - state.lastX, event.clientY - state.lastY);
      state.velocity = distance / elapsed;
      const cell = this.ui.fretCellAt(event.clientX, event.clientY);

      if (cell) {
        const stringId = Number(cell.dataset.string);
        const fret = Number(cell.dataset.fret);
        const horizontal = Math.abs(event.clientX - state.lastX);
        const vertical = Math.abs(event.clientY - state.lastY);

        if (fret !== state.currentFret && (stringId === state.stringId || horizontal >= vertical * 0.7)) {
          const duration = clamp(Math.abs(fret - state.currentFret) / Math.max(state.velocity, 0.08) * 0.012, 0.045, 0.5);
          const transitions = this.model.slideFinger(event.pointerId, fret, {
            x: event.clientX,
            y: event.clientY,
            time: now,
          });
          this.processFretTransitions(transitions, {
            duration,
            velocity: clamp(0.55 + state.velocity, 0.55, 1.05),
          });
          state.currentFret = fret;
          state.edgeSince = null;
          this.ui.update();
        } else if (stringId !== state.stringId && fret === state.currentFret) {
          const transitions = this.model.addBarreString(event.pointerId, stringId);
          this.processFretTransitions(transitions);
          this.ui.setAction(`Barre at fret ${fret}`);
          this.ui.update();
        }
      } else {
        this.autoShiftWindow(event, state, now);
      }

      state.lastX = event.clientX;
      state.lastY = event.clientY;
      state.lastTime = now;
    });

    const release = (event) => {
      const state = this.fretPointers.get(event.pointerId);
      if (!state) return;
      this.fretPointers.delete(event.pointerId);
      const transitions = this.model.releaseFinger(event.pointerId);

      transitions.forEach((transition) => {
        if (!this.audio.isRinging(transition.stringId)) return;
        const newMidi = this.model.midiForString(transition.stringId);
        const shouldPullOff = transition.newFret > 0 || state.velocity > 0.22;
        if (shouldPullOff && !this.model.isMuted(transition.stringId)) {
          this.audio.articulate(transition.stringId, newMidi, 'pull-off', {
            velocity: clamp(0.55 + state.velocity, 0.5, 1.05),
          });
          this.ui.setAction(`${STRINGS[transition.stringId].short}: pull-off to ${transition.newFret}`);
        } else {
          this.audio.stopString(transition.stringId, 0.07);
          this.ui.setAction(`${STRINGS[transition.stringId].short}: damped`);
        }
      });
      this.ui.update();
    };

    board.addEventListener('pointerup', release);
    board.addEventListener('pointercancel', release);
    board.addEventListener('lostpointercapture', release);
    board.addEventListener('contextmenu', (event) => event.preventDefault());
  }

  autoShiftWindow(event, state, now) {
    const rect = this.ui.fretboard.getBoundingClientRect();
    const leftBoundary = rect.left + rect.width * 0.095;
    const rightBoundary = rect.right - 12;
    const nearLeft = event.clientX < leftBoundary;
    const nearRight = event.clientX > rightBoundary;
    const direction = nearRight ? 1 : nearLeft ? -1 : 0;

    if (!direction) {
      state.edgeSince = null;
      return;
    }

    if (!state.edgeSince) {
      state.edgeSince = now;
      return;
    }

    if (now - state.edgeSince < 125) return;
    const oldStart = this.model.windowStart;
    const newStart = this.model.setWindowStart(oldStart + direction);
    if (newStart === oldStart) return;

    const nextFret = clamp(state.currentFret + direction, 1, 24);
    const transitions = this.model.slideFinger(event.pointerId, nextFret, {
      x: event.clientX,
      y: event.clientY,
      time: now,
    });
    this.processFretTransitions(transitions, { duration: 0.085, velocity: 0.82 });
    state.currentFret = nextFret;
    state.edgeSince = now;
    this.ui.renderPositionButtons();
    this.ui.renderFretboard();
    this.ui.update();
    this.ui.setReport(`The fret window followed the slide to frets ${this.model.windowStart}–${this.model.windowEnd}.`);
  }

  bindPickingArea() {
    const lanes = this.ui.stringLanes;

    lanes.addEventListener('pointerdown', (event) => {
      const lane = event.target.closest('.string-lane');
      if (!lane) return;
      event.preventDefault();
      lanes.setPointerCapture(event.pointerId);
      const rect = lanes.getBoundingClientRect();
      const stringId = Number(lane.dataset.string);
      const now = performance.now();
      const state = {
        pointerId: event.pointerId,
        initialString: stringId,
        lastString: stringId,
        startX: event.clientX,
        startY: event.clientY,
        lastX: event.clientX,
        lastY: event.clientY,
        lastTime: now,
        startTime: now,
        seen: new Set(),
        played: false,
        strumming: false,
        direction: 'neutral',
        pickPosition: clamp((event.clientX - rect.left) / rect.width, 0, 1),
        bendCents: 0,
        bendDirections: [],
        lastBendDirection: 0,
        timer: null,
      };
      state.timer = window.setTimeout(() => {
        this.ensureInitialPluck(state, 'neutral', event.pressure);
      }, 38);
      this.pickPointers.set(event.pointerId, state);
    });

    lanes.addEventListener('pointermove', (event) => {
      const state = this.pickPointers.get(event.pointerId);
      if (!state) return;
      event.preventDefault();
      const now = performance.now();
      const elapsed = Math.max(1, now - state.lastTime);
      const lane = this.ui.laneAt(event.clientX, event.clientY);
      const deltaY = event.clientY - state.startY;
      const deltaX = event.clientX - state.startX;

      if (lane) {
        const stringId = Number(lane.dataset.string);
        if (stringId !== state.lastString) {
          state.strumming = true;
          state.direction = stringId > state.lastString ? 'down' : 'up';
          this.ensureInitialPluck(state, state.direction, event.pressure);
          this.playCrossedStrings(state, state.lastString, stringId, event, elapsed);
          state.lastString = stringId;
        } else if (!state.strumming && Math.abs(deltaY) > 11 && !state.played) {
          state.direction = deltaY > 0 ? 'down' : 'up';
          this.ensureInitialPluck(state, state.direction, event.pressure);
        }
      }

      if (!state.strumming && Math.abs(deltaX) > 7) {
        this.ensureInitialPluck(state, state.direction, event.pressure);
        const rect = lanes.getBoundingClientRect();
        const maximumCents = this.getBendRange() * 100;
        const cents = clamp(deltaX / (rect.width * 0.2) * maximumCents, -30, maximumCents);
        this.audio.bend(state.initialString, cents, 0.018);
        this.trackVibrato(state, cents, now);
        state.bendCents = cents;
        const vibrato = state.bendDirections.length >= 3 && Math.abs(cents) < 130;
        this.ui.setBend(state.initialString, cents, vibrato);
        if (vibrato) this.ui.setAction(`${STRINGS[state.initialString].short}: vibrato`);
      }

      state.lastX = event.clientX;
      state.lastY = event.clientY;
      state.lastTime = now;
    });

    const release = (event) => {
      const state = this.pickPointers.get(event.pointerId);
      if (!state) return;
      this.pickPointers.delete(event.pointerId);
      if (state.timer) window.clearTimeout(state.timer);
      if (!state.played) this.ensureInitialPluck(state, state.direction, event.pressure);
      if (Math.abs(state.bendCents) > 1) {
        this.audio.releaseBend(state.initialString, 0.055);
        this.ui.setBend(state.initialString, 0, false);
      }

      if (state.strumming) {
        const count = state.seen.size;
        const label = state.direction === 'down' ? 'Downstroke ↓' : 'Upstroke ↑';
        this.ui.setStroke(`${label}, ${count} strings`);
        this.ui.setReport(`${label} played across ${count} strings. Swipe speed controlled both attack strength and spacing between the strings.`);
      }
    };

    lanes.addEventListener('pointerup', release);
    lanes.addEventListener('pointercancel', release);
    lanes.addEventListener('lostpointercapture', release);
    lanes.addEventListener('contextmenu', (event) => event.preventDefault());
  }

  ensureInitialPluck(state, direction, pressure = 0) {
    if (state.played) return;
    if (state.timer) window.clearTimeout(state.timer);
    state.direction = direction;
    this.playString(state.initialString, state.pickPosition, direction, 0.84, pressure);
    state.seen.add(state.initialString);
    state.played = true;
  }

  playCrossedStrings(state, fromString, toString, event, elapsed) {
    const directionStep = toString > fromString ? 1 : -1;
    const path = [];
    for (let stringId = fromString + directionStep; ; stringId += directionStep) {
      path.push(stringId);
      if (stringId === toString) break;
    }
    const interval = clamp(elapsed / Math.max(1, path.length), 7, 44);
    const rect = this.ui.stringLanes.getBoundingClientRect();
    const pickPosition = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    const baseVelocity = clamp(1.12 - interval / 85, 0.52, 1.15);

    path.forEach((stringId, index) => {
      if (state.seen.has(stringId)) return;
      state.seen.add(stringId);
      window.setTimeout(() => {
        this.playString(stringId, pickPosition, state.direction, baseVelocity, event.pressure);
      }, index * interval);
    });
  }

  playString(stringId, pickPosition, direction, velocity, pressure = 0) {
    const pressureBoost = pressure > 0 ? clamp(pressure * 0.28, 0, 0.22) : 0;
    const finalVelocity = clamp(velocity + pressureBoost, 0.25, 1.25);
    this.audio.pluck(stringId, this.model.midiForString(stringId), {
      velocity: finalVelocity,
      pickPosition,
      direction,
      muted: this.model.isMuted(stringId),
    });
    this.ui.flashString(stringId);
    this.ui.setAction(`${STRINGS[stringId].name}: ${this.model.isMuted(stringId) ? 'dead stroke' : noteName(this.model.midiForString(stringId))}`);
    this.ui.setStroke(direction === 'down' ? 'Downstroke ↓' : direction === 'up' ? 'Upstroke ↑' : `${STRINGS[stringId].short} pluck`);
    this.ui.setAudioStatus(this.audio.status());
  }

  trackVibrato(state, cents, now) {
    const direction = Math.sign(cents - state.bendCents);
    if (direction && state.lastBendDirection && direction !== state.lastBendDirection) {
      state.bendDirections.push(now);
      state.bendDirections = state.bendDirections.filter((time) => now - time < 650);
    }
    if (direction) state.lastBendDirection = direction;
  }

  bindPalmRail() {
    const rail = this.ui.palmRail;
    const updateDepth = (event) => {
      const rect = rail.getBoundingClientRect();
      const depth = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      this.palmPointers.set(event.pointerId, depth);
      const maximum = Math.max(...this.palmPointers.values());
      this.audio.setPalmMuteDepth(maximum);
      this.ui.setPalmMute(maximum);
      this.ui.setAction(`Palm mute ${Math.round(maximum * 100)}%`);
    };

    rail.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      rail.setPointerCapture(event.pointerId);
      updateDepth(event);
    });
    rail.addEventListener('pointermove', (event) => {
      if (!this.palmPointers.has(event.pointerId)) return;
      event.preventDefault();
      updateDepth(event);
    });

    const release = (event) => {
      if (!this.palmPointers.has(event.pointerId)) return;
      this.palmPointers.delete(event.pointerId);
      const maximum = this.palmPointers.size ? Math.max(...this.palmPointers.values()) : 0;
      this.audio.setPalmMuteDepth(maximum);
      this.ui.setPalmMute(maximum);
      if (!maximum) this.ui.setAction('Palm mute released');
    };
    rail.addEventListener('pointerup', release);
    rail.addEventListener('pointercancel', release);
    rail.addEventListener('lostpointercapture', release);
  }
}
