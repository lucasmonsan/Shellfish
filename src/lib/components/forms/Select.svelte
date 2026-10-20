<script lang="ts">
	import type { SelectProps } from '$lib/types/forms.js';
	import Popover from '$lib/components/overlay/Popover.svelte';
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

	let triggerEl = $state<HTMLButtonElement>();
	let nativeSelectEl = $state<HTMLSelectElement>();
	let focusedIndex = $state(-1);

	let selectedOption = $derived(options.find((opt) => String(opt.value) === String(value)));

	let displayLabel = $derived(selectedOption ? selectedOption.label : placeholder || '');

	export function focus() {
		triggerEl?.focus();
	}

	function select(val: string, close?: () => void) {
		if (disabled) return;
		const previousVal = value;
		value = val;
		close?.();
		triggerEl?.focus();

		if (previousVal !== val && nativeSelectEl) {
			nativeSelectEl.value = val;
			nativeSelectEl.dispatchEvent(new Event('change', { bubbles: true }));
		}
	}

	function findNextEnabledIndex(current: number, direction: 1 | -1): number {
		const len = options.length;
		if (len === 0 || options.every((o) => o.disabled)) return -1;
		let start = current;
		if (start < 0) {
			start = direction === 1 ? -1 : len;
		}
		let next = start;
		for (let i = 0; i < len; i++) {
			next = (next + direction + len) % len;
			if (!options[next]?.disabled) return next;
		}
		return current >= 0 ? current : -1;
	}

	function handleKeydown(
		e: KeyboardEvent,
		open: boolean,
		toggle: (event?: MouseEvent | KeyboardEvent) => void,
		close: () => void
	) {
		if (disabled) return;

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (!open) {
				toggle(e);
				const matchIndex = options.findIndex(
					(o) => String(o.value) === String(value) && !o.disabled
				);
				focusedIndex = matchIndex >= 0 ? matchIndex : findNextEnabledIndex(-1, 1);
			} else {
				focusedIndex = findNextEnabledIndex(focusedIndex, 1);
			}
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (!open) {
				toggle(e);
				const matchIndex = options.findIndex(
					(o) => String(o.value) === String(value) && !o.disabled
				);
				focusedIndex = matchIndex >= 0 ? matchIndex : findNextEnabledIndex(options.length, -1);
			} else {
				focusedIndex = findNextEnabledIndex(focusedIndex, -1);
			}
		} else if (e.key === 'Enter' || e.key === ' ') {
			if (open && focusedIndex >= 0 && focusedIndex < options.length) {
				e.preventDefault();
				const opt = options[focusedIndex];
				if (!opt.disabled) {
					select(opt.value, close);
				}
			}
		}
	}
</script>

<div class="select-root {className}" class:block class:disabled class:invalid {style}>
	<Popover disabled={Boolean(disabled)} align="start" offset={4} class="select-popover-wrapper">
		{#snippet trigger(toggle, open, ariaProps)}
			<div class="trigger-wrapper">
				<button
					bind:this={triggerEl}
					type="button"
					role="combobox"
					class="select-trigger {size}"
					class:block
					class:open
					class:invalid
					class:has-placeholder={!selectedOption && Boolean(placeholder)}
					{id}
					disabled={Boolean(disabled)}
					aria-invalid={invalid ? 'true' : undefined}
					onclick={toggle}
					onkeydown={(e) => handleKeydown(e, open, toggle, () => toggle())}
					{...ariaProps}
					aria-haspopup="listbox"
				>
					<span class="select-label">
						{displayLabel}
					</span>

					<span class="chevron" class:rotate={open} aria-hidden="true">
						<ChevronDown size={size === 'sm' ? 12 : size === 'lg' ? 16 : 14} />
					</span>
				</button>

				<!-- Fallback nativo transparente apenas para toque/mobile -->
				<select
					bind:this={nativeSelectEl}
					bind:value
					disabled={Boolean(disabled)}
					tabindex="-1"
					aria-hidden="true"
					class="mobile-native-select"
					{...restProps}
				>
					{#if placeholder}
						<option value="" disabled hidden={Boolean(value)}>{placeholder}</option>
					{/if}
					{#if children}
						{@render children()}
					{:else}
						{#each options as opt (opt.value)}
							<option value={opt.value} disabled={opt.disabled}>{opt.label}</option>
						{/each}
					{/if}
				</select>
			</div>
		{/snippet}

		{#snippet content(close)}
			<div class="select-listbox" role="listbox" aria-label={placeholder || 'Opções'} tabindex="-1">
				{#if options.length > 0}
					{#each options as opt, idx (opt.value)}
						{@const isSelected = String(opt.value) === String(value)}
						{@const isFocused = focusedIndex === idx}
						<button
							type="button"
							role="option"
							class="select-option {size}"
							class:selected={isSelected}
							class:focused={isFocused}
							aria-selected={isSelected}
							disabled={opt.disabled}
							onclick={() => select(opt.value, close)}
						>
							<span class="option-label">{opt.label}</span>
							{#if isSelected}
								<svg
									viewBox="0 0 16 16"
									fill="none"
									stroke="currentColor"
									stroke-width="2.2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="check-icon"
								>
									<polyline points="3 8.5 6.5 12 13 4.5" />
								</svg>
							{/if}
						</button>
					{/each}
				{:else if children}
					<div class="empty-notice">
						{@render children()}
					</div>
				{/if}
			</div>
		{/snippet}
	</Popover>
</div>

<style>
	.select-root {
		display: inline-flex;
		box-sizing: border-box;
		vertical-align: middle;
	}

	.select-root.block {
		width: 100%;
		display: flex;
	}

	.select-root :global(.select-popover-wrapper) {
		width: 100%;
	}

	.select-root :global(.select-popover-wrapper .popover-trigger) {
		width: 100%;
	}

	.trigger-wrapper {
		position: relative;
		width: 100%;
		display: flex;
	}

	.select-trigger {
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		width: 100%;
		height: var(--control-height);
		min-height: var(--control-height);
		padding: 0 var(--control-padding-md);
		border-radius: var(--radius-xs);
		border: var(--border-width) solid var(--border-color);
		background-color: var(--bg-input);
		color: var(--text-primary);
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		line-height: var(--leading-none);
		cursor: pointer;
		user-select: none;
		outline: none;
		text-align: left;
		transition:
			border-color var(--transition-fast),
			background-color var(--transition-fast),
			box-shadow var(--transition-fast);
	}

	/* Escala de Tamanhos */
	.select-trigger.sm {
		height: var(--control-height-sm);
		min-height: var(--control-height-sm);
		font-size: var(--text-xs);
		padding: 0 var(--control-padding-sm);
	}

	.select-trigger.md {
		height: var(--control-height);
		min-height: var(--control-height);
		font-size: var(--text-sm);
		padding: 0 var(--control-padding-md);
	}

	.select-trigger.lg {
		height: var(--control-height-lg);
		min-height: var(--control-height-lg);
		font-size: var(--text-md);
		padding: 0 var(--control-padding-lg);
	}

	.select-trigger.has-placeholder .select-label {
		color: var(--text-muted);
	}

	.select-label {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.select-trigger:hover:not(:disabled) {
		border-color: var(--border-strong);
	}

	.select-trigger:focus-visible,
	.select-trigger.open {
		border-color: var(--color-primary);
		outline: none;
	}

	.select-trigger.invalid {
		border-color: var(--color-danger);
	}

	.select-trigger.invalid:focus-visible {
		border-color: var(--color-danger);
		outline: none;
	}

	.select-trigger:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		background-color: var(--bg-secondary);
	}

	.chevron {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: var(--text-muted);
		margin-left: var(--space-xs);
		flex-shrink: 0;
		transition: transform var(--transition-fast);
	}

	.chevron.rotate {
		transform: rotate(180deg);
	}

	/* Mobile Native Select Overlay */
	.mobile-native-select {
		display: none;
	}

	@media (pointer: coarse) {
		.mobile-native-select {
			display: block;
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			opacity: 0;
			cursor: pointer;
			border: none;
			margin: 0;
			padding: 0;
			z-index: 2;
		}
	}

	/* Lista Dropdown Popover */
	.select-listbox {
		box-sizing: border-box;
		background-color: var(--bg-elevated);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-xs);
		box-shadow: var(--shadow-md);
		min-width: 180px;
		max-width: calc(100vw - var(--space-md) * 2);
		max-height: 240px;
		overflow-y: auto;
		padding: var(--space-xxs);
		display: flex;
		flex-direction: column;
		gap: var(--space-xxs);
	}

	.select-option {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		box-sizing: border-box;
		min-height: var(--control-height-sm);
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-xs);
		border: none;
		background: transparent;
		color: var(--text-primary);
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		line-height: var(--leading-normal);
		cursor: pointer;
		text-align: left;
		transition:
			background-color var(--transition-fast),
			color var(--transition-fast);
	}

	.select-option.sm {
		font-size: var(--text-xs);
		min-height: calc(var(--control-height-sm) * 0.85);
		padding: var(--space-xxs) var(--space-xs);
	}

	.select-option.lg {
		font-size: var(--text-md);
		min-height: var(--control-height);
		padding: var(--space-sm) var(--space-md);
	}

	.select-option:hover:not(:disabled),
	.select-option.focused:not(:disabled) {
		background-color: var(--bg-secondary);
	}

	.select-option.selected {
		background-color: var(--color-primary-selected);
		color: var(--color-primary);
		font-weight: 600;
	}

	.select-option:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.option-label {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.check-icon {
		width: 14px;
		height: 14px;
		color: var(--color-primary);
		margin-left: var(--space-xs);
		flex-shrink: 0;
	}

	.empty-notice {
		padding: var(--space-sm);
		font-size: var(--text-xs);
		color: var(--text-muted);
	}

	@media (prefers-reduced-motion: reduce) {
		.select-trigger,
		.chevron,
		.select-option {
			transition: none;
		}
	}
</style>
