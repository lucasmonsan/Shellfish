# Shellfish - Registro de Decisões e Padrões da Suíte (Trabalho em Progresso)

Este documento registra as decisões consensuais para a refatoração do **Shellfish** como libUI oficial definitiva da suíte Monsan.

---

## 1. Escopo & Filosofia LEGO (Composição de Primitivas)

- **Eliminação de Monolito:** Remoção total de código de domínio de apps específicos (ex: compiladores/interpretadores, CodeMirror, lógica de flashcards, questões de prova).
- **Abordagem LEGO:** Em vez de dezenas de componentes hiperespecíficos (`MetricButton`, `PromptPanel`, `DataCard`, `ChoiceCard`), o Shellfish fornecerá primitivas coesas (`Card`, `Button`, `Stack`, `Row`, `Grid`, `Badge`, `Text`, etc.).
- **Composição via Svelte 5:** Uso de Snippets (`{#snippet ...}`) e propriedades de variação (`variant`, `size`) para composição rica sem inchar o pacote.

---

## 2. Layout & Viewport (Top, Content, Bottom)

- **Estrutura de 3 Blocos:**
  - **Top (`<header>` / `<nav>`):** Barra superior, ferramentas e navegação fixa.
  - **Content / Center (`<main>`):** Ocupa o restante do espaço (`flex: 1`, `overflow-y: auto`, `min-height: 0`).
    - Possui fade/degradê superior e inferior ativado quando o conteúdo está oculto acima ou abaixo do scroll.
  - **Bottom (`<footer>`):** Rodapé, barras de ações inferiores ou notificações fixas.
- **Mobile-friendly:** Uso de viewport dinâmica (`100dvh`) e `scroll-padding` para prevenir problemas de teclado virtual e barra de endereços.

---

## 3. Semântica e "Div Soup"

- Prioridade absoluta para tags semânticas nos contêineres e blocos de conteúdo (`<header>`, `<main>`, `<footer>`, `<section>`, `<article>`, `<nav>`).
- A tag `<div>` deixa de ser aninhada indiscriminadamente e fica estritamente restrita a wrappers de layout (flex/grid) e camadas técnicas de animação ou efeitos.

---

## 4. Estética Atual (Minimalista & Elegante)

- **Transição Visual:** Superação do visual "pesado/neo-brutalista cru" em favor de uma estética minimalista, leve e refinada.
- **Bordas & Sombras:** Bordas limpas e sombras mais sutis e suaves.
- **Paleta:** Foco em superfícies claras, alto contraste e tipografia fluida.

---

## 5. Efeito Blur & Gestão de Desempenho

- **Uso Seletivo de Blur:** Aplicado pontualmente onde agrega sofisticação (ex: cabeçalhos flutuantes, overlays de modais, toasts).
- **Estratégia de Performance:**
  1. Suporte nativo a `@media (prefers-reduced-motion: reduce)` desativando blur e filtros custosos.
  2. Fallback gracioso para opacidade sólida quando o blur for desativado.
  3. Detecção de capacidade do dispositivo (memória/threads de hardware ou probe leve de FPS na inicialização) aplicando `data-low-perf="true"` no elemento raiz.
  4. Toggle manual de "Efeitos Visuais" nas preferências da suíte.

---

## 6. Governança & Zero Overrides

- **Proibição de CSS local nos apps:** Consumidores continuam proibidos de criar CSS customizado ou sobrescrever componentes.
- **Garantia pela lib:** O Shellfish fornece a flexibilidade necessária via propriedades, variantes e snippets, evitando a necessidade de hacks nos consumidores.
