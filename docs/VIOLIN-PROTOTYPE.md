# Violin prototype specification

## Purpose

The violin prototype begins Riffloom's bowed-string family. It separates the two physical roles of violin playing:

- the upper fingerboard controls pitch and left-hand expression
- the lower performance deck controls bowing or pizzicato

The screen is not a picture of a violin. It is a phone-native performance surface that preserves continuous pitch, bow direction and independent strings.

## Instrument model

The prototype uses standard violin tuning:

- G3
- D4
- A4
- E5

The fingerboard supports offsets from the open string to 33 semitones above it. Four overlapping twelve-semitone windows keep touch targets large:

1. 0 to 12 semitones
2. 7 to 19 semitones
3. 14 to 26 semitones
4. 21 to 33 semitones

## Fingerboard

### Assisted intonation

Finger positions snap to semitone centres. This supports beginners, fast chord testing and clear note labels.

### Free pitch

Finger position remains continuous. This enables:

- microtonal intonation
- portamento
- slides
- pitch shading
- finger vibrato

### Highest finger wins

Several fingers can remain on one string. The highest active finger controls pitch. Releasing it reveals the lower held finger or the open string, matching the practical left-hand hierarchy of a string instrument.

### Position following

A finger held near a visible edge can move the pitch window one semitone at a time. This allows a continuous slide to cross the normal position buttons.

## Bowing surface

The four lower lanes remain ordered G, D, A, E from top to bottom.

- move right for down-bow
- move left for up-bow
- faster movement produces more energy
- touch pressure is used where the device provides it
- the selected bow-weight setting supplies a cross-device fallback
- touch position within a lane changes brightness and bow contact character
- stopping bow movement stops the sustained note

### Double stops

Touching near a boundary between adjacent lanes bows both strings. Two simultaneous bow pointers can also control separate strings independently.

### String crossing

Moving vertically through the bow deck changes the active string or adjacent-string pair. This produces a digital equivalent of bow crossing and broken chords.

### Tremolo

Rapid repeated changes of bow direction are recognised as tremolo. The current engine reports the technique and already produces the alternating bow motion, although production-quality tremolo samples or modelling will be needed later.

## Pizzicato

Pizzicato mode turns each lower lane into a plucked-string surface.

- tap one lane for a single pizzicato note
- touch a boundary for a two-string pizzicato
- drag through several lanes for an arpeggiated pizzicato gesture

## Current audio engine

The prototype uses a continuous Web Audio bowed-string model based on:

- several harmonic oscillators per string
- filtered friction noise
- string-specific body filtering
- continuous frequency transitions
- speed and pressure-controlled gain
- bow-position brightness
- compression and live output metering

Each string is monophonic, matching one vibrating pitch per physical string. Several strings can sound simultaneously.

The current synthesis is a functional prototype. It is not a finished sampled or physically modelled violin.

## Validation criteria

A valid Phase 1 build should demonstrate:

- four independently audible strings
- standard violin tuning
- reliable hold and latch fingering
- assisted and free intonation
- continuous slides
- finger vibrato recognition
- release to lower finger and open string
- sustained up-bow and down-bow
- bow-speed dynamics
- device-pressure support with a fallback
- double stops
- string crossings
- tremolo recognition
- pizzicato
- no stuck voices after pointer release or cancelled touches
- automated model tests passing

## Known limitations

- The synthesiser does not yet reproduce a professional violin body or bow in full detail.
- Bow pressure is partly inferred because phone pressure reporting varies.
- Triple and four-string chords are currently performed as successive crossings or multiple touches.
- Spiccato, sautillé, ricochet, col legno, harmonics and advanced bow articulations are not yet implemented.
- The interface does not provide tactile string or fingerboard feedback.
- Latency and maximum simultaneous touches vary by device.

## Next bowed-string phases

1. validate the violin interface on phones and tablets
2. add short-bow articulations such as détaché, martelé and spiccato
3. add natural and artificial harmonics
4. improve double-stop and chord bowing
5. add richer body resonance and sympathetic-string response
6. adapt the engine for viola and cello
7. add double-bass bow and pizzicato behaviour
8. build a dedicated sarangi adaptation layer
