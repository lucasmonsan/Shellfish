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

	<span class="calendar-icon" aria-hidden="true">
		<svg
			viewBox="0 0 16 16"
			fill="none"
			stroke="currentColor"
			stroke-width="1.75"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<rect x="2" y="3" width="12" height="11" rx="1.5" />
			<line x1="2" y1="6.5" x2="14" y2="6.5" />
			<line x1="5" y1="1.5" x2="5" y2="3.5" />
			<line x1="11" y1="1.5" x2="11" y2="3.5" />
		</svg>
	</span>
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
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		line-height: var(--leading-none);
		vertical-align: middle;
		transition:
			border-color var(--transition-fast),
			background-color var(--transition-fast),
			box-shadow var(--transition-fast);
	}

	.datepicker-container.block {
		width: 100%;
		display: flex;
	}

	/* Escala de Tamanhos */
	.sm {
		height: var(--control-height-sm);
		min-height: var(--control-height-sm);
		font-size: var(--text-xs);
	}

	.md {
		height: var(--control-height);
		min-height: var(--control-height);
		font-size: var(--text-sm);
	}

	.lg {
		height: var(--control-height-lg);
		min-height: var(--control-height-lg);
		font-size: var(--text-md);
	}

	input[type='date'] {
		width: 100%;
		height: 100%;
		border: none;
		background: transparent;
		color: inherit;
		font-family: inherit;
		font-size: inherit;
		line-height: inherit;
		padding: 0 calc(var(--base) * 2) 0 calc(var(--base) * 0.75);
		border-radius: inherit;
		box-sizing: border-box;
		outline: none;
		cursor: text;
	}

	.sm input[type='date'] {
		padding: 0 calc(var(--base) * 1.75) 0 var(--space-sm);
	}

	.lg input[type='date'] {
		padding: 0 calc(var(--base) * 2.25) 0 var(--space-md);
	}

	/* Normalização dos controles nativos WebKit */
	input[type='date']::-webkit-calendar-picker-indicator {
		position: absolute;
		right: 0;
		top: 0;
		width: calc(var(--base) * 2);
		height: 100%;
		opacity: 0;
		cursor: pointer;
	}

	/* Foco Acessível */
	.datepicker-container:has(input:focus-visible):not(.disabled) {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 1px var(--color-primary);
		outline: none;
	}

	/* Estado Inválido */
	.datepicker-container.invalid {
		border-color: var(--color-danger);
	}

	.datepicker-container.invalid:has(input:focus-visible):not(.disabled) {
		border-color: var(--color-danger);
		box-shadow: 0 0 0 1px var(--color-danger);
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

	.calendar-icon {
		position: absolute;
		right: calc(var(--base) * 0.6);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
		color: var(--text-muted);
	}

	.calendar-icon svg {
		width: calc(var(--base) * 0.9);
		height: calc(var(--base) * 0.9);
	}

	@media (prefers-reduced-motion: reduce) {
		.datepicker-container {
			transition: none;
		}
	}
</style>
