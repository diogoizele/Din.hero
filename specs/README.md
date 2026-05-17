# Specs (Spec-Driven Development)

Product specifications for Dinhero live here. **Spec bodies are written in Portuguese.** Agent rules, `AGENTS.md`, and all application code stay in **English** (user-facing copy may be PT-BR).

## When a spec is required

Create or update a spec before implementing when any of the following apply:

- **New feature** or user-visible behavior
- **Breaking change** to an existing flow (navigation, auth, payments, etc.)
- **Multi-screen work** (2+ screens or a new nested navigator)
- **Cross-cutting change** that touches services, global state, or shared UI contracts

**Exceptions** (no spec update needed): typo fixes, dependency bumps with no behavior change, pure refactors that preserve behavior, and internal tooling-only changes.

## File layout

```
specs/
  README.md                 # this file (English, for agents)
  _templates/
    feature-spec.md         # copy this to start a new spec (Portuguese)
  features/
    <feature>/
      <slug>.md             # e.g. specs/features/bills/recurring-rules.md
      README.md             # optional index for the feature
```

Use kebab-case for `<slug>.md`. One spec per cohesive deliverable; split large epics into multiple specs with clear scope.

## Workflow

1. **Check** `specs/features/` for an existing spec on the topic.
2. **Draft or align** using [`_templates/feature-spec.md`](_templates/feature-spec.md).
3. **Review** functional requirements and acceptance criteria with the product intent (self-review or PR description).
4. **Implement** in `src/` following `.agents/rules/` and golden references in `AGENTS.md`.
5. **Verify** each acceptance criterion (tests, manual checks, or both).

Specs are the source of truth for *what* to build; code and tests prove *how* it was built.

## Golden reference

Auth is already implemented. See [`features/auth/README.md`](features/auth/README.md) for pointers—do not rewrite Auth unless a spec explicitly calls for a change.

## Related

- Entry point: [`AGENTS.md`](../AGENTS.md)
- Architecture (aspirational doc): [`docs/architecture.md`](../docs/architecture.md) — **code follows flat feature folders** per `src/features/Auth`
