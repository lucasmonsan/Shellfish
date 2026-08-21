<script lang="ts">
	import type { DialogProps } from '$lib/types/index.js';
	import { t } from '$lib/utils/i18n.svelte.js';

	let {
		open = $bindable(false),
		title,
		children,
		footer,
		size = 'md',
		closeOnOutsideClick = true,
		closeLabel,
		onclose,
		class: className,
		...restProps
	}: DialogProps = $props();

	let dialogEl = $state<HTMLDialogElement>();
	let isClosing = $state(false);

	$effect(() => {
		if (!dialogEl) return;

		if (open && !dialogEl.open && !isClosing) {
			dialogEl.showModal();
		} else if (!open && dialogEl.open && !isClosing) {
			requestClose();
		}
	});

	function requestClose() {
		if (isClosing || !dialogEl?.open) return;
		isClosing = true;

		setTimeout(() => {
			if (dialogEl?.open) {
				dialogEl.close();
			}
			isClosing = false;
			open = false;
			onclose?.();
		}, 180);
	}

	function handleNativeClose() {
		isClosing = false;
		open = false;
		onclose?.();
	}

	function handleCancel(e: Event) {
		e.preventDefault();
		requestClose();
	}

	function handleBackdropClick(e: MouseEvent) {
		if (!closeOnOutsideClick || !dialogEl || isClosing) return;
		const rect = dialogEl.getBoundingClientRect();
		const isInDialog =
			rect.top <= e.clientY &&
			e.clientY <= rect.top + rect.height &&
			rect.left <= e.clientX &&
			e.clientX <= rect.left + rect.width;

		if (!isInDialog) {
			requestClose();
		}
	}
</script>

<dialog
	bind:this={dialogEl}
	data-size={size}
	data-closing={isClosing ? 'true' : undefined}
	class={className}
	oncancel={handleCancel}
	onclose={handleNativeClose}
	onclick={handleBackdropClick}
	{...restProps}
>
	{#if title}
		<header>
			<h3>{title}</h3>
			<button
				type="button"
				class="close-button"
				aria-label={closeLabel ?? t('dialog.close')}
				onclick={requestClose}
			>
				<svg
					viewBox="0 0 16 16"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
				>
					<line x1="4" y1="4" x2="12" y2="12" />
					<line x1="12" y1="4" x2="4" y2="12" />
				</svg>
			</button>
		</header>
	{/if}

	<div class="dialog-body">
		{@render children?.()}
	</div>

	{#if footer}
		<footer>
			{@render footer()}
		</footer>
	{/if}
</dialog>

<style>
	dialog {
		position: fixed;
		inset: 0;
		margin: auto;
		padding: 0;
		box-sizing: border-box;
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		background-color: var(--bg-primary);
		color: var(--text-primary);
		box-shadow: 4px 4px 0px var(--border-color);
		outline: none;
		max-height: 85vh;
		max-height: 85dvh;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	dialog[open] {
		animation: dialogPopIn 0.22s cubic-bezier(0.34, 1.25, 0.64, 1) forwards;
	}

	dialog[open]::backdrop {
		animation: backdropFadeIn 0.2s ease forwards;
	}

	dialog[open][data-closing='true'] {
		animation: dialogPopOut 0.18s cubic-bezier(0.4, 0, 1, 1) forwards;
	}

	dialog[open][data-closing='true']::backdrop {
		animation: backdropFadeOut 0.18s ease forwards;
	}

	dialog::backdrop {
		background-color: rgba(28, 25, 23, 0.65);
	}

	@keyframes dialogPopIn {
		from {
			opacity: 0;
			transform: scale(0.92) translateY(14px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	@keyframes dialogPopOut {
		from {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
		to {
			opacity: 0;
			transform: scale(0.94) translateY(10px);
		}
	}

	@keyframes backdropFadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes backdropFadeOut {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	dialog:not([open]) {
		display: none;
	}

	/* Tamanhos */
	dialog[data-size='sm'] {
		width: min(400px, 92vw);
	}

	dialog[data-size='md'] {
		width: min(560px, 92vw);
	}

	dialog[data-size='lg'] {
		width: min(760px, 92vw);
	}

	dialog[data-size='full'] {
		width: 94vw;
		height: 90vh;
		height: 90dvh;
	}

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-sm) var(--space-md);
		border-bottom: var(--border-width) solid var(--border-color);
		background-color: var(--bg-secondary);
		flex-shrink: 0;
	}

	h3 {
		margin: 0;
		font-family: var(--font-display);
		font-size: var(--text-base);
		font-weight: 700;
	}

	.close-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 4px;
		color: var(--text-secondary);
		border-radius: var(--radius-sm);
		transition: color 0.15s ease;
	}

	.close-button:hover {
		color: var(--text-primary);
	}

	.dialog-body {
		padding: var(--space-md);
		overflow-y: auto;
		flex: 1;
	}

	footer {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: var(--space-sm);
		padding: var(--space-sm) var(--space-md);
		border-top: var(--border-width) solid var(--border-color);
		background-color: var(--bg-secondary);
		flex-shrink: 0;
	}

	svg {
		width: 16px;
		height: 16px;
	}

	@media (prefers-reduced-motion: reduce) {
		dialog[open],
		dialog[open]::backdrop,
		dialog[open][data-closing='true'],
		dialog[open][data-closing='true']::backdrop {
			animation: none;
		}
	}
</style>
