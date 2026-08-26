<script lang="ts">
	import type { ChipsProps } from '$lib/types/index.js';
	import { getI18n } from '$lib/utils/i18n.svelte.js';

	let {
		value = $bindable([]),
		label,
		placeholder,
		disabled = false,
		invalid = false,
		suggestions = [],
		fullWidth = false,
		name,
		class: className,
		onadd,
		onremove,
		...restProps
	}: ChipsProps = $props();

	const { t } = getI18n();

	let inputValue = $state('');
	let inputEl = $state<HTMLInputElement>();
	let containerEl = $state<HTMLDivElement>();
	let isFocused = $state(false);

	let fallbackId = `shellfish-chips-${Math.random().toString(36).slice(2, 11)}`;
	let activeId = $derived(restProps.id ?? fallbackId);
	let suggestionsId = $derived(`${activeId}-suggestions`);

	let activePlaceholder = $derived(
		placeholder ?? (value.length === 0 ? t('chips.placeholder') : '')
	);

	let availableSuggestions = $derived(
		suggestions.filter(
			(s, idx) =>
				s.trim() !== '' &&
				suggestions.findIndex((c) => c.trim().toLowerCase() === s.trim().toLowerCase()) === idx &&
				!value.some((tag) => tag.toLowerCase() === s.trim().toLowerCase())
		)
	);

	function addTag() {
		const cleanTag = inputValue.trim().replace(/,$/, '');
		if (cleanTag === '') return;

		const canonicalTag =
			suggestions.find((s) => s.trim().toLowerCase() === cleanTag.toLowerCase())?.trim() ??
			cleanTag;

		if (!value.some((tag) => tag.toLowerCase() === canonicalTag.toLowerCase())) {
			value = [...value, canonicalTag];
			onadd?.(canonicalTag);
			inputValue = '';
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (disabled) return;

		if (e.key === 'Enter' || e.key === ',') {
			e.preventDefault();
			addTag();
		} else if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
			const removed = value[value.length - 1];
			value = value.slice(0, -1);
			onremove?.(removed);
		}
	}

	function removeTag(index: number, e: MouseEvent) {
		e.stopPropagation();
		if (disabled) return;
		const removed = value[index];
		value = value.filter((_, i) => i !== index);
		onremove?.(removed);
	}

	function focusInput() {
		if (!disabled) {
			inputEl?.focus();
		}
	}
</script>

<div
	class="shellfish-chips-wrapper"
	class:full-width={fullWidth}
	data-disabled={disabled}
	data-invalid={invalid}
>
	{#if label}
		<label for={activeId} class="chips-label">
			{label}
		</label>
	{/if}

	<!-- Container de entrada interativo -->
	<div
		bind:this={containerEl}
		class={`shellfish-chips-container ${className ?? ''}`}
		class:focused={isFocused}
		class:disabled
		class:invalid
		onclick={focusInput}
		{...restProps}
	>
		<ul class="chips-list">
			{#each value as tag, index (tag)}
				<li class="chip-item">
					<span class="chip-text">{tag}</span>
					<button
						type="button"
						class="chip-remove-btn"
						{disabled}
						onclick={(e) => removeTag(index, e)}
						aria-label={t('chips.remove', { tag })}
					>
						<svg
							viewBox="0 0 16 16"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="round"
						>
							<line x1="4" y1="4" x2="12" y2="12" />
							<line x1="12" y1="4" x2="4" y2="12" />
						</svg>
					</button>
				</li>
			{/each}

			<li class="chips-input-item">
				<input
					bind:this={inputEl}
					type="text"
					id={activeId}
					{name}
					bind:value={inputValue}
					list={availableSuggestions.length > 0 ? suggestionsId : undefined}
					placeholder={value.length === 0 ? activePlaceholder : ''}
					{disabled}
					aria-invalid={invalid ? 'true' : undefined}
					class="chips-input"
					onfocus={() => (isFocused = true)}
					onblur={() => {
						isFocused = false;
						addTag();
					}}
					onkeydown={handleKeyDown}
				/>
			</li>
		</ul>

		{#if availableSuggestions.length > 0}
			<datalist id={suggestionsId}>
				{#each availableSuggestions as suggestion (suggestion)}
					<option value={suggestion}></option>
				{/each}
			</datalist>
		{/if}
	</div>
</div>

<style>
	.shellfish-chips-wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		box-sizing: border-box;
		font-family: inherit;
	}

	.shellfish-chips-wrapper.full-width {
		width: 100%;
	}

	.chips-label {
		font-family: var(--font-display);
		font-size: var(--text-xs);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-primary);
		cursor: pointer;
	}

	.shellfish-chips-container {
		display: flex;
		align-items: center;
		min-height: 42px;
		padding: 4px var(--space-xs);
		box-sizing: border-box;
		background-color: var(--bg-primary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		box-shadow: 1px 1px 0px var(--border-color);
		cursor: text;
		transition:
			transform 0.12s cubic-bezier(0.4, 0, 0.2, 1),
			box-shadow 0.12s cubic-bezier(0.4, 0, 0.2, 1),
			border-color 0.15s ease;
	}

	.shellfish-chips-container:hover:not(.disabled) {
		transform: translate(-1px, -1px);
		box-shadow: 2px 2px 0px var(--border-color);
	}

	.shellfish-chips-container.focused:not(.disabled) {
		transform: translate(-1px, -1px);
		box-shadow: 2px 2px 0px var(--border-color);
		border-color: var(--border-color);
	}

	.shellfish-chips-container.invalid {
		border-color: var(--color-danger);
		box-shadow: 2px 2px 0px var(--color-danger);
	}

	.shellfish-chips-container.disabled {
		opacity: 0.5;
		cursor: not-allowed;
		transform: none;
		box-shadow: none;
	}

	.chips-list {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
		align-items: center;
		width: 100%;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.chip-item {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		height: 28px;
		padding: 0 var(--space-xs);
		background-color: var(--bg-secondary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		box-shadow: 1px 1px 0px var(--border-color);
		font-family: inherit;
		font-size: var(--text-xs);
		font-weight: 700;
		color: var(--text-primary);
		user-select: none;
		white-space: nowrap;
	}

	.chip-text {
		display: inline-block;
		line-height: 1;
	}

	.chip-remove-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		margin: 0;
		background: transparent;
		border: none;
		cursor: pointer;
		color: var(--text-secondary);
		border-radius: var(--radius-sm);
		transition: color 0.15s ease;
	}

	.chip-remove-btn:hover:not(:disabled) {
		color: var(--color-primary);
	}

	.chip-remove-btn:disabled {
		cursor: not-allowed;
	}

	.chip-remove-btn svg {
		width: 11px;
		height: 11px;
	}

	.chips-input-item {
		display: inline-flex;
		flex: 1 1 100px;
		min-width: 80px;
	}

	.chips-input {
		width: 100%;
		border: none;
		outline: none;
		background: transparent;
		font-family: inherit;
		font-size: var(--text-sm);
		color: var(--text-primary);
		padding: 2px var(--space-xs);
	}

	.chips-input::placeholder {
		color: var(--text-secondary);
		opacity: 0.7;
	}

	.chips-input:disabled {
		cursor: not-allowed;
	}
</style>
