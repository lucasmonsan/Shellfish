<script lang="ts">
	import type { PopoverProps, PopoverAriaProps } from '$lib/types/overlay.js';

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
		if (placement !== 'auto') return;

		if (rootEl && typeof window !== 'undefined') {
			const rect = rootEl.getBoundingClientRect();
			const viewportHeight = window.innerHeight;
			const spaceBelow = viewportHeight - rect.bottom;
			const spaceAbove = rect.top;
			const estimatedPanelHeight = panelEl ? panelEl.offsetHeight : 160;

			if (spaceBelow < estimatedPanelHeight && spaceAbove > spaceBelow) {
				autoPlacement = 'top';
			} else {
				autoPlacement = 'bottom';
			}
		}
	}

	$effect(() => {
		if (!open) return;

		updatePlacement();

		function onPointerDown(e: PointerEvent) {
			const target = e.target as Node | null;
			if (rootEl && target && !rootEl.contains(target)) {
				open = false;
			}
		}

		function onKeyDown(e: KeyboardEvent) {
			if (e.key === 'Escape') {
				e.stopPropagation();
				e.preventDefault();
				open = false;
				const focusable = rootEl?.querySelector<HTMLElement>(
					'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
				);
				focusable?.focus();
			}
		}

		function onViewportChange() {
			updatePlacement();
		}

		document.addEventListener('pointerdown', onPointerDown, true);
		window.addEventListener('keydown', onKeyDown);
		window.addEventListener('resize', onViewportChange, { passive: true });
		window.addEventListener('scroll', onViewportChange, { passive: true });

		return () => {
			document.removeEventListener('pointerdown', onPointerDown, true);
			window.removeEventListener('keydown', onKeyDown);
			window.removeEventListener('resize', onViewportChange);
			window.removeEventListener('scroll', onViewportChange);
		};
	});
</script>

<div
	bind:this={rootEl}
	class="sf-popover {className}"
	{style}
	style:--popover-offset="{offset}px"
	{...restProps}
>
	<div class="sf-popover-trigger">
		{@render trigger(toggle, open, ariaProps)}
	</div>

	{#if open}
		<div
			bind:this={panelEl}
			id={panelId}
			role="region"
			aria-label={ariaLabel}
			tabindex="-1"
			class="sf-popover-panel align-{align} placement-{resolvedPlacement} {panelClass}"
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
	.sf-popover {
		position: relative;
		display: inline-flex;
		box-sizing: border-box;
		vertical-align: middle;
	}

	.sf-popover-trigger {
		display: inline-flex;
		box-sizing: border-box;
	}

	.sf-popover-panel {
		position: absolute;
		z-index: var(--layer-popover, 70);
		box-sizing: border-box;
		max-width: calc(100vw - var(--space-md) * 2);
		max-height: calc(100vh - var(--space-md) * 2);
		overflow: auto;
		outline: none;
	}

	/* Alinhamentos Horizontais */
	.align-start {
		left: 0;
		right: auto;
	}

	.align-end {
		right: 0;
		left: auto;
	}

	.align-center {
		left: 50%;
		right: auto;
	}

	/* Posicionamento Vertical & Animações */
	.placement-bottom {
		top: calc(100% + var(--popover-offset, 4px));
		bottom: auto;
	}

	.placement-bottom:not(.align-center) {
		animation: sf-popover-in-bottom var(--transition-fast) cubic-bezier(0.16, 1, 0.3, 1);
	}

	.placement-bottom.align-center {
		transform: translateX(-50%);
		animation: sf-popover-in-bottom-center var(--transition-fast) cubic-bezier(0.16, 1, 0.3, 1);
	}

	.placement-top {
		bottom: calc(100% + var(--popover-offset, 4px));
		top: auto;
	}

	.placement-top:not(.align-center) {
		animation: sf-popover-in-top var(--transition-fast) cubic-bezier(0.16, 1, 0.3, 1);
	}

	.placement-top.align-center {
		transform: translateX(-50%);
		animation: sf-popover-in-top-center var(--transition-fast) cubic-bezier(0.16, 1, 0.3, 1);
	}

	@keyframes sf-popover-in-bottom {
		from {
			opacity: 0;
			transform: translateY(-4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes sf-popover-in-bottom-center {
		from {
			opacity: 0;
			transform: translate(-50%, -4px);
		}
		to {
			opacity: 1;
			transform: translate(-50%, 0);
		}
	}

	@keyframes sf-popover-in-top {
		from {
			opacity: 0;
			transform: translateY(4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes sf-popover-in-top-center {
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
		.sf-popover-panel {
			animation: none !important;
		}
	}
</style>
