import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { Variant, Space, Radius } from './tokens.js';

export interface CardProps extends HTMLAttributes<HTMLElement> {
	children?: Snippet;
	header?: Snippet;
	footer?: Snippet;
	variant?: 'default' | 'outlined' | 'flat';
	padding?: Space;
	radius?: Radius;
	interactive?: boolean;
	fullWidth?: boolean;
	collapsible?: boolean;
	open?: boolean;
	badgeTitle?: string;
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
	children?: Snippet;
	variant?: Variant;
	size?: 'sm' | 'md';
	pill?: boolean;
}

export interface DividerProps extends HTMLAttributes<HTMLElement> {
	label?: string;
	spacing?: Space;
	vertical?: boolean;
}

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
	src?: string;
	alt?: string;
	name?: string;
	size?: 'sm' | 'md' | 'lg' | 'xl';
	square?: boolean;
}
