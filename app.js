/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

const SVG_NS = 'http://www.w3.org/2000/svg';
const svg = document.getElementById('keys');
const labels = document.getElementById('labels');
const bassBoost = document.getElementById('bassBoost');
const attackClick = document.getElementById('attackClick');
const touch = document.getElementById('touch');
const audio = document.getElementById('audio');
const lastNote = document.getElementById('lastNote');
const peak = document.getElementById('peak');
const signalText = document.getElementById('signalText');
const level = document.getElementById('level');
const meter = document.getElementById('meter');
const report = document.getElementById('report');

const pitchNames = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
const rows = [
  { start: 21, end: 49, reverse: false },
  { start: 50, end: 78, reverse: true },
  { start: 79, end: 108, reverse: false },
];

const keyMap = [];
const pointers = new Map();
const pressedCounts = new Map();
const voices = new Map();
const heldNotes = new Set();
const sostenutoCapture = new Set();
const pedalState = {
  soft: false,
  sostenuto: false,
  sustain: false,
};

let audioContext = null;
let masterGain = null;
let analyser = null;
let analyserData = null;
let voiceSequence = 0;
let currentLevel = 0;
let lastSignalAt = 0;

function createSvgElement(tag, attributes = {}) {
  const node = document.createElementNS(SVG_NS, tag);
  Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, String(value)));
  return node;
}

function noteFromMidi(midi) {
  const pitch = pitchNames[midi % 12];
  return {
    midi,
    pitch,
    octave: Math.floor(midi / 12) - 1,
    black: pitch.includes('♯'),
  };
}

function noteLabel(midi) {
  const note = noteFromMidi(midi);
  return `${note.pitch}${note.octave}`;
}

function frequencyFromMidi(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function buildKeyboard() {
  svg.replaceChildren();
  keyMap.length = 0;

  const keyboardWidth = 1488;
  const rowHeight = 300;

  rows.forEach((row, rowIndex) => {
    const notes = [];
    for (let midi = row.start; midi <= row.end; midi += 1) {
      notes.push(noteFromMidi(midi));
    }

    const musicalWhiteKeys = notes.filter((note) => !note.black);
    const visualWhiteKeys = row.reverse
      ? [...musicalWhiteKeys].reverse()
      : musicalWhiteKeys;
    const whiteWidth = keyboardWidth / visualWhiteKeys.length;
    const y = rowIndex * rowHeight;

    visualWhiteKeys.forEach((note, visualIndex) => {
      const x = visualIndex * whiteWidth;
      const rect = createSvgElement('rect', {
        class: 'white',
        'data-midi': note.midi,
        x,
        y,
        width: whiteWidth,
        height: rowHeight,
      });
      const text = createSvgElement('text', {
        class: 'wlabel note-label',
        x: x + whiteWidth / 2,
        y: y + rowHeight - 24,
      });
      text.textContent = noteLabel(note.midi);

      svg.append(rect, text);
      keyMap.push({
        midi: note.midi,
        row: rowIndex,
        type: 'white',
        x,
        y,
        width: whiteWidth,
        height: rowHeight,
        node: rect,
      });
    });

    const blackWidth = whiteWidth * 0.68;
    const blackHeight = rowHeight * 0.59;

    notes.filter((note) => note.black).forEach((note) => {
      let precedingWhiteIndex = -1;
      musicalWhiteKeys.forEach((whiteKey, index) => {
        if (whiteKey.midi < note.midi) precedingWhiteIndex = index;
      });

      const musicalBoundary = precedingWhiteIndex + 1;
      const visualBoundary = row.reverse
        ? musicalWhiteKeys.length - musicalBoundary
        : musicalBoundary;
      const x = Math.max(
        0,
        Math.min(
          keyboardWidth - blackWidth,
          visualBoundary * whiteWidth - blackWidth / 2,
        ),
      );

      const rect = createSvgElement('rect', {
        class: 'black',
        'data-midi': note.midi,
        x,
        y,
        width: blackWidth,
        height: blackHeight,
        rx: 9,
        ry: 9,
      });
      const text = createSvgElement('text', {
        class: 'blabel note-label',
        x: x + blackWidth / 2,
        y: y + blackHeight * 0.53,
      });
      text.textContent = noteLabel(note.midi);

      svg.append(rect, text);
      keyMap.push({
        midi: note.midi,
        row: rowIndex,
        type: 'black',
        x,
        y,
        width: blackWidth,
        height: blackHeight,
        node: rect,
      });
    });
  });

  [300, 600].forEach((y) => {
    svg.appendChild(createSvgElement('line', {
      class: 'divider',
      x1: 0,
      y1: y,
      x2: 1488,
      y2: y,
    }));
  });

  const whiteCount = keyMap.filter((key) => key.type === 'white').length;
  const blackCount = keyMap.filter((key) => key.type === 'black').length;
  if (whiteCount !== 52 || blackCount !== 36) {
    report.textContent = `Keyboard audit failed: ${whiteCount} white and ${blackCount} black keys were mapped.`;
  }
}

function svgPointFromPointer(event) {
  const point = svg.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;
  const screenMatrix = svg.getScreenCTM();
  if (!screenMatrix) return null;
  return point.matrixTransform(screenMatrix.inverse());
}

function findKey(x, y) {
  for (let index = keyMap.length - 1; index >= 0; index -= 1) {
    const key = keyMap[index];
    if (
      key.type === 'black'
      && x >= key.x
      && x <= key.x + key.width
      && y >= key.y
      && y <= key.y + key.height
    ) {
      return key;
    }
  }

  return keyMap.find((key) => (
    key.type === 'white'
    && x >= key.x
    && x <= key.x + key.width
    && y >= key.y
    && y <= key.y + key.height
  )) ?? null;
}

function updatePressedState(midi, delta) {
  const nextCount = Math.max(0, (pressedCounts.get(midi) ?? 0) + delta);
  pressedCounts.set(midi, nextCount);
  const key = keyMap.find((entry) => entry.midi === midi);
  key?.node.classList.toggle('down', nextCount > 0);
}

function ensureAudio() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    audio.textContent = 'Unsupported';
    return null;
  }

  if (!audioContext) {
    try {
      audioContext = new AudioContextClass({ latencyHint: 'interactive' });
    } catch {
      audioContext = new AudioContextClass();
    }

    masterGain = audioContext.createGain();
    const compressor = audioContext.createDynamicsCompressor();
    analyser = audioContext.createAnalyser();

    compressor.threshold.value = -20;
    compressor.knee.value = 18;
    compressor.ratio.value = 5;
    compressor.attack.value = 0.002;
    compressor.release.value = 0.2;

    analyser.fftSize = 512;
    analyserData = new Uint8Array(analyser.fftSize);
    masterGain.gain.value = 0.82;

    masterGain.connect(compressor);
    compressor.connect(analyser);
    analyser.connect(audioContext.destination);
  }

  if (audioContext.state === 'suspended') {
    void audioContext.resume();
  }
  audio.textContent = audioContext.state;
  return audioContext;
}

function harmonicPlan(midi) {
  if (midi < 50 && bassBoost.checked) {
    return [
      [1, 0.10],
      [2, 0.20],
      [3, 0.25],
      [4, 0.30],
      [6, 0.22],
      [8, 0.18],
      [12, 0.12],
    ];
  }

  if (midi < 50) return [[1, 0.58], [2, 0.22], [3, 0.10]];
  if (midi < 79) return [[1, 0.55], [2, 0.28], [3, 0.14], [4, 0.06]];
  return [[1, 0.62], [2, 0.22], [3, 0.08]];
}

function startVoice(midi, transpose = 0) {
  const voiceId = `voice-${++voiceSequence}`;
  const context = ensureAudio();

  if (!context) {
    voices.set(voiceId, { midi, held: true, stopped: false });
    return voiceId;
  }

  const playedMidi = midi + transpose;
  const now = context.currentTime;
  const voiceGain = context.createGain();
  const filter = context.createBiquadFilter();
  const oscillators = [];
  const isLow = midi < 50;
  const peakVolume = pedalState.soft ? 0.055 : (isLow ? 0.16 : 0.105);

  filter.type = 'lowpass';
  filter.frequency.value = pedalState.soft ? 1800 : 6500;
  filter.Q.value = 0.35;

  voiceGain.gain.setValueAtTime(0.0001, now);
  voiceGain.gain.exponentialRampToValueAtTime(peakVolume, now + 0.008);
  voiceGain.gain.exponentialRampToValueAtTime(
    peakVolume * 0.42,
    now + (isLow ? 0.55 : 0.34),
  );

  voiceGain.connect(filter);
  filter.connect(masterGain);

  harmonicPlan(playedMidi).forEach(([multiple, amount]) => {
    const oscillator = context.createOscillator();
    const harmonicGain = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequencyFromMidi(playedMidi) * multiple;
    harmonicGain.gain.value = amount;
    oscillator.connect(harmonicGain);
    harmonicGain.connect(voiceGain);
    oscillator.start(now);
    oscillators.push(oscillator);
  });

  if (attackClick.checked) {
    const clickOscillator = context.createOscillator();
    const clickGain = context.createGain();
    clickOscillator.type = 'triangle';
    clickOscillator.frequency.setValueAtTime(1450, now);
    clickOscillator.frequency.exponentialRampToValueAtTime(620, now + 0.025);
    clickGain.gain.setValueAtTime(0.0001, now);
    clickGain.gain.exponentialRampToValueAtTime(isLow ? 0.07 : 0.045, now + 0.002);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);
    clickOscillator.connect(clickGain);
    clickGain.connect(voiceGain);
    clickOscillator.start(now);
    clickOscillator.stop(now + 0.055);
  }

  voices.set(voiceId, {
    midi,
    held: true,
    gain: voiceGain,
    oscillators,
    stopped: false,
  });

  audio.textContent = audioContext.state;
  return voiceId;
}

function isProtectedByPedal(voice) {
  return pedalState.sustain
    || (pedalState.sostenuto && sostenutoCapture.has(voice.midi));
}

function stopVoice(voiceId, release = 0.18) {
  const voice = voices.get(voiceId);
  if (!voice || voice.stopped) return;
  voice.stopped = true;

  if (!audioContext || !voice.gain) {
    voices.delete(voiceId);
    return;
  }

  const now = audioContext.currentTime;
  voice.gain.gain.cancelScheduledValues(now);
  voice.gain.gain.setValueAtTime(Math.max(voice.gain.gain.value, 0.0001), now);
  voice.gain.gain.exponentialRampToValueAtTime(0.0001, now + release);
  voice.oscillators.forEach((oscillator) => {
    try {
      oscillator.stop(now + release + 0.03);
    } catch {
      // The oscillator has already stopped.
    }
  });
  window.setTimeout(() => voices.delete(voiceId), (release + 0.08) * 1000);
}

function releaseVoice(voiceId) {
  const voice = voices.get(voiceId);
  if (!voice) return;
  voice.held = false;
  if (!isProtectedByPedal(voice)) stopVoice(voiceId);
}

function releaseUnprotectedVoices() {
  voices.forEach((voice, voiceId) => {
    if (!voice.held && !isProtectedByPedal(voice)) stopVoice(voiceId);
  });
}

function diagnoseOutputSoon(midi) {
  window.setTimeout(() => {
    if (currentLevel > 1) {
      report.textContent = `${noteLabel(midi)} reached the audio output. If it remains inaudible, the remaining limitation is the speaker or playback route, not the key or synthesiser.`;
    } else if (audioContext?.state === 'running') {
      report.textContent = `Touch and the audio context both responded for ${noteLabel(midi)}, but the meter detected no output. The fault is inside synthesis or audio routing.`;
    } else {
      report.textContent = `Touch responded for ${noteLabel(midi)}, but the audio engine is ${audioContext?.state ?? 'unavailable'}.`;
    }
  }, 180);
}

function pressPointer(pointerId, key, transpose = 0) {
  const previous = pointers.get(pointerId);
  if (previous?.midi === key.midi) return;
  if (previous) releasePointer(pointerId);

  const voiceId = startVoice(key.midi, transpose);
  pointers.set(pointerId, { midi: key.midi, voiceId });
  heldNotes.add(key.midi);
  updatePressedState(key.midi, 1);

  touch.textContent = `Row ${key.row + 1}`;
  lastNote.textContent = noteLabel(key.midi);
  report.textContent = `Touch received for ${noteLabel(key.midi)}. Listening for an output signal now.`;
  diagnoseOutputSoon(key.midi);
}

function releasePointer(pointerId) {
  const pointer = pointers.get(pointerId);
  if (!pointer) return;

  pointers.delete(pointerId);
  updatePressedState(pointer.midi, -1);
  releaseVoice(pointer.voiceId);

  const sameNoteStillHeld = [...pointers.values()].some((entry) => entry.midi === pointer.midi);
  if (!sameNoteStillHeld) heldNotes.delete(pointer.midi);
}

svg.addEventListener('pointerdown', (event) => {
  event.preventDefault();
  const point = svgPointFromPointer(event);
  if (!point) return;
  const key = findKey(point.x, point.y);
  if (!key) return;
  svg.setPointerCapture(event.pointerId);
  pressPointer(event.pointerId, key);
});

svg.addEventListener('pointermove', (event) => {
  if (!pointers.has(event.pointerId)) return;
  event.preventDefault();
  const point = svgPointFromPointer(event);
  if (!point) return;
  const key = findKey(point.x, point.y);
  if (key) pressPointer(event.pointerId, key);
});

svg.addEventListener('pointerup', (event) => {
  event.preventDefault();
  releasePointer(event.pointerId);
});
svg.addEventListener('pointercancel', (event) => releasePointer(event.pointerId));
svg.addEventListener('lostpointercapture', (event) => releasePointer(event.pointerId));
svg.addEventListener('contextmenu', (event) => event.preventDefault());

for (const button of document.querySelectorAll('.test-button')) {
  button.addEventListener('click', () => {
    const midi = Number(button.dataset.midi);
    const key = keyMap.find((entry) => entry.midi === midi);
    if (!key) return;

    touch.textContent = 'Test button';
    lastNote.textContent = noteLabel(midi);
    updatePressedState(midi, 1);
    const realPitchVoice = startVoice(midi);
    report.textContent = `Playing ${noteLabel(midi)} at its real pitch with a diagnostic click and phone-speaker harmonics.`;
    diagnoseOutputSoon(midi);

    window.setTimeout(() => {
      stopVoice(realPitchVoice, 0.2);
      updatePressedState(midi, -1);
    }, 850);

    window.setTimeout(() => {
      const comparisonVoice = startVoice(midi, 24);
      report.textContent = `Now playing the same ${noteLabel(midi)} input two octaves higher. If only this comparison is audible, the key works and the device is losing the bass range.`;
      window.setTimeout(() => stopVoice(comparisonVoice, 0.18), 650);
    }, 1100);
  });
}

for (const button of document.querySelectorAll('.pedal')) {
  button.addEventListener('click', () => {
    const pedal = button.dataset.pedal;
    pedalState[pedal] = !pedalState[pedal];
    button.setAttribute('aria-pressed', String(pedalState[pedal]));
    button.querySelector('span').textContent = pedalState[pedal] ? 'On' : 'Off';

    if (pedal === 'sostenuto') {
      sostenutoCapture.clear();
      if (pedalState.sostenuto) {
        heldNotes.forEach((midi) => sostenutoCapture.add(midi));
      }
    }

    if (!pedalState[pedal] && (pedal === 'sustain' || pedal === 'sostenuto')) {
      releaseUnprotectedVoices();
    }

    if (pedal === 'soft' && audioContext && masterGain) {
      masterGain.gain.setTargetAtTime(
        pedalState.soft ? 0.48 : 0.82,
        audioContext.currentTime,
        0.025,
      );
    }
  });
}

labels.addEventListener('change', () => {
  svg.classList.toggle('hide-labels', !labels.checked);
});

function updateMeter() {
  if (analyser && analyserData) {
    analyser.getByteTimeDomainData(analyserData);
    let sum = 0;
    analyserData.forEach((value) => {
      const normalised = (value - 128) / 128;
      sum += normalised * normalised;
    });

    const rms = Math.sqrt(sum / analyserData.length);
    currentLevel = Math.min(100, Math.round(rms * 420));
    level.style.width = `${currentLevel}%`;
    peak.textContent = `${currentLevel}%`;
    meter.setAttribute('aria-valuenow', String(currentLevel));

    if (currentLevel > 1) {
      lastSignalAt = performance.now();
      signalText.textContent = 'Signal detected';
    } else if (performance.now() - lastSignalAt > 500) {
      signalText.textContent = 'No signal';
    }

    if (audioContext) audio.textContent = audioContext.state;
  }

  requestAnimationFrame(updateMeter);
}

buildKeyboard();
updateMeter();
