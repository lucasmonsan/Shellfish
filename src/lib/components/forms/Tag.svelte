<script lang="ts">
	import type { TagProps } from '$lib/types/forms.js';
	import X from '$lib/components/icons/X.svelte';
	import { getI18n } from '$lib/utils/i18n.svelte.js';

	let {
		variant = 'secondary',
		size = 'md',
		selected,
		removable = false,
		disabled = false,
		avatar = false,
		removeLabel,
		label,
		onremove,
		onclick,
		children,
		class: className = '',
		...restProps
	}: TagProps = $props();

	const i18n = getI18n();
	let resolvedRemoveLabel = $derived(removeLabel ?? i18n.t('forms.tag_remove'));

	// Se tem botão de remoção interno, o container NÃO pode ser role="button" (W3C HTML-AAM nested-interactive)
	const isButton = $derived(!removable && (Boolean(onclick) || selected !== undefined));

	function handleKeyDown(event: KeyboardEvent) {
		if (disabled) return;

		if (event.key === 'Enter' || event.key === ' ') {
			if (onclick && isButton) {
				event.preventDefault();
				onclick(event as unknown as MouseEvent);
			}
		} else if ((event.key === 'Backspace' || event.key === 'Delete') && removable && onremove) {
			event.preventDefault();
			onremove(event);
		}
	}

	function handleRemoveClick(event: MouseEvent) {
		event.stopPropagation();
		if (!disabled && onremove) {
			onremove(event);
		}
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<span
	role={isButton ? 'button' : undefined}
	tabindex={isButton && !disabled ? 0 : undefined}
	aria-pressed={isButton && selected !== undefined ? selected : undefined}
	aria-disabled={isButton && disabled ? 'true' : undefined}
	class="chip-root {variant} {size} {className}"
	class:has-avatar={avatar}
	class:selected={selected === true}
	class:removable
	class:disabled
	class:interactive={isButton && !disabled}
	onclick={isButton ? onclick : undefined}
	onkeydown={handleKeyDown}
	{...restProps}
>
	<span class="label-content">
		{#if children}
			{@render children()}
		{:else if label}
			{label}
		{/if}
	</span>

	{#if removable}
		<button
			type="button"
			class="remove-button"
			aria-label={resolvedRemoveLabel}
			{disabled}
			tabindex={disabled ? -1 : 0}
			onclick={handleRemoveClick}
		>
			<X size={size === 'sm' ? 10 : size === 'lg' ? 14 : 12} />
		</button>
	{/if}
</span>

<style>
	.chip-root {
		display: inline-flex;
		align-items: center;
		position: relative;
		box-sizing: border-box;
		border-radius: var(--radius-xs);
		border: var(--border-width) solid var(--border-color);
		font-family: var(--font-mono);
		font-weight: 500;
		line-height: var(--leading-none);
		white-space: nowrap;
		user-select: none;
		vertical-align: middle;
		transition:
			background-color var(--transition-fast),
			border-color var(--transition-fast),
			box-shadow var(--transition-fast),
			color var(--transition-fast);
	}

	.chip-root.interactive {
		cursor: pointer;
	}

	.chip-root.interactive:focus-visible {
		border-color: var(--color-primary);
		outline: none;
	}

	.chip-root.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* Escala de Tamanhos */
	.sm {
		height: calc(var(--base) * 1.25);
		font-size: var(--text-xs);
		padding: 0 var(--space-xs);
		gap: var(--space-xxs);
	}
	.sm.removable {
		padding-right: 0;
		gap: 0;
	}

	.md {
		height: calc(var(--base) * 1.5);
		font-size: var(--text-xs);
		padding: 0 var(--space-sm);
		gap: var(--space-xxs);
	}
	.md.removable {
		padding-right: 0;
		gap: 0;
	}

	.lg {
		height: calc(var(--base) * 1.875);
		font-size: var(--text-sm);
		padding: 0 var(--space-sm);
		gap: var(--space-xxs);
	}
	.lg.removable {
		padding-right: 0;
		gap: 0;
	}

	/* Avatar Chip */
	.chip-root.has-avatar {
		padding-left: 0;
	}
	.chip-root.has-avatar .label-content {
		gap: var(--space-xs);
	}

	/* Variantes */
	.primary {
		background-color: var(--color-primary);
		color: var(--color-primary-contrast);
		border-color: var(--color-primary);
	}

	.secondary {
		background-color: var(--bg-secondary);
		color: var(--text-primary);
	}

	.secondary.interactive:hover:not(.disabled) {
		background-color: var(--bg-elevated);
		border-color: var(--border-strong);
	}

	.outline {
		background-color: transparent;
		color: var(--text-primary);
		border-color: var(--border-strong);
	}

	.outline.interactive:hover:not(.disabled) {
		background-color: var(--color-primary-subtle);
		border-color: var(--color-primary);
	}

	.ghost {
		background-color: transparent;
		color: var(--text-secondary);
		border-color: transparent;
	}

	.ghost.interactive:hover:not(.disabled) {
		background-color: var(--bg-secondary);
		color: var(--text-primary);
	}

	.success {
		background-color: var(--color-success-subtle);
		color: var(--color-success);
		border-color: var(--color-success);
	}

	.warning {
		background-color: var(--color-warning-subtle);
		color: var(--color-warning-contrast);
		border-color: var(--color-warning);
	}

	.danger {
		background-color: var(--color-danger-subtle);
		color: var(--color-danger);
		border-color: var(--color-danger);
	}

	/* Estado Selecionado */
	.chip-root.selected {
		background-color: var(--color-primary);
		color: var(--color-primary-contrast);
		border-color: var(--color-primary);
	}

	.label-content {
		display: inline-flex;
		align-items: center;
		gap: inherit;
	}

	/* Botão de Remoção */
	.remove-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: calc(var(--base) * 1.5);
		height: calc(var(--base) * 1.5);
		min-width: calc(var(--base) * 1.5);
		min-height: calc(var(--base) * 1.5);
		padding: 0;
		margin: 0;
		border: none;
		background: transparent;
		color: inherit;
		cursor: pointer;
		border-radius: var(--radius-xs);
		opacity: 0.7;
		transition:
			opacity var(--transition-fast),
			transform var(--transition-fast);
	}

	.remove-button:hover:not(:disabled) {
		opacity: 1;
		transform: scale(1.15);
	}

	.remove-button:focus-visible {
		outline: 1px solid currentColor;
		opacity: 1;
	}

	@media (prefers-reduced-motion: reduce) {
		.chip-root,
		.remove-button {
			transition: none;
		}
	}
</style>
