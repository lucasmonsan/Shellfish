# Shellfish Project Context

Shellfish is the official Svelte 5 interface-component and layout-primitive library for Monsan/Zoo suite products. It is the canonical, tactile and strictly standardized UI primitive library of the Monsan Suite.

Use this file as the concise entry point for AI agents. Use `README.md` for development commands and the Zoo root `AGENTS.md` for canonical workflow rules.

The complete rules, validation criteria, and architecture/visual invariants (`SF-A`, `SF-V`, `SF-X`, `SF-I`) are in `docs/STANDARDS.md`.

## Change Authority

No Shellfish creation, edit, removal or other change — including code, components, content, files and rules — may be made without the user's prior explicit approval. Authorization must be specific to the proposed change; silence, context or previous requests do not constitute approval.

## Shellfish Architectural Role in the Zoo Suite

1. **Canonical UI package (`shellfish`)**: Provides composable LEGO primitives, semantic layout containers, fluid CSS tokens (`--base`) and a reactive i18n utility for every suite consumer app (`Owlth`, `Monsan`, `Koalify`, `Manki`, `Crocode`, `Rooster`, `Whallet`, `Octomate`).
2. **Interactive Catalog (`4401`)**: The interactive showcase at `src/routes/+page.svelte` runs on reserved port `4401` (`http://localhost:4401`). The catalog may be deployed as an authenticated internal Coolify app; see `docs/deployment.md`.
3. **Gold Standard for Implementation & Dynamic Tests**: Shellfish is the technical reference for clean Svelte 5 code and scalable dynamic test suites that enforce architectural invariants, fluid tokens, reactive i18n and semantic markup.

## Non-Negotiable Guidelines and Rules (`docs/STANDARDS.md`)

- **Architecture (`SF-A01`–`SF-A06`)**:
  - Svelte 5 Runes only (`$props()`, `$state()`, `$derived()`, `$effect()`, `{@render}`). Legacy Svelte 4 patterns (`export let`, `$$props`, `<slot>`) are forbidden.
  - Public components and types must be exported from `src/lib/index.ts` and `src/lib/types/index.ts`.
  - Prioritize semantic HTML tags (`<header>`, `<main>`, `<footer>`, `<button>`, `<dialog>`, `<nav>`, `<section>`, `<article>`). Style native root tags directly in scoped CSS with short variant/state classes; never use `.shellfish-*` prefixes.
  - Build true LEGO primitives via free `children` composition; never create rigid positional slot props (`leading`, `trailing`, `leftIcon`, `rightIcon`).
- **Visual System (`SF-V01`–`SF-V09`)**:
  - Use declared CSS tokens only (`src/lib/styles/variables.css`). Hardcoded hex colors (`#...`), raw pixel/rem spacing, raw border-radius or raw box-shadow in components are forbidden.
  - Never use pure white (`#ffffff`, `rgba(255, 255, 255, ...)`) or pure black (`#000000`, `rgba(0, 0, 0, 1)`). Use warm suite tokens (`--bg-primary`, `--color-on-solid: #fdfbf7`, `--text-primary`) with WCAG AA+ contrast in Light and Dark themes.
  - Derive spacing (`--space-*`), typography (`--text-*`), control heights (`--control-height*`) and preset dimensions mathematically from the single fluid `--base` token (`clamp` + `calc`).
  - Near-square aesthetic (`--radius-xs: 2px` default for controls, badges and `spinCube`) with `--border-width: 2px` (`var(--border-color)`), token-based hover (`--color-*-hover`), and tactile active feedback (`transform: scale(0.98)`).
  - Inline action controls (`Button`, `IconButton`, `Input`, `Select`) enforce `min-height: var(--control-height*)`, vertical safety padding, `white-space: nowrap` and `flex-shrink: 0`.
  - `spinCube` is the single canonical loading indicator of the suite.
  - UI and catalog copy must be strictly minimal and functional (component names, variant tokens, and 1–2 word action labels), with zero promotional or explanatory text.
- **Accessibility & i18n (`SF-X01`–`SF-X02`, `SF-I01`–`SF-I03`)**:
  - Every interactive control is keyboard-operable, exposes visible `:focus-visible` outline and supports `@media (prefers-reduced-motion: reduce)`.
  - Reactive i18n across all 3 official Monsan Suite locales (`pt-BR`, `en-US`, `es`) via `src/lib/utils/i18n.svelte.ts`, initialized before hydration without flash.
- **Commit Standard**: Use short, one-line Conventional Commits in English (`feat:`, `fix:`, `refactor:`, `test:`, `chore:`, `docs:`).
- **Reserved Local Port**: `http://localhost:4401` (port `4401`).
- **AI Dev-Server Prohibition**: No AI may run `pnpm dev`, `vite dev` or `preview` without the user's explicit permission.

## Directory Structure

- `src/lib/index.ts`: Public package entry point and component/type re-exports.
- `src/lib/components/`: Components organized by category (`layout/`, `actions/`, `forms/`, `display/`, `feedback/`, `icons/`).
- `src/lib/styles/`: Design tokens (`variables.css`), reset (`modern-normalize.css`) and entry (`index.css`).
- `src/lib/utils/`: Reactive utilities (`i18n.svelte.ts`).
- `src/lib/types/`: TypeScript definitions for library props and types.
- `src/routes/`: Interactive catalog and visual showcase (`http://localhost:4401`).
- `tests/`: Automated unit and architectural invariant tests.

## Quality Commands

```bash
pnpm test:unit
pnpm check
pnpm lint
pnpm build
pnpm build:package
```
