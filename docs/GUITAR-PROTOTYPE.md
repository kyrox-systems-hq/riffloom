# Guitar prototype specification

## Purpose

The guitar prototype tests a phone-native division of labour between the two hands:

- the upper fretboard selects pitch, chord shape and fretting articulation
- the lower performance deck plucks, strums and shapes sounding strings

The interface preserves the musical logic of a guitar without drawing a miniature decorative guitar.

## Instrument model

The Phase 1 prototype uses a six-string guitar in standard tuning, from lowest to highest:

- E2
- A2
- D3
- G3
- B3
- E4

Low E is permanently displayed at the top and High E at the bottom. Therefore:

- a downward swipe is a downstroke from low strings towards high strings
- an upward swipe is an upstroke from high strings towards low strings

The fretboard supports 24 frets.

## Fret positions

Showing all 24 frets at once would make each target too narrow on a phone. The normal position buttons open six-fret windows:

1. frets 1 to 6
2. frets 5 to 10
3. frets 9 to 14
4. frets 13 to 18
5. frets 17 to 22
6. frets 19 to 24

During a continuous slide, the window can advance one fret at a time when the finger remains at an edge. This lets a sounding slide cross the normal position boundaries.

## Phase 1 interactions

### Fretting

**Hold mode** keeps a fret active while the finger remains on the screen. Several pointers can hold independent frets.

**Latch mode** keeps a selected fret active after release. It is useful for chord building, accessibility and testing.

The highest active fret wins when several fingers affect the same string.

A finger dragged vertically through several strings at one fret creates a partial or full barre. Moving that same finger horizontally slides the complete barre.

### Hammer-ons and pull-offs

When a string is already ringing:

- pressing a higher fret without another pick produces a hammer-on
- revealing a lower held fret produces a pull-off
- a quick release towards the open string produces a pull-off to open
- a slower clean release damps the string

### Slides

Moving a held fret horizontally while its string is ringing creates a continuous pitch transition. The movement speed determines the transition time. A barre can be slid as one shape.

### Picking and strumming

The performance deck contains six large string lanes.

- tap one lane for a neutral pluck
- flick down inside one lane for a down-picked note
- flick up inside one lane for an up-picked note
- swipe down through several lanes for a downstroke
- swipe up through several lanes for an upstroke
- start and stop on any lane for a partial strum

Fast gestures produce stronger, tighter attacks. Slower gestures leave more time between the strings.

The horizontal pick position changes timbre. Playing nearer the neck is warmer and playing nearer the bridge is brighter.

### Bends and vibrato

After plucking one string, keep the pointer on its lane and move right to raise pitch. The maximum range can be set from one to four semitones.

Returning towards the starting point releases the bend. Repeated small changes in movement direction are reported as vibrato. Each string has an independent bend value, so one note can bend while the others continue unchanged.

### Palm muting

The PALM rail sits on the right edge of the performance deck. Hold it with one pointer while another pointer picks or strums.

- the left side of the rail applies light palm muting
- moving right increases the depth
- stronger muting shortens decay and darkens the sound
- releasing the rail removes the palm mute for new notes

Muted chord strings remain available through the O or X controls at the left of the fretboard. Crossing a muted string produces a dead percussive stroke rather than complete silence.

## Audio engine

The current Web Audio engine is a functional prototype rather than a finished guitar sample library.

It now provides:

- a separate gain, decay and harmonic profile for every string
- stronger audible harmonics for the lower strings
- direction-dependent pick attack
- pick-position brightness
- per-string monophonic behaviour, matching one vibrating note per physical string
- frequency transitions for hammer-ons, pull-offs and slides
- independent real-time bend control
- continuous palm-mute filtering and decay control
- a master compressor and output meter

## Architecture

The guitar is separated into focused modules:

```text
instruments/guitar/
├── guitar-model.js
├── sound-engine.js
├── guitar-ui.js
├── gesture-controller.js
├── main.js
└── tests/
    └── guitar-model.test.mjs
```

The model owns tuning, frets, muting and chord shapes. The gesture controller converts screen movement into musical actions. The sound engine converts those actions into audio. This separation allows the current synthesis to be replaced without rebuilding the interaction model.

## Validation criteria

A valid Phase 1 build should demonstrate:

- six independently audible strings
- standard EADGBE tuning
- fret access from 1 to 24
- reliable simultaneous fretting and picking
- highest-fret-wins behaviour
- partial and full barres
- hammer-ons and pull-offs on ringing strings
- continuous slides, including position-window following
- independent bends and vibrato
- clean damping without stuck voices
- open and dead-muted strings
- direction-aware individual picking
- partial and full upstrokes and downstrokes
- continuous palm-mute depth
- automated model tests passing

## Not included yet

The next phases still need:

- proper fingerstyle attack profiles
- rest strokes and free strokes
- alternate, tremolo, sweep and hybrid picking recognition
- natural, artificial, pinch and tapped harmonics
- body percussion and string slaps
- alternate tunings, capo and additional string counts
- acoustic, electric, classical, baritone and fretless profiles
- whammy systems, feedback and specialist extended techniques
- a professional sample-based or physically modelled production sound engine
