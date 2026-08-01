/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { VIOLIN_STRINGS, bowStringsAt, clamp, noteName } from './violin-model.js';

export class ViolinGestureController {
  constructor({ model, audio, ui, getFingerMode, getPlayMode }) {
    this.model = model;
    this.audio = audio;
    this.ui = ui;
    this.getFingerMode = getFingerMode;
    this.getPlayMode = getPlayMode;
    this.fingerPointers = new Map();
    this.bowPointers = new Map();
    this.bindFingerboard();
    this.bindBowDeck();
  }

  bindFingerboard() {
    const board = this.ui.fingerboard;

    board.addEventListener('pointerdown', (event) => {
      const track = event.target.closest('.finger-track');
      if (!track) return;
      event.preventDefault();

      const stringId = Number(track.dataset.string);
      const rect = track.getBoundingClientRect();
      const offset = this.model.windowStart
        + clamp((event.clientX - rect.left) / rect.width, 0, 1) * (this.model.windowEnd - this.model.windowStart);

      if (this.getFingerMode() === 'latch') {
        const transition = this.model.toggleLatch(stringId, offset);
        this.handlePitchTransition(transition, 0.04);
        this.ui.refreshFingerboard();
        this.ui.setAction(`${VIOLIN_STRINGS[stringId].name} string ${transition.after === 0 ? 'open' : noteName(VIOLIN_STRINGS[stringId].openMidi + transition.after, this.model.intonationMode === 'free')}`);
        return;
      }

      board.setPointerCapture(event.pointerId);
      const transition = this.model.pointerDown(event.pointerId, stringId, offset);
      this.fingerPointers.set(event.pointerId, {
        stringId,
        offset: this.model.normaliseOffset(offset),
        lastX: event.clientX,
        lastTime: performance.now(),
        lastDirection: 0,
        directionChanges: [],
      });
      this.handlePitchTransition(transition, 0.035);
      this.ui.refreshFingerboard();
      this.ui.setAction(`${VIOLIN_STRINGS[stringId].name} finger down`);
    });

    board.addEventListener('pointermove', (event) => {
      const state = this.fingerPointers.get(event.pointerId);
      if (!state) return;
      event.preventDefault();

      const row = board.querySelector(`.finger-track[data-string="${state.stringId}"]`);
      if (!row) return;
      const rect = row.getBoundingClientRect();
      const now = performance.now();
      const deltaX = event.clientX - state.lastX;
      const deltaOffset = (deltaX / rect.width) * this.model.windowSpan;
      state.offset = clamp(state.offset + deltaOffset, 0, 33);

      const oldWindow = this.model.windowStart;
      this.model.followOffset(state.offset);
      const transition = this.model.pointerMove(event.pointerId, state.offset);
      const elapsed = Math.max(8, now - state.lastTime);
      const transitionSeconds = clamp(elapsed / 1000, 0.018, 0.18);
      this.handlePitchTransition(transition, transitionSeconds);
      this.detectVibrato(state, deltaOffset, now);

      state.lastX = event.clientX;
      state.lastTime = now;
      if (oldWindow !== this.model.windowStart) this.ui.renderPositionButtons();
      this.ui.refreshFingerboard();
    });

    const release = (event) => {
      const state = this.fingerPointers.get(event.pointerId);
      if (!state) return;
      this.fingerPointers.delete(event.pointerId);
      const transition = this.model.pointerUp(event.pointerId);
      this.handlePitchTransition(transition, 0.045);
      this.ui.refreshFingerboard();
      this.ui.setAction(
        transition?.after === 0
          ? `${VIOLIN_STRINGS[state.stringId].name} released to open string`
          : `${VIOLIN_STRINGS[state.stringId].name} released to lower finger`,
      );
    };

    board.addEventListener('pointerup', release);
    board.addEventListener('pointercancel', release);
    board.addEventListener('lostpointercapture', release);
    board.addEventListener('contextmenu', (event) => event.preventDefault());
  }

  detectVibrato(state, deltaOffset, now) {
    if (this.model.intonationMode !== 'free') return;
    if (Math.abs(deltaOffset) < 0.015 || Math.abs(deltaOffset) > 0.45) return;

    const direction = Math.sign(deltaOffset);
    if (state.lastDirection && direction !== state.lastDirection) {
      state.directionChanges.push(now);
      state.directionChanges = state.directionChanges.filter((time) => now - time < 760);
      if (state.directionChanges.length >= 4) {
        this.ui.setTechnique(`Vibrato on ${VIOLIN_STRINGS[state.stringId].name}`);
        this.ui.setReport('Small repeated finger movement is producing continuous-pitch vibrato. Bow speed still controls the energy of the note.');
      }
    }
    state.lastDirection = direction;
  }

  handlePitchTransition(transition, transitionSeconds) {
    if (!transition || transition.type === 'none') return;
    const midi = VIOLIN_STRINGS[transition.stringId].openMidi + transition.after;
    if (this.audio.isBowing(transition.stringId)) {
      this.audio.updatePitch(transition.stringId, midi, transitionSeconds);
    }

    if (transition.type === 'slide') {
      this.ui.setTechnique(`Slide ${transition.before.toFixed(2)} → ${transition.after.toFixed(2)}`);
    } else if (transition.type === 'higher-finger') {
      this.ui.setTechnique('Legato higher finger');
    } else if (transition.type === 'lower-finger') {
      this.ui.setTechnique('Release to lower finger');
    } else if (transition.type === 'release-open') {
      this.ui.setTechnique('Release to open string');
    }
  }

  bindBowDeck() {
    const lanes = this.ui.bowLanes;

    lanes.addEventListener('pointerdown', (event) => {
      const lane = event.target.closest('.bow-lane');
      if (!lane) return;
      event.preventDefault();
      lanes.setPointerCapture(event.pointerId);

      const targets = this.bowTargets(event);
      if (this.getPlayMode() === 'pizz') {
        const state = { seen: new Set() };
        this.bowPointers.set(event.pointerId, state);
        this.playPizzTargets(targets, event, state);
        return;
      }

      this.bowPointers.set(event.pointerId, {
        stringIds: [],
        lastX: event.clientX,
        lastY: event.clientY,
        lastTime: performance.now(),
        lastDirection: null,
        directionChanges: [],
        stopTimer: null,
      });
      this.ui.setBow('Move left or right');
    });

    lanes.addEventListener('pointermove', (event) => {
      const state = this.bowPointers.get(event.pointerId);
      if (!state) return;
      event.preventDefault();

      if (this.getPlayMode() === 'pizz') {
        this.playPizzTargets(this.bowTargets(event), event, state);
        return;
      }

      const now = performance.now();
      const elapsed = Math.max(8, now - state.lastTime);
      const deltaX = event.clientX - state.lastX;
      if (Math.abs(deltaX) < 1.5) return;

      const targets = this.bowTargets(event);
      const direction = deltaX > 0 ? 'down' : 'up';
      const speed = Math.abs(deltaX) / elapsed;
      const velocity = clamp(0.18 + speed * 0.72, 0.18, 1.15);
      const pressure = this.livePressure(event);
      const contact = this.contactPoint(event);

      this.releaseUncontrolledStrings(state.stringIds.filter((id) => !targets.includes(id)), event.pointerId);
      state.stringIds = targets;

      targets.forEach((stringId) => {
        this.audio.bow(stringId, this.model.midiForString(stringId), {
          velocity,
          pressure,
          contact,
          direction,
        });
      });

      this.ui.flashStrings(targets, 90);
      this.ui.setBow(`${direction === 'down' ? 'Down-bow →' : '← Up-bow'} · ${Math.round(velocity * 100)}%`);
      this.ui.setTechnique(targets.length > 1 ? `Double stop ${targets.map((id) => VIOLIN_STRINGS[id].name).join('+')}` : 'Sustained bow');
      this.ui.setAction(`${targets.map((id) => noteName(this.model.midiForString(id), this.model.intonationMode === 'free')).join(' + ')}`);
      this.ui.setAudio(this.audio.status());

      if (state.lastDirection && direction !== state.lastDirection) {
        state.directionChanges.push(now);
        state.directionChanges = state.directionChanges.filter((time) => now - time < 720);
        if (state.directionChanges.length >= 4) {
          this.ui.setTechnique('Bow tremolo');
          this.ui.setReport('Rapid alternating bow directions are recognised as tremolo. Shorter strokes create a tighter tremolo texture.');
        }
      }
      state.lastDirection = direction;
      state.lastX = event.clientX;
      state.lastY = event.clientY;
      state.lastTime = now;
      this.scheduleBowStop(event.pointerId, state);
    });

    const release = (event) => {
      const state = this.bowPointers.get(event.pointerId);
      if (!state) return;
      this.bowPointers.delete(event.pointerId);
      if (state.stopTimer) window.clearTimeout(state.stopTimer);
      if (state.stringIds) this.releaseUncontrolledStrings(state.stringIds, event.pointerId);
      this.ui.setBow('Stopped');
    };

    lanes.addEventListener('pointerup', release);
    lanes.addEventListener('pointercancel', release);
    lanes.addEventListener('lostpointercapture', release);
    lanes.addEventListener('contextmenu', (event) => event.preventDefault());
  }

  bowTargets(event) {
    const rect = this.ui.bowLanes.getBoundingClientRect();
    const normalisedY = (event.clientY - rect.top) / rect.height;
    return bowStringsAt(normalisedY);
  }

  contactPoint(event) {
    const rect = this.ui.bowLanes.getBoundingClientRect();
    const laneHeight = rect.height / VIOLIN_STRINGS.length;
    const withinLane = ((event.clientY - rect.top) % laneHeight) / laneHeight;
    return clamp(withinLane, 0, 1);
  }

  livePressure(event) {
    const baseline = this.ui.baselineBowPressure();
    if (event.pointerType !== 'mouse' && event.pressure > 0) {
      return clamp(baseline * 0.45 + event.pressure * 0.75, 0.1, 1);
    }
    return baseline;
  }

  scheduleBowStop(pointerId, state) {
    if (state.stopTimer) window.clearTimeout(state.stopTimer);
    state.stopTimer = window.setTimeout(() => {
      const current = this.bowPointers.get(pointerId);
      if (!current) return;
      this.releaseUncontrolledStrings(current.stringIds, pointerId);
      current.stringIds = [];
      this.ui.setBow('Bow stopped moving');
    }, 150);
  }

  releaseUncontrolledStrings(stringIds, excludingPointerId) {
    stringIds.forEach((stringId) => {
      const controlledElsewhere = [...this.bowPointers.entries()].some(([pointerId, state]) => (
        pointerId !== excludingPointerId && state.stringIds?.includes(stringId)
      ));
      if (!controlledElsewhere) this.audio.stopBow(stringId, 0.07);
    });
  }

  playPizzTargets(targets, event, state) {
    const rect = this.ui.bowLanes.getBoundingClientRect();
    const contact = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    targets.forEach((stringId) => {
      if (state.seen.has(stringId)) return;
      state.seen.add(stringId);
      const velocity = event.pressure > 0 ? clamp(0.45 + event.pressure * 0.7, 0.45, 1.15) : 0.82;
      this.audio.pluck(stringId, this.model.midiForString(stringId), { velocity, contact });
      this.ui.flashStrings([stringId], 130);
      this.ui.setAction(`Pizzicato ${VIOLIN_STRINGS[stringId].name}: ${noteName(this.model.midiForString(stringId), this.model.intonationMode === 'free')}`);
      this.ui.setTechnique(targets.length > 1 ? 'Pizzicato double stop' : 'Pizzicato');
      this.ui.setBow('Pizzicato');
      this.ui.setAudio(this.audio.status());
    });
  }
}
