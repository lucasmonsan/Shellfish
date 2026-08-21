<script lang="ts">
	import type { SpinnerProps } from '$lib/types/index.js';
	import { t } from '$lib/utils/i18n.svelte.js';

	let {
		variant = 'ratchet',
		size = 'md',
		color,
		label,
		class: className,
		...restProps
	}: SpinnerProps = $props();
</script>

<svg
	viewBox="0 0 24 24"
	fill="none"
	role="status"
	aria-label={label ?? t('spinner.loading')}
	data-size={size}
	data-variant={variant}
	class={className}
	{...restProps}
>
	{#if variant === 'ratchet'}
		<rect
			class="ratchet-block"
			x="6"
			y="6"
			width="12"
			height="12"
			rx="0"
			fill={color ?? 'var(--color-primary)'}
			stroke="var(--border-color)"
			stroke-width="2"
		/>
	{:else}
		<rect
			class="track-rect"
			x="4.5"
			y="4.5"
			width="15"
			height="15"
			rx="0"
			stroke={color ?? 'currentColor'}
			stroke-width="2"
			stroke-opacity="0.25"
		/>
		<rect
			class="chaser-rect"
			x="4.5"
			y="4.5"
			width="15"
			height="15"
			rx="0"
			stroke={color ?? 'currentColor'}
			stroke-width="2"
			stroke-dasharray="15 45"
		/>
	{/if}
</svg>

<style>
	svg {
		display: inline-block;
		flex-shrink: 0;
		vertical-align: middle;
	}

	svg[data-variant='ratchet'] {
		animation: ratchet-steps 1s infinite steps(8);
		transform-origin: center;
	}

	svg[data-variant='chaser'] .chaser-rect {
		animation: chaser-dash 1.1s linear infinite;
	}

	svg[data-size='sm'] {
		width: 16px;
		height: 16px;
	}

	svg[data-size='md'] {
		width: 24px;
		height: 24px;
	}

	svg[data-size='lg'] {
		width: 36px;
		height: 36px;
	}

	@keyframes ratchet-steps {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes chaser-dash {
		from {
			stroke-dashoffset: 0;
		}
		to {
			stroke-dashoffset: -60;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		svg[data-variant='ratchet'] {
			animation-duration: 2s;
		}
		svg[data-variant='chaser'] .chaser-rect {
			animation-duration: 2.2s;
		}
	}
</style>
