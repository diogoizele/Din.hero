# Dinhero — Agent Guide

Dinhero is a React Native CLI financial app. This file is the **entry point** for AI agents. Canonical rules live in `.agents/rules/` and sync to Cursor via [Agentloom](https://agentloom.sh/docs).

## Project stack

| Area | Choice |
| ---- | ------ |
| Runtime | React Native 0.79, React 19 |
| Backend | Firebase (Auth, Firestore, Analytics) |
| Server state | TanStack Query 5 |
| Client state | Zustand (Auth, theme); Redux legacy (Home, History, RecurringRules) |
| Navigation | React Navigation 7 |
| Package manager | Bun (`bun.lock`) |

## Language policy

| Artifact | Language |
| -------- | -------- |
| Product specs (`specs/`) | **Portuguese** |
| Rules, skills, `AGENTS.md` | **English** |
| Source code (identifiers, comments) | **English** |
| User-facing UI copy | **PT-BR** when shown to users |

## Spec-Driven Development

1. Check [`specs/`](specs/README.md) for an existing feature spec.
2. If needed, copy [`specs/_templates/feature-spec.md`](specs/_templates/feature-spec.md) to `specs/features/<feature>/<slug>.md` (Portuguese body).
3. Implement against functional requirements and **acceptance criteria**.
4. Verify each criterion with tests and/or manual checks.

No net-new product behavior without an updated spec (see exceptions in [`spec-driven-workflow`](.agents/rules/spec-driven-workflow.md)).

## Architecture snapshot

Four layers in `src/`:

| Layer | Path | Role |
| ----- | ---- | ---- |
| App | `src/app/` | Providers, root navigators |
| Core | `src/core/` | Infra only (API, analytics, stack factory) |
| Features | `src/features/<Feature>/` | Domain logic, screens, services |
| Shared | `src/shared/` | Theme, hooks, `ui/`, legacy `components/` |

[`docs/architecture.md`](docs/architecture.md) describes an aspirational ui/domain/data split. **Production code follows flat feature folders** — use Auth as the template, not the doc’s nested `features/ui` layout.

## Golden references

| Topic | Path |
| ----- | ---- |
| Feature structure | [`src/features/Auth`](src/features/Auth) |
| Shared UI primitive | [`src/shared/ui/Button`](src/shared/ui/Button) |
| Stack navigator | [`src/features/Auth/navigation/AuthNavigator.tsx`](src/features/Auth/navigation/AuthNavigator.tsx) |
| Spec workflow | [`specs/README.md`](specs/README.md) |

## Rules index

| Rule | When it applies | Canonical path |
| ---- | --------------- | -------------- |
| Spec-Driven Workflow | Always | [`.agents/rules/spec-driven-workflow.md`](.agents/rules/spec-driven-workflow.md) |
| Project Architecture | Always | [`.agents/rules/project-architecture.md`](.agents/rules/project-architecture.md) |
| TypeScript and Quality | `**/*.{ts,tsx}` | [`.agents/rules/typescript-and-quality.md`](.agents/rules/typescript-and-quality.md) |
| Styling and Theme | `**/*.{tsx}`, `**/*.styles.ts` | [`.agents/rules/styling-and-theme.md`](.agents/rules/styling-and-theme.md) |
| Shared UI Components | `src/shared/ui/**` | [`.agents/rules/shared-ui-components.md`](.agents/rules/shared-ui-components.md) |
| Feature Development | `src/features/**` | [`.agents/rules/feature-development.md`](.agents/rules/feature-development.md) |
| Services and State | services, stores, `use*` hooks | [`.agents/rules/services-and-state.md`](.agents/rules/services-and-state.md) |
| Testing | tests, `__tests__/` | [`.agents/rules/testing.md`](.agents/rules/testing.md) |

After editing rules, run `npx agentloom sync`. **Do not hand-edit** generated [`.cursor/rules/*.mdc`](.cursor/rules/).

## Skills

| Skill | Use for |
| ----- | ------- |
| `docs-writer` | Markdown docs, READMEs (`.cursor/skills/docs-writer/`) |
| `create-stack-navigator` | Nested feature stacks (`.agents/skills/create-stack-navigator/`) |

## Agentloom sync

```bash
npx agentloom init   # once per repo (if not initialized)
npx agentloom sync   # after changing .agents/rules or .agents/skills
```

Canonical config: `.agents/`. Synced Cursor rules: `.cursor/rules/*.mdc`. Commit both so teammates get rules without running sync.

## Commands

```bash
bun test              # Jest
bun lint              # ESLint
bun start             # Metro
bun run storybook-generate   # Storybook stories (see package.json)
```

Equivalent: `npm test`, `npm run lint`, `npm start`.

## MCP

Use **Context7** MCP for up-to-date third-party library documentation when implementing integrations.

## Active migrations

- **Redux → Zustand / TanStack Query** — no new Redux; migrate when touching legacy slices.
- **react-native-ui-lib → tokens + `shared/ui`** — no new ui-lib imports.
- **Nested navigators** — add per feature when 2+ screens (Auth pattern).
- **Detox E2E** — planned; `e2e/` not set up yet.
- **Service interfaces** — move object facades (e.g. `LoginService`) toward `I*Service` over time.

<!-- agentloom:project-architecture:start -->
## Project Architecture

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
<!-- agentloom:project-architecture:end -->

<!-- agentloom:spec-driven-workflow:start -->
## Spec-Driven Workflow

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
<!-- agentloom:spec-driven-workflow:end -->
