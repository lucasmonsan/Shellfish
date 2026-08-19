<script lang="ts">
	import type { GridProps } from '$lib/types/index.js';

	let {
		children,
		columns = 'auto-fit',
		minColumnWidth = '240px',
		gap = 'md',
		fullWidth = false,
		class: className,
		...restProps
	}: GridProps = $props();

	let gridStyle = $derived(
		typeof columns === 'number'
			? `grid-template-columns: repeat(${columns}, minmax(0, 1fr));`
			: `grid-template-columns: repeat(${columns}, minmax(min(100%, ${minColumnWidth}), 1fr));`
	);
</script>

<div class={className} data-gap={gap} data-full-width={fullWidth} style={gridStyle} {...restProps}>
	{@render children?.()}
</div>

<style>
	div {
		display: grid;
		box-sizing: border-box;
		width: 100%;
	}

	div[data-full-width='false'] {
		max-width: 100%;
	}

	/* Gaps */
	div[data-gap='none'] {
		gap: var(--space-none);
	}
	div[data-gap='xs'] {
		gap: var(--space-xs);
	}
	div[data-gap='sm'] {
		gap: var(--space-sm);
	}
	div[data-gap='md'] {
		gap: var(--space-md);
	}
	div[data-gap='lg'] {
		gap: var(--space-lg);
	}
	div[data-gap='xl'] {
		gap: var(--space-xl);
	}
	div[data-gap='2xl'] {
		gap: var(--space-2xl);
	}
</style>
