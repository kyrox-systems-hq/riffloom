# Riffloom Master Product Plan

**Status:** Canonical living product plan  
**Version:** 1.0  
**Serial:** RFL-PP-MASTER-260801-2108-01  
**Last consolidated:** 1 August 2026

## 1. Purpose and document authority

This is the single canonical planning document for Riffloom. It consolidates the complete product vision, product principles, instrument-family roadmap, commercial model, structured music foundation, recording and mixing, remixing, artificial intelligence, connected sessions, notation and learning, accessibility, professional integration, expanded opportunity map and production technology-stack research brief.

The consolidation deliberately preserves the complete substance of the previous planning documents, including detailed examples, constraints, alternatives, validation gates, development sequences and longer-term opportunities. Some ideas appear in more than one section because the same requirement affects several parts of the product. That repetition is preferable to losing an important qualification during consolidation.

Future product planning should be added to this document rather than creating another parallel product-plan file. Instrument prototype specifications remain separate because they document implemented behaviour rather than the overall product plan.

### Consolidated source documents

This master plan supersedes the following files:

- `docs/PRODUCT-PLAN.md`, previous canonical plan
- `docs/INSTRUMENT-ROADMAP.md`
- `docs/PRODUCT-PLAN-AI-GENERATION.md`
- `docs/PRODUCT-PLAN-CONNECTED-SESSIONS.md`
- `docs/PRODUCT-PLAN-LIVING-NOTATION-AND-LEARNING.md`
- `docs/PRODUCT-PLAN-EXPANDED-OPPORTUNITIES.md`
- `docs/PRODUCT-PLAN-TECHNOLOGY-STACK-RESEARCH.md`

The previous source versions remain recoverable through Git history.

## 2. Current product decisions

- Riffloom starts with phone-first, screen-native musical instruments but is intended to become a cross-platform system for musical creation, performance, learning, collaboration, publication and professional production.
- The core project and official creation experience should remain free. Revenue should come primarily from production-ready exports and professional services that provide clear value beyond ordinary playback, screen recording or microphone capture.
- Structured music is foundational. Notes, timing, expression, instrument technique, audio, arrangement, contributors, permissions, AI provenance and version history should remain editable rather than being flattened prematurely into one audio file.
- Artificial intelligence should develop the user’s musical intention rather than replace it by default. Human contributions must be lockable, and AI results must remain editable, comparable and reversible.
- Musical notation should be a live, bidirectional view of the same underlying project used by instruments, playback, recording, teaching, collaboration and export.
- Falling-note or approaching-path guidance is not a defining Riffloom feature and must not shape the architecture. It remains an optional teaching technique to use only where evidence and user testing show that it improves learning. Priority belongs to living notation, instrument-native guidance, accurate transcription, playback, performance feedback, adaptive practice and genuine score literacy.
- Local-network ensemble performance should be prioritised before making broad claims about unrestricted real-time internet jamming. Internet modes must adapt honestly to measured latency.
- No final production technology stack has been selected. It must be chosen through thorough research and measured prototypes focused on multi-touch reliability, touch-to-sound latency, audio stability, rendering, networking, accessibility, professional integration and cross-platform requirements.

## 3. Strategic definition

Riffloom begins with a simple question:

> Instead of shrinking physical instruments onto a small touchscreen, what would musical instruments look like if they were designed for screens from the beginning?

Its larger opportunity is:

> Riffloom is an open, cross-platform musical operating system that lets people create, perform, learn, collaborate and publish structured music through any suitable device, input method or professional workflow.

The phone-native instruments are the entry point. They are not the final boundary of the product.

The central proposition is not simply that users can play instruments on a screen. A person should be able to capture a musical idea in whatever form it comes to them, develop it across instruments, combine it into a complete composition, understand and learn it, collaborate with other people, remix it with or without AI assistance and export a professionally usable result.

## 4. Product vision and principles

Create an accessible music platform that allows people to express, develop and perform musical ideas without needing years of traditional instrument training.

The product should preserve the creativity, expression and depth of real instruments while removing unnecessary technical barriers.

Riffloom should eventually combine:

- playable digital instruments
- voice and beatbox transcription
- multitrack recording
- looping and arrangement
- mixing and remixing
- AI-assisted composition and production
- living notation and adaptive learning
- connected ensemble performance
- professional export
- cross-device collaboration
- developer and creator ecosystems
- interactive music for games and other media

Riffloom should be:

- easy enough for a beginner to use immediately
- deep enough to support serious musical creation
- designed around the capabilities of each device rather than copied from a physical instrument or desktop workstation
- consistent across every digital instrument without making every instrument identical
- editable rather than fully automatic
- open source at its foundation
- free for playing, experimenting and creating
- compatible with established music production workflows
- built around user expression rather than technical complexity
- offline-first for fundamental playing and creation
- honest about technical limitations such as device and network latency
- adaptable to a wide range of bodies, abilities, instruments and musical traditions

AI should help users develop their own ideas. It should not silently replace their work or remove creative control.

## 5. Structured music and the shared project engine

Every instrument and platform should use a common music and project engine rather than becoming a separate, disconnected product.

Most music products eventually flatten work into one audio file. Riffloom should preserve as much musical structure as practical, including:

- notes and pitch
- rhythm and timing
- tempo and time signatures
- harmony
- keys, scales and tuning systems
- velocity and dynamics
- articulation and expression
- instrument assignments
- instrument-specific technique
- touch, motion and controller gestures
- recording and playback
- arrangement sections
- track and section relationships
- automation
- editing operations
- version history and branches
- performer identity
- contributor information
- permissions and rights
- AI provenance
- adaptive rules
- spatial placement
- export mappings
- project saving and synchronisation
- conversion between instruments

A structured project can be edited, taught, remixed, translated between instruments, synchronised across devices, adapted to games or media and exported into professional systems.

A project may contain:

- live digital-instrument performances
- recorded microphone audio
- humming or singing converted into notes
- beatbox or tapped rhythm
- MIDI and expressive event data
- imported audio
- AI-generated or AI-assisted tracks
- notation and tablature
- alternative versions of the same section
- rights and contributor records
- external assets and references

The shared model should distinguish between four related layers.

### 5.1 Musical intention

This describes the composition itself:

- pitch
- rhythm
- meter
- tempo
- harmony
- key and scale
- dynamics
- articulation
- ornaments
- repeats
- lyrics
- formal sections
- instrument assignments

### 5.2 Performance interpretation

This describes how a musician or generated performer realised the music:

- exact onset and release
- velocity and dynamics
- timing deviations
- pedal use
- bends
- slides
- vibrato
- strumming direction
- picking direction
- fingering
- hand assignment
- device gesture
- expressive automation

### 5.3 Audio realisation

This includes:

- recorded audio
- rendered instrument audio
- effects
- mixing
- spatial placement
- mastering

### 5.4 Presentation

This describes how the same music is presented to a person:

- standard staff notation
- tablature
- chord symbols
- lead sheets
- percussion notation
- piano-roll or timeline views
- optional time-based visual guidance
- instrument-surface guidance
- finger numbers
- pitch names
- rhythm counts
- colour and accessibility overlays

These layers must remain connected without being confused. A score is not identical to a performance, and a performance is not identical to an audio recording.

## 6. Universal performance-capture format

Ordinary MIDI may not preserve enough of a Riffloom performance.

Riffloom should consider a richer event format capable of capturing:

- touch identity
- touch position
- pressure
- contact area
- slide path
- bend
- vibrato
- picking direction
- strumming path
- finger choice
- motion
- timing
- device orientation
- pedals
- haptics
- instrument-specific technique

This may allow a performance to be:

- replayed accurately
- transferred between sound engines
- analysed for teaching
- edited without losing expression
- translated to another instrument
- used in an authorised personal model
- exported into supported professional standards

Riffloom should support MIDI 1.0, MIDI 2.0 and MPE where appropriate while retaining richer project data internally when those standards cannot represent the full performance.

The project format should support:

- forward-compatible schema evolution
- stable identifiers
- partial loading
- offline editing
- crash recovery
- version history
- imported assets
- external references
- structured and rendered data
- deterministic playback
- rights and provenance metadata

Potential storage and synchronisation approaches to research include:

- SQLite
- append-only operation logs
- content-addressed assets
- object storage
- CRDTs
- operational transforms
- explicit project branches

No approach should be selected until it has been tested against music-specific editing and collaboration.

## 7. Screen-native playable instruments

Riffloom starts with instruments designed specifically for screens.

Current prototypes include:

- piano
- six-string guitar
- drums and loop recording
- violin
- tabla
- B-flat trumpet
- E-flat alto saxophone

Each instrument should balance immediate accessibility with genuine expressive control. A beginner should be able to produce something useful quickly, while an experienced musician should be able to control articulation, dynamics and technique.

The same recorded musical material should be reusable across instruments. A melody created on piano should be transferable to guitar, bass or another suitable instrument without rebuilding it manually.

Riffloom should build reusable instrument-family engines, then adapt those engines for related instruments. Every family should share:

- structured music events
- multi-touch input handling
- timing and expression data
- recording compatibility
- accessibility modes
- audio-engine interfaces
- validation tests

The interface and sound model must still respect the distinct technique of each instrument.

## 8. Instrument-family roadmap

### 8.1 Keyboard engine

Current prototype:

- piano

Future derivatives may include:

- organ
- electric piano
- synthesiser keyboards

### 8.2 Fretted plucked-string engine

Current prototype:

- six-string guitar

Planned derivatives:

- bass guitar
- baritone guitar
- seven-string guitar
- eight-string guitar
- twelve-string guitar

### 8.3 Drum-kit engine

Current prototype:

- eight-surface drum kit
- loop recording and overdubbing

### 8.4 Bowed-string engine

Current Phase 1 prototype:

- violin

The foundation covers:

- continuous fingerboard pitch
- assisted and free intonation
- slides
- vibrato
- bow direction
- bow speed
- pressure fallback controls
- double stops
- string crossings
- tremolo
- pizzicato

Planned derivatives:

- viola
- cello
- double bass
- sarangi

Sarangi requires its own sympathetic resonance, fingering and ornamentation layer rather than a simple violin profile.

### 8.5 Hand-percussion engine

Current Phase 1 prototype:

- tabla

The foundation covers:

- separate dayan and bayan surfaces
- common Phase 1 bols
- compound Dha and Dhin timing
- heel-controlled bayan pitch
- damping
- flams
- rolls
- selectable dayan tonic

Later tabla work should add:

- teacher-verified stroke maps
- additional bols
- taal and theka practice
- lehra accompaniment
- professional tabla audio

### 8.6 Brass engine

Current Phase 1 prototype:

- B-flat trumpet

The trumpet foundation establishes:

- a separate AIR rail for breath pressure, dynamics and note continuity
- a two-dimensional LIP field for harmonic register, lip slurs and continuous pitch
- a dedicated TONGUE strip for repeated articulation under one breath
- three independent valve strips
- Assisted and Free lip modes
- Hold and Latch accessibility modes
- concert and B-flat written note displays
- structured valve, air, pitch and articulation state

The five-finger landscape layout is the primary experiment. The left thumb controls air, another left finger controls embouchure, and the right hand controls the three valves.

Planned derivatives:

- cornet
- French horn
- trombone
- tuba

Trombone needs a continuous slide layer. French horn needs hand-in-bell and different harmonic behaviour. Tuba needs lower-register air and tubing behaviour.

### 8.7 Single-reed engine

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

### 8.8 Plucked regional-string family

Rabab remains planned and has been deferred rather than removed.

The first rabab implementation should clearly state which tradition and tuning it represents. It should reuse suitable guitar foundations while adding:

- plectrum-led attacks
- melody and drone strings
- sympathetic resonance where applicable
- rapid repeated picking
- slides
- ornaments
- a distinct body response

### 8.9 Double-reed and air-jet families

Planned double-reed instruments:

- oboe
- bassoon
- shehnai

Planned air-jet instrument:

- flute

Shared wind controls should include:

- continuous breath
- tonguing
- fingering systems
- dynamics
- overblowing
- vibrato
- pitch shading
- key noise
- breath noise where appropriate

Shehnai must receive its own ornamentation, tuning and timbral model rather than inheriting a generic oboe profile.

### 8.10 Current instrument build order

1. Validate violin Phase 1.
2. Validate tabla Phase 1.
3. Validate trumpet Phase 1.
4. Validate alto saxophone Phase 1 and compare it with the trumpet screen model.
5. Build rabab.
6. Build viola, cello, double bass and sarangi adaptations.
7. Build bass guitar.
8. Build cornet, French horn, trombone and tuba.
9. Build clarinet.
10. Build shehnai, oboe and bassoon.
11. Build flute.
12. Add specialist variants and extended techniques across all families.

The sequence may change when testing reveals a shared technical dependency or a stronger product reason.

### 8.11 Validation gate for every instrument

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

## 9. Voice, humming and beatbox to instrument

### 9.1 Feature concept

The user can hum, sing, tap or beatbox into a device. Riffloom detects the musical intention and converts it into an editable performance on a selected instrument.

The purpose is not merely to make a voice recording sound like a guitar or piano. The system should understand the notes, rhythm, expression and structure, then translate them into a performance that makes sense for the chosen instrument.

### 9.2 User modes

#### Exact

Recreate the detected notes, rhythm and expression as closely as possible.

#### Clean up

Correct slightly inaccurate notes, inconsistent timing and unintended pauses while preserving the original idea.

#### Arrange

Translate the idea into a natural, playable performance for the selected instrument. This may add accompaniment or adapt the performance to the physical and musical characteristics of that instrument.

### 9.3 Piano arrangement

The system may:

- select a suitable octave
- identify the likely key and scale
- correct or quantise the melody
- add optional chords or bass notes
- divide parts between the left and right hands
- produce beginner, standard and advanced versions
- preserve or enhance dynamics and sustain

### 9.4 Guitar arrangement

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

### 9.5 Beatboxing and rhythm

Beatboxing can be used to:

- create drum patterns
- define the rhythm of a hummed melody
- control guitar picking or strumming
- add muted notes and accents
- control note duration
- create separate rhythmic and melodic layers

A useful workflow may allow the user to hum the melody first, beatbox or tap the rhythm separately, then combine both inputs.

### 9.6 Initial prototype

The first useful version should allow the user to:

1. Record a short humming performance.
2. View the detected notes.
3. Clean up obvious pitch and timing errors.
4. Choose piano or guitar.
5. Hear the converted performance.
6. See the notes played on the selected digital instrument.
7. Edit individual notes manually.
8. Save the musical idea inside a project.

Later versions can add chords, accompaniment, advanced guitar techniques, piano hand separation, separate beatbox input and complete arrangements.

## 10. Multitrack recording and mixing

Riffloom should allow users to build a composition one layer at a time.

A user may, for example:

1. Record a piano chord progression.
2. Add a guitar melody.
3. Beatbox a drum pattern.
4. Add a bassline.
5. Hum another melody and convert it into an instrument.
6. Mix the layers into a finished track.

### 10.1 Timeline and editing

The project timeline should support:

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

### 10.2 Recording support

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

### 10.3 Mixing controls

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

## 11. Remixing

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

### 11.1 Sharing and permissions

Users should control whether a project is:

- private
- shared for listening only
- shared for remixing
- shared with attribution requirements
- released under an open licence
- available for commercial use

The project format should retain information about the original creator and later remix contributors.

## 12. AI music generation and production

### 12.1 Strategic position

The opportunity is much larger than adding a prompt box that creates a complete song. Riffloom should use generative systems throughout the creative process while preserving the user’s musical identity, recordings, decisions and control.

> The user creates the musical identity. AI helps develop, perform, arrange, remix and produce it.

Riffloom should be a human-first generative music system rather than another service where the user types a description and receives a largely finished, inaccessible audio file.

AI should usually begin with something the user has contributed, such as:

- a played piano or guitar phrase
- a hummed melody
- a sung vocal line
- beatboxing or tapping
- a chord progression
- a drum pattern
- a recorded physical instrument
- lyrics
- an imported project or user-owned recording
- an earlier Riffloom composition

Prompt-only generation may still be available, but it should not define the product. Riffloom’s advantage should come from combining generative models with structured musical information, playable digital instruments, multitrack projects and precise user control.

### 12.2 Generate around the user’s work

A user should be able to record a short performance and ask Riffloom to build around it.

For example, the user may record eight seconds of guitar and ask the system to generate:

- drums that follow its rhythm
- a bassline that supports its harmony
- piano or keyboard accompaniment
- a second guitar part
- background textures
- a contrasting melodic answer
- several alternative full arrangements

The original recording should remain locked unless the user explicitly allows it to change.

This workflow should work equally well when the starting material is humming, piano, beatboxing, vocals or an imported recording.

### 12.3 AI actions at every level

AI should not exist only as one large Generate Song button. It should be available as a set of actions on a project, section, track, clip, phrase or selected notes.

Core actions may include:

- **Continue:** Create what naturally follows the selected material.
- **Accompany:** Add one or more supporting instruments.
- **Replace:** Recreate only the selected part.
- **Transform:** Change the musical treatment while preserving selected elements.
- **Simplify:** Make a part easier to play or understand.
- **Develop:** Turn a basic idea into a more substantial phrase or section.
- **Intensify:** Increase energy without losing the original identity.
- **Reduce:** Create a quieter, smaller or more minimal version.
- **Reharmonise:** Keep the melody while changing its harmonic support.
- **Humanise:** Add natural timing, dynamics and articulation.
- **Tighten:** Correct timing and performance inconsistencies.
- **Orchestrate:** Expand a small performance into a multi-instrument arrangement.

Every action should create an editable result and preserve the previous version.

### 12.4 Locks and creative boundaries

Before generation, the user should be able to specify what the AI may and may not change.

Possible locks include:

- melody
- rhythm
- harmony
- chord progression
- lyrics
- vocal performance
- instrument choice
- sound or tone
- tempo
- key
- song structure
- selected tracks
- selected bars or sections
- the user’s original recording

Examples include:

- keep the melody and replace everything underneath it
- keep the drums and rewrite the bass
- preserve the first four bars
- change only the chorus
- keep every human recording unchanged
- generate three alternatives for one guitar fill

These controls are central to Riffloom’s differentiation. The user should decide the scope of AI intervention instead of repeatedly regenerating an entire song.

### 12.5 AI session musicians

Generated instruments should behave like editable session musicians rather than permanent audio backgrounds.

The user may request:

- a restrained bassline
- drums without cymbals
- a piano part that stays out of the vocal range
- a guitar that answers the melody instead of copying it
- an instrument that plays only during gaps
- a more active performance in the chorus
- three different solos
- a simpler version that a beginner could perform

Each session musician should produce a separate track where possible. The user should be able to alter notes, regenerate a section, replace the sound or record a human performance over it.

### 12.6 Live generative accompaniment

Riffloom should eventually support AI that responds while the user is playing.

Possible experiences include:

- a drummer following a live piano performance
- a bass player adapting when the user changes chords
- an AI instrument answering each musical phrase
- accompaniment becoming denser or quieter through touch controls
- several people playing Riffloom instruments while AI fills missing roles
- an endless responsive backing track for improvisation or practice
- a television showing the shared performance while phones act as instruments
- game controllers changing energy, arrangement or instrumentation during playback

Live generation should prioritise responsiveness, musical stability and clear user control over maximum complexity.

### 12.7 Generated audio to editable music

One of Riffloom’s most important long-term capabilities should be converting generated or imported audio into a structured, editable project.

The intended flow is:

**Generated audio → separated parts → detected notes, chords and rhythm → instrument-specific performance data → editable Riffloom project**

The user could then:

- open the piano part on the Riffloom piano
- view guitar notes on the fretboard
- change individual chords
- remove or move a drum hit
- simplify a difficult passage
- replace an AI instrument with a human recording
- learn how to perform the generated music
- export MIDI, notation or tablature

A conventional generator may provide attractive audio. Riffloom should turn that material into music the user can understand, play, alter and own as a working project.

### 12.8 Intelligent remixing

AI remixing should preserve whichever parts the user considers important while transforming the rest.

Possible remix operations include:

- preserve the melody and replace the arrangement
- preserve the rhythm and write a new melody
- turn a piano composition into a guitar-led version
- turn an acoustic recording into an electronic arrangement
- create a stripped-back live version
- create an extended version
- generate several alternative choruses
- combine compatible elements from two user-owned projects
- create instrumental, vocal and karaoke versions
- adapt a full composition into short versions for video or social media
- rebuild an unfinished project using the user’s more recent musical direction

Remixing permissions must follow the project’s sharing, attribution and commercial-use settings.

### 12.9 Personal musical identity

Riffloom may eventually learn from music the user has created or has permission to use.

A private musical profile could learn preferences such as:

- common chord movements
- rhythmic habits
- preferred instrumentation
- guitar or piano tone
- arrangement density
- melodic complexity
- verse and chorus development
- vocal range and phrasing
- preferred levels of repetition and variation

The user could request:

> Arrange this new melody in a way that sounds consistent with my own work.

Possible applications include:

- maintaining a consistent album sound
- creating a shared model for a band
- maintaining a film or game’s sonic identity
- developing a private producer or arranger profile
- preserving a company’s audio branding

Any personal model must use material the user owns or has explicit permission to use. It must remain private unless the user deliberately shares it.

### 12.10 Sound and instrument generation

Generative AI can create more than complete songs.

Riffloom may use it to create:

- drum sounds
- percussion kits
- guitar textures
- ambient backgrounds
- risers and transitions
- impacts and sound effects
- instrument riffs
- loops
- custom metronome sounds
- new virtual instrument patches
- game and video sound effects
- variations of a user-recorded sound

Short sound generation is particularly suitable for local or on-device models because it can provide immediate experimentation without requiring every request to use cloud infrastructure.

### 12.11 Voice and singing

After the user creates an instrumental composition, Riffloom may help develop vocals.

Potential features include:

- generating a temporary guide vocal
- fitting the user’s lyrics to a melody
- suggesting alternative vocal melodies
- correcting pitch and timing
- generating backing harmonies
- turning humming into a vocal line
- translating lyrics and adapting their phrasing
- generating a performance using the user’s own verified voice
- removing noise from a human recording
- replacing a temporary generated vocal with a final human performance

Voice replication requires explicit consent, strong verification and clear labelling. Riffloom should not recreate another person’s voice without permission.

### 12.12 AI as a music teacher

Because Riffloom combines generated music with playable instrument interfaces, it can explain and teach the music it creates.

It may tell the user:

- which chords were used
- why a note creates tension
- how to play the part on guitar
- how to divide the part between two piano hands
- where a melody moves outside the chosen scale
- why two tracks are clashing
- how to simplify a passage
- how to practise a difficult phrase
- how the arrangement changes between sections

The user should be able to move directly from an AI-generated part to an interactive lesson or guided performance mode.

### 12.13 AI-assisted production and export

AI should strengthen the paid professional export rather than stopping at composition.

Before export, Riffloom may prepare:

- final track balance
- noise reduction
- timing alignment
- corrected starts and endings
- fades
- stem separation and cleaning
- tempo and time-signature maps
- key and chord information
- MIDI
- notation and tablature
- loudness-normalised masters
- instrumental and vocal versions
- alternative masters for streaming, video, games or live use
- a clearly labelled package for a producer or musician

The user should not be paying merely to download audio. The paid export should turn a creative project into a clean, structured and professionally usable production package.

### 12.14 AI interaction model

A consistent AI workflow should use the following steps:

1. **Select the source:** Choose the project, track, clip, section or notes.
2. **Select the action:** Continue, accompany, replace, transform or another operation.
3. **Set the scope:** Define which instruments, bars or tracks may change.
4. **Apply locks:** Protect the melody, rhythm, lyrics, recordings or other essential material.
5. **Describe the intention:** Use direct controls, musical parameters, natural language or a combination.
6. **Generate alternatives:** Produce several meaningfully different options where practical.
7. **Audition in context:** Hear each option with the rest of the project.
8. **Accept non-destructively:** Add the chosen result without deleting the previous version.
9. **Edit manually:** Change notes, timing, sound, structure or performance details.
10. **Regenerate only where needed:** Avoid forcing the user to repeat the whole process.

The interface should make simple actions immediate while keeping detailed controls available when required.

### 12.15 Structured generation and audio generation

Riffloom should prefer structured musical output whenever possible.

Structured output may include:

- notes
- MIDI
- chords
- tempo
- rhythm
- articulation
- dynamics
- instrument assignments
- arrangement sections
- lyrics and syllable timing

Structured generation is easier to edit, remix, teach and transfer between instruments.

Audio generation remains valuable for realistic vocals, complex sound design, unusual textures and final rendering. When a model produces only audio, Riffloom should attempt to recover useful structure through separation and transcription.

The project should preserve both the generated audio and the recovered musical data, including uncertainty where the transcription is not exact.

### 12.16 Model and provider architecture

Riffloom should not depend permanently on one AI company or model.

The system should use a replaceable provider layer that routes each task to the most suitable engine.

Possible categories include:

- on-device models for immediate drafts and short sounds
- open-weight models for self-hosting and community development
- cloud models for demanding generation and professional rendering
- real-time models for responsive accompaniment
- transcription and separation models for recovering structured music
- specialist models for voice, drums, mixing, mastering or notation

The provider layer should consider:

- output quality
- latency
- generation cost
- commercial rights
- privacy
- local hardware
- structured output support
- availability by country and platform
- provider reliability
- the user’s export requirements

Projects should remain portable even when the underlying provider changes.

### 12.17 Free creation and paid generation quality

The free product model should remain intact.

Possible free capabilities include:

- on-device or self-hosted draft generation
- lower-cost cloud previews
- short generations
- a limited number of simultaneous alternatives
- full editing after generation
- saving and continuing projects
- manual replacement of any generated part

Paid professional export may use:

- higher-quality generation models
- several final rendering passes
- advanced stem cleaning
- structured conversion
- professional instrument rendering
- mixing and mastering
- notation, MIDI and project preparation
- multiple output versions

Riffloom should avoid a subscription that blocks ordinary creation. The commercial value should come from the quality and convenience of turning a finished project into professional output.

### 12.18 Rights, consent and provenance

The system must clearly track the origin and permissions of musical material.

Riffloom should record, where practical:

- which material was created by the user
- which material was imported
- which parts were AI-generated
- which model or process created them
- which user instructions and locked elements shaped the result
- whether a project permits remixing or commercial use
- whether a voice or personal model was used with verified consent

The product should avoid features designed primarily to imitate a living artist, musician or singer without permission.

Users should be warned when imported material may not be suitable for commercial use. Professional export should include useful provenance and rights information where available.

### 12.19 Initial AI priorities

1. Generate accompaniment around a hummed or played loop.
2. Regenerate or transform one selected track or section without changing the rest.
3. Continue a musical idea and provide several editable variations.
4. Convert generated audio into an editable Riffloom project.
5. Prepare a final professional arrangement and export package.

These priorities use Riffloom’s strongest assets: user performance, structured projects, playable instruments and professional export.

### 12.20 AI opportunity backlog

#### Capture and repair

1. Detect notes from humming.
2. Detect rhythm from beatboxing.
3. Separate melody and rhythm from one vocal recording.
4. Correct slightly inaccurate pitch.
5. Tighten timing without removing natural expression.
6. Remove noise from microphone recordings.
7. Separate an imported recording into useful stems.
8. Recover tempo, key, chords and song sections from audio.

#### Composition and development

9. Continue a melody.
10. Continue a chord progression.
11. Generate chords beneath a melody.
12. Generate a melody above chords.
13. Create a bassline.
14. Create a drum pattern.
15. Turn a loop into a verse.
16. Create a chorus from a verse.
17. Create a bridge.
18. Create an introduction or ending.

#### Arrangement and instrumentation

19. Build a band around one user performance.
20. Convert a piano-led idea into a guitar-led arrangement.
21. Convert a guitar-led idea into a piano arrangement.
22. Create an acoustic version.
23. Create an electronic version.
24. Create an orchestral version.
25. Create a minimal version.
26. Increase or reduce arrangement density.
27. Add a counter-melody.
28. Orchestrate a complete composition from structured tracks.

#### Performance and playability

29. Humanise rigid MIDI.
30. Add dynamics and articulation.
31. Simplify a guitar part.
32. Simplify a piano part.
33. Create an advanced version of a basic part.
34. Map generated guitar notes to practical strings and frets.
35. Divide a piano arrangement between two hands.
36. Generate a responsive live accompaniment.

#### Remixing and adaptation

37. Reharmonise while preserving the melody.
38. Replace only one instrument.
39. Replace only one section.
40. Generate alternative choruses.
41. Create a stripped-back live version.
42. Create an extended version.
43. Create short versions for video or social media.
44. Combine permitted elements from two user-owned projects.

#### Voice, production and export

45. Generate a guide vocal.
46. Generate backing harmonies.
47. Fit lyrics to an existing melody.
48. Balance and clean the final mix.
49. Generate notation, tablature and MIDI from the project.
50. Prepare a labelled professional export package with masters and stems.

### 12.21 AI boundaries

Riffloom should not become:

- a generator that hides the musical structure from the user
- a service where every edit requires regenerating a complete song
- a product that removes the user’s original performance by default
- a closed system that prevents export to professional tools
- a platform dependent on one AI provider
- a tool primarily designed to imitate artists without consent
- a subscription wall around ordinary musical creation

The desired outcome is a system where people can contribute as much or as little technical performance as they are capable of while retaining authorship, understanding and control over the resulting music.

## 13. Connected ensemble sessions

### 13.1 Purpose

Riffloom should allow several people, using separate installed copies of the app on separate devices, to join one shared musical session and play different instruments together.

A session may operate:

- over the same local network
- through a direct nearby connection where supported
- over the internet
- through a combination of local and remote devices

Each participant may use a phone, tablet, computer, television, console or other supported device. Every device should be able to contribute a different instrument, control surface or production role while remaining part of one project.

Joining a musical session should feel closer to entering a room and picking up an instrument than configuring a technical network system.

### 13.2 Core experience

A user creates a Riffloom session and invites other people.

For example:

1. One person opens the session on a desktop computer.
2. A second person joins from a phone and plays guitar.
3. A third person joins from a tablet and plays piano.
4. A fourth person joins from another phone and controls drums.
5. A television displays the shared arrangement, metronome and active performers.
6. Every performance is recorded into its own track inside the same project.
7. The group can listen back, edit, remix and continue the project later.

The system should support both live performance and collaborative production.

### 13.3 Local ensemble session

People in the same room or building join through the same local network.

This should be the best mode for highly responsive live performance because devices are physically close and network delay can be kept low.

The app should automatically discover available local sessions where the host permits discovery.

Joining methods may include:

- tapping a discovered room
- scanning a QR code
- entering a short session code
- accepting an invitation from another Riffloom user
- using a nearby-device connection where supported

A local session should continue working even when the internet connection is unavailable, provided the required instruments and sounds are already installed.

### 13.4 Internet ensemble session

People in different locations join through the internet.

Internet sessions should support several operating modes because network latency varies by distance, routing and connection quality.

#### Low-latency live mode

Designed for participants with sufficiently fast and stable connections, ideally within the same geographic region.

The system should continuously measure delay and show whether a connection is suitable for free live playing.

#### Tempo-synchronised mode

Designed for connections where completely free live performance would be unreliable.

Musical events may be scheduled slightly ahead against a shared tempo, beat or bar. This can keep the final performance aligned even when each participant experiences some network delay.

This mode is particularly suitable for:

- drum patterns
- loop-based music
- chord changes
- sequenced accompaniment
- repeated phrases
- structured group performance

#### Collaborative overdub mode

Designed for connections where live synchronisation is not practical.

One participant records a part, and another records against it from a different location. Riffloom automatically aligns the new take with the shared project.

This mode should still feel collaborative, with presence indicators, comments, live listening and rapid handover between performers.

### 13.5 Hybrid session

Several people may be together on a local network while one or more additional participants join remotely.

The local group should remain tightly synchronised. Remote participants may use low-latency, tempo-synchronised or overdub mode depending on their connection.

### 13.6 Device roles

A device should not be limited to one role.

Possible roles include:

- instrument
- microphone or vocal input
- drum pad
- loop launcher
- mixer
- transport control
- metronome and conductor
- shared display
- notation display
- recording hub
- effects controller
- AI accompaniment controller
- audience or listening device

Examples include:

- four phones acting as four separate instruments
- a tablet acting as the shared mixer
- a desktop storing and recording the full project
- a television showing the arrangement and active tracks
- a game controller changing effects or arrangement intensity
- one phone serving as a microphone while another controls vocal effects

A participant should be able to switch roles without leaving the session.

### 13.7 Host and session control

Every session should have an owner or host, although control may be delegated.

The host may control:

- who can join
- whether the session is discoverable locally
- which instruments are available
- who may record
- who may change tempo or key
- who may alter the arrangement
- who may use AI generation
- who may control the mix
- whether participants may invite others
- whether the session can be saved or exported

The host should be able to assign roles such as:

- co-host
- performer
- producer
- conductor
- editor
- listener

Permissions should be simple by default, with detailed controls available for professional or public sessions.

### 13.8 Joining and identity

Joining should be fast.

A participant should be able to:

1. Open an invitation or scan a QR code.
2. Join with an account or temporary guest identity.
3. Choose an available instrument or role.
4. Complete a brief connection and audio check.
5. Hear the shared count-in.
6. Begin playing.

The session should show:

- participant name
- assigned instrument
- connection quality
- microphone or instrument status
- whether the participant is recording
- whether their track is muted or soloed
- whether they are currently active

Guest participation may be allowed without forcing account creation, although saving ownership and long-term project access may require an account.

### 13.9 Shared musical state

Every device should follow a shared musical state where applicable.

This may include:

- tempo
- time signature
- key and scale
- bar and beat position
- loop boundaries
- count-in
- arrangement section
- play, pause and record state
- markers
- chord changes
- automation state

The session should use a shared musical clock so that all devices agree on when each note, beat and section occurs.

The app should distinguish between:

- performance events that must be transmitted immediately
- events that can be scheduled ahead
- audio that must be streamed
- sounds that can be rendered locally from note and expression data

### 13.10 Event transmission and local rendering

When participants use Riffloom’s own digital instruments, the most efficient approach may often be to transmit musical events rather than continuously streaming each device’s audio.

For example, a phone playing the Riffloom piano may send:

- note
- velocity
- timing
- sustain state
- articulation
- expression
- instrument configuration

Other devices or the session hub can reproduce the performance using the same sound engine.

Benefits may include:

- lower bandwidth
- better synchronisation
- cleaner recording
- easier editing
- access to notes and performance data
- the ability to change sounds later
- improved resilience when the network briefly fluctuates

Audio streaming will still be required for:

- vocals
- acoustic instruments
- external hardware instruments
- imported sound
- effects that cannot be recreated elsewhere

The system should support event-based and audio-based tracks inside the same session.

### 13.11 Audio monitoring

Participants need clear control over what they hear.

Each device should be able to create a personal monitor mix without changing the main session mix.

A performer may choose to hear:

- the full group
- only selected instruments
- themselves more loudly
- a metronome
- a count-in
- a guide track
- AI accompaniment
- no local playback of their own instrument where direct monitoring is available

The app should help prevent feedback when several devices are in the same room.

Possible protections include:

- headphone recommendations
- automatic microphone suppression
- identifying nearby devices playing the same mix
- host-controlled speaker mode
- one designated room speaker or output device
- echo cancellation where appropriate

### 13.12 Recording model

Every participant’s performance should be recorded separately where possible.

A connected session may preserve:

- each instrument as an independent track
- original timing and expressive data
- local high-quality audio
- the live mixed preview
- connection delay measurements
- corrections used during synchronisation
- multiple takes
- session markers and comments

For the strongest final quality, each device may record its own high-quality local source while sending a lower-latency stream or event feed during the session.

After the performance, Riffloom can upload and align the local recordings to create a cleaner master project.

This allows the group to experience live collaboration without limiting final production to the quality of the live network stream.

### 13.13 Latency and honest product behaviour

The product should not pretend that every internet connection can support perfectly simultaneous free-form performance.

Riffloom should measure:

- round-trip delay
- jitter
- packet loss
- clock drift
- available bandwidth
- audio-device latency

It should then recommend the most suitable session mode.

Possible indicators include:

- excellent for live performance
- suitable for tempo-synchronised performance
- suitable for overdubbing only
- connection unstable

The app should automatically compensate where possible rather than requiring users to understand networking terminology.

Where strict real-time performance is not possible, the product should preserve the feeling of collaboration through shared playback, scheduled musical events, rapid overdubbing and aligned local recordings.

### 13.14 Shared arrangement and production

Connected sessions should not end when live playing stops.

Participants should be able to work together on:

- arranging sections
- moving clips
- choosing takes
- looping
- mixing
- effects
- instrument replacement
- AI accompaniment
- remixing
- comments and suggestions
- version comparison
- export preparation

The system should show who made each change and allow the project owner to approve, reject or reverse edits.

Concurrent edits should be handled without silently overwriting another participant’s work.

### 13.15 AI inside connected sessions

AI can support group sessions without replacing performers.

Possible uses include:

- filling an unoccupied instrument role
- following the group’s tempo and harmony
- generating a temporary bass or drum part
- extending a loop while participants improvise
- creating alternative arrangements from the recorded session
- correcting timing after the session
- separating or cleaning microphone recordings
- producing a guide track for a participant joining remotely
- creating a shared count-in or conductor track
- preparing the final mix and export package

Participants should see which parts are human and which are AI-generated.

The host should control whether AI may be used and which tracks it may change.

### 13.16 Television and shared-room mode

A television or large display can act as the shared visual centre of an ensemble session.

It may show:

- the current section
- tempo and count-in
- active performers
- track levels
- chord changes
- notation or tablature
- lyrics
- loop position
- recording status
- connection warnings
- audience visuals

The television does not need to be the recording host. It may function only as a shared display while phones, tablets and computers handle performance and production.

### 13.17 Uses

#### Friends and casual creation

Several people join from their own phones and create music together without owning physical instruments.

#### Bands and remote collaborators

Band members rehearse, write, record and exchange takes from different locations.

#### Music education

A teacher hosts a session, assigns instruments, hears each student separately and controls the shared tempo or exercise.

#### Live performance

Performers use several devices as instruments and controllers while one system records and mixes the show.

#### Studios and producers

A producer controls the arrangement and mix while musicians contribute from separate devices or locations.

#### Games and social experiences

Players use phones or game controllers to perform different musical roles together through a television or console.

### 13.18 Privacy and security

Connected sessions must protect private projects and live audio.

The system should support:

- private invitation-only rooms
- expiring session codes
- host approval before joining
- encrypted internet transport
- local-only sessions
- guest removal and blocking
- permission-controlled recording
- clear microphone indicators
- control over whether local recordings are uploaded
- project ownership and contributor records

A participant should be informed when a session is being recorded.

### 13.19 Project ownership and contributor rights

The session owner should control the project, but Riffloom should preserve contributor information.

The project may record:

- who performed each track
- who wrote or edited each section
- which parts were generated by AI
- which permissions apply to the session
- whether contributors allow remixing or commercial use
- how attribution should appear in an export

Professional export may include a contributor and provenance summary.

Riffloom should not attempt to decide legal ownership automatically. It should give participants clear tools to record their agreements and permissions.

### 13.20 Failure recovery

A device may lose connection, run out of battery or close unexpectedly.

The session should:

- preserve locally recorded material
- reconnect the participant automatically where possible
- resynchronise the musical clock
- show the host that a performer disconnected
- resume uploads from the last confirmed point
- avoid corrupting the shared project
- allow a replacement device to take over an instrument role

A local session should not collapse merely because the internet connection disappears.

### 13.21 Initial connected-session scope

The first useful connected-session version should focus on local networks.

It should allow:

1. One device to create a session.
2. Other devices on the same network to discover or join it.
3. Each participant to choose piano, guitar or another available role.
4. All devices to follow one shared tempo and transport.
5. Note and performance events to be exchanged in real time.
6. Each instrument to appear as a separate track.
7. The session to record a shared performance.
8. The project to be saved and replayed.

The initial version does not need advanced remote audio streaming, public rooms or professional permission systems.

### 13.22 Connected-session development sequence

#### Phase 1: Local event synchronisation

- local session discovery
- QR code and short-code joining
- shared clock, tempo and transport
- event transmission between Riffloom instruments
- separate participant tracks
- basic connection status

#### Phase 2: Local recording and monitoring

- central and distributed recording
- personal monitor mixes
- local high-quality source capture
- automatic alignment
- room-speaker and headphone modes

#### Phase 3: Internet project collaboration

- invited online sessions
- shared project state
- live presence
- comments
- collaborative overdubbing
- reliable upload and conflict handling

#### Phase 4: Internet performance modes

- connection measurement
- regional low-latency mode
- tempo-synchronised mode
- hybrid local and remote sessions
- adaptive latency compensation

#### Phase 5: Expanded devices and professional workflows

- television shared-room mode
- console controllers
- external MIDI and audio hardware
- studio routing
- advanced permissions
- professional contributor and export records

### 13.23 Connected-session architecture

The feature should be built around:

1. session discovery and invitations
2. participant identity and permissions
3. a shared musical clock
4. low-latency event transport
5. audio transport where required
6. per-device local rendering
7. distributed high-quality recording
8. project-state synchronisation
9. reconnection and conflict recovery
10. platform-specific device roles

The architecture should allow local sessions to operate without depending on the cloud while still allowing internet sessions, account synchronisation and professional export when available.

The purpose is not merely to let several devices play sound at once. It is to make several people feel that they are inside the same musical project, with each person contributing a real instrument or production role, regardless of whether they are sitting together or connecting remotely.

## 14. Living notation and adaptive learning

### 14.1 Product decision

Riffloom should integrate musical notation as a live, editable and bidirectional part of the product.

Traditional sheet music remains essential because it gives musicians a compact shared language for pitch, rhythm, harmony, articulation, dynamics and ensemble coordination. Riffloom should not reproduce a static paper score on a screen and stop there.

The score should be one interactive view of the same structured musical project that also powers:

- the digital instrument
- the multitrack timeline
- playback
- recording
- optional time-based learning guidance where useful
- instrument-specific fingering and technique
- AI arrangement and teaching
- collaborative ensemble sessions
- professional export

A change made in any one of these views should update the others immediately wherever the underlying musical information is shared.

> A Riffloom score is not a picture of the music. It is a live interface into the music.

Falling-note or approaching-path systems are one possible teaching aid, not the target experience. Riffloom should prioritise the deeper connection between score, instrument, performance and feedback. Time-based visual paths should be built only if they prove useful for a specific instrument or learner.

### 14.2 Full notation cycle

Riffloom should support the full notation cycle:

1. Create notation from a blank project.
2. Generate notation from music performed or created in Riffloom.
3. Import notation from standard digital formats.
4. Scan printed or handwritten material where recognition is practical.
5. Transcribe suitable audio into editable symbolic music.
6. Play the score through Riffloom instruments and sound engines.
7. Learn the score through notation, instrument-native guidance or a useful combination.
8. Edit, arrange, simplify, transpose and remix the score.
9. Assign parts to different people and devices.
10. Export professional notation alongside audio, stems and performance data.

Notation should serve composers, learners, teachers, performers, arrangers, collaborators and producers rather than being a separate specialist feature.

### 14.3 Compose from a blank score

Users should be able to create a score directly without first recording audio.

Possible input methods include:

- tapping or dragging notes onto a staff
- entering rhythm before pitch
- entering pitch before rhythm
- using an on-screen piano, guitar or other instrument
- using a connected MIDI or expressive controller
- typing chord symbols
- selecting scales, keys and meters
- copying and transforming phrases
- handwriting with a stylus where practical
- voice commands
- natural-language requests
- AI-assisted composition under explicit constraints

The editor should support fast beginner entry and precise professional editing.

### 14.4 Generate notation from a Riffloom performance

When a user plays a Riffloom instrument, the system already receives structured note and gesture information.

It should be able to create notation from that performance with much greater reliability than audio-only transcription.

The user may choose whether the score represents:

- the exact performance
- a rhythmically cleaned version
- a simplified readable version
- a technically playable version
- an arranged version
- a lead sheet
- a complete ensemble score

The original performance data should remain preserved even when visible notation is simplified.

### 14.5 Generate notation from humming or singing

Humming or singing transcription should produce editable notes and rhythm, followed by a user-assisted correction stage.

The user may then ask Riffloom to:

- retain a single melody line
- infer a key or scale
- add chord symbols
- harmonise the melody
- arrange it for piano or guitar
- create several difficulty levels
- convert it into a full score

Uncertain notes should be marked rather than silently presented as certain.

### 14.6 Generate notation from beatboxing or tapping

Beatboxing and tapping may produce:

- percussion notation
- rhythm-only staves
- drum patterns
- articulation cues
- accent patterns
- strumming patterns
- rhythmic guidance for another melody

### 14.7 Generate a score through AI

A user may generate structured music from an empty project by specifying:

- instrumentation
- length
- meter
- tempo
- scale or tuning
- difficulty
- intended performer
- mood
- harmonic complexity
- rhythmic density
- formal structure
- learning objective

The result should be structured and editable rather than delivered only as audio.

Example requests include:

- create an eight-bar beginner piano study in D minor
- create a guitar exercise focused on bends and slides
- create a two-part classroom piece where both parts are equally difficult
- create a sight-reading exercise at my current level
- create a bassline beneath this melody
- create a complete score around my hummed chorus

### 14.8 Importing existing notation

Riffloom should support practical import routes including:

- MusicXML
- compressed MusicXML
- MIDI
- future MNX support as the specification matures
- MEI where useful
- guitar tablature formats where licensing permits
- standard notation files exported by established notation applications
- scanned or photographed printed scores
- PDF scores

Import should preserve as much semantic information as possible, including parts, dynamics, articulations, lyrics, repeats, fingering and layout hints.

The imported material should become an editable Riffloom project rather than remain a passive document.

### 14.9 Optical music recognition

Riffloom should eventually allow a user to photograph or scan printed notation and convert it into structured music.

The experience should assume recognition will sometimes be imperfect.

A safe workflow is:

1. Import the image or PDF.
2. Detect pages, staves, systems and symbols.
3. Produce a provisional score.
4. Highlight uncertain or conflicting regions.
5. Let the user compare the source image with reconstructed notation.
6. Play suspicious measures for quick checking.
7. Offer likely correction options.
8. Save the source and corrected symbolic version.

The system should never imply that complex optical recognition is infallible.

Potential uses include:

- digitising old sheet music
- turning a teacher’s printed score into an interactive lesson
- importing music bought or licensed elsewhere
- preserving historical or regional notation
- converting rehearsal material into a shared ensemble session

### 14.10 Audio-to-score transcription

Audio transcription should be treated as a layered process rather than one opaque operation.

The system may attempt to recover:

- tempo
- meter
- beat positions
- sections
- instruments
- melody
- bass
- chords
- percussion
- note timing
- dynamics
- articulation

For complex mixed audio, Riffloom may first separate stems and then transcribe suitable parts individually.

The resulting score should carry confidence information. The user should be able to hear each proposed note against source audio and correct it quickly.

Audio transcription should be strongest for:

- solo voice
- solo instruments
- simple arrangements
- separated stems
- clean recordings
- music already created within Riffloom

It should not promise perfect orchestral transcription from every recording.

### 14.11 The living score

A Riffloom score should be interactive at the level of the note, phrase, bar, part and section.

The user should be able to:

- tap a note to hear it
- hold a note to open its properties
- drag a note to change pitch or timing
- change duration visually
- jump playback to any symbol
- loop a selected region
- slow playback without changing pitch
- transpose instantly
- hide or isolate parts
- compare several performances of the same score
- see the current playback position
- see upcoming musical events
- switch between concert and transposed views
- display or hide fingerings, chord symbols, lyrics and analysis
- open the corresponding instrument position
- convert a selected passage into a practice exercise
- ask AI to explain or alter the passage

The score should reflow intelligently for phones, tablets, desktop screens and televisions.

### 14.12 Synchronised views

The same passage should be viewable through several synchronised representations.

#### Standard notation

Full staff notation for musicians who read scores.

#### Simplified notation

A reduced view containing only information required at the learner’s current level.

Possible simplifications include:

- pitch names
- rhythm counts
- colour coding
- fewer markings
- chord-only view
- melody-only view
- one hand or one voice at a time
- enlarged spacing

#### Optional time-based guidance

Where user testing proves it useful, time may be represented spatially so a learner can see what to play next and for how long.

This must not become a generic piano roll copied onto every instrument. It should be optional, instrument-specific and designed to support eventual musical understanding rather than permanent shape-following.

#### Instrument-native guidance

The actual Riffloom instrument should display:

- where to touch
- when to touch
- how long to hold
- how strongly to play
- which gesture to use
- which hand or finger is intended
- where the following movement will go

#### Timeline view

A production-oriented view showing clips, tracks, sections and automation.

#### Performance comparison

A view showing intended music against what the learner actually played.

#### Hybrid views

The user may combine representations, such as:

- notation above the instrument
- notation with optional time guidance
- notation with fingerboard or keyboard animation
- notation with waveform and real recording
- notation with teacher video
- notation with ensemble parts

All views should use one playback cursor and one musical clock.

### 14.13 Optional time-guidance research

A common falling-note model can show pitch and duration effectively, but it can encourage users to follow shapes without learning musical structure.

If Riffloom uses a richer time-guidance system, it may communicate:

- pitch
- onset
- duration
- rhythm grouping
- beat and bar position
- hand or finger
- articulation
- dynamics
- movement direction
- instrument technique
- phrase structure
- harmonic function where useful

A note may optionally appear as a path or ribbon whose:

- destination shows where to play
- arrival shows when to play
- length shows duration
- width or intensity shows dynamics
- shape shows articulation
- trajectory shows slides, bends or movement
- grouping shows chords or phrases

This is a research option, not a core product commitment. Any such view should teach the relationship between visual guidance and standard notation rather than permanently replace notation.

### 14.14 Progressive notation learning

A learner should be able to move through several stages, with optional visual assistance used only where appropriate.

#### Stage 1: Direct instrument guidance

The interface shows where and when to play.

#### Stage 2: Guidance plus note names and rhythm counts

The learner begins connecting actions to musical labels.

#### Stage 3: Instrument guidance plus standard notation

Notation remains visible and highlights in synchronisation with the instrument.

#### Stage 4: Reduced guidance

The system removes assistance while retaining correction and timing feedback.

#### Stage 5: Notation-first practice

The user reads the score while the instrument provides feedback after mistakes or on request.

#### Stage 6: Independent performance

The user performs without advance visual guidance, then receives a detailed review.

The learner should be able to move backwards or forwards rather than being forced into one path.

### 14.15 Piano learning

The piano learning view should be designed around Riffloom’s own keyboard layout rather than assuming a traditional single-row physical keyboard.

Potential features include:

- exact target keys
- clear routing between the three keyboard rows
- separate left-hand and right-hand guidance
- chord shapes displayed as connected groups
- finger-number suggestions
- hand-position zones
- pedal timing for sustain, sostenuto and soft controls
- velocity guidance
- legato and staccato guidance
- early indication of large hand movements
- optional standard keyboard projection for transferable learning
- a mode that teaches how the same music maps to a physical piano

The system should distinguish between learning to perform on the Riffloom piano and learning a piece that will later be played on a physical piano.

### 14.16 Guitar learning

The guitar learning view should represent both hands and the expressive techniques ordinary note highways often omit.

It should show:

- target string and fret
- alternative playable positions
- left-hand fingering
- chord formation before a strum
- barre shape
- picking direction
- strumming path
- muted strings
- open strings
- hammer-ons
- pull-offs
- slides
- bends and bend amount
- vibrato
- palm muting
- pick position
- sustain and release

The visual system may use separate but synchronised areas for:

- fretting hand
- picking or strumming hand
- rhythm
- technique
- standard notation
- tablature

The user should be able to choose whether a lesson teaches the Riffloom guitar interface, a physical guitar or both.

### 14.17 Other instrument learning views

Each instrument should receive a native visual language.

Examples include:

- bass string and fret guidance
- drum-pad timing and limb assignments
- bow direction and fingerboard position for strings
- valve combinations for brass
- slide position for trombone
- breath and fingering for wind instruments
- mallet paths for percussion
- chord and bellows guidance for accordion-like instruments

The platform should provide shared timing and feedback components while allowing instrument-specific teaching modules.

### 14.18 Practice modes

#### Preview mode

The app demonstrates the whole passage.

#### Wait mode

Playback pauses until the correct action is performed.

#### Rhythm mode

Pitch is simplified or supplied automatically while the learner focuses on timing.

#### Pitch mode

Timing is relaxed while the learner focuses on correct notes.

#### Hand or part isolation

The app supplies other hands, voices or instruments.

#### Loop mode

A selected passage repeats automatically.

#### Speed ramp

Tempo increases gradually after successful repetitions.

#### Mistake repair

The system creates a short exercise around the exact mistake.

#### Sight-reading mode

The learner receives unfamiliar material at an appropriate difficulty and cannot preview it indefinitely.

#### Memory mode

Parts of the guidance or notation disappear progressively.

#### Performance mode

The music continues and the user must recover from mistakes rather than stopping.

#### Ensemble mode

The learner performs one part while Riffloom, AI or other users perform the rest.

### 14.19 Real-time performance feedback

Riffloom should assess more than whether the correct pitch occurred.

Feedback may cover:

- correct and incorrect notes
- missed notes
- extra notes
- early and late timing
- duration
- dynamics
- articulation
- hand assignment
- fingering
- string and fret choice
- picking or strumming direction
- pedal use
- bends, slides and vibrato
- phrase continuity
- recovery after mistakes

Feedback should distinguish errors that matter musically from harmless expressive variation.

The user should receive:

- immediate feedback when useful
- a post-performance overview
- highlighted difficult measures
- trend data across repeated attempts
- clear recommended next practice steps

### 14.20 Adaptive learning system

The system should maintain a skill model for the learner.

It may track competence in:

- pitch reading
- rhythm reading
- hand coordination
- chord recognition
- intervals
- timing
- dynamics
- specific techniques
- sight-reading
- memory
- improvisation
- ensemble timing

Riffloom should adapt:

- lesson difficulty
- tempo
- visual assistance
- exercise length
- repetition
- repertoire
- fingering complexity
- number of simultaneous parts
- feedback frequency

Adaptation should be explainable. The learner should know why an exercise was selected.

### 14.21 AI teacher and notation assistant

AI may help the user understand and work with the score.

Possible actions include:

- explain what a symbol means
- explain why a chord works
- identify the key or harmonic movement
- suggest fingering
- simplify a difficult passage
- create a more advanced version
- generate targeted exercises
- turn a mistake into a practice drill
- create a lesson from the user’s own composition
- create a sight-reading exercise at a chosen level
- compare two interpretations
- suggest an efficient practice order
- translate notation terms
- answer questions about a selected note or measure

AI should point to exact relevant musical events and produce structured changes that remain editable.

### 14.22 Playing a score through Riffloom

An imported or created score should be playable immediately.

The user should be able to:

- assign each part to a Riffloom instrument
- choose sounds and articulations
- select humanised or literal playback
- change tempo and key
- mute or solo parts
- replace one generated part with a live performance
- send separate parts to different devices
- use the score as a backing ensemble
- record a new interpretation
- compare several performances

The score should therefore become both a document and an executable musical project.

### 14.23 Ensemble and classroom notation

A conductor, teacher or session host should be able to:

- view the full score
- distribute individual parts to each device
- send count-ins and rehearsal marks
- jump everyone to the same bar
- loop a section for the group
- adjust tempo
- mute or isolate sections
- annotate parts
- simplify one learner’s part without changing the whole group
- see who is connected and ready
- record each participant separately

Each performer should see only the information appropriate to their role and skill level.

A television or large screen may show:

- conductor score
- current section
- upcoming entries
- rehearsal instructions
- ensemble timing
- shared progress

### 14.24 Collaborative score editing

Several authorised users should be able to work on the same score.

Possible capabilities include:

- comments attached to notes or bars
- suggested edits
- version branches
- comparison between arrangements
- approval workflows
- part ownership
- composer, arranger, teacher and performer roles
- attribution for contributions
- merged changes

Notation changes should participate in the wider Riffloom version-control and rights system.

### 14.25 Notation accessibility

Notation and learning features should support adaptable presentation and input.

Possible options include:

- very large notation
- high-contrast modes
- custom colour mappings
- pitch names
- solfege
- rhythm counts
- spoken note and symbol descriptions
- haptic beat and entry cues
- reduced visual motion
- switch-controlled navigation
- eye-gaze selection
- voice control
- simplified one-line parts
- alternative notation
- adjustable scrolling and page movement

The system should not rely on colour alone to communicate musical meaning.

### 14.26 International and alternative notation

The internal music model should not assume every user works only with Western common notation and twelve-tone equal temperament.

The long-term system should accommodate:

- microtonal accidentals
- alternative tunings
- tablature
- percussion systems
- chord charts
- lead sheets
- numbered notation
- solfege and movable-do labels
- regional pitch names
- flexible rhythmic and ornamental systems
- right-to-left interface needs
- user-defined notation overlays

Support should be developed with practitioners from relevant traditions rather than imposed through automatic conversion alone.

### 14.27 Notation standards and interoperability

Initial priorities should include:

- MusicXML 4.0 import and export
- SMuFL-compatible notation symbols and fonts
- MIDI import and export
- MIDI 2.0 and expressive performance data where relevant
- monitoring MNX as the W3C community specification develops
- evaluating MEI for scholarly, historical and advanced notation use cases
- PDF and SVG publication exports
- professional audio and project exports alongside the score

Riffloom should maintain its own richer internal project representation rather than making an external interchange format the complete source of truth.

### 14.28 Rendering and technical implications

The notation system requires dedicated technology research.

The production architecture must evaluate:

- score engraving quality
- responsive score reflow
- SVG, canvas, GPU and native rendering options
- large orchestral score performance
- smooth cursor and highlight animation
- semantic hit targets for notes and symbols
- touch editing
- accessibility tree support
- font and symbol standards
- offline rendering
- printable output
- synchronisation with audio and instruments
- incremental updates without rerendering the whole score

Potential technologies to evaluate include mature open-source notation renderers such as Verovio and OpenSheetMusicDisplay, alongside native or custom approaches where required.

No renderer should be selected before testing engraving quality, licensing, editability, performance and cross-platform behaviour.

### 14.29 Transcription and correction architecture

The system should separate automatic recognition from user validation.

Every generated or recognised score element may need:

- confidence score
- source reference
- alternative interpretations
- correction history
- link to source audio or image
- indication of whether it was human-entered, performed, recognised or AI-generated

This provenance is important for reliability, rights, teaching and professional export.

### 14.30 Notation rights and licensing

Notation may carry copyright independent of an audio recording.

Riffloom should record:

- source of imported scores
- user declarations of ownership or permission
- public-domain status where known
- arrangement rights
- performer contributions
- AI-generated sections
- whether sharing, teaching, remixing or commercial export is allowed

Scanning or importing a score should not automatically make it distributable through the platform.

### 14.31 Professional notation export

A paid production package may include:

- full score
- individual parts
- MusicXML
- MIDI
- PDF
- SVG
- tablature
- chord chart
- lyric sheet
- rehearsal marks
- fingering
- tempo and time-signature maps
- corresponding stems and masters
- contributor and rights metadata

The score, audio and structured project should remain aligned.

### 14.32 Notation implementation sequence

#### Phase 1: Score generated from native Riffloom performances

- generate simple notation from piano and guitar project data
- show playback cursor
- tap notes to hear and inspect them
- connect score events to instrument positions
- export basic MusicXML and PDF

#### Phase 2: Interactive score and learning overlay

- standard notation and instrument-native guidance
- wait mode
- loop mode
- tempo control
- note and timing feedback
- hand or part isolation
- optional time-guidance experiments only where justified

#### Phase 3: Score editor and import

- blank score creation
- MusicXML import
- MIDI import
- direct note editing
- transposition
- part management

#### Phase 4: Advanced instrument teaching

- full piano hand and pedal guidance
- guitar fretting, picking, chords and techniques
- adaptive practice
- difficulty levels
- sight-reading and memory modes

#### Phase 5: Recognition and transcription

- humming and solo-instrument transcription
- PDF and image recognition
- uncertainty and correction workflow
- audio-to-score for separated tracks

#### Phase 6: AI composition and teaching

- structured score generation
- exercise generation
- adaptive lessons
- AI explanations
- automatic simplification and arrangement

#### Phase 7: Ensemble and professional workflows

- connected score sessions
- conductor and classroom modes
- collaborative editing
- full part preparation
- professional notation export

### 14.33 First notation priorities

1. Generate a readable score from music created on Riffloom instruments.
2. Synchronise the score, playback and instrument interface.
3. Create instrument-native learning views linked directly to notation, adding time-path guidance only if testing proves useful.
4. Provide real-time note, timing and duration feedback.
5. Import and export MusicXML so Riffloom participates in existing notation workflows.

### 14.34 Notation boundaries

Riffloom should not become only:

- a static sheet-music viewer
- a generic notation editor copied from desktop software
- a falling-note game that never teaches musical understanding
- a learning app restricted to a fixed song catalogue
- an audio transcription service that hides uncertainty
- a notation system disconnected from performance and production

The desired outcome is one living musical system in which composition, notation, performance, learning and production continuously reinforce one another.

### 14.35 Notation research basis

This direction is informed by current systems and standards that establish a baseline Riffloom should exceed:

- The W3C Music Notation Community Group maintains MusicXML and SMuFL and is developing MNX for broader web, desktop and mobile notation use cases.
- MusicXML 4.0 is an established score-interchange format used across notation applications.
- Soundslice demonstrates interactive notation synchronised with audio and video, responsive layouts, looping, transposition and instrument visualisations.
- Synthesia demonstrates the accessibility of falling-note guidance, wait mode, hand isolation and optional simultaneous sheet music.
- Yousician and flowkey demonstrate real-time listening, instant feedback and structured learning paths.
- Piano Marvel demonstrates adaptive sight-reading assessment and detailed practice feedback.
- Verovio and OpenSheetMusicDisplay demonstrate open-source browser-capable notation rendering.
- Audiveris demonstrates the value and limits of optical music recognition, including the need for human correction.
- Spotify Basic Pitch demonstrates lightweight audio-to-MIDI transcription for voice and instruments.

These products validate individual components. Riffloom should connect them through one structured, instrument-aware and cross-platform music model.

## 15. Open-source and commercial model

### 15.1 Free creation

The core project should remain open source. The official app should also remain free for musical creation.

Users should be able to:

- play the digital instruments
- hum or beatbox ideas
- create and edit performances
- build complete compositions
- record different instrument layers
- mix and remix projects
- use notation and learning tools
- collaborate locally
- save projects
- reopen and continue projects
- hear completed work inside the app

The product should not charge users merely to experiment, learn or create music.

### 15.2 Paid professional export

Payment should be required when a user wants Riffloom to turn a finished project into a professionally prepared output.

The initial pricing hypothesis is approximately:

- $5 for a standard export
- $10 for an advanced or multi-instrument production export

This is not final pricing. It should be tested against export quality, processing cost and user demand.

### 15.3 Why someone would pay

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
- PDF and SVG scores
- loop-ready files
- correctly aligned tracks
- clean starts and endings
- consistent loudness
- production-quality instrument rendering
- structured files prepared for professional music software
- contributor, rights and provenance records
- alternative masters for streaming, video, games or live use

The user is not paying to access their music. They are paying for Riffloom to turn it into a polished, structured and professionally usable product.

### 15.4 Export levels

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
- full score and individual parts
- contributor and rights metadata

### 15.5 Commercial advantage of the official service

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
- high-quality AI models and final rendering
- professional game, video, spatial and live-show packages

The free app must remain useful enough to create a complete piece of music. The paid service must save a serious user substantial production, transcription, arrangement and preparation work.

### 15.6 Open-source governance questions

The project must define:

- which components remain open
- which services are hosted
- how community contributions are reviewed
- how third-party instruments are distributed
- whether commercial extensions are allowed
- how security-sensitive modules are handled
- how the official app remains compatible with forks
- how contributors receive attribution or revenue where appropriate

The relationship between the open project and official production service must be understandable and credible.

## 16. Cross-platform product ecosystem

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
- future spatial-computing environments

The underlying music engine, project format and account system should remain consistent across platforms. Each platform should have an interface designed around its available controls rather than displaying a stretched version of the phone app.

### 16.1 Phone and tablet

Primary capabilities may include:

- multi-touch instruments
- microphone input
- motion input
- touch duration and pressure where supported
- headphones and audio interfaces
- external MIDI devices
- portable recording and idea capture

### 16.2 Desktop and web

Desktop versions should provide more space and precision for:

- detailed arrangement
- multitrack editing
- advanced mixing
- project management
- notation and scoring
- professional export
- external microphones and audio interfaces
- MIDI keyboards and controllers
- multiple displays

Touchscreen desktop systems should also support large expressive instrument surfaces.

### 16.3 Touchscreen television

A touchscreen television may become a large collaborative musical surface for:

- large-format instrument interfaces
- several people playing together
- music education
- group composition
- performance mode
- visual arrangement and mixing

### 16.4 Standard television

A non-touchscreen television interface may support:

- television remotes
- game controllers
- keyboard and mouse
- connected phones as controllers
- voice control where useful
- external MIDI devices

The television may act as a shared display while phones, tablets or controllers provide detailed input.

### 16.5 Game consoles

Console versions may use:

- analogue sticks
- triggers
- buttons
- touchpads
- motion controls
- connected microphones
- external instruments
- multiple local controllers
- haptic feedback

This could support musical performance, collaborative creation and accessible music experiences. Console availability depends on each platform’s technical, licensing and approval requirements.

### 16.6 Connected-device mode

Different devices should be able to work together.

Examples include:

- a television displaying the full project while a phone controls an instrument
- a tablet acting as a mixer while a desktop runs the arrangement
- several phones functioning as separate instruments in one shared session
- a phone acting as a microphone or motion controller
- a desktop handling production while a touchscreen provides performance controls
- a television showing notation while a user plays from another device

### 16.7 Cross-device continuity

Users should be able to:

- start a project on a phone
- continue it on a desktop
- perform it through a television
- edit it on a tablet
- export it through a professional workstation

Projects, tracks, instruments, settings and version history should remain synchronised across supported devices.

## 17. Professional compatibility

Riffloom should work with systems already used by musicians and producers rather than forcing them to replace existing tools.

Compatibility should eventually include:

- audio import and export
- separated stems
- MIDI 1.0
- MIDI 2.0
- MPE
- MusicXML
- MNX when mature
- MEI where useful
- guitar tablature
- standard notation
- tempo and time-signature maps
- marker and section information
- automation data
- external MIDI controllers
- professional audio interfaces
- OSC
- Ableton Link where appropriate
- digital audio workstations
- VST3
- Audio Unit and AUv3
- CLAP
- ARA
- AAX feasibility and licensing
- JACK or other professional routing on supported systems
- ASIO on Windows
- Core Audio
- immersive audio exports
- control and synchronisation protocols where useful

Riffloom may eventually operate as:

- a standalone application
- a web application
- a companion application
- a digital audio workstation plug-in
- a virtual instrument
- a MIDI or MPE controller
- an OSC controller
- a performance controller
- a collaborative music service
- an embedded runtime or SDK

The user should be able to move a Riffloom project into an established production workflow without rebuilding the entire composition manually.

## 18. Expanded opportunity map

The opportunities in this section are not all immediate features. They preserve the full strategic space so early architectural decisions do not prevent valuable future directions.

### 18.1 Instrument-building platform

Riffloom should eventually allow developers, musicians, teachers and researchers to create entirely new screen-native instruments.

An instrument builder may define:

- the playing surface
- notes, scales and tuning
- touch zones
- supported touch count
- gesture mappings
- pressure, motion and position behaviour
- chord and performance rules
- articulation logic
- synthesis or sample engines
- haptic responses
- accessibility controls
- visual feedback
- MIDI and professional export mappings
- AI-assisted behaviour

Possible results include:

- digital versions of existing instruments
- regional and microtonal instruments
- experimental instruments with no physical equivalent
- instruments for children
- instruments designed around a particular disability
- collaborative instruments shared across several screens
- specialised controllers for live performance or studio work

The platform should support community-created instruments without allowing poorly written extensions to damage real-time audio performance or project security.

### 18.2 Developer SDK, APIs and embeddable runtime

Riffloom should expose selected capabilities through an SDK and service layer.

Other developers may want to embed:

- a Riffloom instrument inside a game
- humming-to-notes inside another music application
- collaborative performance inside an education platform
- adaptive accompaniment inside a fitness application
- touchscreen control inside professional studio software
- accessible music controls inside specialist software
- project playback inside a website
- structured remixing inside a creator platform

Riffloom could eventually exist as:

- a standalone application
- a web application
- a plug-in
- a reusable software library
- a music runtime engine
- a local service
- a hosted API
- a project and performance format

The SDK should separate stable public interfaces from internal implementation details.

### 18.3 Interactive music for games

Games require music that can change in response to events rather than one fixed linear song.

Riffloom could export an adaptive game-music package containing:

- exploration, danger, combat and resolution sections
- instrument layers that enter or disappear
- intensity levels
- loop regions
- alternative endings
- transition points
- tempo and key information
- synchronised stems
- transition rules
- fallback behaviour
- metadata for common game engines and audio middleware

A game may connect musical states to:

- player health
- enemy presence
- location
- speed
- time of day
- story choices
- victory or failure
- emotional intensity
- weather
- multiplayer activity

Riffloom’s opportunity is to make adaptive music authoring accessible without requiring every creator to become a specialist in game-audio middleware.

Professional game export may become a higher-value paid service than ordinary song export.

### 18.4 Adaptive music for video, podcasts and other media

A creator should be able to provide a video, podcast or timeline and ask Riffloom to fit music around it.

Possible operations include:

- matching musical sections to scenes
- increasing or reducing intensity around edits
- avoiding dialogue
- automatically ducking music beneath speech
- extending or shortening music to an exact duration
- creating smooth transitions
- producing several emotional treatments
- creating 15-second, 30-second, 60-second and full-length versions
- generating a consistent musical identity across a series
- replacing temporary or copyrighted placeholder music
- providing clean stems for later editing

For podcasts, Riffloom may create:

- opening and closing themes
- segment transitions
- advertisement-break music
- underscoring
- speaker-specific motifs
- episode-length variations
- reusable branded sound packages

### 18.5 Music that remains interactive after release

A released Riffloom composition should not always become a dead audio file.

A creator may publish:

- a standard listening version
- a version with adjustable instrument balance
- a remixable version
- a performance version
- a karaoke version
- a learning version
- a simplified version
- a spatial version
- a version that changes length or intensity
- a version where listeners may replace selected tracks

The creator should decide which elements remain locked.

For example, an artist may lock melody, vocals and lyrics while allowing listeners to replace drums, alter the arrangement or perform a new guitar part.

This creates a format between a finished song, a project file, a music game and a licensed remix environment.

### 18.6 Marketplace for structured musical components

A Riffloom marketplace may contain more than ordinary audio samples.

Creators could publish or sell:

- instrument interfaces
- sound engines
- virtual instrument patches
- sample libraries
- drum kits
- loops
- chord progressions
- arrangement templates
- AI session-musician profiles
- mixing chains
- guitar or piano playing styles
- lessons
- exercises
- performance challenges
- complete remixable projects
- game-music templates
- spatial-audio scenes
- accessibility mappings
- visual and lighting templates

Marketplace items should declare:

- ownership
- licence terms
- permitted commercial use
- attribution requirements
- compatibility
- model or data provenance
- supported platforms
- expected performance requirements

### 18.7 Rights, credits and automatic revenue splits

Because tracks and contributions remain separate, Riffloom can maintain a project contribution ledger.

A project may record:

- who created the original idea
- who wrote the melody
- who wrote lyrics
- who played each instrument
- who arranged or mixed the project
- which parts were AI-generated
- which models or services were used
- which sounds were purchased or licensed
- who created a remix
- whether commercial use is permitted
- the agreed revenue split

Collaborators may agree on percentages before professional export or release.

Professional export may include:

- contributor information
- licence information
- recording identifiers where appropriate
- AI provenance
- important project history
- machine-readable rights metadata
- content credentials where supported

The system should not pretend automated contribution measurement can replace legal agreements. It should provide useful records and workflows while allowing collaborators to confirm final terms.

### 18.8 Version control for music

Riffloom should provide version management closer to modern software development than conventional save-as workflows.

Users should be able to:

- branch a project into several directions
- compare arrangements
- restore an earlier version
- see who changed each section
- comment on a note, clip, bar, track or section
- propose a replacement
- approve or reject changes
- compare human and AI versions
- merge selected elements from several versions

A user may choose:

- the verse from Version A
- drums from Version B
- the chorus from Version C
- the ending from Version D

Version control is particularly valuable for:

- bands
- producers
- remote collaborators
- schools
- game studios
- film teams
- open-source projects
- licensed remixing

The underlying project model should use stable identifiers so tracks, sections and musical objects can be compared even after editing.

### 18.9 Learning and practice platform

Every structured composition can become an interactive lesson.

Riffloom knows what should be played, what the user actually played and how the selected instrument works.

It may therefore:

- divide a song into practice sections
- slow a difficult part without changing pitch
- highlight incorrect notes
- detect early or late timing
- show finger or fret positions
- create easier arrangements
- increase difficulty gradually
- teach theory through the user’s own work
- generate sight-reading exercises
- create ear-training exercises
- identify recurring weaknesses
- create personalised practice plans
- compare several performances
- let a teacher review a student’s attempt

Creation and learning should remain connected. A user may generate or compose a part, learn it through guided practice and then record a human performance to replace the draft.

### 18.10 Classroom and school mode

A teacher should be able to create a managed session and assign roles such as:

- piano
- guitar
- bass
- drums
- melody
- harmony
- rhythm
- mixing
- conducting
- listening and evaluation

Students may join from school devices or their own phones.

The teacher may:

- mute or solo groups
- assign easier and harder parts
- change difficulty for individual students
- see participation and timing
- record the class
- replay mistakes
- create smaller practice groups
- distribute a project or lesson
- allow controlled remixing
- export the final class performance
- retain appropriate privacy controls for minors

A classroom mode should work on ordinary local networks and should not require high-end studio equipment.

### 18.11 Accessibility as a central capability

Accessibility should shape the input architecture from the beginning rather than being added after instruments are complete.

Users may play through:

- one or two switches
- eye gaze
- head movement
- voice
- breath
- facial movement
- large touch targets
- external adaptive controllers
- game controllers
- scanning interfaces
- partner-assisted controls
- haptic feedback
- simplified chord or phrase triggers

A user may use one switch to advance through a melody, another to trigger chords and head movement to control dynamics.

Riffloom should support a portable accessibility profile that follows the user across instruments and devices.

The profile may store:

- preferred input methods
- target sizes
- gesture tolerance
- timing tolerance
- scanning speed
- haptic patterns
- visual contrast
- audio cues
- one-handed or limited-motion layouts
- assisted-performance rules

Accessibility should not automatically mean reduced musical expression. The goal is to map available movement or control into meaningful expression.

### 18.12 Motion-based instruments

Phones, watches, earbuds and controllers contain accelerometers, gyroscopes and other sensors.

Riffloom may use motion to:

- bend pitch by tilting a device
- control filters through rotation
- create percussion through shaking
- conduct tempo and dynamics
- use two devices as drumsticks
- control a virtual bow
- change articulation through movement speed
- move sound through a spatial field
- control stage visuals
- provide accessible input where touch is difficult

Motion should be calibrated carefully to avoid accidental triggers, sensor noise and inconsistent behaviour between devices.

Users should be able to set dead zones, sensitivity, smoothing and movement range.

### 18.13 Haptic music

Riffloom may translate rhythm, pitch, timing and ensemble information into vibration.

Applications include:

- a silent metronome
- rhythmic guidance through a phone or watch
- feedback when another performer enters
- tactile confirmation when a key or string is triggered
- tactile music for deaf or hard-of-hearing users
- separate patterns for kick, snare and bass
- controller vibration during console performance
- teaching timing without adding more sound
- haptic cues during live performance

Haptics can be both an accessibility channel and an expressive musical output.

The system should account for major differences between device vibration hardware.

### 18.14 Spatial and three-dimensional music

Riffloom should eventually allow users to position instruments within a three-dimensional sound field.

A creator may place:

- vocals in front
- drums behind
- strings above
- guitar moving across the listener
- performers around a virtual stage

Phones and tablets may act as spatial objects. Moving a device may move its assigned instrument through the mix.

Professional export may include:

- binaural headphone audio
- surround formats
- object-based mixes
- immersive music masters
- spatial metadata for games and interactive applications

The project model should not assume every mix is only a fixed left-to-right stereo arrangement.

### 18.15 Mixed reality and virtual performance spaces

In future augmented or virtual reality environments:

- instruments may float around the player
- a piano may become as large as a room
- notes may move through space
- remote performers may share a virtual stage
- a conductor may reposition performers
- users may walk through layers of a composition
- teachers may point directly at notes and gestures
- visual elements may react to every instrument

Riffloom should not prioritise mixed reality before the core instruments and project engine are mature. However, the data model should avoid assumptions that make spatial interaction impossible later.

### 18.16 Live-performance and stage mode

Riffloom should support reliable live performance as well as composition.

Stage mode may provide:

- large and stable performance controls
- set lists
- song and scene transitions
- backing tracks
- live looping
- lyrics and notation
- click tracks
- performer-specific monitor mixes
- redundant device support
- emergency recovery
- remote mixing
- audience displays
- AI replacement for an absent or failed part
- preflight device and network checks

A desktop or television may act as stage coordinator while each performer uses a separate device.

Stage mode should prioritise predictability over experimental features.

### 18.17 Lighting and visual control

A Riffloom project may control stage lighting, projection and visual effects.

Possible capabilities include:

- lighting cues tied to song sections
- visualisations generated from tracks
- colours responding to harmony
- effects triggered by drum hits
- synchronised lighting across a venue
- data output to projection software
- audience-controlled visual intensity
- complete show-control export packages

Music and visual automation should share a common timeline while remaining independently editable.

Professional control standards should be supported where practical rather than replaced with proprietary protocols.

### 18.18 Audience participation

At a performance, audience members may join a restricted Riffloom session through their phones.

They might:

- provide percussion
- sing a chorus
- vote between musical directions
- control approved visual effects
- trigger selected samples
- create a crowd-generated texture
- choose the next arrangement
- receive haptic rhythm
- hear a personalised instrument mix

The performer must define strict permissions and limits.

Audience participation may be useful for:

- concerts
- schools
- festivals
- museums
- public installations
- community events
- religious or ceremonial gatherings where appropriate

The design should prevent one participant or a poor network connection from disrupting the entire performance.

### 18.19 Music games and console experiences

Riffloom may provide game-like musical experiences without reducing the main product to a toy.

Possible modes include:

- cooperative band challenges
- improvisation battles
- finish-the-melody games
- rhythm and timing competitions
- collaborative composition quests
- conducting challenges
- remix competitions
- musical puzzle rooms
- song-building during gameplay
- adaptive challenges based on user skill

Console controllers offer sticks, triggers, buttons, touchpads, motion and haptics that can become expressive musical inputs.

Game modes may also serve as onboarding for people who do not identify as musicians.

### 18.20 Generative soundtracks for personal activity

Riffloom may generate music that responds continuously to an activity.

Examples include:

- running music that follows pace
- exercise music that changes with intensity
- focus music with controlled development
- breathing sessions
- walking soundtracks
- driving music that adapts to a journey
- sleep or relaxation soundscapes
- music that follows a reading or storytelling session

With explicit permission, supported devices may provide activity, pace or biometric data.

Initial positioning should focus on adaptive wellness and activity experiences rather than medical treatment.

Any therapeutic or medical claims require stronger evidence, specialist review and possibly regulatory work.

### 18.21 Location and environment-based music

A Riffloom project may react to:

- location
- walking speed
- weather
- time of day
- altitude
- movement
- ambient noise
- nearby users
- physical rooms
- landmarks

Possible applications include:

- museum experiences
- tourism
- theme parks
- public art
- guided walks
- exercise
- location-based games
- interactive city soundtracks
- nature experiences

Environmental rules should be stored separately from the core composition so the same musical work can be deployed in several contexts.

Privacy and battery use must be considered before collecting location or sensor information.

### 18.22 Cultural instrument and performance preservation

Riffloom may provide a framework for preserving instruments, tunings and performance traditions poorly represented in mainstream software.

Communities and specialists may document:

- instrument layouts
- scales
- microtonal tunings
- rhythmic systems
- playing techniques
- articulations
- traditional accompaniment
- teaching methods
- historical recordings
- regional notation
- cultural context

The goal should not be limited to sampling a sound. It should preserve how an instrument is played, taught and understood.

Contributors from the relevant tradition should control representation, attribution and permissions.

### 18.23 Professional plug-ins and control surfaces

Riffloom should enter existing studio workflows rather than forcing professional users to abandon them.

Possible forms include:

- a VST3 instrument or effect
- a CLAP plug-in
- an Audio Unit or AUv3
- an ARA-connected transcription or arrangement tool
- a DAW control surface
- a MIDI 2.0 or MPE controller
- an OSC controller
- a phone companion for desktop production
- a stem and project-export plug-in

This may allow a producer to use Riffloom instruments and transcription tools inside an established workflow.

The eventual technology stack must account for performance and packaging requirements of plug-ins as well as standalone applications.

### 18.24 Hardware ecosystem

Hardware should not be an early priority, but the software may eventually support:

- phone docks
- tactile screen overlays
- foot pedals
- pick-shaped controllers
- adaptive switch hubs
- haptic wristbands
- audio interfaces
- low-latency wireless adapters
- television controllers
- modular performance surfaces

A promising long-term direction is a small Riffloom connection and control hub that links phones, MIDI equipment, adaptive switches, microphones and professional systems.

The product should prove demand through software before committing to expensive proprietary hardware.

### 18.25 Opportunity priority tiers

#### Tier 1: Architectural foundations

These should influence system design even when their complete products are years away:

1. Open structured project and performance format.
2. Developer SDK and instrument-building model.
3. Professional interoperability through MIDI, MPE, OSC and plug-in standards.
4. Version control, attribution and contributor rights.
5. Accessibility profiles and adaptable input architecture.
6. Performance data rich enough for touch, motion and instrument-specific expression.
7. Platform-independent project identity and synchronisation.

Adding these foundations too late may require major reconstruction.

#### Tier 2: Major product extensions

These can create substantial new audiences and revenue once the core platform is stable:

1. Interactive learning and classroom mode.
2. Adaptive game and video music export.
3. Interactive published songs and licensed remixing.
4. Creator marketplace.
5. Live stage, lighting and visual control.
6. Developer SDK and embedded experiences.
7. Professional plug-ins and control surfaces.

#### Tier 3: Longer-term expansion

These should remain in the vision but should not distract from validating the core product:

1. Spatial and mixed-reality music.
2. Motion and haptic instruments.
3. Audience participation.
4. Activity and biometric-responsive music.
5. Location-based experiences.
6. Dedicated hardware.

### 18.26 Cross-cutting requirements

The opportunities above create requirements across the platform:

- low-latency input and audio
- reliable multi-touch
- deterministic real-time processing
- platform-independent project files
- offline-first creation where possible
- secure extension and marketplace systems
- permissions and rights metadata
- accessible input abstraction
- scalable collaboration
- version history
- plug-in and standards compatibility
- clear AI provenance
- device capability negotiation
- graceful degradation on weaker hardware
- testable performance budgets

### 18.27 Opportunity boundaries

Riffloom should not become:

- a generic miniature copy of an existing desktop digital audio workstation
- a product dependent on one AI-generation provider
- a system that promises perfect live internet jamming across arbitrary distances
- a medical product without suitable evidence and governance
- an open remix marketplace without reliable rights and attribution
- a hardware company before the software interaction model is proven
- a system that flattens structured projects into audio too early
- an extension platform where third-party code can interrupt real-time audio
- a closed ecosystem that prevents professional export

The opportunity map should guide architecture and strategic options without turning the immediate roadmap into an unmanageable list.

### 18.28 Initial research references

The opportunity scan drew on adjacent product categories and technical standards, including:

- MIDI specifications and MIDI 2.0: https://midi.org/specs
- Web Audio API: https://webaudio.github.io/web-audio-api/
- FMOD Studio: https://www.fmod.com/studio/
- Tracklib: https://www.tracklib.com/
- Content Authenticity Initiative tools: https://opensource.contentauthenticity.org/docs/c2patool/
- Melodics: https://support.melodics.com/en/articles/6777061-get-started-with-melodics
- Soundtrap for Education: https://schools.soundtrap.com/edu/
- Music accessibility work through The MIDI Association: https://midi.org/rampd-massig-turning-music-accessibility-into-real-world-standards
- Apple Core Motion: https://developer.apple.com/documentation/coremotion/
- Dolby Atmos content creation: https://professional.dolby.com/product/dolby-atmos-content-creation/
- Open Sound Control: https://opensoundcontrol.stanford.edu/spec-1_0.html
- Apple HealthKit queries: https://developer.apple.com/documentation/healthkit/queries

These references support the opportunity categories. Later architecture or commercial decisions should use a fresh, task-specific research pass rather than treating this list as a final technical recommendation.

## 19. Product rules that cut across every feature

### 19.1 Universal interaction language

Every instrument should feel related without being identical.

Shared rules are required for:

- recording
- looping
- holding notes
- undo and redo
- switching instruments
- selecting notes or sections
- applying AI
- joining sessions
- mixing
- saving
- exporting

A user should not have to relearn the whole application when switching instruments.

### 19.2 Beginner and professional experiences

The same product must serve people who know almost nothing about music and people who understand professional production.

Use progressive complexity:

- immediate mode for playing
- guided mode for creating and learning
- advanced mode for editing
- professional mode for production

The interface must not overwhelm beginners, but it must not feel childish or restrictive to musicians.

### 19.3 Musical quality and correctness

AI and automated arrangement can create technically valid but musically poor results.

Riffloom needs systems for evaluating:

- playability
- harmonic quality
- rhythmic coherence
- instrument range
- voice leading
- repetition
- arrangement density
- genre authenticity
- unwanted clashes
- human expression

Quality control will probably require a combination of rules, models, user feedback and professional musicians.

### 19.4 Sound quality strategy

The interaction can be excellent while the product still fails because instruments sound artificial.

Decisions are needed on:

- sampling versus synthesis
- local versus cloud rendering
- instrument-library licensing
- storage requirements
- downloadable sound packs
- quality levels for different devices
- offline sound availability
- production rendering for paid export

The real-time phone sound and final professional export do not need to use the same rendering engine.

### 19.5 Latency as a product feature

Latency should not be treated only as an engineering metric.

Riffloom may need to:

- measure device latency automatically
- calibrate touch, audio and Bluetooth delay
- warn users about unsuitable headphones
- compensate recordings
- recommend wired or built-in audio for live performance
- adjust session behaviour based on network conditions
- show when a device is unsuitable for a particular mode

The user should not need to understand audio engineering to get a responsive instrument.

### 19.6 Hardware and device variability

Touchscreens vary enormously.

The product must account for:

- different touch sampling rates
- contact limits
- palm rejection
- screen refresh rates
- pressure support
- styluses
- foldable devices
- screen notches and rounded corners
- thermal throttling
- weak speakers
- Bluetooth latency
- background process restrictions
- battery consumption

Riffloom may eventually need a device capability database and certification programme.

### 19.7 Offline-first operation

Playing an instrument, recording or opening a saved project should not depend on a reliable internet connection.

Cloud services should enhance the experience rather than control basic access.

Clear rules are needed for:

- offline projects
- deferred synchronisation
- local AI models
- cloud AI features
- conflict resolution
- cached sound libraries
- local network sessions without internet
- recovery after an interrupted upload

### 19.8 Ownership and licensing

The product needs a clear answer to who owns what when a project combines:

- human performances
- AI-generated material
- purchased sounds
- remixable projects
- public-domain material
- collaborators
- personal voice models
- community-built instruments

Rights should be visible throughout the creative process, not revealed only when someone tries to export.

### 19.9 Safety and moderation

The product must consider:

- unauthorised voice cloning
- copyrighted uploads
- artist imitation
- harmful or abusive collaboration
- public project moderation
- malicious plug-ins
- excessive sound levels
- hearing protection
- children using classroom or community features
- private recordings and biometric information

Volume warnings and safe listening defaults are particularly important for prolonged headphone use.

### 19.10 Privacy

Riffloom may process highly personal material:

- voice recordings
- unreleased music
- lyrics
- personal sound models
- collaboration messages
- biometric signals
- creative habits
- children’s schoolwork

Users should be able to keep projects completely local. Cloud processing should be explicit. Private projects should never be used for model training without clear permission.

### 19.11 Discovery without becoming social media

A community could be valuable, but an ordinary attention-driven feed could damage the product.

More useful discovery systems may focus on:

- instruments
- remixable projects
- lessons
- open collaboration requests
- challenges
- sound packs
- arrangement templates
- musicians seeking band members

The platform should reward creation and collaboration rather than endless passive scrolling.

### 19.12 International musical systems

The product should not assume all music uses twelve-note equal temperament, Western notation and standard major or minor harmony.

Plan for:

- microtonal scales
- alternative tuning systems
- regional rhythmic systems
- non-Western notation
- right-to-left interfaces
- different instrument traditions
- user-created scale systems
- flexible pitch naming

Adding this too late could require major changes to the music engine.

### 19.13 Testing groups

Testing should include:

- complete beginners
- casual creators
- instrumental musicians
- producers
- disabled musicians
- teachers and students
- children
- older users
- people using low-cost devices
- people using professional equipment

A feature that impresses a producer may confuse a beginner. A layout that works on one premium phone may fail on a lower-cost Android device.

### 19.14 Core competitive claim

> Riffloom lets anyone turn musical intention into structured, playable and professionally usable music, whether that intention begins through touch, voice, movement, collaboration or AI.

Every major feature should strengthen that claim.

## 20. Production technology-stack research brief

**Status:** Research required. No production stack has been selected.

Riffloom needs a deliberately selected production technology stack.

The current prototypes are useful for validating interaction ideas, but a production musical instrument has requirements that ordinary application frameworks may not satisfy automatically.

The final system must respond immediately to touch, handle several simultaneous contacts, produce reliable low-latency audio, remain stable under sustained performance and work across a wide range of screens and devices.

The stack must also support:

- phones and tablets
- touchscreen and non-touchscreen computers
- web browsers
- televisions
- connected multi-device sessions
- professional music systems
- plug-ins
- accessibility inputs
- AI-assisted workflows
- future consoles and spatial platforms

A framework should not be selected merely because it is popular, familiar or convenient for ordinary business applications.

### 20.1 Research objective

The research must recommend a production architecture that gives Riffloom the best practical balance of:

- touch responsiveness
- reliable multi-touch
- audio latency
- audio quality
- deterministic real-time behaviour
- cross-platform code sharing
- platform-specific optimisation
- rendering performance
- maintainability
- testability
- accessibility
- professional interoperability
- collaboration and networking
- offline operation
- security
- development speed
- open-source suitability
- long-term control over the product

The final recommendation may be a hybrid architecture rather than one framework used for every layer.

### 20.2 Touch must feel directly connected to sound

A player should not feel that the visual interface or sound follows behind their finger.

The system must minimise the complete path from:

1. physical contact
2. operating-system input event
3. gesture interpretation
4. instrument-state update
5. audio-engine update
6. sound generation
7. audio output

The research must measure this complete path rather than reporting only framework event-processing speed.

### 20.3 Multi-touch must be first-class

The instruments may require:

- several fingers on one hand
- both hands on one device
- chords
- independent bends
- slides
- barres
- simultaneous fretting and picking
- several people touching one large display
- touch plus stylus or external control

The implementation must not reduce all input to one active pointer or allow browser scrolling, selection, zooming or system gestures to interfere with performance.

### 20.4 Audio must not depend on visual frame rate

The audio engine must continue reliably even if:

- the interface misses a frame
- a visual animation becomes complex
- the operating system pauses background work
- the network connection changes
- a project is being saved
- another thread performs AI or file processing

Real-time audio work must not allocate memory unpredictably, wait for locks, perform network requests or depend on the main interface thread.

### 20.5 Graceful degradation

Older or weaker devices may not support every sound engine, visual effect or AI feature.

Riffloom should detect device capabilities and select appropriate:

- sample rates
- buffer sizes
- synthesis complexity
- visual detail
- voice limits
- background processing
- AI execution location
- collaboration mode

A weaker device should receive a controlled reduced experience rather than glitches, missed notes or crashes.

### 20.6 Cross-platform without lowest-common-denominator design

The project should share musical logic, project data and as much infrastructure as practical.

The stack must allow platform-specific code where required for:

- audio APIs
- touch and stylus input
- haptics
- motion sensors
- background audio
- Bluetooth and MIDI
- file access
- screen refresh rates
- television controls
- console certification
- professional plug-in formats

### 20.7 Provisional performance targets

These are research and prototype targets, not final guarantees.

#### Input and rendering

Candidate targets include:

- stable 60 frames per second on supported baseline devices
- support for 90 Hz, 120 Hz or higher refresh where available
- no missed supported touch contacts during ordinary performance
- support for at least ten simultaneous contacts where the operating system and hardware expose them
- immediate visual feedback on the next available frame
- gesture-state processing that does not block rendering or audio
- no accidental page scrolling, text selection, browser zooming or system navigation during instrument performance
- predictable behaviour when touches enter, leave, cancel or move between regions

#### Audio

Candidate targets include:

- local touch-to-sound latency suitable for musical performance
- a research goal of approximately 20 milliseconds or lower on capable modern devices
- documented fallback behaviour where hardware or operating-system limits make that target impossible
- stable output without audible glitches during sustained multi-touch playing
- sample-accurate scheduling inside the audio engine where supported
- no audible interruption while saving, drawing or receiving network events
- controlled recovery after route changes, headphone insertion, Bluetooth changes or audio interruptions

The research must report measured round-trip and output latency rather than relying only on requested buffer sizes.

#### Stability and resource use

Candidate targets include:

- sustained performance without memory growth
- controlled CPU use under maximum supported polyphony
- thermal stability during longer sessions
- acceptable battery use
- no real-time audio allocations or unbounded work
- graceful handling of device rotation, window resizing and application backgrounding
- recovery from audio-device changes without losing the project

### 20.8 Required benchmark scenarios

Every serious stack candidate should be tested through the same reference scenarios.

#### Scenario A: Piano chord stress test

- many simultaneous notes
- rapid repeated chords
- sustain and sostenuto changes
- slides across keys
- visual feedback on every contact
- recording enabled

#### Scenario B: Expressive guitar stress test

- one hand fretting several strings
- another hand picking or strumming
- simultaneous bends
- slides
- hammer-ons and pull-offs
- palm muting
- per-string audio processing

#### Scenario C: Large-screen shared instrument

- several people touching a large touchscreen
- high contact count
- independent assigned regions
- orientation and window-size changes
- television or external-display rendering

#### Scenario D: Multitrack session

- several instrument tracks playing
- one track recording
- waveform or note visualisation
- mixer controls moving
- project autosave
- no audio interruption

#### Scenario E: Connected ensemble

- several devices on a local network
- shared clock and count-in
- event transport
- local monitoring
- distributed recording
- one device joining or leaving

#### Scenario F: Professional integration

- MIDI and MPE input and output
- external audio interface
- sample-rate change
- plug-in or DAW connection
- stem and structured export

#### Scenario G: Weak-device fallback

- baseline supported hardware
- reduced visual and synthesis settings
- background interruptions
- low memory
- thermal pressure
- network degradation

### 20.9 Architecture families to compare

#### Fully native mobile applications

Possible components include:

- Swift with UIKit, SwiftUI, Metal, Core Audio or AVAudioEngine on Apple platforms
- Kotlin with Android Views or Compose, OpenGL or Vulkan, AAudio or Oboe on Android

Questions:

- Does full native development provide meaningfully better touch and audio performance?
- How much musical logic can remain shared?
- What is the cost of maintaining separate interfaces?
- Can the same architecture extend to desktop, television and plug-ins?

#### Shared native core with platform-specific interfaces

A shared C++, Rust or other systems-language core may contain:

- music and instrument models
- real-time audio processing
- scheduling
- project format
- performance-event handling
- DSP
- synchronisation logic

Platform-specific layers may handle:

- UI
- touch
- haptics
- audio-device integration
- sensors
- operating-system lifecycle

Questions:

- Which language provides the strongest real-time guarantees, ecosystem and interoperability?
- How complex is the bridge between the shared core and each interface?
- Can one core support mobile, web through WebAssembly, desktop and plug-ins?
- What debugging and memory-safety trade-offs exist?

#### Flutter

Flutter should be evaluated for:

- multi-touch event quality
- custom rendering through Skia or Impeller
- frame consistency
- native audio integration
- platform-channel overhead
- desktop and television support
- accessibility
- packaging and long-term maintenance

Research must determine whether Flutter should own the instrument surface or only non-real-time application screens.

#### React Native with the modern architecture

React Native should be evaluated for:

- direct event handling
- Fabric rendering
- JSI or native-module communication
- custom native views
- audio-thread separation
- performance under several simultaneous contacts
- platform-specific escape hatches
- desktop and television variants

The research must not assume JavaScript-driven UI is suitable for the critical instrument path without measurement.

#### Web application and Progressive Web App

A web architecture may use:

- TypeScript
- Pointer Events
- Canvas
- WebGL
- WebGPU
- Web Audio
- AudioWorklet
- WebAssembly
- Web MIDI where available
- WebRTC or WebTransport

Questions:

- Can supported browsers deliver acceptable touch-to-sound latency?
- How consistent is multi-touch across mobile and desktop browsers?
- What restrictions affect audio start, background audio, file access and Bluetooth or MIDI?
- Can one web implementation support installation as a PWA?
- Where are native wrappers required?
- Can the web version share the real-time core through WebAssembly?

The website version may remain strategically important even if the most demanding instrument path later uses native packaging.

#### JUCE, Qt or similar native cross-platform frameworks

Assess particularly for:

- audio and MIDI
- desktop applications
- professional plug-ins
- custom rendering
- mobile packaging
- licensing
- accessibility
- touchscreen support

A framework may be excellent for plug-ins and desktop production while not being the best choice for the consumer mobile interface.

#### Game engines

Unity, Godot or another game engine may be useful for:

- consoles
- mixed reality
- three-dimensional interfaces
- music games
- advanced visual experiences

Research should assess whether a game engine belongs only in specialist clients rather than the core phone instrument.

Potential concerns include:

- audio latency
- application size
- battery use
- native UI integration
- accessibility
- background audio
- plug-in compatibility

#### Desktop wrappers

Electron, Tauri and native desktop clients should be compared for non-real-time production interfaces.

Questions include:

- Can the wrapper host a shared native audio core safely?
- Is browser audio sufficient for the intended desktop mode?
- What memory and installation costs are acceptable?
- How will professional plug-ins communicate with the standalone application?

### 20.10 Touch and gesture research

Research must cover:

- operating-system touch APIs
- Pointer Events on the web
- coalesced and predicted events where supported
- touch cancellation
- palm rejection
- stylus input
- pressure and contact area
- simultaneous touch limits
- event timestamps
- high-refresh displays
- touch sampling rates
- input prediction
- gesture recognition without delaying raw input
- system navigation conflicts
- browser gesture suppression
- large-screen multi-user touch

Riffloom may require a custom input abstraction that records each contact independently and routes it directly to the relevant instrument model.

High-level gesture frameworks should be avoided in the critical path if they delay or combine events in a way that reduces musical control.

### 20.11 Rendering research

The instrument surface may require custom rendering rather than a tree of ordinary interface widgets.

Research should compare:

- native drawing systems
- Metal
- Vulkan
- OpenGL where still relevant
- Skia
- Canvas
- WebGL
- WebGPU
- custom compositor approaches

The rendering layer must support:

- many active touch indicators
- smooth moving strings, keys and controls
- high-refresh screens
- dynamic resizing
- large displays
- accessibility overlays
- low allocation and predictable frame times

The visual representation should be driven by instrument state but must not control sound timing.

### 20.12 Real-time audio architecture research

The audio study should compare:

- Core Audio and AVAudioEngine
- AAudio and Oboe
- Web Audio and AudioWorklet
- JUCE
- miniaudio
- CPAL
- Superpowered or other commercial options
- specialist synthesis and sampling engines

Research should determine:

- the preferred shared DSP language
- native API access requirements
- sample-rate handling
- buffer scheduling
- polyphony limits
- voice stealing
- sample streaming
- synthesis architecture
- effects processing
- spatial audio
- offline rendering
- recording
- plug-in reuse
- interruption recovery

The real-time audio thread should follow strict rules:

- no blocking locks
- no unbounded loops
- no file or network access
- no garbage-collection pauses
- no unpredictable allocation
- no logging that can block

### 20.13 Shared music engine and project model research

Likely platform-independent responsibilities include:

- musical time
- note and event representation
- instrument state
- arrangement
- editing operations
- project versioning
- automation
- rights and provenance metadata
- conversion between instruments
- collaboration operations
- deterministic playback

### 20.14 Networking and connected-session research

Evaluate:

- local network discovery
- Bonjour or mDNS
- direct peer connections
- WebRTC
- QUIC
- WebTransport
- secure WebSockets
- RTP-based media where appropriate
- clock synchronisation
- jitter buffers
- event scheduling
- distributed recording
- reconnect and state recovery
- hybrid peer and server architectures

Different transports may be used for:

- lightweight musical events
- control messages
- voice chat
- preview audio
- final recording uploads
- project synchronisation

Internet sessions must support:

- low-latency regional live mode
- tempo-synchronised event mode
- collaborative overdubbing

### 20.15 AI and heavy-processing architecture

AI work must not interfere with real-time playing.

Research must separate:

- on-device inference
- background local inference
- self-hosted inference
- external model providers
- cloud rendering
- batch analysis

The architecture should support:

- job cancellation
- progress
- retries
- model replacement
- provider routing
- provenance
- cost control
- privacy choices
- offline fallbacks
- lower-quality previews
- professional final rendering

AI output should enter the project through structured operations rather than modifying files or tracks without traceable history.

### 20.16 Professional integration research

Assess support for:

- MIDI 1.0
- MIDI 2.0
- MPE
- MusicXML
- OSC
- Ableton Link where appropriate
- VST3
- Audio Unit and AUv3
- CLAP
- ARA
- AAX feasibility and licensing
- JACK or other professional routing on supported systems
- ASIO on Windows
- Core Audio
- professional audio interfaces
- timecode and tempo maps
- immersive audio exports

The study must determine whether standalone applications and plug-ins can share the same audio and music core.

### 20.17 Television, console and specialist-platform research

Consider:

- touch-enabled televisions
- standard television remotes
- phones as companion controllers
- game controllers
- controller haptics
- console platform approval
- application sandboxing
- large-screen layout
- living-room audio routes
- local multiplayer
- accessibility APIs

Console and television clients may require different technology from the phone client while sharing project and performance core.

### 20.18 Accessibility architecture research

The stack must make input methods replaceable.

The system should support a common action model driven by:

- touch
- mouse
- keyboard
- MIDI
- switch control
- eye gaze
- head tracking
- voice
- motion
- game controller
- external adaptive devices

Research should verify:

- screen-reader compatibility
- focus management
- scalable controls
- high contrast
- reduced motion
- haptic alternatives
- timing tolerance
- switch scanning
- platform accessibility APIs
- accessibility testing automation and manual review

### 20.19 Extension and marketplace safety

Future instruments, sounds and extensions must not compromise the audio engine or user data.

Research should compare:

- declarative instrument definitions
- sandboxed scripting
- WebAssembly modules
- signed native extensions
- isolated processes
- capability-based permissions
- content validation
- resource quotas

Third-party code should not run unrestricted on the real-time audio thread.

The extension format should declare:

- permissions
- CPU and memory expectations
- platform support
- network access
- file access
- licence
- source availability
- compatibility version

### 20.20 Security, privacy and rights architecture

The selected architecture must support:

- encrypted transport
- secure authentication
- session permissions
- private projects
- local-only creation
- controlled microphone access
- safe file imports
- extension sandboxing
- model and provider consent
- voice verification
- rights metadata
- contributor records
- deletion and export of personal data
- protection against malicious project files

A local network mode should not automatically expose a session to every device on the network.

### 20.21 Offline-first and resilience research

Core creation should continue when the internet is unavailable.

The architecture should define:

- local project storage
- local audio assets
- queued synchronisation
- conflict handling
- project recovery
- autosave
- crash-safe writes
- export without cloud dependency where practical
- optional cloud-only high-quality services

The application should never lose a performance because authentication expired or a network request failed.

### 20.22 Testing and device-lab strategy

Automated unit tests are not enough for musical interaction.

Research must define tests for:

- touch count
- event ordering
- event cancellation
- audio scheduling
- DSP correctness
- project determinism
- latency
- frame time
- CPU and memory
- battery and thermal behaviour
- network jitter
- distributed recording alignment
- accessibility
- file compatibility
- plug-in validation

A representative device matrix should include:

- lower-cost Android phones
- modern flagship Android phones
- several iPhone generations
- tablets
- high-refresh devices
- touchscreen Windows laptops
- macOS computers
- large external touchscreens
- common browsers
- Bluetooth and wired audio routes
- external audio interfaces
- MIDI controllers

Physical measurement may require:

- high-speed cameras
- loopback audio
- contact sensors
- automated touch rigs
- network impairment tools
- long-duration stress runs

### 20.23 Observability and production diagnostics

The production system should collect useful diagnostics without affecting performance or compromising privacy.

Research should define:

- crash reporting
- audio-underrun counters
- frame-time metrics
- missed-input diagnostics
- device capability reports
- network-quality measurements
- session recovery logs
- export-job tracing
- privacy-preserving analytics

Real-time threads should record lightweight counters into non-blocking buffers rather than writing logs directly.

### 20.24 Build, release and update architecture

Research should assess:

- monorepo versus multiple repositories
- shared-core builds
- reproducible audio builds
- continuous integration
- device testing
- code signing
- app-store delivery
- PWA deployment
- desktop installers
- television packaging
- plug-in packaging
- staged releases
- crash rollback
- data migrations
- extension compatibility

Updates must not make existing projects or purchased instruments unusable.

### 20.25 Licensing and open-source constraints

Technology choices must be reviewed for:

- source licence compatibility
- commercial redistribution
- app-store rules
- plug-in distribution
- patent exposure
- model licences
- codec licences
- sample and sound-library rights
- console SDK restrictions
- requirements for publishing modifications

A technically strong dependency may still be unsuitable if its licence prevents the intended open-source and commercial model.

### 20.26 Technology research deliverables

The technology-stack study should produce:

1. A product requirement and performance-budget document.
2. A comparison matrix for each architecture family.
3. Small reference implementations of the piano and guitar critical paths.
4. Measured touch, rendering and audio results on representative devices.
5. A networking prototype for local ensemble sessions.
6. A project-format and shared-core prototype.
7. A professional-integration feasibility report.
8. A licensing and dependency audit.
9. A recommended target architecture.
10. A documented second-best alternative.
11. Architecture Decision Records explaining major choices.
12. A staged migration plan from the current prototypes.
13. A risk register covering unresolved platform limitations.

### 20.27 Proposed technology research sequence

#### Stage 1: Define measurable requirements

- finalise benchmark scenarios
- select baseline devices
- define latency and stability thresholds
- define required platforms for the first production release

#### Stage 2: Build critical-path prototypes

For each serious candidate, implement only enough to test:

- raw multi-touch
- instrument state
- low-latency sound
- visual feedback
- recording
- sustained stress

#### Stage 3: Test shared-core options

- compare C++, Rust and other credible systems approaches
- test native and WebAssembly integration
- measure bridge overhead
- test deterministic project playback

#### Stage 4: Test collaboration and persistence

- local device discovery
- shared clock
- event transport
- distributed recording
- crash recovery
- offline synchronisation

#### Stage 5: Test professional expansion

- MIDI and MPE
- desktop host
- plug-in proof of concept
- external audio interface
- structured export

#### Stage 6: Select and document architecture

- compare measured results
- reject unsuitable options explicitly
- select the production stack
- define platform-specific exceptions
- produce the migration roadmap

### 20.28 Technology decision principle

The chosen stack should optimise the complete product rather than the convenience of one development team or one platform.

The likely answer may be a layered system, for example:

- a shared real-time music and audio core
- platform-specific low-latency adapters
- one or more interface technologies selected by product surface
- a web implementation using shared logic where practical
- separate specialist clients for plug-ins, consoles or spatial experiences

This is only an architectural hypothesis. Research must measure and validate it before it becomes the production decision.

## 21. Overall product development sequence

The vision is large, so every phase should create a genuinely useful product rather than only infrastructure for a later phase.

### Phase 1: Validate screen-native instruments

- complete reliable prototypes for priority instrument families
- validate touch, audio, latency and expressive controls on real devices
- separate instrument models, sound engines and interfaces cleanly
- test with beginners, musicians and lower-cost devices

### Phase 2: Create the shared project foundation

- define the common music and project format
- add recording, playback and project saving
- add basic multitrack overdubbing
- add simple timeline editing and mixing
- preserve structured performance events

### Phase 3: Add voice, rhythm and living notation

- humming to editable notes
- basic pitch and timing clean-up
- instrument conversion
- beatbox or tapped rhythm capture
- readable notation from native Riffloom performances
- MusicXML import and export
- manual correction tools

### Phase 4: Add connected local creation

- local session discovery
- shared tempo and transport
- event synchronisation
- separate participant tracks
- distributed local recording
- personal monitoring

### Phase 5: Add professional output

- high-quality rendering
- stems and MIDI export
- tempo, key and notation data
- scores and individual parts
- standard and production export packages
- initial paid-export workflow

### Phase 6: Expand creative intelligence

- instrument-specific arrangement
- accompaniment generation
- remixing
- section development
- track-level AI regeneration
- adaptive learning
- mixing and mastering assistance

### Phase 7: Expand platform ecosystem

- full web and desktop versions
- cross-device synchronisation
- internet collaboration modes
- television and controller modes
- studio integrations
- professional plug-ins
- game-console exploration

### Phase 8: Open the wider ecosystem

- instrument builder and SDK
- creator marketplace
- adaptive game and media packages
- interactive releases
- advanced rights and contribution systems
- live stage and visual control

The exact sequence will change when prototypes reveal technical constraints, user demand or shared dependencies.

## 22. Immediate research and specification priorities

The next major planning and technical work should include:

1. Complete the production technology-stack research defined in this document.
2. Define the formal Riffloom project format and musical data model.
3. Define measurable latency, multi-touch and stability budgets.
4. Establish instrument-family validation tests on representative real devices.
5. Define the first production product boundary and supported platforms.
6. Define the professional export packages and cost model.
7. Define the open-source governance and hosted-service boundary.
8. Define rights, provenance and contributor records before public remixing or marketplaces.
9. Build a local connected-session proof of concept.
10. Build a living-notation proof of concept generated from native Riffloom performance data.

## 23. Product boundaries

Riffloom should not become:

- a generic miniature copy of Ableton, Logic or another desktop DAW
- a static sheet-music viewer
- a falling-note game that never teaches musical understanding
- a generator that hides musical structure
- a service where every edit regenerates a complete song
- a product dependent on one AI provider
- a platform designed primarily to imitate artists without consent
- a system promising perfect live internet jamming across arbitrary distances
- a medical product without evidence and governance
- an open remix marketplace without reliable rights and attribution
- a hardware company before software demand is proven
- an extension platform where third-party code can interrupt real-time audio
- a closed system that prevents professional export
- a subscription wall around ordinary musical creation

## 24. Canonical product definition

Riffloom is a cross-platform musical creation system that begins with expressive, screen-native instruments.

It lets a person capture musical intention through touch, voice, rhythm, movement, notation, imported material, collaboration or AI. It preserves that intention as structured and editable music, helps the person develop and learn it across instruments, supports group creation across devices and prepares a professionally usable result when the work is ready.

The app remains free for creation. Revenue comes from delivering production-quality outputs and professional services that provide clear value beyond what a user could capture through ordinary playback or recording.

## 25. Document maintenance

This file is the single source of truth for Riffloom product planning.

Future updates should:

- edit this document rather than create parallel planning modules
- preserve reasoning behind major decisions
- distinguish committed direction from optional research ideas
- update instrument status and build order when prototypes change
- keep implementation-specific prototype documentation separate
- record rejected options and the evidence behind rejections
- maintain clear links between product goals, architecture decisions and validation results
