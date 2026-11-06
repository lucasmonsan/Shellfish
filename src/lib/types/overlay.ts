import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { ContainerMaxWidth } from './layout.js';

/** Horizontal alignment relative to the trigger element. */
export type PopoverAlign = 'start' | 'center' | 'end';

/** Vertical placement relative to the trigger element. */
export type PopoverPlacement = 'auto' | 'bottom' | 'top';

/** WAI-ARIA accessibility attributes to be spread onto the interactive trigger button. */
export interface PopoverAriaProps {
	'aria-haspopup': 'dialog';
	'aria-expanded': boolean;
	'aria-controls': string | undefined;
	[key: string]: unknown;
}

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
	/** Accessible label for the floating panel region landmark. Default: 'Popover'. */
	ariaLabel?: string;
	/** Required trigger snippet providing toggle function, open state, and ARIA attributes for the button. */
	trigger: Snippet<
		[
			toggle: (event?: MouseEvent | KeyboardEvent) => void,
			isOpen: boolean,
			ariaProps: PopoverAriaProps
		]
	>;
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

/** Predefined modal widths according to the fluid typography scale. */
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/** Props for the atomic Modal dialog primitive. */
export interface ModalProps extends Omit<HTMLAttributes<HTMLDialogElement>, 'children'> {
	/** Two-way bindable open state. Default: false. */
	open?: boolean;
	/** Modal size preset. Default: 'md'. */
	size?: ModalSize;
	/** Whether the modal body has explicit vertical scroll overflow. Default: false (overflow: visible allows floating dropdowns). */
	scrollable?: boolean;
	/** Accessible title rendered in the dialog header. */
	title?: string;
	/** Accessible fallback label for screen readers when title is omitted. */
	ariaLabel?: string;
	/** Whether pressing Escape closes the modal when it is the topmost overlay. Default: true. */
	closeOnEscape?: boolean;
	/** Whether clicking on the backdrop closes the modal when it is the topmost overlay. Default: true. */
	closeOnClickOutside?: boolean;
	/** Whether the browser/mobile Back button closes the modal without route navigation. Default: true. */
	closeOnBack?: boolean;
	/** Whether to display the canonical header close 'X' button. Default: true. */
	showCloseButton?: boolean;
	/** Accessible label for the canonical close button. Default: i18n.t('dialog.close'). */
	closeLabel?: string;
	/** Optional predicate called before closing begins. Returning false aborts the close. */
	beforeClose?: () => boolean;
	/** Custom header snippet, receiving close function. */
	header?: Snippet<[close: () => void]>;
	/** Main content snippet inside the modal dialog body, receiving close function. */
	children?: Snippet<[close: () => void]>;
	/** Custom footer snippet, receiving close function. */
	footer?: Snippet<[close: () => void]>;
	/** Callback invoked when the modal closes. */
	onclose?: () => void;
	/** Additional CSS classes for the native dialog element. */
	class?: string;
	/** Additional inline styles. */
	style?: string;
}

/** Drawer sliding anchor side. */
export type DrawerPlacement = 'left' | 'right';

/** Drawer width presets. */
export type DrawerSize = 'sm' | 'md' | 'lg' | 'full';

/** Props for the atomic Drawer overlay primitive. */
export interface DrawerProps extends Omit<HTMLAttributes<HTMLDialogElement>, 'children'> {
	/** Two-way bindable open state. Default: false. */
	open?: boolean;
	/** Slide-in anchor placement. Default: 'right'. */
	placement?: DrawerPlacement;
	/** Drawer width size preset. Default: 'md'. */
	size?: DrawerSize;
	/** Whether the drawer body has explicit vertical scroll overflow. Default: false (overflow: visible allows floating dropdowns). */
	scrollable?: boolean;
	/** Accessible title rendered in the drawer header. */
	title?: string;
	/** Accessible fallback label for screen readers when title is omitted. */
	ariaLabel?: string;
	/** Whether pressing Escape closes the drawer when it is the topmost overlay. Default: true. */
	closeOnEscape?: boolean;
	/** Whether clicking on the backdrop closes the drawer when it is the topmost overlay. Default: true. */
	closeOnClickOutside?: boolean;
	/** Whether the browser/mobile Back button closes the drawer without route navigation. Default: true. */
	closeOnBack?: boolean;
	/** Whether to display the canonical header close 'X' button. Default: true. */
	showCloseButton?: boolean;
	/** Accessible label for the canonical close button. Default: i18n.t('dialog.close'). */
	closeLabel?: string;
	/** Optional predicate called before closing begins. Returning false aborts the close. */
	beforeClose?: () => boolean;
	/** Custom header snippet, receiving close function. */
	header?: Snippet<[close: () => void]>;
	/** Main content snippet inside the drawer body, receiving close function. */
	children?: Snippet<[close: () => void]>;
	/** Custom footer snippet, receiving close function. */
	footer?: Snippet<[close: () => void]>;
	/** Callback invoked when the drawer closes. */
	onclose?: () => void;
	/** Additional CSS classes for the native dialog element. */
	class?: string;
	/** Additional inline styles. */
	style?: string;
}

/** Directional anchor placement for tooltips. */
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

/** Props for the lightweight, non-modal Tooltip primitive. */
export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
	/** Text content displayed inside the tooltip bubble. */
	text?: string;
	/** Directional bubble placement relative to trigger. Default: 'top'. */
	placement?: TooltipPlacement;
	/** Hover/focus display delay in milliseconds. Default: 150. */
	delay?: number;
	/** Whether the tooltip is disabled. Default: false. */
	disabled?: boolean;
	/** Trigger snippet providing the unique aria-describedby ID when active. */
	trigger?: Snippet<[ariaDescribedBy: string | undefined]>;
	/** Fallback children snippet when trigger snippet is not used, also receiving ariaDescribedBy when active. */
	children?: Snippet<[ariaDescribedBy: string | undefined]>;
	/** Additional CSS classes for the root wrapper. */
	class?: string;
	/** Additional inline styles. */
	style?: string;
}

/** Props for the non-blocking FloatingBanner primitive anchored at the bottom of the content area. */
export interface FloatingBannerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
	/** Two-way bindable visibility state. Default: true. */
	open?: boolean;
	/** Contained maximum width preset derived from --base. Default: 'md'. */
	maxWidth?: ContainerMaxWidth;
	/** Accessible label for the floating region landmark. */
	ariaLabel?: string;
	/** Whether to display a dismiss 'X' button. Default: false. */
	dismissible?: boolean;
	/** Accessible label for the close button. Default: i18n.t('common.close'). */
	closeLabel?: string;
	/** Callback invoked when the banner is dismissed. */
	onclose?: () => void;
	/** Main content snippet inside the floating banner. */
	children?: Snippet;
	/** Optional actions snippet rendered on the opposite side of the content. */
	actions?: Snippet;
	/** Additional CSS classes for the banner surface. */
	class?: string;
	/** Additional inline styles. */
	style?: string;
}
