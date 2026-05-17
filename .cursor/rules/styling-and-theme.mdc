---
name: Styling and Theme
description: useTheme, useStyled, design tokens; no new react-native-ui-lib.
alwaysApply: false
globs:
  - "**/*.{tsx}"
  - "**/*.styles.ts"
---

# Styling and Theme

## Standard pattern

1. `useTheme()` from `@shared/hooks` for colors, spacing, and mode.
2. `useStyled(createStyles)` with `createStyles(theme)` in `*.styles.ts`.
3. Read tokens from `src/shared/theme/new_tokens.ts` via the theme object—do not hardcode magic numbers when a token exists.

Example: `src/features/Auth/screens/Login/Login.tsx` + `Login.styles.ts`.

## Do not use

- **No new** `react-native-ui-lib` imports or components.
- When editing legacy screens under `src/shared/components/`, migrate styling toward `useTheme` + `useStyled` when practical.

## New UI work

- Build with React Native primitives (`View`, `Pressable`) and shared `Text` from `@shared/ui` where typography matters.
- Prefer `react-native-gesture-handler` `Pressable` for interactive controls in `shared/ui` (see `Button.tsx`).

## References

- Tokens: `src/shared/theme/new_tokens.ts`
- Login screen styling: `src/features/Auth/screens/Login/Login.styles.ts`
