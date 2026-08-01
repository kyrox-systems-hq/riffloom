# Riffloom Product Plan Module: Connected Ensemble Sessions

**Status:** Living product plan module  
**Version:** 0.1  
**Serial:** RFL-PP-COLLAB-260801-2005-01  
**Last updated:** 1 August 2026  
**Relationship:** This module expands the multitrack, connected-device and collaborative-performance direction in [`PRODUCT-PLAN.md`](PRODUCT-PLAN.md) without replacing or restructuring the main document.

## Purpose

Riffloom should allow several people, using separate installed copies of the app on separate devices, to join one shared musical session and play different instruments together.

A session may operate:

- over the same local network
- through a direct nearby connection where supported
- over the internet
- through a combination of local and remote devices

Each participant may use a phone, tablet, computer, television, console or other supported device. Every device should be able to contribute a different instrument, control surface or production role while remaining part of one project.

The product should make joining a musical session feel closer to entering a room and picking up an instrument than configuring a technical network system.

## 1. Core experience

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

## 2. Session types

### 2.1 Local ensemble session

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

### 2.2 Internet ensemble session

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

One participant records a part, and another person records against it from a different location. Riffloom automatically aligns the new take with the shared project.

This mode should still feel collaborative, with presence indicators, comments, live listening and rapid handover between performers.

### 2.3 Hybrid session

Several people may be together on a local network while one or more additional participants join remotely.

The local group should remain tightly synchronised. Remote participants may use low-latency, tempo-synchronised or overdub mode depending on their connection.

## 3. Device roles

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
- one phone serving as a microphone while another phone controls the vocal effects

A participant should be able to switch roles without leaving the session.

## 4. Host and session control

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

Permissions should be simple by default but detailed controls should be available for professional or public sessions.

## 5. Joining and identity

Joining should be fast.

A participant should be able to:

1. open an invitation or scan a QR code
2. join with an account or temporary guest identity
3. choose an available instrument or role
4. complete a brief connection and audio check
5. hear the shared count-in
6. begin playing

The session should show:

- participant name
- assigned instrument
- connection quality
- microphone or instrument status
- whether the participant is recording
- whether their track is muted or soloed
- whether they are currently active

Guest participation may be allowed without forcing account creation, although saving ownership and long-term project access may require an account.

## 6. Shared musical state

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

## 7. Event transmission and local rendering

When participants use Riffloom's own digital instruments, the most efficient approach may often be to transmit musical events rather than continuously streaming each device's audio.

For example, a phone playing the Riffloom piano may send:

- note
- velocity
- timing
- sustain state
- articulation
- expression
- instrument configuration

Other devices or the session hub can then reproduce the performance using the same sound engine.

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

The system should support both event-based and audio-based tracks inside the same session.

## 8. Audio monitoring

Participants need clear control over what they hear.

Each device should be able to create a personal monitor mix without changing the main session mix.

A performer may choose to hear:

- the full group
- only selected instruments
- themselves more loudly
- a metronome
- a count-in
- a guide track
- an AI accompaniment
- no local playback of their own instrument where direct monitoring is available

The app should help prevent feedback when several devices are in the same room.

Possible protections include:

- headphone recommendations
- automatic microphone suppression
- identifying nearby devices playing the same mix
- host-controlled speaker mode
- one designated room speaker or output device
- echo cancellation where appropriate

## 9. Recording model

Every participant's performance should be recorded separately where possible.

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

This allows the group to experience live collaboration without limiting the final production to the quality of the live network stream.

## 10. Latency and honest product behaviour

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

## 11. Shared arrangement and production

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

Concurrent edits should be handled without silently overwriting another participant's work.

## 12. AI inside connected sessions

AI can support group sessions without replacing the performers.

Possible uses include:

- filling an unoccupied instrument role
- following the group's tempo and harmony
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

## 13. Television and shared-room mode

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

## 14. Public, educational and professional uses

Connected sessions may support:

### Friends and casual creation

Several people join from their own phones and create music together without owning physical instruments.

### Bands and remote collaborators

Band members rehearse, write, record and exchange takes from different locations.

### Music education

A teacher hosts a session, assigns instruments, hears each student separately and controls the shared tempo or exercise.

### Live performance

Performers use several devices as instruments and controllers while one system records and mixes the show.

### Studios and producers

A producer controls the arrangement and mix while musicians contribute from separate devices or locations.

### Games and social experiences

Players use phones or game controllers to perform different musical roles together through a television or console.

## 15. Privacy and security

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

## 16. Project ownership and contributor rights

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

## 17. Failure recovery

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

## 18. Initial product scope

The first useful connected-session version should focus on local networks.

It should allow:

1. one device to create a session
2. other devices on the same network to discover or join it
3. each participant to choose piano, guitar or another available role
4. all devices to follow one shared tempo and transport
5. note and performance events to be exchanged in real time
6. each instrument to appear as a separate track
7. the session to record a shared performance
8. the project to be saved and replayed

The initial version does not need advanced remote audio streaming, public rooms or professional permission systems.

## 19. Development sequence

### Phase 1: Local event synchronisation

- local session discovery
- QR code and short-code joining
- shared clock, tempo and transport
- event transmission between Riffloom instruments
- separate participant tracks
- basic connection status

### Phase 2: Local recording and monitoring

- central and distributed recording
- personal monitor mixes
- local high-quality source capture
- automatic alignment
- room-speaker and headphone modes

### Phase 3: Internet project collaboration

- invited online sessions
- shared project state
- live presence
- comments
- collaborative overdubbing
- reliable upload and conflict handling

### Phase 4: Internet performance modes

- connection measurement
- regional low-latency mode
- tempo-synchronised mode
- hybrid local and remote sessions
- adaptive latency compensation

### Phase 5: Expanded devices and professional workflows

- television shared-room mode
- console controllers
- external MIDI and audio hardware
- studio routing
- advanced permissions
- professional contributor and export records

## 20. Architectural direction

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

## 21. Product principle

The purpose of connected sessions is not merely to let several devices play sound at once.

It is to make several people feel that they are inside the same musical project, with each person contributing a real instrument or production role, regardless of whether they are sitting together or connecting remotely.
