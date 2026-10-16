import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { Variant, Size, Space } from './tokens.js';

/** Surface variants for the Card primitive. */
export type CardVariant = 'elevated' | 'primary' | 'secondary' | 'outlined';

/** Props for the semantic Card surface primitive. */
export interface CardProps extends HTMLAttributes<HTMLElement> {
	/** Main card content. */
	children?: Snippet;
	/** Surface style. Default: 'elevated'. */
	variant?: CardVariant;
	/** Inner padding token. Default: 'lg'. */
	padding?: Space;
	/** Spacing between direct children. Default: 'sm'. */
	gap?: Space;
	/** Cross-axis alignment of children. Default: 'stretch'. */
	align?: 'start' | 'center' | 'end' | 'stretch';
	/** Additional CSS classes. */
	class?: string;
}

/** Props for the square-styled Badge status primitive. */
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
	/** Badge content snippet. */
	children?: Snippet;
	/** Optional text label fallback when children is omitted. */
	label?: string;
	/** Visual variant. Default: 'secondary'. */
	variant?: Variant;
	/** Badge size preset ('sm' or 'md'). Default: 'md'. */
	size?: Extract<Size, 'sm' | 'md'>;
	/** Additional CSS classes. */
	class?: string;
}

/** Props for the semantic Divider primitive. */
export interface DividerProps extends HTMLAttributes<HTMLElement> {
	/** Orientation. Default: false (horizontal <hr>). */
	vertical?: boolean;
	/** Margin spacing around the divider. Default: 'none'. */
	spacing?: Space;
	/** Additional CSS classes. */
	class?: string;
}
