import { getContext, setContext, hasContext } from 'svelte';
import type { Locale, I18nContext } from '$lib/types/i18n.js';

export const I18N_CONTEXT_KEY = Symbol('shellfish-i18n');

export const translations: Record<Locale, Record<string, string>> = {
	'pt-BR': {
		// Acessibilidade e Controles Comuns
		'common.close': 'Fechar',
		'common.cancel': 'Cancelar',
		'common.confirm': 'Confirmar',
		'common.save': 'Salvar',
		'common.delete': 'Excluir',
		'common.edit': 'Editar',
		'common.loading': 'Carregando...',
		'common.back': 'Voltar',
		'common.next': 'Próximo',
		'dialog.close': 'Fechar diálogo',
		'alert.close': 'Fechar alerta',
		'toast.close': 'Fechar notificação',
		'theme.toggle': 'Alternar tema claro/escuro',
		'locale.toggle': 'Alternar idioma',
		'locale.current': 'PT-BR',
		'locale.name': 'Português (Brasil)',
		'document.title': 'Shellfish UI — Monsan Suite',

		// Showcase / Catálogo
		'showcase.title': 'Shellfish',
		'showcase.subtitle': 'Design System & Componentes da Suíte Monsan',
		'showcase.tagline': 'Biblioteca Svelte 5 minimalista, acessível e tátil.',
		'showcase.status': 'Fase 0 Concluída — Fundação Limpa Pronta',
		'showcase.components': 'Componentes',
		'showcase.tokens': 'Tokens de Design'
	},
	'en-US': {
		// Accessibility & Common Controls
		'common.close': 'Close',
		'common.cancel': 'Cancel',
		'common.confirm': 'Confirm',
		'common.save': 'Save',
		'common.delete': 'Delete',
		'common.edit': 'Edit',
		'common.loading': 'Loading...',
		'common.back': 'Back',
		'common.next': 'Next',
		'dialog.close': 'Close dialog',
		'alert.close': 'Close alert',
		'toast.close': 'Close notification',
		'theme.toggle': 'Toggle light/dark theme',
		'locale.toggle': 'Toggle language',
		'locale.current': 'EN-US',
		'locale.name': 'English (US)',
		'document.title': 'Shellfish UI — Monsan Suite',

		// Showcase / Catalog
		'showcase.title': 'Shellfish',
		'showcase.subtitle': 'Design System & Components for Monsan Suite',
		'showcase.tagline': 'Minimalist, accessible, and tactile Svelte 5 library.',
		'showcase.status': 'Phase 0 Complete — Clean Foundation Ready',
		'showcase.components': 'Components',
		'showcase.tokens': 'Design Tokens'
	},
	es: {
		// Accesibilidad y Controles Comunes
		'common.close': 'Cerrar',
		'common.cancel': 'Cancelar',
		'common.confirm': 'Confirmar',
		'common.save': 'Guardar',
		'common.delete': 'Eliminar',
		'common.edit': 'Editar',
		'common.loading': 'Cargando...',
		'common.back': 'Volver',
		'common.next': 'Siguiente',
		'dialog.close': 'Cerrar diálogo',
		'alert.close': 'Cerrar alerta',
		'toast.close': 'Cerrar notificación',
		'theme.toggle': 'Cambiar tema claro/oscuro',
		'locale.toggle': 'Cambiar idioma',
		'locale.current': 'ES',
		'locale.name': 'Español',
		'document.title': 'Shellfish UI — Monsan Suite',

		// Showcase / Catálogo
		'showcase.title': 'Shellfish',
		'showcase.subtitle': 'Design System y Componentes de Monsan Suite',
		'showcase.tagline': 'Biblioteca Svelte 5 minimalista, accesible y táctil.',
		'showcase.status': 'Fase 0 Completada — Base Limpia Lista',
		'showcase.components': 'Componentes',
		'showcase.tokens': 'Tokens de Diseño'
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
