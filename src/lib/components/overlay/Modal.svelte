<script lang="ts">
	import { untrack, onDestroy } from 'svelte';
	import type { ModalProps } from '$lib/types/overlay.js';
	import { overlayStack } from '$lib/utils/overlay.svelte.js';
	import { getI18n } from '$lib/utils/i18n.svelte.js';
	import X from '$lib/components/icons/X.svelte';

	let {
		open = $bindable(false),
		size = 'md',
		scrollable = false,
		title,
		ariaLabel,
		closeOnEscape = true,
		closeOnClickOutside = true,
		closeOnBack = false,
		showCloseButton = true,
		closeLabel,
		beforeClose,
		header,
		children,
		footer,
		onclose,
		class: className = '',
		style = '',
		...restProps
	}: ModalProps = $props();

	const i18n = getI18n();
	const modalId = $props.id();
	const titleId = `${modalId}-title`;

	let dialogEl = $state<HTMLDialogElement>();
	let previousActiveElement = $state<HTMLElement | null>(null);
	let isClosing = $state(false);
	let closeTimeoutId: ReturnType<typeof setTimeout> | null = null;

	function close() {
		if (isClosing) return;

		if (beforeClose && !beforeClose()) {
			open = true;
			return;
		}

		const prefersReducedMotion =
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (prefersReducedMotion || !dialogEl?.open) {
			open = false;
			overlayStack.unregister(modalId);
			if (dialogEl?.open) {
				dialogEl.close();
			}
			onclose?.();
			return;
		}

		isClosing = true;
		overlayStack.unregister(modalId);

		closeTimeoutId = setTimeout(() => {
			isClosing = false;
			open = false;
			if (dialogEl?.open) {
				dialogEl.close();
			}
			onclose?.();
			closeTimeoutId = null;
		}, 250);
	}

	$effect(() => {
		if (typeof window === 'undefined' || !dialogEl) return;

		if (open) {
			if (closeTimeoutId) {
				clearTimeout(closeTimeoutId);
				closeTimeoutId = null;
			}
			isClosing = false;
			previousActiveElement = document.activeElement as HTMLElement | null;

			if (!dialogEl.open) {
				dialogEl.showModal();
			}

			overlayStack.register({
				id: modalId,
				type: 'modal',
				element: dialogEl,
				close,
				closeOnEscape,
				closeOnClickOutside,
				closeOnBack,
				restoreFocusEl: previousActiveElement
			});
		} else {
			const currentlyClosing = untrack(() => isClosing);
			if (dialogEl.open && !currentlyClosing) {
				if (beforeClose && !beforeClose()) {
					open = true;
					return;
				}
				close();
			}
		}
	});

	onDestroy(() => {
		if (closeTimeoutId) {
			clearTimeout(closeTimeoutId);
			closeTimeoutId = null;
		}
		overlayStack.unregister(modalId);
		if (dialogEl?.open) {
			dialogEl.close();
		}
	});

	function handleDialogClick(e: MouseEvent) {
		// O elemento <dialog> recebe o clique direto quando o usuário clica na área do ::backdrop
		if (e.target === dialogEl && closeOnClickOutside) {
			// Se um popover/select interno foi fechado neste mesmo gesto, consome e protege o modal
			if (overlayStack.consumeChildDismiss()) return;

			// Se o elemento ativo for um input ou textarea dentro do modal, o primeiro clique no backdrop
			// apenas desfaz o foco (recolhe o teclado virtual no mobile) e preserva o modal aberto
			const activeEl = document.activeElement;
			if (
				activeEl &&
				dialogEl.contains(activeEl) &&
				(activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')
			) {
				(activeEl as HTMLElement).blur();
				return;
			}

			if (!overlayStack.isTop(modalId)) return;
			close();
		}
	}

	function handleCancel(e: Event) {
		e.preventDefault();

		if (!overlayStack.isTop(modalId) || !closeOnEscape) {
			return;
		}

		close();
	}
</script>

<dialog
	bind:this={dialogEl}
	id={modalId}
	class="modal-dialog {size} {className}"
	class:is-closing={isClosing}
	class:closing={isClosing}
	aria-labelledby={title ? titleId : undefined}
	aria-label={!title ? ariaLabel || i18n.t('document.title') : undefined}
	onclick={handleDialogClick}
	oncancel={handleCancel}
	{style}
	{...restProps}
>
	<div class="modal-card">
		{#if header || title || showCloseButton}
			<header class="modal-header">
				{#if title}
					<h2 id={titleId} class="modal-title">{title}</h2>
				{/if}

				{#if header}
					{@render header(close)}
				{:else if showCloseButton}
					<button
						type="button"
						class="modal-close-btn"
						aria-label={closeLabel || i18n.t('dialog.close')}
						onclick={close}
					>
						<X size={16} />
					</button>
				{/if}
			</header>
		{/if}

		{#if children}
			<div class="modal-body" class:scrollable>
				{@render children(close)}
			</div>
		{/if}

		{#if footer}
			<footer class="modal-footer">
				{@render footer(close)}
			</footer>
		{/if}
	</div>
</dialog>

<style>
	.modal-dialog {
		margin: auto;
		padding: 0;
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-xs);
		background-color: var(--bg-elevated);
		color: var(--text-primary);
		box-shadow: var(--shadow-lg);
		box-sizing: border-box;
		overflow: visible;
		max-height: calc(100dvh - var(--space-xl) * 2);
	}

	.modal-dialog::backdrop {
		background-color: var(--bg-overlay);
		backdrop-filter: var(--blur-overlay);
	}

	.modal-dialog[open]:not(.is-closing)::backdrop {
		animation: backdrop-in var(--duration-base) var(--ease-standard);
	}

	.modal-dialog[open].is-closing::backdrop {
		animation: backdrop-out var(--duration-base) var(--ease-standard) forwards;
	}

	.modal-dialog[open]:not(.is-closing) {
		display: flex;
		flex-direction: column;
		animation: modal-in var(--duration-base) var(--ease-decelerate);
	}

	.modal-dialog[open].is-closing,
	.modal-dialog[open].closing {
		display: flex;
		flex-direction: column;
		animation: modal-out var(--duration-base) var(--ease-standard) forwards;
		pointer-events: none;
	}

	.modal-dialog[open].is-closing *,
	.modal-dialog[open].closing * {
		pointer-events: none;
	}

	/* Larguras padronizadas baseadas na escala fluida */
	.sm {
		width: min(calc(var(--base) * 22), calc(100vw - var(--space-md) * 2));
	}

	.md {
		width: min(calc(var(--base) * 32), calc(100vw - var(--space-md) * 2));
	}

	.lg {
		width: min(calc(var(--base) * 44), calc(100vw - var(--space-md) * 2));
	}

	.xl {
		width: min(calc(var(--base) * 58), calc(100vw - var(--space-md) * 2));
	}

	.full {
		width: calc(100vw - var(--space-md) * 2);
		height: calc(100vh - var(--space-md) * 2);
		max-height: none;
	}

	.modal-card {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		overflow: visible;
	}

	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-sm);
		padding: var(--space-sm) var(--space-md);
		border-bottom: var(--border-width) solid var(--border-color);
		border-top-left-radius: var(--radius-xs);
		border-top-right-radius: var(--radius-xs);
		background-color: var(--bg-primary);
		box-sizing: border-box;
		flex-shrink: 0;
	}

	.modal-title {
		margin: 0;
		font-family: var(--font-sans);
		font-size: var(--text-base);
		font-weight: 600;
		color: var(--text-primary);
		line-height: 1.25;
	}

	.modal-close-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: var(--control-height-sm);
		height: var(--control-height-sm);
		padding: 0;
		margin: 0;
		border: var(--border-width) solid transparent;
		border-radius: var(--radius-xs);
		background-color: transparent;
		color: var(--color-danger);
		cursor: pointer;
		transition:
			background-color var(--transition-fast),
			color var(--transition-fast),
			border-color var(--transition-fast);
		flex-shrink: 0;
	}

	.modal-close-btn:hover {
		background-color: var(--color-danger);
		color: var(--color-on-solid);
		border-color: var(--color-danger);
	}

	.modal-close-btn:focus-visible {
		outline: var(--focus-ring-width) solid var(--focus-ring-color);
		outline-offset: 1px;
	}

	.modal-body {
		position: relative;
		z-index: 2;
		padding: var(--space-md);
		overflow: visible;
		flex: 1 1 auto;
		box-sizing: border-box;
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		color: var(--text-primary);
		line-height: 1.5;
	}

	.modal-body.scrollable {
		overflow-y: auto;
		overflow-x: hidden;
	}

	.modal-footer {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: var(--space-xs);
		padding: var(--space-sm) var(--space-md);
		border-top: var(--border-width) solid var(--border-color);
		border-bottom-left-radius: var(--radius-xs);
		border-bottom-right-radius: var(--radius-xs);
		background-color: var(--bg-primary);
		box-sizing: border-box;
		flex-shrink: 0;
	}

	@keyframes modal-in {
		from {
			opacity: 0;
			transform: scale(0.97);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes modal-out {
		from {
			opacity: 1;
			transform: scale(1);
		}
		to {
			opacity: 0;
			transform: scale(0.97);
		}
	}

	@keyframes backdrop-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes backdrop-out {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.modal-dialog[open],
		.modal-dialog[open].is-closing {
			animation: none;
		}

		.modal-dialog[open]::backdrop,
		.modal-dialog[open].is-closing::backdrop {
			animation: none;
		}
	}
</style>
