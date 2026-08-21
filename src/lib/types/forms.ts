import type { Snippet } from 'svelte';
import type {
	HTMLInputAttributes,
	HTMLTextareaAttributes,
	HTMLSelectAttributes,
	HTMLAttributes
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
	nativeOnMobile?: boolean;
}

export interface CheckboxProps extends Omit<HTMLInputAttributes, 'size' | 'type'> {
	label?: string;
	children?: Snippet;
	invalid?: boolean;
	indeterminate?: boolean;
	variant?: 'default' | 'card';
}

export interface RadioProps extends Omit<HTMLInputAttributes, 'size' | 'type'> {
	label?: string;
	children?: Snippet;
	invalid?: boolean;
	group?: unknown;
	value?: unknown;
	variant?: 'default' | 'card';
}

export interface SwitchProps extends Omit<HTMLInputAttributes, 'size' | 'type'> {
	label?: string;
	size?: Size;
	invalid?: boolean;
}

export interface SliderProps extends Omit<HTMLInputAttributes, 'size' | 'type'> {
	label?: string;
	size?: Size;
	invalid?: boolean;
	min?: number;
	max?: number;
	step?: number;
	showValue?: boolean;
	valueSuffix?: string;
}

export type CalendarMode = 'month' | 'strip' | 'week' | 'expandable';

export interface CalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onselect'> {
	value?: string | Date;
	mode?: CalendarMode;
	minDate?: string | Date;
	maxDate?: string | Date;
	disablePast?: boolean;
	onselect?: (date: Date) => void;
}
