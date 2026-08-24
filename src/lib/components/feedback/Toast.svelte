<script lang="ts">
	import type { ToastProps } from '$lib/types/index.js';
	import { getI18n } from '$lib/utils/i18n.svelte.js';
	import { fly } from 'svelte/transition';

	let {
		children,
		variant = 'info',
		duration = 4000,
		open = $bindable(true),
		closeLabel,
		onclose,
		class: className,
		...restProps
	}: ToastProps = $props();

	const { t } = getI18n();

	$effect(() => {
		if (!open || duration <= 0) return;

		const timer = setTimeout(() => {
			open = false;
			onclose?.();
		}, duration);

		return () => clearTimeout(timer);
	});
</script>

{#if open}
	<aside
		role="status"
		aria-live="polite"
		data-variant={variant}
		class={className}
		transition:fly={{ y: 24, duration: 250 }}
		{...restProps}
	>
		<div class="toast-content">
			{@render children?.()}
		</div>
		<button
			type="button"
			class="close-button"
			aria-label={closeLabel ?? t('toast.close')}
			onclick={() => {
				open = false;
				onclose?.();
			}}
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
	</aside>
{/if}

<style>
	aside {
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-md);
		padding: var(--space-sm) var(--space-md);
		box-sizing: border-box;
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		background-color: var(--bg-primary);
		color: var(--text-primary);
		box-shadow: var(--shadow);
		position: fixed;
		bottom: var(--space-lg);
		right: var(--space-lg);
		z-index: var(--z-toast);
		max-width: min(420px, 90vw);
	}

	.toast-content {
		flex: 1;
		font-family: inherit;
		font-size: var(--text-sm);
		line-height: 1.4;
	}

	/* Variantes */
	aside[data-variant='info'] {
		border-left: calc(var(--border-width) * 3) solid var(--color-blue-light);
	}

	aside[data-variant='success'] {
		border-left: calc(var(--border-width) * 3) solid var(--color-green-light);
	}

	aside[data-variant='warning'] {
		border-left: calc(var(--border-width) * 3) solid var(--color-yellow);
	}

	aside[data-variant='danger'] {
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
		transition: color 0.15s ease;
	}

	.close-button:hover {
		color: var(--text-primary);
	}

	svg {
		width: 14px;
		height: 14px;
	}
</style>
