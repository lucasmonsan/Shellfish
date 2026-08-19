<script lang="ts">
	import type { TabsProps } from '$lib/types/index.js';

	let {
		items = [],
		value = $bindable(),
		size = 'md',
		fullWidth = false,
		children,
		onchange,
		class: className,
		...restProps
	}: TabsProps = $props();

	function selectTab(id: string) {
		value = id;
		onchange?.(id);
	}

	function handleKeydown(e: KeyboardEvent, currentIndex: number) {
		if (!items.length) return;

		let nextIndex: number;
		if (e.key === 'ArrowRight') {
			nextIndex = (currentIndex + 1) % items.length;
		} else if (e.key === 'ArrowLeft') {
			nextIndex = (currentIndex - 1 + items.length) % items.length;
		} else if (e.key === 'Home') {
			nextIndex = 0;
		} else if (e.key === 'End') {
			nextIndex = items.length - 1;
		} else {
			return;
		}

		e.preventDefault();
		const nextTab = items[nextIndex];
		if (nextTab && !nextTab.disabled) {
			selectTab(nextTab.id);
		}
	}
</script>

<nav role="tablist" data-size={size} data-full-width={fullWidth} class={className} {...restProps}>
	{#if items.length > 0}
		{#each items as item, index (item.id)}
			{@const isSelected = value === item.id}
			<button
				type="button"
				role="tab"
				aria-selected={isSelected}
				tabindex={isSelected ? 0 : -1}
				disabled={item.disabled}
				data-selected={isSelected}
				data-size={size}
				onclick={() => selectTab(item.id)}
				onkeydown={(e) => handleKeydown(e, index)}
			>
				{item.label}
			</button>
		{/each}
	{:else}
		{@render children?.()}
	{/if}
</nav>

<style>
	nav {
		display: inline-flex;
		align-items: center;
		padding: var(--space-xs);
		gap: var(--space-xs);
		background-color: var(--bg-secondary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		box-sizing: border-box;
	}

	nav[data-full-width='true'] {
		display: flex;
		width: 100%;
	}

	nav[data-full-width='true'] button {
		flex: 1;
	}

	button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-family: inherit;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.02em;
		cursor: pointer;
		border: var(--border-width) solid transparent;
		border-radius: var(--radius-sm);
		background-color: transparent;
		color: var(--text-secondary);
		transition:
			background-color 0.12s ease,
			color 0.12s ease,
			box-shadow 0.12s ease,
			border-color 0.12s ease,
			transform 0.12s ease;
	}

	/* Tamanhos */
	button[data-size='sm'] {
		height: 28px;
		padding-inline: var(--space-sm);
		font-size: var(--text-xs);
	}

	button[data-size='md'] {
		height: 32px;
		padding-inline: var(--space-md);
		font-size: var(--text-sm);
	}

	button[data-size='lg'] {
		height: 40px;
		padding-inline: var(--space-lg);
		font-size: var(--text-base);
	}

	button:hover:not(:disabled):not([data-selected='true']) {
		color: var(--text-primary);
		background-color: var(--bg-primary);
	}

	/* Aba Ativa */
	button[data-selected='true'] {
		background-color: var(--bg-primary);
		color: var(--text-primary);
		border-color: var(--border-color);
		box-shadow: var(--shadow);
		transform: translate(-1px, -1px);
	}

	button:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	@media (prefers-reduced-motion: reduce) {
		button {
			transition: none;
		}
	}
</style>
