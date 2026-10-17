<script lang="ts">
	import type { CheckboxProps } from '$lib/types/forms.js';

	let {
		checked = $bindable(false),
		indeterminate = $bindable(false),
		label,
		size = 'md',
		invalid = false,
		disabled = false,
		children,
		class: className,
		...restProps
	}: CheckboxProps = $props();

	let inputEl = $state<HTMLInputElement>();

	$effect(() => {
		if (inputEl) {
			inputEl.indeterminate = indeterminate;
		}
	});
</script>

<label
	class="checkbox-root {size} {className ?? ''}"
	class:checked
	class:indeterminate
	class:invalid
	class:disabled
>
	<input
		bind:this={inputEl}
		type="checkbox"
		bind:checked
		{disabled}
		aria-invalid={invalid ? 'true' : undefined}
		{...restProps}
	/>
	<span class="indicator" aria-hidden="true">
		{#if indeterminate}
			<svg
				viewBox="0 0 16 16"
				fill="none"
				stroke="currentColor"
				stroke-width="2.5"
				stroke-linecap="round"
			>
				<line x1="3.5" y1="8" x2="12.5" y2="8" />
			</svg>
		{:else if checked}
			<svg
				viewBox="0 0 16 16"
				fill="none"
				stroke="currentColor"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
			</svg>
		{/if}
	</span>

	{#if children}
		<span class="label-text">
			{@render children()}
		</span>
	{:else if label}
		<span class="label-text">{label}</span>
	{/if}
</label>

<style>
	.checkbox-root {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
		cursor: pointer;
		user-select: none;
		font-family: var(--font-sans);
		color: var(--text-primary);
		vertical-align: middle;
		position: relative;
		line-height: var(--leading-normal);
	}

	.checkbox-root.disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	input[type='checkbox'] {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
		margin: 0;
		pointer-events: none;
	}

	.indicator {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-xs);
		background-color: var(--bg-primary);
		color: var(--color-on-solid);
		flex-shrink: 0;
		transition:
			background-color 0.15s ease,
			border-color 0.15s ease,
			box-shadow 0.15s ease;
	}

	/* Escala de tamanhos */
	.checkbox-root.sm {
		font-size: var(--text-xs);
	}
	.checkbox-root.sm .indicator {
		width: calc(var(--base) * 0.875);
		height: calc(var(--base) * 0.875);
	}
	.checkbox-root.sm .indicator svg {
		width: calc(var(--base) * 0.625);
		height: calc(var(--base) * 0.625);
	}

	.checkbox-root.md {
		font-size: var(--text-sm);
	}
	.checkbox-root.md .indicator {
		width: var(--base);
		height: var(--base);
	}
	.checkbox-root.md .indicator svg {
		width: calc(var(--base) * 0.75);
		height: calc(var(--base) * 0.75);
	}

	.checkbox-root.lg {
		font-size: var(--text-md);
	}
	.checkbox-root.lg .indicator {
		width: calc(var(--base) * 1.25);
		height: calc(var(--base) * 1.25);
	}
	.checkbox-root.lg .indicator svg {
		width: var(--base);
		height: var(--base);
	}

	/* Interações */
	.checkbox-root:hover:not(.disabled) .indicator {
		border-color: var(--color-primary);
	}

	.checkbox-root:has(input:focus-visible):not(.disabled) .indicator {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 1px var(--color-primary);
		outline: none;
	}

	.checkbox-root.checked .indicator,
	.checkbox-root.indeterminate .indicator {
		background-color: var(--color-primary);
		border-color: var(--color-primary);
	}

	.checkbox-root.invalid .indicator {
		border-color: var(--color-danger);
	}

	.checkbox-root.invalid:has(input:focus-visible):not(.disabled) .indicator {
		border-color: var(--color-danger);
		box-shadow: 0 0 0 1px var(--color-danger);
	}

	.checkbox-root.invalid.checked .indicator,
	.checkbox-root.invalid.indeterminate .indicator {
		background-color: var(--color-danger);
		border-color: var(--color-danger);
	}

	.label-text {
		display: inline-block;
	}

	@media (prefers-reduced-motion: reduce) {
		.indicator {
			transition: none;
		}
	}
</style>
