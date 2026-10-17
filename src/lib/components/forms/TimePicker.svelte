<script lang="ts">
	import type { TimePickerProps } from '$lib/types/forms.js';

	let {
		value = $bindable(''),
		size = 'md',
		invalid = false,
		block = true,
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

	<span class="clock-icon" aria-hidden="true">
		<svg
			viewBox="0 0 16 16"
			fill="none"
			stroke="currentColor"
			stroke-width="1.75"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<circle cx="8" cy="8" r="6" />
			<polyline points="8 4.5 8 8 10.5 9.5" />
		</svg>
	</span>
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
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		line-height: var(--leading-none);
		vertical-align: middle;
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

	input[type='time'] {
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

	.sm input[type='time'] {
		padding: 0 calc(var(--base) * 1.75) 0 var(--space-sm);
	}

	.lg input[type='time'] {
		padding: 0 calc(var(--base) * 2.25) 0 var(--space-md);
	}

	/* Normalização dos controles nativos WebKit */
	input[type='time']::-webkit-calendar-picker-indicator {
		position: absolute;
		right: 0;
		top: 0;
		width: calc(var(--base) * 2);
		height: 100%;
		opacity: 0;
		cursor: pointer;
	}

	/* Foco Acessível */
	.timepicker-container:has(input:focus-visible):not(.disabled) {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 1px var(--color-primary);
		outline: none;
	}

	/* Estado Inválido */
	.timepicker-container.invalid {
		border-color: var(--color-danger);
	}

	.timepicker-container.invalid:has(input:focus-visible):not(.disabled) {
		border-color: var(--color-danger);
		box-shadow: 0 0 0 1px var(--color-danger);
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

	.clock-icon {
		position: absolute;
		right: calc(var(--base) * 0.6);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
		color: var(--text-muted);
	}

	.clock-icon svg {
		width: calc(var(--base) * 0.9);
		height: calc(var(--base) * 0.9);
	}

	@media (prefers-reduced-motion: reduce) {
		.timepicker-container {
			transition: none;
		}
	}
</style>
