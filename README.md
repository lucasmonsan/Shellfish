# Shellfish

Shellfish is a standalone PC console-style game launcher/front-end in the Monsan
workspace.

It targets a controller-first desktop experience for Windows and Linux gaming
PCs: unified libraries, local metadata, emulation, downloads, save backups and
direct game launch from a console-like UI.

## Stack

- SvelteKit with Svelte 5
- TypeScript
- Paraglide i18n
- MonsanUI
- Tauri v2 scaffold
- Planned SQLite local data

## Current State

Shellfish is early-stage. The repository has the SvelteKit/MonsanUI foundation,
suite-standard validation scripts and Tauri commands, but the full launcher,
store integrations, SQLite model, emulator integrations and save-management
runtime are still product plan items.

Shellfish does not currently use Owlth SSO, Directus, Examster or Manki data.

## Local Origin

- Shellfish web/dev origin: `http://localhost:5178`

## Requirements

- Node `>=22.13.0`
- pnpm
- Access to the private MonsanUI repository during install
- Tauri prerequisites for desktop development/builds

## Commands

```bash
pnpm dev
pnpm dev:fast
pnpm standards
pnpm tooling
pnpm lint
pnpm typecheck
pnpm build
pnpm test
pnpm desktop:dev
pnpm desktop:build
```

`pnpm test` is the full local gate:

```bash
pnpm standards && pnpm tooling && pnpm env:check && pnpm page-structure && pnpm lint && pnpm typecheck && pnpm build
```

## MonsanUI

Shellfish consumes MonsanUI for shared components, CSS and standards checks.

Local development commands build and link the sibling `../MonsanUI` checkout
before starting the app, so component changes can be tested without changing the
production dependency declaration.

After MonsanUI changes are merged into `main`, update Shellfish with:

```bash
pnpm update monsan-ui
pnpm test
```

## Documentation

- `DOC_PROJ.md`: compact agent context plus product specification.
- `AGENTS.md` in the workspace root: canonical implementation rules.
- `SUITE_CONTEXT.md` in the workspace root: cross-project map.

Do not commit `build`, `.svelte-kit`, `node_modules`, generated desktop output,
secrets, store credentials, local save data or private user paths.
