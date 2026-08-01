# Riffloom Product Plan

**Status:** Living product plan  
**Version:** 0.1  
**Serial:** RFL-PP-260801-1917-05  
**Last updated:** 1 August 2026

## Purpose

This document records the current product direction for Riffloom. It is intended to evolve as new ideas are developed, tested and prioritised.

Riffloom begins with phone-first musical instruments, but the long-term product is a cross-platform music creation system. It should allow someone to capture a musical idea in whatever form it comes to them, develop it across different instruments, combine it into a complete composition and move it into a professional production workflow.

## 1. Product vision

Create an accessible music platform that allows people to express, develop and perform musical ideas without needing years of traditional instrument training.

The product should preserve the creativity, expression and depth of real instruments while removing unnecessary technical barriers.

Riffloom should eventually combine:

- playable digital instruments
- voice and beatbox transcription
- multitrack recording
- looping and arrangement
- mixing and remixing
- AI-assisted composition and production
- professional export
- cross-device performance and collaboration

The central proposition is not simply that users can play instruments on a screen. It is that they can capture an idea in the easiest available form, turn it into structured music, develop it into a finished composition and retain control throughout the process.

## 2. Product principles

Riffloom should be:

- easy enough for a beginner to use immediately
- deep enough to support serious musical creation
- designed for the capabilities of each device rather than copied from a physical instrument or desktop workstation
- consistent across every digital instrument
- editable rather than fully automatic
- open source at its foundation
- free for playing, experimenting and creating
- compatible with established music production workflows
- built around user expression rather than technical complexity

AI should help users develop their own ideas. It should not silently replace their work or remove their creative control.

## 3. Shared music and project engine

Every instrument and platform should use a common music engine rather than becoming a separate, disconnected product.

The shared engine should eventually manage:

- notes and pitch
- rhythm and timing
- tempo and time signatures
- keys, scales and chords
- velocity and dynamics
- articulation and expression
- instrument-specific performance data
- recording and playback
- arrangement sections
- automation
- editing and version history
- conversion between instruments
- project saving, synchronisation and export

Projects should preserve structured musical information wherever possible rather than storing only a single audio recording. This makes meaningful editing, remixing, instrument conversion and professional export possible.

A project may contain:

- live digital-instrument performances
- recorded microphone audio
- humming or singing converted into notes
- beatbox or tapped rhythm
- MIDI data
- imported audio
- AI-generated or AI-assisted tracks
- multiple versions of the same section

## 4. Playable digital instruments

Riffloom starts with phone-first instruments designed specifically for screens.

The current prototypes include piano and expressive guitar. Future instruments may include bass, drums and other melodic, harmonic or rhythmic instruments.

Each instrument should balance immediate accessibility with genuine expressive control. A beginner should be able to produce something useful quickly, while a more experienced musician should be able to control articulation, dynamics and technique.

The same recorded musical material should be reusable across instruments. A melody created on the piano should be transferable to guitar, bass or another suitable instrument without rebuilding it manually.

## 5. Voice, humming and beatbox to instrument

### 5.1 Feature concept

The user can hum, sing, tap or beatbox into their device. Riffloom detects the musical intention and converts it into an editable performance on a selected instrument.

The purpose is not merely to make a voice recording sound like a guitar or piano. The system should understand the notes, rhythm, expression and structure, then translate them into a performance that makes sense for the chosen instrument.

### 5.2 User modes

#### Exact

Recreate the detected notes, rhythm and expression as closely as possible.

#### Clean up

Correct slightly inaccurate notes, inconsistent timing and unintended pauses while preserving the original idea.

#### Arrange

Translate the idea into a natural, playable performance for the selected instrument. This may add accompaniment or adapt the performance to the physical and musical characteristics of that instrument.

### 5.3 Piano arrangement

The system may:

- select a suitable octave
- identify the likely key and scale
- correct or quantise the melody
- add optional chords or bass notes
- divide parts between the left and right hands
- produce beginner, standard and advanced versions
- preserve or enhance dynamics and sustain

### 5.4 Guitar arrangement

The system may:

- select a tuning
- map each note to a specific string and fret
- reduce unnecessary hand movement
- choose practical chord shapes
- select picking or strumming patterns
- add suitable bends, slides, hammer-ons and pull-offs
- create easier or more advanced playable versions
- display the result on the digital fretboard

Guitar mapping requires an instrument-specific arrangement layer because the same pitch can often be played in several positions. Riffloom should choose positions based on playability, expression and the surrounding musical phrase.

### 5.5 Beatboxing and rhythm

Beatboxing can be used to:

- create drum patterns
- define the rhythm of a hummed melody
- control guitar picking or strumming
- add muted notes and accents
- control note duration
- create separate rhythmic and melodic layers

A useful workflow may allow the user to hum the melody first, beatbox or tap the rhythm separately, then combine both inputs.

### 5.6 Initial prototype

The first useful version should allow the user to:

1. record a short humming performance
2. view the detected notes
3. clean up obvious pitch and timing errors
4. choose piano or guitar
5. hear the converted performance
6. see the notes played on the selected digital instrument
7. edit individual notes manually
8. save the musical idea inside a project

Later versions can add chords, accompaniment, advanced guitar techniques, piano hand separation, separate beatbox input and complete arrangements.

## 6. Multitrack recording and mixing

Riffloom should allow users to build a composition one layer at a time.

A user may, for example:

1. record a piano chord progression
2. add a guitar melody
3. beatbox a drum pattern
4. add a bassline
5. hum another melody and convert it into an instrument
6. mix the layers into a finished track

### 6.1 Timeline and editing

The project timeline should eventually support:

- recording new layers
- moving and trimming clips
- splitting and joining recordings
- duplicating sections
- looping sections
- deleting unwanted material
- aligning tracks
- adjusting timing
- building songs from separate sections
- undo and redo
- version history

Editing should be non-destructive. Users should be able to experiment and return to the original performance.

### 6.2 Recording support

The recording system should include:

- count-in
- metronome
- tempo selection
- loop recording
- overdubbing
- automatic latency correction
- optional timing correction
- optional note correction
- microphone recording
- direct recording from Riffloom instruments
- headphones and external audio equipment

### 6.3 Mixing controls

Each track should eventually provide accessible controls for:

- volume
- stereo positioning
- mute and solo
- fade-in and fade-out
- equalisation
- compression
- reverb
- delay
- distortion and instrument-specific effects
- automation over time

The main interface should keep these controls simple. More advanced controls can appear when deliberately opened.

## 7. Remixing

Users should be able to remix their own work and, where permission allows, music created by other users.

Remixing should go beyond applying an audio effect. It should allow the musical structure and individual tracks to be changed.

Possible remixing actions include:

- replacing one instrument with another
- changing tempo or key
- changing the rhythm
- rearranging song sections
- converting a melody into chords
- converting chords into an arpeggio
- creating a new bassline
- replacing the drum pattern
- shortening or extending a section
- creating acoustic, electronic, orchestral or other arrangements
- preserving the melody while changing the accompaniment
- generating several alternative versions of the same idea

### 7.1 Sharing and permissions

Users should control whether a project is:

- private
- shared for listening only
- shared for remixing
- shared with attribution requirements
- released under an open licence
- available for commercial use

The project format should retain information about the original creator and later remix contributors.

## 8. AI-assisted music creation and production

AI should be integrated as a set of optional creative tools rather than as a single generate button.

The strongest use of AI is taking something the user has already created and helping them expand, arrange, improve or transform it.

### 8.1 Accompaniment generation

The user may play or hum a melody and ask the system to generate:

- chords
- bass
- drums
- piano accompaniment
- guitar accompaniment
- additional melodic layers

### 8.2 Arrangement generation

The system may turn a basic idea into:

- a complete song arrangement
- a piano-led version
- a guitar-led version
- a full-band version
- an orchestral version
- an electronic version
- a minimal acoustic version

### 8.3 Musical variations

The system may create:

- alternative chord progressions
- alternative rhythms
- different introductions and endings
- simpler or more complex versions
- more energetic or more restrained versions
- variations that preserve the identity of the original idea

### 8.4 Section development

Users may ask AI to:

- extend a musical section
- create a chorus from a verse
- create a bridge
- add an introduction
- add an ending
- continue a melody
- develop a short loop into a complete structure

### 8.5 Track-level regeneration

The user should be able to regenerate one part without changing everything else.

Examples include:

- keep the melody but replace the drums
- keep the guitar but change the bassline
- retain every track except the piano
- generate three alternative accompaniments
- replace one weak section without changing the rest

### 8.6 Performance, mixing and mastering assistance

AI may help:

- correct timing and inaccurate notes
- improve dynamics
- add natural expression
- simplify a part for easier performance
- create a more advanced version
- translate a performance naturally between instruments
- balance tracks
- suggest or apply equalisation and compression
- reduce noise
- adjust stereo positioning and loudness
- prepare a project for export

All AI-generated changes should remain editable. Users should be able to accept, reject, regenerate, compare and reverse them.

### 8.7 Model independence

The platform may integrate open-source models, local models or external services where they provide useful capabilities.

Riffloom should not depend permanently on one model or provider. The shared engine should allow generation systems to be connected, replaced and improved over time.

## 9. Open-source and commercial model

### 9.1 Free creation

The core project should remain open source. The official app should also remain free for musical creation.

Users should be able to:

- play the digital instruments
- hum or beatbox ideas
- create and edit performances
- build complete compositions
- record different instrument layers
- mix and remix projects
- save projects
- reopen and continue projects
- hear the completed work inside the app

The product should not charge users merely to experiment, learn or create music.

### 9.2 Paid professional export

Payment should be required when a user wants Riffloom to turn a finished project into a professionally prepared output.

The initial pricing hypothesis is approximately:

- $5 for a standard export
- $10 for an advanced or multi-instrument production export

This is not final pricing. It should be tested against export quality, processing cost and user demand.

### 9.3 Why someone would pay

Users can already record playback using a microphone, screen capture or another device. The paid export must therefore provide significantly more value than an ordinary recording.

A professional export may include:

- high-resolution lossless audio
- separate instrument stems
- MIDI files
- tempo and time-signature maps
- key and chord information
- note velocity and expression data
- guitar tablature
- piano or standard notation
- MusicXML
- loop-ready files
- correctly aligned tracks
- clean starts and endings
- consistent loudness
- production-quality instrument rendering
- structured files prepared for professional music software

The user is not paying to access their music. They are paying for Riffloom to turn it into a polished, structured and professionally usable product.

### 9.4 Export levels

#### Standard export

A clean finished version for users who want to publish, share or continue working elsewhere.

It may include:

- high-quality WAV
- compressed listening format
- MIDI where relevant
- basic project and tempo information

#### Production export

A more complete package for musicians and producers.

It may include:

- lossless master audio
- separated stems
- complete MIDI data
- notation or tablature
- tempo, key and time-signature maps
- multiple arrangement versions
- professionally aligned and labelled files

### 9.5 Commercial advantage of the official service

Because the project is open source, technically capable users may run parts of it themselves.

The official service should earn revenue through:

- reliable production-quality rendering
- high-quality instrument engines
- convenient cloud processing
- advanced arrangement and transcription
- professional file preparation
- cross-device synchronisation
- collaboration and hosted services
- integrations that are costly or difficult to operate independently

The free app must remain useful enough to create a complete piece of music. The paid service must save a serious user substantial production, transcription, arrangement and preparation work.

## 10. Cross-platform product ecosystem

Phone-first describes the starting point, not the product boundary.

Riffloom should eventually be available wherever users may want to play, create, perform, arrange or produce music.

Target platforms may include:

- smartphones
- tablets
- web browsers
- desktop and laptop computers
- touchscreen desktop displays
- touchscreen televisions
- standard televisions
- game consoles, including PlayStation where technically and commercially practical
- professional studio environments
- live-performance systems

The underlying music engine, project format and account system should remain consistent across platforms. Each platform should have an interface designed around its available controls rather than displaying a stretched version of the phone app.

### 10.1 Phone and tablet

Primary capabilities may include:

- multitouch instruments
- microphone input
- motion input
- touch duration and pressure where supported
- headphones and audio interfaces
- external MIDI devices
- portable recording and idea capture

### 10.2 Desktop and web

Desktop versions should provide more space and precision for:

- detailed arrangement
- multitrack editing
- advanced mixing
- project management
- professional export
- external microphones and audio interfaces
- MIDI keyboards and controllers
- multiple displays

Touchscreen desktop systems should also support large expressive instrument surfaces.

### 10.3 Touchscreen television

A touchscreen television may become a large collaborative musical surface for:

- large-format piano and guitar interfaces
- several people playing together
- music education
- group composition
- performance mode
- visual arrangement and mixing

### 10.4 Standard television

A non-touchscreen television interface may support:

- television remotes
- game controllers
- keyboard and mouse
- connected phones as controllers
- voice control where useful
- external MIDI devices

The television may act as the shared display while phones, tablets or controllers provide detailed input.

### 10.5 Game consoles

Console versions may use:

- analogue sticks
- triggers
- buttons
- touchpads
- motion controls
- connected microphones
- external instruments
- multiple local controllers

This could support musical performance, collaborative creation and accessible music experiences. Console availability will depend on each platform's technical, licensing and approval requirements.

### 10.6 Connected-device mode

Different devices should be able to work together.

Examples include:

- a television displaying the full project while a phone controls an instrument
- a tablet acting as a mixer while a desktop runs the arrangement
- several phones functioning as separate instruments in one shared session
- a phone acting as a microphone or motion controller
- a desktop handling production while a touchscreen provides performance controls
- a television showing notation while the user plays from another device

### 10.7 Cross-device continuity

Users should be able to:

- start a project on a phone
- continue it on a desktop
- perform it through a television
- edit it on a tablet
- export it through a professional workstation

Projects, tracks, instruments, settings and version history should remain synchronised across supported devices.

## 11. Professional compatibility

Riffloom should work with the systems already used by musicians and producers rather than forcing them to replace their existing tools.

Compatibility should eventually include:

- audio import and export
- separated stems
- MIDI import and export
- MusicXML
- guitar tablature
- standard notation
- tempo and time-signature maps
- marker and section information
- automation data
- external MIDI controllers
- professional audio interfaces
- digital audio workstations
- studio plug-in formats where appropriate
- control and synchronisation protocols where useful

Riffloom may eventually operate as:

- a standalone application
- a web application
- a companion application
- a digital audio workstation plug-in
- a virtual instrument
- a MIDI controller
- a performance controller
- a collaborative music service

The user should be able to move a Riffloom project into an established production workflow without rebuilding the entire composition manually.

## 12. Architectural direction

The product should be structured around:

1. a shared music and project engine
2. a platform-independent project format
3. instrument-specific performance and arrangement modules
4. platform-specific interfaces
5. a recording, editing and mixing layer
6. a synchronisation and collaboration layer
7. a professional rendering and export service
8. a replaceable AI model and provider layer
9. integration adapters for professional systems and external controllers

This structure should allow new instruments, devices, AI systems and export formats to be added without rebuilding the entire product.

## 13. Indicative development sequence

### Phase 1: Validate the instruments

- complete reliable phone-first piano and guitar prototypes
- validate touch, audio, latency and expressive controls on real devices
- separate instrument models, sound engines and interfaces cleanly

### Phase 2: Create the shared project foundation

- define the common music and project format
- add recording, playback and project saving
- add basic multitrack overdubbing
- add simple timeline editing and mixing

### Phase 3: Add voice and rhythm capture

- humming to editable notes
- basic pitch and timing clean-up
- piano and guitar conversion
- beatbox or tapped rhythm capture
- manual correction tools

### Phase 4: Add professional output

- high-quality rendering
- stems and MIDI export
- tempo, key and notation data
- standard and production export packages
- initial paid-export workflow

### Phase 5: Expand creative intelligence

- instrument-specific arrangement
- accompaniment generation
- remixing
- section development
- track-level AI regeneration
- mixing and mastering assistance

### Phase 6: Expand the platform ecosystem

- full web and desktop versions
- cross-device synchronisation
- television and controller modes
- studio integrations
- game-console exploration
- collaborative creation and performance

The exact sequence will change as prototypes reveal technical constraints and user demand.

## 14. Current product definition

Riffloom is a cross-platform musical creation system that begins with expressive, phone-first instruments.

It allows a person to capture a musical idea through touch, voice, rhythm or performance, develop it across instruments, combine it into a complete composition, remix it with or without AI assistance and export a professionally usable result when it is ready.

The app remains free for creation. Revenue comes from delivering production-quality output and other professional services that provide clear value beyond what a user could capture through an ordinary recording.

## 15. Document maintenance

This plan should remain in the repository and be updated as product decisions are made.

Future documentation may separate into:

- product vision and principles
- feature roadmap
- user journeys
- technical architecture
- instrument specifications
- project-format specification
- export specification
- AI integration policy
- collaboration and licensing rules
- contribution guidelines
- release milestones

Major changes should preserve the reasoning behind earlier decisions rather than replacing them without context.
