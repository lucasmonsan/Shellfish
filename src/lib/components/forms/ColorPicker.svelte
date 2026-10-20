<script lang="ts">
	import type { ColorPickerProps } from '$lib/types/forms.js';
	import Popover from '$lib/components/overlay/Popover.svelte';
	import { i18n } from '$lib/utils/i18n.svelte.js';

	const DEFAULT_MONSAN_PRESETS = [
		'#b94b38', // Primária Terracota
		'#9c3b2a', // Primária Escura
		'#d46450', // Primária Clara
		'#2b6140', // Sucesso Floresta
		'#3d8257', // Sucesso Claro
		'#e09f2d', // Aviso Âmbar
		'#f0b246', // Aviso Claro
		'#9b2226', // Perigo Carmim
		'#b82c30', // Perigo Claro
		'#2b4c7e', // Info Ardósia
		'#3e68a3', // Info Claro
		'#2d2422', // Neutro Escuro (Carvão)
		'#5e544f', // Neutro Médio
		'#8a807a', // Neutro Quente
		'#d8d2c8', // Borda Neutra
		'#faf6ef' // Fundo Claro (Creme)
	];

	let {
		value = $bindable('#b94b38'),
		size = 'md',
		presets = DEFAULT_MONSAN_PRESETS,
		allowCustom = false,
		showHexInput = true,
		block = false,
		disabled = false,
		invalid = false,
		label,
		class: className = '',
		style = '',
		...restProps
	}: ColorPickerProps = $props();

	let resolvedLabel = $derived(label ?? i18n.t('forms.color_picker_label'));

	function selectPreset(color: string, close: () => void) {
		if (disabled) return;
		value = color;
		close();
	}

	function isLightColor(hex: string): boolean {
		if (!hex || typeof hex !== 'string') return false;
		const clean = hex.replace('#', '');
		if (clean.length !== 6 && clean.length !== 3) return false;
		const full =
			clean.length === 3
				? clean
						.split('')
						.map((c) => c + c)
						.join('')
				: clean;
		const r = parseInt(full.substring(0, 2), 16);
		const g = parseInt(full.substring(2, 4), 16);
		const b = parseInt(full.substring(4, 6), 16);
		return (r * 299 + g * 587 + b * 114) / 1000 > 155;
	}
</script>

<div
	class="color-picker-wrapper {className}"
	class:block
	class:disabled
	class:invalid
	{style}
	{...restProps}
>
	<Popover {disabled} align="start" offset={6}>
		{#snippet trigger(toggle, open, ariaProps)}
			<button
				type="button"
				class="color-trigger {size}"
				class:swatch-only={!showHexInput}
				class:with-hex={showHexInput}
				class:open
				class:block
				class:invalid
				{disabled}
				style:background-color={showHexInput ? undefined : value}
				aria-label={`${resolvedLabel}: ${value}`}
				onclick={toggle}
				{...ariaProps}
			>
				{#if showHexInput}
					<span class="swatch-preview" style:background-color={value}></span>
					<span class="hex-text">{value?.toUpperCase() || ''}</span>
				{/if}
			</button>
		{/snippet}

		{#snippet content(close)}
			<div class="color-popover-panel" role="region" aria-label={resolvedLabel}>
				<div class="panel-section-title">
					{i18n.t('forms.color_palette_title')}
				</div>

				<div
					class="swatches-grid"
					role="radiogroup"
					aria-label={i18n.t('forms.color_palette_title')}
				>
					{#each presets as preset (preset)}
						{@const isSelected = value?.toLowerCase() === preset.toLowerCase()}
						{@const isLight = isLightColor(preset)}
						<button
							type="button"
							class="palette-swatch"
							class:selected={isSelected}
							style:background-color={preset}
							title={preset}
							aria-label={i18n.t('forms.color_preset', { color: preset })}
							aria-checked={isSelected}
							role="radio"
							onclick={() => selectPreset(preset, close)}
						>
							{#if isSelected}
								<svg
									viewBox="0 0 16 16"
									fill="none"
									stroke={isLight ? '#2d2422' : '#ffffff'}
									stroke-width="2.5"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="check-icon"
								>
									<polyline points="3 8.5 6.5 12 13 4.5" />
								</svg>
							{/if}
						</button>
					{/each}
				</div>

				{#if allowCustom}
					<div class="custom-section">
						<div class="panel-section-title">
							{i18n.t('forms.color_custom_title')}
						</div>
						<div class="custom-controls">
							<label
								class="custom-native-wrapper"
								style:background-color={value}
								title={i18n.t('forms.color_custom_title')}
							>
								<input
									type="color"
									bind:value
									class="custom-native-input"
									aria-label={i18n.t('forms.color_custom_title')}
								/>
							</label>
							<input
								type="text"
								bind:value
								maxlength={7}
								class="custom-hex-field"
								placeholder="#000000"
								aria-label={i18n.t('forms.color_hex_code')}
							/>
						</div>
					</div>
				{/if}
			</div>
		{/snippet}
	</Popover>
</div>

<style>
	.color-picker-wrapper {
		display: inline-flex;
		box-sizing: border-box;
		vertical-align: middle;
	}

	.color-picker-wrapper.block {
		width: 100%;
		display: flex;
	}

	.color-picker-wrapper.block :global(.sf-popover) {
		width: 100%;
	}

	.color-picker-wrapper.block :global(.sf-popover-trigger) {
		width: 100%;
	}

	.color-trigger {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
		box-sizing: border-box;
		height: var(--control-height);
		min-height: var(--control-height);
		padding: 0 var(--space-sm);
		border-radius: var(--radius-xs);
		border: var(--border-width) solid var(--border-color);
		background-color: var(--bg-input);
		color: var(--text-primary);
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		cursor: pointer;
		user-select: none;
		outline: none;
		transition:
			border-color var(--transition-fast),
			background-color var(--transition-fast),
			box-shadow var(--transition-fast);
	}

	.color-trigger.block {
		width: 100%;
		justify-content: space-between;
	}

	/* Escala de Tamanhos */
	.color-trigger.sm {
		height: var(--control-height-sm);
		min-height: var(--control-height-sm);
		font-size: var(--text-xs);
		padding: 0 var(--space-xs);
	}

	.color-trigger.md {
		height: var(--control-height);
		min-height: var(--control-height);
		font-size: var(--text-sm);
	}

	.color-trigger.lg {
		height: var(--control-height-lg);
		min-height: var(--control-height-lg);
		font-size: var(--text-md);
		padding: 0 var(--space-md);
	}

	/* Modo Quadrado Puro */
	.color-trigger.swatch-only {
		padding: 0;
		width: var(--control-height);
		height: var(--control-height);
		min-width: var(--control-height);
		min-height: var(--control-height);
		justify-content: center;
		flex-shrink: 0;
	}

	.color-trigger.swatch-only.sm {
		width: var(--control-height-sm);
		height: var(--control-height-sm);
		min-width: var(--control-height-sm);
		min-height: var(--control-height-sm);
		padding: 0;
	}

	.color-trigger.swatch-only.lg {
		width: var(--control-height-lg);
		height: var(--control-height-lg);
		min-width: var(--control-height-lg);
		min-height: var(--control-height-lg);
		padding: 0;
	}

	.color-trigger:hover:not(:disabled) {
		border-color: var(--border-strong);
	}

	.color-trigger:focus-visible,
	.color-trigger.open {
		border-color: var(--color-primary);
		outline: none;
	}

	.color-trigger.invalid {
		border-color: var(--color-danger);
	}

	.color-trigger.invalid:focus-visible {
		border-color: var(--color-danger);
		outline: none;
	}

	.color-trigger:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		background-color: var(--bg-secondary);
	}

	.swatch-preview {
		width: calc(var(--base) * 1.25);
		height: calc(var(--base) * 1.25);
		min-width: calc(var(--base) * 1.25);
		min-height: calc(var(--base) * 1.25);
		border-radius: var(--radius-xs);
		border: 1px solid var(--border-color);
		box-sizing: border-box;
		flex-shrink: 0;
	}

	.hex-text {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--text-secondary);
		letter-spacing: 0.05em;
	}

	/* Painel Popover */
	.color-popover-panel {
		box-sizing: border-box;
		background-color: var(--bg-elevated);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		padding: var(--space-sm);
		box-shadow: var(--shadow-md);
		min-width: 200px;
		max-width: 260px;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.panel-section-title {
		font-size: var(--text-xxs);
		font-family: var(--font-mono);
		color: var(--text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.swatches-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--space-xs);
	}

	.palette-swatch {
		width: 100%;
		aspect-ratio: 1 / 1;
		border-radius: var(--radius-xs);
		border: var(--border-width) solid var(--border-color);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		margin: 0;
		position: relative;
		transition:
			transform var(--transition-fast),
			border-color var(--transition-fast),
			box-shadow var(--transition-fast);
	}

	.palette-swatch:hover {
		transform: scale(1.1);
		z-index: 2;
		border-color: var(--border-strong);
	}

	.palette-swatch.selected {
		z-index: 1;
	}

	.palette-swatch:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 1px;
	}

	.check-icon {
		width: 12px;
		height: 12px;
	}

	/* Seção Custom */
	.custom-section {
		display: flex;
		flex-direction: column;
		gap: var(--space-xxs);
		padding-top: var(--space-xs);
		border-top: 1px solid var(--border-color);
	}

	.custom-controls {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
	}

	.custom-native-wrapper {
		position: relative;
		width: calc(var(--base) * 1.5);
		height: calc(var(--base) * 1.5);
		min-width: calc(var(--base) * 1.5);
		border-radius: var(--radius-xs);
		border: 1px solid var(--border-color);
		cursor: pointer;
		overflow: hidden;
		flex-shrink: 0;
	}

	.custom-native-input {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
		border: none;
		padding: 0;
		margin: 0;
	}

	.custom-hex-field {
		flex: 1;
		height: calc(var(--base) * 1.5);
		border-radius: var(--radius-xs);
		border: var(--border-width) solid var(--border-color);
		background-color: var(--bg-input);
		color: var(--text-primary);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		padding: 0 var(--space-xs);
		outline: none;
		box-sizing: border-box;
	}

	.custom-hex-field:focus-visible {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 1px var(--color-primary);
	}

	@media (prefers-reduced-motion: reduce) {
		.color-trigger,
		.palette-swatch {
			transition: none;
		}
	}
</style>
