<script lang="ts">
	import type { ToastContainerProps } from '$lib/types/toast.js';
	import { toast } from '$lib/utils/toast.svelte.js';
	import Toast from './Toast.svelte';

	let {
		position = 'top-right',
		class: className = '',
		...restProps
	}: ToastContainerProps = $props();
</script>

<div role="region" aria-live="polite" class="toast-container {position} {className}" {...restProps}>
	{#each toast.items as item (item.id)}
		<Toast toast={item} onDismiss={(id) => toast.dismiss(id)} />
	{/each}
</div>

<style>
	.toast-container {
		position: fixed;
		z-index: var(--layer-toast);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		pointer-events: none;
		box-sizing: border-box;
		max-height: 100vh;
		overflow: visible;
	}

	.toast-container.bottom-right {
		bottom: var(--space-md);
		right: var(--space-md);
		align-items: flex-end;
	}

	.toast-container.bottom-left {
		bottom: var(--space-md);
		left: var(--space-md);
		align-items: flex-start;
	}

	.toast-container.bottom-center {
		bottom: var(--space-md);
		left: 50%;
		transform: translateX(-50%);
		align-items: center;
	}

	.toast-container.top-right {
		top: var(--space-md);
		right: var(--space-md);
		align-items: flex-end;
	}

	.toast-container.top-left {
		top: var(--space-md);
		left: var(--space-md);
		align-items: flex-start;
	}

	.toast-container.top-center {
		top: var(--space-md);
		left: 50%;
		transform: translateX(-50%);
		align-items: center;
	}

	@media (prefers-reduced-motion: reduce) {
		.toast-container {
			transition: none;
		}
	}
</style>
