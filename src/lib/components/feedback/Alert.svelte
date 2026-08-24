<script lang="ts">
	import type { AlertProps } from '$lib/types/index.js';
	import { getI18n } from '$lib/utils/i18n.svelte.js';

	let {
		children,
		variant = 'info',
		title,
		closable = false,
		closeLabel,
		onclose,
		class: className,
		...restProps
	}: AlertProps = $props();

	const { t } = getI18n();

	let isVisible = $state(true);

	function handleClose() {
		isVisible = false;
		onclose?.();
	}
</script>

{#if isVisible}
	<aside role="alert" data-variant={variant} class={className} {...restProps}>
		<div class="content">
			{#if title}
				<h4>{title}</h4>
			{/if}
			{@render children?.()}
		</div>
		{#if closable}
			<button
				type="button"
				class="close-button"
				aria-label={closeLabel ?? t('alert.close')}
				onclick={handleClose}
			>
				<svg
					viewBox="0 0 16 16"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
				>
					<line x1="4" y1="4" x2="12" y2="12" />
					<line x1="12" y1="4" x2="4" y2="12" />
				</svg>
			</button>
		{/if}
	</aside>
{/if}

<style>
	aside {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: var(--space-md);
		padding: var(--space-sm) var(--space-md);
		box-sizing: border-box;
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		box-shadow: var(--shadow);
		background-color: var(--bg-primary);
		color: var(--text-primary);
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		flex: 1;
	}

	h4 {
		margin: 0;
		font-size: var(--text-sm);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.02em;
	}

	/* Variantes */
	aside[data-variant='info'] {
		background-color: var(--bg-primary);
		border-left: calc(var(--border-width) * 3) solid var(--color-blue-light);
	}

	aside[data-variant='success'] {
		background-color: var(--bg-primary);
		border-left: calc(var(--border-width) * 3) solid var(--color-green-light);
	}

	aside[data-variant='warning'] {
		background-color: var(--bg-primary);
		border-left: calc(var(--border-width) * 3) solid var(--color-yellow);
	}

	aside[data-variant='danger'] {
		background-color: var(--bg-primary);
		border-left: calc(var(--border-width) * 3) solid var(--color-red);
	}

	.close-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 2px;
		color: var(--text-secondary);
		border-radius: var(--radius-sm);
	}

	.close-button:hover {
		color: var(--text-primary);
	}

	svg {
		width: 14px;
		height: 14px;
	}
</style>
