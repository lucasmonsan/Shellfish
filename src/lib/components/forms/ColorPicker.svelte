<script lang="ts">
	import type { ColorPickerProps } from '$lib/types/forms.js';
	import Input from './Input.svelte';

	let {
		value = $bindable('#b94b38'),
		size = 'md',
		presets = [
			'#b94b38',
			'#9c3b2a',
			'#2b6140',
			'#e09f2d',
			'#9b2226',
			'#2d2422',
			'#5e544f',
			'#faf6ef'
		],
		showHexInput = true,
		disabled = false,
		invalid = false,
		label = 'Seletor de cor',
		class: className = '',
		...restProps
	}: ColorPickerProps = $props();

	function selectPreset(color: string) {
		if (disabled) return;
		value = color;
	}
</script>

<div class="color-picker-root {size} {className}" class:disabled class:invalid {...restProps}>
	<div class="picker-main">
		<!-- Swatch com input nativo oculto por cima para clique -->
		<label class="swatch-container" style:background-color={value} title={label}>
			<input type="color" bind:value {disabled} aria-label={label} class="native-color-input" />
		</label>

		{#if showHexInput}
			<div class="hex-field">
				<Input
					bind:value
					{size}
					{disabled}
					{invalid}
					maxlength={7}
					block={false}
					aria-label={label ? `${label} (Hex)` : 'Hexadecimal color'}
					class="hex-input"
				/>
			</div>
		{/if}
	</div>

	{#if presets && presets.length > 0}
		<div class="presets-row" role="group" aria-label="Cores sugeridas">
			{#each presets as preset (preset)}
				<button
					type="button"
					class="preset-button"
					class:active={value?.toLowerCase() === preset.toLowerCase()}
					style:background-color={preset}
					aria-label={`Cor ${preset}`}
					{disabled}
					onclick={() => selectPreset(preset)}
				></button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.color-picker-root {
		display: inline-flex;
		flex-direction: column;
		gap: var(--space-xs);
		box-sizing: border-box;
		font-family: var(--font-sans);
		vertical-align: middle;
	}

	.picker-main {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
	}

	.swatch-container {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		position: relative;
		box-sizing: border-box;
		border-radius: var(--radius-xs);
		border: var(--border-width) solid var(--border-color);
		cursor: pointer;
		overflow: hidden;
		flex-shrink: 0;
		transition:
			border-color var(--transition-fast),
			box-shadow var(--transition-fast),
			transform var(--transition-fast);
	}

	.color-picker-root.sm .swatch-container {
		width: var(--control-height-sm);
		height: var(--control-height-sm);
	}

	.color-picker-root.md .swatch-container {
		width: var(--control-height);
		height: var(--control-height);
	}

	.color-picker-root.lg .swatch-container {
		width: var(--control-height-lg);
		height: var(--control-height-lg);
	}

	.swatch-container:hover:not(.disabled) {
		border-color: var(--border-strong);
	}

	.swatch-container:has(.native-color-input:focus-visible) {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 1px var(--color-primary);
		outline: none;
	}

	.native-color-input {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
		margin: 0;
		padding: 0;
		border: none;
	}

	.hex-field {
		width: calc(var(--base) * 6.5);
	}

	.presets-row {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xxs);
		align-items: center;
	}

	.preset-button {
		width: calc(var(--base) * 1.5);
		height: calc(var(--base) * 1.5);
		min-width: calc(var(--base) * 1.5);
		min-height: calc(var(--base) * 1.5);
		border-radius: var(--radius-xs);
		border: var(--border-width) solid var(--border-color);
		cursor: pointer;
		padding: 0;
		margin: 0;
		transition:
			transform var(--transition-fast),
			border-color var(--transition-fast),
			box-shadow var(--transition-fast);
	}

	.preset-button:hover:not(:disabled) {
		transform: scale(1.15);
		border-color: var(--border-strong);
	}

	.preset-button.active {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 1px var(--color-primary);
	}

	.preset-button:focus-visible {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 1px var(--color-primary);
		outline: none;
	}

	.color-picker-root.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.color-picker-root.disabled .swatch-container,
	.color-picker-root.disabled .preset-button {
		cursor: not-allowed;
	}

	@media (prefers-reduced-motion: reduce) {
		.swatch-container,
		.preset-button {
			transition: none;
		}
	}
</style>
