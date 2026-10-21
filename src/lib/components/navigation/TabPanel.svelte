<script lang="ts">
	import { getContext } from 'svelte';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import type { TabPanelProps } from '$lib/types/navigation.js';
	import { TABS_CONTEXT_KEY, type TabsContext } from './context.js';

	let {
		value,
		children,
		keepMounted = false,
		class: className = '',
		...restProps
	}: TabPanelProps = $props();

	const tabsCtx = getContext<TabsContext | undefined>(TABS_CONTEXT_KEY);
	let isActive = $derived(tabsCtx?.getValue() === value);
	let orientation = $derived(tabsCtx?.getOrientation() ?? 'horizontal');
	let baseId = $derived(tabsCtx?.getBaseId() ?? 'tabs');

	function panelIn(node: Element) {
		void node;
		if (
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		) {
			return { duration: 0 };
		}
		return {
			duration: 180,
			easing: cubicOut,
			css: (t: number) => `
				opacity: ${t};
				transform: translateY(${(1 - t) * 6}px);
			`
		};
	}

	function panelOut(node: Element) {
		void node;
		if (
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		) {
			return { duration: 0 };
		}
		return {
			duration: 120,
			easing: cubicIn,
			css: (t: number) => `
				opacity: ${t};
				transform: translateY(${(1 - t) * -4}px);
			`
		};
	}
</script>

{#if keepMounted}
	<div
		role="tabpanel"
		id="{baseId}-panel-{value}"
		aria-labelledby="{baseId}-tab-{value}"
		tabindex="0"
		hidden={!isActive}
		class="tabpanel {orientation} keep-mounted {className}"
		class:is-active={isActive}
		{...restProps}
	>
		{@render children?.()}
	</div>
{:else if isActive}
	<div
		role="tabpanel"
		id="{baseId}-panel-{value}"
		aria-labelledby="{baseId}-tab-{value}"
		tabindex="0"
		class="tabpanel {orientation} {className}"
		class:is-active={isActive}
		in:panelIn
		out:panelOut
		{...restProps}
	>
		{@render children?.()}
	</div>
{/if}

<style>
	.tabpanel {
		width: 100%;
		box-sizing: border-box;
		outline: none;
	}

	.tabpanel.horizontal {
		grid-column: 1;
		grid-row: 2;
		align-self: start;
	}

	.tabpanel.vertical {
		grid-column: 2;
		grid-row: 1;
		align-self: start;
	}

	.tabpanel.is-active {
		z-index: 1;
	}

	.tabpanel:not(.is-active) {
		z-index: 0;
		pointer-events: none;
	}

	.tabpanel[hidden] {
		display: none;
	}

	.tabpanel.keep-mounted.is-active {
		animation: tabpanel-in var(--duration-fast) var(--ease-decelerate);
	}

	.tabpanel:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
		border-radius: var(--radius-xs);
	}

	@keyframes tabpanel-in {
		from {
			opacity: 0;
			transform: translateY(4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.tabpanel.keep-mounted.is-active {
			animation: none;
		}
	}
</style>
