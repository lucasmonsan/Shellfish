import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLDialogAttributes } from 'svelte/elements';
import type { Size } from './tokens.js';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps extends HTMLAttributes<HTMLElement> {
	children?: Snippet;
	variant?: AlertVariant;
	title?: string;
	closable?: boolean;
	onclose?: () => void;
}

export interface SpinnerProps extends HTMLAttributes<SVGSVGElement> {
	size?: Size;
	color?: string;
}

export interface DialogProps extends HTMLDialogAttributes {
	open?: boolean;
	title?: string;
	children?: Snippet;
	footer?: Snippet;
	size?: 'sm' | 'md' | 'lg' | 'full';
	closeOnOutsideClick?: boolean;
	onclose?: () => void;
}

export interface ToastProps extends HTMLAttributes<HTMLElement> {
	children?: Snippet;
	variant?: AlertVariant;
	duration?: number;
	open?: boolean;
	onclose?: () => void;
}
