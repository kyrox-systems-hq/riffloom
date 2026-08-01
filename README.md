# Riffloom

Riffloom is an open-source, phone and tablet-native music creation platform for playable instruments, multitrack recording, looping and remixing.

The project starts with a simple question: instead of shrinking physical instruments onto a small touchscreen, what would musical instruments look like if they were designed for the screen from the beginning?

## Current prototype

The repository currently contains the first working piano prototype:

- all 88 piano keys visible at once
- three stacked landscape rows
- 52 white keys and 36 black keys
- a folded middle row to keep the keyboard path compact
- multi-touch note input and slide-to-key movement
- independent soft, sostenuto and sustain switches
- stronger harmonics for bass notes on small speakers
- audio diagnostics for A0, A1, A2 and C3
- visible touch, audio-state and output-level feedback

The present audio engine is diagnostic synthesis. It proves the interaction model and helps identify speaker limitations. It is not yet the final professional piano sound engine.

## Run it locally

No build step is required.

1. Clone the repository.
2. From the repository folder, run a local web server:

   ```bash
   python -m http.server 8080
   ```

3. Open `http://localhost:8080` in a browser.
4. Use a phone in landscape orientation for the intended layout.

Browsers normally require the first sound to follow a user interaction, so press a key or diagnostic button to initialise audio.

## Keyboard layout

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

The immediate focus is making the piano input model reliable before expanding the instrument library.

## Project files

```text
riffloom/
├── index.html
├── styles.css
├── app.js
├── docs/
│   └── PIANO-PROTOTYPE.md
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

## Contributing

Contributions, device testing and informed criticism are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

Useful early contributions include:

- testing touch behaviour on different phones and tablets
- measuring audible bass performance on different speakers and headphones
- identifying missed, stuck or incorrectly released notes
- improving accessibility without reducing playability
- proposing evidence-based interface improvements

## Licence

Riffloom source files are available under the [Mozilla Public License 2.0](LICENSE). Modifications to MPL-covered files must remain available under MPL 2.0, while separate files may be combined into a larger work under different terms, subject to the licence.
