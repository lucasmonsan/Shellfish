<script lang="ts">
	import type { SliderProps } from '$lib/types/index.js';

	let {
		value = $bindable(0),
		min = 0,
		max = 100,
		step = 1,
		label,
		size = 'md',
		showValue = true,
		valueSuffix = '',
		invalid = false,
		disabled = false,
		id,
		class: className,
		...restProps
	}: SliderProps = $props();

	const autoId = `slider-${Math.random().toString(36).slice(2, 9)}`;
	let sliderId = $derived(id || autoId);

	let percent = $derived.by(() => {
		const numVal = typeof value === 'number' ? value : Number(value || 0);
		const numMin = typeof min === 'number' ? min : Number(min || 0);
		const numMax = typeof max === 'number' ? max : Number(max || 100);
		if (numMax <= numMin) return 0;
		return Math.min(100, Math.max(0, ((numVal - numMin) / (numMax - numMin)) * 100));
	});
</script>

<div
	class={`shellfish-slider-wrapper ${className ?? ''}`}
	data-size={size}
	data-invalid={invalid}
	data-disabled={disabled}
>
	{#if label}
		<div class="slider-header">
			<label for={sliderId} class="slider-label">{label}</label>
		</div>
	{/if}

	<div class="slider-track-container">
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
		{#if showValue}
			<div
				class="slider-thumb-bubble slider-value-display"
				style:left={`calc(${percent}% + ${(50 - percent) * 0.22}px)`}
			>
				{value}{valueSuffix}
			</div>
		{/if}
	</div>
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

	.slider-track-container {
		position: relative;
		display: flex;
		align-items: center;
		width: 100%;
		padding-top: var(--space-xs);
	}

	.slider-thumb-bubble {
		position: absolute;
		top: -14px;
		transform: translateX(-50%);
		font-family: var(--font-display);
		font-size: var(--text-xs);
		font-weight: 800;
		line-height: 1;
		color: var(--color-primary-contrast);
		background-color: var(--color-primary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-sm);
		padding: 1px 4px;
		box-shadow: 1px 1px 0px var(--border-color);
		pointer-events: none;
		user-select: none;
		white-space: nowrap;
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
		transform: scale(1.1);
		box-shadow: 2px 2px 0px var(--border-color);
	}

	input[type='range']:hover:not(:disabled)::-moz-range-thumb {
		transform: scale(1.1);
		box-shadow: 2px 2px 0px var(--border-color);
	}

	input[type='range']:focus-visible::-webkit-slider-thumb {
		box-shadow: 3px 3px 0px var(--border-color);
	}

	input[type='range']:focus-visible::-moz-range-thumb {
		box-shadow: 3px 3px 0px var(--border-color);
	}

	/* Tamanhos */
	.shellfish-slider-wrapper[data-size='sm'] input[type='range']::-webkit-slider-runnable-track {
		height: 6px;
	}
	.shellfish-slider-wrapper[data-size='sm'] input[type='range']::-webkit-slider-thumb {
		width: 14px;
		height: 14px;
		margin-top: -5px;
	}
	.shellfish-slider-wrapper[data-size='sm'] input[type='range']::-moz-range-track {
		height: 6px;
	}
	.shellfish-slider-wrapper[data-size='sm'] input[type='range']::-moz-range-thumb {
		width: 14px;
		height: 14px;
	}

	.shellfish-slider-wrapper[data-size='lg'] input[type='range']::-webkit-slider-runnable-track {
		height: 14px;
	}
	.shellfish-slider-wrapper[data-size='lg'] input[type='range']::-webkit-slider-thumb {
		width: 24px;
		height: 24px;
		margin-top: -7px;
	}
	.shellfish-slider-wrapper[data-size='lg'] input[type='range']::-moz-range-track {
		height: 14px;
	}
	.shellfish-slider-wrapper[data-size='lg'] input[type='range']::-moz-range-thumb {
		width: 24px;
		height: 24px;
	}

	@media (prefers-reduced-motion: reduce) {
		input[type='range']::-webkit-slider-thumb,
		input[type='range']::-moz-range-thumb {
			transition: none;
		}
	}
</style>
