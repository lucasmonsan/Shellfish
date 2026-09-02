# Shellfish Standards

This is the canonical, complete and auditable rule set for Shellfish. It
supersedes ambiguous wording in project notes. Global Zoo rules in `AGENTS.md`
remain mandatory; this document only specifies their application to this UI
library.

## Scope and authority

Shellfish is the single visual and interaction source for Zoo applications.
Consumer applications must not override Shellfish CSS. A missing variant, token
or behavior is added here first, then consumed through its public API.

## Change authority

No Shellfish creation, edit, removal or other change — including code,
components, content, files and these standards — is permitted without the
user's prior explicit approval. Approval must be specific to the proposed
change; silence, context or previous requests do not constitute approval.

The interactive catalog is internal. It runs on port `5172` and must not be
indexed. When deployed, it uses Node runtime, HTTP Basic authentication and a
public `/up` healthcheck; deployment details live in `docs/deployment.md`.
Shellfish remains a package, not a consumer product: `AppShell`, landing pages,
SSO and public SEO do not apply here.

## Catalog contract

The catalog uses stable, non-localized routes: `/components`,
`/components/[category]` and `/components/[category]/[component]`. Its registry
is the audited inventory of public components. A public component is incomplete
without a documented `*Props` interface, catalog entry, dynamic playground,
generated example, route and browser-test contract.

Catalog content is localized in `pt-BR` and `en-US`; API identifiers, types and
copied Svelte code remain English. Components load individually through dynamic
imports. An entry's name, category or slug must not be removed or changed
without the user's explicit approval.

## Mandatory rules

### Architecture

| ID     | Rule                                                                                                                                                                    | Validation                  |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| SF-A01 | Use Svelte 5 Runes; do not use `export let`, `$$props`, lifecycle APIs or `<slot>`.                                                                                     | `code-quality.test.ts`      |
| SF-A02 | Public components and types are exported from `src/lib/index.ts` and `src/lib/types/index.ts`.                                                                          | `code-quality.test.ts`      |
| SF-A03 | Props are strictly typed. Forward native attributes with `...restProps` whenever the component has a native root.                                                       | typecheck + component tests |
| SF-A04 | `src/lib/` contains only reusable UI, tokens, types and neutral utilities; no consumer product data or workflow.                                                        | review                      |
| SF-A05 | Use semantic native elements first. A wrapper exists only when layout, a native control association, animation, portal/top-layer behavior or accessibility requires it. | review + component tests    |

### Visual system

| ID     | Rule                                                                                                                                           | Validation                               |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| SF-V01 | Use declared CSS tokens only. Do not hardcode colors in components.                                                                            | `tokens.test.ts`, `code-quality.test.ts` |
| SF-V02 | Do not add or rename a color token without explicit approval. Never use pure black or white.                                                   | review                                   |
| SF-V03 | The default tactile shadow is `--shadow`. Interactive controls use the defined rest/hover/active physics.                                      | `actions.test.ts`, component tests       |
| SF-V04 | Use only `--radius-sm` and `--radius-md`; use the spacing and control-height scales.                                                           | `tokens.test.ts`                         |
| SF-V05 | Use semantic layer tokens only. Raw numeric `z-index` is forbidden.                                                                            | `code-quality.test.ts`                   |
| SF-V06 | Popovers, menus and shadows must remain visible. A surface may clip content only while it is collapsed or during a contained transition.       | review + component tests                 |
| SF-V07 | Do not use `!important`, except in the global reduced-motion reset, where it is necessary to override component-scoped animation declarations. | `code-quality.test.ts`                   |

### Semantics and accessibility

| ID     | Rule                                                                                                                                   | Validation                              |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| SF-X01 | Every interaction is keyboard-operable, exposes visible focus and has correct native semantics or ARIA.                                | component tests + manual browser check  |
| SF-X02 | Interactive non-native surfaces are focusable and implement Enter/Space consistently.                                                  | component tests                         |
| SF-X03 | Labels, state and feedback use native HTML where possible (`label`, `button`, `dialog`, `input`, `select`, `textarea`, `aside`, `hr`). | component tests                         |
| SF-X04 | User-facing and accessibility text is localized; components must not embed translatable strings. Callers may provide localized props.  | `i18n.test.ts` + review                 |
| SF-X05 | Support `prefers-reduced-motion`.                                                                                                      | global CSS + review                     |
| SF-X06 | Assertive and polite live regions use neutral `div` roots with `role="alert"` or `role="status"`; do not put either role on `aside`.   | browser accessibility + component tests |

### Internationalization and theme

| ID     | Rule                                                                                                                         | Validation                        |
| ------ | ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| SF-I01 | Support `pt-BR` and `en-US` reactively through `i18n.svelte.ts`.                                                             | `i18n.test.ts`                    |
| SF-I02 | Locale dictionaries have identical non-empty keys and placeholders.                                                          | `i18n.test.ts`                    |
| SF-I03 | SSR resolves the locale from the valid cookie or `Accept-Language`; a client preference cannot overwrite an explicit cookie. | `i18n.test.ts`                    |
| SF-I04 | Theme is set before hydration from the same storage key used by `ThemeSelector`.                                             | `app.html` + manual browser check |

### Repository, release and operations

| ID     | Rule                                                                                                                  | Validation                     |
| ------ | --------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| SF-R01 | Use pnpm, Svelte 5, strict TypeScript, ESLint and Prettier.                                                           | package metadata + `pnpm lint` |
| SF-R02 | Keep AGPL-3.0-only, the required PWA assets and package export map.                                                   | package metadata + tests       |
| SF-R03 | Keep source, tests and component audit documentation under `src/lib/`, `tests/` and `docs/`.                          | baseline audit                 |
| SF-R04 | Do not commit secrets or generated artifacts.                                                                         | review + `.gitignore`          |
| SF-R05 | Use Conventional Commits in English: `<type>(<scope>): <description>`.                                                | review                         |
| SF-R06 | Do not start `dev`, `preview` or a server without explicit user permission.                                           | workflow                       |
| SF-R07 | `pnpm test` includes browser and Playwright E2E checks. Every new public component needs a catalog and test contract. | CI + contract tests            |
| SF-R08 | Visual snapshots are versioned test fixtures. Updating one is a deliberate visual change requiring explicit approval. | review + Playwright            |

## Canonical layer scale

`base` 0, `background` 10, `content` 20, `raised` 30, `sticky` 40,
`shell-top` 50, `shell-header` 60, `popover` 70, `floating` 80, `drawer` 90,
`modal` 100 and `critical` 110. Consumers never use raw values.

## Explicit exceptions and resolved ambiguities

| Former absolute rule                 | Canonical decision                                                                      | Reason                                                                                                                                                         |
| ------------------------------------ | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| “Zero div-soup”                      | No superfluous wrappers; required wrappers are allowed.                                 | `Row`, `Grid`, input decoration, card flip/collapse, menus and animation need structural elements. Removing them breaks behavior, semantics or browser layout. |
| “Style only native tags”             | Style native roots directly; classes are allowed for required sub-elements and states.  | Multiple internal parts cannot be represented by one semantic root.                                                                                            |
| “Never `!important`”                 | Forbidden except the global reduced-motion reset.                                       | The user preference must override scoped component animation declarations.                                                                                     |
| “Never clip overflow”                | Never clip open overlays; clipping is allowed only for collapsed/transitioning content. | Collapse animations require clipping, while open menus must remain visible.                                                                                    |
| “Every interactive Card is a button” | Only Cards with an actual click behavior are button-like.                               | Visual `interactive` feedback alone must not create misleading keyboard controls.                                                                              |

## Current compliance after this hardening

| Finding                                                           | Decision                                                                                                                  | Status                        |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| Div wrappers in layout, controls, menus, cards and collapse areas | Required structural wrappers; documented exception.                                                                       | Accepted                      |
| Old six-step layer scale and raw numeric layers                   | Migrated to suite layer tokens.                                                                                           | Fixed                         |
| `!important` in reduced-motion reset                              | Narrow, documented accessibility exception.                                                                               | Accepted                      |
| Hardcoded Chips remove label                                      | Moved to i18n with `{tag}` parameter.                                                                                     | Fixed                         |
| Arbitrary `Spinner.color`                                         | Replaced with semantic color options.                                                                                     | Fixed                         |
| Card and Footer clipping open overlay content                     | Open state is visible; clipping stays only when collapsed.                                                                | Fixed                         |
| Keyboard access for clickable/flippable Cards                     | Focus/role/Enter/Space added when there is click behavior.                                                                | Fixed                         |
| Catalog indexation                                                | `robots.txt` and page metadata set to noindex.                                                                            | Fixed                         |
| `Alert` and `Toast` live-region semantics                         | Use `div` roots because `aside` does not permit `alert` or `status` roles; catalog guides and tests record this decision. | Fixed                         |
| Theme flash                                                       | Theme initialized before hydration.                                                                                       | Fixed                         |
| Missing component/audit documentation                             | This document added.                                                                                                      | Fixed                         |
| Consumer CSS overrides                                            | Cannot be proven from Shellfish alone. Audit every consumer repository separately.                                        | Pending external audit        |
| Browser-level focus order, dialog behavior and visual overflow    | Cannot be proven by source inspection alone.                                                                              | Pending manual/E2E validation |
| Internal catalog deployment                                       | Uses `adapter-node`, Dockerfile, environment-only Basic Auth and public `/up` healthcheck.                                | Fixed                         |

## Quality gate

Run, in order: `pnpm lint`, `pnpm typecheck`, `pnpm test:unit`, `pnpm build`,
`pnpm run lint:package`, `pnpm test:e2e`. `pnpm test` runs this complete gate
and requires the user's explicit approval under Zoo workflow.
