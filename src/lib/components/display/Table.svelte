<script lang="ts">
	import type { TableProps } from '$lib/types/display.js';

	let {
		children,
		fullWidth = true,
		striped = false,
		dense = false,
		hoverable = true,
		caption,
		class: className = '',
		...restProps
	}: TableProps = $props();
</script>

<div class="table-container {className}">
	<table
		class="table"
		class:full-width={fullWidth}
		class:striped
		class:dense
		class:hoverable
		{...restProps}
	>
		{#if caption}
			<caption class="table-caption">{caption}</caption>
		{/if}
		{@render children?.()}
	</table>
</div>

<style>
	.table-container {
		width: 100%;
		overflow-x: auto;
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-xs);
		background-color: var(--bg-surface);
		box-sizing: border-box;
	}

	.table {
		width: auto;
		border-collapse: collapse;
		text-align: left;
		font-size: var(--text-sm);
		color: var(--text-primary);
		line-height: var(--leading-normal);
	}

	.table.full-width {
		width: 100%;
	}

	.table-caption {
		caption-side: bottom;
		padding: var(--space-xs) var(--space-sm);
		font-size: var(--text-xs);
		font-family: var(--font-mono);
		color: var(--text-secondary);
		text-align: left;
	}

	/* Linhas com zebra striping */
	:global(.table.striped tbody tr:nth-child(even)) {
		background-color: var(--bg-secondary);
	}

	/* Efeito Hover nas linhas */
	:global(.table.hoverable tbody tr:hover) {
		background-color: var(--bg-hover);
	}

	/* Espaçamento compacto (dense) */
	:global(.table.dense th),
	:global(.table.dense td) {
		padding: var(--space-xxs) var(--space-xs);
		font-size: var(--text-xs);
	}
</style>
