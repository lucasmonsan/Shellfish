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
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow);
		overflow: hidden;
		background-color: var(--bg-secondary);
	}

	div[role='group'][data-full-width='true'] {
		display: flex;
		width: 100%;
	}

	div[role='group'][data-full-width='true'] > :global(button) {
		flex: 1;
	}

	/* Reset dos botões internos para se comportarem como segmentos do chassi */
	div[role='group'] > :global(button) {
		border: none;
		border-radius: 0;
		box-shadow: none;
		transform: none;
		background-color: transparent;
		color: var(--text-primary);
		transition:
			background-color 0.12s ease,
			color 0.12s ease;
	}

	/* Divisória interna entre os segmentos */
	div[role='group'] > :global(button:not(:last-child)) {
		border-right: var(--border-width) solid var(--border-color);
	}

	/* Hover no segmento interno */
	div[role='group'] > :global(button:hover:not(:disabled)) {
		transform: none;
		box-shadow: none;
		background-color: var(--bg-primary);
	}

	/* Clique no segmento interno */
	div[role='group'] > :global(button:active:not(:disabled)) {
		transform: none;
		box-shadow: none;
		background-color: var(--color-primary);
		color: var(--color-primary-contrast);
	}

	/* Foco acessível no segmento */
	div[role='group'] > :global(button:focus-visible) {
		outline: none;
		box-shadow: inset 0 0 0 2px var(--color-primary);
		z-index: 1;
	}
</style>
