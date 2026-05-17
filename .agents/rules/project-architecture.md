---
name: Project Architecture
description: Feature-first layers, public APIs, and naming conventions for Dinhero.
alwaysApply: true
---

# Project Architecture

Dinhero uses a **feature-first** layout. Prefer flat feature folders (see Auth) over the aspirational ui/domain/data split in `docs/architecture.md`.

## Layers

| Layer | Path | Responsibility |
| ----- | ---- | -------------- |
| App | `src/app/` | Providers, root navigators, app-wide wiring |
| Core | `src/core/` | Infra only (API, analytics, `createStackNavigator`) — no domain logic |
| Features | `src/features/<Feature>/` | Domain screens, services, feature navigators |
| Shared | `src/shared/` | Cross-cutting hooks, theme, `ui/`, legacy `components/` |

## Feature public API

- Export consumers via `src/features/<Feature>/index.ts`.
- **Do not** deep-import another feature's internals. ESLint enforces this in `.eslintrc.js` (`no-restricted-imports` on `src/features/*/*`).
- Import from `@features/<Feature>` or the feature `index.ts`.

## Golden feature

Mirror **`src/features/Auth`**: `screens/`, `components/`, `services/`, `stores/`, `navigation/`, `hooks/`, `schemas/`.

## File naming

| Kind | Pattern | Example |
| ---- | ------- | ------- |
| Screen / component | `PascalCase.tsx` | `Login.tsx` |
| Hook | `useCamelCase.ts` | `useLogin.ts` |
| Service / source | `camelCase` + suffix | `authService.ts`, `authSource.firebase.ts` |
| Styles | `ScreenName.styles.ts` | `Login.styles.ts` |
| Navigator types | `*Navigator.types.ts` | `AuthNavigator.types.ts` |
| Routes | `SCREAMING_SNAKE` enum | `AuthRoutes` in `*Routes` |

## References

- Auth feature: `src/features/Auth/index.ts`
- Stack factory: `src/core/infra/create-stack-navigator.ts`
