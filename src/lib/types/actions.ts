import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes, HTMLAttributes } from 'svelte/elements';
import type { Variant, Size } from './tokens.js';

export interface ButtonProps extends HTMLButtonAttributes {
	children?: Snippet;
	variant?: Variant;
	size?: Size;
	fullWidth?: boolean;
	iconOnly?: boolean;
	loading?: boolean;
	casing?: 'uppercase' | 'none';
}

export interface TabItem {
	id: string;
	label: string;
	disabled?: boolean;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLElement>, 'onchange'> {
	items?: TabItem[];
	value?: string;
	size?: Size;
	fullWidth?: boolean;
	children?: Snippet;
	onchange?: (value: string) => void;
}
