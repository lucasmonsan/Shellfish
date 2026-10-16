import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { Space } from './tokens.js';

/** Flex alignment options. */
export type FlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

/** Flex justification options. */
export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

/** Props for the canonical AppShell layout container. */
export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
	/** Top region snippet (e.g. Navigation, Header, Toolbar). */
	top?: Snippet;
	/** Main content snippet (rendered in scrollable central viewport). */
	children: Snippet;
	/** Bottom region snippet (e.g. Footer, Action Bar, Status). */
	bottom?: Snippet;
	/** Whether to display subtle fade gradients when content overflows above/below. Default: true. */
	scrollFades?: boolean;
	/** Additional CSS classes. */
	class?: string;
}

/** Props for the semantic Section container. */
export interface SectionProps extends HTMLAttributes<HTMLElement> {
	/** Section content. */
	children?: Snippet;
	/** Vertical spacing between children. Default: 'md'. */
	gap?: Space;
	/** Inner padding token. Default: 'none'. */
	padding?: Space;
	/** Centers the section with --container-max-width. Default: false. */
	contained?: boolean;
	/** Additional CSS classes. */
	class?: string;
}

/** Props for the horizontal Row flex primitive. */
export interface RowProps extends HTMLAttributes<HTMLDivElement> {
	/** Row content. */
	children?: Snippet;
	/** Spacing between items. Default: 'sm'. */
	gap?: Space;
	/** Inner padding token. Default: 'none'. */
	padding?: Space;
	/** Cross-axis alignment. Default: 'center'. */
	align?: FlexAlign;
	/** Main-axis justification. Default: 'start'. */
	justify?: FlexJustify;
	/** Allows items to wrap onto multiple lines. Default: true. */
	wrap?: boolean;
	/** Expands to 100% width. Default: false. */
	fullWidth?: boolean;
	/** Additional CSS classes. */
	class?: string;
}

/** Props for the vertical Column flex primitive. */
export interface ColumnProps extends HTMLAttributes<HTMLDivElement> {
	/** Column content. */
	children?: Snippet;
	/** Spacing between items. Default: 'sm'. */
	gap?: Space;
	/** Inner padding token. Default: 'none'. */
	padding?: Space;
	/** Cross-axis alignment. Default: 'stretch'. */
	align?: FlexAlign;
	/** Main-axis justification. Default: 'start'. */
	justify?: FlexJustify;
	/** Expands to 100% width. Default: false. */
	fullWidth?: boolean;
	/** Additional CSS classes. */
	class?: string;
}

/** Props for the responsive CSS Grid primitive. */
export interface GridProps extends HTMLAttributes<HTMLDivElement> {
	/** Grid items. */
	children?: Snippet;
	/** Spacing between grid cells. Default: 'sm'. */
	gap?: Space;
	/** Inner padding token. Default: 'none'. */
	padding?: Space;
	/** Fixed column count. If omitted, uses auto-fill with minItemWidth. */
	columns?: number;
	/** Minimum item width for auto-fill responsive grid (number in px or CSS string). Default: 128. */
	minItemWidth?: number | string;
	/** Additional CSS classes. */
	class?: string;
}
