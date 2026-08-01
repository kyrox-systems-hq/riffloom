# Riffloom Instrument Roadmap

**Status:** Execution companion to `PRODUCT-PLAN.md`  
**Serial:** RFL-IR-260801-1949-01  
**Last updated:** 1 August 2026

## Relationship to the product plan

`docs/PRODUCT-PLAN.md` remains the living source of truth for the complete product. This file is deliberately narrower. It records the instrument-family architecture, build sequence and validation gates so instrument work can continue without creating parallel edits to the broader product plan.

## Principle

Riffloom should not build every instrument as a separate application. It should build reusable **instrument-family engines**, then adapt those engines for related instruments.

Each family should share:

- structured note and articulation events
- multi-touch input handling
- timing and expression data
- recording compatibility
- accessibility modes
- audio-engine interfaces
- validation tests

The interface and sound model must still respect the distinct technique of each instrument.

## Existing foundations

### Keyboard engine

Current prototype:

- piano

Future related instruments may include organ, electric piano and synthesiser keyboards after the core piano interaction and recording model is stable.

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

## Active build: bowed strings

### Phase 1: violin

The first bowed-string engine must establish:

- four independently sounding strings
- standard G3, D4, A4 and E5 tuning
- continuous fingerboard pitch
- assisted and free intonation
- left-hand slides and vibrato
- bow direction and speed
- bow pressure fallback controls
- double stops
- string crossings
- pizzicato
- tremolo recognition
- structured performance events for later recording

### Bowed-string derivatives

After violin validation, reuse the engine for:

- viola
- cello
- double bass
- sarangi

Each derivative needs its own tuning, range, body response, bow behaviour, playing posture and ornamentation. Sarangi must not be treated as a simple violin skin. Its sympathetic resonance, fingering approach and ornamentation need a dedicated adaptation layer.

## Hand-percussion family

### Tabla

Tabla should follow the first violin prototype.

The tabla engine must model:

- separate dayan and bayan surfaces
- centre, edge and muted strike zones
- named bols and combined strokes
- finger, palm and heel techniques
- bayan pressure movement for continuous pitch bending
- rapid rolls and repeated-finger patterns
- independent left and right hand timing
- taal-aware recording and practice support later

Possible later derivatives include other hand drums, but tabla should be designed as its own performance system rather than as two generic drum pads.

## Plucked regional-string family

### Rabab

Rabab should follow tabla.

The rabab engine should reuse appropriate guitar foundations while adding:

- plectrum-led attacks
- melody, drone and sympathetic strings where the selected rabab type requires them
- rapid repeated picking
- slides, ornaments and grace notes
- regional tunings and instrument variants
- resonant body modelling distinct from guitar

The first implementation should state clearly which rabab tradition and tuning it represents rather than combining several instruments under one vague profile.

## Brass family

Build one shared breath, valve and embouchure framework, beginning with:

1. trumpet
2. cornet
3. French horn
4. trombone
5. tuba

The engine must support:

- continuous breath energy
- tonguing and repeated articulation
- valve or slide fingering
- lip-controlled harmonic selection
- pitch bends and vibrato
- growls, falls and shakes later
- optional microphone breath control without making microphone input mandatory

Trombone needs a continuous slide surface and therefore a dedicated control layer on top of the brass engine.

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

Shared wind controls should include:

- continuous breath
- tonguing
- fingering systems
- dynamics and overblowing
- vibrato
- pitch shading
- key noise and breath noise where appropriate

Shehnai must receive its own ornamentation, tuning and timbral model rather than inheriting a generic oboe profile.

## Build order

The current intended sequence is:

1. violin Phase 1
2. tabla
3. rabab
4. viola, cello, double bass and sarangi adaptations
5. bass guitar
6. trumpet and the shared brass engine
7. saxophone and clarinet
8. shehnai, oboe and bassoon
9. flute
10. specialist variants and extended techniques across all families

This sequence may change when testing reveals a shared technical dependency or a more commercially useful order.

## Validation gate for every instrument

An instrument should not be considered ready merely because its controls make sound. Before moving to the next major phase, verify:

- every intended playing surface responds reliably
- simultaneous touches do not create stuck notes
- the complete practical pitch or articulation range is represented
- core real-instrument techniques have an explicit screen equivalent
- audio output remains audible and reasonably balanced on phone speakers and headphones
- timing is suitable for recording
- performance data is stored as structured events
- the interface works in the intended landscape ratio
- accessibility modes do not weaken the professional interaction model
- known limitations are documented honestly
