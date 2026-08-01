# Drum prototype specification

## Purpose

The drum prototype adds a timing-first instrument to Riffloom and introduces the first reusable loop-recording behaviour. The design treats the landscape screen as one packed performance surface rather than drawing a decorative drum kit.

## Performance layout

Eight adjacent surfaces fill the playing area:

1. crash
2. high tom
3. mid tom
4. ride
5. hi-hat
6. snare
7. floor tom
8. kick

The top rail controls hi-hat openness and the bottom rail contains transport and a 16-step overview. The large kick surface is an intentional phone adaptation so a thumb can trigger kick notes while other fingers play the upper kit.

## Hit zones

The exact touch position changes articulation:

- snare centre: normal head hit
- snare top or bottom rim: rimshot
- snare left or right rim: cross-stick
- cymbal centre: bell
- cymbal middle: bow
- cymbal outside: edge
- tom centre: head
- tom outside: rim
- kick centre: hard beater
- kick outside: softer beater

## Gestures

- tap a surface for one strike
- drag through several surfaces for a fill
- hold a crash or ride after striking it to choke the cymbal
- two alternating hits within a close interval are identified as a flam
- four rapid hits are identified as a roll
- touch pressure is used when the device reports useful values, otherwise drag speed and a calibrated fallback control velocity

## Hi-hat

Closed, half-open and open are independent latched states. The Pedal chick control triggers a foot-closure sound without changing the long-term selected state. This adapts foot control to a small touchscreen while preserving the main hi-hat articulations.

## Loop recorder

The recorder stores musical events rather than microphone audio. Each event contains:

- pad and articulation
- velocity
- hit position
- hi-hat state
- position inside the loop

The loop supports one, two or four bars, adjustable BPM, optional metronome, optional count-in and off, eighth-note or sixteenth-note quantisation.

Record clears the existing loop and captures a new pass. Overdub plays existing events and adds new hits. The loop closes automatically at the selected bar length.

This is the first step towards multitrack Riffloom recording. A later shared recorder will allow drum, piano, guitar and other instrument event tracks to play together.

## Audio engine

The current Web Audio engine synthesises:

- kick pitch sweep and optional beater transient
- snare noise and shell tone
- separate high, mid and floor tom tuning
- closed, half-open and open hi-hat envelopes
- ride and crash partials with bell, bow and edge variants
- cymbal choking
- metronome clicks

It is a functional prototype, not a finished sample library.

## Validation criteria

A valid build should demonstrate:

- all eight surfaces respond visually and audibly
- snare, cymbal, tom and kick zones produce distinct articulations
- several fingers can strike at once
- drag fills trigger each crossed surface once
- cymbal hold produces a choke
- hi-hat states change decay
- recording closes at the selected loop length
- quantisation places events on the expected grid
- playback and overdubbing preserve event order
- the 16-step view represents recorded timing
- model tests pass

## Known limitations

- event scheduling uses browser timers rather than a production audio clock scheduler
- hand identity is inferred only from pointer identifiers
- pressure reporting varies by device
- foot independence is adapted to thumb controls rather than reproduced physically
- rolls and flams are recognised from timing but do not yet use dedicated sample layers
- the recorder is one drum-event track rather than a full multitrack arrangement system
