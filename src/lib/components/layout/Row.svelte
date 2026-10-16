<script lang="ts">
	import type { RowProps } from '$lib/types/layout.js';

	let {
		children,
		gap = 'sm',
		padding = 'none',
		align = 'center',
		justify = 'start',
		wrap = true,
		fullWidth = false,
		class: className = '',
		style = '',
		...restProps
	}: RowProps = $props();
</script>

<div
	class="row align-{align} justify-{justify} {className}"
	class:wrap
	class:full-width={fullWidth}
	style="--row-gap: var(--space-{gap}); --row-pad: var(--space-{padding}); {style}"
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
</div>

<style>
	.row {
		display: flex;
		flex-direction: row;
		gap: var(--row-gap, var(--space-sm));
		padding: var(--row-pad, var(--space-none));
		box-sizing: border-box;
	}

	.wrap {
		flex-wrap: wrap;
	}

	.full-width {
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
