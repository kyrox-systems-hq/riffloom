# Riffloom

Riffloom is an open-source, phone and tablet-native music creation platform for playable instruments, multitrack recording, looping and remixing.

The project starts with a simple question: instead of shrinking physical instruments onto a small touchscreen, what would musical instruments look like if they were designed for the screen from the beginning?

## Live prototypes

GitHub Pages deployment is configured from the `main` branch.

- Piano: `https://kyrox-systems-hq.github.io/riffloom/`
- Guitar: `https://kyrox-systems-hq.github.io/riffloom/guitar.html`
- Drums: `https://kyrox-systems-hq.github.io/riffloom/drums.html`
- Violin: `https://kyrox-systems-hq.github.io/riffloom/violin.html`
- Tabla: `https://kyrox-systems-hq.github.io/riffloom/tabla.html`

If the links are not live yet, enable **GitHub Actions** as the Pages publishing source in the repository settings. The deployment workflow is in `.github/workflows/pages.yml`.

## Current prototypes

### Piano

Open [`index.html`](index.html).

- all 88 piano keys visible at once
- three stacked landscape rows
- 52 white keys and 36 black keys
- a folded middle row to keep the keyboard path compact
- multi-touch note input and slide-to-key movement
- independent soft, sostenuto and sustain switches
- stronger harmonics for bass notes on small speakers
- audio diagnostics for A0, A1, A2 and C3
- visible touch, audio-state and output-level feedback

### Expressive guitar, Phase 1

Open [`guitar.html`](guitar.html).

- six independently calibrated strings in standard E2 A2 D3 G3 B3 E4 tuning
- access to 24 frets through overlapping windows and automatic slide following
- Hold and Latch fretting modes
- chord shapes, barres, hammer-ons, pull-offs and continuous slides
- independent bends, vibrato and palm muting
- direction-aware single-string picking and complete upstrokes or downstrokes
- per-string synthesis, compression and live output metering

See [`docs/GUITAR-PROTOTYPE.md`](docs/GUITAR-PROTOTYPE.md).

### Drums and first loop recorder

Open [`drums.html`](drums.html).

- eight packed performance surfaces
- position-sensitive snare, tom, cymbal, hi-hat and kick articulations
- drag fills, flams, rolls and cymbal choking
- one, two or four-bar event loops
- adjustable BPM, count-in, metronome and quantisation
- recording, playback, clearing and overdubbing

See [`docs/DRUMS-PROTOTYPE.md`](docs/DRUMS-PROTOTYPE.md).

### Violin and bowed-string engine, Phase 1

Open [`violin.html`](violin.html).

- standard G3 D4 A4 E5 violin tuning
- continuous fingerboard pitch through four overlapping position windows
- Assisted and Free pitch intonation
- Hold and Latch fingering
- slides, finger vibrato and release to lower fingers or open strings
- up-bow, down-bow, bow-speed dynamics and pressure fallback controls
- double stops, string crossings, tremolo recognition and pizzicato

See [`docs/VIOLIN-PROTOTYPE.md`](docs/VIOLIN-PROTOTYPE.md).

### Tabla and hand-percussion engine, Phase 1

Open [`tabla.html`](tabla.html).

- separate bayan and dayan performance surfaces
- common Phase 1 bols: Na, Tin, Tun, Te, Ge, Ghe and Ke
- two-hand recognition for Dha and Dhin
- a dedicated heel-pressure rail held by a separate finger
- continuous bayan pitch bending after a resonant strike
- selectable dayan tonic from C3 to G3
- long-press damping
- flam and roll timing recognition
- recent-bol history and live output metering

See [`docs/TABLA-PROTOTYPE.md`](docs/TABLA-PROTOTYPE.md).

## Run locally

No build step is required.

1. Clone the repository.
2. From the repository folder, run a local web server:

   ```bash
   python -m http.server 8080
   ```

3. Open one of the following:

   - `http://localhost:8080` for piano
   - `http://localhost:8080/guitar.html` for guitar
   - `http://localhost:8080/drums.html` for drums
   - `http://localhost:8080/violin.html` for violin
   - `http://localhost:8080/tabla.html` for tabla

4. Use a phone in landscape orientation for the intended layouts.

Browsers normally require the first sound to follow a user interaction, so press a key, string, pad or diagnostic button to initialise audio.

## Tests

The guitar, drum, violin and tabla models have dependency-free Node tests:

```bash
npm test
```

The tests validate guitar fretting, drum zones and looping, violin pitch behaviour, and tabla zones, compound bols, heel-pressure pitch and rapid-hit recognition.

## Piano keyboard layout

| Row | MIDI range | Musical range | Keys | White | Black |
| --- | ---: | --- | ---: | ---: | ---: |
| Top | 21 to 49 | A0 to C sharp 3 | 29 | 17 | 12 |
| Middle | 50 to 78 | D3 to F sharp 5, displayed in reverse | 29 | 17 | 12 |
| Bottom | 79 to 108 | G5 to C8 | 30 | 18 | 12 |
| **Total** | 21 to 108 | A0 to C8 | **88** | **52** | **36** |

## Direction

Riffloom is intended to grow into a wider music platform with:

1. more phone-native instruments
2. professional, low-latency audio engines
3. shared multitrack recording and overdubbing
4. looping, arrangement and mixing
5. MIDI and external-controller support
6. mobile application packaging
7. optional premium sounds, services and production tools around the open-source core

The broader product vision, commercial model, AI direction and cross-platform roadmap remain in [`docs/PRODUCT-PLAN.md`](docs/PRODUCT-PLAN.md).

The narrower instrument-family sequence is maintained in [`docs/INSTRUMENT-ROADMAP.md`](docs/INSTRUMENT-ROADMAP.md) so instrument implementation can continue without competing edits to the living product plan.

## Project files

```text
riffloom/
├── index.html
├── styles.css
├── app.js
├── guitar.html
├── guitar.css
├── guitar.js
├── drums.html
├── drums.css
├── drums.js
├── violin.html
├── violin.css
├── violin.js
├── tabla.html
├── tabla.css
├── tabla.js
├── instruments/
│   ├── guitar/
│   ├── drums/
│   ├── violin/
│   └── tabla/
│       ├── tabla-model.js
│       ├── sound-engine.js
│       ├── tabla-ui.js
│       ├── gesture-controller.js
│       ├── main.js
│       └── tests/
│           └── tabla-model.test.mjs
├── docs/
│   ├── PRODUCT-PLAN.md
│   ├── INSTRUMENT-ROADMAP.md
│   ├── PIANO-PROTOTYPE.md
│   ├── GUITAR-PROTOTYPE.md
│   ├── DRUMS-PROTOTYPE.md
│   ├── VIOLIN-PROTOTYPE.md
│   └── TABLA-PROTOTYPE.md
├── .github/workflows/pages.yml
├── package.json
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

## Contributing

Contributions, device testing and informed criticism are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

Useful early contributions include:

- testing touch behaviour on different phones and tablets
- measuring audible performance through speakers and headphones
- identifying missed, stuck or incorrectly released notes and hits
- testing violin intonation, bow continuity and double stops
- testing tabla bol zones, two-hand compounds and bayan pitch movement
- reviewing instrument mappings with experienced musicians and teachers
- improving accessibility without reducing playability

## Licence

Riffloom source files are available under the [Mozilla Public License 2.0](LICENSE). Modifications to MPL-covered files must remain available under MPL 2.0, while separate files may be combined into a larger work under different terms, subject to the licence.
