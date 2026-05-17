---
name: Spec-Driven Workflow
description: Read and update Portuguese specs before feature work; verify against acceptance criteria.
alwaysApply: true
---

# Spec-Driven Workflow

Follow **Spec-Driven Development (SDD)** for any net-new product behavior.

## Before coding

1. Read [`specs/README.md`](../../specs/README.md) and search `specs/features/<feature>/`.
2. If no spec exists for the change scope, copy [`specs/_templates/feature-spec.md`](../../specs/_templates/feature-spec.md) into `specs/features/<feature>/<slug>.md`.
3. Write the spec body in **Portuguese** (requirements, acceptance criteria, out of scope).
4. Align on acceptance criteria before implementation.

## While coding

- Implement in **English** (identifiers, comments, commit messages).
- User-visible strings may be **PT-BR**.
- Follow golden references: `src/features/Auth`, `src/shared/ui/Button`.

## After coding

- Check every acceptance criterion in the spec (tests and/or manual verification).
- Update the spec if scope changed during implementation (keep PT body in sync).

## Exceptions (no spec required)

Typos, dependency-only bumps, pure refactors with unchanged behavior, internal CI/tooling.

## References

- Spec index: `specs/README.md`
- Agent entry: `AGENTS.md`
