import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { Variant, Size, Space, Radius } from './tokens.js';

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

/** Object fit options for the Image primitive. */
export type ImageFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

/** Aspect ratio presets or arbitrary CSS aspect ratio string. */
export type ImageAspectRatio = '1/1' | '16/9' | '4/3' | '3/2' | '2/1' | 'auto' | (string & {});

/** Props for the atomic Image display primitive. */
export interface ImageProps extends HTMLAttributes<HTMLDivElement> {
	/** Image source URL. */
	src?: string | null;
	/** Accessible text description for the image. */
	alt?: string;
	/** Object-fit behavior. Default: 'cover'. */
	fit?: ImageFit;
	/** Aspect ratio. Default: 'auto'. */
	aspectRatio?: ImageAspectRatio;
	/** Corner radius token. Default: 'xs'. */
	radius?: Radius;
	/** Size preset matching control heights ('sm', 'md', 'lg') or explicit dimension string/number. */
	size?: Size | string | number;
	/** Explicit width (overrides size width). */
	width?: string | number;
	/** Explicit height (overrides size height). */
	height?: string | number;
	/** Fallback text or snippet when image fails or src is empty. */
	fallback?: string | Snippet;
	/** Children snippet rendered as fallback if image fails or src is empty. */
	children?: Snippet;
	/** Native image loading behavior ('lazy' | 'eager'). Default: 'lazy'. */
	loading?: 'lazy' | 'eager';
	/** Image decoding mode ('async' | 'sync' | 'auto'). Default: 'async'. */
	decoding?: 'async' | 'sync' | 'auto';
	/** Whether to display a border matching Shellfish border tokens. Default: false. */
	bordered?: boolean;
	/** Additional CSS classes. */
	class?: string;
	/** Additional inline styles. */
	style?: string;
	/** Callback when image loads successfully. */
	onload?: (event: Event) => void;
	/** Callback when image fails to load. */
	onerror?: (event: Event) => void;
}
