import type { HTMLButtonAttributes } from 'svelte/elements';
import type { Size } from './tokens.js';

/** Props for the theme preference control. */
export interface ThemeSelectorProps extends HTMLButtonAttributes {
	/** Control height. */
	size?: Size;
	/** Browser storage key for the preference. */
	storageKey?: string;
}
