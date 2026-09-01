import type { Snippet } from 'svelte';
import type {
	HTMLInputAttributes,
	HTMLTextareaAttributes,
	HTMLSelectAttributes,
	HTMLAttributes
} from 'svelte/elements';
import type { Size } from './tokens.js';

/** Props for a text input. */
export interface InputProps extends Omit<HTMLInputAttributes, 'size' | 'prefix'> {
	/** Localized associated label. */
	label?: string;
	/** Control height. */
	size?: Size;
	/** Exposes invalid state. */
	invalid?: boolean;
	/** Uses the available inline space. */
	fullWidth?: boolean;
	/** Content before the native input. */
	prefix?: Snippet;
	/** Content after the native input. */
	suffix?: Snippet;
}

/** Props for a multiline text input. */
export interface TextareaProps extends HTMLTextareaAttributes {
	/** Localized associated label. */
	label?: string;
	/** Control height. */
	size?: Size;
	/** Exposes invalid state. */
	invalid?: boolean;
	/** Uses the available inline space. */
	fullWidth?: boolean;
	/** Native resize behavior. */
	resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

/** One native select option. */
export interface SelectOption {
	/** Submitted option value. */
	value: string | number;
	/** Localized visible text. */
	label: string;
	/** Prevents selection. */
	disabled?: boolean;
}

/** Props for a select control. */
export interface SelectProps extends Omit<HTMLSelectAttributes, 'size'> {
	/** Localized associated label. */
	label?: string;
	/** Optional native option snippets. */
	children?: Snippet;
	/** Control height. */
	size?: Size;
	/** Exposes invalid state. */
	invalid?: boolean;
	/** Uses the available inline space. */
	fullWidth?: boolean;
	/** Data-driven options. */
	options?: SelectOption[];
	/** Localized unselected prompt. */
	placeholder?: string;
	/** Prefers native mobile selection behavior. */
	nativeOnMobile?: boolean;
}

/** Props for a checkbox control. */
export interface CheckboxProps extends Omit<HTMLInputAttributes, 'size' | 'type'> {
	/** Localized visible label. */
	label?: string;
	/** Rich choice-card content. */
	children?: Snippet;
	/** Exposes invalid state. */
	invalid?: boolean;
	/** Sets the native indeterminate state. */
	indeterminate?: boolean;
	/** Standard or card presentation. */
	variant?: 'default' | 'card';
}

/** Props for a radio control. */
export interface RadioProps extends Omit<HTMLInputAttributes, 'size' | 'type'> {
	/** Localized visible label. */
	label?: string;
	/** Rich choice-card content. */
	children?: Snippet;
	/** Exposes invalid state. */
	invalid?: boolean;
	/** Bound radio-group value. */
	group?: unknown;
	/** This option value. */
	value?: unknown;
	/** Standard or card presentation. */
	variant?: 'default' | 'card';
}

/** Props for a switch control. */
export interface SwitchProps extends Omit<HTMLInputAttributes, 'size' | 'type'> {
	/** Localized visible label. */
	label?: string;
	/** Control height. */
	size?: Size;
	/** Exposes invalid state. */
	invalid?: boolean;
}

/** Props for a range slider. */
export interface SliderProps extends Omit<HTMLInputAttributes, 'size' | 'type'> {
	/** Localized visible label. */
	label?: string;
	/** Control height. */
	size?: Size;
	/** Exposes invalid state. */
	invalid?: boolean;
	/** Minimum allowed value. */
	min?: number;
	/** Maximum allowed value. */
	max?: number;
	/** Increment between values. */
	step?: number;
	/** Renders the current value. */
	showValue?: boolean;
	/** Localized suffix for the value. */
	valueSuffix?: string;
}

/** Calendar presentation mode. */
export type CalendarMode = 'month' | 'strip' | 'week' | 'expandable';

/** Props for date selection. */
export interface CalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onselect'> {
	/** Selected date. */
	value?: string | Date;
	/** Calendar presentation. */
	mode?: CalendarMode;
	/** Earliest selectable date. */
	minDate?: string | Date;
	/** Latest selectable date. */
	maxDate?: string | Date;
	/** Prevents past-date selection. */
	disablePast?: boolean;
	/** Called after date selection. */
	onselect?: (date: Date) => void;
}

/** Props for the editable tag collection. */
export interface ChipsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'value'> {
	/** Selected tag values. */
	value?: string[];
	/** Localized associated label. */
	label?: string;
	/** Localized entry placeholder. */
	placeholder?: string;
	/** Prevents editing. */
	disabled?: boolean;
	/** Exposes invalid state. */
	invalid?: boolean;
	/** Available completion suggestions. */
	suggestions?: string[];
	/** Uses the available inline space. */
	fullWidth?: boolean;
	/** Native field name. */
	name?: string;
	/** Called when a tag is added. */
	onadd?: (tag: string) => void;
	/** Called when a tag is removed. */
	onremove?: (tag: string) => void;
}
