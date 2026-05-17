---
name: Services and State
description: Service/source split, TanStack Query, Zustand; no new Redux.
alwaysApply: false
globs:
  - "**/services/**"
  - "**/stores/**"
  - "**/hooks/use*.ts"
---

# Services and State

## Services

- **Service** = business API used by hooks/screens; maps errors, analytics, domain types.
- **Source** = backend IO only (`*Source.firebase.ts`, etc.).
- Service calls source functions; screens do not call Firebase directly.

Target files per feature service:

```
authService.types.ts
authService.interface.ts   # when refactoring
authService.ts
authSource.firebase.ts
```

Reference: `src/features/Auth/services/`.

## Remote / async data

- Use **TanStack Query** (`@tanstack/react-query`) for server-backed data, caching, and mutations.
- Wrap screens/tests with `QueryClientProvider` in integration tests.

## Global client state

- Use **Zustand** only for state that is truly global or feature-global (e.g. `src/features/Auth/stores/auth.store.ts`).
- **Do not add new Redux** slices or stores.
- When touching features that still use Redux (Home, History, RecurringRules), prefer migrating to Zustand or Query as part of that work—not expanding Redux.

## Hooks

- `use*` hooks orchestrate services + stores + Query; keep components thin.

## References

- Auth service: `src/features/Auth/services/authService.ts`
- Auth store: `src/features/Auth/stores/auth.store.ts`
