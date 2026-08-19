<script lang="ts">
	import type { ButtonGroupProps } from '$lib/types/index.js';

	let { children, fullWidth = false, class: className, ...restProps }: ButtonGroupProps = $props();
</script>

<div role="group" data-full-width={fullWidth} class={className} {...restProps}>
	{@render children?.()}
</div>

<style>
	div[role='group'] {
		display: inline-flex;
		align-items: center;
		vertical-align: middle;
		box-sizing: border-box;
	}

	div[role='group'][data-full-width='true'] {
		display: flex;
		width: 100%;
	}

	div[role='group'][data-full-width='true'] > :global(button) {
		flex: 1;
	}

	div[role='group'] > :global(button:not(:first-child)) {
		margin-left: calc(var(--border-width) * -1);
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}

	div[role='group'] > :global(button:not(:last-child)) {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}

	div[role='group'] > :global(button:hover),
	div[role='group'] > :global(button:focus-visible) {
		z-index: 1;
	}
</style>
