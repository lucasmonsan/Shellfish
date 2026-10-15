import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

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
