<script lang="ts">
	import type { TooltipProps } from '$lib/types/overlay.js';

	let {
		text = '',
		placement = 'top',
		delay = 150,
		disabled = false,
		trigger,
		children,
		class: className = '',
		style = '',
		...restProps
	}: TooltipProps = $props();

	const tooltipId = $props.id();
	let mounted = $state(false);
	let visible = $state(false);
	let timeoutId = $state<ReturnType<typeof setTimeout> | null>(null);
	let rafId: number | null = null;
	let unmountTimeoutId: ReturnType<typeof setTimeout> | null = null;

	function show() {
		if (disabled || !text) return;
		clear();
		if (unmountTimeoutId) {
			clearTimeout(unmountTimeoutId);
			unmountTimeoutId = null;
		}
		mounted = true;
		if (delay > 0) {
			timeoutId = setTimeout(() => {
				visible = true;
			}, delay);
		} else {
			rafId = requestAnimationFrame(() => {
				visible = true;
				rafId = null;
			});
		}
	}

	function hide() {
		clear();
		visible = false;
		unmountTimeoutId = setTimeout(() => {
			mounted = false;
			unmountTimeoutId = null;
		}, 200);
	}

	function clear() {
		if (timeoutId !== null) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}
		if (rafId !== null) {
			cancelAnimationFrame(rafId);
			rafId = null;
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Escape' && visible) {
			e.stopPropagation();
			hide();
		}
	}

	$effect(() => {
		if (!visible) return;

		function onGlobalKeyDown(e: KeyboardEvent) {
			if (e.key === 'Escape') {
				e.stopPropagation();
				hide();
			}
		}

		window.addEventListener('keydown', onGlobalKeyDown);
		return () => {
			window.removeEventListener('keydown', onGlobalKeyDown);
		};
	});

	$effect(() => {
		return () => {
			clear();
			if (unmountTimeoutId) {
				clearTimeout(unmountTimeoutId);
			}
		};
	});
</script>

<div
	class="tooltip-root {className}"
	onpointerenter={show}
	onpointerleave={hide}
	onfocusin={show}
	onfocusout={hide}
	onkeydown={handleKeyDown}
	{style}
	{...restProps}
>
	{#if trigger}
		{@render trigger(visible ? tooltipId : undefined)}
	{:else if children}
		{@render children(visible ? tooltipId : undefined)}
	{/if}

	{#if mounted && text}
		<div id={tooltipId} role="tooltip" class="tooltip-bubble placement-{placement}" class:visible>
			{text}
		</div>
	{/if}
</div>

<style>
	.tooltip-root {
		position: relative;
		display: inline-flex;
		box-sizing: border-box;
		vertical-align: middle;
	}

	.tooltip-bubble {
		position: absolute;
		z-index: var(--layer-toast, 110);
		width: max-content;
		max-width: min(calc(var(--base) * 16), calc(100vw - var(--space-xl)));
		white-space: normal;
		text-align: center;
		text-wrap: balance;
		padding: var(--space-xs, 4px) var(--space-sm, 8px);
		border: var(--border-width, 2px) solid var(--border-color);
		border-radius: var(--radius-xs, 2px);
		background-color: var(--text-primary);
		color: var(--bg-primary);
		font-family: var(--font-sans);
		font-size: var(--text-xs, 0.75rem);
		font-weight: 500;
		line-height: 1.3;
		box-shadow: var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
		box-sizing: border-box;
		opacity: 0;
		pointer-events: none;
		transition:
			opacity var(--duration-fast, 125ms) var(--ease-standard),
			transform var(--duration-fast, 125ms) var(--ease-standard);
	}

	.tooltip-bubble.visible {
		opacity: 1;
		pointer-events: auto;
	}

	/* Zona de ponte invisível para hover contínuo (WCAG 2.1 SC 1.4.13) */
	.tooltip-bubble::before {
		content: '';
		position: absolute;
		inset: calc(var(--space-xs, 4px) * -1);
		z-index: -1;
	}

	/* Posicionamentos com elevação suave */
	.placement-top {
		bottom: calc(100% + var(--space-xs, 4px));
		left: 50%;
		transform: translate(-50%, 4px) scale(0.96);
	}

	.placement-top.visible {
		transform: translate(-50%, 0) scale(1);
	}

	.placement-bottom {
		top: calc(100% + var(--space-xs, 4px));
		left: 50%;
		transform: translate(-50%, -4px) scale(0.96);
	}

	.placement-bottom.visible {
		transform: translate(-50%, 0) scale(1);
	}

	.placement-left {
		right: calc(100% + var(--space-xs, 4px));
		top: 50%;
		transform: translate(4px, -50%) scale(0.96);
	}

	.placement-left.visible {
		transform: translate(0, -50%) scale(1);
	}

	.placement-right {
		left: calc(100% + var(--space-xs, 4px));
		top: 50%;
		transform: translate(-4px, -50%) scale(0.96);
	}

	.placement-right.visible {
		transform: translate(0, -50%) scale(1);
	}

	@media (prefers-reduced-motion: reduce) {
		.tooltip-bubble {
			transition: none;
		}

		.placement-top,
		.placement-top.visible,
		.placement-bottom,
		.placement-bottom.visible {
			transform: translate(-50%, 0);
		}

		.placement-left,
		.placement-left.visible,
		.placement-right,
		.placement-right.visible {
			transform: translate(0, -50%);
		}
	}
</style>
