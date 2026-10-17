<script lang="ts">
	import type { TextareaProps } from '$lib/types/forms.js';

	let {
		value = $bindable(''),
		size = 'md',
		invalid = false,
		block = true,
		disabled = false,
		readonly = false,
		resize = 'vertical',
		rows = 3,
		maxlength,
		showCount = false,
		id,
		class: className = '',
		style = '',
		...restProps
	}: TextareaProps = $props();

	let textareaEl = $state<HTMLTextAreaElement>();

	let currentLength = $derived(value ? String(value).length : 0);
	let isNearLimit = $derived(maxlength ? currentLength >= maxlength * 0.9 : false);
	let isOverLimit = $derived(maxlength ? currentLength > maxlength : false);

	export function focus() {
		textareaEl?.focus();
	}

	export function select() {
		textareaEl?.select();
	}
</script>

<div
	class="textarea-container {size} {className}"
	class:block
	class:invalid={invalid || isOverLimit}
	class:disabled
	class:readonly
	{style}
>
	<textarea
		bind:this={textareaEl}
		bind:value
		{id}
		{rows}
		{disabled}
		{readonly}
		{maxlength}
		style:resize
		aria-invalid={invalid || isOverLimit ? 'true' : undefined}
		{...restProps}></textarea>

	{#if showCount && maxlength}
		<div class="count-badge" class:warning={isNearLimit} class:danger={isOverLimit}>
			{currentLength} / {maxlength}
		</div>
	{:else if showCount}
		<div class="count-badge">
			{currentLength}
		</div>
	{/if}
</div>

<style>
	.textarea-container {
		display: inline-flex;
		flex-direction: column;
		position: relative;
		box-sizing: border-box;
		border-radius: var(--radius-xs);
		border: var(--border-width) solid var(--border-color);
		background-color: var(--bg-input);
		color: var(--text-primary);
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		line-height: var(--leading-normal);
		vertical-align: middle;
		transition:
			border-color var(--transition-fast),
			background-color var(--transition-fast),
			box-shadow var(--transition-fast);
	}

	.textarea-container.block {
		width: 100%;
		display: flex;
	}

	/* Escala de Tamanhos */
	.textarea-container.sm {
		font-size: var(--text-xs);
	}
	.textarea-container.sm textarea {
		padding: var(--space-xs) var(--space-sm);
	}

	.textarea-container.md {
		font-size: var(--text-sm);
	}
	.textarea-container.md textarea {
		padding: var(--space-sm) calc(var(--base) * 0.75);
	}

	.textarea-container.lg {
		font-size: var(--text-md);
	}
	.textarea-container.lg textarea {
		padding: var(--space-md) var(--space-md);
	}

	textarea {
		width: 100%;
		border: none;
		background: transparent;
		color: inherit;
		font-family: inherit;
		font-size: inherit;
		line-height: inherit;
		border-radius: inherit;
		box-sizing: border-box;
		outline: none;
		min-height: calc(var(--control-height) * 1.5);
	}

	/* Foco Acessível via :has(textarea:focus-visible) */
	.textarea-container:has(textarea:focus-visible):not(.disabled) {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 1px var(--color-primary);
		outline: none;
	}

	/* Estado Inválido */
	.textarea-container.invalid {
		border-color: var(--color-danger);
	}

	.textarea-container.invalid:has(textarea:focus-visible):not(.disabled) {
		border-color: var(--color-danger);
		box-shadow: 0 0 0 1px var(--color-danger);
		outline: none;
	}

	/* Desabilitado e Somente Leitura */
	.textarea-container.disabled {
		opacity: 0.5;
		cursor: not-allowed;
		background-color: var(--bg-secondary);
	}
	.textarea-container.disabled textarea {
		cursor: not-allowed;
	}

	.textarea-container.readonly {
		background-color: var(--bg-secondary);
	}

	.count-badge {
		align-self: flex-end;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--text-muted);
		padding: 0 calc(var(--base) * 0.5) calc(var(--base) * 0.25);
		user-select: none;
	}

	.count-badge.warning {
		color: var(--color-warning);
	}

	.count-badge.danger {
		color: var(--color-danger);
		font-weight: 600;
	}

	@media (prefers-reduced-motion: reduce) {
		.textarea-container {
			transition: none;
		}
	}
</style>
