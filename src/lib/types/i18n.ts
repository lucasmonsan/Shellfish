import type { HTMLButtonAttributes } from 'svelte/elements';
import type { Size } from './tokens.js';

/** Supported application locale. */
export type Locale = 'pt-BR' | 'en-US';

/** Props for the locale preference control. */
export interface LocaleSelectorProps extends HTMLButtonAttributes {
	/** Control height. */
	size?: Size;
	/** Browser storage key for the preference. */
	storageKey?: string;
}

/** Reactive locale service available through Svelte context. */
export interface I18nContext {
	readonly currentLocale: Locale;
	readonly locale: Locale;
	storageKey: string;
	setLocale(val: Locale, persist?: boolean): void;
	toggleLocale(): Locale;
	t(key: string, params?: Record<string, string | number>): string;
	hydrateFromLocalStorage(hasLocaleCookie?: boolean): void;
}
