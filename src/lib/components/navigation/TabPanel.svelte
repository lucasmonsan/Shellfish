<script lang="ts">
	import { getContext } from 'svelte';
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
	let baseId = $derived(tabsCtx?.getBaseId() ?? 'tabs');
</script>

{#if keepMounted}
	<div
		role="tabpanel"
		id="{baseId}-panel-{value}"
		aria-labelledby="{baseId}-tab-{value}"
		tabindex="0"
		hidden={!isActive}
		class="tabpanel {className}"
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
		class="tabpanel {className}"
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

	.tabpanel:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
		border-radius: var(--radius-xs);
	}
</style>
