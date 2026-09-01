import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { Variant, Space, Radius } from './tokens.js';

/** Props for an article-like surface. */
export interface CardProps extends HTMLAttributes<HTMLElement> {
	/** Main card content. */
	children?: Snippet;
	/** Header snippet. */
	header?: Snippet;
	/** Footer snippet. */
	footer?: Snippet;
	/** Surface presentation. */
	variant?: 'default' | 'outlined' | 'flat';
	/** Inner spacing. */
	padding?: Space;
	/** Corner radius. */
	radius?: Radius;
	/** Enables tactile interaction feedback. */
	interactive?: boolean;
	/** Uses the available inline space. */
	fullWidth?: boolean;
	/** Enables collapsible content. */
	collapsible?: boolean;
	/** Controlled collapsed state. */
	open?: boolean;
	/** Optional top badge text. */
	badgeTitle?: string;
	/** Reverse-side snippet. */
	back?: Snippet;
	/** Controlled flipped state. */
	flipped?: boolean;
}

/** Visual badge variant. */
export type BadgeVariant = Variant | 'success' | 'warning' | 'neutral';

/** Props for inline status text. */
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
	/** Badge content. */
	children?: Snippet;
	/** Visual status. */
	variant?: BadgeVariant;
	/** Badge size. */
	size?: 'sm' | 'md';
	/** Uses pill shape. */
	pill?: boolean;
}

/** Props for a semantic separator. */
export interface DividerProps extends HTMLAttributes<HTMLElement> {
	/** Optional localized label. */
	label?: string;
	/** Outer spacing. */
	spacing?: Space;
	/** Uses vertical orientation. */
	vertical?: boolean;
}

/** Props for an identity avatar. */
export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
	/** Image source. */
	src?: string;
	/** Localized image alternative text. */
	alt?: string;
	/** Name used for initials fallback. */
	name?: string;
	/** Avatar size. */
	size?: 'sm' | 'md' | 'lg' | 'xl';
	/** Uses square shape. */
	square?: boolean;
	/** Forces circular shape. */
	circle?: boolean;
}
