<script lang="ts">
	import type { SkeletonProps } from '$lib/types/feedback.js';

	let {
		variant = 'rect',
		width,
		height,
		radius = 'xs',
		animate = true,
		class: className = '',
		style = '',
		...restProps
	}: SkeletonProps = $props();

	function formatDimension(dim?: string | number): string | undefined {
		if (dim === undefined) return undefined;
		return typeof dim === 'number' ? `${dim}px` : dim;
	}

	let resolvedWidth = $derived(formatDimension(width));
	let resolvedHeight = $derived(formatDimension(height));
	let radiusVar = $derived(`var(--radius-${radius})`);
</script>

<span
	aria-hidden="true"
	class="skeleton {variant} {className}"
	class:animate
	style:width={resolvedWidth}
	style:height={resolvedHeight}
	style:border-radius={variant === 'circle' ? '50%' : radiusVar}
	{style}
	{...restProps}
></span>

<style>
	.skeleton {
		display: inline-block;
		background-color: var(--bg-secondary);
		box-sizing: border-box;
		vertical-align: middle;
	}

	.skeleton.rect {
		width: 100%;
		height: calc(var(--base) * 2);
	}

	.skeleton.text {
		width: 100%;
		height: calc(var(--base) * 0.9);
	}

	.skeleton.circle {
		width: var(--control-height);
		height: var(--control-height);
		aspect-ratio: 1 / 1;
		flex-shrink: 0;
	}

	.skeleton.animate {
		animation: skeleton-pulse 1.5s ease-in-out infinite;
	}

	@keyframes skeleton-pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.4;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.skeleton.animate {
			animation: none;
		}
	}
</style>
