<script lang="ts">
	import type { GridProps } from '$lib/types/layout.js';

	let {
		children,
		gap = 'sm',
		padding = 'none',
		columns,
		minItemWidth = 128,
		class: className = '',
		style = '',
		...restProps
	}: GridProps = $props();

	let resolvedTemplate = $derived.by(() => {
		if (typeof columns === 'number' && columns > 0) {
			return `repeat(${columns}, minmax(0, 1fr))`;
		}
		const minWidth = typeof minItemWidth === 'number' ? `${minItemWidth}px` : minItemWidth;
		return `repeat(auto-fill, minmax(${minWidth}, 1fr))`;
	});
</script>

<div
	class="grid {className}"
	style="--grid-cols: {resolvedTemplate}; --grid-gap: var(--space-{gap}); --grid-pad: var(--space-{padding}); {style}"
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
</style>
