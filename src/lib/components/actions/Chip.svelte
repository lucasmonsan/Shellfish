<script lang="ts">
	import type { ChipProps } from '$lib/types/index.js';
	import { t } from '$lib/utils/i18n.svelte.js';

	let {
		children,
		selected = false,
		removable = false,
		size = 'md',
		variant = 'secondary',
		onremove,
		class: className,
		...restProps
	}: ChipProps = $props();

	function handleRemove(e: MouseEvent) {
		e.stopPropagation();
		onremove?.(e);
	}
</script>

<button
	type="button"
	data-size={size}
	data-variant={variant}
	data-selected={selected}
	data-removable={removable}
	class={`shellfish-chip ${className ?? ''}`}
	{...restProps}
>
	<span class="chip-content">
		{@render children?.()}
	</span>
	{#if removable}
		<span
			role="button"
			tabindex="0"
			class="chip-remove-btn"
			aria-label={t('common.close')}
			onclick={handleRemove}
			onkeydown={(e) => e.key === 'Enter' && handleRemove(e as unknown as MouseEvent)}
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
		</span>
	{/if}
</button>

<style>
	.shellfish-chip {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-xs);
		box-sizing: border-box;
		background-color: var(--bg-primary);
		color: var(--text-primary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		box-shadow: 1px 1px 0px var(--border-color);
		font-family: inherit;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.02em;
		cursor: pointer;
		user-select: none;
		vertical-align: middle;
		white-space: nowrap;
		transition:
			transform 0.12s cubic-bezier(0.4, 0, 0.2, 1),
			box-shadow 0.12s cubic-bezier(0.4, 0, 0.2, 1),
			background-color 0.15s ease,
			border-color 0.15s ease,
			color 0.15s ease;
	}

	/* Tamanhos */
	.shellfish-chip[data-size='sm'] {
		height: 24px;
		padding: 0 var(--space-xs);
		font-size: var(--text-xs);
	}
	.shellfish-chip[data-size='md'] {
		height: 30px;
		padding: 0 var(--space-sm);
		font-size: var(--text-xs);
	}
	.shellfish-chip[data-size='lg'] {
		height: 36px;
		padding: 0 var(--space-md);
		font-size: var(--text-sm);
	}

	/* Interatividade */
	.shellfish-chip:hover:not(:disabled) {
		transform: translate(-1px, -1px);
		box-shadow: 2px 2px 0px var(--border-color);
	}

	.shellfish-chip:active:not(:disabled) {
		transform: translate(1px, 1px);
		box-shadow: 0px 0px 0px var(--border-color);
	}

	.shellfish-chip:focus-visible {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 3px 3px 0px var(--color-primary);
		transform: translate(-1px, -1px);
	}

	/* Selecionado */
	.shellfish-chip[data-selected='true'] {
		background-color: var(--color-primary);
		color: var(--color-primary-contrast);
		border-color: var(--border-color);
		box-shadow: 2px 2px 0px var(--border-color);
		transform: translate(-1px, -1px);
	}

	.shellfish-chip:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		transform: none;
		box-shadow: none;
	}

	.chip-remove-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		margin: 0 0 0 2px;
		cursor: pointer;
		opacity: 0.75;
		transition: opacity 0.15s ease;
	}

	.chip-remove-btn:hover {
		opacity: 1;
	}

	svg {
		width: 12px;
		height: 12px;
	}

	@media (prefers-reduced-motion: reduce) {
		.shellfish-chip {
			transition: none;
		}
	}
</style>
