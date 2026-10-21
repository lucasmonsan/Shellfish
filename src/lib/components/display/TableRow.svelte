<script lang="ts">
	import type { TableRowProps } from '$lib/types/display.js';

	let { children, selected = false, class: className = '', ...restProps }: TableRowProps = $props();
</script>

<tr class="table-row {className}" class:selected {...restProps}>
	{@render children?.()}
</tr>

<style>
	.table-row {
		border-bottom: var(--border-width) solid var(--border-color);
		transition: background-color var(--transition-fast);
	}

	.table-row:last-child {
		border-bottom: none;
	}

	.table-row.selected {
		background-color: var(--palette-terracotta-subtle);
	}

	@media (prefers-reduced-motion: reduce) {
		.table-row {
			transition: none;
		}
	}
</style>
