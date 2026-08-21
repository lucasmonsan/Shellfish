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
	stroke={color ?? 'currentColor'}
	stroke-width="2.5"
	stroke-linecap="square"
	stroke-linejoin="miter"
	role="status"
	aria-label={label ?? t('spinner.loading')}
	data-size={size}
	data-variant={variant}
	class={className}
	{...restProps}
>
	{#if variant === 'ratchet'}
		<rect class="ratchet-rect" x="4.5" y="4.5" width="15" height="15" rx="1" />
		<rect class="ratchet-core" x="10" y="10" width="4" height="4" fill={color ?? 'currentColor'} />
	{:else}
		<rect class="track-rect" x="4" y="4" width="16" height="16" rx="1" stroke-opacity="0.25" />
		<rect class="chaser-rect" x="4" y="4" width="16" height="16" rx="1" stroke-dasharray="16 48" />
	{/if}
</svg>

<style>
	svg {
		display: inline-block;
		flex-shrink: 0;
		vertical-align: middle;
	}

	svg[data-variant='ratchet'] {
		animation: ratchet-spin 1.2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
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

	@keyframes ratchet-spin {
		0%,
		15% {
			transform: rotate(0deg);
		}
		25%,
		40% {
			transform: rotate(90deg);
		}
		50%,
		65% {
			transform: rotate(180deg);
		}
		75%,
		90% {
			transform: rotate(270deg);
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
			stroke-dashoffset: -64;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		svg[data-variant='ratchet'] {
			animation-duration: 2.4s;
		}
		svg[data-variant='chaser'] .chaser-rect {
			animation-duration: 2.2s;
		}
	}
</style>
