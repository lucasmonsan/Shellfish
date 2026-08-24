import type { HTMLButtonAttributes } from 'svelte/elements';
import type { Size } from './tokens.js';

export type Locale = 'pt-BR' | 'en-US';

export interface LocaleSelectorProps extends HTMLButtonAttributes {
	size?: Size;
	storageKey?: string;
}

export interface I18nContext {
	readonly currentLocale: Locale;
	readonly locale: Locale;
	storageKey: string;
	setLocale(val: Locale, persist?: boolean): void;
	toggleLocale(): Locale;
	t(key: string, params?: Record<string, string | number>): string;
	hydrateFromLocalStorage(hasLocaleCookie?: boolean): void;
}
