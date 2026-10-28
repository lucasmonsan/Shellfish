<script lang="ts">
	import type { ColorPickerProps } from '$lib/types/forms.js';
	import Popover from '$lib/components/overlay/Popover.svelte';
	import { getI18n } from '$lib/utils/i18n.svelte.js';

	const DEFAULT_MONSAN_PRESETS: string[] = [
		'#b94b38',
		'#c44933',
		'#e63946',
		'#f4a261',
		'#e9c46a',
		'#2d6a4f',
		'#236f4c',
		'#1d767d',
		'#76a5af',
		'#295594',
		'#4e449c',
		'#823877',
		'#a82b3d',
		'#47535e'
	];

	const COLOR_PRESET_I18N_KEYS: Record<string, string> = {
		'#b94b38': 'palette.color_rust',
		'#c44933': 'palette.color_classic_rust',
		'#e63946': 'palette.color_red',
		'#f4a261': 'palette.color_orange',
		'#e9c46a': 'palette.color_yellow',
		'#2d6a4f': 'palette.color_green',
		'#236f4c': 'palette.color_emerald',
		'#1d767d': 'palette.color_celadon',
		'#76a5af': 'palette.color_teal',
		'#295594': 'palette.color_blue',
		'#4e449c': 'palette.color_purple',
		'#823877': 'palette.color_plum',
		'#a82b3d': 'palette.color_crimson',
		'#47535e': 'palette.color_slate',
		'#ffffff': 'palette.color_white',
		'#f4efe6': 'palette.color_cream',
		'#5e544f': 'palette.color_gray',
		'#2d2422': 'palette.color_dark_brown'
	};

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
		ariaLabel,
		class: className = '',
		style = '',
		...restProps
	}: ColorPickerProps = $props();

	const i18n = getI18n();
	let explicitAriaLabel = $derived(ariaLabel ?? (restProps['aria-label'] as string | undefined));
	let resolvedLabel = $derived(label ?? i18n.t('forms.color_picker_label'));
	let triggerLabel = $derived(explicitAriaLabel ?? `${resolvedLabel}: ${value}`);

	function getPresetAriaLabel(presetHex: string): string {
		const key = COLOR_PRESET_I18N_KEYS[presetHex.toLowerCase()];
		if (key) {
			const translated = i18n.t(key);
			if (translated && translated !== key) {
				return translated;
			}
		}
		return i18n.t('forms.color_preset', { color: presetHex });
	}

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
	<Popover {disabled} align="start" offset={6} panelClass="color-picker-dropdown">
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
				aria-label={triggerLabel}
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
							aria-label={getPresetAriaLabel(preset)}
							aria-checked={isSelected}
							role="radio"
							onclick={() => selectPreset(preset, close)}
						>
							{#if isSelected}
								<svg
									viewBox="0 0 16 16"
									fill="none"
									stroke={isLight ? '#221d1c' : '#fdfbf7'}
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
								placeholder="#b94b38"
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

	.color-picker-wrapper.block :global(.popover-root) {
		width: 100%;
	}

	.color-picker-wrapper.block :global(.popover-trigger) {
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
		border: var(--border-width) solid var(--border-color);
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
		grid-template-columns: repeat(5, 1fr);
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
		border-top: var(--border-width) solid var(--border-color);
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
		border: var(--border-width) solid var(--border-color);
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
