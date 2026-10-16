<script lang="ts">
	import type { Size } from '../../types/tokens.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import { getI18n } from '../../utils/i18n.svelte.js';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/**
		 * Size preset ('sm' = 18px, 'md' = 24px, 'lg' = 32px) or custom dimension.
		 * Default: 'md'
		 */
		size?: Size | number | string;

		/**
		 * Accessible loading message for screen readers.
		 * Defaults to localized i18n 'common.loading'.
		 */
		label?: string;

		/**
		 * Additional CSS classes.
		 */
		class?: string;
	}

	let { size = 'md', label, class: className = '', style = '', ...restProps }: Props = $props();

	const i18n = getI18n();
	let resolvedLabel = $derived(label ?? i18n.t('common.loading'));

	let dimensionStyle = $derived.by(() => {
		if (typeof size === 'number') {
			return `width: ${size}px; height: ${size}px;`;
		}
		if (size === 'sm') return 'width: 18px; height: 18px;';
		if (size === 'md') return 'width: 24px; height: 24px;';
		if (size === 'lg') return 'width: 32px; height: 32px;';
		return `width: ${size}; height: ${size};`;
	});
</script>

<div
	role="status"
	aria-live="polite"
	class="spinner {className}"
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
		border: 2px solid var(--border-color);
		animation: spinCube 1.2s infinite ease-in-out;
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
