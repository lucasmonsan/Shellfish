# 🐚 Shellfish

A **Svelte 5** interface-component and layout-primitive library for the Monsan suite.

Shellfish is designed as the direct, simplified evolution of MonsanUI:

- **No Div Soup**: Strict focus on semantic, accessible native HTML elements.
- **Standardized Solid Shadow**: One tactile physical-shadow pattern (`--shadow: 1px 1px 0px var(--border-color)`).
- **No unnecessary complexity**: Direct, lightweight, reactive and TypeScript-typed code.

---

## 🛠️ Stack

- **Framework**: Svelte 5 (Runes mode required)
- **Kit**: SvelteKit + `@sveltejs/package`
- **Language**: TypeScript (strict mode)
- **Styles**: Native CSS with design-system variables
- **Tests**: Vitest + Playwright Component Testing
- **Local Port**: `5172` (`http://localhost:5172`)

---

## 📦 Installation and Usage in Suite Apps

Import global styles in the root `+layout.svelte`:

```svelte
<script>
	import 'shellfish/shellfish.css';
</script>
```

## 📐 Standards

Canonical rules, technical exceptions, validation criteria and compliance
status are in [docs/STANDARDS.md](./docs/STANDARDS.md).

Import components:

```svelte
<script>
	import { Main, Header, Section, Footer, Row, Column, Button, Input, Card } from 'shellfish';
</script>
```

---

## 🚀 Commands

```bash
# Run every test and quality gate
pnpm test

# Run type checking
pnpm run typecheck

# Run linting and formatting
pnpm run lint
pnpm run format

# Build the package (dist/)
pnpm run build:package
```

---

## 📄 License

Distributed under the **GNU Affero General Public License v3.0** (`AGPL-3.0-only`). See [LICENSE](./LICENSE) for details.
