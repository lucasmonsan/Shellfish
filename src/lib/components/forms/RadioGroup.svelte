<script lang="ts">
	import { setContext } from 'svelte';
	import { RADIO_GROUP_KEY, type RadioGroupProps } from '$lib/types/forms.js';

	let {
		value = $bindable(),
		label,
		name,
		orientation = 'vertical',
		gap = 'sm',
		size = 'md',
		invalid = false,
		disabled = false,
		children,
		class: className,
		...restProps
	}: RadioGroupProps = $props();

	setContext(RADIO_GROUP_KEY, {
		get name() {
			return name;
		},
		get value() {
			return value;
		},
		get disabled() {
			return disabled;
		},
		get invalid() {
			return invalid;
		},
		get size() {
			return size;
		},
		select(val: unknown) {
			value = val;
		}
	});
</script>

<div
	role="radiogroup"
	aria-label={label}
	aria-invalid={invalid ? 'true' : undefined}
	aria-orientation={orientation}
	class="radiogroup-root {orientation} gap-{gap} {className ?? ''}"
	class:disabled
	class:invalid
	{...restProps}
>
	{#if label}
		<span class="radiogroup-label">{label}</span>
	{/if}

	<div class="radiogroup-items {orientation} gap-{gap}">
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>

<style>
	.radiogroup-root {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		box-sizing: border-box;
	}

	.radiogroup-label {
		font-family: var(--font-sans);
		font-size: var(--text-xs);
		font-weight: 600;
		color: var(--text-secondary);
		line-height: var(--leading-normal);
	}

	.radiogroup-items {
		display: flex;
		box-sizing: border-box;
	}

	.radiogroup-items.vertical {
		flex-direction: column;
	}

	.radiogroup-items.horizontal {
		flex-direction: row;
		flex-wrap: wrap;
	}

	/* Gaps baseados em tokens */
	.radiogroup-items.gap-xs {
		gap: var(--space-xs);
	}
	.radiogroup-items.gap-sm {
		gap: var(--space-sm);
	}
	.radiogroup-items.gap-md {
		gap: var(--space-md);
	}

	.radiogroup-root.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
