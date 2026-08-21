<script lang="ts">
	import type { DropdownProps, DropdownItem } from '$lib/types/index.js';

	let {
		label = 'Options',
		trigger,
		items = [],
		children,
		open = $bindable(false),
		variant = 'secondary',
		size = 'md',
		placement = 'bottom-start',
		class: className,
		...restProps
	}: DropdownProps = $props();

	let containerEl = $state<HTMLDivElement>();

	function toggle() {
		open = !open;
	}

	function handleItemClick(item: DropdownItem) {
		item.onclick?.();
		open = false;
	}

	function handleWindowClick(e: MouseEvent) {
		if (open && containerEl && !containerEl.contains(e.target as Node)) {
			open = false;
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && open) {
			open = false;
		}
	}
</script>

<svelte:window onclick={handleWindowClick} onkeydown={handleKeydown} />

<div
	bind:this={containerEl}
	class={`shellfish-dropdown ${className ?? ''}`}
	data-open={open}
	data-placement={placement}
	{...restProps}
>
	<button
		type="button"
		class="dropdown-trigger-btn"
		data-variant={variant}
		data-size={size}
		aria-haspopup="true"
		aria-expanded={open}
		onclick={toggle}
	>
		{#if trigger}
			{@render trigger()}
		{:else}
			<span class="dropdown-trigger-inner">
				{label}
				<svg
					viewBox="0 0 16 16"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="dropdown-chevron"
					class:rotated={open}
				>
					<polyline points="4 6 8 10 12 6" />
				</svg>
			</span>
		{/if}
	</button>

	{#if open}
		<div class="dropdown-menu" role="menu">
			{#if items.length > 0}
				{#each items as item (item.id)}
					<button
						type="button"
						role="menuitem"
						class="dropdown-item"
						class:danger={item.danger}
						disabled={item.disabled}
						onclick={() => handleItemClick(item)}
					>
						{#if item.icon}
							{@render item.icon()}
						{/if}
						<span>{item.label}</span>
					</button>
				{/each}
			{:else if children}
				{@render children()}
			{/if}
		</div>
	{/if}
</div>

<style>
	.shellfish-dropdown {
		position: relative;
		display: inline-block;
		box-sizing: border-box;
	}

	.dropdown-trigger-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		background-color: var(--bg-primary);
		color: var(--text-primary);
		box-shadow: var(--shadow);
		font-family: inherit;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.02em;
		padding: 0 var(--space-md);
		height: var(--control-height-md);
		cursor: pointer;
		user-select: none;
		transition:
			transform 0.12s cubic-bezier(0.4, 0, 0.2, 1),
			box-shadow 0.12s cubic-bezier(0.4, 0, 0.2, 1),
			border-color 0.15s ease;
	}

	/* Variantes */
	.dropdown-trigger-btn[data-variant='primary'] {
		background-color: var(--color-primary);
		color: var(--color-primary-contrast);
	}

	.dropdown-trigger-btn[data-variant='secondary'] {
		background-color: var(--bg-secondary);
		color: var(--text-primary);
	}

	.dropdown-trigger-btn[data-variant='outline'] {
		background-color: transparent;
		color: var(--text-primary);
	}

	.dropdown-trigger-btn[data-variant='ghost'] {
		background-color: transparent;
		border-color: transparent;
		box-shadow: none;
		color: var(--text-secondary);
	}

	.dropdown-trigger-btn[data-variant='danger'] {
		background-color: var(--color-danger);
		color: var(--color-primary-contrast);
	}

	/* Tamanhos */
	.dropdown-trigger-btn[data-size='sm'] {
		height: var(--control-height-sm);
		padding: 0 var(--space-sm);
		font-size: var(--text-xs);
	}

	.dropdown-trigger-btn[data-size='md'] {
		height: var(--control-height-md);
		padding: 0 var(--space-md);
		font-size: var(--text-sm);
	}

	.dropdown-trigger-btn[data-size='lg'] {
		height: var(--control-height-lg);
		padding: 0 var(--space-lg);
		font-size: var(--text-base);
	}

	.dropdown-trigger-btn:hover {
		border-color: var(--color-primary);
		transform: translate(-1px, -1px);
		box-shadow: 2px 2px 0px var(--border-color);
	}

	.dropdown-trigger-btn:active {
		transform: translate(1px, 1px);
		box-shadow: 0px 0px 0px var(--border-color);
	}

	.dropdown-trigger-btn:focus-visible {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 3px 3px 0px var(--color-primary);
		transform: translate(-1px, -1px);
	}

	.dropdown-trigger-inner {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
	}

	.dropdown-chevron {
		width: 12px;
		height: 12px;
		transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.dropdown-chevron.rotated {
		transform: rotate(180deg);
	}

	.dropdown-menu {
		position: absolute;
		top: calc(100% + var(--space-xs));
		left: 0;
		min-width: 180px;
		z-index: var(--z-popover);
		background-color: var(--bg-primary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		box-shadow: 4px 4px 0px var(--border-color);
		padding: var(--space-xs);
		display: flex;
		flex-direction: column;
		gap: 2px;
		animation: dropdownPop 0.15s cubic-bezier(0.34, 1.3, 0.64, 1);
	}

	.shellfish-dropdown[data-placement='bottom-end'] .dropdown-menu {
		left: auto;
		right: 0;
	}

	.shellfish-dropdown[data-placement='top-start'] .dropdown-menu {
		top: auto;
		bottom: calc(100% + var(--space-xs));
	}

	.shellfish-dropdown[data-placement='top-end'] .dropdown-menu {
		top: auto;
		bottom: calc(100% + var(--space-xs));
		left: auto;
		right: 0;
	}

	@keyframes dropdownPop {
		from {
			opacity: 0;
			transform: scale(0.95) translateY(-4px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	.dropdown-item {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		width: 100%;
		padding: var(--space-xs) var(--space-sm);
		box-sizing: border-box;
		background: transparent;
		border: none;
		border-radius: var(--radius-sm);
		font-family: inherit;
		font-size: var(--text-sm);
		font-weight: 700;
		color: var(--text-primary);
		text-align: left;
		cursor: pointer;
		user-select: none;
		transition:
			background-color 0.12s ease,
			color 0.12s ease;
	}

	.dropdown-item:hover:not(:disabled) {
		background-color: var(--bg-secondary);
		color: var(--color-primary);
	}

	.dropdown-item.danger:hover:not(:disabled) {
		background-color: var(--bg-secondary);
		color: var(--color-danger);
	}

	.dropdown-item:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	@media (prefers-reduced-motion: reduce) {
		.dropdown-menu,
		.dropdown-chevron,
		.dropdown-trigger-btn {
			transition: none;
			animation: none;
		}
	}
</style>
