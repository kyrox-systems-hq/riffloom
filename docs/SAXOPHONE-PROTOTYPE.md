# Alto saxophone prototype specification

## Purpose

The saxophone prototype is Riffloom's second wind-interface experiment and its first single-reed instrument.

It tests whether the continuous controls established by trumpet can scale to an instrument with a much denser fingering system:

- breath pressure and note continuity
- tongued articulation
- embouchure, reed brightness and pitch bending
- six main stack keys
- octave, palm, side and low-register keys

The screen is not a miniature drawing of a saxophone. It preserves the two-hand logic of the instrument while making the main finger targets large enough for a landscape phone.

## Instrument represented

Phase 1 represents an E-flat alto saxophone.

The supported written range is:

- low B-flat 3
- through the normal stack and octave register
- to palm F6

Concert pitch sounds nine semitones below the written note. The interface can display either concert pitch or E-flat written notation without changing the sound.

## Screen layout

The 16:9 surface is split into four sections.

### AIR rail

The left thumb controls a vertical air rail.

- higher position gives stronger air and greater loudness
- lower position gives softer air
- continuous movement creates crescendos and decrescendos
- device pressure supplements rail position where available
- Hold mode stops air when the thumb lifts
- Latch mode keeps the selected air level for accessibility and testing
- AIR OFF always releases the voice

A new air press produces a tongued attack.

### REED field

A second left-hand finger controls the two-dimensional reed and embouchure field.

- horizontal movement bends pitch flat or sharp
- small repeated horizontal movement is recognised as vibrato
- upper positions create a firmer and brighter reed response
- lower positions darken the sound towards a subtone profile
- releasing the field returns to a centred embouchure

The selected bend range can be limited from half a semitone to four semitones.

### TONGUE strip

The TONGUE strip creates a new attack without interrupting the air stream or changing the fingering.

This permits repeated articulation while the left thumb continues to hold AIR and the fingers continue to hold the key system.

### Main stack

Six large keys represent the main finger stack:

- L1, L2 and L3 for the left hand
- R1, R2 and R3 for the right hand

These remain the largest key targets because they carry the main scale fingerings and may all need to be held simultaneously.

### Auxiliary bank

A separate compact bank contains:

- left-thumb octave key
- palm D, E and F
- G-sharp and the low C-sharp, B and B-flat left-pinky keys
- low C and E-flat right-pinky keys
- side B-flat and side C
- Bis B-flat

The auxiliary bank is deliberately separated from the main stack. Shrinking every physical saxophone key into one realistic outline would make the instrument unplayable on a phone.

## Fingering modes

### Assisted

Assisted mode resolves the nearest supported Phase 1 fingering.

Any inferred keys are shown with a dashed outline. This allows a beginner to move through the instrument even when a touch is missed or a simplified combination is used.

### Exact

Exact mode only accepts a recognised Phase 1 fingering combination. Unsupported combinations do not silently change to another note.

This is the more appropriate mode for validating whether the compact key layout can support genuine multi-finger saxophone technique.

## Phase 1 fingering coverage

The model includes:

- written low B-flat, B, C and C-sharp
- the normal written D4 to C-sharp 5 stack
- octave-key equivalents from D5 to C-sharp 6
- palm D6, E6 and F6
- Bis and side B-flat alternatives
- a side C alternative

The model is not yet a complete professional alternate-fingering database.

## Air and articulation

Air controls output level, brightness, breath noise and how quickly the reed voice speaks.

Phase 1 supports:

- initial tongued attack
- repeated tonguing under one breath
- sustained notes
- key changes under one breath
- crescendos and decrescendos
- continuous reed bends
- embouchure vibrato recognition
- bright and subtone-oriented reed positions

## Current audio engine

The Web Audio prototype uses:

- a reed-oriented harmonic waveform
- a supporting low partial
- filtered breath noise
- light saturation
- reed and body filtering
- continuous pitch transitions
- air-controlled gain and brightness
- short tongue transients
- compression and live output metering

It is a functional single-reed synthesiser for validating interaction. It is not a finished sampled or physically modelled alto saxophone.

## Validation criteria

A valid Phase 1 build should demonstrate:

- reliable simultaneous AIR, REED and key touches
- six main stack fingers without missed or stuck keys
- octave-key behaviour
- low-register and palm-key access
- both Bis and side B-flat paths
- stable Assisted fingering
- strict Exact fingering
- key changes under one breath
- repeated tonguing without releasing the fingering
- continuous crescendos and decrescendos
- reed bends and vibrato
- concert and E-flat written note displays
- balanced audio on phone speakers and headphones
- automated model tests passing

## Known limitations

- The auxiliary bank needs physical testing on several phone sizes.
- The fingering database is intentionally incomplete.
- Alternate, trill and altissimo fingerings are not comprehensively modelled.
- Exact mode does not yet reproduce squeaks, multiphonics or partial venting from unsupported combinations.
- Half-hole effects and key leakage are not modelled.
- Growls, falls, scoops, overblowing, slap tongue and flutter tongue are not included.
- Microphone breath control is not included.
- The sound engine does not yet reproduce a professional acoustic saxophone.
- Maximum reliable simultaneous touches depend on the device.

## Next saxophone phases

1. test the six-main-key and auxiliary-bank ergonomics on real phones
2. add left-handed and mirrored layouts
3. expand alternate and trill fingerings
4. add falls, scoops, growls and overblown effects
5. add soft, normal, accented, double and slap tonguing
6. add subtone-specific attacks and low-register behaviour
7. add optional microphone breath control
8. replace prototype synthesis with professional samples or physical modelling
9. adapt the single-reed engine for clarinet
10. evaluate tenor, soprano and baritone saxophone profiles
