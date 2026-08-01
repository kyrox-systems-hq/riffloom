/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

export const DAYAN_STROKES = Object.freeze({
  na: { id: 'na', label: 'Na', drum: 'dayan', resonant: true, zone: 'kinar' },
  tin: { id: 'tin', label: 'Tin', drum: 'dayan', resonant: true, zone: 'maidan' },
  tun: { id: 'tun', label: 'Tun', drum: 'dayan', resonant: true, zone: 'inner' },
  te: { id: 'te', label: 'Te', drum: 'dayan', resonant: false, zone: 'syahi' },
});

export const BAYAN_STROKES = Object.freeze({
  ge: { id: 'ge', label: 'Ge', drum: 'bayan', resonant: true, zone: 'maidan' },
  ghe: { id: 'ghe', label: 'Ghe', drum: 'bayan', resonant: true, zone: 'maidan-pressure' },
  ke: { id: 'ke', label: 'Ke', drum: 'bayan', resonant: false, zone: 'kinar' },
});

export const COMPOUND_BOLS = Object.freeze({
  'ge+na': 'Dha',
  'ghe+na': 'Dha',
  'ge+tin': 'Dhin',
  'ghe+tin': 'Dhin',
});

export const DAYAN_TONICS = Object.freeze([
  { midi: 48, label: 'C3' },
  { midi: 49, label: 'C♯3' },
  { midi: 50, label: 'D3' },
  { midi: 51, label: 'D♯3' },
  { midi: 52, label: 'E3' },
  { midi: 53, label: 'F3' },
  { midi: 54, label: 'F♯3' },
  { midi: 55, label: 'G3' },
]);

export function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

export function classifyDayanZone(radius) {
  const value = clamp(radius, 0, 1);
  if (value >= 0.73) return DAYAN_STROKES.na;
  if (value >= 0.46) return DAYAN_STROKES.tin;
  if (value >= 0.24) return DAYAN_STROKES.tun;
  return DAYAN_STROKES.te;
}

export function classifyBayanZone(radius, heelPressure = 0) {
  const value = clamp(radius, 0, 1);
  if (value >= 0.72) return BAYAN_STROKES.ke;
  return heelPressure >= 0.28 ? BAYAN_STROKES.ghe : BAYAN_STROKES.ge;
}

export function bayanPitchSemitones(heelPressure, maximumBend = 7) {
  const pressure = clamp(heelPressure, 0, 1);
  return Math.pow(pressure, 1.25) * maximumBend;
}

function compoundKey(first, second) {
  const ids = [first.stroke.id, second.stroke.id];
  const bayan = ids.find((id) => id === 'ge' || id === 'ghe');
  const dayan = ids.find((id) => id === 'na' || id === 'tin');
  return bayan && dayan ? `${bayan}+${dayan}` : null;
}

export class TablaModel {
  constructor() {
    this.heelPressure = 0;
    this.maximumBend = 7;
    this.dayanTonicMidi = 49;
    this.hitHistory = [];
    this.bolHistory = [];
  }

  setHeelPressure(value) {
    this.heelPressure = clamp(value, 0, 1);
    return this.heelPressure;
  }

  setMaximumBend(value) {
    this.maximumBend = clamp(Number(value), 1, 12);
    return this.maximumBend;
  }

  setDayanTonic(midi) {
    const numeric = Number(midi);
    const allowed = DAYAN_TONICS.some((option) => option.midi === numeric);
    if (!allowed) throw new Error(`Unsupported dayan tonic MIDI value: ${midi}`);
    this.dayanTonicMidi = numeric;
    return this.dayanTonicMidi;
  }

  currentBayanBend() {
    return bayanPitchSemitones(this.heelPressure, this.maximumBend);
  }

  classify(drum, radius) {
    if (drum === 'dayan') return classifyDayanZone(radius);
    if (drum === 'bayan') return classifyBayanZone(radius, this.heelPressure);
    throw new Error(`Unsupported drum: ${drum}`);
  }

  registerHit({ drum, radius, velocity = 0.75, timestamp = performance.now(), pointerId = null }) {
    const stroke = this.classify(drum, radius);
    const event = {
      drum,
      stroke,
      velocity: clamp(velocity, 0.08, 1.25),
      timestamp,
      pointerId,
      heelPressure: this.heelPressure,
      bayanBend: this.currentBayanBend(),
      compound: null,
      technique: null,
    };

    const recentOpposite = [...this.hitHistory]
      .reverse()
      .find((candidate) => candidate.drum !== drum && timestamp - candidate.timestamp <= 78);

    if (recentOpposite) {
      const key = compoundKey(recentOpposite, event);
      if (key && COMPOUND_BOLS[key]) event.compound = COMPOUND_BOLS[key];
    }

    this.hitHistory.push(event);
    this.hitHistory = this.hitHistory.filter((candidate) => timestamp - candidate.timestamp <= 700);
    event.technique = this.detectTechnique(event);

    this.bolHistory.push({
      label: event.compound ?? stroke.label,
      timestamp,
      drum,
      stroke: stroke.id,
    });
    this.bolHistory = this.bolHistory.slice(-24);
    return event;
  }

  detectTechnique(event) {
    const sameDrum = this.hitHistory.filter((candidate) => (
      candidate.drum === event.drum && event.timestamp - candidate.timestamp <= 500
    ));

    if (sameDrum.length >= 5) {
      const span = sameDrum[sameDrum.length - 1].timestamp - sameDrum[0].timestamp;
      if (span <= 420) return 'Roll';
    }

    if (sameDrum.length >= 2) {
      const previous = sameDrum[sameDrum.length - 2];
      const gap = event.timestamp - previous.timestamp;
      if (gap >= 22 && gap <= 95) return 'Flam';
    }

    if (event.compound) return 'Combined bol';
    return null;
  }

  clearHistory() {
    this.hitHistory = [];
    this.bolHistory = [];
  }
}
