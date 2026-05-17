---
name: Testing
description: Unit and integration testing with Jest; Detox E2E planned.
alwaysApply: false
globs:
  - "**/*.{test,spec}.{ts,tsx}"
  - "**/__tests__/**"
---

# Testing

## Pyramid

| Layer | Tool | Where |
| ----- | ---- | ----- |
| Unit | Jest + RNTL | `src/shared/ui/*.test.tsx`, pure helpers in `__tests__/shared/` |
| Integration | Jest + RNTL | `__tests__/features/<Feature>/...` — screens, hooks with mocked sources + QueryClient |
| E2E | Detox (future) | `e2e/` — **not configured yet**; do not add Detox config without a dedicated spec |

## Practices

- Co-locate unit tests with `shared/ui` components.
- Mock Firebase/sources at the service boundary, not inside every component.
- Use path aliases from `jest.config.js`: `@app`, `@core`, `@features`, `@shared`.
- Reanimated and gesture-handler setup is in `jest.config.js` `setupFiles`.

## Running tests

```bash
bun test
# or: npm test
```

## References

- Jest config: `jest.config.js`
- UI unit example: `src/shared/ui/Button/Button.test.tsx`
- Feature integration example: `__tests__/features/Auth/screens/FirstAccess/components/Slide.test.tsx`
