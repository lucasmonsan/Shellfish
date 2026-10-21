import type { ToastItem, ToastOptions } from '$lib/types/toast.js';

class ToastStore {
	items = $state<ToastItem[]>([]);

	/** Dispatches a new toast notification. Returns the toast ID. */
	show(message: string, options: ToastOptions = {}): string {
		const id = `toast-${Math.random().toString(36).slice(2, 9)}`;
		const { variant = 'primary', duration = 4000, dismissible = true, action } = options;

		const item: ToastItem = {
			id,
			message,
			variant,
			duration,
			dismissible,
			action,
			createdAt: Date.now()
		};

		this.items = [...this.items, item];
		return id;
	}

	/** Dispatches a success toast. */
	success(message: string, options: Omit<ToastOptions, 'variant'> = {}): string {
		return this.show(message, { ...options, variant: 'success' });
	}

	/** Dispatches an error/danger toast. */
	error(message: string, options: Omit<ToastOptions, 'variant'> = {}): string {
		return this.show(message, { ...options, variant: 'danger' });
	}

	/** Dispatches a warning toast. */
	warning(message: string, options: Omit<ToastOptions, 'variant'> = {}): string {
		return this.show(message, { ...options, variant: 'warning' });
	}

	/** Dispatches an informative toast. */
	info(message: string, options: Omit<ToastOptions, 'variant'> = {}): string {
		return this.show(message, { ...options, variant: 'info' });
	}

	/** Dismisses an active toast by ID. */
	dismiss(id: string) {
		this.items = this.items.filter((item) => item.id !== id);
	}

	/** Clears all active toasts immediately. */
	clear() {
		this.items = [];
	}
}

/** Global reactive toast store singleton. */
export const toast = new ToastStore();
