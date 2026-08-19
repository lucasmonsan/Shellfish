<script lang="ts">
	import type { HeaderProps } from '$lib/types/index.js';

	let {
		children,
		sticky = false,
		padding = 'sm',
		class: className,
		...restProps
	}: HeaderProps = $props();
</script>

<header data-sticky={sticky} data-padding={padding} class={className} {...restProps}>
	{@render children?.()}
</header>

<style>
	header {
		display: flex;
		align-items: center;
		width: 100%;
		box-sizing: border-box;
		background-color: var(--bg-primary);
		color: var(--text-primary);
		flex-shrink: 0;
	}

	header[data-sticky='true'] {
		position: sticky;
		top: 0;
		z-index: var(--z-sticky);
		border-bottom: var(--border-width) solid var(--border-color);
	}

	/* Paddings */
	header[data-padding='none'] {
		padding: var(--space-none);
	}
	header[data-padding='xs'] {
		padding: var(--space-xs);
	}
	header[data-padding='sm'] {
		padding: var(--space-sm);
	}
	header[data-padding='md'] {
		padding: var(--space-md);
	}
	header[data-padding='lg'] {
		padding: var(--space-lg);
	}
	header[data-padding='xl'] {
		padding: var(--space-xl);
	}
	header[data-padding='2xl'] {
		padding: var(--space-2xl);
	}
</style>
