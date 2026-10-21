<script lang="ts">
	import type { TimePickerProps } from '$lib/types/forms.js';

	let {
		value = $bindable(''),
		size = 'md',
		invalid = false,
		block = false,
		disabled = false,
		min,
		max,
		step,
		id,
		class: className = '',
		style = '',
		...restProps
	}: TimePickerProps = $props();

	let inputEl = $state<HTMLInputElement>();

	export function focus() {
		inputEl?.focus();
	}
</script>

<div
	class="timepicker-container {size} {className}"
	class:block
	class:invalid
	class:disabled
	{style}
>
	<input
		bind:this={inputEl}
		type="time"
		bind:value
		{id}
		{min}
		{max}
		{step}
		{disabled}
		aria-invalid={invalid ? 'true' : undefined}
		{...restProps}
	/>
</div>

<style>
	.timepicker-container {
		display: inline-flex;
		align-items: center;
		position: relative;
		box-sizing: border-box;
		height: var(--control-height);
		min-height: var(--control-height);
		border-radius: var(--radius-xs);
		border: var(--border-width) solid var(--border-color);
		background-color: var(--bg-input);
		color: var(--text-primary);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		line-height: var(--leading-none);
		vertical-align: middle;
		width: calc(
			7ch + var(--control-padding-md) + var(--space-xs) + var(--base) * 1.25 + 2 *
				var(--border-width)
		);
		transition:
			border-color var(--transition-fast),
			background-color var(--transition-fast),
			box-shadow var(--transition-fast);
	}

	.timepicker-container.block {
		width: 100%;
		display: flex;
	}

	/* Escala de Tamanhos */
	.sm {
		height: var(--control-height-sm);
		min-height: var(--control-height-sm);
		font-size: var(--text-xs);
		width: calc(
			7ch + var(--control-padding-sm) + var(--space-xxs) + var(--base) * 1.25 + 2 *
				var(--border-width)
		);
	}

	.md {
		height: var(--control-height);
		min-height: var(--control-height);
		font-size: var(--text-sm);
		width: calc(
			7ch + var(--control-padding-md) + var(--space-xs) + var(--base) * 1.25 + 2 *
				var(--border-width)
		);
	}

	.lg {
		height: var(--control-height-lg);
		min-height: var(--control-height-lg);
		font-size: var(--text-md);
		width: calc(
			7ch + var(--control-padding-lg) + var(--space-sm) + var(--base) * 1.25 + 2 *
				var(--border-width)
		);
	}

	.timepicker-container.block.sm,
	.timepicker-container.block.md,
	.timepicker-container.block.lg {
		width: 100%;
	}

	input[type='time'] {
		width: 100%;
		height: calc(100% - var(--space-xxs) * 2);
		margin: var(--space-xxs) 0;
		border: none;
		background: transparent;
		color: inherit;
		font-family: inherit;
		font-size: inherit;
		line-height: inherit;
		padding: 0 var(--space-xs) 0 var(--control-padding-md);
		border-radius: inherit;
		box-sizing: border-box;
		outline: none;
		cursor: text;
	}

	.sm input[type='time'] {
		padding: 0 var(--space-xxs) 0 var(--control-padding-sm);
	}

	.lg input[type='time'] {
		padding: 0 var(--space-sm) 0 var(--control-padding-lg);
	}

	/* Normalização suave do indicador nativo WebKit */
	input[type='time']::-webkit-calendar-picker-indicator {
		cursor: pointer;
		opacity: 0.6;
		transition: opacity var(--transition-fast);
	}

	input[type='time']::-webkit-calendar-picker-indicator:hover {
		opacity: 1;
	}

	/* Interações */
	.timepicker-container:hover:not(.disabled):not(:has(input:focus-visible)) {
		border-color: var(--border-strong);
	}

	/* Foco Acessível */
	.timepicker-container:has(input:focus-visible):not(.disabled) {
		border-color: var(--color-primary);
		outline: none;
	}

	/* Estado Inválido */
	.timepicker-container.invalid {
		border-color: var(--color-danger);
	}

	.timepicker-container.invalid:has(input:focus-visible):not(.disabled) {
		border-color: var(--color-danger);
		outline: none;
	}

	/* Desabilitado */
	.timepicker-container.disabled {
		opacity: 0.5;
		cursor: not-allowed;
		background-color: var(--bg-secondary);
	}

	.timepicker-container.disabled input {
		cursor: not-allowed;
	}

	@media (prefers-reduced-motion: reduce) {
		.timepicker-container {
			transition: none;
		}
	}
</style>
