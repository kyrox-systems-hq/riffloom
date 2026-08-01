/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

const SVG_NS = 'http://www.w3.org/2000/svg';

const fretboard = document.getElementById('fretboard');
const stringsSvg = document.getElementById('strings');
const positionButtons = document.getElementById('positionButtons');
const positionReadout = document.getElementById('positionReadout');
const fretMode = document.getElementById('fretMode');
const labelsToggle = document.getElementById('labelsToggle');
const stringOrderToggle = document.getElementById('stringOrderToggle');
const currentNotes = document.getElementById('currentNotes');
const lastAction = document.getElementById('lastAction');
const strumStatus = document.getElementById('strumStatus');
const audioStatus = document.getElementById('audioStatus');
const report = document.getElementById('report');

const strings = [
  { id: 0, name: 'Low E', short: 'E', openMidi: 40, gauge: 7.2 },
  { id: 1, name: 'A', short: 'A', openMidi: 45, gauge: 6.1 },
  { id: 2, name: 'D', short: 'D', openMidi: 50, gauge: 5.1 },
  { id: 3, name: 'G', short: 'G', openMidi: 55, gauge: 4.1 },
  { id: 4, name: 'B', short: 'B', openMidi: 59, gauge: 3.2 },
  { id: 5, name: 'High E', short: 'e', openMidi: 64, gauge: 2.4 },
];

const pitchNames = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
const positionWindows = [
  { start: 1, end: 6 },
  { start: 5, end: 10 },
  { start: 9, end: 14 },
  { start: 13, end: 18 },
  { start: 17, end: 22 },
  { start: 19, end: 24 },
];

const chordPresets = {
  E: [0, 2, 2, 1, 0, 0],
  G: [3, 2, 0, 0, 0, 3],
  C: [null, 3, 2, 0, 1, 0],
  Am: [null, 0, 2, 2, 1, 0],
  D: [null, null, 0, 2, 3, 2],
  F: [1, 3, 3, 2, 1, 1],
};

const fretCells = [];
const stringLabelCells = [];
const laneCells = [];
const activeFretPointers = new Map();
const pickingPointers = new Map();
const latchedFrets = Array(6).fill(null);
const mutedStrings = Array(6).fill(false);
const stringVoices = Array(6).fill(null);

let currentPositionIndex = 0;
let audioContext = null;
let masterGain = null;
let compressor = null;

function createSvgElement(tag, attributes = {}) {
  const node = document.createElementNS(SVG_NS, tag);
  Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, String(value)));
  return node;
}

function noteFromMidi(midi) {
  return `${pitchNames[midi % 12]}${Math.floor(midi / 12) - 1}`;
}

function frequencyFromMidi(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function visualStringOrder() {
  return stringOrderToggle.checked
    ? [...strings].reverse()
    : strings;
}

function pointerAssignmentsForString(stringIndex) {
  const frets = [];
  for (const pointer of activeFretPointers.values()) {
    const fret = pointer.assignments.get(stringIndex);
    if (Number.isInteger(fret)) frets.push(fret);
  }
  return frets;
}

function effectiveFret(stringIndex) {
  const candidates = pointerAssignmentsForString(stringIndex);
  if (Number.isInteger(latchedFrets[stringIndex])) {
    candidates.push(latchedFrets[stringIndex]);
  }
  if (candidates.length === 0) return 0;
  return Math.max(...candidates);
}

function effectiveMidi(stringIndex) {
  return strings[stringIndex].openMidi + effectiveFret(stringIndex);
}

function effectiveNoteLabel(stringIndex) {
  if (mutedStrings[stringIndex]) return 'X';
  return noteFromMidi(effectiveMidi(stringIndex));
}

function buildPositionRail() {
  positionButtons.replaceChildren();
  positionWindows.forEach((window, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'position-button';
    button.textContent = `${window.start}–${window.end}`;
    button.setAttribute('aria-pressed', String(index === currentPositionIndex));
    button.addEventListener('click', () => setPosition(index));
    positionButtons.appendChild(button);
  });
}

function setPosition(index) {
  if (index === currentPositionIndex) return;
  if (activeFretPointers.size > 0) {
    activeFretPointers.clear();
    report.textContent = 'The active fretting gesture was released when the fret position changed.';
  }
  currentPositionIndex = index;
  buildPositionRail();
  buildFretboard();
  updateInterfaceState();
}

function buildFretboard() {
  fretboard.replaceChildren();
  fretCells.length = 0;
  stringLabelCells.length = 0;

  const width = 1488;
  const height = 470;
  const labelWidth = 168;
  const rowHeight = height / 6;
  const window = positionWindows[currentPositionIndex];
  const visibleFrets = [];
  for (let fret = window.start; fret <= window.end; fret += 1) visibleFrets.push(fret);
  const fretWidth = (width - labelWidth) / visibleFrets.length;
  const order = visualStringOrder();

  const background = createSvgElement('rect', {
    x: 0,
    y: 0,
    width,
    height,
    fill: 'transparent',
  });
  fretboard.appendChild(background);

  order.forEach((string, visualRow) => {
    const y = visualRow * rowHeight;

    const labelCell = createSvgElement('rect', {
      class: 'string-label-cell',
      x: 0,
      y,
      width: labelWidth,
      height: rowHeight,
      'data-string': string.id,
    });
    fretboard.appendChild(labelCell);
    stringLabelCells.push({ stringIndex: string.id, node: labelCell, x: 0, y, width: labelWidth, height: rowHeight });

    const name = createSvgElement('text', {
      class: 'string-name',
      x: labelWidth * 0.32,
      y: y + rowHeight * 0.47,
    });
    name.textContent = string.short;
    fretboard.appendChild(name);

    const state = createSvgElement('text', {
      class: 'string-state',
      x: labelWidth * 0.69,
      y: y + rowHeight * 0.47,
      'data-string-state': string.id,
    });
    state.textContent = effectiveNoteLabel(string.id);
    fretboard.appendChild(state);

    const openHint = createSvgElement('text', {
      class: 'marker-label note-label',
      x: labelWidth / 2,
      y: y + rowHeight * 0.78,
    });
    openHint.textContent = mutedStrings[string.id] ? 'Tap for open' : 'Tap to mute';
    fretboard.appendChild(openHint);

    visibleFrets.forEach((fret, fretIndex) => {
      const x = labelWidth + fretIndex * fretWidth;
      const cell = createSvgElement('rect', {
        class: 'fret-cell',
        x,
        y,
        width: fretWidth,
        height: rowHeight,
        'data-string': string.id,
        'data-fret': fret,
      });
      fretboard.appendChild(cell);
      fretCells.push({
        stringIndex: string.id,
        visualRow,
        fret,
        node: cell,
        x,
        y,
        width: fretWidth,
        height: rowHeight,
      });

      const fretLabel = createSvgElement('text', {
        class: 'fret-label',
        x: x + fretWidth / 2,
        y: y + rowHeight * 0.42,
      });
      fretLabel.textContent = String(fret);
      fretboard.appendChild(fretLabel);

      const noteLabel = createSvgElement('text', {
        class: 'note-label',
        x: x + fretWidth / 2,
        y: y + rowHeight * 0.75,
      });
      noteLabel.textContent = noteFromMidi(string.openMidi + fret);
      fretboard.appendChild(noteLabel);
    });

    const stringLine = createSvgElement('line', {
      class: 'fret-string',
      x1: labelWidth,
      y1: y + rowHeight / 2,
      x2: width,
      y2: y + rowHeight / 2,
      'stroke-width': string.gauge,
    });
    fretboard.appendChild(stringLine);
  });

  for (let index = 0; index <= visibleFrets.length; index += 1) {
    const x = labelWidth + index * fretWidth;
    fretboard.appendChild(createSvgElement('line', {
      class: 'fret-wire',
      x1: x,
      y1: 0,
      x2: x,
      y2: height,
    }));
  }

  const markerFrets = new Set([3, 5, 7, 9, 12, 15, 17, 19, 21, 24]);
  visibleFrets.forEach((fret, fretIndex) => {
    if (!markerFrets.has(fret)) return;
    const x = labelWidth + fretIndex * fretWidth + fretWidth / 2;
    const markerY = fret === 12 || fret === 24 ? [height * 0.35, height * 0.65] : [height * 0.5];
    markerY.forEach((y) => {
      fretboard.appendChild(createSvgElement('circle', {
        class: 'fret-marker',
        cx: x,
        cy: y,
        r: Math.min(11, fretWidth * 0.045),
      }));
    });
  });

  positionReadout.textContent = `${window.start} to ${window.end}`;
  fretboard.classList.toggle('labels-hidden', !labelsToggle.checked);
  renderFretboardState();
}

function buildPickingArea() {
  stringsSvg.replaceChildren();
  laneCells.length = 0;

  const width = 1488;
  const height = 320;
  const rowHeight = height / 6;
  const order = visualStringOrder();

  order.forEach((string, visualRow) => {
    const y = visualRow * rowHeight;
    const lane = createSvgElement('rect', {
      class: 'string-lane',
      x: 0,
      y,
      width,
      height: rowHeight,
      'data-string': string.id,
    });
    stringsSvg.appendChild(lane);
    laneCells.push({ stringIndex: string.id, visualRow, node: lane, x: 0, y, width, height: rowHeight });

    const line = createSvgElement('line', {
      class: 'pick-string',
      x1: 84,
      y1: y + rowHeight / 2,
      x2: width - 84,
      y2: y + rowHeight / 2,
      'stroke-width': string.gauge,
    });
    stringsSvg.appendChild(line);

    const label = createSvgElement('text', {
      class: 'pick-label',
      x: 20,
      y: y + rowHeight * 0.62,
    });
    label.textContent = string.short;
    stringsSvg.appendChild(label);

    const note = createSvgElement('text', {
      class: 'pick-note',
      x: width - 20,
      y: y + rowHeight * 0.62,
      'data-pick-note': string.id,
    });
    note.textContent = effectiveNoteLabel(string.id);
    stringsSvg.appendChild(note);

    const marker = createSvgElement('circle', {
      class: 'pick-marker',
      cx: width * 0.5,
      cy: y + rowHeight / 2,
      r: 15,
      'data-pick-marker': string.id,
    });
    stringsSvg.appendChild(marker);
  });
}

function renderFretboardState() {
  fretCells.forEach((cell) => {
    const active = effectiveFret(cell.stringIndex) === cell.fret && !mutedStrings[cell.stringIndex];
    const preview = [...activeFretPointers.values()].some((pointer) => pointer.assignments.get(cell.stringIndex) === cell.fret);
    cell.node.classList.toggle('active', active);
    cell.node.classList.toggle('preview', preview && !active);
  });

  stringLabelCells.forEach((cell) => {
    cell.node.classList.toggle('muted', mutedStrings[cell.stringIndex]);
  });

  document.querySelectorAll('[data-string-state]').forEach((node) => {
    const stringIndex = Number(node.getAttribute('data-string-state'));
    node.textContent = effectiveNoteLabel(stringIndex);
  });

  document.querySelectorAll('[data-pick-note]').forEach((node) => {
    const stringIndex = Number(node.getAttribute('data-pick-note'));
    node.textContent = effectiveNoteLabel(stringIndex);
  });
}

function updateInterfaceState() {
  renderFretboardState();
  currentNotes.textContent = strings.map((string) => effectiveNoteLabel(string.id)).join(' · ');
}

function svgPoint(svg, event) {
  const point = svg.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;
  const matrix = svg.getScreenCTM();
  if (!matrix) return null;
  return point.matrixTransform(matrix.inverse());
}

function fretCellAt(x, y) {
  return fretCells.find((cell) => (
    x >= cell.x
    && x <= cell.x + cell.width
    && y >= cell.y
    && y <= cell.y + cell.height
  )) ?? null;
}

function labelCellAt(x, y) {
  return stringLabelCells.find((cell) => (
    x >= cell.x
    && x <= cell.x + cell.width
    && y >= cell.y
    && y <= cell.y + cell.height
  )) ?? null;
}

function assignmentsForGesture(startString, currentString, fret) {
  const assignments = new Map();
  const lower = Math.min(startString, currentString);
  const upper = Math.max(startString, currentString);
  for (let stringIndex = lower; stringIndex <= upper; stringIndex += 1) {
    assignments.set(stringIndex, fret);
  }
  return assignments;
}

function commitLatchedGesture(pointer) {
  const allAlreadySet = [...pointer.assignments.entries()].every(([stringIndex, fret]) => (
    latchedFrets[stringIndex] === fret && !mutedStrings[stringIndex]
  ));

  pointer.assignments.forEach((fret, stringIndex) => {
    latchedFrets[stringIndex] = allAlreadySet ? null : fret;
    mutedStrings[stringIndex] = false;
  });
}

function stopVoiceForString(stringIndex, release = 0.035) {
  const voice = stringVoices[stringIndex];
  if (!voice || voice.stopped || !audioContext) return;
  voice.stopped = true;
  const now = audioContext.currentTime;
  voice.gain.gain.cancelScheduledValues(now);
  voice.gain.gain.setValueAtTime(Math.max(voice.gain.gain.value, 0.0001), now);
  voice.gain.gain.exponentialRampToValueAtTime(0.0001, now + release);
  try {
    voice.source.stop(now + release + 0.02);
  } catch {
    // The source has already ended.
  }
  stringVoices[stringIndex] = null;
}

function ensureAudio() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    audioStatus.textContent = 'Unsupported';
    return null;
  }

  if (!audioContext) {
    try {
      audioContext = new AudioContextClass({ latencyHint: 'interactive' });
    } catch {
      audioContext = new AudioContextClass();
    }
    masterGain = audioContext.createGain();
    compressor = audioContext.createDynamicsCompressor();
    compressor.threshold.value = -18;
    compressor.knee.value = 18;
    compressor.ratio.value = 4;
    compressor.attack.value = 0.003;
    compressor.release.value = 0.22;
    masterGain.gain.value = 0.76;
    masterGain.connect(compressor);
    compressor.connect(audioContext.destination);
  }

  if (audioContext.state === 'suspended') void audioContext.resume();
  audioStatus.textContent = audioContext.state;
  return audioContext;
}

function createKarplusBuffer(context, frequency, stringIndex, velocity) {
  const duration = stringIndex <= 1 ? 4.2 : stringIndex <= 3 ? 3.4 : 2.8;
  const length = Math.floor(context.sampleRate * duration);
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const data = buffer.getChannelData(0);
  const period = Math.max(2, Math.round(context.sampleRate / frequency));
  const damping = stringIndex <= 1 ? 0.9974 : stringIndex <= 3 ? 0.9962 : 0.9948;

  for (let index = 0; index < period && index < length; index += 1) {
    data[index] = (Math.random() * 2 - 1) * (0.5 + velocity * 0.5);
  }

  for (let index = period; index < length; index += 1) {
    const first = data[index - period];
    const second = data[index - period + 1] ?? first;
    data[index] = damping * 0.5 * (first + second);
  }

  return buffer;
}

function createMutedPluck(context, stringIndex, velocity, brightness) {
  const length = Math.floor(context.sampleRate * 0.14);
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let index = 0; index < length; index += 1) {
    const envelope = Math.pow(1 - index / length, 5);
    data[index] = (Math.random() * 2 - 1) * envelope;
  }

  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  source.buffer = buffer;
  filter.type = 'bandpass';
  filter.frequency.value = 900 + brightness * 2800 + stringIndex * 90;
  filter.Q.value = 0.8;
  gain.gain.value = 0.12 + velocity * 0.2;
  source.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);
  source.start();
  return { source, gain, stopped: false, midi: null };
}

function pluckString(stringIndex, velocity = 0.72, brightness = 0.55) {
  const context = ensureAudio();
  if (!context) return;

  stopVoiceForString(stringIndex);
  const clampedVelocity = Math.max(0.18, Math.min(1, velocity));
  const clampedBrightness = Math.max(0, Math.min(1, brightness));
  let voice;

  if (mutedStrings[stringIndex]) {
    voice = createMutedPluck(context, stringIndex, clampedVelocity, clampedBrightness);
    lastAction.textContent = `${strings[stringIndex].short} muted stroke`;
  } else {
    const midi = effectiveMidi(stringIndex);
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const body = context.createBiquadFilter();
    const gain = context.createGain();

    source.buffer = createKarplusBuffer(context, frequencyFromMidi(midi), stringIndex, clampedVelocity);
    filter.type = 'lowpass';
    filter.frequency.value = 1400 + clampedBrightness * 7200;
    filter.Q.value = 0.35;
    body.type = 'peaking';
    body.frequency.value = 108 + stringIndex * 26;
    body.Q.value = 0.7;
    body.gain.value = 3.2;
    gain.gain.value = 0.22 + clampedVelocity * 0.48;

    source.connect(filter);
    filter.connect(body);
    body.connect(gain);
    gain.connect(masterGain);
    source.start();

    voice = { source, gain, stopped: false, midi };
    lastAction.textContent = `${noteFromMidi(midi)} plucked`;
  }

  stringVoices[stringIndex] = voice;
  pulseString(stringIndex, clampedBrightness);
  audioStatus.textContent = context.state;
}

function pulseString(stringIndex, brightness) {
  const lane = laneCells.find((entry) => entry.stringIndex === stringIndex);
  lane?.node.classList.add('plucked');
  window.setTimeout(() => lane?.node.classList.remove('plucked'), 130);

  const marker = stringsSvg.querySelector(`[data-pick-marker="${stringIndex}"]`);
  if (marker) {
    marker.setAttribute('cx', String(100 + brightness * 1288));
    marker.classList.add('visible');
    window.setTimeout(() => marker.classList.remove('visible'), 160);
  }
}

function laneAt(x, y) {
  return laneCells.find((lane) => (
    x >= lane.x
    && x <= lane.x + lane.width
    && y >= lane.y
    && y <= lane.y + lane.height
  )) ?? null;
}

function velocityFromMove(pointer, event, point) {
  const now = event.timeStamp || performance.now();
  const elapsed = Math.max(8, now - pointer.lastTime);
  const distance = Math.hypot(point.x - pointer.lastX, point.y - pointer.lastY);
  const speed = distance / elapsed;
  const pressure = event.pressure > 0 ? event.pressure : 0;
  const velocity = pressure > 0.1 ? pressure : 0.32 + speed * 0.42;
  pointer.lastTime = now;
  pointer.lastX = point.x;
  pointer.lastY = point.y;
  return Math.max(0.22, Math.min(1, velocity));
}

function stringsCrossed(fromVisualRow, toVisualRow) {
  const rows = [];
  const direction = toVisualRow >= fromVisualRow ? 1 : -1;
  for (let row = fromVisualRow + direction; direction > 0 ? row <= toVisualRow : row >= toVisualRow; row += direction) {
    rows.push(row);
  }
  return rows;
}

fretboard.addEventListener('pointerdown', (event) => {
  event.preventDefault();
  const point = svgPoint(fretboard, event);
  if (!point) return;

  const labelCell = labelCellAt(point.x, point.y);
  if (labelCell) {
    mutedStrings[labelCell.stringIndex] = !mutedStrings[labelCell.stringIndex];
    if (!mutedStrings[labelCell.stringIndex]) latchedFrets[labelCell.stringIndex] = null;
    stopVoiceForString(labelCell.stringIndex);
    lastAction.textContent = `${strings[labelCell.stringIndex].short} ${mutedStrings[labelCell.stringIndex] ? 'muted' : 'open'}`;
    updateInterfaceState();
    return;
  }

  const cell = fretCellAt(point.x, point.y);
  if (!cell) return;

  fretboard.setPointerCapture(event.pointerId);
  activeFretPointers.set(event.pointerId, {
    startString: cell.stringIndex,
    currentString: cell.stringIndex,
    fret: cell.fret,
    assignments: assignmentsForGesture(cell.stringIndex, cell.stringIndex, cell.fret),
  });
  mutedStrings[cell.stringIndex] = false;
  lastAction.textContent = `${strings[cell.stringIndex].short}, fret ${cell.fret}`;
  updateInterfaceState();
});

fretboard.addEventListener('pointermove', (event) => {
  const pointer = activeFretPointers.get(event.pointerId);
  if (!pointer) return;
  event.preventDefault();
  const point = svgPoint(fretboard, event);
  if (!point) return;
  const cell = fretCellAt(point.x, point.y);
  if (!cell) return;

  pointer.currentString = cell.stringIndex;
  pointer.fret = cell.fret;
  pointer.assignments = assignmentsForGesture(pointer.startString, pointer.currentString, pointer.fret);
  pointer.assignments.forEach((_, stringIndex) => {
    mutedStrings[stringIndex] = false;
  });
  lastAction.textContent = pointer.assignments.size > 1
    ? `Barre on fret ${pointer.fret}`
    : `${strings[cell.stringIndex].short}, fret ${cell.fret}`;
  updateInterfaceState();
});

function releaseFretPointer(pointerId) {
  const pointer = activeFretPointers.get(pointerId);
  if (!pointer) return;
  if (fretMode.value === 'latch') commitLatchedGesture(pointer);
  activeFretPointers.delete(pointerId);
  updateInterfaceState();
}

fretboard.addEventListener('pointerup', (event) => {
  event.preventDefault();
  releaseFretPointer(event.pointerId);
});
fretboard.addEventListener('pointercancel', (event) => releaseFretPointer(event.pointerId));
fretboard.addEventListener('lostpointercapture', (event) => releaseFretPointer(event.pointerId));
fretboard.addEventListener('contextmenu', (event) => event.preventDefault());

stringsSvg.addEventListener('pointerdown', (event) => {
  event.preventDefault();
  const point = svgPoint(stringsSvg, event);
  if (!point) return;
  const lane = laneAt(point.x, point.y);
  if (!lane) return;

  stringsSvg.setPointerCapture(event.pointerId);
  const brightness = point.x / 1488;
  pluckString(lane.stringIndex, event.pressure > 0.1 ? event.pressure : 0.72, brightness);
  pickingPointers.set(event.pointerId, {
    lastVisualRow: lane.visualRow,
    lastX: point.x,
    lastY: point.y,
    lastTime: event.timeStamp || performance.now(),
    direction: null,
  });
  strumStatus.textContent = `Single ${strings[lane.stringIndex].short}`;
});

stringsSvg.addEventListener('pointermove', (event) => {
  const pointer = pickingPointers.get(event.pointerId);
  if (!pointer) return;
  event.preventDefault();
  const point = svgPoint(stringsSvg, event);
  if (!point) return;
  const lane = laneAt(point.x, point.y);
  if (!lane || lane.visualRow === pointer.lastVisualRow) return;

  const velocity = velocityFromMove(pointer, event, point);
  const brightness = point.x / 1488;
  const order = visualStringOrder();
  const crossed = stringsCrossed(pointer.lastVisualRow, lane.visualRow);
  crossed.forEach((visualRow) => {
    const string = order[visualRow];
    if (string) pluckString(string.id, velocity, brightness);
  });

  pointer.direction = lane.visualRow > pointer.lastVisualRow ? 'down' : 'up';
  pointer.lastVisualRow = lane.visualRow;
  strumStatus.textContent = `${pointer.direction === 'down' ? 'Down' : 'Up'} strum, ${Math.round(velocity * 100)}%`;
});

function releasePickingPointer(pointerId) {
  pickingPointers.delete(pointerId);
}

stringsSvg.addEventListener('pointerup', (event) => {
  event.preventDefault();
  releasePickingPointer(event.pointerId);
});
stringsSvg.addEventListener('pointercancel', (event) => releasePickingPointer(event.pointerId));
stringsSvg.addEventListener('lostpointercapture', (event) => releasePickingPointer(event.pointerId));
stringsSvg.addEventListener('contextmenu', (event) => event.preventDefault());

function loadChord(name) {
  const shape = chordPresets[name];
  if (!shape) return;
  activeFretPointers.clear();
  shape.forEach((fret, stringIndex) => {
    mutedStrings[stringIndex] = fret === null;
    latchedFrets[stringIndex] = fret && fret > 0 ? fret : null;
  });
  currentPositionIndex = 0;
  buildPositionRail();
  buildFretboard();
  updateInterfaceState();
  lastAction.textContent = `${name} shape loaded`;
  report.textContent = `${name} is latched for testing. Tap Clear to return all strings to open, or edit individual strings in Latch mode.`;
}

document.querySelectorAll('.preset').forEach((button) => {
  button.addEventListener('click', () => loadChord(button.dataset.chord));
});

document.getElementById('clearFingering').addEventListener('click', () => {
  activeFretPointers.clear();
  latchedFrets.fill(null);
  mutedStrings.fill(false);
  strings.forEach((string) => stopVoiceForString(string.id));
  buildFretboard();
  updateInterfaceState();
  lastAction.textContent = 'All strings open';
  report.textContent = 'Fingering cleared. Hold fret cells and use the lower strings to pluck or strum.';
});

fretMode.addEventListener('change', () => {
  activeFretPointers.clear();
  updateInterfaceState();
  report.textContent = fretMode.value === 'hold'
    ? 'Hold mode: frets remain active only while your fingers stay on the fretboard.'
    : 'Latch mode: tap or drag a shape, then release your fingers before playing the strings.';
});

labelsToggle.addEventListener('change', () => {
  fretboard.classList.toggle('labels-hidden', !labelsToggle.checked);
});

stringOrderToggle.addEventListener('change', () => {
  activeFretPointers.clear();
  buildFretboard();
  buildPickingArea();
  updateInterfaceState();
  lastAction.textContent = stringOrderToggle.checked ? 'Tab string order' : 'Physical string order';
});

buildPositionRail();
buildFretboard();
buildPickingArea();
updateInterfaceState();
