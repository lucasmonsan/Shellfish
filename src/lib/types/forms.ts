import type { Snippet } from 'svelte';
import type {
	HTMLInputAttributes,
	HTMLAttributes,
	HTMLFormAttributes,
	HTMLSelectAttributes,
	HTMLTextareaAttributes
} from 'svelte/elements';
import type { Size } from './tokens.js';

/** Visual variant for the Input primitive. */
export type InputVariant = 'default' | 'unstyled';

/** Props for the atomic Input primitive. */
export interface InputProps extends Omit<HTMLInputAttributes, 'size'> {
	/**
	 * Visual size preset ('sm', 'md', 'lg') derived from fluid --base.
	 * Default: 'md'
	 */
	size?: Size;

	/**
	 * Input visual style variant.
	 * Default: 'default'
	 */
	variant?: InputVariant;

	/**
	 * Whether the input is in an invalid/error state.
	 * Default: false
	 */
	invalid?: boolean;

	/**
	 * Two-way bindable input value.
	 */
	value?: string | number | null;

	/**
	 * Optional adornment rendered before the input (e.g. search icon, currency prefix).
	 */
	before?: Snippet;

	/**
	 * Optional adornment rendered after the input (e.g. clear button, password toggle).
	 */
	after?: Snippet;

	/**
	 * Full width container (100%).
	 * Default: true
	 */
	block?: boolean;

	/**
	 * Additional CSS classes.
	 */
	class?: string;

	/**
	 * Additional inline styles.
	 */
	style?: string;
}

/** Injected context provided to FormField control snippets. */
export interface FormFieldContext {
	/** Synchronized ID matching the label's `for` attribute. */
	id: string;
	/** Combined helper and error element IDs for aria-describedby. */
	describedby?: string;
	/** Whether the field currently has an active validation error. */
	invalid: boolean;
	/** Whether the field is marked as required. */
	required: boolean;
	/** Whether the field is marked as disabled. */
	disabled: boolean;
}

/** Props for the semantic FormField wrapper primitive. */
export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
	/**
	 * Accessible label text for the field.
	 */
	label: string;

	/**
	 * Target input element ID to associate with the label.
	 */
	forId: string;

	/**
	 * Optional helper message displayed below the input.
	 */
	helper?: string;

	/**
	 * Optional error message displayed below the input (announces with role="alert").
	 */
	error?: string;

	/**
	 * Whether the field is required. Renders an accessible asterisk.
	 * Default: false
	 */
	required?: boolean;

	/**
	 * Whether the field is disabled.
	 * Default: false
	 */
	disabled?: boolean;

	/**
	 * Custom helper element ID. Defaults to `${forId}-helper`.
	 */
	helperId?: string;

	/**
	 * Custom error element ID. Defaults to `${forId}-error`.
	 */
	errorId?: string;

	/**
	 * Optional extra action or info in the label header (e.g. "Forgot password?").
	 */
	extra?: Snippet;

	/**
	 * Main input element(s) inside the field.
	 */
	children?: Snippet;

	/**
	 * Contextual control snippet receiving accessibility wiring automatically.
	 */
	control?: Snippet<[context: FormFieldContext]>;

	/**
	 * Additional CSS classes.
	 */
	class?: string;
}

/** Props for the semantic FormStack container primitive. */
export interface FormStackProps extends HTMLFormAttributes {
	/**
	 * Spacing between form fields.
	 * Default: 'md'
	 */
	gap?: 'xs' | 'sm' | 'md' | 'lg';

	/**
	 * Submit event handler.
	 */
	onsubmit?: (event: SubmitEvent) => unknown;

	/**
	 * Form content snippet.
	 */
	children?: Snippet;

	/**
	 * Additional CSS classes.
	 */
	class?: string;
}

/** Props for the atomic Checkbox primitive. */
export interface CheckboxProps extends Omit<HTMLInputAttributes, 'size'> {
	/** Current checked state. Supports two-way binding. */
	checked?: boolean;

	/** Indeterminate (mixed) state. Supports two-way binding. */
	indeterminate?: boolean;

	/** Optional text label. */
	label?: string;

	/**
	 * Visual size preset ('sm', 'md', 'lg') derived from fluid --base.
	 * Default: 'md'
	 */
	size?: Size;

	/** Whether the checkbox is in an invalid/error state. */
	invalid?: boolean;

	/** Whether the checkbox is disabled. */
	disabled?: boolean;

	/** Custom label / children snippet. */
	children?: Snippet;

	/** Additional CSS classes. */
	class?: string;
}

/** Props for the atomic Radio primitive. */
export interface RadioProps extends Omit<HTMLInputAttributes, 'size'> {
	/** Selected group value. Supports two-way binding. */
	group?: unknown;

	/** Value of this radio option. */
	value?: unknown;

	/** Optional text label. */
	label?: string;

	/**
	 * Visual size preset ('sm', 'md', 'lg') derived from fluid --base.
	 * Default: 'md'
	 */
	size?: Size;

	/** Whether the radio is in an invalid/error state. */
	invalid?: boolean;

	/** Whether the radio is disabled. */
	disabled?: boolean;

	/** Custom label / children snippet. */
	children?: Snippet;

	/** Additional CSS classes. */
	class?: string;
}

/** Unique symbol for RadioGroup context inheritance. */
export const RADIO_GROUP_KEY = Symbol('radio-group');

/** Props for the semantic RadioGroup container primitive. */
export interface RadioGroupProps extends HTMLAttributes<HTMLDivElement> {
	/** Selected value in the group. Supports two-way binding. */
	value?: unknown;

	/** Accessible group label. */
	label?: string;

	/** Shared name attribute for child radio inputs. */
	name?: string;

	/**
	 * Layout orientation.
	 * Default: 'vertical'
	 */
	orientation?: 'horizontal' | 'vertical';

	/**
	 * Spacing gap between radios.
	 * Default: 'sm'
	 */
	gap?: 'xs' | 'sm' | 'md';

	/**
	 * Default size for nested radios.
	 * Default: 'md'
	 */
	size?: Size;

	/** Whether all radios in the group are in an invalid/error state. */
	invalid?: boolean;

	/** Whether all radios in the group are disabled. */
	disabled?: boolean;

	/** Child radio elements / options. */
	children?: Snippet;

	/** Additional CSS classes. */
	class?: string;
}

/** Props for the atomic Switch primitive. */
export interface SwitchProps extends Omit<HTMLInputAttributes, 'size'> {
	/** Current checked state. Supports two-way binding. */
	checked?: boolean;

	/** Optional text label. */
	label?: string;

	/**
	 * Visual size preset ('sm', 'md', 'lg') derived from fluid --base.
	 * Default: 'md'
	 */
	size?: Size;

	/** Whether the switch is in an invalid/error state. */
	invalid?: boolean;

	/** Whether the switch is disabled. */
	disabled?: boolean;

	/** Custom label / children snippet. */
	children?: Snippet;

	/** Additional CSS classes. */
	class?: string;
}

/** Option structure for the Select primitive when passed via props. */
export interface SelectOption {
	value: string;
	label: string;
	disabled?: boolean;
}

/** Props for the atomic Select primitive. */
export interface SelectProps extends Omit<HTMLSelectAttributes, 'size'> {
	/** Two-way bindable select value. */
	value?: string | number | null;

	/** Optional options array. When omitted, options can be passed via children snippet. */
	options?: SelectOption[];

	/** Placeholder option displayed when value is empty. */
	placeholder?: string;

	/**
	 * Visual size preset ('sm', 'md', 'lg') derived from fluid --base.
	 * Default: 'md'
	 */
	size?: Size;

	/**
	 * Whether the select is in an invalid/error state.
	 * Default: false
	 */
	invalid?: boolean;

	/**
	 * Full width container (100%).
	 * Default: true
	 */
	block?: boolean;

	/** Custom options / optgroups passed as children. */
	children?: Snippet;

	/** Additional CSS classes. */
	class?: string;

	/** Additional inline styles. */
	style?: string;
}

/** Props for the atomic Textarea primitive. */
export interface TextareaProps extends HTMLTextareaAttributes {
	/** Two-way bindable textarea value. */
	value?: string;

	/**
	 * Visual size preset ('sm', 'md', 'lg') derived from fluid --base.
	 * Default: 'md'
	 */
	size?: Size;

	/**
	 * Whether the textarea is in an invalid/error state.
	 * Default: false
	 */
	invalid?: boolean;

	/**
	 * Resize behavior ('none', 'vertical', 'horizontal', 'both').
	 * Default: 'vertical'
	 */
	resize?: 'none' | 'vertical' | 'horizontal' | 'both';

	/**
	 * Full width container (100%).
	 * Default: true
	 */
	block?: boolean;

	/**
	 * Whether to display character count in the footer.
	 * Default: false
	 */
	showCount?: boolean;

	/** Additional CSS classes. */
	class?: string;

	/** Additional inline styles. */
	style?: string;
}
