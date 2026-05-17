---
name: Feature Development
description: How to structure and build features; mirror Auth patterns.
alwaysApply: false
globs:
  - "src/features/**"
---

# Feature Development

Mirror **`src/features/Auth`** for new or extended features.

## Folder layout

```
src/features/<Feature>/
  index.ts              # public exports only
  components/           # feature-specific UI (not ui/)
  screens/
    <Screen>/
      <Screen>.tsx
      <Screen>.styles.ts
      hooks/              # screen-local hooks
  hooks/                  # feature-wide hooks
  services/
  stores/                 # Zustand when truly global to feature
  navigation/             # when 2+ screens
  schemas/                # Zod
  types/
```

## Screens

- One folder per screen with co-located styles and hooks.
- Export screens from `screens/index.ts` for navigators.

## Navigation

- **2+ screens** in a feature → nested navigator under `navigation/` (see Auth).
- **Single screen** → register on `AppStackNavigator` (or appropriate parent), no nested stack.

Use the **create-stack-navigator** skill (`.agents/skills/create-stack-navigator/SKILL.md`).

## Cross-feature imports

- Import other features only via their `index.ts` / `@features/*` public API.

## References

- Auth navigator: `src/features/Auth/navigation/AuthNavigator.tsx`
- Screen barrel: `src/features/Auth/screens/index.ts`
