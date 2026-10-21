<script lang="ts">
	import type { TableBodyProps } from '$lib/types/display.js';

	let { children, class: className = '', ...restProps }: TableBodyProps = $props();
</script>

<tbody class="table-body {className}" {...restProps}>
	{@render children?.()}
</tbody>

<style>
	.table-body {
		background-color: var(--bg-surface);
	}
</style>
