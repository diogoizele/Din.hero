---
name: TypeScript and Quality
description: Strict typing, service contracts, Zod forms, and export conventions.
alwaysApply: false
globs:
  - "**/*.{ts,tsx}"
---

# TypeScript and Quality

## Typing

- Avoid `any`; use `unknown` and narrow, or proper generics.
- Add **explicit return types** on exported functions, hooks, and service methods.
- Prefer **`interface`** for service contracts and object shapes meant for implementation.
- Prefer **`type`** for unions, intersections, and mapped utility types.

## Services (target shape)

When adding or refactoring services:

- `*Service.types.ts` — payloads and DTOs
- `*Service.interface.ts` — `I*Service` contract (introduce when refactoring)
- `*Service.ts` — implements contract, delegates to source
- `*Source.firebase.ts` (or other backend) — IO only

Current Auth export is an object facade (`LoginService` in `authService.ts`); align toward interfaces on touch.

## Forms and validation

- Use **Zod** schemas (see `src/features/Auth/schemas/auth.schemas.ts`) with `@hookform/resolvers`.

## Language

- Code and identifiers: **English**.
- User-facing copy: **PT-BR** when product requires it.

## References

- Auth schemas: `src/features/Auth/schemas/auth.schemas.ts`
- Service types: `src/features/Auth/services/authService.types.ts`
