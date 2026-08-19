# Shellfish Project Context

Shellfish é a biblioteca oficial de componentes de interface e primitivas de layout em Svelte 5 para os produtos da suíte Monsan, sendo a refatoração simplificada e estritamente padronizada do MonsanUI.

Use este arquivo como ponto de entrada conciso para agentes de IA. Use `README.md` para comandos de desenvolvimento e `AGENTS.md` na raiz do Zoo para as regras canônicas de workflow.

## Diretrizes e Regras Não-Negociáveis

- **Fonte Única da Verdade Visual**: Consumidores da suíte não criam CSS local de sobrescrita; novas variantes são adicionadas diretamente no Shellfish.
- **Zero "Div-Soup"**: Uso obrigatório de tags HTML nativas semânticas (`<input>`, `<textarea>`, `<article>`, `<dialog>`, `<select>`, `<button>`, `<header>`, `<main>`, `<section>`, `<footer>`, `<hr>`). Proibido aninhar `<div>`s supérfluas.
- **Estilização Direta de Tags Nativas**: Como o CSS no Svelte é estritamente isolado (scoped), estilizamos tags únicas diretamente em `<style>` (`button`, `input`, `textarea`, `select`, `article`, `dialog`, `hr`, `main`, `header`, `section`, `footer`) sem criar classes artificiais desnecessárias.
- **1 Único Padrão de Sombra Sólida**: Padronização estrita em `--shadow: 2px 2px 0px var(--border-color)` (hover `3px 3px` com `translate(-1px, -1px)` e active `0px 0px` com `translate(2px, 2px)`).
- **Svelte 5 Runes**: Uso obrigatório de Runes (`$props()`, `$state()`, `$derived()`, `$effect()`, `{@render}`).
- **TypeScript Estrito & a11y Nativo**: Todas as props são tipadas e repassam atributos HTML padrão via `...restProps`. Todos os componentes possuem foco visível e acessibilidade via teclado.
- **Padrão de Commits**: Conventional Commits em inglês no formato `<type>(<scope>): <description>` (`feat`, `fix`, `refactor`, `test`, `chore`, `docs`, `style`).
- **Testes Obrigatórios por Etapa**: Cada funcionalidade, token e componente deve ter testes associados.
- **Porta Local Reservada**: `http://localhost:5172` (Porta `5172`).
- **Proibição de Execução de Dev Server por IA**: Nenhuma IA pode executar `pnpm dev`, `vite dev` ou `preview` sem permissão expressa do usuário.

## Estrutura de Diretórios

- `src/lib/index.ts`: Ponto de entrada público do pacote e re-exports de componentes e tipos.
- `src/lib/components/`: Componentes organizados por categoria (`containers/`, `actions/`, `forms/`, `display/`, `feedback/`, `suite/`).
- `src/lib/styles/`: Design tokens (`variables.css`), reset (`modern-normalize.css`) e normalização (`index.css`).
- `src/lib/types/`: Definições TypeScript de props e tipos da biblioteca.
- `src/routes/`: Showcase interno e referência visual dos componentes.
- `tests/`: Testes automatizados (tokens, semântica, integração, acessibilidade, qualidade de código).

## Comandos de Qualidade

```bash
pnpm test
pnpm run check
pnpm run typecheck
pnpm run lint
pnpm run lint:package
pnpm run build
pnpm run build:package
```
