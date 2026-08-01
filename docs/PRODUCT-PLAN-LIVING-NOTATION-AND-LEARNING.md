# Riffloom Product Plan Module: Living Notation and Adaptive Learning

**Status:** Living product plan module  
**Version:** 0.1  
**Serial:** RFL-PP-NOTATION-260801-2049-01  
**Last updated:** 1 August 2026  
**Relationship:** This module expands the notation, performance, education and instrument-interface direction in [`PRODUCT-PLAN.md`](PRODUCT-PLAN.md) without replacing or restructuring the main document.

## Purpose

Riffloom should integrate musical notation as a live, editable and bidirectional part of the product.

Traditional sheet music remains essential because it gives musicians a compact shared language for pitch, rhythm, harmony, articulation, dynamics and ensemble coordination. However, Riffloom should not reproduce a static paper score on a screen and stop there.

The score should be one interactive view of the same structured musical project that also powers:

- the digital instrument
- the multitrack timeline
- playback
- recording
- falling or approaching learning guidance
- instrument-specific fingering
- AI arrangement and teaching
- collaborative ensemble sessions
- professional export

A change made in any one of these views should update the others immediately wherever the underlying musical information is shared.

The core principle is:

> A Riffloom score is not a picture of the music. It is a live interface into the music.

## 1. Core product direction

Riffloom should support the full notation cycle:

1. Create notation from a blank project.
2. Generate notation from music performed or created in Riffloom.
3. Import notation from standard digital formats.
4. Scan printed or handwritten material where recognition is practical.
5. Transcribe suitable audio into editable symbolic music.
6. Play the score through Riffloom instruments and sound engines.
7. Learn the score through notation, instrument-native guidance or a combination.
8. Edit, arrange, simplify, transpose and remix the score.
9. Assign parts to different people and devices.
10. Export professional notation alongside audio, stems and performance data.

Notation should therefore serve composers, learners, teachers, performers, arrangers, collaborators and producers rather than being a separate specialist feature.

## 2. The unified music model

The notation layer must sit above the shared Riffloom music model rather than maintain a disconnected copy of the composition.

The shared model should distinguish between at least four related forms of information:

### 2.1 Musical intention

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

### 2.2 Performance interpretation

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

### 2.3 Audio realisation

This includes:

- recorded audio
- rendered instrument audio
- effects
- mixing
- spatial placement
- mastering

### 2.4 Presentation

This describes how the same music is shown to a person:

- standard staff notation
- tablature
- chord symbols
- lead sheet
- percussion notation
- piano-roll view
- falling or approaching guidance
- instrument-surface guidance
- finger numbers
- pitch names
- rhythm counts
- colour and accessibility overlays

These layers must remain connected without being confused. A score is not identical to a performance, and a performance is not identical to an audio recording.

## 3. Ways to create notation

### 3.1 Compose from a blank score

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

The editor should support both fast beginner entry and precise professional editing.

### 3.2 Generate notation from a Riffloom performance

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

The original performance data should remain preserved even when the visible notation is simplified.

### 3.3 Generate notation from humming or singing

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

### 3.4 Generate notation from beatboxing or tapping

Beatboxing and tapping may produce:

- percussion notation
- rhythm-only staves
- drum patterns
- articulation cues
- accent patterns
- strumming patterns
- rhythmic guidance for another melody

### 3.5 Generate a score through AI

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

A user should be able to ask for requests such as:

- create an eight-bar beginner piano study in D minor
- create a guitar exercise focused on bends and slides
- create a two-part classroom piece where both parts are equally difficult
- create a sight-reading exercise at my current level
- create a bassline beneath this melody
- create a complete score around my hummed chorus

## 4. Importing existing notation

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

## 5. Optical music recognition

Riffloom should eventually allow a user to photograph or scan printed notation and convert it into structured music.

The experience should assume recognition will sometimes be imperfect.

A safe workflow is:

1. Import the image or PDF.
2. Detect pages, staves, systems and symbols.
3. Produce a provisional score.
4. Highlight uncertain or conflicting regions.
5. Let the user compare the source image with the reconstructed notation.
6. Play suspicious measures for quick checking.
7. Offer likely correction options.
8. Save both the source and corrected symbolic version.

The system should never imply that complex optical recognition is infallible.

Potential uses include:

- digitising old sheet music
- turning a teacher's printed score into an interactive lesson
- importing music bought or licensed elsewhere
- preserving historical or regional notation
- converting rehearsal material into a shared ensemble session

## 6. Audio-to-score transcription

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

The resulting score should carry confidence information. The user should be able to hear each proposed note against the source audio and correct it quickly.

Audio transcription should be strongest for:

- solo voice
- solo instruments
- simple arrangements
- separated stems
- clean recordings
- music already created within Riffloom

It should not promise perfect orchestral transcription from every recording.

## 7. The living score

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

## 8. Multiple synchronised views

The same passage should be viewable through several synchronised representations.

### 8.1 Standard notation

Full staff notation for musicians who read scores.

### 8.2 Simplified notation

A reduced view containing only the information required at the learner's current level.

Possible simplifications include:

- pitch names
- rhythm counts
- colour coding
- fewer markings
- chord-only view
- melody-only view
- one hand or one voice at a time
- enlarged spacing

### 8.3 Falling or approaching guidance

Time should be represented spatially so the user can see what to play next and for how long.

This is inspired by existing falling-note systems, but Riffloom should not copy a generic piano roll onto every instrument.

### 8.4 Instrument-native guidance

The actual Riffloom instrument should display:

- where to touch
- when to touch
- how long to hold
- how strongly to play
- which gesture to use
- which hand or finger is intended
- where the following movement will go

### 8.5 Timeline view

A production-oriented view showing clips, tracks, sections and automation.

### 8.6 Performance comparison

A view showing the intended music against what the learner actually played.

### 8.7 Hybrid views

The user should be able to combine representations, such as:

- notation above the instrument
- notation beside an approaching-path view
- notation with fingerboard or keyboard animation
- notation with waveform and real recording
- notation with teacher video
- notation with ensemble parts

All views should use one playback cursor and one musical clock.

## 9. Riffloom's improved time-guidance system

The common falling-note model shows pitch and duration effectively, but it can encourage users to follow shapes without learning musical structure.

Riffloom should build a richer system that combines immediate playability with gradual musical understanding.

The guidance should communicate:

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

A note may appear as an approaching path or ribbon whose:

- destination shows where to play
- arrival shows when to play
- length shows duration
- width or intensity shows dynamics
- shape shows articulation
- trajectory shows slides, bends or movement
- grouping shows chords or phrases

The view should teach the relationship between the visual guidance and standard notation rather than permanently replacing notation.

## 10. Progressive notation learning

A learner should be able to move through several visual stages.

### Stage 1: Direct instrument guidance

The interface shows exactly where and when to play.

### Stage 2: Guidance plus note names and rhythm counts

The learner begins connecting actions to musical labels.

### Stage 3: Guidance plus standard notation

The notation remains visible and highlights in synchronisation with the instrument.

### Stage 4: Reduced guidance

The system removes some visual assistance but retains correction and timing feedback.

### Stage 5: Notation-first practice

The user reads the score while the instrument provides feedback only after mistakes or on request.

### Stage 6: Independent performance

The user performs without advance visual guidance, then receives a detailed review.

The learner should be able to move backwards or forwards rather than being forced into one path.

## 11. Piano learning on the Riffloom interface

The piano learning view should be designed around Riffloom's own keyboard layout rather than assuming a traditional single-row physical keyboard.

Potential features include:

- notes approaching the exact displayed keys
- clear routing between the three keyboard rows
- separate left-hand and right-hand paths
- chord shapes arriving as connected groups
- finger-number suggestions
- hand-position zones
- pedal lanes for sustain, sostenuto and soft controls
- velocity guidance
- legato and staccato shapes
- early indication of large hand movements
- optional standard keyboard projection for transferable learning
- a mode that teaches how the same music maps to a physical piano

The system should distinguish between learning to perform on the Riffloom piano and learning a piece that will later be played on a physical piano.

## 12. Guitar learning on the Riffloom interface

The guitar learning view should represent both hands and the expressive techniques that ordinary note highways often omit.

It should show:

- target string and fret
- alternative playable positions
- left-hand fingering
- chord formation before the strum
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

The visual system may use separate but synchronised lanes for:

- fretting hand
- picking or strumming hand
- rhythm
- technique
- standard notation
- tablature

The user should be able to choose whether the lesson teaches the Riffloom guitar interface, a physical guitar or both.

## 13. Other instrument learning views

Each instrument should receive a native visual language.

Examples include:

- bass string and fret paths
- drum-pad arrivals and limb assignments
- bow direction and fingerboard position for strings
- valve combinations for brass
- slide position for trombone
- breath and fingering for wind instruments
- mallet paths for percussion
- chord and bellows guidance for accordion-like instruments

The platform should provide shared timing and feedback components while allowing instrument-specific teaching modules.

## 14. Practice modes

Riffloom should support several practice modes.

### Preview mode

The app demonstrates the whole passage.

### Wait mode

Playback pauses until the correct action is performed.

### Rhythm mode

Pitch is simplified or supplied automatically while the learner focuses on timing.

### Pitch mode

Timing is relaxed while the learner focuses on correct notes.

### Hand or part isolation

The app supplies other hands, voices or instruments.

### Loop mode

A selected passage repeats automatically.

### Speed ramp

The tempo increases gradually after successful repetitions.

### Mistake repair

The system creates a short exercise around the exact mistake.

### Sight-reading mode

The learner receives unfamiliar material at an appropriate difficulty and cannot preview it indefinitely.

### Memory mode

Parts of the guidance or notation disappear progressively.

### Performance mode

The music continues and the user must recover from mistakes rather than stopping.

### Ensemble mode

The learner performs one part while Riffloom, AI or other users perform the rest.

## 15. Real-time performance feedback

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

Feedback should distinguish between errors that matter musically and harmless expressive variation.

The user should receive:

- immediate feedback when useful
- a post-performance overview
- highlighted difficult measures
- trend data across repeated attempts
- clear recommended next practice steps

## 16. Adaptive learning system

The system should maintain a skill model for the learner.

It may track competence in areas such as:

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

Riffloom should then adapt:

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

## 17. AI teacher and notation assistant

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
- create a lesson from the user's own composition
- create a sight-reading exercise at a chosen level
- compare two interpretations
- suggest an efficient practice order
- translate notation terms
- answer questions about a selected note or measure

AI should point to the exact relevant musical events and produce structured changes that remain editable.

## 18. Playing a score through Riffloom

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

## 19. Ensemble and classroom notation

Connected sessions should support shared notation.

A conductor, teacher or session host should be able to:

- view the full score
- distribute individual parts to each device
- send count-ins and rehearsal marks
- jump everyone to the same bar
- loop a section for the group
- adjust tempo
- mute or isolate sections
- annotate parts
- simplify one learner's part without changing the whole group
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

## 20. Collaborative score editing

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

## 21. Accessibility

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

## 22. International and alternative notation systems

The internal music model should not assume that every user works only with Western common notation and twelve-tone equal temperament.

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

Support should be developed with practitioners from the relevant traditions rather than imposed through automatic conversion alone.

## 23. Standards and interoperability

Riffloom should use established standards where practical.

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

## 24. Rendering and technical implications

The notation system will require dedicated technology research.

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

## 25. Transcription and correction architecture

The system should separate automatic recognition from user validation.

Every generated or recognised score element may need:

- confidence score
- source reference
- alternative interpretations
- correction history
- link to source audio or image
- indication of whether it was human-entered, performed, recognised or AI-generated

This provenance is important for reliability, rights, teaching and professional export.

## 26. Rights and licensing

Notation may carry copyright independent of the audio recording.

Riffloom should record:

- source of imported scores
- user declarations of ownership or permission
- public-domain status where known
- arrangement rights
- performer contributions
- AI-generated sections
- whether sharing, teaching, remixing or commercial export is allowed

Scanning or importing a score should not automatically make it distributable through the platform.

## 27. Professional export

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

## 28. Initial implementation sequence

### Phase 1: Score generated from native Riffloom performances

- generate simple notation from piano and guitar project data
- show playback cursor
- tap notes to hear and inspect them
- connect score events to instrument positions
- export basic MusicXML and PDF

### Phase 2: Interactive score and learning overlay

- standard notation and instrument-native guidance
- wait mode
- loop mode
- tempo control
- note and timing feedback
- hand or part isolation

### Phase 3: Score editor and import

- blank score creation
- MusicXML import
- MIDI import
- direct note editing
- transposition
- part management

### Phase 4: Advanced instrument teaching

- full piano hand and pedal guidance
- guitar fretting, picking, chords and techniques
- adaptive practice
- difficulty levels
- sight-reading and memory modes

### Phase 5: Recognition and transcription

- humming and solo-instrument transcription
- PDF and image recognition
- uncertainty and correction workflow
- audio-to-score for separated tracks

### Phase 6: AI composition and teaching

- structured score generation
- exercise generation
- adaptive lessons
- AI explanations
- automatic simplification and arrangement

### Phase 7: Ensemble and professional workflows

- connected score sessions
- conductor and classroom modes
- collaborative editing
- full part preparation
- professional notation export

## 29. First product priorities

The first five priorities should be:

1. **Generate a readable score from music created on Riffloom instruments.**
2. **Synchronise the score, playback and instrument interface.**
3. **Create a hybrid learning view combining notation with instrument-native time guidance.**
4. **Provide real-time note, timing and duration feedback.**
5. **Import and export MusicXML so Riffloom participates in existing notation workflows.**

These priorities create the foundation for later transcription, AI teaching, classroom use and professional scoring.

## 30. Differentiation

Existing systems already demonstrate useful parts of the opportunity:

- falling-note guidance lowers the entry barrier
- interactive scores can synchronise notation with recordings
- learning apps can listen and provide immediate accuracy feedback
- notation standards allow scores to move between applications
- optical recognition can convert printed music into editable symbolic data
- audio transcription can recover notes from voice and instruments

Riffloom's opportunity is to combine these capabilities around its own playable instruments, structured projects, AI tools and connected sessions.

The differentiating experience should be:

> Create the music in any form, see it as notation, understand it through guided visualisation, play it on the instrument, change it from any view and carry the same structured work into collaboration or professional production.

## 31. Product boundary

Riffloom should not become only:

- a static sheet-music viewer
- a generic notation editor copied from desktop software
- a falling-note game that never teaches musical understanding
- a learning app restricted to a fixed song catalogue
- an audio transcription service that hides uncertainty
- a notation system disconnected from performance and production

The desired outcome is one living musical system in which composition, notation, performance, learning and production continuously reinforce one another.

## 32. Research basis

This direction is informed by current systems and standards that establish the baseline Riffloom should exceed:

- The W3C Music Notation Community Group maintains MusicXML and SMuFL and is developing MNX for broader web, desktop and mobile notation use cases.
- MusicXML 4.0 is an established score-interchange format used across notation applications.
- Soundslice demonstrates interactive notation synchronised with audio and video, responsive layouts, looping, transposition and instrument visualisations.
- Synthesia demonstrates the accessibility of falling-note guidance, wait mode, hand isolation and optional simultaneous sheet music.
- Yousician and flowkey demonstrate real-time listening, instant feedback and structured learning paths.
- Piano Marvel demonstrates adaptive sight-reading assessment and detailed practice feedback.
- Verovio and OpenSheetMusicDisplay demonstrate open-source browser-capable notation rendering.
- Audiveris demonstrates both the value and limits of optical music recognition, including the need for human correction.
- Spotify Basic Pitch demonstrates lightweight audio-to-MIDI transcription for voice and instruments.

These products validate individual components. Riffloom should connect them through one structured, instrument-aware and cross-platform music model.
