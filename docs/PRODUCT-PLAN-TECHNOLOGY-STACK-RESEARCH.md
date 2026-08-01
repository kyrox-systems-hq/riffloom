# Riffloom Product Plan Module: Technology Stack Research Brief

**Status:** Research required, no production stack selected  
**Version:** 0.1  
**Serial:** RFL-PP-TECH-260801-2030-01  
**Last updated:** 1 August 2026  
**Relationship:** This module defines the research required before selecting the production architecture for Riffloom. It does not make the final technology decision.

## Purpose

Riffloom needs a deliberately selected production technology stack.

The current prototypes are useful for validating interaction ideas, but a production musical instrument has requirements that ordinary application frameworks may not satisfy automatically.

The final system must respond immediately to touch, handle several simultaneous contacts, produce reliable low-latency audio, remain stable under sustained performance and work across a wide range of screens and devices.

The stack must also support the wider product direction, including:

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

## 1. Research objective

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

## 2. Non-negotiable product characteristics

### 2.1 Touch must feel directly connected to sound

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

### 2.2 Multi-touch must be first-class

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

### 2.3 Audio must not depend on the visual frame rate

The audio engine must continue reliably even if:

- the interface misses a frame
- a visual animation becomes complex
- the operating system pauses background work
- the network connection changes
- a project is being saved
- another thread performs AI or file processing

Real-time audio work must not allocate memory unpredictably, wait for locks, perform network requests or depend on the main interface thread.

### 2.4 The product must degrade gracefully

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

### 2.5 Cross-platform must not mean lowest-common-denominator

The project should share musical logic, project data and as much infrastructure as practical.

However, the stack must allow platform-specific code where required for:

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

## 3. Provisional performance targets to validate

These are research and prototype targets, not final guarantees. The research must confirm realistic thresholds across representative hardware.

### 3.1 Input and rendering

Candidate targets include:

- stable 60 frames per second on supported baseline devices
- support for 90 Hz, 120 Hz or higher refresh where available
- no missed supported touch contacts during ordinary performance
- support for at least ten simultaneous contacts where the operating system and hardware expose them
- immediate visual feedback on the next available frame
- gesture-state processing that does not block rendering or audio
- no accidental page scrolling, text selection, browser zooming or system navigation during instrument performance
- predictable behaviour when touches enter, leave, cancel or move between regions

### 3.2 Audio

Candidate targets include:

- local touch-to-sound latency that feels suitable for musical performance
- a research goal of approximately 20 milliseconds or lower on capable modern devices
- documented fallback behaviour where hardware or operating-system limits make that target impossible
- stable output without audible glitches during sustained multi-touch playing
- sample-accurate scheduling inside the audio engine where supported
- no audible interruption while saving, drawing or receiving network events
- controlled recovery after route changes, headphone insertion, Bluetooth changes or audio interruptions

The research must report measured round-trip and output latency rather than relying only on requested buffer sizes.

### 3.3 Stability and resource use

Candidate targets include:

- sustained performance without memory growth
- controlled CPU use under maximum supported polyphony
- thermal stability during longer sessions
- acceptable battery use
- no real-time audio allocations or unbounded work
- graceful handling of device rotation, window resizing and application backgrounding
- recovery from audio-device changes without losing the project

## 4. Required benchmark scenarios

Every serious stack candidate should be tested through the same reference scenarios.

### Scenario A: Piano chord stress test

- many simultaneous notes
- rapid repeated chords
- sustain and sostenuto changes
- slides across keys
- visual feedback on every contact
- recording enabled

### Scenario B: Expressive guitar stress test

- one hand fretting several strings
- another hand picking or strumming
- simultaneous bends
- slides
- hammer-ons and pull-offs
- palm muting
- per-string audio processing

### Scenario C: Large-screen shared instrument

- several people touching a large touchscreen
- high contact count
- independent assigned regions
- orientation and window-size changes
- television or external-display rendering

### Scenario D: Multitrack session

- several instrument tracks playing
- one track recording
- waveform or note visualisation
- mixer controls moving
- project autosave
- no audio interruption

### Scenario E: Connected ensemble

- several devices on a local network
- shared clock and count-in
- event transport
- local monitoring
- distributed recording
- one device joining or leaving

### Scenario F: Professional integration

- MIDI and MPE input and output
- external audio interface
- sample-rate change
- plug-in or DAW connection
- stem and structured export

### Scenario G: Weak-device fallback

- baseline supported hardware
- reduced visual and synthesis settings
- background interruptions
- low memory
- thermal pressure
- network degradation

## 5. Architecture families to compare

The research should compare complete architecture families rather than isolated libraries.

### 5.1 Fully native mobile applications

Possible components include:

- Swift with UIKit, SwiftUI, Metal, Core Audio or AVAudioEngine on Apple platforms
- Kotlin with Android Views or Compose, OpenGL or Vulkan, AAudio or Oboe on Android

Questions to answer:

- Does full native development provide meaningfully better touch and audio performance?
- How much musical logic can remain shared?
- What is the cost of maintaining separate interfaces?
- Can the same architecture extend to desktop, television and plug-ins?

### 5.2 Shared native core with platform-specific interfaces

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

Questions to answer:

- Which language provides the strongest real-time guarantees, ecosystem and interoperability?
- How complex is the bridge between the shared core and each interface?
- Can one core support mobile, web through WebAssembly, desktop and plug-ins?
- What debugging and memory-safety trade-offs exist?

### 5.3 Flutter

Flutter should be evaluated for:

- multi-touch event quality
- custom rendering through Skia or Impeller
- frame consistency
- native audio integration
- platform-channel overhead
- desktop and television support
- accessibility
- packaging and long-term maintenance

The research must determine whether Flutter should own the instrument surface or only non-real-time application screens.

### 5.4 React Native with the modern architecture

React Native should be evaluated for:

- direct event handling
- Fabric rendering
- JSI or native-module communication
- custom native views
- audio-thread separation
- performance under several simultaneous contacts
- platform-specific escape hatches
- desktop and television variants

The research must not assume that JavaScript-driven UI is suitable for the critical instrument path without measurement.

### 5.5 Web application and Progressive Web App

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

Questions to answer:

- Can supported browsers deliver acceptable touch-to-sound latency?
- How consistent is multi-touch across mobile and desktop browsers?
- What restrictions affect audio start, background audio, file access and Bluetooth or MIDI?
- Can one web implementation support installation as a PWA?
- Where would native wrappers still be required?
- Can the web version share the real-time core through WebAssembly?

The website version may remain strategically important even if the most demanding instrument path later uses native packaging.

### 5.6 JUCE, Qt or similar native cross-platform frameworks

These should be assessed particularly for:

- audio and MIDI
- desktop applications
- professional plug-ins
- custom rendering
- mobile packaging
- licensing
- accessibility
- touchscreen support

A framework may be excellent for plug-ins and desktop production while not being the best choice for the consumer mobile interface.

### 5.7 Game engines

Unity, Godot or another game engine may be useful for:

- consoles
- mixed reality
- three-dimensional interfaces
- music games
- advanced visual experiences

The research should assess whether a game engine belongs only in specialist clients rather than the core phone instrument.

Potential concerns include:

- audio latency
- application size
- battery use
- native UI integration
- accessibility
- background audio
- plug-in compatibility

### 5.8 Desktop wrappers

Electron, Tauri and native desktop clients should be compared for non-real-time production interfaces.

Questions include:

- Can the wrapper host a shared native audio core safely?
- Is browser audio sufficient for the intended desktop mode?
- What memory and installation costs are acceptable?
- How will professional plug-ins communicate with the standalone application?

## 6. Touch and gesture research

The research must cover:

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

## 7. Rendering research

The instrument surface may require custom rendering rather than a tree of ordinary interface widgets.

The research should compare:

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

The visual representation should be driven by instrument state but must not control the timing of sound.

## 8. Real-time audio architecture research

The audio study should compare:

- Core Audio and AVAudioEngine
- AAudio and Oboe
- Web Audio and AudioWorklet
- JUCE
- miniaudio
- CPAL
- Superpowered or other commercial options
- specialist synthesis and sampling engines

The research should determine:

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
- no garbage collection pauses
- no unpredictable allocation
- no logging that can block

## 9. Shared music engine and project model

The architecture research must define which layers are platform-independent.

Likely shared responsibilities include:

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

The project format should support:

- forward-compatible schema evolution
- stable identifiers
- partial loading
- offline editing
- recovery after crashes
- version history
- imported assets
- external references
- structured and rendered data

Candidate storage and synchronisation models may include:

- SQLite
- append-only operation logs
- content-addressed assets
- object storage
- CRDTs
- operational transforms
- explicit project branches

No approach should be selected until its behaviour has been tested against music-specific editing and collaboration.

## 10. Networking and connected-session research

The connected-session stack should evaluate:

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

The system may use different transports for:

- lightweight musical events
- control messages
- voice chat
- preview audio
- final recording uploads
- project synchronisation

Internet sessions must account for physical latency limits. The architecture should support:

- low-latency regional live mode
- tempo-synchronised event mode
- collaborative overdubbing

## 11. AI and heavy-processing architecture

AI work should not interfere with real-time playing.

The research must separate:

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

## 12. Professional integration research

The stack must assess support for:

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

The study must determine whether the standalone application and plug-ins can share the same audio and music core.

## 13. Television, console and specialist-platform research

The architecture should consider:

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

Console and television clients may require different technology from the phone client while sharing the project and performance core.

## 14. Accessibility architecture research

The stack must make input methods replaceable.

The system should support a common action model that can be driven by:

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

The research should verify:

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

## 15. Extension and marketplace safety

Future instruments, sounds and extensions must not compromise the audio engine or user data.

The research should compare:

- declarative instrument definitions
- sandboxed scripting
- WebAssembly modules
- signed native extensions
- isolated processes
- capability-based permissions
- content validation
- resource quotas

Third-party code should not run unrestricted on the real-time audio thread.

The extension format should clearly declare:

- permissions
- CPU and memory expectations
- platform support
- network access
- file access
- licence
- source availability
- compatibility version

## 16. Security, privacy and rights

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

## 17. Offline-first and resilience research

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

## 18. Testing and device-lab strategy

Automated unit tests are not enough for musical interaction.

The research must define tests for:

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

## 19. Observability and production diagnostics

The production system should collect useful diagnostics without affecting performance or compromising privacy.

The research should define:

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

## 20. Build, release and update architecture

The research should assess:

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

## 21. Licensing and open-source constraints

Riffloom is intended to remain open source at its foundation.

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

## 22. Research deliverables

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

## 23. Proposed research sequence

### Stage 1: Define measurable requirements

- finalise benchmark scenarios
- select baseline devices
- define latency and stability thresholds
- define required platforms for the first production release

### Stage 2: Build the critical-path prototypes

For each serious candidate, implement only enough to test:

- raw multi-touch
- instrument state
- low-latency sound
- visual feedback
- recording
- sustained stress

### Stage 3: Test shared-core options

- compare C++, Rust and other credible systems approaches
- test native and WebAssembly integration
- measure bridge overhead
- test deterministic project playback

### Stage 4: Test collaboration and persistence

- local device discovery
- shared clock
- event transport
- distributed recording
- crash recovery
- offline synchronisation

### Stage 5: Test professional expansion

- MIDI and MPE
- desktop host
- plug-in proof of concept
- external audio interface
- structured export

### Stage 6: Select and document the architecture

- compare measured results
- reject unsuitable options explicitly
- select the production stack
- define platform-specific exceptions
- produce the migration roadmap

## 24. Decision principle

The chosen stack should optimise the complete product rather than the convenience of one development team or one platform.

The likely answer may be a layered system, for example:

- a shared real-time music and audio core
- platform-specific low-latency adapters
- one or more interface technologies selected by product surface
- a web implementation using shared logic where practical
- separate specialist clients for plug-ins, consoles or spatial experiences

This is only an architectural hypothesis. The research must measure and validate it before it becomes the production decision.

## 25. Integration with the wider product plan

This research brief should be read alongside:

- [`PRODUCT-PLAN.md`](PRODUCT-PLAN.md)
- [`PRODUCT-PLAN-EXPANDED-OPPORTUNITIES.md`](PRODUCT-PLAN-EXPANDED-OPPORTUNITIES.md)
- [`PRODUCT-PLAN-AI-GENERATION.md`](PRODUCT-PLAN-AI-GENERATION.md)
- [`PRODUCT-PLAN-CONNECTED-SESSIONS.md`](PRODUCT-PLAN-CONNECTED-SESSIONS.md)

The technology-stack research must account for the full long-term product direction, but it should still recommend a practical staged architecture for the first production release.
