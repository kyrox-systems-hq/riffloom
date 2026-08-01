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
- Trumpet: `https://kyrox-systems-hq.github.io/riffloom/trumpet.html`
- Alto saxophone: `https://kyrox-systems-hq.github.io/riffloom/saxophone.html`

If the links are not live yet, enable **GitHub Actions** as the Pages publishing source in the repository settings. The deployment workflow is in `.github/workflows/pages.yml`.

## Current prototypes

### Piano

Open [`index.html`](index.html).

- all 88 piano keys visible at once
- three stacked landscape rows
- multi-touch note input and slide-to-key movement
- independent soft, sostenuto and sustain switches
- stronger bass harmonics and live audio diagnostics

### Expressive guitar, Phase 1

Open [`guitar.html`](guitar.html).

- six calibrated strings in standard tuning
- overlapping fret windows and automatic slide following
- chords, barres, hammer-ons, pull-offs and continuous slides
- bends, vibrato, palm muting and directional picking

See [`docs/GUITAR-PROTOTYPE.md`](docs/GUITAR-PROTOTYPE.md).

### Drums and first loop recorder

Open [`drums.html`](drums.html).

- eight packed performance surfaces
- position-sensitive drum and cymbal articulations
- fills, flams, rolls and cymbal choking
- event looping, quantisation, recording and overdubbing

See [`docs/DRUMS-PROTOTYPE.md`](docs/DRUMS-PROTOTYPE.md).

### Violin and bowed-string engine, Phase 1

Open [`violin.html`](violin.html).

- standard G3 D4 A4 E5 tuning
- Assisted and Free continuous fingerboard pitch
- slides, vibrato, up-bow, down-bow and bow-speed dynamics
- double stops, string crossings, tremolo and pizzicato

See [`docs/VIOLIN-PROTOTYPE.md`](docs/VIOLIN-PROTOTYPE.md).

### Tabla and hand-percussion engine, Phase 1

Open [`tabla.html`](tabla.html).

- separate bayan and dayan surfaces
- common Phase 1 bols and two-hand Dha or Dhin recognition
- dedicated heel-pressure control and continuous bayan pitch bending
- damping, flams, rolls and bol history

See [`docs/TABLA-PROTOTYPE.md`](docs/TABLA-PROTOTYPE.md).

### Trumpet and brass engine, Phase 1

Open [`trumpet.html`](trumpet.html).

- left-thumb AIR rail for continuous breath and dynamics
- two-dimensional LIP field for harmonic register, lip slurs and bends
- separate TONGUE strip for repeated articulation under one breath
- three full-height multi-touch valve strips
- Assisted and Free lip modes
- Hold and Latch accessibility modes
- concert and B-flat written note displays

See [`docs/TRUMPET-PROTOTYPE.md`](docs/TRUMPET-PROTOTYPE.md).

### Alto saxophone and single-reed engine, Phase 1

Open [`saxophone.html`](saxophone.html).

- left-thumb AIR rail and independent TONGUE strip
- two-dimensional REED field for bends, vibrato, brightness and subtone
- six large main stack keys for the two hands
- separate octave, palm, side and low-register auxiliary bank
- Assisted and Exact fingering modes
- Hold and Latch key and air modes
- written low B-flat 3 through palm F6
- concert and E-flat written note displays
- continuous single-reed synthesis and output metering

See [`docs/SAXOPHONE-PROTOTYPE.md`](docs/SAXOPHONE-PROTOTYPE.md).

## Run locally

No build step is required.

1. Clone the repository.
2. From the repository folder, run:

   ```bash
   python -m http.server 8080
   ```

3. Open:

   - `http://localhost:8080` for piano
   - `http://localhost:8080/guitar.html` for guitar
   - `http://localhost:8080/drums.html` for drums
   - `http://localhost:8080/violin.html` for violin
   - `http://localhost:8080/tabla.html` for tabla
   - `http://localhost:8080/trumpet.html` for trumpet
   - `http://localhost:8080/saxophone.html` for alto saxophone

4. Use a phone in landscape orientation for the intended layouts.

Browsers normally require the first sound to follow a user interaction, so touch a playing surface or diagnostic button to initialise audio.

## Tests

The instrument models have dependency-free Node tests:

```bash
npm test
```

The suite validates guitar fretting, drum timing and looping, violin pitch behaviour, tabla stroke logic, trumpet harmonic and valve behaviour, and saxophone stack, octave, palm, low-register, transposition and fingering modes.

## Product planning

The complete product vision, instrument-family roadmap, commercial model, AI direction, connected-session design, living notation and learning system, expanded opportunity map and production technology-stack research brief are consolidated in [`docs/PRODUCT-PLAN.md`](docs/PRODUCT-PLAN.md). It is the single canonical planning document.

## Project files

```text
riffloom/
├── index.html
├── guitar.html
├── drums.html
├── violin.html
├── tabla.html
├── trumpet.html
├── saxophone.html
├── styles and entry scripts
├── instruments/
│   ├── guitar/
│   ├── drums/
│   ├── violin/
│   ├── tabla/
│   ├── trumpet/
│   └── saxophone/
│       ├── saxophone-model.js
│       ├── sound-engine.js
│       ├── saxophone-ui.js
│       ├── gesture-controller.js
│       ├── main.js
│       └── tests/
│           └── saxophone-model.test.mjs
├── docs/
│   ├── PRODUCT-PLAN.md
│   └── instrument prototype specifications
├── .github/workflows/pages.yml
├── package.json
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

## Contributing

Contributions, device testing and informed criticism are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

Useful early contributions include:

- testing simultaneous touches on different phones and tablets
- measuring audible performance through speakers and headphones
- identifying missed, stuck or incorrectly released notes and hits
- reviewing instrument mappings with experienced musicians and teachers
- testing the trumpet five-finger layout and repeated tonguing
- testing the saxophone six-key stack, auxiliary bank, octave key and reed field
- improving accessibility without reducing playability

## Licence

Riffloom source files are available under the [Mozilla Public License 2.0](LICENSE). Modifications to MPL-covered files must remain available under MPL 2.0, while separate files may be combined into a larger work under different terms, subject to the licence.
