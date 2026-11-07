<script lang="ts">
	import type { GridProps } from '$lib/types/layout.js';

	let {
		children,
		gap = 'sm',
		padding = 'none',
		columns,
		columnsMd,
		fillLastItem = false,
		minItemWidth,
		class: className = '',
		style = '',
		...restProps
	}: GridProps = $props();

	let colsStyle = $derived.by(() => {
		const parts: string[] = [];
		if (typeof columns === 'number' && columns > 0) {
			parts.push(`--grid-cols: repeat(${columns}, minmax(0, 1fr));`);
		} else if (minItemWidth !== undefined) {
			const minWidth = typeof minItemWidth === 'number' ? `${minItemWidth}px` : minItemWidth;
			parts.push(`--grid-cols: repeat(auto-fill, minmax(${minWidth}, 1fr));`);
		}
		if (typeof columnsMd === 'number' && columnsMd > 0) {
			parts.push(`--grid-cols-md: repeat(${columnsMd}, minmax(0, 1fr));`);
		}
		return parts.join(' ');
	});
</script>

<div
	class="grid {columns ? `cols-${columns}` : ''} {columnsMd
		? `cols-md-${columnsMd}`
		: ''} {className}"
	class:has-cols-md={typeof columnsMd === 'number' && columnsMd > 0}
	class:fill-last={fillLastItem}
	style="{colsStyle} --grid-gap: var(--space-{gap}); --grid-pad: var(--space-{padding}); {style}"
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: var(--grid-cols, repeat(auto-fill, minmax(calc(var(--base) * 8), 1fr)));
		gap: var(--grid-gap, var(--space-sm));
		padding: var(--grid-pad, var(--space-none));
		width: 100%;
		box-sizing: border-box;
	}

	.grid.fill-last.cols-2 :global(> :last-child:nth-child(2n + 1)) {
		grid-column: 1 / -1;
	}

	.grid.fill-last.cols-2 :global(> :last-child:nth-child(2n)) {
		grid-column: span 1;
	}

	@media (min-width: 768px) {
		.grid.has-cols-md {
			grid-template-columns: var(--grid-cols-md);
		}

		.grid.fill-last.cols-md-4 :global(> :last-child:nth-child(4n + 1)) {
			grid-column: 1 / -1;
		}

		.grid.fill-last.cols-md-4 :global(> :last-child:nth-child(4n + 2)) {
			grid-column: span 3;
		}

		.grid.fill-last.cols-md-4 :global(> :last-child:nth-child(4n + 3)) {
			grid-column: span 2;
		}

		.grid.fill-last.cols-md-4 :global(> :last-child:nth-child(4n)) {
			grid-column: span 1;
		}

		.grid.fill-last.cols-md-3 :global(> :last-child:nth-child(3n + 1)) {
			grid-column: 1 / -1;
		}

		.grid.fill-last.cols-md-3 :global(> :last-child:nth-child(3n + 2)) {
			grid-column: span 2;
		}

		.grid.fill-last.cols-md-3 :global(> :last-child:nth-child(3n)) {
			grid-column: span 1;
		}
	}
</style>
