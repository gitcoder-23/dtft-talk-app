# Expo EAS Build Guide

To create Expo Android and iOS builds using Expo Application Services (EAS), follow these steps:

## 1. Install EAS CLI

Run the following command to install the command-line interface globally:

```bash
npm install -g eas-cli
```

**Verification:** Run `eas --version` to confirm the installation was successful and to view the installed version.

## 2. Log in to your Expo account

Authenticate the CLI with your Expo credentials:

```bash
eas login
```

**Verification:** The terminal will display a success message confirming your logged-in username.

## 3. Configure your project

Initialize the build configuration for your project:

```bash
eas build:configure
```

**Verification:** Check your project's root folder for a newly created `eas.json` file, which contains your build profiles.

## 4. Start the build process

Trigger the build for both platforms simultaneously (or replace `all` with `android` or `ios` to build them individually):

```bash
eas build --platform all
```

During this step, the CLI will automatically prompt you to generate or upload Android keystores and iOS provisioning profiles.

**Verification:** A URL will appear in your terminal; open it in your browser to monitor the build progress on the Expo dashboard.

---

## Next Steps & Suggestions

Based on your build process, here are two suggestions for what to do next:

- **Suggestion 1: App Store Submission**
  If your build is ready for production, you can submit these binaries directly to the Google Play Store and Apple App Store using `eas submit`.
- **Suggestion 2: Physical Device Testing**
  If you are still developing, configure your `eas.json` to create development builds (using `eas build --profile development`) for testing directly on a physical device.

`npx expo eject` is no longer helpful because it is deprecated and has been completely removed from modern versions of Expo.

Previously, `eject` was used to convert a "managed" Expo project into a "bare" React Native project by permanently exposing the `android` and `ios` folders, which forced you to manage native code manually going forward.

Expo has replaced this with **Continuous Native Generation (CNG)** and the `npx expo prebuild` command.

Here is how you handle native code requirements in modern Expo:

- **Config Plugins (The Modern Way):** If you need to add custom native modules or modify native files (like `AndroidManifest.xml` or `Info.plist`), you now use Expo Config Plugins within your `app.json`. When you run a build using EAS (as you configured in the previous step), Expo automatically generates the native folders, applies your config plugins, and builds the app in the cloud. You never need to see or manage the native folders.
- **npx expo prebuild (The Direct Replacement):** If you absolutely must generate the `android` and `ios` directories locally (for example, to open the project in Android Studio or Xcode to write custom Swift/Kotlin code), you run:
  **Bash**

  ```
  npx expo prebuild
  ```

  _Verification:_ Check your project directory; you will now see `android` and `ios` folders. Unlike `eject`, you can safely add these folders to your `.gitignore` and regenerate them anytime by running `npx expo prebuild --clean`.

If you are following an old tutorial that tells you to `eject`, you should look for the modern "Config Plugin" equivalent for the library you are trying to install.
