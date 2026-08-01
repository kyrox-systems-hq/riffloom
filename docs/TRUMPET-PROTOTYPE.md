# Trumpet prototype specification

## Purpose

The trumpet prototype begins Riffloom's brass family. It tests whether the main physical roles of brass playing can be separated into a practical multi-touch screen instrument:

- air pressure and note continuity
- embouchure and harmonic selection
- tongued articulation
- three-valve fingering

The screen is not a drawing of a trumpet. It is a performance layout designed around two hands on a landscape phone.

## Screen layout

The 16:9 performance surface is divided into three sections.

### AIR rail

The left thumb holds and moves on a vertical air rail.

- higher position means more air and greater loudness
- lower position means less air and a softer tone
- device pressure supplements the rail position where supported
- releasing the rail stops the note in Hold mode
- Latch mode retains the selected air level for accessibility and testing
- AIR OFF always releases the voice

Every new air press produces a tongued attack. Rapid release and re-press therefore creates repeated tonguing even without the dedicated tongue control.

### LIP field

A second left-hand finger controls a large two-dimensional embouchure field.

- vertical position selects the harmonic register
- horizontal position controls fine lip pitch or a wider bend
- moving vertically while air continues produces a lip slur
- small repeated horizontal movement in Free mode produces lip vibrato
- larger horizontal movement creates bends or shakes

Assisted mode snaps vertical movement to stable harmonic slots and limits horizontal movement to fine intonation. Free mode preserves a continuous harmonic-series position and enables the selected bend range.

### TONGUE strip

The TONGUE strip creates a fresh attack without ending the air stream. It can be tapped by another left-hand finger while the thumb maintains air.

If no air is active, a TONGUE tap produces a short diagnostic note. With air active, it re-articulates the sustained note.

### Valve bank

Three full-height valve strips occupy the right side of the screen.

- valve 1 lowers pitch by approximately two semitones
- valve 2 lowers pitch by approximately one semitone
- valve 3 lowers pitch by approximately three semitones
- several right-hand fingers can hold combinations simultaneously
- Hold mode behaves like physical valves
- Latch mode supports accessibility and testing
- sliding between valve strips changes the held valve for that pointer

## Pitch model

The prototype represents a B-flat trumpet in concert pitch.

The open assisted harmonic ladder begins with:

- B-flat 3
- F4
- B-flat 4
- D5
- F5
- A-flat 5
- B-flat 5
- C6
- D6

The seven practical valve states lower the active harmonic slot by zero to six semitones.

### Concert and written notes

Concert display shows the pitch actually heard.

B-flat written display shows the note a B-flat trumpet player reads, two semitones above the concert pitch. Changing the display does not change the sound.

### Assisted mode

Assisted mode uses equal-tempered note centres for the harmonic slots. It is intended for immediate playability and clean melodic work.

### Free mode

Free mode follows the continuous harmonic series rather than snapping each vertical position to a fixed note. Horizontal lip movement adds a continuous bend. This supports:

- lip slurs
- pitch shading
- bends
- vibrato
- shakes
- deliberately unstable transitions

## Air and dynamics

Air pressure controls:

- output level
- breath-noise level
- brightness
- harmonic presence
- the speed at which the sound speaks

Moving the AIR rail while a note is sounding creates a crescendo or decrescendo. The current engine does not yet model endurance, breath capacity or the changing difficulty of extreme registers.

## Articulation

Phase 1 supports:

- initial tongued attacks
- repeated tonguing through AIR re-presses
- repeated tonguing through the TONGUE strip
- sustained notes
- valve changes under one breath
- lip slurs under one breath
- continuous lip bends and vibrato in Free mode

The engine currently uses one general tongue profile. Later phases should distinguish soft, normal, accented, double and triple tonguing.

## Current audio engine

The Web Audio prototype uses:

- a brass-oriented periodic harmonic waveform
- a supporting low partial
- filtered breath noise
- light saturation
- body and presence filtering
- air-controlled brightness and gain
- continuous pitch movement
- short tongue-noise transients
- compression and live output metering

The current engine is a functional brass synthesiser for validating interaction. It is not a finished sampled or physically modelled trumpet.

## Validation criteria

A valid Phase 1 build should demonstrate:

- reliable independent AIR, LIP and valve touches
- three simultaneous valve pointers
- every valve combination from open to 1+2+3
- stable Assisted harmonic selection
- continuous Free lip movement
- lip slurs while air remains active
- fine pitch adjustment and wider bends
- repeated tonguing without releasing the valves
- crescendo and decrescendo
- concert and B-flat written note displays
- no stuck audio after pointer cancellation
- balanced audible output on phone speakers and headphones
- automated model tests passing

## Known limitations

- Touch air control does not reproduce actual breath resistance.
- Microphone breath input is not included yet.
- The additive valve-length approximation does not yet model all real trumpet intonation tendencies.
- Third-valve slide and first-valve slide adjustments are not implemented.
- Pedal tones and extreme upper-register slots are not included in the main assisted ladder.
- Mutes, half-valving, falls, doits, growls and flutter tonguing are not included.
- The sound engine does not yet reproduce a professional acoustic trumpet.
- Maximum simultaneous touch reliability depends on the device.

## Next brass phases

1. test the five-finger layout on several phone sizes
2. add configurable hand orientation and left-handed layout
3. add half-valve and tuning-slide controls
4. distinguish soft, normal, accented, double and triple tonguing
5. add falls, doits, shakes, growls and flutter tonguing
6. add straight, cup, harmon and plunger mute profiles
7. add optional microphone breath control
8. adapt the shared engine for cornet and French horn
9. build a continuous slide layer for trombone
10. add low-register breath and tubing behaviour for tuba
