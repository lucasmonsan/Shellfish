import type { Locale } from '$lib/types/i18n.js';

export interface CatalogGuide {
	summary: string;
	when: string;
	avoid: string;
	accessibility: string;
}

type GuideSet = Record<string, CatalogGuide>;

const pt: GuideSet = {
	Main: {
		summary: 'Estrutura principal da aplicação.',
		when: 'Use como raiz de uma interface Shellfish.',
		avoid: 'Não aninhe outros landmarks main.',
		accessibility: 'Mantenha apenas um main por documento.'
	},
	Header: {
		summary: 'Cabeçalho estrutural da aplicação.',
		when: 'Use para marca, navegação e ações globais.',
		avoid: 'Não use como barra de conteúdo local.',
		accessibility: 'Dê nomes claros aos controles de navegação.'
	},
	Section: {
		summary: 'Região de conteúdo agrupado.',
		when: 'Use para dividir assuntos relacionados.',
		avoid: 'Não use apenas como espaçador.',
		accessibility: 'Associe título visível quando a seção precisar de nome.'
	},
	Footer: {
		summary: 'Rodapé estrutural da aplicação.',
		when: 'Use para versão, suporte e informações finais.',
		avoid: 'Não concentre ações primárias aqui.',
		accessibility: 'Mantenha links e informações concisos.'
	},
	Row: {
		summary: 'Primitiva flexível horizontal.',
		when: 'Use para ações e itens lado a lado.',
		avoid: 'Não use quando a relação for vertical.',
		accessibility: 'A ordem visual deve preservar a ordem lógica.'
	},
	Column: {
		summary: 'Primitiva flexível vertical.',
		when: 'Use para empilhar conteúdo relacionado.',
		avoid: 'Não use para simular listas sem semântica.',
		accessibility: 'Use elementos semânticos dentro dela.'
	},
	Grid: {
		summary: 'Grade responsiva de colunas.',
		when: 'Use para cartões ou itens equivalentes.',
		avoid: 'Não use para sequência de leitura estrita.',
		accessibility: 'A ordem no DOM deve continuar compreensível.'
	},
	Button: {
		summary: 'Ação tátil acionada pelo usuário.',
		when: 'Use para executar uma ação na página.',
		avoid: 'Não use para navegação; use links.',
		accessibility: 'Botões só de ícone exigem aria-label.'
	},
	Tabs: {
		summary: 'Alternância entre painéis relacionados.',
		when: 'Use para conteúdo paralelo no mesmo contexto.',
		avoid: 'Não esconda fluxo essencial em abas.',
		accessibility: 'Use teclado e mantenha o painel ativo identificável.'
	},
	Dropdown: {
		summary: 'Menu de ações contextual.',
		when: 'Use para ações secundárias agrupadas.',
		avoid: 'Não o use para escolhas críticas ocultas.',
		accessibility: 'Escape fecha o menu e o gatilho informa estado.'
	},
	Input: {
		summary: 'Campo de texto de linha única.',
		when: 'Use para valores curtos.',
		avoid: 'Não use para texto longo.',
		accessibility: 'Forneça label associado e estado inválido claro.'
	},
	Textarea: {
		summary: 'Campo de texto multilinha.',
		when: 'Use para mensagens e descrições.',
		avoid: 'Não use para escolhas estruturadas.',
		accessibility: 'Forneça label, instrução e erro quando necessário.'
	},
	Select: {
		summary: 'Seleção de uma opção.',
		when: 'Use para lista definida de alternativas.',
		avoid: 'Não use para poucas opções muito visíveis.',
		accessibility: 'Use placeholder e label que descrevam a escolha.'
	},
	Checkbox: {
		summary: 'Escolha independente ou múltipla.',
		when: 'Use para preferências e múltiplas seleções.',
		avoid: 'Não use para decisão exclusiva.',
		accessibility: 'O rótulo deve explicar o efeito da escolha.'
	},
	Radio: {
		summary: 'Escolha exclusiva em grupo.',
		when: 'Use para uma opção entre alternativas.',
		avoid: 'Não use para ações imediatas.',
		accessibility: 'Agrupe opções e descreva o conjunto.'
	},
	Switch: {
		summary: 'Alternância imediata de estado.',
		when: 'Use para ligar ou desligar uma preferência.',
		avoid: 'Não use para confirmação futura.',
		accessibility: 'O rótulo deve expressar o estado controlado.'
	},
	Slider: {
		summary: 'Ajuste contínuo ou numérico.',
		when: 'Use para intervalos com feedback imediato.',
		avoid: 'Não use para valor exato sem alternativa.',
		accessibility: 'Exiba valor e unidade quando relevantes.'
	},
	Calendar: {
		summary: 'Seleção e visualização de datas.',
		when: 'Use para datas e períodos.',
		avoid: 'Não use como lista de eventos complexos.',
		accessibility: 'Mantenha data selecionada e limites compreensíveis.'
	},
	Chips: {
		summary: 'Coleção editável de etiquetas.',
		when: 'Use para termos curtos e repetíveis.',
		avoid: 'Não use para texto livre longo.',
		accessibility: 'Informe como adicionar e remover itens pelo teclado.'
	},
	Card: {
		summary: 'Bloco visual de conteúdo relacionado.',
		when: 'Use para agrupar informação ou ação autônoma.',
		avoid: 'Não use como contêiner universal.',
		accessibility: 'Não esconda controles importantes por hover.'
	},
	Badge: {
		summary: 'Rótulo curto de status.',
		when: 'Use para categoria, estado ou contagem.',
		avoid: 'Não use como única explicação de cor.',
		accessibility: 'O texto deve comunicar o significado sozinho.'
	},
	Divider: {
		summary: 'Separador visual e semântico.',
		when: 'Use entre grupos de conteúdo relacionados.',
		avoid: 'Não use apenas para criar espaço.',
		accessibility: 'Preserve a hierarquia de headings.'
	},
	Avatar: {
		summary: 'Identidade visual de pessoa ou entidade.',
		when: 'Use com nome, perfil ou autoria.',
		avoid: 'Não use como único identificador.',
		accessibility: 'Defina alt significativo ou oculte imagem decorativa.'
	},
	Alert: {
		summary: 'Mensagem persistente e urgente.',
		when: 'Use para informar sucesso, risco ou erro relevante.',
		avoid: 'Não use para notificações transitórias.',
		accessibility: 'role alert anuncia mudanças importantes.'
	},
	Spinner: {
		summary: 'Indicador de processamento.',
		when: 'Use durante espera com contexto conhecido.',
		avoid: 'Não use sem mensagem ou progresso.',
		accessibility: 'Forneça label que explique o que está carregando.'
	},
	ProgressBar: {
		summary: 'Progresso mensurável de tarefa.',
		when: 'Use quando há valor ou etapa conhecida.',
		avoid: 'Não use para espera indeterminada.',
		accessibility: 'Exponha valor, máximo e descrição útil.'
	},
	Dialog: {
		summary: 'Janela modal para decisão focada.',
		when: 'Use para tarefa que exige atenção imediata.',
		avoid: 'Não use para conteúdo comum.',
		accessibility: 'Foco, Escape e retorno ao gatilho são obrigatórios.'
	},
	Toast: {
		summary: 'Feedback temporário não bloqueante.',
		when: 'Use após ações concluídas.',
		avoid: 'Não use para erros que exigem decisão.',
		accessibility: 'role status anuncia sem interromper o foco.'
	},
	ThemeSelector: {
		summary: 'Alternador entre temas claros e escuros.',
		when: 'Use como preferência visual global.',
		avoid: 'Não use para mudar conteúdo.',
		accessibility: 'O rótulo informa a ação do próximo tema.'
	},
	LocaleSelector: {
		summary: 'Alternador entre idiomas do catálogo.',
		when: 'Use para preferência de idioma global.',
		avoid: 'Não use para traduzir dados de API.',
		accessibility: 'O controle informa o idioma atual e a ação.'
	}
};

const en: GuideSet = {
	Main: {
		summary: 'Primary application structure.',
		when: 'Use as the root of a Shellfish interface.',
		avoid: 'Do not nest other main landmarks.',
		accessibility: 'Keep one main landmark per document.'
	},
	Header: {
		summary: 'Application structural header.',
		when: 'Use for brand, navigation and global actions.',
		avoid: 'Do not use for local content bars.',
		accessibility: 'Give navigation controls clear names.'
	},
	Section: {
		summary: 'Grouped content region.',
		when: 'Use to divide related subjects.',
		avoid: 'Do not use only as a spacer.',
		accessibility: 'Associate a visible title when the section needs a name.'
	},
	Footer: {
		summary: 'Application structural footer.',
		when: 'Use for version, support and closing information.',
		avoid: 'Do not place primary actions here.',
		accessibility: 'Keep links and information concise.'
	},
	Row: {
		summary: 'Horizontal flex primitive.',
		when: 'Use for side-by-side actions and items.',
		avoid: 'Do not use when the relationship is vertical.',
		accessibility: 'Visual order must retain logical order.'
	},
	Column: {
		summary: 'Vertical flex primitive.',
		when: 'Use to stack related content.',
		avoid: 'Do not imitate lists without semantics.',
		accessibility: 'Use semantic elements inside it.'
	},
	Grid: {
		summary: 'Responsive column grid.',
		when: 'Use for cards or equivalent items.',
		avoid: 'Do not use for strict reading sequences.',
		accessibility: 'The DOM order must remain understandable.'
	},
	Button: {
		summary: 'Tactile user-triggered action.',
		when: 'Use to perform an in-page action.',
		avoid: 'Do not use for navigation; use links.',
		accessibility: 'Icon-only buttons require an aria-label.'
	},
	Tabs: {
		summary: 'Switches related panels.',
		when: 'Use for parallel content in the same context.',
		avoid: 'Do not hide essential flow in tabs.',
		accessibility: 'Support keyboard use and identify the active panel.'
	},
	Dropdown: {
		summary: 'Contextual action menu.',
		when: 'Use for grouped secondary actions.',
		avoid: 'Do not hide critical choices.',
		accessibility: 'Escape closes the menu and the trigger exposes state.'
	},
	Input: {
		summary: 'Single-line text field.',
		when: 'Use for short values.',
		avoid: 'Do not use for long text.',
		accessibility: 'Provide an associated label and clear invalid state.'
	},
	Textarea: {
		summary: 'Multiline text field.',
		when: 'Use for messages and descriptions.',
		avoid: 'Do not use for structured choices.',
		accessibility: 'Provide label, instruction and error when needed.'
	},
	Select: {
		summary: 'One-option selection.',
		when: 'Use for a defined list of alternatives.',
		avoid: 'Do not use for a few highly visible choices.',
		accessibility: 'Use a placeholder and label that describe the choice.'
	},
	Checkbox: {
		summary: 'Independent or multiple selection.',
		when: 'Use for preferences and multi-selection.',
		avoid: 'Do not use for exclusive decisions.',
		accessibility: 'The label must explain the choice effect.'
	},
	Radio: {
		summary: 'Exclusive group choice.',
		when: 'Use for one option among alternatives.',
		avoid: 'Do not use for immediate actions.',
		accessibility: 'Group options and describe the set.'
	},
	Switch: {
		summary: 'Immediate state toggle.',
		when: 'Use to turn a preference on or off.',
		avoid: 'Do not use for later confirmation.',
		accessibility: 'The label must express the controlled state.'
	},
	Slider: {
		summary: 'Continuous or numeric adjustment.',
		when: 'Use for ranges with immediate feedback.',
		avoid: 'Do not use for exact values without an alternative.',
		accessibility: 'Show value and unit when relevant.'
	},
	Calendar: {
		summary: 'Date selection and display.',
		when: 'Use for dates and periods.',
		avoid: 'Do not use as a complex events list.',
		accessibility: 'Keep selected date and limits understandable.'
	},
	Chips: {
		summary: 'Editable tag collection.',
		when: 'Use for short repeatable terms.',
		avoid: 'Do not use for long free text.',
		accessibility: 'Explain keyboard adding and removal.'
	},
	Card: {
		summary: 'Related-content visual block.',
		when: 'Use to group autonomous information or action.',
		avoid: 'Do not use as a universal container.',
		accessibility: 'Do not hide important controls on hover.'
	},
	Badge: {
		summary: 'Short status label.',
		when: 'Use for category, state or count.',
		avoid: 'Do not use as the only color explanation.',
		accessibility: 'Text must communicate meaning on its own.'
	},
	Divider: {
		summary: 'Visual and semantic separator.',
		when: 'Use between related content groups.',
		avoid: 'Do not use only to create space.',
		accessibility: 'Preserve heading hierarchy.'
	},
	Avatar: {
		summary: 'Person or entity visual identity.',
		when: 'Use with name, profile or authorship.',
		avoid: 'Do not use as the only identifier.',
		accessibility: 'Set meaningful alt or hide decorative imagery.'
	},
	Alert: {
		summary: 'Persistent urgent message.',
		when: 'Use for relevant success, risk or error.',
		avoid: 'Do not use for transient notifications.',
		accessibility: 'role alert announces important changes.'
	},
	Spinner: {
		summary: 'Processing indicator.',
		when: 'Use during waiting with known context.',
		avoid: 'Do not use without message or progress.',
		accessibility: 'Provide a label that explains what is loading.'
	},
	ProgressBar: {
		summary: 'Measurable task progress.',
		when: 'Use when a value or stage is known.',
		avoid: 'Do not use for indeterminate waiting.',
		accessibility: 'Expose value, maximum and useful description.'
	},
	Dialog: {
		summary: 'Focused modal window.',
		when: 'Use for a task needing immediate attention.',
		avoid: 'Do not use for ordinary content.',
		accessibility: 'Focus, Escape and trigger return are required.'
	},
	Toast: {
		summary: 'Transient non-blocking feedback.',
		when: 'Use after completed actions.',
		avoid: 'Do not use for errors requiring a decision.',
		accessibility: 'role status announces without interrupting focus.'
	},
	ThemeSelector: {
		summary: 'Light and dark theme switcher.',
		when: 'Use as a global visual preference.',
		avoid: 'Do not use to change content.',
		accessibility: 'The label states the next-theme action.'
	},
	LocaleSelector: {
		summary: 'Catalog language switcher.',
		when: 'Use as a global language preference.',
		avoid: 'Do not use to translate API data.',
		accessibility: 'The control states current language and action.'
	}
};

const guides: Record<Locale, GuideSet> = { 'pt-BR': pt, 'en-US': en };

export function getCatalogGuide(locale: Locale, name: string): CatalogGuide {
	return guides[locale][name] ?? guides['pt-BR'][name];
}
