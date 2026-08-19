import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { Space } from './tokens.js';

export interface MainProps extends HTMLAttributes<HTMLElement> {
	children?: Snippet;
	fullWidth?: boolean;
	fullHeight?: boolean;
	gap?: Space;
	padding?: Space;
}

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
	children?: Snippet;
	sticky?: boolean;
	padding?: Space;
}

export interface SectionProps extends HTMLAttributes<HTMLElement> {
	children?: Snippet;
	scrollable?: boolean;
	gap?: Space;
	padding?: Space;
}

export interface FooterProps extends HTMLAttributes<HTMLElement> {
	children?: Snippet;
	sticky?: boolean;
	padding?: Space;
}
