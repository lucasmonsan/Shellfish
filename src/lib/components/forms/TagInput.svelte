<script lang="ts">
	import type { TagInputProps } from '$lib/types/forms.js';
	import Chip from './Chip.svelte';

	let {
		tags = $bindable([]),
		maxTags,
		placeholder = 'Digite e pressione Enter...',
		size = 'md',
		invalid = false,
		disabled = false,
		block = true,
		id,
		label,
		ontagschange,
		class: className = '',
		...restProps
	}: TagInputProps = $props();

	let inputValue = $state('');
	let inputEl = $state<HTMLInputElement>();

	const canAddMore = $derived(maxTags ? tags.length < maxTags : true);

	function addTag(text: string) {
		const trimmed = text.trim();
		if (!trimmed || tags.includes(trimmed) || !canAddMore) {
			return;
		}

		tags = [...tags, trimmed];
		inputValue = '';
		ontagschange?.(tags);
	}

	function removeTag(index: number) {
		if (disabled) return;
		tags = tags.filter((_, i) => i !== index);
		ontagschange?.(tags);
		inputEl?.focus();
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (disabled) return;

		if (event.key === 'Enter' || event.key === ',') {
			event.preventDefault();
			addTag(inputValue);
		} else if (event.key === 'Backspace' && inputValue === '' && tags.length > 0) {
			event.preventDefault();
			removeTag(tags.length - 1);
		}
	}

	function handleContainerClick(event: MouseEvent) {
		if (disabled) return;
		const target = event.target as HTMLElement | null;
		if (!target?.closest('.remove-button')) {
			inputEl?.focus();
		}
	}
</script>

<div
	class="tag-input-container {size} {className}"
	class:block
	class:invalid
	class:disabled
	onclick={handleContainerClick}
	{...restProps}
>
	<div class="tags-wrapper">
		{#each tags as tag, index (tag)}
			<Chip {size} removable={!disabled} label={tag} onremove={() => removeTag(index)} />
		{/each}

		{#if canAddMore && !disabled}
			<input
				bind:this={inputEl}
				{id}
				type="text"
				bind:value={inputValue}
				placeholder={tags.length === 0 ? placeholder : ''}
				aria-label={label || placeholder || 'Tags'}
				{disabled}
				aria-invalid={invalid ? 'true' : undefined}
				onkeydown={handleKeyDown}
			/>
		{/if}
	</div>
</div>

<style>
	.tag-input-container {
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
		padding: var(--space-xxs) calc(var(--base) * 0.45);
		vertical-align: middle;
		cursor: text;
		transition:
			border-color var(--transition-fast),
			background-color var(--transition-fast),
			box-shadow var(--transition-fast);
	}

	.tag-input-container.block {
		width: 100%;
		display: flex;
	}

	/* Escala de Tamanhos */
	.sm {
		min-height: var(--control-height-sm);
		font-size: var(--text-xs);
		padding: var(--space-xxs) var(--space-xs);
	}

	.md {
		min-height: var(--control-height);
		font-size: var(--text-sm);
		padding: var(--space-xxs) calc(var(--base) * 0.45);
	}

	.lg {
		min-height: var(--control-height-lg);
		font-size: var(--text-md);
		padding: var(--space-xs) var(--space-sm);
	}

	.tags-wrapper {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-xxs);
		width: 100%;
	}

	input {
		flex: 1 1 80px;
		min-width: 60px;
		border: none;
		background: transparent;
		color: inherit;
		font-family: inherit;
		font-size: inherit;
		line-height: var(--leading-normal);
		outline: none;
		padding: var(--space-xxs) var(--space-xs);
	}

	/* Foco Acessível */
	.tag-input-container:has(input:focus-visible):not(.disabled) {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 1px var(--color-primary);
		outline: none;
	}

	/* Estado Inválido */
	.tag-input-container.invalid {
		border-color: var(--color-danger);
	}

	.tag-input-container.invalid:has(input:focus-visible):not(.disabled) {
		border-color: var(--color-danger);
		box-shadow: 0 0 0 1px var(--color-danger);
		outline: none;
	}

	/* Desabilitado */
	.tag-input-container.disabled {
		opacity: 0.5;
		cursor: not-allowed;
		background-color: var(--bg-secondary);
	}

	.tag-input-container.disabled input {
		cursor: not-allowed;
	}

	@media (prefers-reduced-motion: reduce) {
		.tag-input-container {
			transition: none;
		}
	}
</style>
