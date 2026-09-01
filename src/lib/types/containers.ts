import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { Space } from './tokens.js';

/** Props for the main document region. */
export interface MainProps extends HTMLAttributes<HTMLElement> {
	/** Region content. */
	children?: Snippet;
	/** Uses the available inline space. */
	fullWidth?: boolean;
	/** Uses the available block space. */
	fullHeight?: boolean;
	/** Spacing between children. */
	gap?: Space;
	/** Region inset. */
	padding?: Space;
}

/** Props for the page header region. */
export interface HeaderProps extends HTMLAttributes<HTMLElement> {
	/** Region content. */
	children?: Snippet;
	/** Keeps the header positioned while scrolling. */
	sticky?: boolean;
	/** Region inset. */
	padding?: Space;
}

/** Props for a semantic section. */
export interface SectionProps extends HTMLAttributes<HTMLElement> {
	/** Region content. */
	children?: Snippet;
	/** Enables contained scrolling. */
	scrollable?: boolean;
	/** Spacing between children. */
	gap?: Space;
	/** Region inset. */
	padding?: Space;
}

/** Props for the page footer region. */
export interface FooterProps extends HTMLAttributes<HTMLElement> {
	/** Region content. */
	children?: Snippet;
	/** Keeps the footer positioned while scrolling. */
	sticky?: boolean;
	/** Region inset. */
	padding?: Space;
	/** Enables collapsible content. */
	expandable?: boolean;
	/** Controlled expanded state. */
	open?: boolean;
}
