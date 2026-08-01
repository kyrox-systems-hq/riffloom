# Contributing to Riffloom

Thank you for helping build phone-native musical instruments.

## Before contributing

Please keep proposals grounded in actual musical performance and touchscreen behaviour. A visually attractive change is not useful if it makes chords, note transitions or multi-touch input less reliable.

## Reporting a problem

Include:

- device and operating system
- browser and version
- whether the problem occurs through the phone speaker, headphones or both
- the exact note or control involved
- whether the key changed colour
- whether the output meter moved
- steps that reproduce the problem

For touch faults, state how many fingers were on the screen and whether you were holding, tapping or sliding.

## Pull requests

1. Keep each pull request focused on one problem.
2. Explain the musical or interaction reason for the change.
3. Confirm that the keyboard still maps exactly 88 notes, with 52 white and 36 black keys.
4. Test all three rows and all three pedal switches.
5. Do not introduce external libraries or audio assets without documenting their licence.
6. Keep the MPL 2.0 notice attached to modified source files.

## Code style

- Use plain, readable HTML, CSS and JavaScript unless a larger architecture is agreed first.
- Prefer explicit names over abbreviations in code.
- Preserve multi-touch pointer tracking and reliable note release.
- Add comments only where the behaviour would otherwise be unclear.
- Avoid device-specific assumptions unless there is a documented fallback.

## Audio assets

Do not submit commercial, copyrighted or ambiguously licensed piano samples. Any future sample library must have clear redistribution rights compatible with the repository and its intended applications.
