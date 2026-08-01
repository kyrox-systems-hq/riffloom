# Riffloom

Riffloom is an open-source, phone and tablet-native music creation platform for playable instruments, multitrack recording, looping and remixing.

The project starts with a simple question: instead of shrinking physical instruments onto a small touchscreen, what would musical instruments look like if they were designed for the screen from the beginning?

## Live prototypes

GitHub Pages deployment is configured from the `main` branch.

- Piano: `https://kyrox-systems-hq.github.io/riffloom/`
- Guitar: `https://kyrox-systems-hq.github.io/riffloom/guitar.html`
- Drums: `https://kyrox-systems-hq.github.io/riffloom/drums.html`

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

The current piano sound engine is diagnostic synthesis. It proves the interaction model and helps identify speaker limitations. It is not yet the final professional piano engine.

### Expressive guitar, Phase 1

Open [`guitar.html`](guitar.html).

- six independently calibrated strings in standard E2 A2 D3 G3 B3 E4 tuning
- access to 24 frets through overlapping windows and automatic slide following
- separate fretting and picking areas for two-handed play
- Hold and Latch fretting modes
- simultaneous chord shapes, partial barres and full barres
- highest-fret-wins behaviour on each string
- hammer-ons, pull-offs and continuous slides on ringing strings
- independent bends from one to four semitones
- vibrato recognition from repeated bend movement
- open strings and dead-muted strings
- direction-aware single-string picking
- partial and complete upstrokes and downstrokes
- pick-position tone from warm neck attacks to brighter bridge attacks
- a dedicated hold rail for continuous palm muting
- per-string synthesis, compression and a live output meter

The implementation and remaining roadmap are documented in [`docs/GUITAR-PROTOTYPE.md`](docs/GUITAR-PROTOTYPE.md).

### Drums and first loop recorder

Open [`drums.html`](drums.html).

- eight packed performance surfaces
- crash, high tom, mid tom, ride, hi-hat, snare, floor tom and kick
- distinct snare head, rimshot and cross-stick zones
- cymbal bell, bow and edge zones
- tom head and rim zones
- hard and soft kick beater zones
- closed, half-open and open hi-hat states
- pedal chick control
- drag fills across several surfaces
- cymbal choking by holding a ringing cymbal
- flam and roll recognition from hit timing
- one, two or four-bar event loops
- adjustable BPM, count-in, metronome and quantisation
- recording, playback, clearing and overdubbing
- 16-step visual loop overview

The drum design and recorder behaviour are documented in [`docs/DRUMS-PROTOTYPE.md`](docs/DRUMS-PROTOTYPE.md).

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

4. Use a phone in landscape orientation for the intended layouts.

Browsers normally require the first sound to follow a user interaction, so press a key, string, pad or diagnostic button to initialise audio.

## Tests

The guitar and drum models have dependency-free Node tests:

```bash
npm test
```

The tests validate guitar tuning and fretting behaviour, plus drum zones, hi-hat state, loop timing, quantisation, flam detection and roll detection.

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

The current focus is validating the piano, expressive guitar and drum interaction models on real phones, then moving the drum event recorder into a shared multitrack layer.

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
├── instruments/
│   ├── guitar/
│   │   ├── guitar-model.js
│   │   ├── sound-engine.js
│   │   ├── guitar-ui.js
│   │   ├── gesture-controller.js
│   │   ├── main.js
│   │   └── tests/
│   │       └── guitar-model.test.mjs
│   └── drums/
│       ├── drum-model.js
│       ├── sound-engine.js
│       ├── looper.js
│       ├── drum-ui.js
│       ├── gesture-controller.js
│       ├── main.js
│       └── tests/
│           └── drum-model.test.mjs
├── docs/
│   ├── PIANO-PROTOTYPE.md
│   ├── GUITAR-PROTOTYPE.md
│   └── DRUMS-PROTOTYPE.md
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
- testing simultaneous fretting, bending, palm muting and strumming
- testing multi-finger drum hits, fills, cymbal chokes and loop timing
- improving accessibility without reducing playability
- proposing evidence-based interface improvements

## Licence

Riffloom source files are available under the [Mozilla Public License 2.0](LICENSE). Modifications to MPL-covered files must remain available under MPL 2.0, while separate files may be combined into a larger work under different terms, subject to the licence.
