# Riffloom Instrument Roadmap

**Status:** Execution companion to `PRODUCT-PLAN.md`  
**Version:** 0.4  
**Serial:** RFL-IR-260801-2059-04  
**Last updated:** 1 August 2026

## Relationship to the product plan

`docs/PRODUCT-PLAN.md` remains the living source of truth for the complete product. This file is deliberately narrower. It records the instrument-family architecture, build sequence and validation gates so instrument work can continue without creating parallel edits to the broader product plan.

## Principle

Riffloom should build reusable **instrument-family engines**, then adapt those engines for related instruments. Every family should share structured music events, multi-touch handling, timing and expression data, recording compatibility, accessibility modes, audio-engine interfaces and validation tests.

The interface and sound model must still respect the distinct technique of each instrument.

## Existing foundations

### Keyboard engine

Current prototype:

- piano

Future derivatives may include organ, electric piano and synthesiser keyboards.

### Fretted plucked-string engine

Current prototype:

- six-string guitar

Planned derivatives:

- bass guitar
- baritone guitar
- seven and eight-string guitar
- twelve-string guitar

### Drum-kit engine

Current prototype:

- eight-surface drum kit
- loop recording and overdubbing

### Bowed-string engine

Current Phase 1 prototype:

- violin

The foundation covers continuous fingerboard pitch, assisted and free intonation, slides, vibrato, bow direction, bow speed, pressure fallback controls, double stops, string crossings, tremolo and pizzicato.

Planned derivatives:

- viola
- cello
- double bass
- sarangi

Sarangi requires its own sympathetic resonance, fingering and ornamentation layer rather than a simple violin profile.

### Hand-percussion engine

Current Phase 1 prototype:

- tabla

The foundation covers separate dayan and bayan surfaces, common Phase 1 bols, compound Dha and Dhin timing, heel-controlled bayan pitch, damping, flams, rolls and selectable dayan tonic.

Later tabla work should add teacher-verified stroke maps, additional bols, taal and theka practice, lehra accompaniment and professional tabla audio.

### Brass engine

Current Phase 1 prototype:

- B-flat trumpet

The trumpet foundation establishes:

- a separate AIR rail for breath pressure, dynamics and note continuity
- a two-dimensional LIP field for harmonic register, lip slurs and continuous pitch
- a dedicated TONGUE strip for repeated articulation under one breath
- three independent valve strips
- Assisted and Free lip modes
- concert and B-flat written note displays

Planned derivatives:

- cornet
- French horn
- trombone
- tuba

Trombone needs a continuous slide layer. French horn needs hand-in-bell and different harmonic behaviour. Tuba needs lower-register air and tubing behaviour.

### Single-reed engine

Current Phase 1 prototype:

- E-flat alto saxophone

The saxophone foundation keeps AIR and TONGUE from the brass experiment but replaces the trumpet valve bank with:

- six large main stack keys
- a separate octave key
- palm D, E and F keys
- left and right pinky low-register keys
- Bis and side alternatives
- a two-dimensional REED field for bends, vibrato, brightness and subtone
- Assisted and Exact fingering modes
- concert and E-flat written note displays

The first supported written range runs from low B-flat 3 to palm F6. The fingering database is intentionally incomplete and must expand after real-device and musician testing.

Planned single-reed derivatives:

- clarinet
- tenor saxophone
- soprano saxophone
- baritone saxophone

## Plucked regional-string family

### Rabab

Rabab remains planned and has been deferred rather than removed.

The first rabab implementation should clearly state which tradition and tuning it represents. It should reuse suitable guitar foundations while adding plectrum-led attacks, melody and drone strings, sympathetic resonance where applicable, rapid repeated picking, slides, ornaments and a distinct body response.

## Double-reed and air-jet families

### Double-reed engine

Planned instruments:

- oboe
- bassoon
- shehnai

### Air-jet engine

Planned instrument:

- flute

Shared wind controls should include continuous breath, tonguing, fingering systems, dynamics, overblowing, vibrato, pitch shading, key noise and breath noise where appropriate.

Shehnai must receive its own ornamentation, tuning and timbral model rather than inheriting a generic oboe profile.

## Current build order

1. validate violin Phase 1
2. validate tabla Phase 1
3. validate trumpet Phase 1
4. validate alto saxophone Phase 1 and compare it with the trumpet screen model
5. rabab
6. viola, cello, double bass and sarangi adaptations
7. bass guitar
8. cornet, French horn, trombone and tuba
9. clarinet
10. shehnai, oboe and bassoon
11. flute
12. specialist variants and extended techniques across all families

The sequence may change when testing reveals a shared technical dependency or a stronger product reason.

## Validation gate for every instrument

An instrument should not be considered ready merely because its controls make sound. Before moving to the next major phase, verify:

- every intended playing surface responds reliably
- simultaneous touches do not create stuck notes
- the complete practical pitch or articulation range is represented
- core real-instrument techniques have an explicit screen equivalent
- audio remains audible and reasonably balanced on phone speakers and headphones
- timing is suitable for recording
- performance data is stored as structured events
- the interface works in the intended landscape ratio
- accessibility modes do not weaken the professional interaction model
- known limitations are documented honestly
