import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { Space } from './tokens.js';

export type Align = 'start' | 'center' | 'end' | 'baseline' | 'stretch';
export type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

export interface RowProps extends HTMLAttributes<HTMLDivElement> {
	children?: Snippet;
	gap?: Space;
	align?: Align;
	justify?: Justify;
	wrap?: boolean;
	fullWidth?: boolean;
}

export interface ColumnProps extends HTMLAttributes<HTMLDivElement> {
	children?: Snippet;
	gap?: Space;
	align?: Align;
	justify?: Justify;
	fullWidth?: boolean;
}

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
	children?: Snippet;
	columns?: number | 'auto-fit' | 'auto-fill';
	minColumnWidth?: string;
	gap?: Space;
	fullWidth?: boolean;
}
