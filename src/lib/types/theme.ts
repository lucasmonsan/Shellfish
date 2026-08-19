import type { HTMLButtonAttributes } from 'svelte/elements';
import type { Size } from './tokens.js';

export interface ThemeSelectorProps extends HTMLButtonAttributes {
	size?: Size;
	storageKey?: string;
}
