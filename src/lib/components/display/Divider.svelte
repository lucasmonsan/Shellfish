<script lang="ts">
	import type { DividerProps } from '$lib/types/display.js';

	let {
		vertical = false,
		spacing = 'none',
		class: className = '',
		style = '',
		...restProps
	}: DividerProps = $props();
</script>

{#if vertical}
	<div
		role="separator"
		aria-orientation="vertical"
		class="vertical {className}"
		style="--div-space: var(--space-{spacing}); {style}"
		{...restProps}
	></div>
{:else}
	<hr class={className} style="--div-space: var(--space-{spacing}); {style}" {...restProps} />
{/if}

<style>
	hr {
		width: 100%;
		border: 0;
		border-top: var(--border-width) solid var(--border-color);
		margin: var(--div-space, var(--space-none)) 0;
		box-sizing: border-box;
		flex-shrink: 0;
	}

	.vertical {
		display: inline-block;
		align-self: stretch;
		width: 0;
		min-height: var(--base);
		border-left: var(--border-width) solid var(--border-color);
		margin: 0 var(--div-space, var(--space-none));
		box-sizing: border-box;
		flex-shrink: 0;
	}
</style>
