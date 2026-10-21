<script lang="ts">
	import type { TableFooterProps } from '$lib/types/display.js';

	let { children, class: className = '', ...restProps }: TableFooterProps = $props();
</script>

<tfoot class="table-footer {className}" {...restProps}>
	{@render children?.()}
</tfoot>

<style>
	.table-footer {
		background-color: var(--bg-secondary);
		border-top: calc(var(--border-width) * 2) solid var(--border-color);
		font-weight: 600;
	}
</style>
