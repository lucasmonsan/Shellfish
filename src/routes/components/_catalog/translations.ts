import type { Locale } from '$lib/types/i18n.js';

const translations: Record<Locale, Record<string, string>> = {
	'pt-BR': {
		'catalog.title': 'Componentes',
		'catalog.description': 'Referência interativa da Shellfish.',
		'catalog.search': 'Buscar componentes',
		'catalog.empty': 'Nenhum componente encontrado.',
		'catalog.back': 'Voltar para componentes',
		'catalog.category.layout': 'Layout',
		'catalog.category.actions': 'Ações',
		'catalog.category.forms': 'Formulários',
		'catalog.category.display': 'Exibição',
		'catalog.category.feedback': 'Feedback',
		'catalog.category.suite': 'Suíte',
		'catalog.playground': 'Playground',
		'catalog.controls': 'Props',
		'catalog.preview': 'Prévia',
		'catalog.code': 'Código',
		'catalog.copy': 'Copiar código',
		'catalog.copied': 'Código copiado',
		'catalog.api': 'API',
		'catalog.native': 'Atributos nativos',
		'catalog.nativeDescription': 'Atributos HTML compatíveis são encaminhados ao elemento raiz.',
		'catalog.a11y': 'Acessibilidade',
		'catalog.a11yDescription':
			'Use rótulos claros, mantenha o foco visível e opere interações pelo teclado.',
		'catalog.a11y.alert':
			'Alert usa uma região viva assertiva com div e role="alert"; não use aside para esse papel.',
		'catalog.a11y.toast':
			'Toast usa uma região viva polida com div, role="status" e aria-live="polite"; não use aside para esse papel.',
		'catalog.when': 'Quando usar',
		'catalog.whenDescription':
			'Use quando a semântica e a API deste componente representarem a interação necessária.',
		'catalog.avoid': 'Quando não usar',
		'catalog.avoidDescription':
			'Não use para simular um elemento nativo ou uma semântica diferente.',
		'catalog.example': 'Conteúdo de exemplo',
		'catalog.scenario': 'Cenário',
		'catalog.default': 'Padrão',
		'catalog.required': 'obrigatória',
		'catalog.optional': 'opcional',
		'catalog.loadError': 'Não foi possível carregar o componente.',
		'catalog.homeTitle': 'Shellfish',
		'catalog.homeDescription': 'Biblioteca de componentes Svelte 5 para a suíte Zoo.',
		'catalog.openCatalog': 'Abrir catálogo'
	},
	'en-US': {
		'catalog.title': 'Components',
		'catalog.description': 'Shellfish interactive reference.',
		'catalog.search': 'Search components',
		'catalog.empty': 'No components found.',
		'catalog.back': 'Back to components',
		'catalog.category.layout': 'Layout',
		'catalog.category.actions': 'Actions',
		'catalog.category.forms': 'Forms',
		'catalog.category.display': 'Display',
		'catalog.category.feedback': 'Feedback',
		'catalog.category.suite': 'Suite',
		'catalog.playground': 'Playground',
		'catalog.controls': 'Props',
		'catalog.preview': 'Preview',
		'catalog.code': 'Code',
		'catalog.copy': 'Copy code',
		'catalog.copied': 'Code copied',
		'catalog.api': 'API',
		'catalog.native': 'Native attributes',
		'catalog.nativeDescription': 'Compatible HTML attributes are forwarded to the root element.',
		'catalog.a11y': 'Accessibility',
		'catalog.a11yDescription':
			'Use clear labels, retain visible focus and operate interactions with a keyboard.',
		'catalog.a11y.alert':
			'Alert uses an assertive live region with div and role="alert"; do not use aside for this role.',
		'catalog.a11y.toast':
			'Toast uses a polite live region with div, role="status" and aria-live="polite"; do not use aside for this role.',
		'catalog.when': 'When to use',
		'catalog.whenDescription':
			'Use when this component’s semantics and API match the requested interaction.',
		'catalog.avoid': 'When not to use',
		'catalog.avoidDescription': 'Do not use it to imitate a native element or different semantics.',
		'catalog.example': 'Example content',
		'catalog.scenario': 'Scenario',
		'catalog.default': 'Default',
		'catalog.required': 'required',
		'catalog.optional': 'optional',
		'catalog.loadError': 'The component could not be loaded.',
		'catalog.homeTitle': 'Shellfish',
		'catalog.homeDescription': 'Svelte 5 component library for the Zoo suite.',
		'catalog.openCatalog': 'Open catalog'
	}
};

export function catalogT(locale: Locale, key: string): string {
	return translations[locale][key] ?? translations['pt-BR'][key] ?? key;
}

export { translations as catalogTranslations };
