<script lang="ts">
	import type { SpinnerProps } from '$lib/types/feedback.js';
	import { getI18n } from '$lib/utils/i18n.svelte.js';

	let {
		size = 'md',
		label,
		class: className = '',
		style = '',
		...restProps
	}: SpinnerProps = $props();

	const i18n = getI18n();
	let resolvedLabel = $derived(label ?? i18n.t('common.loading'));

	let isPresetSize = $derived(size === 'sm' || size === 'md' || size === 'lg');

	let dimensionStyle = $derived.by(() => {
		if (isPresetSize) return '';
		if (typeof size === 'number') {
			return `width: ${size}px; height: ${size}px;`;
		}
		return `width: ${size}; height: ${size};`;
	});
</script>

<div
	role="status"
	aria-live="polite"
	class="spinner {isPresetSize ? size : ''} {className}"
	style="{dimensionStyle} {style}"
	{...restProps}
>
	<span class="sr-only">{resolvedLabel}</span>
</div>

<style>
	@keyframes spinCube {
		0% {
			transform: rotate(0deg);
			background-color: var(--color-primary);
		}
		50% {
			transform: rotate(180deg);
			background-color: var(--color-success);
		}
		100% {
			transform: rotate(360deg);
			background-color: var(--color-primary);
		}
	}

	.spinner {
		display: inline-block;
		vertical-align: middle;
		flex-shrink: 0;
		box-sizing: border-box;
		border-radius: var(--radius-xs);
		border: var(--border-width) solid var(--border-color);
		animation: spinCube 1.2s infinite ease-in-out;
	}

	.sm {
		width: calc(var(--base) * 1.125);
		height: calc(var(--base) * 1.125);
	}

	.md {
		width: calc(var(--base) * 1.5);
		height: calc(var(--base) * 1.5);
	}

	.lg {
		width: calc(var(--base) * 1.875);
		height: calc(var(--base) * 1.875);
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: 0;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	@media (prefers-reduced-motion: reduce) {
		.spinner {
			animation: none;
			opacity: 0.7;
		}
	}
</style>
