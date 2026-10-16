import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

/** Horizontal alignment relative to the trigger element. */
export type PopoverAlign = 'start' | 'center' | 'end';

/** Vertical placement relative to the trigger element. */
export type PopoverPlacement = 'auto' | 'bottom' | 'top';

/** Props for the atomic Popover overlay primitive. */
export interface PopoverProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
	/** Two-way bindable open state. Default: false. */
	open?: boolean;
	/** Horizontal alignment relative to the trigger. Default: 'start'. */
	align?: PopoverAlign;
	/** Vertical placement direction. 'auto' automatically detects available viewport space. Default: 'auto'. */
	placement?: PopoverPlacement;
	/** Pixel gap between the trigger and the popover panel. Default: 4. */
	offset?: number;
	/** Whether the popover trigger is disabled. Default: false. */
	disabled?: boolean;
	/** Required trigger snippet providing toggle function and current open state. */
	trigger: Snippet<[toggle: (event?: MouseEvent | KeyboardEvent) => void, isOpen: boolean]>;
	/** Default content snippet inside the popover panel, receiving close function. */
	children?: Snippet<[close: () => void]>;
	/** Optional explicit content snippet (alias to children). */
	content?: Snippet<[close: () => void]>;
	/** Additional CSS classes for the root anchor wrapper. */
	class?: string;
	/** Additional CSS classes for the floating panel element. */
	panelClass?: string;
	/** Additional inline styles. */
	style?: string;
}
