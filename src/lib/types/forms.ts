import type { Snippet } from 'svelte';
import type {
	HTMLInputAttributes,
	HTMLAttributes,
	HTMLFormAttributes,
	HTMLSelectAttributes,
	HTMLTextareaAttributes
} from 'svelte/elements';
import type { Size, Variant } from './tokens.js';

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

/** Props for the atomic Tag / Chip primitive. */
export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
	/** Visual style variant. Default: 'secondary' */
	variant?: Variant;

	/** Visual size preset ('sm', 'md', 'lg') derived from fluid --base. Default: 'md' */
	size?: Size;

	/** Whether the tag is selected (e.g. in filter groups). Default: false */
	selected?: boolean;

	/** Whether the tag displays a removal button (X). Default: false */
	removable?: boolean;

	/** Whether the tag is disabled. Default: false */
	disabled?: boolean;

	/** Accessible label for the remove button. Default: 'Remover' */
	removeLabel?: string;

	/** Removal callback when X or delete key is pressed. */
	onremove?: (event: MouseEvent | KeyboardEvent) => void;

	/** Click callback when tag is clicked. */
	onclick?: (event: MouseEvent) => void;

	/** Tag content / label. */
	children?: Snippet;

	/** Text label if children snippet is omitted. */
	label?: string;

	/** Additional CSS classes. */
	class?: string;
}

/** Backward-compatible alias for TagProps. */
export type ChipProps = TagProps;

/** Props for the dynamic Tags / TagInput primitive. */
export interface TagsProps extends HTMLAttributes<HTMLDivElement> {
	/** Two-way bindable array of string tags. */
	tags?: string[];

	/** Maximum allowed tags. */
	maxTags?: number;

	/** Input placeholder text when tags can still be added. */
	placeholder?: string;

	/** Visual size preset ('sm', 'md', 'lg') derived from fluid --base. Default: 'md' */
	size?: Size;

	/** Whether the tag input is in an invalid/error state. Default: false */
	invalid?: boolean;

	/** Whether the tag input is disabled. Default: false */
	disabled?: boolean;

	/** Whether the tag input takes full width (100%). Default: true */
	block?: boolean;

	/** ID for connecting label associations. */
	id?: string;

	/** Accessible label for the input. */
	label?: string;

	/** Callback when tags array changes. */
	ontagschange?: (tags: string[]) => void;

	/** Additional CSS classes. */
	class?: string;
}

/** Backward-compatible alias for TagsProps. */
export type TagInputProps = TagsProps;

/** Props for the FileUpload / Dropzone primitive. */
export interface FileUploadProps extends HTMLAttributes<HTMLDivElement> {
	/** Accessible label for the file upload dropzone. */
	label?: string;

	/** Primary prompt text inside the dropzone. */
	primaryText?: string;

	/** Secondary prompt text inside the dropzone. */
	secondaryText?: string;

	/** Two-way bindable array of selected File objects. */
	files?: File[];

	/** Comma-separated accepted file extensions or MIME types (e.g. "image/*,.pdf"). */
	accept?: string;

	/** Whether multiple files can be selected simultaneously. Default: false */
	multiple?: boolean;

	/** Maximum size allowed per file in megabytes (MB). */
	maxSizeMb?: number;

	/** Maximum number of files allowed. */
	maxFiles?: number;

	/** Whether the upload zone is disabled. Default: false */
	disabled?: boolean;

	/** Whether the upload zone is in an invalid/error state. Default: false */
	invalid?: boolean;

	/** Custom prompt snippet inside the dropzone. */
	children?: Snippet;

	/** Callback when valid files are added or selected. */
	onfiles?: (files: File[]) => void;

	/** Additional CSS classes. */
	class?: string;
}

/** Props for the ColorPicker primitive. */
export interface ColorPickerProps extends HTMLAttributes<HTMLDivElement> {
	/** Two-way bindable hex color value (e.g. '#b94b38'). */
	value?: string;

	/** Visual size preset ('sm', 'md', 'lg') derived from fluid --base. Default: 'md' */
	size?: Size;

	/** Preset palette colors for quick 1-click selection. */
	presets?: string[];

	/** Whether custom color picker is allowed (opens native / hex picker). Default: false */
	allowCustom?: boolean;

	/** Whether to show the editable hexadecimal text input alongside the swatch in trigger. Default: true */
	showHexInput?: boolean;

	/** Full width trigger container (100%). Default: false */
	block?: boolean;

	/** Whether the color picker is disabled. Default: false */
	disabled?: boolean;

	/** Whether the color picker is in an invalid/error state. Default: false */
	invalid?: boolean;

	/** Accessible label for the color swatch. */
	label?: string;

	/** Additional CSS classes. */
	class?: string;
}

/** Props for the atomic DatePicker primitive. */
export interface DatePickerProps extends Omit<HTMLInputAttributes, 'size' | 'type'> {
	/** Two-way bindable ISO date string ('YYYY-MM-DD'). */
	value?: string;

	/** Visual size preset ('sm', 'md', 'lg') derived from fluid --base. Default: 'md' */
	size?: Size;

	/** Whether the datepicker is in an invalid/error state. Default: false */
	invalid?: boolean;

	/** Full width container (100%). Default: true */
	block?: boolean;

	/** Additional CSS classes. */
	class?: string;

	/** Additional inline styles. */
	style?: string;
}

/** Props for the atomic TimePicker primitive. */
export interface TimePickerProps extends Omit<HTMLInputAttributes, 'size' | 'type'> {
	/** Two-way bindable time string ('HH:MM' or 'HH:MM:SS'). */
	value?: string;

	/** Visual size preset ('sm', 'md', 'lg') derived from fluid --base. Default: 'md' */
	size?: Size;

	/** Whether the timepicker is in an invalid/error state. Default: false */
	invalid?: boolean;

	/** Full width container (100%). Default: true */
	block?: boolean;

	/** Additional CSS classes. */
	class?: string;

	/** Additional inline styles. */
	style?: string;
}
