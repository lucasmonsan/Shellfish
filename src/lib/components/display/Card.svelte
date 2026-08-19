<script lang="ts">
	import type { CardProps } from '$lib/types/index.js';

	let {
		children,
		header,
		footer,
		variant = 'default',
		padding = 'md',
		radius = 'md',
		interactive = false,
		fullWidth = false,
		class: className,
		...restProps
	}: CardProps = $props();
</script>

<article
	data-variant={variant}
	data-padding={padding}
	data-radius={radius}
	data-interactive={interactive}
	data-full-width={fullWidth}
	class={className}
	{...restProps}
>
	{#if header}
		<header>
			{@render header()}
		</header>
	{/if}

	<div class="card-body">
		{@render children?.()}
	</div>

	{#if footer}
		<footer>
			{@render footer()}
		</footer>
	{/if}
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: var(--bg-primary);
		color: var(--text-primary);
		border: var(--border-width) solid var(--border-color);
		box-shadow: var(--shadow);
		overflow: hidden;
		transition:
			transform 0.12s cubic-bezier(0.4, 0, 0.2, 1),
			box-shadow 0.12s cubic-bezier(0.4, 0, 0.2, 1),
			background-color 0.15s ease,
			border-color 0.15s ease;
	}

	/* Radius */
	article[data-radius='sm'] {
		border-radius: var(--radius-sm);
	}
	article[data-radius='md'] {
		border-radius: var(--radius-md);
	}

	/* Variantes */
	article[data-variant='default'] {
		background-color: var(--bg-primary);
		border-color: var(--border-color);
	}

	article[data-variant='outlined'] {
		background-color: transparent;
		box-shadow: none;
		border-color: var(--border-color);
	}

	article[data-variant='flat'] {
		background-color: var(--bg-secondary);
		border-color: transparent;
		box-shadow: none;
	}

	/* Interatividade Tátil */
	article[data-interactive='true'] {
		cursor: pointer;
		user-select: none;
	}

	article[data-interactive='true']:hover {
		transform: translate(-1px, -1px);
		box-shadow: 3px 3px 0px var(--border-color);
	}

	article[data-interactive='true']:active {
		transform: translate(2px, 2px);
		box-shadow: 0px 0px 0px var(--border-color);
	}

	/* Full Width */
	article[data-full-width='true'] {
		width: 100%;
	}

	/* Seções Internas */
	header {
		display: flex;
		align-items: center;
		padding: var(--space-sm) var(--space-md);
		border-bottom: var(--border-width) solid var(--border-color);
		background-color: var(--bg-secondary);
		font-family: var(--font-display);
		font-weight: 700;
	}

	.card-body {
		flex: 1;
	}

	footer {
		display: flex;
		align-items: center;
		padding: var(--space-sm) var(--space-md);
		border-top: var(--border-width) solid var(--border-color);
		background-color: var(--bg-secondary);
	}

	/* Paddings do Body */
	article[data-padding='none'] .card-body {
		padding: var(--space-none);
	}
	article[data-padding='xs'] .card-body {
		padding: var(--space-xs);
	}
	article[data-padding='sm'] .card-body {
		padding: var(--space-sm);
	}
	article[data-padding='md'] .card-body {
		padding: var(--space-md);
	}
	article[data-padding='lg'] .card-body {
		padding: var(--space-lg);
	}
	article[data-padding='xl'] .card-body {
		padding: var(--space-xl);
	}
	article[data-padding='2xl'] .card-body {
		padding: var(--space-2xl);
	}

	@media (prefers-reduced-motion: reduce) {
		article {
			transition: none;
		}
	}
</style>
