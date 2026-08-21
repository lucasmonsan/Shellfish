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
		'calendar.toggleMonth': 'Alternar visualização mensal completa',
		'calendar.prevMonth': 'Mês anterior',
		'calendar.nextMonth': 'Próximo mês',
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
		'showcase.chips.title': 'Chips & Tags Selecionáveis',
		'showcase.dropdown.title': 'Dropdowns & Menus Suspensos',
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
		'showcase.forms.tactileSelections': 'Seleções Táteis & Switches',
		'showcase.forms.checkboxes': 'Checkboxes',
		'showcase.forms.checkedOption': 'Opção marcada',
		'showcase.forms.indeterminateOption': 'Opção indeterminada',
		'showcase.forms.disabledOption': 'Opção desabilitada',
		'showcase.forms.radios': 'Radios',
		'showcase.forms.radioA': 'Opção A',
		'showcase.forms.radioB': 'Opção B',
		'showcase.forms.radioCDisabled': 'Opção C (Desabilitada)',
		'showcase.forms.switches': 'Switches (Chaves Mecânicas)',
		'showcase.forms.slider': 'Slider / Range',
		'showcase.forms.calendar': 'Calendário (Week, Month, Expandable)',
		'showcase.forms.choiceCards': 'Cards Selecionáveis (Radio / Checkbox Card)',
		'showcase.display.badgesTitle': 'Badges & Marcadores',
		'showcase.display.avatarsTitle': 'Avatares Quadrados Neobrutalistas',
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
		'showcase.display.flipCardTitle': 'Card 3D Flip (Frente e Verso)',
		'showcase.display.flipCardDesc':
			'Vire o card para ver informações secundárias sem sobrecarregar a interface inicial.',
		'showcase.display.flipBtn': 'Virar Card',
		'showcase.display.flipBackTitle': 'Verso do Cartão',
		'showcase.display.flipBackDesc':
			'Este verso foi renderizado através do snippet back() do Card.',
		'showcase.forms.badgedInputsTitle': 'Campos com Notched Label (Legenda Integrada)',
		'showcase.feedback.progressBarTitle': 'Barras de Progresso',
		'showcase.feedback.infoTitle': 'Informação',
		'showcase.feedback.infoMsg': 'Este é um banner de alerta informativo com tag semântica pura.',
		'showcase.feedback.successTitle': 'Sucesso',
		'showcase.feedback.successMsg': 'Operação realizada com sucesso. Você pode fechar este alerta.',
		'showcase.feedback.warningTitle': 'Atenção',
		'showcase.feedback.warningMsg': 'Verifique suas credenciais antes de continuar o processo.',
		'showcase.feedback.dangerTitle': 'Erro Crítico',
		'showcase.feedback.dangerMsg': 'Falha ao conectar com o serviço remoto. Tente novamente.',
		'showcase.feedback.spinnersTitle': 'Spinners Neobrutalistas Quadrados',
		'showcase.feedback.spinnerCube': 'Cubo Fluido MonsanUI (Ease-in-out)',
		'showcase.feedback.spinnerRatchet': 'Catraca Mecânica (Steps 8 / 1.6s)',
		'showcase.feedback.spinnerChaser': 'Trilha Perimetral Terracota',
		'showcase.feedback.dialogsTitle': 'Diálogos Nativos & Notificações',
		'showcase.feedback.openDialog': 'Abrir Modal Nativo',
		'showcase.feedback.triggerToast': 'Disparar Notificação Toast',
		'showcase.dialog.title': 'Diálogo Modal Nativo',
		'showcase.dialog.desc':
			'Este modal utiliza a tag nativa <dialog> do HTML5 com animação física suave de entrada e saída (dialogPopOut) e overlay de alto desempenho.',
		'showcase.toast.title': 'Ação executada:',
		'showcase.toast.msg': 'Demonstração de notificação flutuante com transição fly suave.',
		'showcase.footer.tagline': 'Shellfish UI — Design System Nativo do Zoo',
		'showcase.footer.port': 'Porta 5172'
	},
	'en-US': {
		// Accessibility Standards & Controls
		'common.close': 'Close',
		'common.cancel': 'Cancel',
		'common.confirm': 'Confirm',
		'common.loading': 'Loading',
		'dialog.close': 'Close modal',
		'alert.close': 'Close alert',
		'toast.close': 'Close toast notification',
		'spinner.loading': 'Loading...',
		'calendar.toggleMonth': 'Toggle full month view',
		'calendar.prevMonth': 'Previous month',
		'calendar.nextMonth': 'Next month',
		'theme.toggle': 'Toggle light/dark theme',
		'locale.toggle': 'Toggle language (PT-BR / EN-US)',
		'locale.current': 'EN',
		'locale.name': 'English (US)',

		// Showcase / Catalog
		'showcase.title': 'Shellfish UI',
		'showcase.subtitle': 'Tactile Design System for Zoo Suite',
		'showcase.tabs.actions': 'Actions & Navigation',
		'showcase.tabs.forms': 'Forms',
		'showcase.tabs.display': 'Surfaces & Display',
		'showcase.tabs.feedback': 'Feedback & Dialogs',
		'showcase.buttonVariants.title': 'Button Variants',
		'showcase.buttonVariants.desc':
			'Real physical mechanics: 1px solid shadow at rest, 2px elevation on hover, and press-down compression on click.',
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
		'showcase.chips.title': 'Selectable Chips & Tags',
		'showcase.dropdown.title': 'Dropdowns & Menus',
		'showcase.forms.title': 'Form Controls',
		'showcase.forms.simulateInvalid': 'Simulate invalid field states',
		'showcase.forms.inputLabel': 'Text Input',
		'showcase.forms.inputPlaceholder': 'Type your text...',
		'showcase.forms.selectLabel': 'Select Menu',
		'showcase.forms.selectOption1': 'Option 1 - Primary',
		'showcase.forms.selectOption2': 'Option 2 - Secondary',
		'showcase.forms.selectOption3': 'Option 3 - Disabled',
		'showcase.forms.textareaLabel': 'Text Area',
		'showcase.forms.textareaDefault': 'Text area with tactile focus and vertical expansion.',
		'showcase.forms.tactileSelections': 'Tactile Selections & Switches',
		'showcase.forms.checkboxes': 'Checkboxes',
		'showcase.forms.checkedOption': 'Checked option',
		'showcase.forms.indeterminateOption': 'Indeterminate option',
		'showcase.forms.disabledOption': 'Disabled option',
		'showcase.forms.radios': 'Radios',
		'showcase.forms.radioA': 'Option A',
		'showcase.forms.radioB': 'Option B',
		'showcase.forms.radioCDisabled': 'Option C (Disabled)',
		'showcase.forms.switches': 'Switches (Mechanical Toggles)',
		'showcase.forms.slider': 'Slider / Range',
		'showcase.forms.calendar': 'Calendar (Week, Month, Expandable)',
		'showcase.forms.choiceCards': 'Selectable Cards (Radio / Checkbox Card)',
		'showcase.display.badgesTitle': 'Badges & Markers',
		'showcase.display.avatarsTitle': 'Square Neobrutalist Avatars',
		'showcase.display.interactiveCardTitle': 'Interactive Card with Tactile Lift',
		'showcase.display.interactiveCardDesc':
			'Hover or click this card to feel the neobrutalist tactile physical response.',
		'showcase.display.collapsibleCardTitle': 'Collapsible Panel',
		'showcase.display.collapsibleCardDesc':
			'Click the header to expand or collapse contents with smooth chevron rotation.',
		'showcase.display.cardActionsTitle': 'Panel with Header & Footer Actions',
		'showcase.display.cardActionsDesc':
			'Header and footer locked at 42px. 32px buttons fit seamlessly without stretching the card.',
		'showcase.display.cardHeaderAction': 'Quick Action',
		'showcase.display.badgeCardTitle': 'Border Straddled Plate Badge',
		'showcase.display.badgeCardDesc':
			'Identification plate is straddled at 50% along the top border line like hardware stamping.',
		'showcase.display.badgeCardBadge': 'Telemetry Module #01',
		'showcase.display.flipCardTitle': '3D Flip Card (Front & Back)',
		'showcase.display.flipCardDesc':
			'Flip the card to inspect secondary details without cluttering the primary view.',
		'showcase.display.flipBtn': 'Flip Card',
		'showcase.display.flipBackTitle': 'Card Reverse Side',
		'showcase.display.flipBackDesc':
			'This reverse side is rendered via the snippet back() on Card.',
		'showcase.forms.badgedInputsTitle': 'Inputs with Notched Legend (Clean Upper Line)',
		'showcase.feedback.progressBarTitle': 'Progress Bars',
		'showcase.feedback.infoTitle': 'Information',
		'showcase.feedback.infoMsg': 'This is an informative alert banner using pure semantic tags.',
		'showcase.feedback.successTitle': 'Success',
		'showcase.feedback.successMsg': 'Operation finished successfully. You may close this alert.',
		'showcase.feedback.warningTitle': 'Warning',
		'showcase.feedback.warningMsg': 'Please verify your credentials before proceeding.',
		'showcase.feedback.dangerTitle': 'Critical Error',
		'showcase.feedback.dangerMsg': 'Failed to connect to remote service. Please try again.',
		'showcase.feedback.spinnersTitle': 'Square Neobrutalist Spinners',
		'showcase.feedback.spinnerCube': 'MonsanUI Fluid Cube (Ease-in-out)',
		'showcase.feedback.spinnerRatchet': 'Mechanical Ratchet (Steps 8 / 1.6s)',
		'showcase.feedback.spinnerChaser': 'Terracotta Perimeter Chaser',
		'showcase.feedback.dialogsTitle': 'Native Dialogs & Notifications',
		'showcase.feedback.openDialog': 'Open Native Modal',
		'showcase.feedback.triggerToast': 'Trigger Toast Notification',
		'showcase.dialog.title': 'Native Modal Dialog',
		'showcase.dialog.desc':
			'This modal uses native HTML5 <dialog> with smooth physical entry and exit animations (dialogPopOut) and zero-blur high-performance overlay.',
		'showcase.toast.title': 'Action executed:',
		'showcase.toast.msg': 'Floating toast notification demonstration with smooth fly transition.',
		'showcase.footer.tagline': 'Shellfish UI — Zoo Native Design System',
		'showcase.footer.port': 'Port 5172'
	}
};

let currentLocale = $state<Locale>('pt-BR');
let activeStorageKey = 'zoo_locale';

export const i18n = {
	get currentLocale(): Locale {
		return currentLocale;
	},
	get locale(): Locale {
		return currentLocale;
	},
	set locale(val: Locale) {
		this.setLocale(val);
	},
	get storageKey(): string {
		return activeStorageKey;
	},
	set storageKey(val: string) {
		activeStorageKey = val;
	},
	setLocale(val: Locale) {
		if (translations[val]) {
			currentLocale = val;
			if (typeof window !== 'undefined') {
				try {
					localStorage.setItem(activeStorageKey, val);
				} catch {
					// Ignora indisponibilidade do localStorage
				}
			}
			if (typeof document !== 'undefined') {
				document.documentElement.lang = val;
			}
		}
	},
	toggleLocale(): Locale {
		const next: Locale = currentLocale === 'pt-BR' ? 'en-US' : 'pt-BR';
		this.setLocale(next);
		return next;
	},
	t(key: string, params?: Record<string, string | number>): string {
		const dict = translations[currentLocale] || translations['pt-BR'];
		let msg = dict[key] || translations['pt-BR']?.[key] || key;
		if (params) {
			for (const [k, v] of Object.entries(params)) {
				msg = msg.replaceAll(`{${k}}`, String(v));
			}
		}
		return msg;
	}
};

export const t = (key: string, params?: Record<string, string | number>) => i18n.t(key, params);
