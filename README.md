# 🐚 Shellfish

Biblioteca de componentes de interface e primitivas de layout em **Svelte 5** para a suíte Monsan.

O Shellfish foi desenhado para ser a evolução direta e simplificada do MonsanUI:

- **Zero Div-Soup**: Foco estrito em tags HTML nativas semânticas e acessíveis.
- **Sombra Sólida Padronizada**: 1 único padrão de sombra física tátil (`--shadow: 1px 1px 0px var(--border-color)`).
- **Sem complexidades desnecessárias**: Código direto, leve, reativo e tipado via TypeScript.

---

## 🛠️ Stack

- **Framework**: Svelte 5 (modo Runes obrigatório)
- **Kit**: SvelteKit + `@sveltejs/package`
- **Linguagem**: TypeScript (Strict Mode)
- **Estilos**: CSS Nativo com variáveis de design system
- **Testes**: Vitest + Playwright Component Testing
- **Porta Local**: `5172` (`http://localhost:5172`)

---

## 📦 Instalação e Uso em Apps da Suíte

Importe os estilos globais no seu `+layout.svelte` raiz:

```svelte
<script>
	import 'shellfish/shellfish.css';
</script>
```

Importe os componentes:

```svelte
<script>
	import { Main, Header, Section, Footer, Row, Column, Button, Input, Card } from 'shellfish';
</script>
```

---

## 🚀 Comandos

```bash
# Executar todos os testes e gates de qualidade
pnpm test

# Executar checagem de tipos
pnpm run typecheck

# Executar linter e formatação
pnpm run lint
pnpm run format

# Gerar build do pacote (dist/)
pnpm run build:package
```

---

## 📄 Licença

Distribuído sob a licença **GNU Affero General Public License v3.0** (`AGPL-3.0-only`). Veja [LICENSE](./LICENSE) para mais detalhes.
