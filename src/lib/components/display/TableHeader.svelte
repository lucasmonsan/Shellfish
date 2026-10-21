<script lang="ts">
	import type { TableHeaderProps } from '$lib/types/display.js';

	let { children, class: className = '', ...restProps }: TableHeaderProps = $props();
</script>

<thead class="table-header {className}" {...restProps}>
	{@render children?.()}
</thead>

<style>
	.table-header {
		background-color: var(--bg-secondary);
		border-bottom: var(--border-width) solid var(--border-color);
	}
</style>
