# Changelog

All notable changes to **DinHero** are documented here.

DinHero is your financial hero for bills you can't forget — a bill management app focused on short-term visibility, explicit obligations, and removing mental load once a bill is paid.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow [Semantic Versioning](https://semver.org/).

---

## Summary

| Version   | Focus                                                                                       |
| --------- | ------------------------------------------------------------------------------------------- |
| **1.0.1** | Tests, data/mapper fixes, input UI fix, edit-bill value fix, recurring generation refactor. |
| **1.0.0** | Initial release — bill management, recurring rules, history, and auth.                      |

---

## [1.0.1] — 2026-01-29

### Added

- **Unit tests** — Started test coverage; tests added around core helpers and feature mappers.
- **Environment flavors / build configurations support** — Added support for environment-specific flavors/schemas/build configurations, enabling proper separation between DEV/HML and PRD environments with dedicated API endpoints per environment.

### Fixed

- **Bill and recurring rule mappers** — Bugs in data handling and creation payloads for bills and recurring rules; fixes covered by unit tests.
- **Bill value when editing** — Bill amount was not loaded when editing a bill whose type is not `RECURRING`; form now shows the correct value for Single and Installment bills.
- **Recurring bill generation** — Generation no longer waits 30 days after the last run. It now runs as a **cycle**: on app focus and when rules/bills change, creating the next due bill per rule when needed, with a once-per-day guard to avoid duplicate runs.

### Changed

- **Data management** — Refactored to work with **timezoneless** date values internally; formatting (e.g. for display) is applied only when needed, reducing timezone-related bugs and keeping a single source of truth.
- **Input background** — Restored white background on inputs; they were incorrectly transparent.
- **Version bump** — App version set to `1.0.1` in `package.json`, Android (`versionName` / `versionCode`), and iOS (`MARKETING_VERSION` / `CURRENT_PROJECT_VERSION`).

---

## [1.0.0] — Initial Release

### Added

- **Authentication**

  - Login and sign up with Firebase Auth
  - First-access onboarding flow
  - Isolated user data and cloud-backed state

- **Home & Upcoming Bills**

  - View unpaid bills due in the next 30 days, grouped by due date
  - Swipe to mark bills as paid
  - Bill details sheet with inline amount editing
  - Support for pending (null) amounts on recurring bills

- **Bill Creation**

  - **Single** — One-time payments with optional immediate mark-as-paid
  - **Installment** — Fixed number of payments with auto-generated due dates
  - **Recurring** — Monthly repeating bills backed by Recurring Rules

- **Recurring Rules**

  - Create and manage rules (day of month, category, optional amount)
  - Active/inactive state
  - Automatic bill generation over time
  - Edit and view recurring rule details

- **History**

  - Full bill history with sorting and filtering
  - Paid, unpaid, overdue, and upcoming views
  - History details and CRUD operations

- **Menu & Settings**
  - Menu with confirm-exit flow
  - App navigation and structure

### Technical

- React Native app for iOS and Android
- Firebase (Auth, Firestore, Crashlytics, Analytics)
- Redux Toolkit for state management
- Modular feature-based architecture

---

[1.0.1]: https://github.com/your-org/dinhero-rn-cli/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/your-org/dinhero-rn-cli/releases/tag/v1.0.0
