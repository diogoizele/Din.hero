---
name: create-stack-navigator
description: Add a feature stack navigator using @core createStackNavigator and Auth patterns.
---

# Create Stack Navigator

Use when a feature has **two or more screens** and needs a nested stack. Single-screen features stay on the parent stack (`AppStackNavigator` / `PublicStackNavigator`).

## Checklist

1. **Import stack factory from `@core`** — never import `createStackNavigator` directly from `@react-navigation/stack` or `@react-navigation/native-stack` in feature code.

   ```typescript
   import { createStackNavigator } from '@core';
   ```

   Implementation: `src/core/infra/create-stack-navigator.ts` (JS stack on Android, native stack on iOS).

2. **Add `FeatureNavigator.types.ts`** next to the navigator:
   - `FeatureRoutes` enum with `SCREAMING_SNAKE` keys and kebab-case string values (see `AuthRoutes`).
   - `FeatureParamsList` extending `ParamListBase` with per-route params.

   Reference: `src/features/Auth/navigation/AuthNavigator.types.ts`.

3. **Create `FeatureNavigator.tsx`**:
   - `const Stack = createStackNavigator<FeatureParamsList>();`
   - `useTheme()` for `screenOptions` (header colors, tint, back button).
   - Register screens from `../screens` barrel.
   - Set `initialRouteName` explicitly.

   Reference: `src/features/Auth/navigation/AuthNavigator.tsx`.

4. **Export screens** from `screens/index.ts` so the navigator imports `* as screens from '../screens'`.

5. **Register in parent** only when the feature has 2+ screens:
   - Add one `Stack.Screen` on `AppStackNavigator` or `PublicStackNavigator` pointing at `FeatureNavigator`.
   - Export navigator + route types from `src/features/<Feature>/index.ts` if other modules need them.

6. **Edge-to-edge** (optional): follow Auth's `SystemBars` + `useMemo` for status/navigation bar style when the feature is full-screen branded.

## Do not

- Create a nested navigator for a single screen.
- Deep-link route names that diverge from the `*Routes` enum.

## Golden reference

- Types: `src/features/Auth/navigation/AuthNavigator.types.ts`
- Navigator: `src/features/Auth/navigation/AuthNavigator.tsx`
- Parent registration: search `AuthNavigator` in `src/app/`
