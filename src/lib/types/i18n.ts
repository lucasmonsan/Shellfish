import type { HTMLButtonAttributes } from 'svelte/elements';
import type { Size } from './tokens.js';

export type Locale = 'pt-BR' | 'en-US';

export interface LocaleSelectorProps extends HTMLButtonAttributes {
	size?: Size;
	storageKey?: string;
}

export type TranslationDictionary = Record<string, string | Record<string, string>>;
