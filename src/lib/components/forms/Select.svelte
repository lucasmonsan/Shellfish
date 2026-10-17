<script lang="ts">
	import type { SelectProps } from '$lib/types/forms.js';
	import ChevronDown from '$lib/components/icons/ChevronDown.svelte';

	let {
		value = $bindable(''),
		options = [],
		placeholder,
		size = 'md',
		invalid = false,
		block = true,
		disabled = false,
		id,
		children,
		class: className = '',
		style = '',
		...restProps
	}: SelectProps = $props();

	let selectEl = $state<HTMLSelectElement>();

	export function focus() {
		selectEl?.focus();
	}
</script>

<div class="select-container {size} {className}" class:block class:invalid class:disabled {style}>
	<select
		bind:this={selectEl}
		bind:value
		{id}
		{disabled}
		aria-invalid={invalid ? 'true' : undefined}
		{...restProps}
	>
		{#if placeholder}
			<option value="" disabled hidden={Boolean(value)}>
				{placeholder}
			</option>
		{/if}

		{#if children}
			{@render children()}
		{:else if options.length > 0}
			{#each options as opt (opt.value)}
				<option value={opt.value} disabled={opt.disabled}>
					{opt.label}
				</option>
			{/each}
		{/if}
	</select>

	<span class="chevron" aria-hidden="true">
		<ChevronDown size={size === 'sm' ? 12 : size === 'lg' ? 16 : 14} />
	</span>
</div>

<style>
	.select-container {
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

	.select-container.block {
		width: 100%;
		display: flex;
	}

	/* Escala de Tamanhos */
	.select-container.sm {
		height: var(--control-height-sm);
		min-height: var(--control-height-sm);
		font-size: var(--text-xs);
	}

	.select-container.md {
		height: var(--control-height);
		min-height: var(--control-height);
		font-size: var(--text-sm);
	}

	.select-container.lg {
		height: var(--control-height-lg);
		min-height: var(--control-height-lg);
		font-size: var(--text-md);
	}

	select {
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		width: 100%;
		height: 100%;
		border: none;
		background: transparent;
		color: inherit;
		font-family: inherit;
		font-size: inherit;
		line-height: inherit;
		padding: 0 calc(var(--base) * 1.75) 0 calc(var(--base) * 0.75);
		border-radius: inherit;
		cursor: pointer;
		outline: none;
	}

	.select-container.sm select {
		padding: 0 calc(var(--base) * 1.5) 0 var(--space-sm);
	}

	.select-container.lg select {
		padding: 0 calc(var(--base) * 2) 0 var(--space-md);
	}

	/* Foco Acessível via :has(select:focus-visible) */
	.select-container:has(select:focus-visible):not(.disabled) {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 1px var(--color-primary);
		outline: none;
	}

	/* Estado Inválido */
	.select-container.invalid {
		border-color: var(--color-danger);
	}

	.select-container.invalid:has(select:focus-visible):not(.disabled) {
		border-color: var(--color-danger);
		box-shadow: 0 0 0 1px var(--color-danger);
		outline: none;
	}

	/* Desabilitado */
	.select-container.disabled {
		opacity: 0.5;
		cursor: not-allowed;
		background-color: var(--bg-secondary);
	}

	.select-container.disabled select {
		cursor: not-allowed;
	}

	.chevron {
		position: absolute;
		right: calc(var(--base) * 0.6);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
		color: var(--text-muted);
	}

	@media (prefers-reduced-motion: reduce) {
		.select-container {
			transition: none;
		}
	}
</style>
