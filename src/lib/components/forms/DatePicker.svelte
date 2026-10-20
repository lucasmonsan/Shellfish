<script lang="ts">
	import type { DatePickerProps } from '$lib/types/forms.js';

	let {
		value = $bindable(''),
		size = 'md',
		invalid = false,
		block = true,
		disabled = false,
		min,
		max,
		id,
		class: className = '',
		style = '',
		...restProps
	}: DatePickerProps = $props();

	let inputEl = $state<HTMLInputElement>();

	export function focus() {
		inputEl?.focus();
	}
</script>

<div
	class="datepicker-container {size} {className}"
	class:block
	class:invalid
	class:disabled
	{style}
>
	<input
		bind:this={inputEl}
		type="date"
		bind:value
		{id}
		{min}
		{max}
		{disabled}
		aria-invalid={invalid ? 'true' : undefined}
		{...restProps}
	/>
</div>

<style>
	.datepicker-container {
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
		width: calc(10ch + var(--control-padding-md) * 2 + var(--base) * 2);
		max-width: 100%;
		transition:
			border-color var(--transition-fast),
			background-color var(--transition-fast),
			box-shadow var(--transition-fast);
	}

	.datepicker-container.block {
		width: 100%;
		max-width: calc(10ch + var(--control-padding-md) * 2 + var(--base) * 2);
		display: flex;
	}

	/* Escala de Tamanhos */
	.sm {
		height: var(--control-height-sm);
		min-height: var(--control-height-sm);
		font-size: var(--text-xs);
		width: calc(10ch + var(--control-padding-sm) * 2 + var(--base) * 2);
	}

	.md {
		height: var(--control-height);
		min-height: var(--control-height);
		font-size: var(--text-sm);
		width: calc(10ch + var(--control-padding-md) * 2 + var(--base) * 2);
	}

	.lg {
		height: var(--control-height-lg);
		min-height: var(--control-height-lg);
		font-size: var(--text-md);
		width: calc(10ch + var(--control-padding-lg) * 2 + var(--base) * 2);
	}

	input[type='date'] {
		width: 100%;
		height: calc(100% - var(--space-xxs) * 2);
		margin: var(--space-xxs) 0;
		border: none;
		background: transparent;
		color: inherit;
		font-family: inherit;
		font-size: inherit;
		line-height: inherit;
		padding: 0 var(--control-padding-md);
		border-radius: inherit;
		box-sizing: border-box;
		outline: none;
		cursor: text;
	}

	.sm input[type='date'] {
		padding: 0 var(--control-padding-sm);
	}

	.lg input[type='date'] {
		padding: 0 var(--control-padding-lg);
	}

	/* Normalização suave do indicador nativo WebKit */
	input[type='date']::-webkit-calendar-picker-indicator {
		cursor: pointer;
		opacity: 0.6;
		transition: opacity var(--transition-fast);
	}

	input[type='date']::-webkit-calendar-picker-indicator:hover {
		opacity: 1;
	}

	/* Interações */
	.datepicker-container:hover:not(.disabled):not(:has(input:focus-visible)) {
		border-color: var(--border-strong);
	}

	/* Foco Acessível */
	.datepicker-container:has(input:focus-visible):not(.disabled) {
		border-color: var(--color-primary);
		outline: none;
	}

	/* Estado Inválido */
	.datepicker-container.invalid {
		border-color: var(--color-danger);
	}

	.datepicker-container.invalid:has(input:focus-visible):not(.disabled) {
		border-color: var(--color-danger);
		outline: none;
	}

	/* Desabilitado */
	.datepicker-container.disabled {
		opacity: 0.5;
		cursor: not-allowed;
		background-color: var(--bg-secondary);
	}

	.datepicker-container.disabled input {
		cursor: not-allowed;
	}

	@media (prefers-reduced-motion: reduce) {
		.datepicker-container {
			transition: none;
		}
	}
</style>
