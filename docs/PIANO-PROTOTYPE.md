# Piano prototype specification

## Purpose

The prototype tests whether a full piano can be made playable on a landscape phone without forcing the musician to switch between hidden octaves.

It does not attempt to reproduce the physical geometry of a piano. It preserves the full note range while reorganising that range for the available screen.

## Layout

The 88 notes from A0 to C8 are divided into three contiguous groups:

1. A0 to C♯3
2. D3 to F♯5
3. G5 to C8

The middle group is displayed from high to low. This creates a folded path across the three rows and keeps the end of one group close to the beginning of the next.

White keys fill the complete row. Black keys overlap the top portion of the white-key layer, allowing both key types to use the same screen area.

## Pedal adaptation

The three piano pedals are represented by independent latching switches on the left edge:

- **SFT:** soft or una corda
- **SOS:** sostenuto
- **SUS:** sustain or damper

All three can be off, any combination can be on, and all three can be on together. The interaction is intentionally adapted from foot pressure to fast touchscreen switching.

Sostenuto captures the notes held at the moment the switch is activated. Sustain protects all released notes while active.

## Input model

The prototype uses Pointer Events so each finger has an independent pointer identifier. A pointer can:

- press a note
- hold a note
- slide to a neighbouring note
- release its own active voice without releasing other fingers

Black keys are hit-tested before white keys because they visually and functionally overlap the white-key layer.

## Current audio model

The current engine uses Web Audio oscillators and is designed for diagnosis rather than realism.

Low notes are difficult for small phone speakers. The optional phone-speaker bass mode adds audible upper harmonics while retaining the note's fundamental frequency. The diagnostic click confirms that a note-on event reached the audio chain even when the fundamental is below the useful range of the speaker.

The four bass tests play:

1. the requested note at its real pitch
2. the same input two octaves higher

The comparison helps distinguish an input fault from a speaker-frequency limitation.

## Validation criteria

A build should not be considered valid unless:

- exactly 88 note nodes are generated
- exactly 52 are white keys
- exactly 36 are black keys
- every row shows visual press feedback
- multi-touch notes release independently
- sliding does not leave stuck voices
- sustain and sostenuto release protected voices correctly
- the audio meter responds when the audio engine produces output

## Known limitations

- Oscillator synthesis does not sound like a professional piano.
- Touchscreens do not provide physical key travel or dependable velocity sensing across all devices.
- Phone speakers cannot reproduce the lowest fundamentals faithfully.
- Browser audio latency and multi-touch capacity vary by device.
- The current latching pedal model is an interface adaptation, not a physical pedal simulation.

## Next technical steps

1. Add automated keyboard-map tests.
2. Record device-specific touch and audio results.
3. Measure end-to-end latency.
4. Evaluate sample-based and physically modelled piano engines.
5. Define a cross-device expression and velocity model.
6. Test the three-row layout with pianists and non-pianists.
7. Move the validated interaction engine into a mobile application architecture.
