<script lang="ts">
	import type { InputProps } from '$lib/types/forms.js';

	let {
		value = $bindable(),
		size = 'md',
		variant = 'default',
		invalid = false,
		type = 'text',
		block = true,
		disabled = false,
		readonly = false,
		id,
		before,
		after,
		class: className = '',
		style = '',
		...restProps
	}: InputProps = $props();

	let inputEl = $state<HTMLInputElement>();

	export function focus() {
		inputEl?.focus();
	}

	export function select() {
		inputEl?.select();
	}

	function handleContainerClick(event: MouseEvent) {
		// Se o clique foi no próprio container ou adornamento decorativo, foca o input
		if (event.target !== inputEl && !disabled) {
			const targetEl = event.target as HTMLElement | null;
			if (!targetEl?.closest('button, [href], input, select, textarea, [tabindex]')) {
				inputEl?.focus();
			}
		}
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="input-container {size} {variant} {className}"
	class:block
	class:invalid
	class:disabled
	class:readonly
	{style}
	onclick={handleContainerClick}
>
	{#if before}
		<span class="adornment before">
			{@render before()}
		</span>
	{/if}

	<input
		bind:this={inputEl}
		bind:value
		{type}
		{id}
		{disabled}
		{readonly}
		aria-invalid={invalid ? 'true' : undefined}
		{...restProps}
	/>

	{#if after}
		<span class="adornment after">
			{@render after()}
		</span>
	{/if}
</div>

<style>
	.input-container {
		display: inline-flex;
		align-items: center;
		position: relative;
		box-sizing: border-box;
		min-height: var(--control-height);
		border-radius: var(--radius-xs);
		border: var(--border-width) solid var(--border-color);
		background-color: var(--bg-input);
		color: var(--text-primary);
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		line-height: var(--leading-none);
		padding: 0 var(--space-sm);
		gap: var(--space-xs);
		vertical-align: middle;
		transition:
			border-color var(--transition-fast),
			background-color var(--transition-fast),
			box-shadow var(--transition-fast);
	}

	.input-container.block {
		width: 100%;
		display: flex;
	}

	/* Escala de Tamanhos */
	.input-container.sm {
		min-height: var(--control-height-sm);
		font-size: var(--text-xs);
		padding: 0 calc(var(--base) * 0.35);
		gap: calc(var(--base) * 0.25);
	}

	.input-container.md {
		min-height: var(--control-height);
		font-size: var(--text-sm);
		padding: 0 var(--space-sm);
		gap: var(--space-xs);
	}

	.input-container.lg {
		min-height: var(--control-height-lg);
		font-size: var(--text-md);
		padding: 0 var(--space-md);
		gap: var(--space-sm);
	}

	/* Estados de Foco */
	.input-container:focus-within:not(.disabled) {
		border-color: var(--color-primary);
		outline: 2px solid var(--color-primary);
		outline-offset: 1px;
	}

	/* Estado Inválido */
	.input-container.invalid {
		border-color: var(--color-danger);
	}

	.input-container.invalid:focus-within:not(.disabled) {
		border-color: var(--color-danger);
		outline-color: var(--color-danger);
	}

	/* Estados Desabilitado e Somente Leitura */
	.input-container.disabled {
		opacity: 0.5;
		cursor: not-allowed;
		background-color: var(--bg-secondary);
	}

	.input-container.readonly {
		background-color: var(--bg-secondary);
	}

	/* Variante Unstyled */
	.input-container.unstyled {
		min-height: auto;
		border: none;
		background: transparent;
		padding: 0;
		outline: none;
	}

	.input-container.unstyled:focus-within {
		outline: none;
		box-shadow: none;
	}

	/* Input Nativo */
	input {
		flex: 1;
		width: 100%;
		min-width: 0;
		height: 100%;
		border: none;
		background: transparent;
		color: inherit;
		font-family: inherit;
		font-size: inherit;
		font-weight: 500;
		line-height: inherit;
		padding: 0;
		margin: 0;
		outline: none;
		box-sizing: border-box;
	}

	input::placeholder {
		color: var(--text-muted);
		opacity: 1;
	}

	input:disabled {
		cursor: not-allowed;
	}

	/* Adornos */
	.adornment {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		color: var(--text-secondary);
	}

	.adornment :global(svg) {
		flex-shrink: 0;
	}

	@media (prefers-reduced-motion: reduce) {
		.input-container {
			transition: none;
		}
	}
</style>
