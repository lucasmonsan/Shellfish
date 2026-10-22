<script lang="ts">
	import type { ButtonProps } from '$lib/types/actions.js';
	import Spinner from '../feedback/Spinner.svelte';

	let {
		variant = 'primary',
		size = 'md',
		block = false,
		square = false,
		loading = false,
		minLoadingDuration = 1200,
		disabled = false,
		type = 'button',
		onclick,
		label,
		children,
		ariaLabel,
		class: className = '',
		style = '',
		...restProps
	}: ButtonProps = $props();

	// Normaliza variantes (error -> danger)
	let resolvedVariant = $derived(variant === 'error' ? 'danger' : variant);

	let buttonEl = $state<HTMLButtonElement>();
	let internalLoading = $state(false);
	let isEffectivelyLoading = $derived(loading || internalLoading);

	let graceActive = $state(false);
	let loadingStartTime = 0;
	let minTimer: ReturnType<typeof setTimeout> | undefined;

	let currentWidthPx = $state<number | null>(null);
	let currentHeightPx = $state<number | null>(null);
	let targetSquarePx = $state<number>(40);
	let isCollapsed = $state(false);

	$effect(() => {
		if (isEffectivelyLoading) {
			if (minTimer) {
				clearTimeout(minTimer);
				minTimer = undefined;
			}
			graceActive = false;
			loadingStartTime = Date.now();

			if (buttonEl && !square && !block) {
				const naturalWidth = buttonEl.offsetWidth;
				const naturalHeight = buttonEl.offsetHeight;

				currentWidthPx = naturalWidth;
				currentHeightPx = naturalHeight;
				targetSquarePx = naturalHeight;

				buttonEl.style.width = `${naturalWidth}px`;
				buttonEl.style.height = `${naturalHeight}px`;
				// Força layout síncrono para garantir baseline contínua de interpolação
				void buttonEl.offsetHeight;

				requestAnimationFrame(() => {
					isCollapsed = true;
				});
			} else {
				isCollapsed = true;
			}
		} else if (loadingStartTime > 0) {
			const elapsed = Date.now() - loadingStartTime;
			const remaining = Math.max(0, minLoadingDuration - elapsed);

			const restoreSize = () => {
				graceActive = false;
				loadingStartTime = 0;
				isCollapsed = false;
				setTimeout(() => {
					if (!isEffectivelyLoading && !graceActive) {
						currentWidthPx = null;
						currentHeightPx = null;
						if (buttonEl) {
							buttonEl.style.width = '';
							buttonEl.style.height = '';
						}
					}
				}, 500);
			};

			if (remaining > 0) {
				graceActive = true;
				minTimer = setTimeout(restoreSize, remaining);
			} else {
				restoreSize();
			}
		}

		return () => {
			if (minTimer) {
				clearTimeout(minTimer);
			}
		};
	});

	let visualLoading = $derived(isEffectivelyLoading || graceActive);
	let isMorphing = $derived(visualLoading || currentWidthPx !== null);

	let dynamicSizeStyle = $derived.by(() => {
		if (block || square) return '';
		if (isCollapsed && visualLoading) {
			return `width: ${targetSquarePx}px; height: ${targetSquarePx}px; min-height: ${targetSquarePx}px;`;
		}
		if (currentWidthPx !== null && currentHeightPx !== null) {
			return `width: ${currentWidthPx}px; height: ${currentHeightPx}px;`;
		}
		return '';
	});

	async function handleClick(event: MouseEvent) {
		if (disabled || visualLoading) {
			event.preventDefault();
			return;
		}

		if (onclick) {
			const result = onclick(event);
			if (result && typeof (result as Promise<unknown>).then === 'function') {
				internalLoading = true;
				try {
					await result;
				} finally {
					internalLoading = false;
				}
			}
		}
	}
</script>

<button
	bind:this={buttonEl}
	{type}
	disabled={disabled || visualLoading}
	aria-busy={visualLoading}
	aria-label={ariaLabel ?? label}
	onclick={handleClick}
	class="{resolvedVariant} {size} {className}"
	class:loading={visualLoading}
	class:morphing={isMorphing}
	class:block
	class:square
	style="{dynamicSizeStyle} {style}"
	{...restProps}
>
	<span class="content" class:hidden={visualLoading}>
		{#if children}
			{@render children()}
		{:else if label}
			{label}
		{/if}
	</span>

	<span class="spinner" class:visible={visualLoading} aria-hidden={!visualLoading}>
		<Spinner {size} />
	</span>
</button>

<style>
	button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		position: relative;
		box-sizing: border-box;
		min-height: var(--btn-min-height);
		min-width: var(--btn-min-height);
		max-width: 100%;
		flex-shrink: 0;
		font-family: var(--font-sans);
		font-weight: 600;
		line-height: var(--leading-none);
		white-space: nowrap;
		text-align: center;
		border-radius: var(--radius-xs);
		border: var(--border-width) solid var(--border-color);
		cursor: pointer;
		user-select: none;
		text-decoration: none;
		overflow: visible;
		transition:
			width var(--transition-morph),
			height var(--transition-morph),
			min-height var(--transition-morph),
			padding var(--transition-morph),
			background-color 0.35s ease-out,
			border-color 0.35s ease-out,
			box-shadow 0.35s ease-out,
			color var(--transition-fast),
			opacity var(--transition-fast),
			transform var(--transition-fast);
	}

	button.morphing {
		overflow: hidden;
	}

	button :global(svg) {
		flex-shrink: 0;
	}

	button:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
	}

	button:active:not(:disabled):not(.loading) {
		transform: scale(0.98);
	}

	button:disabled:not(.loading) {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* Modos Block & Square */
	button.block {
		width: 100%;
		display: flex;
		flex-shrink: 1;
	}

	button.square {
		width: var(--btn-min-height);
		min-width: var(--btn-min-height);
		height: var(--btn-min-height);
		padding: 0;
		flex-shrink: 0;
	}

	/* Escala Fluida de Tamanhos (--base) com Paddings e Gaps Equilibrados */
	.sm {
		--btn-min-height: var(--control-height-sm);
		font-size: var(--text-xs);
		padding: var(--space-xxs) var(--control-padding-sm);
		gap: var(--space-xs);
	}

	.md {
		--btn-min-height: var(--control-height);
		font-size: var(--text-sm);
		padding: var(--space-xs) var(--control-padding-md);
		gap: var(--space-xs);
	}

	.lg {
		--btn-min-height: var(--control-height-lg);
		font-size: var(--text-md);
		padding: var(--space-xs) var(--control-padding-lg);
		gap: var(--space-sm);
	}

	/* Variantes Oficiais */
	.primary {
		background-color: var(--color-primary);
		color: var(--color-primary-contrast);
	}

	.primary:hover:not(:disabled):not(.loading) {
		background-color: var(--color-primary-hover);
	}

	.secondary {
		background-color: var(--bg-secondary);
		color: var(--text-primary);
	}

	.secondary:hover:not(:disabled):not(.loading) {
		background-color: var(--bg-elevated);
		border-color: var(--border-strong);
	}

	.outline {
		background-color: transparent;
		color: var(--color-outline);
		border-color: var(--color-outline);
	}

	.outline:hover:not(:disabled):not(.loading) {
		background-color: var(--color-primary-subtle);
	}

	.ghost {
		background-color: transparent;
		color: var(--text-primary);
		border-color: transparent;
	}

	.ghost:hover:not(:disabled):not(.loading) {
		background-color: var(--bg-secondary);
	}

	.danger {
		background-color: var(--color-danger);
		color: var(--color-on-solid);
	}

	.danger:hover:not(:disabled):not(.loading) {
		background-color: var(--color-danger-hover);
	}

	.warning {
		background-color: var(--color-warning);
		color: var(--color-warning-contrast);
	}

	.warning:hover:not(:disabled):not(.loading) {
		background-color: var(--color-warning-hover);
	}

	.success {
		background-color: var(--color-success);
		color: var(--color-on-solid);
	}

	.success:hover:not(:disabled):not(.loading) {
		background-color: var(--color-success-hover);
	}

	/* Opção B: O botão reduz e se dissolve em transparência total */
	button.loading {
		padding: 0;
		background-color: transparent;
		border-color: transparent;
		box-shadow: var(--shadow-none);
		cursor: wait;
	}

	.content {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: inherit;
		flex-shrink: 0;
		white-space: nowrap;
		transition:
			opacity 0.2s ease-in 0.15s,
			transform 0.2s ease-in 0.15s;
	}

	.content.hidden {
		opacity: 0;
		transform: scale(0.92);
		pointer-events: none;
		transition:
			opacity 0.12s ease-out,
			transform 0.12s ease-out;
	}

	.spinner {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.15s ease-out;
	}

	.spinner:not(.visible) :global(.spinner) {
		animation: none;
	}

	.spinner.visible {
		opacity: 1;
		pointer-events: auto;
		transition: opacity 0.25s ease-in 0.1s;
	}

	@media (prefers-reduced-motion: reduce) {
		button,
		.content,
		.spinner {
			transition: none;
		}
	}
</style>
