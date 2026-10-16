import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';
import type { Variant, Size } from './tokens.js';

/** Props for the semantic Button primitive. */
export interface ButtonProps extends HTMLButtonAttributes {
	/**
	 * Button visual variant.
	 * Default: 'primary'
	 */
	variant?: Variant;

	/**
	 * Button size preset.
	 * Default: 'md'
	 */
	size?: Size;

	/**
	 * Full width button (100%).
	 * Default: false
	 */
	block?: boolean;

	/**
	 * Square aspect ratio 1:1 for single icon button.
	 * Default: false
	 */
	square?: boolean;

	/**
	 * Explicit loading state.
	 * Default: false
	 */
	loading?: boolean;

	/**
	 * Minimum loading duration in ms to ensure clean animation completion.
	 * Default: 1200 (1 full spinCube cycle)
	 */
	minLoadingDuration?: number;

	/**
	 * Disabled state.
	 * Default: false
	 */
	disabled?: boolean;

	/**
	 * Button type attribute.
	 * Default: 'button'
	 */
	type?: 'button' | 'submit' | 'reset';

	/**
	 * Click event handler (supports async promises with auto-loading).
	 */
	onclick?: (event: MouseEvent) => unknown;

	/**
	 * Optional text label fallback when children snippet is omitted.
	 */
	label?: string;

	/**
	 * Main button content snippet.
	 */
	children?: Snippet;

	/**
	 * Accessible label for screen readers.
	 */
	ariaLabel?: string;

	/**
	 * Additional CSS class names.
	 */
	class?: string;
}

/** Props for the accessible square IconButton primitive. */
export interface IconButtonProps extends HTMLButtonAttributes {
	/**
	 * Mandatory accessible label for screen readers.
	 */
	label: string;

	/**
	 * Hover tooltip. Defaults to label.
	 */
	title?: string;

	/**
	 * Button visual variant.
	 * Default: 'secondary'
	 */
	variant?: Variant;

	/**
	 * Button size preset ('sm', 'md', 'lg').
	 * Default: 'md'
	 */
	size?: Size;

	/**
	 * Toggle state (sets aria-pressed and switches to primary highlight).
	 * Default: false
	 */
	selected?: boolean;

	/**
	 * Optional numeric notification counter badge. Zero and negatives are hidden.
	 * Default: 0
	 */
	count?: number;

	/**
	 * Loading state.
	 * Default: false
	 */
	loading?: boolean;

	/**
	 * Disabled state.
	 * Default: false
	 */
	disabled?: boolean;

	/**
	 * Button type attribute.
	 * Default: 'button'
	 */
	type?: 'button' | 'submit' | 'reset';

	/**
	 * Click event handler.
	 */
	onclick?: (event: MouseEvent) => unknown;

	/**
	 * Icon snippet content.
	 */
	children?: Snippet;

	/**
	 * Additional CSS classes.
	 */
	class?: string;
}
