<script lang="ts">
	import type { FormStackProps } from '$lib/types/forms.js';

	let {
		gap = 'md',
		onsubmit,
		children,
		class: className = '',
		...restProps
	}: FormStackProps = $props();

	let isSubmitting = $state(false);

	async function handleSubmit(event: SubmitEvent) {
		if (!onsubmit) return;

		event.preventDefault();
		if (isSubmitting) return;

		try {
			const result = onsubmit(event);
			if (result instanceof Promise) {
				isSubmitting = true;
				await result;
			}
		} finally {
			isSubmitting = false;
		}
	}
</script>

<form
	class="form-stack gap-{gap} {className}"
	class:submitting={isSubmitting}
	onsubmit={handleSubmit}
	{...restProps}
>
	{@render children?.()}
</form>

<style>
	form.form-stack {
		display: flex;
		flex-direction: column;
		width: 100%;
		box-sizing: border-box;
	}

	.gap-xs {
		gap: var(--space-xs);
	}

	.gap-sm {
		gap: var(--space-sm);
	}

	.gap-md {
		gap: var(--space-md);
	}

	.gap-lg {
		gap: var(--space-lg);
	}
</style>
