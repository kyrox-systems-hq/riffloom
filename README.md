# Riffloom

Riffloom is an open-source, phone and tablet-native music creation platform for playable instruments, multitrack recording, looping and remixing.

The project starts with a simple question: instead of shrinking physical instruments onto a small touchscreen, what would musical instruments look like if they were designed for the screen from the beginning?

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

### Guitar

Open [`guitar.html`](guitar.html).

- six strings in standard E2 A2 D3 G3 B3 E4 tuning
- access to 24 frets through six overlapping position windows
- separate fretting and picking areas for two-handed play
- Hold and Latch fretting modes
- simultaneous multi-finger chord shapes
- vertical drag gestures for barres
- highest-fret-wins behaviour on each string
- open and muted string controls
- individual plucking and ordered up-strums or down-strums
- strum speed and touch pressure mapped to intensity
- picking position mapped from warm neck tones to brighter bridge tones
- Karplus-Strong plucked-string synthesis

The guitar implementation and its current limitations are documented in [`docs/GUITAR-PROTOTYPE.md`](docs/GUITAR-PROTOTYPE.md).

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

4. Use a phone in landscape orientation for the intended layouts.

Browsers normally require the first sound to follow a user interaction, so press a key, string or diagnostic button to initialise audio.

## Piano keyboard layout

| Row | MIDI range | Musical range | Keys | White | Black |
| --- | ---: | --- | ---: | ---: | ---: |
| Top | 21 to 49 | A0 to C♯3 | 29 | 17 | 12 |
| Middle | 50 to 78 | D3 to F♯5, displayed in reverse | 29 | 17 | 12 |
| Bottom | 79 to 108 | G5 to C8 | 30 | 18 | 12 |
| **Total** | 21 to 108 | A0 to C8 | **88** | **52** | **36** |

## Direction

Riffloom is intended to grow into a wider music platform with:

1. more phone-native instruments
2. professional, low-latency audio engines
3. multitrack recording and overdubbing
4. looping, arrangement and mixing
5. MIDI and external-controller support
6. mobile application packaging
7. optional premium sounds, services and production tools around the open-source core

The immediate focus is validating the piano and guitar interaction models on real phones before expanding the instrument library.

## Project files

```text
riffloom/
├── index.html
├── styles.css
├── app.js
├── guitar.html
├── guitar.css
├── guitar.js
├── docs/
│   ├── PIANO-PROTOTYPE.md
│   └── GUITAR-PROTOTYPE.md
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

## Contributing

Contributions, device testing and informed criticism are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

Useful early contributions include:

- testing touch behaviour on different phones and tablets
- measuring audible performance through speakers and headphones
- identifying missed, stuck or incorrectly released notes
- testing simultaneous fretting and strumming
- improving accessibility without reducing playability
- proposing evidence-based interface improvements

## Licence

Riffloom source files are available under the [Mozilla Public License 2.0](LICENSE). Modifications to MPL-covered files must remain available under MPL 2.0, while separate files may be combined into a larger work under different terms, subject to the licence.
