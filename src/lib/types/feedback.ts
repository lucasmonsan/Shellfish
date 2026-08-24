import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLDialogAttributes } from 'svelte/elements';
import type { Size } from './tokens.js';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps extends HTMLAttributes<HTMLElement> {
	children?: Snippet;
	variant?: AlertVariant;
	title?: string;
	closable?: boolean;
	closeLabel?: string;
	onclose?: () => void;
}

export interface SpinnerProps extends HTMLAttributes<HTMLElement> {
	variant?: 'cube' | 'ratchet' | 'chaser';
	size?: Size;
	color?: string;
	label?: string;
}

export type ProgressVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
	value?: number;
	max?: number;
	size?: Size;
	variant?: ProgressVariant;
	striped?: boolean;
	showLabel?: boolean;
	label?: string;
}

export interface DialogProps extends HTMLDialogAttributes {
	open?: boolean;
	title?: string;
	children?: Snippet;
	footer?: Snippet;
	size?: 'sm' | 'md' | 'lg' | 'full';
	closeOnOutsideClick?: boolean;
	closeLabel?: string;
	onclose?: () => void;
}

export interface ToastProps extends HTMLAttributes<HTMLElement> {
	children?: Snippet;
	variant?: AlertVariant;
	duration?: number;
	open?: boolean;
	closeLabel?: string;
	onclose?: () => void;
}
