# Shellfish Standards

This is the single canonical, conflict-free rulebook and architectural decision record for **Shellfish**, the official Svelte 5 UI primitive library of the Monsan Suite. Global workspace rules in `AGENTS.md` remain mandatory.

---

## 1. Scope, Philosophy & Governance

- **Zero Domain Monolith:** `src/lib/` contains only pure, reusable UI primitives, design tokens, types, icons and neutral utilities. Product-specific logic (compilers, flashcards, quiz engines, domain workflows) is strictly forbidden.
- **LEGO Composition:** Instead of hyper-specific composite widgets, Shellfish provides composable primitives (`AppShell`, `Button`, `IconButton`, `Spinner`, `Card`, `Input`, `Dialog`, etc.) assembled through Svelte 5 Snippets (`{#snippet ...}`).
- **Single Visual Authority:** Consumer apps (`Owlth`, `Monsan`, `Koalify`, `Manki`, `Crocode`, `Rooster`, `Whallet`, `Octomate`) must never override component CSS locally. Missing variants or behaviors are added in Shellfish first.
- **Change Authority:** No creation, edit or removal in Shellfish is permitted without the user's explicit prior approval.

---

## 2. Local Suite Port Mapping (4400 Range)

To isolate the Monsan Suite from external projects and default Vite ports, the suite uses the `4400` port range:

- **`4401`:** Shellfish (UI Library & Interactive Showcase/Catalog)
- **`4402`:** Owlth (Auth & SSO)
- **`4403`:** Monsan (Suite Portal)
- **`4404`:** Koalify (Exams & Questions)
- **`4405`:** Manki (Flashcards)
- **`4406`:** Crocode (IDE & Code)
- **`4407`:** Rooster (Routine & Management)
- **`4408`:** Whallet (Finances)
- **`4409`:** Octomate (Automation)

---

## 3. Layout, Viewport & Blur Performance

- **`AppShell` 3-Block Structure (`100dvh`):**
  1. **Top (`<header>`):** Fixed top bar with `backdrop-filter: var(--blur-surface)` and subtle border.
  2. **Content (`<main>`):** Occupies remaining height (`flex: 1`, `min-height: 0`, `overflow-y: auto`) with automatic top/bottom scroll-fade indicators (`--scroll-fade-height`) triggered only when content overflows.
  3. **Bottom (`<footer>`):** Fixed bottom bar or footer.
- **Performance & Reduced Motion:**
  - Selective blur (`--blur-surface`) automatically degrades to solid surfaces (`--bg-primary` / `--bg-elevated`) when `:root[data-low-perf='true']` or `@media (prefers-reduced-motion: reduce)` is active.

---

## 4. Canonical Layer Scale (`z-index`)

Raw numeric `z-index` values are forbidden in components. Always use the 7 canonical layer tokens declared in `src/lib/styles/variables.css`:

- `--layer-base: 0`
- `--layer-content: 10`
- `--layer-sticky: 40`
- `--layer-header: 60`
- `--layer-popover: 70`
- `--layer-dialog: 100`
- `--layer-toast: 110`

---

## 5. Mandatory Rules

### Architecture (`SF-A`)

| ID     | Rule                                                                                                                                                                                  | Validation                            |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| SF-A01 | Use Svelte 5 Runes (`$props`, `$state`, `$derived`, `$effect`) and `{@render ...}`. Never use `export let`, `$$props`, legacy lifecycle APIs or `<slot>`.                             | `pnpm check` + component tests        |
| SF-A02 | Public components and types must be exported from `src/lib/index.ts` and `src/lib/types/index.ts`.                                                                                    | `pnpm check` + component tests        |
| SF-A03 | Props are strictly typed. Forward native HTML attributes with `...restProps` on components with a native root.                                                                        | `pnpm check` + component tests        |
| SF-A04 | Prioritize semantic HTML tags (`<header>`, `<main>`, `<footer>`, `<button>`, `<dialog>`, `<nav>`, `<section>`, `<article>`). Wrappers exist only when layout/animation requires them. | `app-shell.test.ts`, `button.test.ts` |
| SF-A05 | Style native root tags directly in Svelte scoped CSS (`button`, `header`, `main`, `footer`, `svg`) with short state/variant classes. Never use `.shellfish-*` prefixes.               | `token-invariants.test.ts`            |
| SF-A06 | Build true LEGO primitives using free `children` composition. Never create rigid positional slot props (`leading`, `trailing`, `leftIcon`, `rightIcon`).                              | `token-invariants.test.ts`            |

### Visual System (`SF-V`)

| ID     | Rule                                                                                                                                                                                               | Validation                 |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| SF-V01 | Use declared CSS tokens only. Hardcoded hex colors (`#...`), raw pixel/rem spacing, raw border-radius or raw box-shadow in components are strictly forbidden.                                      | `token-invariants.test.ts` |
| SF-V02 | Never use pure white (`#ffffff`) or pure black (`#000000`). Use warm suite tokens (`--bg-primary`, `--color-on-solid: #fdfbf7`, `--text-primary`) with WCAG AA+ contrast in Light and Dark themes. | `token-invariants.test.ts` |
| SF-V03 | Derive spacing (`--space-*`), typography (`--text-*`) and control heights (`--control-height*`) mathematically from the single fluid `--base` token (`clamp` + `calc`).                            | `token-invariants.test.ts` |
| SF-V04 | Use the canonical radius scale (`--radius-xs` `2px` near-square default for controls/badges/spinCube, `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full`).                               | `token-invariants.test.ts` |
| SF-V05 | Inline action controls (`Button`, `IconButton`, `Input`, `Select`) enforce fixed single-line height (`height: var(--control-height*)`), `white-space: nowrap`, and `flex-shrink: 0`.               | `button.test.ts` + review  |
| SF-V06 | Keep `overflow: visible` at rest so badges, focus rings and popovers are never clipped; apply `overflow: hidden` only during collapse/morphing transitions (`.morphing`).                          | `button.test.ts` + review  |
| SF-V07 | Do not use `!important` in component styles (allowed only in the global reduced-motion / low-perf reset in `variables.css`).                                                                       | review                     |
| SF-V08 | `spinCube` is the single canonical loading indicator of the suite. Never display redundant status badges or text when a control already communicates loading visually.                             | `icons-spinner.test.ts`    |
| SF-V09 | UI and catalog copy must be strictly minimal and functional (component names, variant tokens, and 1–2 word action labels). Never include promotional copy, subtitles, or technical explanations.   | review                     |

### Accessibility & Internationalization (`SF-X` & `SF-I`)

| ID     | Rule                                                                                                                                               | Validation                                |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| SF-X01 | Every interactive control is keyboard-operable, exposes visible `:focus-visible` outline and uses native semantics or accurate ARIA attributes.    | `button.test.ts`, `icons-spinner.test.ts` |
| SF-X02 | Support `@media (prefers-reduced-motion: reduce)` across all animated components and global tokens.                                                | component CSS + `variables.css`           |
| SF-I01 | Support all 3 official Monsan Suite locales reactively (`pt-BR`, `en-US`, `es`) via `src/lib/utils/i18n.svelte.ts`.                                | `foundation.test.ts`                      |
| SF-I02 | Components must not embed hardcoded translatable strings; default accessible labels (such as `Spinner` loading status) resolve from `i18n.t(...)`. | `Spinner.svelte` + `foundation.test.ts`   |
| SF-I03 | Theme (`light` / `dark`) and locale initialize before hydration to prevent visual flash.                                                           | `app.html` + `+layout.svelte`             |

---

## 6. Quality Gate

Run in order:

1. `pnpm test:unit` (Vitest unit & architectural invariant tests)
2. `pnpm check` (`svelte-kit sync` & `svelte-check`)
3. `pnpm lint` (`prettier --check .` & `eslint .`)
