<script lang="ts">
	import type { ColumnProps } from '$lib/types/layout.js';

	let {
		children,
		gap = 'sm',
		padding = 'none',
		align = 'stretch',
		justify = 'start',
		fullWidth = false,
		maxWidth,
		class: className = '',
		style = '',
		...restProps
	}: ColumnProps = $props();
</script>

<div
	class="column align-{align} justify-{justify} {maxWidth ? `max-w-${maxWidth}` : ''} {className}"
	class:full-width={fullWidth}
	style="--col-gap: var(--space-{gap}); --col-pad: var(--space-{padding}); {style}"
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
</div>

<style>
	.column {
		display: flex;
		flex-direction: column;
		gap: var(--col-gap, var(--space-sm));
		padding: var(--col-pad, var(--space-none));
		box-sizing: border-box;
	}

	.full-width {
		width: 100%;
	}

	.max-w-sm {
		max-width: var(--container-sm);
		margin-inline: auto;
		width: 100%;
	}

	.max-w-md {
		max-width: var(--container-md);
		margin-inline: auto;
		width: 100%;
	}

	.max-w-lg {
		max-width: var(--container-lg);
		margin-inline: auto;
		width: 100%;
	}

	.max-w-xl {
		max-width: var(--container-xl);
		margin-inline: auto;
		width: 100%;
	}

	.max-w-full {
		max-width: 100%;
		margin-inline: auto;
		width: 100%;
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
	.align-baseline {
		align-items: baseline;
	}

	.justify-start {
		justify-content: flex-start;
	}
	.justify-center {
		justify-content: center;
	}
	.justify-end {
		justify-content: flex-end;
	}
	.justify-between {
		justify-content: space-between;
	}
	.justify-around {
		justify-content: space-around;
	}
	.justify-evenly {
		justify-content: space-evenly;
	}
</style>
