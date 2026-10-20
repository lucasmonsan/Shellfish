<script lang="ts">
	import type { ModalProps } from '$lib/types/overlay.js';
	import { overlayStack } from '$lib/utils/overlay.svelte.js';
	import { getI18n } from '$lib/utils/i18n.svelte.js';
	import X from '$lib/components/icons/X.svelte';

	let {
		open = $bindable(false),
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
	}: ModalProps = $props();

	const i18n = getI18n();
	const modalId = $props.id();
	const titleId = `${modalId}-title`;

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
			overlayStack.unregister(modalId);
			if (dialogEl.open) {
				dialogEl.close();
			}
		}

		return () => {
			overlayStack.unregister(modalId);
			if (dialogEl?.open) {
				dialogEl.close();
			}
		};
	});

	function handleDialogClick(e: MouseEvent) {
		// O elemento <dialog> recebe o clique direto quando o usuário clica na área do ::backdrop
		if (e.target === dialogEl && closeOnClickOutside) {
			// Se houver um popover interno aberto no topo, não fecha o modal
			if (!overlayStack.isTop(modalId)) return;
			close();
		}
	}

	function handleCancel(e: Event) {
		// Cancela o fechamento nativo se houver um overlay interno no topo (ex: Select)
		if (!overlayStack.isTop(modalId)) {
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
	id={modalId}
	class="modal-dialog {size} {className}"
	aria-labelledby={title ? titleId : undefined}
	aria-label={!title ? ariaLabel || i18n.t('document.title') : undefined}
	onclick={handleDialogClick}
	oncancel={handleCancel}
	{style}
	{...restProps}
>
	<div class="modal-card">
		{#if header}
			{@render header(close)}
		{:else if title || showCloseButton}
			<header class="modal-header">
				{#if title}
					<h2 id={titleId} class="modal-title">{title}</h2>
				{/if}

				{#if showCloseButton}
					<button
						type="button"
						class="modal-close-btn"
						aria-label={i18n.t('dialog.close')}
						onclick={close}
					>
						<X size={16} />
					</button>
				{/if}
			</header>
		{/if}

		{#if children}
			<div class="modal-body">
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
		overflow: hidden;
		max-height: calc(100vh - var(--space-xl) * 2);
	}

	.modal-dialog::backdrop {
		background-color: var(--bg-overlay);
		backdrop-filter: var(--blur-overlay);
	}

	.modal-dialog[open] {
		display: flex;
		flex-direction: column;
		animation: modal-in var(--transition-fast) cubic-bezier(0.16, 1, 0.3, 1);
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
		overflow: hidden;
	}

	.modal-header {
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

	.modal-close-btn:hover {
		background-color: var(--bg-secondary);
		color: var(--text-primary);
		border-color: var(--border-color);
	}

	.modal-close-btn:focus-visible {
		outline: var(--focus-ring-width) solid var(--focus-ring-color);
		outline-offset: 1px;
	}

	.modal-body {
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

	.modal-footer {
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

	@media (prefers-reduced-motion: reduce) {
		.modal-dialog[open] {
			animation: none;
		}
	}
</style>
