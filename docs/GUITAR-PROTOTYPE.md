# Guitar prototype specification

## Purpose

The guitar prototype tests a phone-native division of labour between the two hands:

- the upper fretboard selects pitch and chord shape
- the lower picking area triggers individual strings and strums

The interface preserves the musical logic of a guitar without drawing a miniature decorative guitar.

## Instrument model

The first prototype uses a six-string guitar in standard tuning, from lowest to highest:

- E2
- A2
- D3
- G3
- B3
- E4

The fretboard supports 24 frets.

## Why the complete fretboard is not shown at once

A guitar is normally played in positions. Chords and melodic passages typically use a limited local span of frets at one time. Showing all 24 frets would make each target too narrow on a phone.

The prototype therefore uses six overlapping windows:

1. frets 1 to 6
2. frets 5 to 10
3. frets 9 to 14
4. frets 13 to 18
5. frets 17 to 22
6. frets 19 to 24

The overlaps keep boundary notes available before and after a position change.

## Fretting model

### Hold mode

A fret remains active while the finger remains on the screen. Several fingers can hold different strings and frets simultaneously while another finger plucks or strums.

### Latch mode

A tapped or dragged shape remains active after release. This supports one-handed testing, accessibility and quick chord building.

### Highest fret wins

If more than one touch affects the same string, the highest fret controls the sounding pitch. This follows the physical behaviour of a fretted string.

### Barre gesture

One finger can press a fret and drag vertically across adjacent strings. The traversed strings are assigned the same fret, allowing a single touch to represent a barre.

### Open and muted strings

The permanent cell at the left of each string toggles between open and muted. This follows the familiar O and X distinction used in guitar chord notation.

## Picking model

The lower area contains six large string lanes.

- Tap one lane to pluck one string.
- Swipe across lanes to strum.
- Swipe direction determines up-strum or down-strum.
- Swipe speed, with touch pressure where available, controls intensity.
- Horizontal picking position changes timbre: nearer the neck is warmer and nearer the bridge is brighter.

This uses touch information for musical controls that have clear equivalents on a physical guitar.

## Current audio engine

The prototype uses a Karplus-Strong plucked-string model generated with Web Audio.

Each string:

- uses its fretted MIDI pitch
- has string-specific decay
- replaces its previous vibration when plucked again
- passes through a brightness filter controlled by picking position
- produces a short percussive sound when muted

This is a functional synthesis model, not yet a finished acoustic or electric guitar sound.

## Validation criteria

A valid build should demonstrate:

- six independently playable strings
- standard EADGBE tuning
- fret access from 1 to 24
- reliable simultaneous fretting and picking
- independent pointer tracking for several fingers
- vertical barre gestures
- highest-fret-wins behaviour
- open and muted strings
- single-string plucking
- ordered up-strums and down-strums
- no stuck fretting gestures or endless voices

## Known limitations

- Hammer-ons, pull-offs and pitch-continuous slides are not yet modelled.
- String bending and vibrato are not yet implemented.
- The synthesiser does not yet model pickups, amplifiers, body resonance or real samples in depth.
- Browser multi-touch limits vary by device.
- A position change currently releases active fretting gestures.

## Next technical steps

1. Add hammer-on, pull-off and slide behaviour when a sounding string changes fret.
2. Add vertical bend and micro-vibrato gestures without confusing neighbouring strings.
3. Add alternate tunings and capo support.
4. Add acoustic, clean electric and distorted sound engines.
5. Measure touch-to-audio latency on representative devices.
6. Test the physical string order against tablature order with guitarists.
7. Add automated tests for tuning, fret windows and chord presets.

## Design references

- Fender describes standard six-string tuning as E, A, D, G, B, E from the lowest string to the highest: https://www.fender.com/articles/setup/standard-tuning-how-eadgbe-came-to-be
- MDN documents Pointer Events as a unified input model that supports multiple simultaneous pointers: https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Multi-touch_interaction
