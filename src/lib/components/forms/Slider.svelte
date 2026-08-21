<script lang="ts">
	import type { SliderProps } from '$lib/types/index.js';

	let {
		value = $bindable(0),
		min = 0,
		max = 100,
		step = 1,
		label,
		size = 'md',
		showValue = false,
		valueSuffix = '',
		invalid = false,
		disabled = false,
		id,
		class: className,
		...restProps
	}: SliderProps = $props();

	const autoId = `slider-${Math.random().toString(36).slice(2, 9)}`;
	let sliderId = $derived(id || autoId);
</script>

<div
	class={`shellfish-slider-wrapper ${className ?? ''}`}
	data-size={size}
	data-invalid={invalid}
	data-disabled={disabled}
>
	{#if label || showValue}
		<div class="slider-header">
			{#if label}
				<label for={sliderId} class="slider-label">{label}</label>
			{/if}
			{#if showValue}
				<span class="slider-value-display">{value}{valueSuffix}</span>
			{/if}
		</div>
	{/if}
	<input
		type="range"
		id={sliderId}
		bind:value
		{min}
		{max}
		{step}
		{disabled}
		aria-invalid={invalid ? 'true' : undefined}
		data-size={size}
		{...restProps}
	/>
</div>

<style>
	.shellfish-slider-wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		width: 100%;
		box-sizing: border-box;
		user-select: none;
	}

	.slider-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-sm);
	}

	.slider-label {
		font-family: var(--font-display);
		font-size: var(--text-xs);
		font-weight: 700;
		text-transform: uppercase;
		color: var(--text-secondary);
		cursor: pointer;
	}

	.slider-value-display {
		font-family: var(--font-display);
		font-size: var(--text-xs);
		font-weight: 800;
		color: var(--text-primary);
		background-color: var(--bg-secondary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		padding: 1px 6px;
		box-shadow: 1px 1px 0px var(--border-color);
	}

	input[type='range'] {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		background: transparent;
		cursor: pointer;
		margin: 0;
		outline: none;
	}

	input[type='range']:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	/* Track */
	input[type='range']::-webkit-slider-runnable-track {
		width: 100%;
		height: 10px;
		box-sizing: border-box;
		background-color: var(--bg-secondary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		box-shadow: 1px 1px 0px var(--border-color);
	}

	input[type='range']::-moz-range-track {
		width: 100%;
		height: 10px;
		box-sizing: border-box;
		background-color: var(--bg-secondary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		box-shadow: 1px 1px 0px var(--border-color);
	}

	/* Thumb */
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 18px;
		height: 18px;
		margin-top: -6px;
		box-sizing: border-box;
		background-color: var(--color-primary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		box-shadow: 1px 1px 0px var(--border-color);
		transition:
			transform 0.12s ease,
			box-shadow 0.12s ease;
	}

	input[type='range']::-moz-range-thumb {
		width: 18px;
		height: 18px;
		box-sizing: border-box;
		background-color: var(--color-primary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		box-shadow: 1px 1px 0px var(--border-color);
		transition:
			transform 0.12s ease,
			box-shadow 0.12s ease;
	}

	/* Hover & Focus */
	input[type='range']:hover:not(:disabled)::-webkit-slider-thumb {
		transform: scale(1.15);
		box-shadow: 2px 2px 0px var(--border-color);
	}

	input[type='range']:hover:not(:disabled)::-moz-range-thumb {
		transform: scale(1.15);
		box-shadow: 2px 2px 0px var(--border-color);
	}

	input[type='range']:focus-visible::-webkit-slider-thumb {
		box-shadow: 3px 3px 0px var(--color-primary);
		transform: translate(-1px, -1px) scale(1.1);
	}

	input[type='range']:focus-visible::-moz-range-thumb {
		box-shadow: 3px 3px 0px var(--color-primary);
		transform: translate(-1px, -1px) scale(1.1);
	}

	@media (prefers-reduced-motion: reduce) {
		input[type='range']::-webkit-slider-thumb,
		input[type='range']::-moz-range-thumb {
			transition: none;
		}
	}
</style>
