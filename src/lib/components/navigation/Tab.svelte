<script lang="ts">
	import { getContext } from 'svelte';
	import type { TabProps } from '$lib/types/navigation.js';
	import { TABS_CONTEXT_KEY, type TabsContext } from './context.js';

	let {
		value,
		href,
		target,
		rel,
		type = 'button',
		disabled = false,
		children,
		label,
		class: className = '',
		...restProps
	}: TabProps = $props();

	const tabsCtx = getContext<TabsContext | undefined>(TABS_CONTEXT_KEY);

	let isSelected = $derived(tabsCtx?.getValue() === value);
	let size = $derived(tabsCtx?.getSize() ?? 'md');
	let baseId = $derived(tabsCtx?.getBaseId() ?? 'tabs');

	function handleClick(event: MouseEvent) {
		if (disabled) {
			event.preventDefault();
			return;
		}
		if (tabsCtx) {
			tabsCtx.selectTab(value);
		}
	}
</script>

{#if href}
	<a
		{href}
		{target}
		{rel}
		data-value={value}
		id="{baseId}-tab-{value}"
		aria-current={isSelected ? 'page' : undefined}
		aria-disabled={disabled ? 'true' : undefined}
		tabindex={disabled ? -1 : undefined}
		class="tab {size} {className}"
		class:selected={isSelected}
		class:disabled
		onclick={handleClick}
		{...restProps}
	>
		{#if children}
			{@render children()}
		{:else if label}
			{label}
		{:else}
			{value}
		{/if}
	</a>
{:else}
	<button
		{type}
		role="tab"
		data-value={value}
		id="{baseId}-tab-{value}"
		aria-controls="{baseId}-panel-{value}"
		aria-selected={isSelected}
		tabindex={isSelected ? 0 : -1}
		{disabled}
		class="tab {size} {className}"
		class:selected={isSelected}
		onclick={handleClick}
		{...restProps}
	>
		{#if children}
			{@render children()}
		{:else if label}
			{label}
		{:else}
			{value}
		{/if}
	</button>
{/if}

<style>
	.tab {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-xs);
		background-color: transparent;
		color: var(--text-secondary);
		border: var(--border-width) solid transparent;
		border-radius: var(--radius-xs);
		font-family: inherit;
		font-weight: 500;
		cursor: pointer;
		white-space: nowrap;
		flex-shrink: 0;
		text-decoration: none;
		transition:
			background-color var(--duration-fast) var(--ease-standard),
			color var(--duration-fast) var(--ease-standard),
			border-color var(--duration-fast) var(--ease-standard),
			box-shadow var(--duration-fast) var(--ease-standard),
			transform var(--duration-fast) var(--ease-standard);
		box-sizing: border-box;
	}

	.tab.sm {
		height: var(--control-height-sm);
		padding: 0 var(--space-xs);
		font-size: var(--text-xs);
	}

	.tab.md {
		height: var(--control-height);
		padding: 0 var(--space-sm);
		font-size: var(--text-sm);
	}

	.tab.lg {
		height: var(--control-height-lg);
		padding: 0 var(--space-md);
		font-size: var(--text-md);
	}

	.tab:hover:not(:disabled):not(.disabled):not(.selected) {
		color: var(--text-primary);
		background-color: var(--bg-hover);
		text-decoration: none;
	}

	.tab.selected {
		background-color: var(--color-primary);
		color: var(--color-primary-contrast);
		border-color: var(--color-primary);
		font-weight: 600;
		box-shadow: var(--shadow-sm);
		text-decoration: none;
	}

	.tab:active:not(:disabled):not(.disabled) {
		transform: scale(0.98);
	}

	.tab:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 1px;
	}

	.tab:disabled,
	.tab.disabled {
		opacity: 0.5;
		cursor: not-allowed;
		pointer-events: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.tab {
			transition: none;
			transform: none;
		}
	}
</style>
