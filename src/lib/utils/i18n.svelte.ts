import { getContext, setContext, hasContext } from 'svelte';
import type { Locale, I18nContext } from '$lib/types/i18n.js';

export const I18N_CONTEXT_KEY = Symbol('shellfish-i18n');

export const translations: Record<Locale, Record<string, string>> = {
	'pt-BR': {
		'common.close': 'Fechar',
		'common.cancel': 'Cancelar',
		'common.confirm': 'Confirmar',
		'common.save': 'Salvar',
		'common.delete': 'Excluir',
		'common.edit': 'Editar',
		'common.search': 'Pesquisar',
		'common.add': 'Adicionar',
		'common.notifications': 'Notificações',
		'common.disabled': 'Desabilitado',
		'common.loading': 'Carregando...',
		'common.back': 'Voltar',
		'common.next': 'Próximo',
		'dialog.close': 'Fechar diálogo',
		'alert.close': 'Fechar alerta',
		'toast.close': 'Fechar notificação',
		'theme.toggle': 'Alternar tema',
		'theme.light': 'Claro',
		'theme.dark': 'Escuro',
		'locale.toggle': 'Alternar idioma',
		'locale.current': 'PT',
		'locale.name': 'Português (Brasil)',
		'document.title': 'Shellfish',
		'image.title': 'Imagem',
		'image.interactive_playground': 'Playground Interativo',
		'image.state_success': 'Imagem Válida',
		'image.state_error': 'Simular Erro (404)',
		'image.state_empty': 'Sem URL (Fallback)',
		'image.aspect_ratios': 'Proporções (Aspect Ratio)',
		'image.sizes_and_fallbacks': 'Tamanhos e Fallbacks',
		'image.fit_cover': 'Ajuste: Cover',
		'image.fit_contain': 'Ajuste: Contain',
		'image.radius_cycle': 'Alternar Cantos',
		'image.sample_alt': 'Ilustração geométrica Shellfish',
		'image.avatar_sample_alt': 'Avatar de exemplo',
		'image.load_error': 'Erro ao carregar',
		'image.no_image': 'Sem imagem',
		'popover.title': 'Popover',
		'popover.alignments': 'Alinhamentos Horizontais',
		'popover.align_start': 'Início (start)',
		'popover.align_center': 'Centro (center)',
		'popover.align_end': 'Fim (end)',
		'popover.placements': 'Posicionamentos Verticais',
		'popover.placement_auto': 'Automático (auto)',
		'popover.placement_top': 'Acima (top)',
		'popover.placement_bottom': 'Abaixo (bottom)',
		'popover.interactive_profile': 'Composição: Menu de Usuário',
		'popover.profile_role': 'Engenheiro de Software',
		'popover.profile_account': 'Minha Conta',
		'popover.profile_settings': 'Configurações',
		'popover.profile_logout': 'Encerrar Sessão',
		'popover.panel_sample_title': 'Painel Flutuante',
		'popover.panel_sample_desc':
			'Fecha com clique externo, tecla Escape ou ao selecionar uma ação.',
		'brand.name': 'Shellfish',
		'brand.company': 'Monsan',
		'demo.user_name': 'Lucas Monsan',
		'catalog.button_title': 'Botão',
		'catalog.badge_divider_title': 'Distintivo e Divisor',
		'catalog.card_title': 'Cartão',
		'catalog.spinner_title': 'Carregamento (Spinner)',
		'catalog.icons_title': 'Ícones',
		'catalog.variants': 'Variantes',
		'catalog.sizes': 'Tamanhos',
		'catalog.size_sm': 'sm',
		'catalog.size_md': 'md',
		'catalog.size_lg': 'lg',
		'catalog.loading_icon_button': 'Carregamento e Botão de Ícone',
		'catalog.sizes_vertical_divider': 'Tamanhos e Divisor Vertical',
		'variants.primary': 'Principal',
		'variants.secondary': 'Secundário',
		'variants.danger': 'Perigo',
		'variants.warning': 'Aviso',
		'variants.success': 'Sucesso',
		'variants.outline': 'Contorno',
		'variants.ghost': 'Fantasma',
		'card.primary': 'principal',
		'card.elevated': 'elevado',
		'card.secondary': 'secundário',
		'card.outlined': 'contornado',
		'forms.title': 'Formulários',
		'forms.size_sm': 'sm (pequeno)',
		'forms.size_md': 'md (médio)',
		'forms.size_lg': 'lg (grande)',
		'forms.sizes_and_states': 'Tamanhos e Estados',
		'forms.search': 'Pesquisar',
		'forms.search_placeholder': 'Buscar...',
		'forms.password': 'Senha',
		'forms.password_placeholder': 'Digite sua senha...',
		'forms.show_password': 'Exibir senha',
		'forms.hide_password': 'Ocultar senha',
		'forms.clear': 'Limpar',
		'forms.price': 'Preço',
		'forms.currency_symbol': 'R$',
		'forms.disabled': 'Desabilitado',
		'forms.readonly': 'Somente leitura',
		'forms.validation': 'Validação',
		'forms.email': 'Email',
		'forms.email_placeholder': 'nome@exemplo.com',
		'forms.email_helper': 'Nunca compartilharemos seu email.',
		'forms.error_label': 'Campo com erro',
		'forms.error_message': 'Este campo é obrigatório.',
		'forms.form': 'Formulário',
		'forms.name': 'Nome',
		'forms.name_placeholder': 'Seu nome completo',
		'forms.submit': 'Enviar',
		'forms.submitted': 'Enviado com sucesso!',
		'forms.selection_title': 'Controles de Seleção',
		'forms.checkbox_label': 'Lembrar de mim',
		'forms.checkbox_indeterminate': 'Selecionar todos',
		'forms.radio_plan_free': 'Gratuito',
		'forms.radio_plan_pro': 'Profissional',
		'forms.radio_plan_enterprise': 'Corporativo',
		'forms.radio_group_label': 'Plano da conta',
		'forms.switch_notifications': 'Notificações por email',
		'forms.switch_dark_mode': 'Modo escuro automático',
		'forms.select_textarea_title': 'Seletores e Texto Multilinha',
		'forms.country_label': 'País de Residência',
		'forms.country_placeholder': 'Selecione um país...',
		'forms.country_br': 'Brasil',
		'forms.country_us': 'Estados Unidos',
		'forms.country_es': 'Espanha',
		'forms.country_pt': 'Portugal',
		'forms.country_help': 'Usado para fins fiscais e de localização',
		'forms.bio_label': 'Biografia ou Observações',
		'forms.bio_placeholder': 'Escreva uma breve descrição (máx. 120 caracteres)...',
		'forms.bio_help': 'Conte um pouco sobre suas preferências'
	},
	'en-US': {
		'common.close': 'Close',
		'common.cancel': 'Cancel',
		'common.confirm': 'Confirm',
		'common.save': 'Save',
		'common.delete': 'Delete',
		'common.edit': 'Edit',
		'common.search': 'Search',
		'common.add': 'Add',
		'common.notifications': 'Notifications',
		'common.disabled': 'Disabled',
		'common.loading': 'Loading...',
		'common.back': 'Back',
		'common.next': 'Next',
		'dialog.close': 'Close dialog',
		'alert.close': 'Close alert',
		'toast.close': 'Close notification',
		'theme.toggle': 'Toggle theme',
		'theme.light': 'Light',
		'theme.dark': 'Dark',
		'locale.toggle': 'Toggle language',
		'locale.current': 'EN',
		'locale.name': 'English (US)',
		'document.title': 'Shellfish',
		'image.title': 'Image',
		'image.interactive_playground': 'Interactive Playground',
		'image.state_success': 'Valid Image',
		'image.state_error': 'Simulate Error (404)',
		'image.state_empty': 'No URL (Fallback)',
		'image.aspect_ratios': 'Aspect Ratios',
		'image.sizes_and_fallbacks': 'Sizes and Fallbacks',
		'image.fit_cover': 'Fit: Cover',
		'image.fit_contain': 'Fit: Contain',
		'image.radius_cycle': 'Cycle Radius',
		'image.sample_alt': 'Shellfish geometric illustration',
		'image.avatar_sample_alt': 'Sample avatar',
		'image.load_error': 'Failed to load',
		'image.no_image': 'No image',
		'popover.title': 'Popover',
		'popover.alignments': 'Horizontal Alignments',
		'popover.align_start': 'Start (start)',
		'popover.align_center': 'Center (center)',
		'popover.align_end': 'End (end)',
		'popover.placements': 'Vertical Placements',
		'popover.placement_auto': 'Automatic (auto)',
		'popover.placement_top': 'Above (top)',
		'popover.placement_bottom': 'Below (bottom)',
		'popover.interactive_profile': 'Composition: User Profile Menu',
		'popover.profile_role': 'Software Engineer',
		'popover.profile_account': 'My Account',
		'popover.profile_settings': 'Settings',
		'popover.profile_logout': 'Sign Out',
		'popover.panel_sample_title': 'Floating Panel',
		'popover.panel_sample_desc':
			'Closes with outside click, Escape key, or when selecting an action.',
		'brand.name': 'Shellfish',
		'brand.company': 'Monsan',
		'demo.user_name': 'Lucas Monsan',
		'catalog.button_title': 'Button',
		'catalog.badge_divider_title': 'Badge & Divider',
		'catalog.card_title': 'Card',
		'catalog.spinner_title': 'Spinner',
		'catalog.icons_title': 'Icons',
		'catalog.variants': 'Variants',
		'catalog.sizes': 'Sizes',
		'catalog.size_sm': 'sm',
		'catalog.size_md': 'md',
		'catalog.size_lg': 'lg',
		'catalog.loading_icon_button': 'Loading & IconButton',
		'catalog.sizes_vertical_divider': 'Sizes & Vertical Divider',
		'variants.primary': 'Primary',
		'variants.secondary': 'Secondary',
		'variants.danger': 'Danger',
		'variants.warning': 'Warning',
		'variants.success': 'Success',
		'variants.outline': 'Outline',
		'variants.ghost': 'Ghost',
		'card.primary': 'primary',
		'card.elevated': 'elevated',
		'card.secondary': 'secondary',
		'card.outlined': 'outlined',
		'forms.title': 'Forms',
		'forms.size_sm': 'sm (small)',
		'forms.size_md': 'md (medium)',
		'forms.size_lg': 'lg (large)',
		'forms.sizes_and_states': 'Sizes & States',
		'forms.search': 'Search',
		'forms.search_placeholder': 'Search...',
		'forms.password': 'Password',
		'forms.password_placeholder': 'Enter your password...',
		'forms.show_password': 'Show password',
		'forms.hide_password': 'Hide password',
		'forms.clear': 'Clear',
		'forms.price': 'Price',
		'forms.currency_symbol': '$',
		'forms.disabled': 'Disabled',
		'forms.readonly': 'Readonly',
		'forms.validation': 'Validation',
		'forms.email': 'Email',
		'forms.email_placeholder': 'name@example.com',
		'forms.email_helper': 'We will never share your email.',
		'forms.error_label': 'Field with error',
		'forms.error_message': 'This field is required.',
		'forms.form': 'Form',
		'forms.name': 'Name',
		'forms.name_placeholder': 'Your full name',
		'forms.submit': 'Submit',
		'forms.submitted': 'Submitted successfully!',
		'forms.selection_title': 'Selection Controls',
		'forms.checkbox_label': 'Remember me',
		'forms.checkbox_indeterminate': 'Select all',
		'forms.radio_plan_free': 'Free',
		'forms.radio_plan_pro': 'Pro',
		'forms.radio_plan_enterprise': 'Enterprise',
		'forms.radio_group_label': 'Account plan',
		'forms.switch_notifications': 'Email notifications',
		'forms.switch_dark_mode': 'Automatic dark mode',
		'forms.select_textarea_title': 'Selectors & Multiline Text',
		'forms.country_label': 'Country of Residence',
		'forms.country_placeholder': 'Select a country...',
		'forms.country_br': 'Brazil',
		'forms.country_us': 'United States',
		'forms.country_es': 'Spain',
		'forms.country_pt': 'Portugal',
		'forms.country_help': 'Used for tax and localization purposes',
		'forms.bio_label': 'Biography or Notes',
		'forms.bio_placeholder': 'Write a brief description (max 120 characters)...',
		'forms.bio_help': 'Tell us a bit about your preferences'
	},
	es: {
		'common.close': 'Cerrar',
		'common.cancel': 'Cancelar',
		'common.confirm': 'Confirmar',
		'common.save': 'Guardar',
		'common.delete': 'Eliminar',
		'common.edit': 'Editar',
		'common.search': 'Buscar',
		'common.add': 'Añadir',
		'common.notifications': 'Notificaciones',
		'common.disabled': 'Deshabilitado',
		'common.loading': 'Cargando...',
		'common.back': 'Volver',
		'common.next': 'Siguiente',
		'dialog.close': 'Cerrar diálogo',
		'alert.close': 'Cerrar alerta',
		'toast.close': 'Cerrar notificación',
		'theme.toggle': 'Cambiar tema',
		'theme.light': 'Claro',
		'theme.dark': 'Oscuro',
		'locale.toggle': 'Cambiar idioma',
		'locale.current': 'ES',
		'locale.name': 'Español',
		'document.title': 'Shellfish',
		'image.title': 'Imagen',
		'image.interactive_playground': 'Área de Prueba Interactiva',
		'image.state_success': 'Imagen Válida',
		'image.state_error': 'Simular Error (404)',
		'image.state_empty': 'Sin URL (Respaldo)',
		'image.aspect_ratios': 'Proporciones (Aspect Ratio)',
		'image.sizes_and_fallbacks': 'Tamaños y Respaldos',
		'image.fit_cover': 'Ajuste: Cover',
		'image.fit_contain': 'Ajuste: Contain',
		'image.radius_cycle': 'Cambiar Esquinas',
		'image.sample_alt': 'Ilustración geométrica Shellfish',
		'image.avatar_sample_alt': 'Avatar de ejemplo',
		'image.load_error': 'Error al cargar',
		'image.no_image': 'Sin imagen',
		'popover.title': 'Popover',
		'popover.alignments': 'Alineaciones Horizontales',
		'popover.align_start': 'Inicio (start)',
		'popover.align_center': 'Centro (center)',
		'popover.align_end': 'Fin (end)',
		'popover.placements': 'Posicionamientos Verticales',
		'popover.placement_auto': 'Automático (auto)',
		'popover.placement_top': 'Arriba (top)',
		'popover.placement_bottom': 'Abajo (bottom)',
		'popover.interactive_profile': 'Composición: Menú de Usuario',
		'popover.profile_role': 'Ingeniero de Software',
		'popover.profile_account': 'Mi Cuenta',
		'popover.profile_settings': 'Configuraciones',
		'popover.profile_logout': 'Cerrar Sesión',
		'popover.panel_sample_title': 'Panel Flotante',
		'popover.panel_sample_desc':
			'Se cierra con clic externo, tecla Escape o al seleccionar una acción.',
		'brand.name': 'Shellfish',
		'brand.company': 'Monsan',
		'demo.user_name': 'Lucas Monsan',
		'catalog.button_title': 'Botón',
		'catalog.badge_divider_title': 'Insignia y Divisor',
		'catalog.card_title': 'Tarjeta',
		'catalog.spinner_title': 'Spinner',
		'catalog.icons_title': 'Iconos',
		'catalog.variants': 'Variantes',
		'catalog.sizes': 'Tamaños',
		'catalog.size_sm': 'sm',
		'catalog.size_md': 'md',
		'catalog.size_lg': 'lg',
		'catalog.loading_icon_button': 'Carga y Botón de Icono',
		'catalog.sizes_vertical_divider': 'Tamaños y Divisor Vertical',
		'variants.primary': 'Principal',
		'variants.secondary': 'Secundario',
		'variants.danger': 'Peligro',
		'variants.warning': 'Advertencia',
		'variants.success': 'Éxito',
		'variants.outline': 'Contorno',
		'variants.ghost': 'Fantasma',
		'card.primary': 'principal',
		'card.elevated': 'elevado',
		'card.secondary': 'secundario',
		'card.outlined': 'contornado',
		'forms.title': 'Formularios',
		'forms.size_sm': 'sm (pequeño)',
		'forms.size_md': 'md (mediano)',
		'forms.size_lg': 'lg (grande)',
		'forms.sizes_and_states': 'Tamaños y Estados',
		'forms.search': 'Buscar',
		'forms.search_placeholder': 'Buscar...',
		'forms.password': 'Contraseña',
		'forms.password_placeholder': 'Ingrese su contraseña...',
		'forms.show_password': 'Mostrar contraseña',
		'forms.hide_password': 'Ocultar contraseña',
		'forms.clear': 'Limpiar',
		'forms.price': 'Precio',
		'forms.currency_symbol': '$',
		'forms.disabled': 'Deshabilitado',
		'forms.readonly': 'Solo lectura',
		'forms.validation': 'Validación',
		'forms.email': 'Correo',
		'forms.email_placeholder': 'nombre@ejemplo.com',
		'forms.email_helper': 'Nunca compartiremos su correo.',
		'forms.error_label': 'Campo con error',
		'forms.error_message': 'Este campo es obligatorio.',
		'forms.form': 'Formulario',
		'forms.name': 'Nombre',
		'forms.name_placeholder': 'Su nombre completo',
		'forms.submit': 'Enviar',
		'forms.submitted': '¡Enviado con éxito!',
		'forms.selection_title': 'Controles de Selección',
		'forms.checkbox_label': 'Recordarme',
		'forms.checkbox_indeterminate': 'Seleccionar todo',
		'forms.radio_plan_free': 'Gratis',
		'forms.radio_plan_pro': 'Profesional',
		'forms.radio_plan_enterprise': 'Corporativo',
		'forms.radio_group_label': 'Plan de la cuenta',
		'forms.switch_notifications': 'Notificaciones por correo',
		'forms.switch_dark_mode': 'Modo oscuro automático',
		'forms.select_textarea_title': 'Selectores y Texto Multilínea',
		'forms.country_label': 'País de Residencia',
		'forms.country_placeholder': 'Seleccione un país...',
		'forms.country_br': 'Brasil',
		'forms.country_us': 'Estados Unidos',
		'forms.country_es': 'España',
		'forms.country_pt': 'Portugal',
		'forms.country_help': 'Usado para fines fiscales y de localización',
		'forms.bio_label': 'Biografía u Observaciones',
		'forms.bio_placeholder': 'Escriba una breve descripción (máx. 120 caracteres)...',
		'forms.bio_help': 'Cuéntenos un poco sobre sus preferencias'
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
		if (item.tag === 'es' || item.tag.startsWith('es-') || item.tag.startsWith('es_')) {
			return 'es';
		}
		if (item.tag === 'pt' || item.tag.startsWith('pt-') || item.tag.startsWith('pt_')) {
			return 'pt-BR';
		}
	}

	return 'pt-BR';
}

export function createI18n(
	initialLocale: Locale | (() => Locale) = 'pt-BR',
	storageKey = 'monsan_locale'
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
				if (persist) {
					if (typeof document !== 'undefined') {
						try {
							document.cookie = `${activeStorageKey}=${val}; path=/; max-age=31536000; SameSite=Lax`;
						} catch {
							// Ignora indisponibilidade de cookie
						}
					}
					if (typeof window !== 'undefined') {
						try {
							window.localStorage?.setItem(activeStorageKey, val);
						} catch {
							// Ignora indisponibilidade do storage
						}
					}
				}
			}
		},
		toggleLocale(): Locale {
			const cycle: Record<Locale, Locale> = {
				'pt-BR': 'en-US',
				'en-US': 'es',
				es: 'pt-BR'
			};
			const next = cycle[currentLocale] || 'pt-BR';
			this.setLocale(next, true);
			return next;
		},
		t(key: string, params?: Record<string, string | number>): string {
			// Acessa currentLocale diretamente para garantir reatividade no Svelte 5
			const dict = translations[currentLocale] || translations['pt-BR'];
			let msg = dict[key] || translations['pt-BR']?.[key] || key;
			if (params) {
				for (const [k, v] of Object.entries(params)) {
					msg = msg.replaceAll(`{${k}}`, String(v));
				}
			}
			return msg;
		},
		hydrateFromLocalStorage(hasLocaleCookie = false) {
			let stored: Locale | null = null;
			if (typeof window !== 'undefined') {
				try {
					stored = window.localStorage?.getItem(activeStorageKey) as Locale | null;
				} catch {
					// Ignora indisponibilidade do storage
				}
			}

			if (hasLocaleCookie) {
				if (stored && stored !== currentLocale && typeof window !== 'undefined') {
					try {
						window.localStorage?.setItem(activeStorageKey, currentLocale);
					} catch {
						// Ignora indisponibilidade do storage
					}
				}
				return;
			}

			if (
				stored &&
				(stored === 'pt-BR' || stored === 'en-US' || stored === 'es') &&
				stored !== currentLocale
			) {
				this.setLocale(stored, true);
			}
		}
	};

	return instance;
}

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

export const i18n = defaultInstance;
export const t = (key: string, params?: Record<string, string | number>) =>
	defaultInstance.t(key, params);
