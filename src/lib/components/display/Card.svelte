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
		badgeTitle,
		back,
		flipped = $bindable(false),
		class: className,
		onclick,
		onkeydown,
		...restProps
	}: CardProps = $props();

	function toggleCollapse() {
		if (collapsible) {
			open = !open;
		}
	}

	function handleArticleClick(e: MouseEvent) {
		if (back) {
			const target = e.target as HTMLElement;
			if (
				!target.closest('button, a, input, select, textarea, [role="button"], [role="menuitem"]')
			) {
				flipped = !flipped;
			}
		}
		// @ts-expect-error - Svelte 5 event dispatch compatibility
		onclick?.(e);
	}

	function handleArticleKeydown(e: KeyboardEvent) {
		if (back && (e.key === ' ' || e.key === 'Enter')) {
			const target = e.target as HTMLElement;
			if (
				!target.closest('button, a, input, select, textarea, [role="button"], [role="menuitem"]')
			) {
				e.preventDefault();
				flipped = !flipped;
			}
		}
		// @ts-expect-error - Svelte 5 event dispatch compatibility
		onkeydown?.(e);
	}
</script>

{#snippet frontContent()}
	{#if badgeTitle}
		<div class="card-straddled-badge">
			{badgeTitle}
		</div>
	{/if}

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

	<div
		class="card-collapse-wrapper"
		class:collapsed={collapsible && !open}
		aria-hidden={collapsible && !open ? 'true' : undefined}
	>
		<div class="card-collapse-inner">
			<div class="card-body">
				{@render children?.()}
			</div>

			{#if footer}
				<footer>
					{@render footer()}
				</footer>
			{/if}
		</div>
	</div>
{/snippet}

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<article
	data-variant={variant}
	data-padding={padding}
	data-radius={radius}
	data-interactive={interactive || !!back}
	data-full-width={fullWidth}
	data-collapsible={collapsible}
	data-collapsed={collapsible && !open ? 'true' : undefined}
	data-has-badge={badgeTitle ? 'true' : undefined}
	data-flippable={back ? 'true' : undefined}
	class={className}
	onclick={handleArticleClick}
	onkeydown={handleArticleKeydown}
	tabindex={back ? 0 : undefined}
	role={back ? 'button' : undefined}
	aria-label={back ? (flipped ? 'Back side' : 'Front side') : undefined}
	{...restProps}
>
	{#if back}
		<div class="card-flip-flipper" class:flipped>
			<div class="card-flip-front">
				{@render frontContent()}
			</div>
			<div class="card-flip-back">
				{@render back()}
			</div>
		</div>
	{:else}
		{@render frontContent()}
	{/if}
</article>

<style>
	article {
		position: relative;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: var(--bg-primary);
		color: var(--text-primary);
		border: var(--border-width) solid var(--border-color);
		box-shadow: var(--shadow);
		overflow: visible;
		transition:
			transform 0.12s cubic-bezier(0.4, 0, 0.2, 1),
			box-shadow 0.12s cubic-bezier(0.4, 0, 0.2, 1),
			background-color 0.15s ease,
			border-color 0.15s ease;
	}

	article[data-has-badge='true'] {
		margin-top: var(--space-sm);
	}

	/* Flip 3D (Ativado apenas quando snippet back existe) */
	article[data-flippable='true'] {
		perspective: 1000px;
		background-color: transparent;
		border: none;
		box-shadow: none;
		cursor: pointer;
	}

	.card-flip-flipper {
		position: relative;
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
		transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.card-flip-flipper.flipped {
		transform: rotateY(180deg);
	}

	.card-flip-front,
	.card-flip-back {
		position: relative;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
		box-sizing: border-box;
		background-color: var(--bg-primary);
		color: var(--text-primary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow);
		display: flex;
		flex-direction: column;
	}

	.card-flip-back {
		position: absolute;
		inset: 0;
		transform: rotateY(180deg);
		background-color: var(--bg-secondary);
	}

	.card-straddled-badge {
		position: absolute;
		top: 0;
		left: var(--space-md);
		transform: translateY(-50%);
		display: inline-flex;
		align-items: center;
		padding: 2px 8px;
		background-color: var(--bg-secondary);
		color: var(--text-primary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		font-family: var(--font-display);
		font-size: var(--text-xs);
		font-weight: 700;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		line-height: 1.2;
		z-index: 1;
		box-shadow: 1px 1px 0px var(--border-color);
		user-select: none;
		pointer-events: none;
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
		transition: border-bottom-color 0.25s ease;
	}

	article[data-collapsed='true'] header {
		border-bottom-color: transparent;
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
		transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
		flex-shrink: 0;
	}

	.card-chevron.open {
		transform: rotate(180deg);
	}

	/* Animação Fluida de Expansão / Colapso via CSS Grid 0fr -> 1fr */
	.card-collapse-wrapper {
		display: grid;
		grid-template-rows: 1fr;
		transition: grid-template-rows 0.28s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.card-collapse-wrapper.collapsed {
		grid-template-rows: 0fr;
	}

	.card-collapse-inner {
		min-height: 0;
		display: flex;
		flex-direction: column;
	}

	.card-collapse-wrapper.collapsed .card-collapse-inner {
		overflow: hidden;
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
	article[data-padding='none'] .card-body,
	article[data-padding='none'] .card-flip-back {
		padding: var(--space-none);
	}
	article[data-padding='none'] .card-header-content-static,
	article[data-padding='none'] .card-header-toggle,
	article[data-padding='none'] footer {
		padding-inline: var(--space-sm);
	}

	article[data-padding='xs'] .card-body,
	article[data-padding='xs'] .card-flip-back {
		padding: var(--space-xs);
	}
	article[data-padding='xs'] .card-header-content-static,
	article[data-padding='xs'] .card-header-toggle,
	article[data-padding='xs'] footer {
		padding-inline: var(--space-xs);
	}

	article[data-padding='sm'] .card-body,
	article[data-padding='sm'] .card-flip-back {
		padding: var(--space-sm);
	}
	article[data-padding='sm'] .card-header-content-static,
	article[data-padding='sm'] .card-header-toggle,
	article[data-padding='sm'] footer {
		padding-inline: var(--space-sm);
	}

	article[data-padding='md'] .card-body,
	article[data-padding='md'] .card-flip-back {
		padding: var(--space-md);
	}
	article[data-padding='md'] .card-header-content-static,
	article[data-padding='md'] .card-header-toggle,
	article[data-padding='md'] footer {
		padding-inline: var(--space-md);
	}

	article[data-padding='lg'] .card-body,
	article[data-padding='lg'] .card-flip-back {
		padding: var(--space-lg);
	}
	article[data-padding='lg'] .card-header-content-static,
	article[data-padding='lg'] .card-header-toggle,
	article[data-padding='lg'] footer {
		padding-inline: var(--space-lg);
	}

	article[data-padding='xl'] .card-body,
	article[data-padding='xl'] .card-flip-back {
		padding: var(--space-xl);
	}
	article[data-padding='xl'] .card-header-content-static,
	article[data-padding='xl'] .card-header-toggle,
	article[data-padding='xl'] footer {
		padding-inline: var(--space-xl);
	}

	article[data-padding='2xl'] .card-body,
	article[data-padding='2xl'] .card-flip-back {
		padding: var(--space-2xl);
	}
	article[data-padding='2xl'] .card-header-content-static,
	article[data-padding='2xl'] .card-header-toggle,
	article[data-padding='2xl'] footer {
		padding-inline: var(--space-2xl);
	}

	@media (prefers-reduced-motion: reduce) {
		article,
		.card-chevron,
		.card-collapse-wrapper,
		.card-flip-flipper {
			transition: none;
		}
	}
</style>
