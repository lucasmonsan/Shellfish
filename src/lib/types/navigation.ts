import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { Size } from './tokens.js';

/** Orientation of the tab list. */
export type TabsOrientation = 'horizontal' | 'vertical';

/** Keyboard activation behavior for tabs. */
export type TabsActivation = 'automatic' | 'manual';

/** Props for the root Tabs primitive. */
export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
	/** Active tab value. Supports two-way binding via `bind:value`. */
	value?: string;
	/** Visual and keyboard navigation orientation. Default: 'horizontal'. */
	orientation?: TabsOrientation;
	/** Activation mode on arrow navigation. Default: 'automatic'. */
	activation?: TabsActivation;
	/** Size preset for tab buttons. Default: 'md'. */
	size?: Size;
	/** Sub-components snippet (TabList and optional TabPanels). */
	children?: Snippet;
	/** Additional CSS classes. */
	class?: string;
}

/** Props for the TabList container. */
export interface TabListProps extends HTMLAttributes<HTMLElement> {
	/** Accessible label for screen readers (`aria-label`). */
	label?: string;
	/** Tab items snippet. */
	children?: Snippet;
	/** Whether tab buttons expand to fill available width. Default: false. */
	fullWidth?: boolean;
	/** Render as semantic <nav> element instead of <div role="tablist"> when used for route navigation. Default: false. */
	asNav?: boolean;
	/** Additional CSS classes. */
	class?: string;
}

/** Props for an individual Tab item. Supports both in-page button tabs and route link tabs. */
export interface TabProps extends HTMLAttributes<HTMLElement> {
	/** Unique value identifying this tab. */
	value: string;
	/** Destination URL when tab acts as a navigation link. When provided, renders a semantic `<a>` tag instead of `<button>`. */
	href?: string;
	/** Target browsing context for links (e.g. '_blank', '_self'). */
	target?: string;
	/** Relationship of the target URL for links (e.g. 'noopener noreferrer'). */
	rel?: string;
	/** HTML button type when rendered as button. Default: 'button'. */
	type?: 'button' | 'submit' | 'reset';
	/** Whether the tab is disabled. Default: false. */
	disabled?: boolean;
	/** Tab label/content snippet. */
	children?: Snippet;
	/** Optional text label when children snippet is omitted. */
	label?: string;
	/** Additional CSS classes. */
	class?: string;
}

/** Props for a TabPanel content container. */
export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
	/** Matching value corresponding to the Tab value. */
	value: string;
	/** Panel content snippet. */
	children?: Snippet;
	/** Whether to preserve DOM element with hidden attribute when inactive. Default: false. */
	keepMounted?: boolean;
	/** Additional CSS classes. */
	class?: string;
}
