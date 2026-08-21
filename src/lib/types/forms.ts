import type { Snippet } from 'svelte';
import type {
	HTMLInputAttributes,
	HTMLTextareaAttributes,
	HTMLSelectAttributes
} from 'svelte/elements';
import type { Size } from './tokens.js';

export interface InputProps extends Omit<HTMLInputAttributes, 'size' | 'prefix'> {
	label?: string;
	size?: Size;
	invalid?: boolean;
	fullWidth?: boolean;
	prefix?: Snippet;
	suffix?: Snippet;
}

export interface TextareaProps extends HTMLTextareaAttributes {
	label?: string;
	size?: Size;
	invalid?: boolean;
	fullWidth?: boolean;
	resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export interface SelectOption {
	value: string | number;
	label: string;
	disabled?: boolean;
}

export interface SelectProps extends Omit<HTMLSelectAttributes, 'size'> {
	label?: string;
	children?: Snippet;
	size?: Size;
	invalid?: boolean;
	fullWidth?: boolean;
	options?: SelectOption[];
	placeholder?: string;
}

export interface CheckboxProps extends Omit<HTMLInputAttributes, 'size' | 'type'> {
	label?: string;
	invalid?: boolean;
	indeterminate?: boolean;
}

export interface RadioProps extends Omit<HTMLInputAttributes, 'size' | 'type'> {
	label?: string;
	invalid?: boolean;
	group?: unknown;
	value?: unknown;
}
