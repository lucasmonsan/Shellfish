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
	let visible = $state(false);
	let timeoutId = $state<ReturnType<typeof setTimeout> | null>(null);

	function show() {
		if (disabled || !text) return;
		clear();
		if (delay > 0) {
			timeoutId = setTimeout(() => {
				visible = true;
			}, delay);
		} else {
			visible = true;
		}
	}

	function hide() {
		clear();
		visible = false;
	}

	function clear() {
		if (timeoutId !== null) {
			clearTimeout(timeoutId);
			timeoutId = null;
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
		{@render children()}
	{/if}

	{#if visible && text}
		<div id={tooltipId} role="tooltip" class="tooltip-bubble placement-{placement}">
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
		padding: var(--space-xs) var(--space-sm);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-xs);
		background-color: var(--text-primary);
		color: var(--bg-primary);
		font-family: var(--font-sans);
		font-size: var(--text-xs);
		font-weight: 500;
		line-height: 1.25;
		white-space: nowrap;
		pointer-events: none;
		box-shadow: var(--shadow-md);
		box-sizing: border-box;
		animation: tooltip-in var(--transition-fast) ease-out;
	}

	/* Posicionamentos */
	.placement-top {
		bottom: calc(100% + var(--space-xs));
		left: 50%;
		transform: translateX(-50%);
	}

	.placement-bottom {
		top: calc(100% + var(--space-xs));
		left: 50%;
		transform: translateX(-50%);
	}

	.placement-left {
		right: calc(100% + var(--space-xs));
		top: 50%;
		transform: translateY(-50%);
	}

	.placement-right {
		left: calc(100% + var(--space-xs));
		top: 50%;
		transform: translateY(-50%);
	}

	@keyframes tooltip-in {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.tooltip-bubble {
			animation: none;
		}
	}
</style>
