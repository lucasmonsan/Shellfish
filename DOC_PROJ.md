# Shellfish Project Context

Shellfish é a biblioteca oficial de componentes de interface e primitivas de layout em Svelte 5 para os produtos da suíte Monsan/Zoo, sendo a refatoração simplificada, tátil e estritamente padronizada do MonsanUI.

Use este arquivo como ponto de entrada conciso para agentes de IA. Use `README.md` para comandos de desenvolvimento e `AGENTS.md` na raiz do Zoo para as regras canônicas de workflow.

## Papel Arquitetural do Shellfish na Suíte Zoo

1. **Pacote de UI Canônico (`shellfish`)**: Fornece componentes primitivos, containers semânticos, tokens CSS e utilitário reativo de i18n para todos os apps consumidores da suíte (`Monsan`, `Rooster`, `Koalify`, `Manki`, `Owlth`, etc.).
2. **Guia Visual Vivo & Catálogo Interativo**: A rota `src/routes/+page.svelte` (na porta reservada `5172`) serve como o catálogo interativo (Storybook nativo) para demonstração e consulta de uso de cada componente.
3. **Padrão Ouro de Implementação & Testes Dinâmicos**: O Shellfish serve como a referência técnica de código limpo em Svelte 5 e de suítes de testes automatizados dinâmicos (invariantes de qualidade, tokens, i18n dinâmico e Zero Div-Soup que escalam de 1 a 10.000 arquivos).

## Diretrizes e Regras Não-Negociáveis

- **Fonte Única da Verdade Visual**: Consumidores da suíte não criam CSS local de sobrescrita; novas variantes e componentes são adicionados diretamente no Shellfish.
- **Zero "Div-Soup"**: Uso obrigatório de tags HTML nativas semânticas (`<input>`, `<textarea>`, `<article>`, `<dialog>`, `<select>`, `<button>`, `<header>`, `<main>`, `<section>`, `<footer>`, `<hr>`). Proibido aninhar `<div>`s supérfluas.
- **Estilização Direta de Tags Nativas**: Como o CSS no Svelte é estritamente isolado (scoped), estilizamos tags únicas diretamente em `<style>` (`button`, `input`, `textarea`, `select`, `article`, `dialog`, `hr`, `main`, `header`, `section`, `footer`) sem criar classes artificiais desnecessárias.
- **1 Único Padrão de Sombra Sólida**: Padronização estrita em `--shadow: 2px 2px 0px var(--border-color)` (hover `3px 3px` com `translate(-1px, -1px)` e active `0px 0px` com `translate(2px, 2px)`).
- **Svelte 5 Runes**: Uso obrigatório de Runes (`$props()`, `$state()`, `$derived()`, `$effect()`, `{@render}`). Proibido Svelte 4 legado (`export let`, `$$props`, `<slot>`).
- **TypeScript Estrito & a11y Nativo**: Todas as props são tipadas e repassam atributos HTML padrão via `...restProps`. Todos os componentes possuem foco visível e acessibilidade via teclado.
- **Internacionalização Reativa (i18n)**: Suporte dinâmico a `pt-BR` e `en-US` via `i18n.svelte.ts` e componente `<LocaleSelector>`. Proibido strings estáticas em atributos de acessibilidade.
- **Testes Escaláveis Dinâmicos**: Todas as suítes de teste varrem dinamicamente o código e validam invariantes de arquitetura, exportações, variáveis CSS e paridade de i18n sem necessidade de ajustes manuais por arquivo.
- **Padrão de Commits**: Conventional Commits em inglês no formato `<type>(<scope>): <description>` (`feat`, `fix`, `refactor`, `test`, `chore`, `docs`, `style`).
- **Porta Local Reservada**: `http://localhost:5172` (Porta `5172`).
- **Proibição de Execução de Dev Server por IA**: Nenhuma IA pode executar `pnpm dev`, `vite dev` ou `preview` sem permissão expressa do usuário.

## Estrutura de Diretórios

- `src/lib/index.ts`: Ponto de entrada público do pacote e re-exports de componentes e tipos.
- `src/lib/components/`: Componentes organizados por categoria (`containers/`, `actions/`, `forms/`, `display/`, `feedback/`, `suite/`).
- `src/lib/styles/`: Design tokens (`variables.css`), reset (`modern-normalize.css`) e normalização (`index.css`).
- `src/lib/utils/`: Utilitários reativos (`i18n.svelte.ts`).
- `src/lib/types/`: Definições TypeScript de props e tipos da biblioteca.
- `src/routes/`: Showcase interno e referência visual dos componentes.
- `tests/`: Testes automatizados escaláveis (qualidade anti-gambiarra, tokens, semântica, física tátil, formulários, feedback e i18n).

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
