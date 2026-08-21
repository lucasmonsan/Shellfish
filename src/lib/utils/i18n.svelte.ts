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
		'calendar.toggleMonth': 'Alternar mês',
		'calendar.prevMonth': 'Mês anterior',
		'calendar.nextMonth': 'Próximo mês',
		'theme.toggle': 'Alternar tema',
		'locale.toggle': 'Alternar idioma',
		'locale.current': 'PT',
		'locale.name': 'Português',

		// Showcase / Catálogo (Nomes Diretos)
		'showcase.title': 'Shellfish',
		'showcase.subtitle': 'Design System',
		'showcase.tabs.actions': 'Ações',
		'showcase.tabs.forms': 'Formulários',
		'showcase.tabs.display': 'Superfícies',
		'showcase.tabs.feedback': 'Feedback',
		'showcase.buttonVariants.title': 'Botões',
		'showcase.buttons.primary': 'Principal',
		'showcase.buttons.secondary': 'Secundário',
		'showcase.buttons.outline': 'Contorno',
		'showcase.buttons.ghost': 'Fantasma',
		'showcase.buttons.danger': 'Perigo',
		'showcase.buttonSizes.title': 'Tamanhos de Botão',
		'showcase.buttons.small': 'Pequeno',
		'showcase.buttons.medium': 'Médio',
		'showcase.buttons.large': 'Grande',
		'showcase.buttons.clickToLoad': 'Carregar',
		'showcase.buttons.loading': 'Carregando...',
		'showcase.buttons.disabled': 'Desabilitado',
		'showcase.chips.title': 'Chips',
		'showcase.dropdown.title': 'Dropdowns',
		'showcase.forms.title': 'Entradas de Texto',
		'showcase.forms.simulateInvalid': 'Simular estado inválido',
		'showcase.forms.inputLabel': 'Texto',
		'showcase.forms.inputPlaceholder': 'Digite aqui...',
		'showcase.forms.selectLabel': 'Seleção',
		'showcase.forms.selectOption1': 'Opção 1',
		'showcase.forms.selectOption2': 'Opção 2',
		'showcase.forms.selectOption3': 'Opção 3 (Desabilitada)',
		'showcase.forms.textareaLabel': 'Área de Texto',
		'showcase.forms.textareaDefault': 'Texto de exemplo.',
		'showcase.forms.switches': 'Switches',
		'showcase.forms.slider': 'Slider',
		'showcase.forms.calendar': 'Calendário',
		'showcase.forms.choiceCards': 'Card',
		'showcase.forms.checkboxes': 'Checkboxes',
		'showcase.forms.checkedOption': 'Marcado',
		'showcase.forms.indeterminateOption': 'Indeterminado',
		'showcase.forms.disabledOption': 'Desabilitado',
		'showcase.forms.radios': 'Radios',
		'showcase.forms.radioA': 'Opção A',
		'showcase.forms.radioB': 'Opção B',
		'showcase.forms.radioCDisabled': 'Opção C (Desabilitada)',
		'showcase.display.badgesTitle': 'Badges & Avatares',
		'showcase.display.cardsTitle': 'Cards',
		'showcase.display.flipBtn': 'Virar',
		'showcase.display.flipBackTitle': 'Verso do Card',
		'showcase.display.flipBackDesc': 'Renderizado via snippet back().',
		'showcase.feedback.progressBarTitle': 'Progresso',
		'showcase.feedback.infoTitle': 'Informação',
		'showcase.feedback.infoMsg': 'Alerta informativo.',
		'showcase.feedback.successTitle': 'Sucesso',
		'showcase.feedback.successMsg': 'Operação realizada com sucesso.',
		'showcase.feedback.warningTitle': 'Atenção',
		'showcase.feedback.warningMsg': 'Verifique as informações antes de continuar.',
		'showcase.feedback.dangerTitle': 'Erro',
		'showcase.feedback.dangerMsg': 'Falha na operação.',
		'showcase.feedback.spinnersTitle': 'Spinners',
		'showcase.feedback.spinnerCube': 'Cubo',
		'showcase.feedback.spinnerRatchet': 'Catraca',
		'showcase.feedback.spinnerChaser': 'Trilha',
		'showcase.feedback.dialogsTitle': 'Modais & Toasts',
		'showcase.feedback.openDialog': 'Abrir Modal',
		'showcase.feedback.triggerToast': 'Disparar Toast',
		'showcase.dialog.title': 'Diálogo Modal',
		'showcase.dialog.desc': 'Modal nativo com animação pop-out.',
		'showcase.toast.title': 'Notificação',
		'showcase.toast.msg': 'Ação executada com sucesso.',
		'showcase.footer.tagline': 'Shellfish — Design System Zoo',
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
		'toast.close': 'Close toast',
		'spinner.loading': 'Loading...',
		'calendar.toggleMonth': 'Toggle month',
		'calendar.prevMonth': 'Previous month',
		'calendar.nextMonth': 'Next month',
		'theme.toggle': 'Toggle theme',
		'locale.toggle': 'Toggle language',
		'locale.current': 'EN',
		'locale.name': 'English',

		// Showcase / Catalog (Direct Nouns)
		'showcase.title': 'Shellfish',
		'showcase.subtitle': 'Design System',
		'showcase.tabs.actions': 'Actions',
		'showcase.tabs.forms': 'Forms',
		'showcase.tabs.display': 'Surfaces',
		'showcase.tabs.feedback': 'Feedback',
		'showcase.buttonVariants.title': 'Buttons',
		'showcase.buttons.primary': 'Primary',
		'showcase.buttons.secondary': 'Secondary',
		'showcase.buttons.outline': 'Outline',
		'showcase.buttons.ghost': 'Ghost',
		'showcase.buttons.danger': 'Danger',
		'showcase.buttonSizes.title': 'Button Sizes',
		'showcase.buttons.small': 'Small',
		'showcase.buttons.medium': 'Medium',
		'showcase.buttons.large': 'Large',
		'showcase.buttons.clickToLoad': 'Load',
		'showcase.buttons.loading': 'Loading...',
		'showcase.buttons.disabled': 'Disabled',
		'showcase.chips.title': 'Chips',
		'showcase.dropdown.title': 'Dropdowns',
		'showcase.forms.title': 'Text Inputs',
		'showcase.forms.simulateInvalid': 'Simulate invalid state',
		'showcase.forms.inputLabel': 'Text',
		'showcase.forms.inputPlaceholder': 'Type here...',
		'showcase.forms.selectLabel': 'Select',
		'showcase.forms.selectOption1': 'Option 1',
		'showcase.forms.selectOption2': 'Option 2',
		'showcase.forms.selectOption3': 'Option 3 (Disabled)',
		'showcase.forms.textareaLabel': 'Textarea',
		'showcase.forms.textareaDefault': 'Sample text.',
		'showcase.forms.switches': 'Switches',
		'showcase.forms.slider': 'Slider',
		'showcase.forms.calendar': 'Calendar',
		'showcase.forms.choiceCards': 'Card',
		'showcase.forms.checkboxes': 'Checkboxes',
		'showcase.forms.checkedOption': 'Checked',
		'showcase.forms.indeterminateOption': 'Indeterminate',
		'showcase.forms.disabledOption': 'Disabled',
		'showcase.forms.radios': 'Radios',
		'showcase.forms.radioA': 'Option A',
		'showcase.forms.radioB': 'Option B',
		'showcase.forms.radioCDisabled': 'Option C (Disabled)',
		'showcase.display.badgesTitle': 'Badges & Avatars',
		'showcase.display.cardsTitle': 'Cards',
		'showcase.display.flipBtn': 'Flip',
		'showcase.display.flipBackTitle': 'Card Reverse',
		'showcase.display.flipBackDesc': 'Rendered via back() snippet.',
		'showcase.feedback.progressBarTitle': 'Progress',
		'showcase.feedback.infoTitle': 'Information',
		'showcase.feedback.infoMsg': 'Informative alert.',
		'showcase.feedback.successTitle': 'Success',
		'showcase.feedback.successMsg': 'Operation completed successfully.',
		'showcase.feedback.warningTitle': 'Warning',
		'showcase.feedback.warningMsg': 'Please check details before proceeding.',
		'showcase.feedback.dangerTitle': 'Error',
		'showcase.feedback.dangerMsg': 'Operation failed.',
		'showcase.feedback.spinnersTitle': 'Spinners',
		'showcase.feedback.spinnerCube': 'Cube',
		'showcase.feedback.spinnerRatchet': 'Ratchet',
		'showcase.feedback.spinnerChaser': 'Track',
		'showcase.feedback.dialogsTitle': 'Modals & Toasts',
		'showcase.feedback.openDialog': 'Open Modal',
		'showcase.feedback.triggerToast': 'Trigger Toast',
		'showcase.dialog.title': 'Modal Dialog',
		'showcase.dialog.desc': 'Native modal with pop-out transition.',
		'showcase.toast.title': 'Notification',
		'showcase.toast.msg': 'Action executed successfully.',
		'showcase.footer.tagline': 'Shellfish — Zoo Design System',
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
