import { getContext, setContext, hasContext } from 'svelte';
import type { Locale, I18nContext } from '$lib/types/i18n.js';

export const I18N_CONTEXT_KEY = Symbol('shellfish-i18n');

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
		'showcase.logo.aria': 'Ir para a Home do Shellfish',
		'showcase.logo.alt': 'Shellfish Logo',
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
		'showcase.chips.activeTags': 'Tags Ativas',
		'showcase.chips.placeholder': 'Digite uma tag e pressione Enter...',
		'showcase.chips.tagDesignSystem': 'Design System',
		'showcase.chips.tagNeobrutalism': 'Neobrutalismo',
		'showcase.chips.tagAccessibility': 'Acessibilidade',
		'showcase.chips.helper':
			'Pressione Enter ou vírgula para criar tags. Clique no X ou pressione Backspace para remover.',
		'showcase.dropdown.title': 'Dropdowns',
		'showcase.dropdown.neutral': 'Opções (Neutro)',
		'showcase.dropdown.terracotta': 'Ação (Terracota)',
		'showcase.dropdown.rightMenu': 'Menu à Direita',
		'showcase.dropdown.profile': 'Perfil',
		'showcase.dropdown.settings': 'Configurações',
		'showcase.dropdown.delete': 'Excluir',
		'showcase.forms.title': 'Entradas de Texto',
		'showcase.forms.simulateInvalid': 'Simular estado inválido',
		'showcase.forms.inputLabel': 'Texto',
		'showcase.forms.inputPlaceholder': 'Digite aqui...',
		'showcase.forms.inputSample': 'Exemplo de texto',
		'showcase.forms.selectLabel': 'Seleção',
		'showcase.forms.selectOption1': 'Opção 1',
		'showcase.forms.selectOption2': 'Opção 2',
		'showcase.forms.selectOption3': 'Opção 3 (Desabilitada)',
		'showcase.forms.textareaLabel': 'Área de Texto',
		'showcase.forms.textareaDefault': 'Área de texto neobrutalista.',
		'showcase.forms.switches': 'Switches',
		'showcase.forms.slider': 'Slider',
		'showcase.forms.switchNotifications': 'Notificações',
		'showcase.forms.switchSync': 'Sincronização',
		'showcase.forms.switchBackup': 'Backup Automático',
		'showcase.forms.sliderIntensity': 'Intensidade',
		'showcase.forms.calendar': 'Calendário',
		'showcase.forms.choiceCards': 'Card',
		'showcase.forms.checkboxes': 'Checkboxes',
		'showcase.forms.checkedOption': 'Marcado',
		'showcase.forms.uncheckedOption': 'Desmarcado',
		'showcase.forms.indeterminateOption': 'Indeterminado',
		'showcase.forms.disabledOption': 'Desabilitado',
		'showcase.forms.serviceHotTowel': 'Toalha Quente',
		'showcase.forms.serviceHotTowelDesc': 'Tratamento facial',
		'showcase.forms.serviceWash': 'Lavagem Especial',
		'showcase.forms.serviceWashDesc': 'Shampoo premium',
		'showcase.forms.serviceMassage': 'Massagem Capilar',
		'showcase.forms.serviceUnavailable': 'Indisponível',
		'showcase.forms.serviceSoldOut': 'Esgotado',
		'showcase.forms.serviceQuickCut': 'Corte Rápido',
		'showcase.forms.serviceCutBeard': 'Corte & Barba',
		'showcase.forms.serviceVip': 'Completo VIP',
		'showcase.forms.servicePrice15': '+ R$ 15',
		'showcase.forms.servicePrice20': '+ R$ 20',
		'showcase.forms.servicePrice45': 'R$ 45',
		'showcase.forms.servicePrice80': 'R$ 80',
		'showcase.forms.servicePrice130': 'R$ 130',
		'showcase.forms.time30min': '30 min',
		'showcase.forms.time60min': '60 min',
		'showcase.forms.radios': 'Radios',
		'showcase.forms.radioA': 'Opção A',
		'showcase.forms.radioB': 'Opção B',
		'showcase.forms.radioCDisabled': 'Opção C (Desabilitada)',
		'showcase.variant.standard': 'Padrão',
		'showcase.variant.card': 'Card',
		'showcase.variant.collapsible': 'Colapsável',
		'showcase.variant.badge': 'Placa',
		'showcase.variant.flip': 'Flip',
		'showcase.calendar.strip': 'Faixa',
		'showcase.calendar.month': 'Mês',
		'showcase.card.defaultHeader': 'Card Padrão',
		'showcase.card.collapsibleHeader': 'Card Colapsável',
		'showcase.card.flipHeader': 'Card Frente',
		'showcase.card.sideA': 'Lado A',
		'showcase.card.action': 'Ação',
		'showcase.card.module': 'Módulo #01',
		'showcase.card.topBadgeTitle': 'Placa na Borda Superior',
		'showcase.card.topBadgeDesc':
			'A placa de identificação fica cravada a 50% na linha superior como uma etiqueta de hardware ({padding}).',
		'showcase.card.interactive3d': 'Card Interativo 3D',
		'showcase.card.interactive3dDesc':
			'Clique em qualquer área do Card para girar em 3D e revelar o verso ({padding}).',
		'showcase.card.clickToFlip': 'Clique no Card para Virar',
		'showcase.card.standardTitle': 'Superfície Padrão',
		'showcase.card.standardDesc':
			'Superfície tátil neobrutalista com elevação física sólida e contenção pura de conteúdo ({padding}).',
		'showcase.card.collapsibleTitle': 'Painel Expansível',
		'showcase.card.collapsibleDesc':
			'Clique no cabeçalho acima para recolher ou expandir este painel de forma contínua e suave ({padding}).',
		'showcase.card.controlsTitle': 'Configurações',
		'showcase.card.withHeader': 'Com Header',
		'showcase.card.withFooter': 'Com Footer',
		'showcase.card.padding': 'Padding:',
		'showcase.card.radius': 'Radius:',
		'showcase.display.badgesTitle': 'Badges & Avatares',
		'showcase.display.badgeOnline': 'ONLINE',
		'showcase.display.badgeCache': 'CACHE',
		'showcase.display.badgeSuccess': '200 OK',
		'showcase.display.badgeWarning': 'AVISO',
		'showcase.display.badgeError': 'ERRO',
		'showcase.display.cardsTitle': 'Cards',
		'showcase.display.flipBtn': 'Virar',
		'showcase.display.flipBackTitle': 'Verso do Card',
		'showcase.display.flipBackDesc': 'Renderizado via snippet back().',
		'showcase.display.flipBackUnflip': 'Clique para desvirar',
		'showcase.display.flipBackSideB': 'Lado B',
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
		'showcase.toast.actionTriggered': '{action} acionado!',
		'showcase.footer.createdWith': 'Criado por',
		'showcase.footer.with': 'com',
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
		'showcase.logo.aria': 'Go to Shellfish Home',
		'showcase.logo.alt': 'Shellfish Logo',
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
		'showcase.chips.activeTags': 'Active Tags',
		'showcase.chips.placeholder': 'Type a tag and press Enter...',
		'showcase.chips.tagDesignSystem': 'Design System',
		'showcase.chips.tagNeobrutalism': 'Neobrutalism',
		'showcase.chips.tagAccessibility': 'Accessibility',
		'showcase.chips.helper':
			'Press Enter or comma to create tags. Click X or press Backspace to remove.',
		'showcase.dropdown.title': 'Dropdowns',
		'showcase.dropdown.neutral': 'Options (Neutral)',
		'showcase.dropdown.terracotta': 'Action (Terracotta)',
		'showcase.dropdown.rightMenu': 'Right Menu',
		'showcase.dropdown.profile': 'Profile',
		'showcase.dropdown.settings': 'Settings',
		'showcase.dropdown.delete': 'Delete',
		'showcase.forms.title': 'Text Inputs',
		'showcase.forms.simulateInvalid': 'Simulate invalid state',
		'showcase.forms.inputLabel': 'Text',
		'showcase.forms.inputPlaceholder': 'Type here...',
		'showcase.forms.inputSample': 'Sample text',
		'showcase.forms.selectLabel': 'Select',
		'showcase.forms.selectOption1': 'Option 1',
		'showcase.forms.selectOption2': 'Option 2',
		'showcase.forms.selectOption3': 'Option 3 (Disabled)',
		'showcase.forms.textareaLabel': 'Textarea',
		'showcase.forms.textareaDefault': 'Neobrutalist textarea.',
		'showcase.forms.switches': 'Switches',
		'showcase.forms.slider': 'Slider',
		'showcase.forms.switchNotifications': 'Notifications',
		'showcase.forms.switchSync': 'Sync',
		'showcase.forms.switchBackup': 'Auto Backup',
		'showcase.forms.sliderIntensity': 'Intensity',
		'showcase.forms.calendar': 'Calendar',
		'showcase.forms.choiceCards': 'Card',
		'showcase.forms.checkboxes': 'Checkboxes',
		'showcase.forms.checkedOption': 'Checked',
		'showcase.forms.uncheckedOption': 'Unchecked',
		'showcase.forms.indeterminateOption': 'Indeterminate',
		'showcase.forms.disabledOption': 'Disabled',
		'showcase.forms.serviceHotTowel': 'Hot Towel',
		'showcase.forms.serviceHotTowelDesc': 'Facial treatment',
		'showcase.forms.serviceWash': 'Special Wash',
		'showcase.forms.serviceWashDesc': 'Premium shampoo',
		'showcase.forms.serviceMassage': 'Head Massage',
		'showcase.forms.serviceUnavailable': 'Unavailable',
		'showcase.forms.serviceSoldOut': 'Sold Out',
		'showcase.forms.serviceQuickCut': 'Quick Cut',
		'showcase.forms.serviceCutBeard': 'Cut & Beard',
		'showcase.forms.serviceVip': 'Full VIP',
		'showcase.forms.servicePrice15': '+ $15',
		'showcase.forms.servicePrice20': '+ $20',
		'showcase.forms.servicePrice45': '$45',
		'showcase.forms.servicePrice80': '$80',
		'showcase.forms.servicePrice130': '$130',
		'showcase.forms.time30min': '30 mins',
		'showcase.forms.time60min': '60 mins',
		'showcase.forms.radios': 'Radios',
		'showcase.forms.radioA': 'Option A',
		'showcase.forms.radioB': 'Option B',
		'showcase.forms.radioCDisabled': 'Option C (Disabled)',
		'showcase.variant.standard': 'Standard',
		'showcase.variant.card': 'Card',
		'showcase.variant.collapsible': 'Collapsible',
		'showcase.variant.badge': 'Badge',
		'showcase.variant.flip': 'Flip',
		'showcase.calendar.strip': 'Strip',
		'showcase.calendar.month': 'Month',
		'showcase.card.defaultHeader': 'Standard Card',
		'showcase.card.collapsibleHeader': 'Collapsible Card',
		'showcase.card.flipHeader': 'Card Front',
		'showcase.card.sideA': 'Side A',
		'showcase.card.action': 'Action',
		'showcase.card.module': 'Module #01',
		'showcase.card.topBadgeTitle': 'Top Edge Badge',
		'showcase.card.topBadgeDesc':
			'The ID badge is anchored 50% on the top edge like a hardware tag ({padding}).',
		'showcase.card.interactive3d': '3D Interactive Card',
		'showcase.card.interactive3dDesc':
			'Click anywhere on the Card to rotate in 3D and reveal the back ({padding}).',
		'showcase.card.clickToFlip': 'Click Card to Flip',
		'showcase.card.standardTitle': 'Standard Surface',
		'showcase.card.standardDesc':
			'Tactile neobrutalist surface with solid physical elevation and pure content containment ({padding}).',
		'showcase.card.collapsibleTitle': 'Collapsible Panel',
		'showcase.card.collapsibleDesc':
			'Click the header above to smoothly expand or collapse this panel ({padding}).',
		'showcase.card.controlsTitle': 'Controls',
		'showcase.card.withHeader': 'With Header',
		'showcase.card.withFooter': 'With Footer',
		'showcase.card.padding': 'Padding:',
		'showcase.card.radius': 'Radius:',
		'showcase.display.badgesTitle': 'Badges & Avatars',
		'showcase.display.badgeOnline': 'ONLINE',
		'showcase.display.badgeCache': 'CACHE',
		'showcase.display.badgeSuccess': '200 OK',
		'showcase.display.badgeWarning': 'WARNING',
		'showcase.display.badgeError': 'ERROR',
		'showcase.display.cardsTitle': 'Cards',
		'showcase.display.flipBtn': 'Flip',
		'showcase.display.flipBackTitle': 'Card Reverse',
		'showcase.display.flipBackDesc': 'Rendered via back() snippet.',
		'showcase.display.flipBackUnflip': 'Click to unflip',
		'showcase.display.flipBackSideB': 'Side B',
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
		'showcase.toast.actionTriggered': '{action} triggered!',
		'showcase.footer.createdWith': 'Created by',
		'showcase.footer.with': 'with',
		'showcase.footer.tagline': 'Shellfish — Zoo Design System',
		'showcase.footer.port': 'Port 5172'
	}
};

export function parseAcceptLanguage(header: string | null | undefined): Locale {
	if (!header) return 'pt-BR';

	const parsed = header
		.split(',')
		.map((item) => {
			const [tag, ...params] = item.trim().split(';');
			let q = 1.0;
			for (const param of params) {
				const trimmed = param.trim();
				if (trimmed.startsWith('q=')) {
					const val = parseFloat(trimmed.slice(2));
					if (!Number.isNaN(val)) {
						q = Math.max(0, Math.min(1, val));
					}
				}
			}
			return { tag: tag.trim().toLowerCase(), q };
		})
		.filter((item) => item.tag.length > 0 && item.q > 0)
		.sort((a, b) => b.q - a.q);

	for (const item of parsed) {
		if (item.tag === 'en' || item.tag.startsWith('en-') || item.tag.startsWith('en_')) {
			return 'en-US';
		}
		if (item.tag === 'pt' || item.tag.startsWith('pt-') || item.tag.startsWith('pt_')) {
			return 'pt-BR';
		}
	}

	return 'pt-BR';
}

export function createI18n(
	initialLocale: Locale | (() => Locale) = 'pt-BR',
	storageKey = 'zoo_locale'
): I18nContext {
	const getInitial = typeof initialLocale === 'function' ? initialLocale() : initialLocale;
	let currentLocale = $state<Locale>(getInitial || 'pt-BR');
	let activeStorageKey = storageKey;

	const instance: I18nContext = {
		get currentLocale(): Locale {
			return currentLocale;
		},
		get locale(): Locale {
			return currentLocale;
		},
		get storageKey(): string {
			return activeStorageKey;
		},
		set storageKey(val: string) {
			activeStorageKey = val;
		},
		setLocale(val: Locale, persist = true) {
			if (translations[val]) {
				currentLocale = val;
				if (typeof document !== 'undefined') {
					document.documentElement.lang = val;
				}
				if (persist && typeof window !== 'undefined' && window.localStorage) {
					try {
						window.localStorage.setItem(activeStorageKey, val);
						document.cookie = `${activeStorageKey}=${val}; path=/; max-age=31536000; SameSite=Lax`;
					} catch {
						// Ignora indisponibilidade do storage
					}
				}
			}
		},
		toggleLocale(): Locale {
			const next: Locale = currentLocale === 'pt-BR' ? 'en-US' : 'pt-BR';
			this.setLocale(next, true);
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
		},
		hydrateFromLocalStorage() {
			if (typeof window === 'undefined' || !window.localStorage) return;
			try {
				const stored = window.localStorage.getItem(activeStorageKey) as Locale | null;
				if (stored && (stored === 'pt-BR' || stored === 'en-US') && stored !== currentLocale) {
					this.setLocale(stored, true);
				} else if (currentLocale) {
					document.cookie = `${activeStorageKey}=${currentLocale}; path=/; max-age=31536000; SameSite=Lax`;
				}
			} catch {
				// Ignora indisponibilidade do storage
			}
		}
	};

	return instance;
}

// Instância padrão para componentes renderizados fora de contexto (ex: testes unitários isolados)
const defaultInstance = createI18n('pt-BR');

export function setI18n(instance: I18nContext): I18nContext {
	return setContext(I18N_CONTEXT_KEY, instance);
}

export function getI18n(): I18nContext {
	if (hasContext(I18N_CONTEXT_KEY)) {
		return getContext<I18nContext>(I18N_CONTEXT_KEY);
	}
	return defaultInstance;
}

// Fallback standalone de módulo (para uso isolado fora de componentes Svelte)
export const i18n = defaultInstance;
export const t = (key: string, params?: Record<string, string | number>) =>
	defaultInstance.t(key, params);
