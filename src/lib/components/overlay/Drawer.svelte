<script lang="ts">
	import type { DrawerProps } from '$lib/types/overlay.js';
	import { overlayStack } from '$lib/utils/overlay.svelte.js';
	import { getI18n } from '$lib/utils/i18n.svelte.js';
	import X from '$lib/components/icons/X.svelte';

	let {
		open = $bindable(false),
		placement = 'right',
		size = 'md',
		title,
		ariaLabel,
		closeOnEscape = true,
		closeOnClickOutside = true,
		closeOnBack = false,
		showCloseButton = true,
		header,
		children,
		footer,
		onclose,
		class: className = '',
		style = '',
		...restProps
	}: DrawerProps = $props();

	const i18n = getI18n();
	const drawerId = $props.id();
	const titleId = `${drawerId}-title`;

	let dialogEl = $state<HTMLDialogElement>();
	let previousActiveElement = $state<HTMLElement | null>(null);

	function close() {
		open = false;
		onclose?.();
	}

	$effect(() => {
		if (typeof window === 'undefined' || !dialogEl) return;

		if (open) {
			previousActiveElement = document.activeElement as HTMLElement | null;

			if (!dialogEl.open) {
				dialogEl.showModal();
			}

			overlayStack.register({
				id: drawerId,
				type: 'drawer',
				element: dialogEl,
				close,
				closeOnEscape,
				closeOnClickOutside,
				closeOnBack,
				restoreFocusEl: previousActiveElement
			});
		} else {
			overlayStack.unregister(drawerId);
			if (dialogEl.open) {
				dialogEl.close();
			}
		}

		return () => {
			overlayStack.unregister(drawerId);
			if (dialogEl?.open) {
				dialogEl.close();
			}
		};
	});

	function handleDialogClick(e: MouseEvent) {
		if (e.target === dialogEl && closeOnClickOutside) {
			if (!overlayStack.isTop(drawerId)) return;
			close();
		}
	}

	function handleCancel(e: Event) {
		if (!overlayStack.isTop(drawerId)) {
			e.preventDefault();
			return;
		}

		if (!closeOnEscape) {
			e.preventDefault();
			return;
		}

		close();
	}
</script>

<dialog
	bind:this={dialogEl}
	id={drawerId}
	class="drawer-dialog placement-{placement} {size} {className}"
	aria-labelledby={title ? titleId : undefined}
	aria-label={!title ? ariaLabel || i18n.t('document.title') : undefined}
	onclick={handleDialogClick}
	oncancel={handleCancel}
	{style}
	{...restProps}
>
	<div class="drawer-card">
		{#if header}
			{@render header(close)}
		{:else if title || showCloseButton}
			<header class="drawer-header">
				{#if title}
					<h2 id={titleId} class="drawer-title">{title}</h2>
				{/if}

				{#if showCloseButton}
					<button
						type="button"
						class="drawer-close-btn"
						aria-label={i18n.t('dialog.close')}
						onclick={close}
					>
						<X size={16} />
					</button>
				{/if}
			</header>
		{/if}

		{#if children}
			<div class="drawer-body">
				{@render children(close)}
			</div>
		{/if}

		{#if footer}
			<footer class="drawer-footer">
				{@render footer(close)}
			</footer>
		{/if}
	</div>
</dialog>

<style>
	.drawer-dialog {
		position: fixed;
		top: 0;
		bottom: 0;
		height: 100vh;
		max-height: 100vh;
		margin: 0;
		padding: 0;
		border: none;
		background-color: var(--bg-elevated);
		color: var(--text-primary);
		box-shadow: var(--shadow-lg);
		box-sizing: border-box;
		overflow: hidden;
	}

	.drawer-dialog::backdrop {
		background-color: var(--bg-overlay);
		backdrop-filter: var(--blur-overlay);
	}

	.drawer-dialog[open] {
		display: flex;
		flex-direction: column;
	}

	/* Posicionamento Lateral */
	.placement-right {
		right: 0;
		left: auto;
		border-left: var(--border-width) solid var(--border-color);
		animation: drawer-in-right var(--transition-base) cubic-bezier(0.16, 1, 0.3, 1);
	}

	.placement-left {
		left: 0;
		right: auto;
		border-right: var(--border-width) solid var(--border-color);
		animation: drawer-in-left var(--transition-base) cubic-bezier(0.16, 1, 0.3, 1);
	}

	/* Larguras padronizadas baseadas na escala fluida */
	.sm {
		width: min(calc(var(--base) * 20), 100vw);
	}

	.md {
		width: min(calc(var(--base) * 28), 100vw);
	}

	.lg {
		width: min(calc(var(--base) * 38), 100vw);
	}

	.full {
		width: 100vw;
	}

	.drawer-card {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		overflow: hidden;
	}

	.drawer-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-md);
		padding: var(--space-md) var(--space-lg);
		border-bottom: var(--border-width) solid var(--border-color);
		background-color: var(--bg-primary);
		box-sizing: border-box;
		flex-shrink: 0;
	}

	.drawer-title {
		margin: 0;
		font-family: var(--font-sans);
		font-size: var(--text-base);
		font-weight: 600;
		color: var(--text-primary);
		line-height: 1.25;
	}

	.drawer-close-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: var(--space-xl);
		height: var(--space-xl);
		padding: 0;
		margin: 0;
		border: 1px solid transparent;
		border-radius: var(--radius-xs);
		background-color: transparent;
		color: var(--text-secondary);
		cursor: pointer;
		transition:
			background-color var(--transition-fast),
			color var(--transition-fast);
		flex-shrink: 0;
	}

	.drawer-close-btn:hover {
		background-color: var(--bg-secondary);
		color: var(--text-primary);
		border-color: var(--border-color);
	}

	.drawer-close-btn:focus-visible {
		outline: var(--focus-ring-width) solid var(--focus-ring-color);
		outline-offset: 1px;
	}

	.drawer-body {
		padding: var(--space-lg);
		overflow-y: auto;
		overflow-x: hidden;
		flex: 1 1 auto;
		box-sizing: border-box;
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		color: var(--text-primary);
		line-height: 1.5;
	}

	.drawer-footer {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: var(--space-sm);
		padding: var(--space-md) var(--space-lg);
		border-top: var(--border-width) solid var(--border-color);
		background-color: var(--bg-primary);
		box-sizing: border-box;
		flex-shrink: 0;
	}

	@keyframes drawer-in-right {
		from {
			transform: translateX(100%);
		}
		to {
			transform: translateX(0);
		}
	}

	@keyframes drawer-in-left {
		from {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.placement-right,
		.placement-left {
			animation: none;
		}
	}
</style>
