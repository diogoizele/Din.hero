# Environment variables and pipeline secrets

This document describes:

1. **App-level env (local)** – variables the app uses at runtime (e.g., API URL). In a **public repository**, no `.env` file is versioned; you create `.env.development` and/or `.env.production` locally when running the app (see section below).
2. **Pipeline env** – GitHub Actions secrets required for each build (configured in Repository Settings → Secrets; never committed to code).

---

## Build configurations (flavors / schemes)

| Configuration      | Android variant      | iOS scheme         | App ID (Android)  | Bundle ID (iOS)   |
| ------------------ | -------------------- | ------------------ | ----------------- | ----------------- |
| debugDevelopment   | `developmentDebug`   | DinheroDevelopment | `com.dinhero.dev` | `com.dinhero.dev` |
| debugProduction    | `productionDebug`    | DinheroProduction  | `com.dinhero`     | `com.dinhero`     |
| releaseDevelopment | `developmentRelease` | DinheroDevelopment | `com.dinhero.dev` | `com.dinhero.dev` |
| releaseProduction  | `productionRelease`  | DinheroProduction  | `com.dinhero`     | `com.dinhero`     |

---

## App environment variables (local only)

In a **public repository**, `.env` files are **not versioned** (they are in `.gitignore`). Anyone cloning the repo must create the files **locally** when running the app.

- **What to create locally:**

  - For development: create `.env.development` at the project root.
  - For production (e.g., testing a production build): create `.env.production`.  
    Example content (adjust to what your app uses):

  ```bash
  APP_ENV=development
  # API_URL=https://your-dev-api.com
  # SENTRY_DSN=
  ```

* **Android:** `APP_ENV` already comes from the flavor in `android/app/build.gradle` (`buildConfigField "String", "APP_ENV", '"development"'` or `'"production"'`). To use other variables (e.g., `API_URL`) in JS, use a library like `react-native-config` pointing to these files.
* **iOS:** The environment is defined by the scheme (DinheroDevelopment vs DinheroProduction). Use the same `.env.development` / `.env.production` files locally with `react-native-config` if needed.
* **Summary:** No `.env` files in the repo; everything is local. In CI, use only GitHub **secrets** (Firebase, keystore, etc.), never committed `.env` files.

---

## GitHub Actions: secrets required per build

These **secrets** must be set in the repository (Settings → Secrets and variables → Actions). Every build type needs **Firebase** config for its environment; **release** Android builds also need **keystore** secrets.

### Firebase (required for all four build types)

| Secret name                                       | Used by | When                                         |
| ------------------------------------------------- | ------- | -------------------------------------------- |
| `ANDROID_GOOGLE_SERVICES_JSON_DEVELOPMENT_BASE64` | Android | **debugDevelopment**, **releaseDevelopment** |
| `ANDROID_GOOGLE_SERVICES_JSON_PRODUCTION_BASE64`  | Android | **debugProduction**, **releaseProduction**   |
| `IOS_GOOGLE_SERVICES_PLIST_DEVELOPMENT_BASE64`    | iOS     | **debugDevelopment**, **releaseDevelopment** |
| `IOS_GOOGLE_SERVICES_PLIST_PRODUCTION_BASE64`     | iOS     | **debugProduction**, **releaseProduction**   |

So **even for developmentDebug**, you need the **development** Firebase secrets (`ANDROID_GOOGLE_SERVICES_JSON_DEVELOPMENT_BASE64` and/or `IOS_GOOGLE_SERVICES_PLIST_DEVELOPMENT_BASE64`, depending on platform).

**Migration:** If you previously had `ANDROID_GOOGLE_SERVICES_JSON_BASE64` / `IOS_GOOGLE_SERVICES_PLIST_BASE64`, add `ANDROID_GOOGLE_SERVICES_JSON_DEVELOPMENT_BASE64` and `IOS_GOOGLE_SERVICES_PLIST_DEVELOPMENT_BASE64` with the same values (or your dev Firebase config) so **Mobile CI** and manual development builds work. Add production secrets when you have a separate production Firebase project.

### Android release signing (only for release Android builds)

| Secret name                 | Used by | When                                          |
| --------------------------- | ------- | --------------------------------------------- |
| `ANDROID_KEYSTORE_BASE64`   | Android | Legacy single-flavor path (Mobile CI)         |
| `ANDROID_KEYSTORE_PASSWORD` | Android | **releaseDevelopment**, **releaseProduction** |
| `ANDROID_KEY_ALIAS`         | Android | **releaseDevelopment**, **releaseProduction** |
| `ANDROID_KEY_PASSWORD`      | Android | **releaseDevelopment**, **releaseProduction** |

### How to create base64 secrets

**Android `google-services.json`:**

```bash
base64 -i android/app/src/development/google-services.json | pbcopy   # then paste into ANDROID_GOOGLE_SERVICES_JSON_DEVELOPMENT_BASE64
base64 -i android/app/src/production/google-services.json | pbcopy   # then paste into ANDROID_GOOGLE_SERVICES_JSON_PRODUCTION_BASE64
```

**iOS `GoogleService-Info.plist`:**

```bash
base64 -i ios/dinhero/GoogleService-Info.plist | pbcopy   # use dev or prod plist, then paste into IOS_GOOGLE_SERVICES_PLIST_DEVELOPMENT_BASE64 or IOS_GOOGLE_SERVICES_PLIST_PRODUCTION_BASE64
```

**Android keystore:**

```bash
base64 -i android/app/release.keystore | pbcopy   # then paste into ANDROID_KEYSTORE_BASE64
```

---

## Summary: which secrets each build needs

| Build configuration | Android Firebase (secret)                         | iOS Firebase (secret)                          | Android keystore (secrets) |
| ------------------- | ------------------------------------------------- | ---------------------------------------------- | -------------------------- |
| debugDevelopment    | `ANDROID_GOOGLE_SERVICES_JSON_DEVELOPMENT_BASE64` | `IOS_GOOGLE_SERVICES_PLIST_DEVELOPMENT_BASE64` | No                         |
| debugProduction     | `ANDROID_GOOGLE_SERVICES_JSON_PRODUCTION_BASE64`  | `IOS_GOOGLE_SERVICES_PLIST_PRODUCTION_BASE64`  | No                         |
| releaseDevelopment  | `ANDROID_GOOGLE_SERVICES_JSON_DEVELOPMENT_BASE64` | `IOS_GOOGLE_SERVICES_PLIST_DEVELOPMENT_BASE64` | Yes (all 4)                |
| releaseProduction   | `ANDROID_GOOGLE_SERVICES_JSON_PRODUCTION_BASE64`  | `IOS_GOOGLE_SERVICES_PLIST_PRODUCTION_BASE64`  | Yes (all 4)                |

---

## After adding iOS configurations

Run at the repo root:

```bash
cd ios && pod install && cd ..
```

This generates CocoaPods files for the new build configurations (DebugDevelopment, DebugProduction, ReleaseDevelopment, ReleaseProduction).

```
::contentReference[oaicite:0]{index=0}
```
