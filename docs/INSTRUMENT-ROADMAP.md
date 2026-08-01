# Riffloom Instrument Roadmap

**Status:** Execution companion to `PRODUCT-PLAN.md`  
**Version:** 0.3  
**Serial:** RFL-IR-260801-2031-03  
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

## Active build: brass interface

### Trumpet Phase 1

The trumpet engine establishes a new wind-instrument screen model:

- a separate AIR rail for breath pressure, dynamics and note continuity
- a two-dimensional LIP field for harmonic register, lip slurs and continuous pitch
- a dedicated TONGUE strip for repeated articulation under one breath
- three independent full-height valve strips
- Assisted and Free lip modes
- Hold and Latch accessibility modes
- concert and B-flat written note displays
- structured valve, air, pitch and articulation state

The five-finger landscape layout is the primary experiment. The left thumb controls air, another left finger controls embouchure, and the right hand controls the three valves.

### Brass derivatives

After trumpet validation, reuse the breath and embouchure foundation for:

1. cornet
2. French horn
3. trombone
4. tuba

Trombone needs a continuous slide layer. French horn needs hand-in-bell and different harmonic behaviour. Tuba needs lower-register air and tubing behaviour.

## Next wind-interface comparison

### Saxophone

Saxophone should be the next wind interface after trumpet because it reuses air and tonguing while replacing the three-valve bank with a larger key and fingering system.

The saxophone prototype should test:

- a compact key layout rather than a literal miniature saxophone
- octave-key behaviour
- continuous breath and tonguing
- normal, subtone and overblown registers
- pitch bends, vibrato, falls and growls later
- alternate fingering support
- a reusable single-reed engine for clarinet

## Plucked regional-string family

### Rabab

Rabab remains planned and has been deferred rather than removed.

The first rabab implementation should clearly state which tradition and tuning it represents. It should reuse suitable guitar foundations while adding plectrum-led attacks, melody and drone strings, sympathetic resonance where applicable, rapid repeated picking, slides, ornaments and a distinct body response.

## Woodwind and reed families

### Single-reed engine

Planned instruments:

- saxophone
- clarinet

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
3. trumpet Phase 1
4. saxophone interface prototype
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
