<script lang="ts">
	import type { ProgressProps } from '$lib/types/feedback.js';
	import { getI18n } from '$lib/utils/i18n.svelte.js';

	let {
		value = 0,
		max = 100,
		size = 'md',
		variant = 'primary',
		label,
		showValue = false,
		class: className = '',
		...restProps
	}: ProgressProps = $props();

	const i18n = getI18n();
	let clampedValue = $derived(Math.min(Math.max(0, value), max));
	let percentage = $derived(max > 0 ? Math.round((clampedValue / max) * 100) : 0);
	let resolvedLabel = $derived(label ?? i18n.t('common.loading'));

	// Mapeia variant ou paleta mineral para variável CSS de preenchimento
	let fillColorVar = $derived.by(() => {
		if (variant === 'primary') return 'var(--color-primary)';
		if (variant === 'secondary') return 'var(--text-secondary)';
		if (variant === 'success') return 'var(--color-success)';
		if (variant === 'warning') return 'var(--color-warning)';
		if (variant === 'danger' || variant === 'error') return 'var(--color-danger)';
		if (variant === 'info') return 'var(--color-info)';
		return `var(--palette-${variant})`;
	});
</script>

<div class="progress-wrapper {size} {className}" style:--progress-fill={fillColorVar}>
	<progress
		class="progress-bar"
		value={clampedValue}
		{max}
		aria-label={resolvedLabel}
		aria-valuenow={clampedValue}
		aria-valuemin={0}
		aria-valuemax={max}
		{...restProps}
	>
		{percentage}%
	</progress>

	{#if showValue}
		<span class="progress-value mono">{percentage}%</span>
	{/if}
</div>

<style>
	.progress-wrapper {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		width: 100%;
		box-sizing: border-box;
	}

	.progress-bar {
		appearance: none;
		-webkit-appearance: none;
		flex: 1;
		width: 100%;
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-xs);
		background-color: var(--bg-secondary);
		overflow: hidden;
		box-sizing: border-box;
	}

	.progress-wrapper.sm .progress-bar {
		height: calc(var(--base) * 0.45);
	}

	.progress-wrapper.md .progress-bar {
		height: calc(var(--base) * 0.7);
	}

	.progress-wrapper.lg .progress-bar {
		height: calc(var(--base) * 0.95);
	}

	/* Webkit (Chrome, Safari, Edge) */
	.progress-bar::-webkit-progress-bar {
		background-color: var(--bg-secondary);
	}

	.progress-bar::-webkit-progress-value {
		background-color: var(--progress-fill);
		transition: width var(--transition-fast);
	}

	/* Firefox */
	.progress-bar::-moz-progress-bar {
		background-color: var(--progress-fill);
		transition: width var(--transition-fast);
	}

	.progress-value {
		font-size: var(--text-xs);
		font-family: var(--font-mono);
		color: var(--text-secondary);
		min-width: calc(var(--base) * 2.2);
		text-align: right;
		flex-shrink: 0;
	}

	@media (prefers-reduced-motion: reduce) {
		.progress-bar::-webkit-progress-value,
		.progress-bar::-moz-progress-bar {
			transition: none;
		}
	}
</style>
