<script lang="ts">
	import type { ToastProps } from '$lib/types/toast.js';
	import { getI18n } from '$lib/utils/i18n.svelte.js';
	import AlertCircle from '$lib/components/icons/AlertCircle.svelte';
	import CheckCircle from '$lib/components/icons/CheckCircle.svelte';
	import Sparkles from '$lib/components/icons/Sparkles.svelte';
	import X from '$lib/components/icons/X.svelte';

	let { toast, onDismiss, class: className = '', ...restProps }: ToastProps = $props();

	const i18n = getI18n();

	let timerId: ReturnType<typeof setTimeout> | null = null;
	let startTime = $state(Date.now());
	let remaining = $state(0);
	let isDismissing = $state(false);

	function triggerDismiss() {
		if (isDismissing) return;
		isDismissing = true;
		if (
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		) {
			onDismiss(toast.id);
			return;
		}
		setTimeout(() => {
			onDismiss(toast.id);
		}, 125);
	}

	function startTimer(duration: number) {
		if (duration <= 0) return;
		startTime = Date.now();
		timerId = setTimeout(() => {
			triggerDismiss();
		}, duration);
	}

	function pauseTimer() {
		if (timerId) {
			clearTimeout(timerId);
			timerId = null;
			remaining -= Date.now() - startTime;
		}
	}

	function resumeTimer() {
		if (remaining > 0) {
			startTimer(remaining);
		}
	}

	$effect(() => {
		remaining = toast.duration;
		startTimer(toast.duration);
		return () => {
			if (timerId) clearTimeout(timerId);
		};
	});
</script>

<div
	role="status"
	class="toast {toast.variant} {className}"
	class:is-dismissing={isDismissing}
	onmouseenter={pauseTimer}
	onmouseleave={resumeTimer}
	onfocusin={pauseTimer}
	onfocusout={resumeTimer}
	{...restProps}
>
	<div class="toast-icon">
		{#if toast.variant === 'success'}
			<CheckCircle size={18} />
		{:else if toast.variant === 'danger' || toast.variant === 'warning' || toast.variant === 'info'}
			<AlertCircle size={18} />
		{:else}
			<Sparkles size={18} />
		{/if}
	</div>

	<div class="toast-body">
		<span class="toast-message">{toast.message}</span>
		{#if toast.action}
			<button
				type="button"
				class="toast-action"
				onclick={() => {
					toast.action?.onClick();
					triggerDismiss();
				}}
			>
				{toast.action.label}
			</button>
		{/if}
	</div>

	{#if toast.dismissible}
		<button
			type="button"
			class="toast-close"
			aria-label={i18n.t('common.close')}
			onclick={triggerDismiss}
		>
			<X size={14} />
		</button>
	{/if}
</div>

<style>
	.toast {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		min-width: calc(var(--base) * 14);
		max-width: calc(var(--base) * 22);
		padding: var(--space-xs) var(--space-sm);
		background-color: var(--bg-elevated);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-xs);
		box-shadow: var(--shadow-lg);
		box-sizing: border-box;
		color: var(--text-primary);
		pointer-events: auto;
		animation: toast-in var(--duration-base) var(--ease-decelerate);
		transition:
			opacity var(--duration-fast) var(--ease-standard),
			transform var(--duration-fast) var(--ease-standard);
	}

	.toast.is-dismissing {
		opacity: 0;
		transform: translateY(-8px) scale(0.96);
		pointer-events: none;
	}

	@keyframes toast-in {
		from {
			opacity: 0;
			transform: translateY(-10px) scale(0.96);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	.toast.success {
		border-left: calc(var(--border-width) * 2) solid var(--color-success);
	}

	.toast.success .toast-icon {
		color: var(--color-success);
	}

	.toast.danger {
		border-left: calc(var(--border-width) * 2) solid var(--color-danger);
	}

	.toast.danger .toast-icon {
		color: var(--color-danger);
	}

	.toast.warning {
		border-left: calc(var(--border-width) * 2) solid var(--color-warning);
	}

	.toast.warning .toast-icon {
		color: var(--color-warning);
	}

	.toast.info {
		border-left: calc(var(--border-width) * 2) solid var(--color-info);
	}

	.toast.info .toast-icon {
		color: var(--color-info);
	}

	.toast.primary {
		border-left: calc(var(--border-width) * 2) solid var(--color-primary);
	}

	.toast.primary .toast-icon {
		color: var(--color-primary);
	}

	.toast-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.toast-body {
		display: flex;
		flex-direction: column;
		gap: var(--space-xxs);
		flex: 1;
		min-width: 0;
	}

	.toast-message {
		font-size: var(--text-sm);
		line-height: var(--leading-normal);
		word-break: break-word;
	}

	.toast-action {
		align-self: flex-start;
		background: none;
		border: none;
		padding: 0;
		color: var(--color-primary);
		font-weight: 600;
		font-size: var(--text-xs);
		cursor: pointer;
		text-decoration: underline;
	}

	.toast-action:hover {
		color: var(--color-primary-hover);
	}

	.toast-close {
		display: flex;
		align-items: center;
		justify-content: center;
		width: calc(var(--base) * 1.2);
		height: calc(var(--base) * 1.2);
		background: none;
		border: none;
		border-radius: var(--radius-xs);
		color: var(--text-secondary);
		cursor: pointer;
		padding: 0;
		flex-shrink: 0;
	}

	.toast-close:hover {
		color: var(--text-primary);
		background-color: var(--bg-hover);
	}

	.toast-close:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 1px;
	}

	@media (prefers-reduced-motion: reduce) {
		.toast {
			animation: none;
			transition: none;
		}
	}
</style>
