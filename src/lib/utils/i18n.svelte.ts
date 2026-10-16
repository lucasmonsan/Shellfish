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
		'image.load_error': 'Falha ao carregar imagem',
		'image.no_image': 'Sem imagem'
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
		'image.load_error': 'Failed to load image',
		'image.no_image': 'No image'
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
		'image.load_error': 'Error al cargar imagen',
		'image.no_image': 'Sin imagen'
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
