import type { Snippet } from 'svelte';
import type { HTMLInputAttributes, HTMLAttributes, HTMLFormAttributes } from 'svelte/elements';
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
