<script lang="ts">
	import type { ButtonProps } from '$lib/types/index.js';

	let {
		children,
		type = 'button',
		variant = 'primary',
		size = 'md',
		fullWidth = false,
		iconOnly = false,
		loading = false,
		disabled = false,
		casing = 'uppercase',
		class: className,
		...restProps
	}: ButtonProps = $props();

	let isDisabled = $derived(disabled || loading);
</script>

<button
	{type}
	disabled={isDisabled}
	aria-busy={loading ? 'true' : undefined}
	data-variant={variant}
	data-size={size}
	data-full-width={fullWidth}
	data-icon-only={iconOnly}
	data-casing={casing}
	data-loading={loading}
	class={className}
	{...restProps}
>
	{#if loading}
		<svg
			class="button-spinner"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="3"
			stroke-linecap="round"
			aria-hidden="true"
		>
			<circle cx="12" cy="12" r="9" stroke-opacity="0.25" />
			<path d="M12 3a9 9 0 0 1 9 9" />
		</svg>
	{/if}
	{@render children?.()}
</button>

<style>
	button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-sm);
		box-sizing: border-box;
		font-family: inherit;
		font-weight: 800;
		line-height: 1;
		text-align: center;
		white-space: nowrap;
		user-select: none;
		vertical-align: middle;
		cursor: pointer;
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow);
		transform: translate(0, 0);
		transition:
			transform 0.12s cubic-bezier(0.4, 0, 0.2, 1),
			box-shadow 0.12s cubic-bezier(0.4, 0, 0.2, 1),
			background-color 0.15s ease,
			border-color 0.15s ease,
			color 0.15s ease;
	}

	button[data-casing='uppercase'] {
		text-transform: uppercase;
		letter-spacing: 0.02em;
	}

	button[data-casing='none'] {
		text-transform: none;
	}

	/* Micro-interação tátil e física de clique */
	button:hover:not(:disabled) {
		transform: translate(-1px, -1px);
		box-shadow: 3px 3px 0px var(--border-color);
	}

	button:active:not(:disabled) {
		transform: translate(2px, 2px);
		box-shadow: 0px 0px 0px var(--border-color);
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		transform: none;
		box-shadow: var(--shadow);
	}

	/* Variantes */
	button[data-variant='primary'] {
		background-color: var(--color-primary);
		color: var(--color-primary-contrast);
	}
	button[data-variant='primary']:hover:not(:disabled) {
		background-color: var(--color-primary-hover);
	}

	button[data-variant='secondary'] {
		background-color: var(--bg-secondary);
		color: var(--text-primary);
	}
	button[data-variant='secondary']:hover:not(:disabled) {
		background-color: var(--bg-primary);
	}

	button[data-variant='outline'] {
		background-color: transparent;
		color: var(--text-primary);
	}
	button[data-variant='outline']:hover:not(:disabled) {
		background-color: var(--bg-secondary);
	}

	button[data-variant='ghost'] {
		background-color: transparent;
		border-color: transparent;
		box-shadow: none;
		color: var(--text-primary);
	}
	button[data-variant='ghost']:hover:not(:disabled) {
		background-color: var(--bg-secondary);
		border-color: var(--border-color);
		box-shadow: var(--shadow);
	}

	button[data-variant='danger'] {
		background-color: var(--color-danger);
		color: #ffffff;
	}
	button[data-variant='danger']:hover:not(:disabled) {
		background-color: #b0352e;
	}

	/* Tamanhos */
	button[data-size='sm'] {
		height: var(--control-height-sm);
		padding-inline: var(--space-sm);
		font-size: var(--text-xs);
		border-radius: var(--radius-sm);
	}

	button[data-size='md'] {
		height: var(--control-height-md);
		padding-inline: var(--space-md);
		font-size: var(--text-sm);
	}

	button[data-size='lg'] {
		height: var(--control-height-lg);
		padding-inline: var(--space-lg);
		font-size: var(--text-base);
	}

	/* Botão Quadrado / Apenas Ícone */
	button[data-icon-only='true'] {
		padding: 0;
		aspect-ratio: 1;
		width: auto;
	}

	button[data-icon-only='true'][data-size='sm'] {
		width: var(--control-height-sm);
	}
	button[data-icon-only='true'][data-size='md'] {
		width: var(--control-height-md);
	}
	button[data-icon-only='true'][data-size='lg'] {
		width: var(--control-height-lg);
	}

	/* Largura Total */
	button[data-full-width='true'] {
		width: 100%;
	}

	/* Spinner de Carregamento */
	.button-spinner {
		width: 1.1em;
		height: 1.1em;
		animation: spin 0.75s linear infinite;
		flex-shrink: 0;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		button {
			transition: none;
		}
		.button-spinner {
			animation-duration: 1.5s;
		}
	}
</style>
