<script lang="ts">
	import { getContext } from 'svelte';
	import type { TabListProps } from '$lib/types/navigation.js';
	import { TABS_CONTEXT_KEY, type TabsContext } from './context.js';

	let {
		label,
		children,
		fullWidth = false,
		asNav = false,
		class: className = '',
		...restProps
	}: TabListProps = $props();

	const tabsCtx = getContext<TabsContext | undefined>(TABS_CONTEXT_KEY);
	let listElement = $state<HTMLElement | null>(null);

	function handleKeydown(event: KeyboardEvent) {
		if (!tabsCtx || !listElement) return;

		const tabs = Array.from(
			listElement.querySelectorAll<HTMLElement>(
				'[role="tab"]:not([disabled]), a.tab:not(.disabled)'
			)
		);
		if (tabs.length === 0) return;

		const orientation = tabsCtx.getOrientation();
		const currentIndex = tabs.findIndex((t) => t === document.activeElement);

		let targetIndex = -1;

		if (orientation === 'horizontal') {
			if (event.key === 'ArrowRight') {
				targetIndex = currentIndex >= 0 ? (currentIndex + 1) % tabs.length : 0;
			} else if (event.key === 'ArrowLeft') {
				targetIndex =
					currentIndex >= 0 ? (currentIndex - 1 + tabs.length) % tabs.length : tabs.length - 1;
			}
		} else {
			if (event.key === 'ArrowDown') {
				targetIndex = currentIndex >= 0 ? (currentIndex + 1) % tabs.length : 0;
			} else if (event.key === 'ArrowUp') {
				targetIndex =
					currentIndex >= 0 ? (currentIndex - 1 + tabs.length) % tabs.length : tabs.length - 1;
			}
		}

		if (event.key === 'Home') {
			targetIndex = 0;
		} else if (event.key === 'End') {
			targetIndex = tabs.length - 1;
		}

		if (targetIndex >= 0) {
			event.preventDefault();
			const targetTab = tabs[targetIndex];
			targetTab.focus();
			if (tabsCtx.getActivation() === 'automatic') {
				const tabValue = targetTab.dataset.value;
				if (tabValue) {
					tabsCtx.selectTab(tabValue);
					if (targetTab instanceof HTMLAnchorElement) {
						targetTab.click();
					}
				}
			}
		}
	}
</script>

{#if asNav}
	<nav
		bind:this={listElement}
		aria-label={label}
		class="tablist {tabsCtx?.getOrientation() ?? 'horizontal'} {className}"
		class:full-width={fullWidth}
		onkeydown={handleKeydown}
		{...restProps}
	>
		{@render children?.()}
	</nav>
{:else}
	<div
		bind:this={listElement}
		role="tablist"
		aria-label={label}
		aria-orientation={tabsCtx?.getOrientation() ?? 'horizontal'}
		class="tablist {tabsCtx?.getOrientation() ?? 'horizontal'} {className}"
		class:full-width={fullWidth}
		onkeydown={handleKeydown}
		tabindex="-1"
		{...restProps}
	>
		{@render children?.()}
	</div>
{/if}

<style>
	.tablist {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xxs);
		padding: var(--space-xxs);
		background-color: var(--bg-secondary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-xs);
		box-sizing: border-box;
		overflow-x: auto;
		max-width: 100%;
	}

	.tablist.horizontal {
		grid-column: 1;
		grid-row: 1;
		flex-direction: row;
	}

	.tablist.vertical {
		grid-column: 1;
		grid-row: 1;
		flex-direction: column;
		align-items: stretch;
	}

	.tablist.full-width {
		display: flex;
		width: 100%;
	}

	.tablist.full-width > :global(.tab) {
		flex: 1 1 0%;
	}

	.tablist::-webkit-scrollbar {
		display: none;
	}

	.tablist {
		scrollbar-width: none;
	}
</style>
