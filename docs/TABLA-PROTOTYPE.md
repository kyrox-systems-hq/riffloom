# Tabla prototype specification

## Purpose

The tabla prototype begins Riffloom's dedicated hand-percussion family. It is not a reskin of the drum-kit pads.

The performance surface separates:

- the bayan, played primarily by the left hand for bass strokes and continuous pitch shaping
- the dayan, played primarily by the right hand for tuned treble strokes
- a dedicated heel-pressure rail that can remain active while other fingers strike the bayan

The first build prioritises common bols, independent hand timing and the bayan pitch gesture that distinguishes tabla from generic paired hand drums.

## Instrument layout

The landscape screen is divided into:

1. a narrow HEEL rail on the far left
2. a large bayan surface
3. a slightly larger dayan surface
4. a recent-bol strip across the bottom

The drum graphics show the practical outer, middle and syahi regions, but the complete panel remains a touch surface.

## Phase 1 stroke map

Tabla terminology and exact hand production vary across gharanas and teachers. Phase 1 therefore uses a clear, documented starting map rather than claiming one universal technique.

### Dayan

The radial zones are:

- **Na:** outer ringing zone
- **Tin:** middle maidan zone
- **Tun:** open inner zone
- **Te:** closed central syahi zone

The dayan tonic can be set from C3 to G3. Resonant stroke profiles follow the selected tonic.

### Bayan

The radial zones are:

- **Ge:** open resonant maidan stroke with low heel pressure
- **Ghe:** open resonant maidan stroke while heel pressure is active
- **Ke:** closed outer stroke

## Heel pressure and bayan pitch

The HEEL rail is held with a separate pointer.

- touch near the bottom for low pressure
- move upwards for more pressure
- increased pressure raises the pitch of a ringing Ge or Ghe
- releasing the rail returns the pressure control to zero
- device pressure can supplement the rail position where available

The maximum pitch bend can be set to four, seven or twelve semitones. This is a digital range setting, not a claim that every physical bayan supports the same bend range.

## Compound bols

The model watches the timing of both drums.

- an open bayan stroke combined with Na is reported as **Dha**
- an open bayan stroke combined with Tin is reported as **Dhin**

The hits still come from two real screen touches. There is no hidden one-button compound performance on the main surface.

## Timing techniques

The event model records independent pointer timing and reports:

- **Flam:** two close hits on the same drum
- **Roll:** a rapid sequence of repeated hits
- **Combined bol:** matching opposite-drum strokes within the compound window

Dragging through radial zones can create additional strokes, but the system keeps a minimum timing threshold to reduce accidental repeats.

## Damping

A resonant stroke begins normally. Keeping the finger stationary on the surface after the strike damps the corresponding drum.

A separate Damp both drums control is included for testing and emergency voice release.

## Current audio engine

The prototype uses Web Audio synthesis with separate profiles for each bol.

### Dayan engine

- tonic-aware resonant partials
- separate harmonic structures for Na, Tin and Tun
- short noise-rich Te articulation
- tuned body filtering
- overlapping short voices for fast patterns

### Bayan engine

- low resonant oscillator partials
- open Ge and Ghe envelopes
- closed Ke noise profile
- continuous pitch updates while the heel rail moves
- low-frequency filtering and compression

The current engine is functional synthesis for validating the screen instrument. It is not a finished sampled or physically modelled tabla library.

## Validation criteria

A valid Phase 1 build should demonstrate:

- independently audible bayan and dayan
- reliable Na, Tin, Tun, Te, Ge, Ghe and Ke zones
- Dha and Dhin recognition from two-hand timing
- continuous bayan pitch control after an open stroke
- separate simultaneous pointers for heel pressure and bayan strikes
- flams and rolls without stuck events
- long-press damping
- selectable dayan tonic
- balanced output through phone speakers and headphones
- structured bol history
- automated model tests passing

## Known limitations

- The zone map is intentionally simplified and requires teacher review across gharanas.
- Finger-specific strokes are inferred from location and timing rather than identified from anatomy.
- The synthesis does not yet reproduce professional tabla timbre in full detail.
- Complex bols and compositions are not yet automatically interpreted.
- Taal, theka, lehra and practice accompaniment are not included in Phase 1.
- Phone pressure reporting varies by device.
- The flat screen cannot reproduce membrane resistance or tactile location.

## Next tabla phases

1. test the zone layout with tabla players and teachers
2. add configurable gharana or teacher stroke maps
3. add more dayan strokes, including Ra or Re variants where appropriate
4. add finger-sequence recognition for common phrases
5. add taal and theka practice modes
6. add lehra accompaniment and tempo progression
7. add tabla-specific recording notation using bols
8. replace prototype synthesis with a professional sample and modelling engine
