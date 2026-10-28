<script lang="ts">
	import type { PopoverProps, PopoverAriaProps } from '$lib/types/overlay.js';
	import { overlayStack } from '$lib/utils/overlay.svelte.js';

	let {
		open = $bindable(false),
		align = 'start',
		placement = 'auto',
		offset = 4,
		disabled = false,
		ariaLabel = 'Popover',
		trigger,
		children,
		content,
		class: className = '',
		panelClass = '',
		style = '',
		...restProps
	}: PopoverProps = $props();

	let rootEl = $state<HTMLDivElement>();
	let panelEl = $state<HTMLDivElement>();
	let autoPlacement = $state<'bottom' | 'top'>('bottom');
	let resolvedPlacement = $derived(placement !== 'auto' ? placement : autoPlacement);
	let panelStyle = $state('');
	const panelId = $props.id();

	let ariaProps = $derived<PopoverAriaProps>({
		'aria-haspopup': 'dialog',
		'aria-expanded': open,
		'aria-controls': open ? panelId : undefined
	});

	function toggle(event?: MouseEvent | KeyboardEvent) {
		if (disabled) return;
		event?.stopPropagation();
		open = !open;
	}

	function close() {
		open = false;
	}

	function updatePlacement() {
		if (!rootEl || typeof window === 'undefined') return;

		const rect = rootEl.getBoundingClientRect();
		const viewportHeight = window.innerHeight;
		const viewportWidth = window.innerWidth;
		const spaceBelow = viewportHeight - rect.bottom;
		const spaceAbove = rect.top;
		const estimatedPanelHeight = panelEl ? panelEl.offsetHeight : 160;
		const estimatedPanelWidth = panelEl ? panelEl.offsetWidth : 200;

		if (placement === 'auto') {
			if (spaceBelow < estimatedPanelHeight && spaceAbove > spaceBelow) {
				autoPlacement = 'top';
			} else {
				autoPlacement = 'bottom';
			}
		}

		const isTop = (placement !== 'auto' ? placement : autoPlacement) === 'top';

		let horizontalCss: string;
		if (align === 'start') {
			if (rect.left + estimatedPanelWidth > viewportWidth && viewportWidth - rect.right >= 0) {
				horizontalCss = `right: ${Math.max(0, viewportWidth - rect.right)}px; left: auto;`;
			} else {
				horizontalCss = `left: ${Math.max(0, Math.min(rect.left, viewportWidth - estimatedPanelWidth))}px; right: auto;`;
			}
		} else if (align === 'end') {
			if (viewportWidth - rect.right + estimatedPanelWidth > viewportWidth && rect.left >= 0) {
				horizontalCss = `left: ${Math.max(0, rect.left)}px; right: auto;`;
			} else {
				horizontalCss = `right: ${Math.max(0, viewportWidth - rect.right)}px; left: auto;`;
			}
		} else {
			horizontalCss = `left: ${rect.left + rect.width / 2}px; right: auto;`;
		}

		let verticalCss: string;
		if (isTop) {
			verticalCss = `bottom: ${viewportHeight - rect.top + offset}px; top: auto;`;
		} else {
			verticalCss = `top: ${rect.bottom + offset}px; bottom: auto;`;
		}

		panelStyle = `${horizontalCss} ${verticalCss}`;
	}

	$effect(() => {
		if (!open) return;

		updatePlacement();
		const raf = requestAnimationFrame(() => updatePlacement());

		const triggerFocusable = rootEl?.querySelector<HTMLElement>(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		);

		overlayStack.register({
			id: panelId,
			type: 'popover',
			element: rootEl,
			close: () => {
				open = false;
			},
			restoreFocusEl: triggerFocusable,
			closeOnEscape: true,
			closeOnClickOutside: true
		});

		function onViewportChange() {
			updatePlacement();
		}

		window.addEventListener('resize', onViewportChange, { passive: true });
		window.addEventListener('scroll', onViewportChange, { passive: true, capture: true });

		return () => {
			cancelAnimationFrame(raf);
			overlayStack.unregister(panelId);
			window.removeEventListener('resize', onViewportChange);
			window.removeEventListener('scroll', onViewportChange, true);
		};
	});
</script>

<div
	bind:this={rootEl}
	class="popover-root {className}"
	{style}
	style:--popover-offset="{offset}px"
	{...restProps}
>
	<div class="popover-trigger">
		{@render trigger(toggle, open, ariaProps)}
	</div>

	{#if open}
		<div
			bind:this={panelEl}
			id={panelId}
			role="region"
			aria-label={ariaLabel}
			tabindex="-1"
			style={panelStyle}
			data-floating-positioned="true"
			class="popover-panel align-{align} placement-{resolvedPlacement} {panelClass}"
		>
			{#if content}
				{@render content(close)}
			{:else if children}
				{@render children(close)}
			{/if}
		</div>
	{/if}
</div>

<style>
	.popover-root {
		position: relative;
		display: inline-flex;
		box-sizing: border-box;
		vertical-align: middle;
	}

	.popover-trigger {
		display: inline-flex;
		box-sizing: border-box;
	}

	.popover-panel {
		position: fixed;
		z-index: var(--layer-popover, 70);
		box-sizing: border-box;
		max-width: calc(100vw - var(--space-md) * 2);
		max-height: calc(100vh - var(--space-md) * 2);
		overflow: auto;
		outline: none;
	}

	.popover-panel.align-center {
		transform: translateX(-50%);
	}

	/* Posicionamento Vertical & Animações */
	.placement-bottom:not(.align-center) {
		animation: popover-in-bottom var(--duration-fast) var(--ease-decelerate);
	}

	.placement-bottom.align-center {
		animation: popover-in-bottom-center var(--duration-fast) var(--ease-decelerate);
	}

	.placement-top:not(.align-center) {
		animation: popover-in-top var(--duration-fast) var(--ease-decelerate);
	}

	.placement-top.align-center {
		animation: popover-in-top-center var(--duration-fast) var(--ease-decelerate);
	}

	@keyframes popover-in-bottom {
		from {
			opacity: 0;
			transform: translateY(-4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes popover-in-bottom-center {
		from {
			opacity: 0;
			transform: translate(-50%, -4px);
		}
		to {
			opacity: 1;
			transform: translate(-50%, 0);
		}
	}

	@keyframes popover-in-top {
		from {
			opacity: 0;
			transform: translateY(4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes popover-in-top-center {
		from {
			opacity: 0;
			transform: translate(-50%, 4px);
		}
		to {
			opacity: 1;
			transform: translate(-50%, 0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.popover-panel {
			animation: none;
		}
	}
</style>
