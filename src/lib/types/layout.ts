import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { Space } from './tokens.js';

/** Flex alignment options. */
export type FlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

/** Flex justification options. */
export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

/** Contained max-width presets derived from fluid --base. */
export type ContainerMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/** Props for the canonical AppShell layout container. */
export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
	/** Top region snippet (e.g. Navigation, Header, Toolbar). */
	top?: Snippet;
	/** Main content snippet (rendered in scrollable central viewport). */
	children: Snippet;
	/** Optional non-blocking floating banner/panel anchored at the bottom of the content viewport above the footer. */
	floatingBottom?: Snippet;
	/** Bottom region snippet (e.g. Footer, Action Bar, Status). */
	bottom?: Snippet;
	/** Whether to display subtle fade gradients when content overflows above/below. Default: true. */
	scrollFades?: boolean;
	/** Controla individualmente o fade superior. Se omitido, herda o valor de scrollFades. */
	scrollFadeTop?: boolean;
	/** Controla individualmente o fade inferior. Se omitido, herda o valor de scrollFades. */
	scrollFadeBottom?: boolean;
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
	/** Contained width preset ('sm' | 'md' | 'lg' | 'xl' | 'full'). Centers with margin-inline: auto. */
	maxWidth?: ContainerMaxWidth;
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
	/** Contained width preset ('sm' | 'md' | 'lg' | 'xl' | 'full'). Centers with margin-inline: auto. */
	maxWidth?: ContainerMaxWidth;
	/** Anchors the column to the top of the scroll container as a sticky bar. Default: false. */
	sticky?: boolean;
	/** Permite que a coluna expanda para ocupar todo o espaço vertical disponível no container pai (flex: 1; height: 100%). Default: false. */
	fill?: boolean;
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
	/** Responsive column count applied at >= 768px (md breakpoint). */
	columnsMd?: number;
	/** Stretches the last grid item across remaining columns when row is incomplete. Default: false. */
	fillLastItem?: boolean;
	/** Minimum item width for auto-fill grid (number in px or CSS string). Default: calc(var(--base) * 8). */
	minItemWidth?: number | string;
	/** Additional CSS classes. */
	class?: string;
}
