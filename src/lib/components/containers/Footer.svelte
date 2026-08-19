<script lang="ts">
	import type { FooterProps } from '$lib/types/index.js';

	let {
		children,
		sticky = false,
		padding = 'sm',
		class: className,
		...restProps
	}: FooterProps = $props();
</script>

<footer data-sticky={sticky} data-padding={padding} class={className} {...restProps}>
	{@render children?.()}
</footer>

<style>
	footer {
		display: flex;
		align-items: center;
		width: 100%;
		box-sizing: border-box;
		background-color: var(--bg-primary);
		color: var(--text-primary);
		flex-shrink: 0;
	}

	footer[data-sticky='true'] {
		position: sticky;
		bottom: 0;
		z-index: var(--z-sticky);
		border-top: var(--border-width) solid var(--border-color);
	}

	/* Paddings */
	footer[data-padding='none'] {
		padding: var(--space-none);
	}
	footer[data-padding='xs'] {
		padding: var(--space-xs);
	}
	footer[data-padding='sm'] {
		padding: var(--space-sm);
	}
	footer[data-padding='md'] {
		padding: var(--space-md);
	}
	footer[data-padding='lg'] {
		padding: var(--space-lg);
	}
	footer[data-padding='xl'] {
		padding: var(--space-xl);
	}
	footer[data-padding='2xl'] {
		padding: var(--space-2xl);
	}
</style>
