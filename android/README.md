# Riffloom Android preview

This directory packages the current Riffloom web instruments as an installable offline Android application.

## Preview package

- Application ID: `com.kyroxsystems.riffloom.preview`
- Minimum Android version: Android 8.0, API 26
- Orientation: landscape
- Start page: `mobile.html`
- Web content: copied from the repository root into APK assets during each build
- Network requirement: none for the bundled instruments

The app uses `WebViewAssetLoader` and the secure local origin:

```text
https://appassets.androidplatform.net/assets/www/
```

This keeps JavaScript modules and local assets on an HTTPS-style origin without enabling broad file access.

## Automated APK

`.github/workflows/android-preview.yml` runs the JavaScript model tests, builds a signed APK, verifies it and publishes a rolling prerelease.

Stable download path:

```text
https://github.com/kyrox-systems-hq/riffloom/releases/download/android-preview/Riffloom-Android-Preview.apk
```

The build number becomes the Android `versionCode`, allowing later automated preview builds to update earlier ones.

## Signing warning

`preview-signing.keystore.b64` is deliberately public and is used only for the preview application ID. It allows automated preview updates to keep the same signature.

It must never be reused for:

- the production Riffloom application ID
- Google Play production or testing tracks
- a paid or security-sensitive distribution

A production Android app must use a private key stored outside the public repository, ideally through Play App Signing and encrypted CI secrets.

## Local build

After installing JDK 17, Android SDK 35 and Gradle 8.9:

```bash
base64 --decode preview-signing.keystore.b64 > app/riffloom-preview.jks
gradle :app:assembleDebug -PpreviewVersionCode=1 -PpreviewVersionName=0.1.0-preview
```

The APK is written to:

```text
app/build/outputs/apk/debug/app-debug.apk
```
