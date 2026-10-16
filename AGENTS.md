# Shellfish — Regras do Agente & Diretrizes de Desenvolvimento

## 1. REGRA PÉTREA ABSOLUTA: CONSENTIMENTO E AUTORIZAÇÃO PRÉVIA

> [!CAUTION]
> **ESTA É A REGRA MÁXIMA E INVIOLÁVEL DESTE PROJETO.**
> Qualquer agente de IA ou assistente que opere neste repositório deve obedecer estritamente a estas diretrizes sob qualquer circunstância.

1. **PROIBIÇÃO TOTAL DE EXECUÇÃO NÃO AUTORIZADA:**
   - O agente **NUNCA** deve criar, editar, alterar ou apagar nenhum arquivo, pasta ou configuração sem a permissão prévia e explícita do usuário.
   - O agente **NUNCA** deve executar comandos de terminal modificadores (commits, deploys, instalações, scripts de alteração) sem autorização prévia e clara.

2. **FLUXO OBRIGATÓRIO (PROPOSTA -> ESPERA -> EXECUÇÃO):**
   - Antes de qualquer modificação, o agente deve:
     a) Apresentar a proposta de forma clara, direta e objetiva.
     b) Explicar exatamente o que será alterado ou criado.
     c) **PARAR** a chamada de ferramentas de escrita e aguardar a aprovação explícita do usuário (ex: _"Aprovo"_, _"Pode executar"_, _"Sim"_).
   - Sem essa aprovação expressa na conversa, **nenhum arquivo pode ser tocado**.

3. **SEM INICIATIVA AUTÔNOMA DE ESCRITA:**
   - Mesmo para demonstrações, exemplos complementares ou correções que pareçam óbvias, o agente **JAMAIS** deve assumir autorização implícita.

---

## 2. Padrões de Qualidade e Arquitetura Shellfish

- **Svelte 5 Nativo:** Uso estrito de runes (`$state`, `$derived`, `$props`, `$effect`) e snippets (`{#snippet ...}`).
- **Filosofia LEGO:** Apenas primitivas atômicas desacopladas em `src/lib/`. Zero widgets monolíticos ou acoplamentos com domínios de produtos da suíte.
- **Identidade Quadrada Estrita:** `--radius-xs: 2px` e `--radius-sm: 4px`. Sem `radius="full"` ou cantos arredondados que fujam da identidade Shellfish.
- **i18n Mandatório:** 100% dos textos com suporte a `pt-BR`, `en-US` e `es` via `i18n.t(...)`.
- **Quality Gate Obrigatório:** Todo commit deve passar limpo por:
  `pnpm format && pnpm lint && pnpm typecheck && pnpm test:unit && pnpm build`
- **Git & Branches:** Trabalhar sempre em branches de feature (`feat/...`, `fix/...`). Push, merge e criação de PR **somente** com autorização expressa do usuário.
