import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLDialogAttributes } from 'svelte/elements';
import type { Size } from './tokens.js';

/** Alert severity. */
export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

/** Props for assertive feedback. */
export interface AlertProps extends HTMLAttributes<HTMLElement> {
	/** Alert content. */
	children?: Snippet;
	/** Severity styling. */
	variant?: AlertVariant;
	/** Localized alert title. */
	title?: string;
	/** Shows the dismiss control. */
	closable?: boolean;
	/** Localized dismiss label. */
	closeLabel?: string;
	/** Called after dismissal. */
	onclose?: () => void;
}

/** Props for loading feedback. */
export interface SpinnerProps extends HTMLAttributes<HTMLElement> {
	/** Animation shape. */
	variant?: 'cube' | 'ratchet' | 'chaser';
	/** Spinner size. */
	size?: Size;
	/** Semantic spinner color. */
	color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
	/** Localized accessible label. */
	label?: string;
}

/** Progress color variant. */
export type ProgressVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

/** Props for progress feedback. */
export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
	/** Current progress value. */
	value?: number;
	/** Maximum progress value. */
	max?: number;
	/** Bar height. */
	size?: Size;
	/** Semantic progress color. */
	variant?: ProgressVariant;
	/** Shows the striped treatment. */
	striped?: boolean;
	/** Renders a visible value label. */
	showLabel?: boolean;
	/** Localized accessible label. */
	label?: string;
}

/** Props for a native modal dialog. */
export interface DialogProps extends HTMLDialogAttributes {
	/** Controlled open state. */
	open?: boolean;
	/** Localized dialog title. */
	title?: string;
	/** Dialog content. */
	children?: Snippet;
	/** Footer snippet. */
	footer?: Snippet;
	/** Dialog width. */
	size?: 'sm' | 'md' | 'lg' | 'full';
	/** Allows backdrop dismissal. */
	closeOnOutsideClick?: boolean;
	/** Localized dismiss label. */
	closeLabel?: string;
	/** Called after close. */
	onclose?: () => void;
}

/** Props for transient status feedback. */
export interface ToastProps extends HTMLAttributes<HTMLElement> {
	/** Toast content. */
	children?: Snippet;
	/** Severity styling. */
	variant?: AlertVariant;
	/** Auto-dismiss delay in milliseconds. */
	duration?: number;
	/** Controlled visible state. */
	open?: boolean;
	/** Localized dismiss label. */
	closeLabel?: string;
	/** Called after dismissal. */
	onclose?: () => void;
}
