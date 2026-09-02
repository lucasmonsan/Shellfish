# Shellfish Project Context

Shellfish is the official Svelte 5 interface-component and layout-primitive library for Monsan/Zoo suite products. It is the simplified, tactile and strictly standardized refactor of MonsanUI.

Use this file as the concise entry point for AI agents. Use `README.md` for development commands and the Zoo root `AGENTS.md` for canonical workflow rules.

The complete rules, validation criteria, technical exceptions and compliance
status are in `docs/STANDARDS.md`.

## Change Authority

No Shellfish creation, edit, removal or other change — including code,
components, content, files and rules — may be made without the user's prior
explicit approval. Authorization must be specific to the proposed change;
silence, context or previous requests do not constitute approval.

## Shellfish Architectural Role in the Zoo Suite

1. **Canonical UI package (`shellfish`)**: Provides primitive components, semantic containers, CSS tokens and a reactive i18n utility for every suite consumer app (`Monsan`, `Rooster`, `Koalify`, `Manki`, `Owlth`, etc.).
2. **Living Visual Guide & Interactive Catalog**: The overview at `src/routes/+page.svelte` links to the interactive catalog under `src/routes/components/`, on reserved port `5172`, for demonstrating and consulting each component's usage. The catalog may be deployed as an authenticated internal Coolify app; see `docs/deployment.md`.
3. **Gold Standard for Implementation & Dynamic Tests**: Shellfish is the technical reference for clean Svelte 5 code and scalable dynamic test suites that enforce quality invariants, tokens, dynamic i18n and semantic markup across 1 to 10,000 files.

## Non-Negotiable Guidelines and Rules

- **Single Visual Source of Truth**: Suite consumers do not create local CSS overrides; new variants and components are added directly to Shellfish.
- **No Div Soup**: Semantic HTML is mandatory. A `<div>` is allowed only when required for layout, control association, animation, a menu or accessibility; see `docs/STANDARDS.md`.
- **Direct Native-Tag Styling**: Style semantic roots directly; classes are allowed for required sub-elements and states.
- **One Solid-Shadow Pattern**: Strictly use `--shadow: 1px 1px 0px var(--border-color)`; on hover use `2px 2px` with `translate(-1px, -1px)`, and on active use `0px 0px` with `translate(1px, 1px)`.
- **Svelte 5 Runes**: Runes are mandatory (`$props()`, `$state()`, `$derived()`, `$effect()`, `{@render}`). Legacy Svelte 4 patterns (`export let`, `$$props`, `<slot>`) are forbidden.
- **Strict TypeScript & Native a11y**: Every prop is typed and standard HTML attributes are forwarded through `...restProps`. Every component with real interaction provides visible focus and keyboard accessibility.
- **Reactive Internationalization (i18n)**: Dynamically support `pt-BR` and `en-US` through `i18n.svelte.ts` and `<LocaleSelector>`. Static strings in accessibility attributes are forbidden.
- **Scalable Dynamic Tests**: All test suites dynamically scan source code and validate architecture invariants, exports, CSS variables and i18n parity without per-file manual adjustments.
- **Commit Standard**: Use Conventional Commits in English: `<type>(<scope>): <description>` (`feat`, `fix`, `refactor`, `test`, `chore`, `docs`, `style`).
- **Reserved Local Port**: `http://localhost:5172` (port `5172`).
- **AI Dev-Server Prohibition**: No AI may run `pnpm dev`, `vite dev` or `preview` without the user's explicit permission.
- **Catalog Contract**: Every public component requires a typed API, a stable catalog route, a playground, generated code, i18n content and browser-test contract before it can be considered complete.
- **Production Catalog**: Deploy with the Node adapter and the Dockerfile, configure Basic Auth through Coolify secrets and use public `/up` for healthchecks.

## Directory Structure

- `src/lib/index.ts`: Public package entry point and component/type re-exports.
- `src/lib/components/`: Components organized by category (`containers/`, `actions/`, `forms/`, `display/`, `feedback/`, `suite/`).
- `src/lib/styles/`: Design tokens (`variables.css`), reset (`modern-normalize.css`) and normalization (`index.css`).
- `src/lib/utils/`: Reactive utilities (`i18n.svelte.ts`).
- `src/lib/types/`: TypeScript definitions for library props and types.
- `src/routes/`: Internal showcase and visual reference for components.
- `src/routes/components/`: Catalog index, category and component routes. Catalog-only code stays under this route tree.
- `tests/`: Scalable automated tests for implementation quality, tokens, semantics, tactile behavior, forms, feedback and i18n.

## Quality Commands

```bash
pnpm test
pnpm run check
pnpm run typecheck
pnpm run lint
pnpm run lint:package
pnpm run build
pnpm run build:package
```
