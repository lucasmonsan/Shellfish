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
		collapsible = false,
		open = $bindable(true),
		class: className,
		...restProps
	}: CardProps = $props();

	function toggleCollapse() {
		if (collapsible) {
			open = !open;
		}
	}
</script>

<article
	data-variant={variant}
	data-padding={padding}
	data-radius={radius}
	data-interactive={interactive}
	data-full-width={fullWidth}
	data-collapsible={collapsible}
	data-collapsed={collapsible && !open ? 'true' : undefined}
	class={className}
	{...restProps}
>
	{#if header}
		<header>
			{#if collapsible}
				<button
					type="button"
					class="card-header-toggle"
					aria-expanded={open}
					onclick={toggleCollapse}
				>
					<span class="card-header-content">
						{@render header()}
					</span>
					<span class="card-chevron" class:open aria-hidden="true">
						<svg
							viewBox="0 0 24 24"
							width="16"
							height="16"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<polyline points="6 9 12 15 18 9" />
						</svg>
					</span>
				</button>
			{:else}
				<div class="card-header-content-static">
					{@render header()}
				</div>
			{/if}
		</header>
	{/if}

	{#if !collapsible || open}
		<div class="card-body">
			{@render children?.()}
		</div>

		{#if footer}
			<footer>
				{@render footer()}
			</footer>
		{/if}
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
		box-shadow: 2px 2px 0px var(--border-color);
	}

	article[data-interactive='true']:active {
		transform: translate(1px, 1px);
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
		min-height: 42px;
		box-sizing: border-box;
		padding: 0;
		border-bottom: var(--border-width) solid var(--border-color);
		background-color: var(--bg-secondary);
		font-family: var(--font-display);
		font-weight: 700;
	}

	article[data-collapsed='true'] header {
		border-bottom: none;
	}

	.card-header-content-static {
		display: flex;
		align-items: center;
		width: 100%;
		min-height: 42px;
		box-sizing: border-box;
		padding-block: var(--space-xs);
		padding-inline: var(--space-md);
	}

	.card-header-toggle {
		display: flex;
		align-items: center;
		width: 100%;
		min-height: 42px;
		box-sizing: border-box;
		margin: 0;
		padding-block: var(--space-xs);
		padding-inline: var(--space-md);
		background: transparent;
		border: none;
		font: inherit;
		color: inherit;
		cursor: pointer;
		text-align: left;
		transition: background-color 0.12s ease;
	}

	.card-header-toggle:hover {
		background-color: var(--bg-primary);
	}

	.card-header-toggle:focus-visible {
		outline: none;
		box-shadow: inset 0 0 0 2px var(--color-primary);
	}

	.card-header-content {
		display: flex;
		align-items: center;
		flex: 1;
		min-width: 0;
	}

	.card-chevron {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		margin-left: var(--space-sm);
		transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		flex-shrink: 0;
	}

	.card-chevron.open {
		transform: rotate(180deg);
	}

	.card-body {
		flex: 1;
	}

	footer {
		display: flex;
		align-items: center;
		min-height: 42px;
		box-sizing: border-box;
		padding-block: var(--space-xs);
		padding-inline: var(--space-md);
		border-top: var(--border-width) solid var(--border-color);
		background-color: var(--bg-secondary);
	}

	/* Paddings do Body e Alinhamento Horizontal de Header/Footer/Toggle */
	article[data-padding='none'] .card-body {
		padding: var(--space-none);
	}
	article[data-padding='none'] .card-header-content-static,
	article[data-padding='none'] .card-header-toggle,
	article[data-padding='none'] footer {
		padding-inline: var(--space-md);
	}

	article[data-padding='xs'] .card-body {
		padding: var(--space-xs);
	}
	article[data-padding='xs'] .card-header-content-static,
	article[data-padding='xs'] .card-header-toggle,
	article[data-padding='xs'] footer {
		padding-inline: var(--space-xs);
	}

	article[data-padding='sm'] .card-body {
		padding: var(--space-sm);
	}
	article[data-padding='sm'] .card-header-content-static,
	article[data-padding='sm'] .card-header-toggle,
	article[data-padding='sm'] footer {
		padding-inline: var(--space-sm);
	}

	article[data-padding='md'] .card-body {
		padding: var(--space-md);
	}
	article[data-padding='md'] .card-header-content-static,
	article[data-padding='md'] .card-header-toggle,
	article[data-padding='md'] footer {
		padding-inline: var(--space-md);
	}

	article[data-padding='lg'] .card-body {
		padding: var(--space-lg);
	}
	article[data-padding='lg'] .card-header-content-static,
	article[data-padding='lg'] .card-header-toggle,
	article[data-padding='lg'] footer {
		padding-inline: var(--space-lg);
	}

	article[data-padding='xl'] .card-body {
		padding: var(--space-xl);
	}
	article[data-padding='xl'] .card-header-content-static,
	article[data-padding='xl'] .card-header-toggle,
	article[data-padding='xl'] footer {
		padding-inline: var(--space-xl);
	}

	article[data-padding='2xl'] .card-body {
		padding: var(--space-2xl);
	}
	article[data-padding='2xl'] .card-header-content-static,
	article[data-padding='2xl'] .card-header-toggle,
	article[data-padding='2xl'] footer {
		padding-inline: var(--space-2xl);
	}

	@media (prefers-reduced-motion: reduce) {
		article,
		.card-chevron {
			transition: none;
		}
	}
</style>
