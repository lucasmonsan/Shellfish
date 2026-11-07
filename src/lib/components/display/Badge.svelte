<script lang="ts">
	import type { BadgeProps } from '$lib/types/display.js';

	let {
		children,
		label,
		variant = 'secondary',
		size = 'md',
		square = false,
		class: className = '',
		...restProps
	}: BadgeProps = $props();

	let resolvedVariant = $derived(variant === 'error' ? 'danger' : variant);
</script>

<span class="{resolvedVariant} {size} {className}" class:square {...restProps}>
	{#if children}
		{@render children()}
	{:else if label}
		{label}
	{/if}
</span>

<style>
	span {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		flex-shrink: 0;
		white-space: nowrap;
		font-family: var(--font-sans);
		font-weight: 700;
		line-height: var(--leading-none);
		border-radius: var(--radius-xs);
		border: var(--border-width) solid var(--border-color);
	}

	span :global(svg) {
		flex-shrink: 0;
	}

	.sm {
		font-size: var(--text-xxs);
		padding: var(--space-xxs) var(--space-xs);
		gap: var(--space-xxs);
	}

	.md {
		font-size: var(--text-xs);
		padding: var(--space-xs) var(--space-sm);
		gap: var(--space-xs);
	}

	.square {
		aspect-ratio: 1 / 1;
		padding: var(--space-xs);
	}

	.sm.square {
		padding: var(--space-xxs);
	}

	.md.square {
		padding: var(--space-xs);
	}

	.primary {
		background-color: var(--color-primary);
		color: var(--color-primary-contrast);
	}

	.secondary {
		background-color: var(--bg-secondary);
		color: var(--text-primary);
	}

	.outline {
		background-color: transparent;
		color: var(--color-outline);
		border-color: var(--color-outline);
	}

	.ghost {
		background-color: transparent;
		color: var(--text-secondary);
		border-color: transparent;
	}

	.danger {
		background-color: var(--color-danger);
		color: var(--color-on-solid);
	}

	.warning {
		background-color: var(--color-warning);
		color: var(--color-warning-contrast);
	}

	.success {
		background-color: var(--color-success);
		color: var(--color-on-solid);
	}
</style>
