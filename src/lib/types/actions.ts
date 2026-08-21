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

export interface ChipProps extends HTMLButtonAttributes {
	children?: Snippet;
	selected?: boolean;
	removable?: boolean;
	size?: Size;
	variant?: Variant;
	onremove?: (event: MouseEvent) => void;
}

export interface DropdownItem {
	id: string;
	label: string;
	icon?: Snippet;
	danger?: boolean;
	disabled?: boolean;
	onclick?: () => void;
}

export interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
	label?: string;
	trigger?: Snippet;
	items?: DropdownItem[];
	children?: Snippet;
	open?: boolean;
	placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
}
