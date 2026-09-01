import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { Space } from './tokens.js';

/** Cross-axis alignment for layout primitives. */
export type Align = 'start' | 'center' | 'end' | 'baseline' | 'stretch';
/** Main-axis distribution for layout primitives. */
export type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

/** Props for horizontal flex layout. */
export interface RowProps extends HTMLAttributes<HTMLDivElement> {
	/** Layout content. */
	children?: Snippet;
	/** Spacing between children. */
	gap?: Space;
	/** Cross-axis alignment. */
	align?: Align;
	/** Main-axis distribution. */
	justify?: Justify;
	/** Allows children to wrap. */
	wrap?: boolean;
	/** Uses the available inline space. */
	fullWidth?: boolean;
}

/** Props for vertical flex layout. */
export interface ColumnProps extends HTMLAttributes<HTMLDivElement> {
	/** Layout content. */
	children?: Snippet;
	/** Spacing between children. */
	gap?: Space;
	/** Cross-axis alignment. */
	align?: Align;
	/** Main-axis distribution. */
	justify?: Justify;
	/** Uses the available inline space. */
	fullWidth?: boolean;
}

/** Props for CSS Grid layout. */
export interface GridProps extends HTMLAttributes<HTMLDivElement> {
	/** Layout content. */
	children?: Snippet;
	/** Column count or automatic fitting strategy. */
	columns?: number | 'auto-fit' | 'auto-fill';
	/** Minimum width for automatic columns. */
	minColumnWidth?: string;
	/** Spacing between cells. */
	gap?: Space;
	/** Uses the available inline space. */
	fullWidth?: boolean;
}
