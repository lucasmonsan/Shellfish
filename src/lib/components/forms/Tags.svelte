<script lang="ts">
	import type { TagsProps } from '$lib/types/forms.js';
	import Tag from './Tag.svelte';
	import { getI18n } from '$lib/utils/i18n.svelte.js';

	let {
		tags = $bindable([]),
		maxTags,
		placeholder,
		size = 'md',
		invalid = false,
		disabled = false,
		block = true,
		id,
		label,
		ontagschange,
		class: className = '',
		...restProps
	}: TagsProps = $props();

	const i18n = getI18n();
	let resolvedPlaceholder = $derived(placeholder ?? i18n.t('forms.tags_placeholder'));

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
			<Tag {size} removable={!disabled} label={tag} onremove={() => removeTag(index)} />
		{/each}

		{#if canAddMore && !disabled}
			<input
				bind:this={inputEl}
				{id}
				type="text"
				bind:value={inputValue}
				placeholder={tags.length === 0 ? resolvedPlaceholder : ''}
				aria-label={label || resolvedPlaceholder}
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
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		padding: var(--space-xs);
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
		padding: var(--space-xxs);
	}

	.md {
		min-height: var(--control-height);
		font-size: var(--text-sm);
		padding: var(--space-xs);
	}

	.lg {
		min-height: var(--control-height-lg);
		font-size: var(--text-md);
		padding: var(--space-sm);
	}

	.tags-wrapper {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-xxs);
		width: 100%;
	}

	input {
		flex: 1 1 0px;
		min-width: calc(var(--base) * 2);
		border: none;
		background: transparent;
		color: inherit;
		font-family: inherit;
		font-size: inherit;
		line-height: var(--leading-normal);
		outline: none;
		padding: 0 var(--space-xxs);
	}

	/* Interações */
	.tag-input-container:hover:not(.disabled):not(:has(input:focus-visible)) {
		border-color: var(--border-strong);
	}

	/* Foco Acessível */
	.tag-input-container:has(input:focus-visible):not(.disabled) {
		border-color: var(--color-primary);
		outline: none;
	}

	/* Estado Inválido */
	.tag-input-container.invalid {
		border-color: var(--color-danger);
	}

	.tag-input-container.invalid:has(input:focus-visible):not(.disabled) {
		border-color: var(--color-danger);
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
