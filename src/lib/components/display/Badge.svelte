<script lang="ts">
	import type { BadgeProps } from '$lib/types/index.js';

	let {
		children,
		variant = 'primary',
		size = 'md',
		pill = false,
		class: className,
		...restProps
	}: BadgeProps = $props();
</script>

<span data-variant={variant} data-size={size} data-pill={pill} class={className} {...restProps}>
	{@render children?.()}
</span>

<style>
	span {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-xs);
		box-sizing: border-box;
		font-family: inherit;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.03em;
		line-height: 1;
		white-space: nowrap;
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		box-shadow: 1px 1px 0px var(--border-color);
		user-select: none;
		vertical-align: middle;
	}

	span[data-pill='true'] {
		border-radius: var(--radius-md);
	}

	/* Tamanhos */
	span[data-size='sm'] {
		height: 20px;
		padding-inline: 6px;
		font-size: var(--text-xs);
	}

	span[data-size='md'] {
		height: 24px;
		padding-inline: 8px;
		font-size: var(--text-xs);
	}

	/* Variantes */
	span[data-variant='primary'] {
		background-color: var(--color-primary);
		color: var(--color-primary-contrast);
	}

	span[data-variant='secondary'] {
		background-color: var(--bg-secondary);
		color: var(--text-primary);
	}

	span[data-variant='outline'] {
		background-color: transparent;
		color: var(--text-primary);
	}

	span[data-variant='ghost'] {
		background-color: transparent;
		border-color: transparent;
		box-shadow: none;
		color: var(--text-secondary);
	}

	span[data-variant='danger'] {
		background-color: var(--color-danger);
		color: var(--color-primary-contrast);
	}

	span[data-variant='success'] {
		background-color: var(--color-green-light);
		color: var(--color-green-dark);
	}

	span[data-variant='warning'] {
		background-color: var(--color-yellow);
		color: var(--text-primary);
	}

	span[data-variant='neutral'] {
		background-color: var(--bg-secondary);
		color: var(--text-secondary);
	}
</style>
