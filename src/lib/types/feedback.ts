import type { HTMLAttributes } from 'svelte/elements';
import type { Size } from './tokens.js';

/** Props for the canonical spinCube Spinner primitive. */
export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
	/**
	 * Size preset ('sm', 'md', 'lg') derived from fluid --base, or custom dimension in px/CSS unit.
	 * Default: 'md'
	 */
	size?: Size | number | string;

	/**
	 * Accessible loading message for screen readers.
	 * Defaults to localized i18n 'common.loading'.
	 */
	label?: string;

	/**
	 * Additional CSS classes.
	 */
	class?: string;
}
