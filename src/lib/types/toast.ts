import type { HTMLAttributes } from 'svelte/elements';
import type { Variant } from './tokens.js';

/** Toast visual variants. */
export type ToastVariant = Extract<Variant, 'primary' | 'success' | 'warning' | 'danger' | 'info'>;

/** Screen corner positioning for ToastContainer. */
export type ToastPosition =
	'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';

/** Options for dispatching a toast message. */
export interface ToastOptions {
	/** Visual variant. Default: 'primary'. */
	variant?: ToastVariant;
	/** Display duration in milliseconds (0 prevents auto-dismiss). Default: 4000. */
	duration?: number;
	/** Whether the toast displays a manual close button. Default: true. */
	dismissible?: boolean;
	/** Optional action button. */
	action?: {
		label: string;
		onClick: () => void;
	};
}

/** Active toast instance representation. */
export interface ToastItem {
	/** Unique generated identifier. */
	id: string;
	/** Message text displayed to the user. */
	message: string;
	/** Visual variant. */
	variant: ToastVariant;
	/** Duration before auto-dismissal in ms. */
	duration: number;
	/** Whether the close button is visible. */
	dismissible: boolean;
	/** Optional actionable button callback. */
	action?: {
		label: string;
		onClick: () => void;
	};
	/** Timestamp when the toast was spawned. */
	createdAt: number;
}

/** Props for the ToastContainer viewport anchor. */
export interface ToastContainerProps extends HTMLAttributes<HTMLDivElement> {
	/** Screen alignment position. Default: 'bottom-right'. */
	position?: ToastPosition;
	/** Additional CSS classes. */
	class?: string;
}

/** Props for an individual Toast notification element. */
export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
	/** Toast data object. */
	toast: ToastItem;
	/** Dismissal callback function. */
	onDismiss: (id: string) => void;
	/** Additional CSS classes. */
	class?: string;
}
