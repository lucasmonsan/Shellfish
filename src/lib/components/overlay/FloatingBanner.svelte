<script lang="ts">
	import type { FloatingBannerProps } from '$lib/types/overlay.js';
	import { getI18n } from '$lib/utils/i18n.svelte.js';
	import X from '$lib/components/icons/X.svelte';

	let {
		open = $bindable(true),
		maxWidth = 'md',
		ariaLabel,
		dismissible = false,
		closeLabel,
		onclose,
		children,
		actions,
		class: className = '',
		style = '',
		...restProps
	}: FloatingBannerProps = $props();

	const i18n = getI18n();

	function handleDismiss() {
		open = false;
		onclose?.();
	}
</script>

{#if open}
	<div role="region" aria-label={ariaLabel} class="floating-banner-anchor">
		<div class="floating-banner max-w-{maxWidth} {className}" {style} {...restProps}>
			{#if children}
				<div class="floating-banner-content">
					{@render children()}
				</div>
			{/if}

			{#if actions || dismissible}
				<div class="floating-banner-actions">
					{#if actions}
						{@render actions()}
					{/if}
					{#if dismissible}
						<button
							type="button"
							class="floating-banner-close"
							aria-label={closeLabel || i18n.t('common.close')}
							onclick={handleDismiss}
						>
							<X size={16} />
						</button>
					{/if}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.floating-banner-anchor {
		position: sticky;
		bottom: var(--space-md);
		left: 0;
		right: 0;
		z-index: var(--layer-sticky);
		display: flex;
		justify-content: center;
		width: 100%;
		padding: 0 var(--space-md);
		margin-top: var(--space-md);
		pointer-events: none;
		box-sizing: border-box;
	}

	.floating-banner {
		pointer-events: auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: var(--space-sm);
		width: 100%;
		margin-inline: auto;
		padding: var(--space-sm) var(--space-md);
		background-color: var(--backdrop-elevated);
		backdrop-filter: var(--blur-surface);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-xs);
		box-shadow: var(--shadow-md);
		color: var(--text-primary);
		box-sizing: border-box;
		animation: banner-in var(--duration-base) var(--ease-decelerate);
		transition:
			background-color var(--transition-base),
			border-color var(--transition-base),
			box-shadow var(--transition-base),
			transform var(--transition-base),
			opacity var(--transition-base);
	}

	.max-w-sm {
		max-width: var(--container-sm);
	}

	.max-w-md {
		max-width: var(--container-md);
	}

	.max-w-lg {
		max-width: var(--container-lg);
	}

	.max-w-xl {
		max-width: var(--container-xl);
	}

	.max-w-full {
		max-width: 100%;
	}

	.floating-banner-content {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--space-sm);
		flex: 1 1 auto;
		min-width: 0;
		font-size: var(--text-sm);
		line-height: var(--leading-normal);
	}

	.floating-banner-actions {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		flex-shrink: 0;
	}

	.floating-banner-close {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: var(--control-height-sm);
		height: var(--control-height-sm);
		padding: 0;
		margin: 0;
		background: transparent;
		border: var(--border-width) solid transparent;
		border-radius: var(--radius-xs);
		color: var(--text-secondary);
		cursor: pointer;
		transition:
			background-color var(--transition-fast),
			color var(--transition-fast),
			border-color var(--transition-fast);
	}

	.floating-banner-close:hover {
		background-color: var(--bg-hover);
		color: var(--text-primary);
	}

	.floating-banner-close:focus-visible {
		outline: var(--border-width) solid var(--color-outline);
		outline-offset: 1px;
	}

	@keyframes banner-in {
		from {
			opacity: 0;
			transform: translateY(var(--space-sm));
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.floating-banner,
		.floating-banner-close {
			animation: none;
			transition: none;
		}
	}
</style>
