import type { Locale } from '$lib/types/i18n.js';

export const translations: Record<Locale, Record<string, string>> = {
	'pt-BR': {
		// Padrões de Acessibilidade & Controles
		'common.close': 'Fechar',
		'common.cancel': 'Cancelar',
		'common.confirm': 'Confirmar',
		'common.loading': 'Carregando',
		'dialog.close': 'Fechar modal',
		'alert.close': 'Fechar alerta',
		'toast.close': 'Fechar notificação',
		'spinner.loading': 'Carregando...',
		'theme.toggle': 'Alternar tema claro/escuro',
		'locale.toggle': 'Alternar idioma (PT-BR / EN-US)',
		'locale.current': 'PT',
		'locale.name': 'Português (Brasil)',

		// Showcase / Catálogo
		'showcase.title': 'Shellfish UI',
		'showcase.subtitle': 'Design System Tátil para a Suíte Zoo',
		'showcase.tabs.actions': 'Ações & Navegação',
		'showcase.tabs.forms': 'Formulários',
		'showcase.tabs.display': 'Superfícies & Exibição',
		'showcase.tabs.feedback': 'Feedback & Diálogos',
		'showcase.buttonVariants.title': 'Variantes de Botão',
		'showcase.buttonVariants.desc':
			'Física mecânica real: sombra sólida de 1px no repouso, elevação de 2px no hover, e compressão no chão no clique.',
		'showcase.buttons.primary': 'Principal',
		'showcase.buttons.secondary': 'Secundário',
		'showcase.buttons.outline': 'Contorno',
		'showcase.buttons.ghost': 'Fantasma',
		'showcase.buttons.danger': 'Perigo',
		'showcase.buttonSizes.title': 'Tamanhos & Estados de Botão',
		'showcase.buttons.small': 'Pequeno (SM)',
		'showcase.buttons.medium': 'Médio (MD)',
		'showcase.buttons.large': 'Grande (LG)',
		'showcase.buttons.clickToLoad': 'Clique para Carregar',
		'showcase.buttons.loading': 'Carregando...',
		'showcase.buttons.disabled': 'Desabilitado',
		'showcase.buttons.quickAction': 'Ação rápida',
		'showcase.forms.title': 'Controles de Entrada',
		'showcase.forms.simulateInvalid': 'Simular estado inválido nos campos',
		'showcase.forms.inputLabel': 'Campo de Texto',
		'showcase.forms.inputPlaceholder': 'Digite seu texto...',
		'showcase.forms.selectLabel': 'Seleção (Select)',
		'showcase.forms.selectOption1': 'Opção 1 - Principal',
		'showcase.forms.selectOption2': 'Opção 2 - Secundária',
		'showcase.forms.selectOption3': 'Opção 3 - Desabilitada',
		'showcase.forms.textareaLabel': 'Área de Texto (Textarea)',
		'showcase.forms.textareaDefault': 'Área de texto com foco tátil e expansão vertical.',
		'showcase.forms.tactileSelections': 'Seleções Táteis',
		'showcase.forms.checkboxes': 'Checkboxes',
		'showcase.forms.checkedOption': 'Opção marcada',
		'showcase.forms.indeterminateOption': 'Opção indeterminada',
		'showcase.forms.disabledOption': 'Opção desabilitada',
		'showcase.forms.radios': 'Radios',
		'showcase.forms.radioA': 'Opção A',
		'showcase.forms.radioB': 'Opção B',
		'showcase.forms.radioCDisabled': 'Opção C (Desabilitada)',
		'showcase.display.badgesTitle': 'Badges & Marcadores',
		'showcase.display.avatarsTitle': 'Avatares',
		'showcase.display.interactiveCardTitle': 'Card Interativo com Elevação Tátil',
		'showcase.display.interactiveCardDesc':
			'Passe o cursor sobre este card ou clique nele para sentir a física de interação tátil neobrutalista.',
		'showcase.display.collapsibleCardTitle': 'Painel Expansível (Collapsible)',
		'showcase.display.collapsibleCardDesc':
			'Clique no cabeçalho para recolher ou expandir o conteúdo com rotação suave de chevron.',
		'showcase.display.cardActionsTitle': 'Painel com Ações no Cabeçalho & Rodapé',
		'showcase.display.cardActionsDesc':
			'Cabeçalho e rodapé travados em 42px. Botões de 32px se acomodam perfeitamente sem esticar o painel.',
		'showcase.display.cardHeaderAction': 'Ação Rápida',
		'showcase.display.badgeCardTitle': 'Painel com Placa na Borda (Straddled Badge)',
		'showcase.display.badgeCardDesc':
			'A placa de identificação fica cravada a 50% na linha da borda superior como uma etiqueta de hardware.',
		'showcase.display.badgeCardBadge': 'Módulo de Telemetria #01',
		'showcase.forms.badgedInputsTitle': 'Campos com Placa/Etiqueta Integrada na Borda',
		'showcase.feedback.infoTitle': 'Informação',
		'showcase.feedback.infoMsg': 'Este é um banner de alerta informativo com tag semântica pura.',
		'showcase.feedback.successTitle': 'Sucesso',
		'showcase.feedback.successMsg': 'Operação realizada com sucesso. Você pode fechar este alerta.',
		'showcase.feedback.warningTitle': 'Atenção',
		'showcase.feedback.warningMsg': 'Verifique suas credenciais antes de continuar o processo.',
		'showcase.feedback.dangerTitle': 'Erro Crítico',
		'showcase.feedback.dangerMsg': 'Falha ao conectar com o serviço remoto. Tente novamente.',
		'showcase.feedback.spinnersTitle': 'Spinners Neobrutalistas Quadrados',
		'showcase.feedback.spinnerRatchet': 'Catraca Mecânica (90° Stepped)',
		'showcase.feedback.spinnerChaser': 'Trilha Perimetral (Border Chaser)',
		'showcase.feedback.dialogsTitle': 'Diálogos Nativos & Notificações',
		'showcase.feedback.openDialog': 'Abrir Modal Nativo',
		'showcase.feedback.triggerToast': 'Disparar Notificação Toast',
		'showcase.dialog.title': 'Diálogo Modal Nativo',
		'showcase.dialog.desc':
			'Este modal utiliza a tag nativa <dialog> do HTML5 com renderização na Top Layer do navegador, eliminando conflitos de z-index e fornecendo acessibilidade nativa com suporte à tecla ESC.',
		'showcase.toast.title': 'Ação executada:',
		'showcase.toast.msg': 'Demonstração de notificação flutuante com auto-dismiss.',
		'showcase.footer.tagline': 'Shellfish UI — Design System Nativo do Zoo',
		'showcase.footer.port': 'Porta 5172'
	},
	'en-US': {
		// Accessibility Defaults & Controls
		'common.close': 'Close',
		'common.cancel': 'Cancel',
		'common.confirm': 'Confirm',
		'common.loading': 'Loading',
		'dialog.close': 'Close modal',
		'alert.close': 'Close alert',
		'toast.close': 'Close notification',
		'spinner.loading': 'Loading...',
		'theme.toggle': 'Toggle light/dark theme',
		'locale.toggle': 'Toggle language (PT-BR / EN-US)',
		'locale.current': 'EN',
		'locale.name': 'English (US)',

		// Showcase / Catalog
		'showcase.title': 'Shellfish UI',
		'showcase.subtitle': 'Tactile Design System for Monsan Zoo Suite',
		'showcase.tabs.actions': 'Actions & Navigation',
		'showcase.tabs.forms': 'Forms',
		'showcase.tabs.display': 'Surfaces & Display',
		'showcase.tabs.feedback': 'Feedback & Dialogs',
		'showcase.buttonVariants.title': 'Button Variants',
		'showcase.buttonVariants.desc':
			'Real mechanical physics: 1px solid shadow at rest, 2px elevation on hover, and ground compression on click.',
		'showcase.buttons.primary': 'Primary',
		'showcase.buttons.secondary': 'Secondary',
		'showcase.buttons.outline': 'Outline',
		'showcase.buttons.ghost': 'Ghost',
		'showcase.buttons.danger': 'Danger',
		'showcase.buttonSizes.title': 'Button Sizes & States',
		'showcase.buttons.small': 'Small (SM)',
		'showcase.buttons.medium': 'Medium (MD)',
		'showcase.buttons.large': 'Large (LG)',
		'showcase.buttons.clickToLoad': 'Click to Load',
		'showcase.buttons.loading': 'Loading...',
		'showcase.buttons.disabled': 'Disabled',
		'showcase.buttons.quickAction': 'Quick action',
		'showcase.forms.title': 'Input Controls',
		'showcase.forms.simulateInvalid': 'Simulate invalid state on fields',
		'showcase.forms.inputLabel': 'Text Input',
		'showcase.forms.inputPlaceholder': 'Type your text...',
		'showcase.forms.selectLabel': 'Selection (Select)',
		'showcase.forms.selectOption1': 'Option 1 - Primary',
		'showcase.forms.selectOption2': 'Option 2 - Secondary',
		'showcase.forms.selectOption3': 'Option 3 - Disabled',
		'showcase.forms.textareaLabel': 'Textarea',
		'showcase.forms.textareaDefault': 'Textarea with tactile focus and vertical expansion.',
		'showcase.forms.tactileSelections': 'Tactile Selections',
		'showcase.forms.checkboxes': 'Checkboxes',
		'showcase.forms.checkedOption': 'Checked option',
		'showcase.forms.indeterminateOption': 'Indeterminate option',
		'showcase.forms.disabledOption': 'Disabled option',
		'showcase.forms.radios': 'Radios',
		'showcase.forms.radioA': 'Option A',
		'showcase.forms.radioB': 'Option B',
		'showcase.forms.radioCDisabled': 'Option C (Disabled)',
		'showcase.display.badgesTitle': 'Badges & Markers',
		'showcase.display.avatarsTitle': 'Avatars',
		'showcase.display.interactiveCardTitle': 'Interactive Card with Tactile Elevation',
		'showcase.display.interactiveCardDesc':
			'Hover over this card or click on it to feel the neobrutalist tactile interaction physics.',
		'showcase.display.collapsibleCardTitle': 'Collapsible Panel (Collapsible)',
		'showcase.display.collapsibleCardDesc':
			'Click the header to collapse or expand content with smooth chevron rotation.',
		'showcase.display.cardActionsTitle': 'Panel with Header & Footer Actions',
		'showcase.display.cardActionsDesc':
			'Header and footer locked at 42px. 32px buttons fit perfectly without stretching the panel.',
		'showcase.display.cardHeaderAction': 'Quick Action',
		'showcase.display.badgeCardTitle': 'Panel with Straddled Plate (Straddled Badge)',
		'showcase.display.badgeCardDesc':
			'The identification plate is mounted 50% across the top border line as a hardware tag.',
		'showcase.display.badgeCardBadge': 'Telemetry Module #01',
		'showcase.forms.badgedInputsTitle': 'Fields with Straddled Plate Labels',
		'showcase.feedback.infoTitle': 'Information',
		'showcase.feedback.infoMsg': 'This is an informative alert banner with pure semantic tag.',
		'showcase.feedback.successTitle': 'Success',
		'showcase.feedback.successMsg': 'Operation completed successfully. You can close this alert.',
		'showcase.feedback.warningTitle': 'Warning',
		'showcase.feedback.warningMsg': 'Check your credentials before continuing the process.',
		'showcase.feedback.dangerTitle': 'Critical Error',
		'showcase.feedback.dangerMsg': 'Failed to connect to the remote service. Please try again.',
		'showcase.feedback.spinnersTitle': 'Neobrutalist Square Spinners',
		'showcase.feedback.spinnerRatchet': 'Mechanical Ratchet (90° Stepped)',
		'showcase.feedback.spinnerChaser': 'Perimeter Chaser (Border Chaser)',
		'showcase.feedback.dialogsTitle': 'Native Dialogs & Notifications',
		'showcase.feedback.openDialog': 'Open Native Modal',
		'showcase.feedback.triggerToast': 'Trigger Toast Notification',
		'showcase.dialog.title': 'Native Modal Dialog',
		'showcase.dialog.desc':
			'This modal uses HTML5 native <dialog> tag with Top Layer rendering in the browser, eliminating z-index conflicts and providing native a11y with ESC key support.',
		'showcase.toast.title': 'Action executed:',
		'showcase.toast.msg': 'Floating notification demonstration with auto-dismiss.',
		'showcase.footer.tagline': 'Shellfish UI — Native Zoo Design System',
		'showcase.footer.port': 'Port 5172'
	}
};

class I18nManager {
	currentLocale = $state<Locale>('pt-BR');
	storageKey = 'shellfish-locale';

	constructor() {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem(this.storageKey) as Locale | null;
			if (saved === 'pt-BR' || saved === 'en-US') {
				this.currentLocale = saved;
				document.documentElement.lang = saved;
			}
		}
	}

	setLocale(locale: Locale) {
		this.currentLocale = locale;
		if (typeof window !== 'undefined') {
			localStorage.setItem(this.storageKey, locale);
			document.documentElement.lang = locale;
		}
	}

	toggleLocale() {
		const nextLocale: Locale = this.currentLocale === 'pt-BR' ? 'en-US' : 'pt-BR';
		this.setLocale(nextLocale);
	}

	t(key: string, params?: Record<string, string | number>): string {
		const dict = translations[this.currentLocale] ?? translations['pt-BR'];
		let text = dict[key] ?? translations['pt-BR'][key] ?? key;

		if (params) {
			for (const [k, v] of Object.entries(params)) {
				text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
			}
		}

		return text;
	}
}

export const i18n = new I18nManager();
export const t = (key: string, params?: Record<string, string | number>) => i18n.t(key, params);
