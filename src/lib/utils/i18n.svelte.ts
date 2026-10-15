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
		'locale.current': 'Português',
		'locale.name': 'Português (Brasil)',
		'document.title': 'Shellfish UI — Suíte Monsan',

		// Showcase / Catálogo
		'showcase.title': 'Shellfish',
		'showcase.subtitle': 'Design System & Componentes da Suíte Monsan',
		'showcase.tagline': 'Biblioteca Svelte 5 minimalista, acessível e tátil.',
		'showcase.phase1_badge': 'Fase 1 Concluída',
		'showcase.hero_title': 'AppShell & Viewport',
		'showcase.hero_desc':
			'O contêiner oficial de layout da Suíte Monsan com semântica estrita, viewport dinâmica (100dvh) e degradês de scroll automáticos.',
		'showcase.how_it_works': 'Como o AppShell Funciona',
		'showcase.top_title': 'Região Top',
		'showcase.top_desc': 'Fixo no topo com suporte a backdrop-filter e borda sutil.',
		'showcase.center_title': 'Região Content (Center)',
		'showcase.center_desc':
			'Rolagem interna suave com fades superior e inferior que surgem quando o conteúdo transborda.',
		'showcase.bottom_title': 'Região Bottom',
		'showcase.bottom_desc':
			'Rodapé ou barra de ações fixa na base da viewport sem quebrar em mobile.',
		'showcase.demo_title': 'Demonstração de Scroll e Fades Automáticos',
		'showcase.demo_desc':
			'Role esta página para cima e para baixo. Observe como o degradê suave superior surge assim que o conteúdo afunda sob o cabeçalho, e o degradê inferior desaparece quando você atinge o final.',
		'showcase.mock_block_title': 'Bloco de Demonstração',
		'showcase.mock_block_desc':
			'Simulação de superfície de conteúdo para validação do cálculo dinâmico de rolagem e integridade do viewport em telas móveis e desktop.',
		'showcase.footer_suite': 'Suíte Monsan',
		'showcase.theme_light': 'Tema Claro',
		'showcase.theme_dark': 'Tema Escuro'
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
		'locale.current': 'English',
		'locale.name': 'English (US)',
		'document.title': 'Shellfish UI — Monsan Suite',

		// Showcase / Catalog
		'showcase.title': 'Shellfish',
		'showcase.subtitle': 'Design System & Components for Monsan Suite',
		'showcase.tagline': 'Minimalist, accessible, and tactile Svelte 5 library.',
		'showcase.phase1_badge': 'Phase 1 Complete',
		'showcase.hero_title': 'AppShell & Viewport',
		'showcase.hero_desc':
			'Official Monsan Suite layout container with strict semantics, dynamic viewport (100dvh), and automatic scroll fades.',
		'showcase.how_it_works': 'How AppShell Works',
		'showcase.top_title': 'Top Region',
		'showcase.top_desc': 'Fixed at the top with backdrop-filter and subtle border support.',
		'showcase.center_title': 'Content Region (Center)',
		'showcase.center_desc':
			'Smooth internal scrolling with top and bottom fades that appear when content overflows.',
		'showcase.bottom_title': 'Bottom Region',
		'showcase.bottom_desc':
			'Footer or action bar fixed at viewport bottom without mobile breakage.',
		'showcase.demo_title': 'Scroll Demonstration & Automatic Fades',
		'showcase.demo_desc':
			'Scroll this page up and down. Notice how the top gradient appears as content slides beneath the header, and the bottom gradient fades when you reach the end.',
		'showcase.mock_block_title': 'Demo Block',
		'showcase.mock_block_desc':
			'Simulated content surface to validate dynamic scroll calculations and viewport integrity across mobile and desktop screens.',
		'showcase.footer_suite': 'Monsan Suite',
		'showcase.theme_light': 'Light Theme',
		'showcase.theme_dark': 'Dark Theme'
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
		'locale.current': 'Español',
		'locale.name': 'Español',
		'document.title': 'Shellfish UI — Monsan Suite',

		// Showcase / Catálogo
		'showcase.title': 'Shellfish',
		'showcase.subtitle': 'Design System y Componentes de Monsan Suite',
		'showcase.tagline': 'Biblioteca Svelte 5 minimalista, accesible y táctil.',
		'showcase.phase1_badge': 'Fase 1 Completada',
		'showcase.hero_title': 'AppShell y Viewport',
		'showcase.hero_desc':
			'El contenedor oficial de diseño de Monsan Suite con semántica estricta, viewport dinámico (100dvh) y degradados de scroll automáticos.',
		'showcase.how_it_works': 'Cómo Funciona AppShell',
		'showcase.top_title': 'Región Superior (Top)',
		'showcase.top_desc': 'Fijo arriba con soporte para backdrop-filter y borde sutil.',
		'showcase.center_title': 'Región de Contenido (Centro)',
		'showcase.center_desc':
			'Desplazamiento interno suave con degradados superior e inferior que aparecen cuando el contenido desborda.',
		'showcase.bottom_title': 'Región Inferior (Bottom)',
		'showcase.bottom_desc':
			'Pie de página o barra de acciones fija en la base sin romper en dispositivos móviles.',
		'showcase.demo_title': 'Demostración de Scroll y Degradados Automáticos',
		'showcase.demo_desc':
			'Desplaza esta página hacia arriba y hacia abajo. Observa cómo el degradado superior aparece cuando el contenido pasa bajo el encabezado, y el degradado inferior desaparece al llegar al final.',
		'showcase.mock_block_title': 'Bloque de Demostración',
		'showcase.mock_block_desc':
			'Superficie de contenido simulada para validar el cálculo dinámico del scroll y la integridad de la pantalla en móviles y ordenadores.',
		'showcase.footer_suite': 'Monsan Suite',
		'showcase.theme_light': 'Tema Claro',
		'showcase.theme_dark': 'Tema Oscuro'
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
