<script lang="ts">
	import type { CardProps } from '$lib/types/display.js';

	let {
		children,
		variant = 'elevated',
		padding = 'lg',
		gap = 'sm',
		align = 'stretch',
		class: className = '',
		style = '',
		...restProps
	}: CardProps = $props();
</script>

<article
	class="{variant} align-{align} {className}"
	style="--card-pad: var(--space-{padding}); --card-gap: var(--space-{gap}); {style}"
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		gap: var(--card-gap, var(--space-sm));
		padding: var(--card-pad, var(--space-lg));
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-xs);
		box-sizing: border-box;
		color: var(--text-primary);
		transition:
			background-color var(--transition-fast),
			border-color var(--transition-fast);
	}

	.elevated {
		background-color: var(--bg-elevated);
	}

	.primary {
		background-color: var(--bg-primary);
	}

	.secondary {
		background-color: var(--bg-secondary);
	}

	.outlined {
		background-color: transparent;
	}

	.align-start {
		align-items: flex-start;
	}

	.align-center {
		align-items: center;
	}

	.align-end {
		align-items: flex-end;
	}

	.align-stretch {
		align-items: stretch;
	}

	@media (prefers-reduced-motion: reduce) {
		article {
			transition: none;
		}
	}
</style>
