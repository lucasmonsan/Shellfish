<script lang="ts">
	import type { TableCellProps } from '$lib/types/display.js';

	let {
		children,
		asHead = false,
		align = 'left',
		colspan,
		rowspan,
		class: className = '',
		...restProps
	}: TableCellProps = $props();
</script>

{#if asHead}
	<th scope="col" {colspan} {rowspan} class="table-cell head {align} {className}" {...restProps}>
		{@render children?.()}
	</th>
{:else}
	<td {colspan} {rowspan} class="table-cell data {align} {className}" {...restProps}>
		{@render children?.()}
	</td>
{/if}

<style>
	.table-cell {
		padding: var(--space-xs) var(--space-sm);
		vertical-align: middle;
		box-sizing: border-box;
	}

	.table-cell.head {
		font-weight: 600;
		font-size: var(--text-xs);
		color: var(--text-secondary);
		letter-spacing: 0.02em;
	}

	.table-cell.data {
		color: var(--text-primary);
		font-size: var(--text-sm);
	}

	.table-cell.left {
		text-align: left;
	}

	.table-cell.center {
		text-align: center;
	}

	.table-cell.right {
		text-align: right;
	}

	.table-cell.numeric {
		text-align: right;
		font-family: var(--font-mono);
		font-variant-numeric: tabular-nums;
	}
</style>
