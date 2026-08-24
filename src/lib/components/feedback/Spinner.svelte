<script lang="ts">
	import type { SpinnerProps } from '$lib/types/index.js';
	import { getI18n } from '$lib/utils/i18n.svelte.js';

	let {
		variant = 'cube',
		size = 'md',
		color,
		label,
		class: className,
		...restProps
	}: SpinnerProps = $props();

	const { t } = getI18n();
</script>

<span
	role="status"
	aria-label={label ?? t('spinner.loading')}
	data-size={size}
	data-variant={variant}
	class={`shellfish-spinner ${className ?? ''}`}
	{...restProps}
>
	{#if variant === 'cube'}
		<span class="spinner-cube" style:background-color={color}></span>
	{:else if variant === 'ratchet'}
		<span class="spinner-ratchet" style:background-color={color}></span>
	{:else}
		<svg viewBox="0 0 24 24" fill="none" class="spinner-chaser-svg">
			<rect
				class="track-rect"
				x="4"
				y="4"
				width="16"
				height="16"
				stroke={color ?? 'var(--border-color)'}
				stroke-width="2.5"
				stroke-opacity="0.2"
			/>
			<rect
				class="chaser-rect"
				x="4"
				y="4"
				width="16"
				height="16"
				stroke={color ?? 'var(--color-primary)'}
				stroke-width="2.5"
				stroke-dasharray="16 48"
			/>
		</svg>
	{/if}
</span>

<style>
	.shellfish-spinner {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		vertical-align: middle;
		box-sizing: border-box;
	}

	.shellfish-spinner[data-size='sm'] {
		width: 16px;
		height: 16px;
	}

	.shellfish-spinner[data-size='md'] {
		width: 24px;
		height: 24px;
	}

	.shellfish-spinner[data-size='lg'] {
		width: 36px;
		height: 36px;
	}

	/* 1. O Cubo Neobrutalista do MonsanUI (Giro Fluido ease-in-out) */
	.spinner-cube {
		width: 65%;
		height: 65%;
		background-color: var(--color-primary);
		border: var(--border-width) solid var(--border-color);
		box-sizing: border-box;
		animation: spinCube 1.2s infinite ease-in-out;
		transform-origin: center;
	}

	@keyframes spinCube {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	/* 2. Catraca Mecânica com steps(8) compassado */
	.spinner-ratchet {
		width: 65%;
		height: 65%;
		background-color: var(--color-primary);
		border: var(--border-width) solid var(--border-color);
		box-sizing: border-box;
		animation: ratchetSteps 1.6s infinite steps(8);
		transform-origin: center;
	}

	@keyframes ratchetSteps {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	/* 3. Trilha Perimetral (Chaser Terracota) */
	.spinner-chaser-svg {
		width: 100%;
		height: 100%;
		display: block;
	}

	.spinner-chaser-svg .chaser-rect {
		animation: chaserDash 1.2s linear infinite;
	}

	@keyframes chaserDash {
		from {
			stroke-dashoffset: 0;
		}
		to {
			stroke-dashoffset: -64;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.spinner-cube,
		.spinner-ratchet,
		.spinner-chaser-svg .chaser-rect {
			animation: none;
		}
	}
</style>
