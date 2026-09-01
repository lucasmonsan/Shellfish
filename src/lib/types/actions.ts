import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes, HTMLAttributes } from 'svelte/elements';
import type { Variant, Size } from './tokens.js';

/** Props for the semantic Button control. */
export interface ButtonProps extends HTMLButtonAttributes {
	/** Content rendered inside the button. */
	children?: Snippet;
	/** Visual emphasis. Defaults to primary. */
	variant?: Variant;
	/** Control height. Defaults to md. */
	size?: Size;
	/** Expands the button to its container width. */
	fullWidth?: boolean;
	/** Uses the compact icon-only layout. */
	iconOnly?: boolean;
	/** Shows busy state and disables activation. */
	loading?: boolean;
	/** Text casing policy. Defaults to none. */
	casing?: 'uppercase' | 'none';
}

/** One selectable tab. */
export interface TabItem {
	/** Stable tab value. */
	id: string;
	/** Localized visible tab text. */
	label: string;
	/** Prevents selection. */
	disabled?: boolean;
}

/** Props for the tab list navigation control. */
export interface TabsProps extends Omit<HTMLAttributes<HTMLElement>, 'onchange'> {
	/** Tabs rendered by the control. */
	items?: TabItem[];
	/** Selected tab id. */
	value?: string;
	/** Control height. */
	size?: Size;
	/** Expands the list to its container width. */
	fullWidth?: boolean;
	/** Optional custom content. */
	children?: Snippet;
	/** Called after selection changes. */
	onchange?: (value: string) => void;
}

/** One dropdown menu action. */
export interface DropdownItem {
	/** Stable item id. */
	id: string;
	/** Localized item text. */
	label: string;
	/** Optional icon snippet. */
	icon?: Snippet;
	/** Uses danger styling. */
	danger?: boolean;
	/** Prevents activation. */
	disabled?: boolean;
	/** Activation callback. */
	onclick?: () => void;
}

/** Props for the floating dropdown menu. */
export interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
	/** Localized default trigger label. */
	label?: string;
	/** Custom trigger snippet. */
	trigger?: Snippet;
	/** Menu items. */
	items?: DropdownItem[];
	/** Optional custom menu content. */
	children?: Snippet;
	/** Controlled open state. */
	open?: boolean;
	/** Trigger appearance. */
	variant?: Variant;
	/** Trigger height. */
	size?: Size;
	/** Menu anchoring position. */
	placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
}
