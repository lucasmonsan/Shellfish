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
	class:has-count={showCount}
	style:resize={disabled || readonly ? 'none' : resize}
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
		aria-invalid={invalid || isOverLimit ? 'true' : undefined}
		{...restProps}></textarea>

	{#if showCount}
		<div class="textarea-footer">
			<div class="count-badge" class:warning={isNearLimit} class:danger={isOverLimit}>
				{#if maxlength}
					{currentLength} / {maxlength}
				{:else}
					{currentLength}
				{/if}
			</div>
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
		overflow: hidden;
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
		padding: var(--space-sm) var(--control-padding-md);
	}

	.textarea-container.lg {
		font-size: var(--text-md);
	}
	.textarea-container.lg textarea {
		padding: var(--space-md) var(--space-md);
	}

	textarea {
		width: 100%;
		flex: 1;
		border: none;
		background: transparent;
		color: inherit;
		font-family: inherit;
		font-size: inherit;
		line-height: inherit;
		border-radius: 0;
		box-sizing: border-box;
		outline: none;
		resize: none;
		min-height: calc(var(--control-height) * 1.5);
		overflow-y: auto;
	}

	/* Interações */
	.textarea-container:hover:not(.disabled):not(:has(textarea:focus-visible)) {
		border-color: var(--border-strong);
	}

	/* Foco Acessível via :has(textarea:focus-visible) */
	.textarea-container:has(textarea:focus-visible):not(.disabled) {
		border-color: var(--color-primary);
		outline: none;
	}

	/* Estado Inválido */
	.textarea-container.invalid {
		border-color: var(--color-danger);
	}

	.textarea-container.invalid:has(textarea:focus-visible):not(.disabled) {
		border-color: var(--color-danger);
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

	.textarea-footer {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: calc(var(--space-xxs) * 0.35) var(--space-sm);
		background-color: var(--bg-input);
		border-top: 1px solid var(--border-color);
		flex-shrink: 0;
		user-select: none;
	}

	.textarea-container.readonly .textarea-footer,
	.textarea-container.disabled .textarea-footer {
		background-color: var(--bg-secondary);
	}

	.count-badge {
		font-family: var(--font-mono);
		font-size: var(--text-xxs);
		line-height: var(--leading-none);
		color: var(--text-muted);
		user-select: none;
		pointer-events: none;
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
