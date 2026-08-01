# Riffloom Product Plan Module: AI Music Generation

**Status:** Living product plan module  
**Version:** 0.1  
**Serial:** RFL-PP-AI-260801-1950-01  
**Last updated:** 1 August 2026  
**Relationship:** This module expands Section 8 of [`PRODUCT-PLAN.md`](PRODUCT-PLAN.md) without replacing or restructuring the main document.

## Purpose

This document defines how Riffloom should use modern AI music generation.

The opportunity is much larger than adding a prompt box that creates a complete song. Riffloom should use generative systems throughout the creative process, while preserving the user's musical identity, recordings, decisions and control.

The strategic position is:

> The user creates the musical identity. AI helps develop, perform, arrange, remix and produce it.

Riffloom should be a human-first generative music system rather than another service where the user types a description and receives a largely finished, inaccessible audio file.

## 1. Product position

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

The AI may then help expand, arrange, transform or produce that material.

Prompt-only generation may still be available, but it should not define the product. Riffloom's advantage should come from combining generative models with structured musical information, playable digital instruments, multitrack projects and precise user control.

## 2. Generate around the user's work

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

## 3. AI actions at every level

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

## 4. Locks and creative boundaries

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
- the user's original recording

Examples include:

- keep the melody and replace everything underneath it
- keep the drums and rewrite the bass
- preserve the first four bars
- change only the chorus
- keep every human recording unchanged
- generate three alternatives for one guitar fill

These controls are central to Riffloom's differentiation. The user should decide the scope of AI intervention instead of repeatedly regenerating an entire song.

## 5. AI session musicians

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

## 6. Live generative accompaniment

Riffloom should eventually support AI that responds while the user is playing.

Possible experiences include:

- a drummer following a live piano performance
- a bass player adapting when the user changes chords
- an AI instrument answering each musical phrase
- an accompaniment becoming denser or quieter through touch controls
- several people playing Riffloom instruments while AI fills missing roles
- an endless responsive backing track for improvisation or practice
- a television showing the shared performance while phones act as instruments
- game controllers changing energy, arrangement or instrumentation during playback

Live generation should prioritise responsiveness, musical stability and clear user control over maximum complexity.

## 7. Generated audio to editable music

One of Riffloom's most important long-term capabilities should be converting generated or imported audio into a structured, editable project.

The intended flow is:

**Generated audio -> separated parts -> detected notes, chords and rhythm -> instrument-specific performance data -> editable Riffloom project**

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

## 8. Intelligent remixing

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
- rebuild an unfinished project using the user's more recent musical direction

Remixing permissions must follow the project's sharing, attribution and commercial-use settings.

## 9. Personal musical identity

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

The user could then request:

> Arrange this new melody in a way that sounds consistent with my own work.

Possible applications include:

- maintaining a consistent album sound
- creating a shared model for a band
- maintaining a film or game's sonic identity
- developing a private producer or arranger profile
- preserving a company's audio branding

Any personal model must use material the user owns or has explicit permission to use. It must remain private unless the user deliberately shares it.

## 10. Sound and instrument generation

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

## 11. Voice and singing

After the user creates an instrumental composition, Riffloom may help develop vocals.

Potential features include:

- generating a temporary guide vocal
- fitting the user's lyrics to a melody
- suggesting alternative vocal melodies
- correcting pitch and timing
- generating backing harmonies
- turning humming into a vocal line
- translating lyrics and adapting their phrasing
- generating a performance using the user's own verified voice
- removing noise from a human recording
- replacing a temporary generated vocal with a final human performance

Voice replication requires explicit consent, strong verification and clear labelling. Riffloom should not recreate another person's voice without permission.

## 12. AI as a music teacher

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

## 13. AI-assisted production and export

AI should also strengthen the paid professional export rather than stopping at composition.

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

## 14. Product interaction model

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

## 15. Structured generation and audio generation

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

## 16. Model and provider architecture

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
- the user's export requirements

Projects should remain portable even when the underlying provider changes.

## 17. Free creation and paid generation quality

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

## 18. Rights, consent and provenance

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

## 19. Initial priority features

The first five AI product priorities should be:

1. **Generate accompaniment around a hummed or played loop.**
2. **Regenerate or transform one selected track or section without changing the rest.**
3. **Continue a musical idea and provide several editable variations.**
4. **Convert generated audio into an editable Riffloom project.**
5. **Prepare a final professional arrangement and export package.**

These priorities use Riffloom's strongest assets: user performance, structured projects, playable instruments and professional export.

## 20. AI opportunity backlog

The following backlog provides an initial catalogue of fifty potential AI operations. It is not a fixed roadmap.

### Capture and repair

1. Detect notes from humming.
2. Detect rhythm from beatboxing.
3. Separate melody and rhythm from one vocal recording.
4. Correct slightly inaccurate pitch.
5. Tighten timing without removing natural expression.
6. Remove noise from microphone recordings.
7. Separate an imported recording into useful stems.
8. Recover tempo, key, chords and song sections from audio.

### Composition and development

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

### Arrangement and instrumentation

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

### Performance and playability

29. Humanise rigid MIDI.
30. Add dynamics and articulation.
31. Simplify a guitar part.
32. Simplify a piano part.
33. Create an advanced version of a basic part.
34. Map generated guitar notes to practical strings and frets.
35. Divide a piano arrangement between two hands.
36. Generate a responsive live accompaniment.

### Remixing and adaptation

37. Reharmonise while preserving the melody.
38. Replace only one instrument.
39. Replace only one section.
40. Generate alternative choruses.
41. Create a stripped-back live version.
42. Create an extended version.
43. Create short versions for video or social media.
44. Combine permitted elements from two user-owned projects.

### Voice, production and export

45. Generate a guide vocal.
46. Generate backing harmonies.
47. Fit lyrics to an existing melody.
48. Balance and clean the final mix.
49. Generate notation, tablature and MIDI from the project.
50. Prepare a labelled professional export package with masters and stems.

## 21. Non-goals and product boundaries

Riffloom should not become:

- a generator that hides the musical structure from the user
- a service where every edit requires regenerating a complete song
- a product that removes the user's original performance by default
- a closed system that prevents export to professional tools
- a platform dependent on one AI provider
- a tool primarily designed to imitate artists without consent
- a subscription wall around ordinary musical creation

The desired outcome is a system where people can contribute as much or as little technical performance as they are capable of, while retaining authorship, understanding and control over the resulting music.

## 22. Integration with the main product plan

This module should be treated as the detailed extension of Section 8 in the main product plan.

The main plan should retain its concise overview. This file can evolve independently as AI capabilities, product priorities and provider options change. Future updates should avoid duplicating or restructuring unrelated sections of the main product plan.
