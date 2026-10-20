<script lang="ts">
	import { getContext, hasContext } from 'svelte';
	import { RADIO_GROUP_KEY, type RadioProps } from '$lib/types/forms.js';

	interface RadioGroupContext {
		readonly name?: string;
		readonly value?: unknown;
		readonly disabled?: boolean;
		readonly invalid?: boolean;
		readonly size?: 'sm' | 'md' | 'lg';
		select: (val: unknown) => void;
	}

	let {
		group = $bindable(),
		value,
		label,
		name,
		size,
		invalid = false,
		disabled = false,
		children,
		class: className,
		...restProps
	}: RadioProps = $props();

	const groupCtx = hasContext(RADIO_GROUP_KEY)
		? getContext<RadioGroupContext>(RADIO_GROUP_KEY)
		: undefined;

	let resolvedName = $derived(name ?? groupCtx?.name);
	let resolvedDisabled = $derived(disabled || Boolean(groupCtx?.disabled));
	let resolvedInvalid = $derived(invalid || Boolean(groupCtx?.invalid));
	let resolvedSize = $derived(size ?? groupCtx?.size ?? 'md');

	let isChecked = $derived(
		groupCtx !== undefined
			? groupCtx.value !== undefined && value !== undefined && groupCtx.value === value
			: group !== undefined && value !== undefined && group === value
	);

	function handleChange() {
		if (groupCtx) {
			groupCtx.select(value);
		}
	}
</script>

<label
	class="radio-root {resolvedSize} {className ?? ''}"
	class:checked={isChecked}
	class:invalid={resolvedInvalid}
	class:disabled={resolvedDisabled}
>
	{#if groupCtx}
		<input
			type="radio"
			name={resolvedName}
			{value}
			checked={isChecked}
			disabled={resolvedDisabled}
			onchange={handleChange}
			{...restProps}
		/>
	{:else}
		<input
			type="radio"
			name={resolvedName}
			bind:group
			{value}
			disabled={resolvedDisabled}
			{...restProps}
		/>
	{/if}

	<span class="indicator" aria-hidden="true">
		<span class="dot"></span>
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
	.radio-root {
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

	.radio-root.disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	input[type='radio'] {
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
		flex-shrink: 0;
		transition:
			background-color 0.15s ease,
			border-color 0.15s ease,
			box-shadow 0.15s ease;
	}

	.dot {
		border-radius: 0;
		background-color: var(--color-primary);
		transform: scale(0);
		transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
		flex-shrink: 0;
	}

	/* Escala de tamanhos */
	.radio-root.sm {
		font-size: var(--text-xs);
	}
	.radio-root.sm .indicator {
		width: calc(var(--base) * 0.875);
		height: calc(var(--base) * 0.875);
	}
	.radio-root.sm .dot {
		width: calc(var(--base) * 0.375);
		height: calc(var(--base) * 0.375);
	}

	.radio-root.md {
		font-size: var(--text-sm);
	}
	.radio-root.md .indicator {
		width: var(--base);
		height: var(--base);
	}
	.radio-root.md .dot {
		width: calc(var(--base) * 0.5);
		height: calc(var(--base) * 0.5);
	}

	.radio-root.lg {
		font-size: var(--text-md);
	}
	.radio-root.lg .indicator {
		width: calc(var(--base) * 1.25);
		height: calc(var(--base) * 1.25);
	}
	.radio-root.lg .dot {
		width: calc(var(--base) * 0.625);
		height: calc(var(--base) * 0.625);
	}

	/* Interações */
	.radio-root:hover:not(.disabled) .indicator {
		border-color: var(--border-strong);
	}

	.radio-root:has(input:focus-visible):not(.disabled) .indicator {
		border-color: var(--color-primary);
		outline: none;
	}

	.radio-root.checked .indicator {
		border-color: var(--color-primary);
	}

	.radio-root.checked .dot {
		transform: scale(1);
	}

	.radio-root.invalid .indicator {
		border-color: var(--color-danger);
	}

	.radio-root.invalid:has(input:focus-visible):not(.disabled) .indicator {
		border-color: var(--color-danger);
		outline: none;
	}

	.radio-root.invalid .dot {
		background-color: var(--color-danger);
	}

	.label-text {
		display: inline-block;
	}

	@media (prefers-reduced-motion: reduce) {
		.indicator,
		.dot {
			transition: none;
		}
	}
</style>
