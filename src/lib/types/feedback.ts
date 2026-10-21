import type { HTMLAttributes, HTMLProgressAttributes } from 'svelte/elements';
import type { Size, Variant, PaletteColorId, Radius } from './tokens.js';

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

/** Props for the Progress primitive. */
export interface ProgressProps extends HTMLProgressAttributes {
	/** Current progress value. Default: 0. */
	value?: number;
	/** Maximum progress value. Default: 100. */
	max?: number;
	/** Control height size ('sm' | 'md' | 'lg'). Default: 'md'. */
	size?: Size;
	/** Semantic variant or palette color for the fill bar. Default: 'primary'. */
	variant?: Variant | PaletteColorId;
	/** Accessible label for screen readers. */
	label?: string;
	/** Whether to show the percentage text. Default: false. */
	showValue?: boolean;
	/** Additional CSS classes. */
	class?: string;
}

/** Visual shapes for Skeleton loading placeholders. */
export type SkeletonVariant = 'rect' | 'text' | 'circle';

/** Props for the Skeleton placeholder primitive. */
export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
	/** Visual shape. Default: 'rect'. */
	variant?: SkeletonVariant;
	/** Explicit width. */
	width?: string | number;
	/** Explicit height. */
	height?: string | number;
	/** Corner radius token. Default: 'xs'. */
	radius?: Radius;
	/** Whether the shimmer pulse animation is enabled. Default: true. */
	animate?: boolean;
	/** Additional CSS classes. */
	class?: string;
}
