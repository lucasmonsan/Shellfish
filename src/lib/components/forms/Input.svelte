<script lang="ts">
	import type { InputProps } from '$lib/types/index.js';

	let {
		value = $bindable(),
		type = 'text',
		size = 'md',
		invalid = false,
		fullWidth = false,
		prefix,
		suffix,
		class: className,
		...restProps
	}: InputProps = $props();
</script>

{#if prefix || suffix}
	<div
		class={className}
		data-size={size}
		data-invalid={invalid}
		data-full-width={fullWidth}
		data-disabled={restProps.disabled}
	>
		{#if prefix}
			<span class="prefix">{@render prefix()}</span>
		{/if}
		<input
			{type}
			bind:value
			aria-invalid={invalid ? 'true' : undefined}
			data-size={size}
			{...restProps}
		/>
		{#if suffix}
			<span class="suffix">{@render suffix()}</span>
		{/if}
	</div>
{:else}
	<input
		{type}
		bind:value
		aria-invalid={invalid ? 'true' : undefined}
		data-size={size}
		data-invalid={invalid}
		data-full-width={fullWidth}
		class={className}
		{...restProps}
	/>
{/if}

<style>
	input {
		display: inline-flex;
		align-items: center;
		box-sizing: border-box;
		font-family: inherit;
		font-size: var(--text-sm);
		color: var(--text-primary);
		background-color: var(--bg-primary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		box-shadow: var(--shadow);
		outline: none;
		transition:
			transform 0.12s cubic-bezier(0.4, 0, 0.2, 1),
			box-shadow 0.12s cubic-bezier(0.4, 0, 0.2, 1),
			border-color 0.15s ease,
			background-color 0.15s ease;
	}

	input:focus-visible {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 2px 2px 0px var(--color-primary);
		transform: translate(-1px, -1px);
	}

	input[data-invalid='true'] {
		border-color: var(--color-danger);
		box-shadow: 1px 1px 0px var(--color-danger);
	}

	input[data-invalid='true']:focus-visible {
		box-shadow: 2px 2px 0px var(--color-danger);
		transform: translate(-1px, -1px);
	}

	input:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		background-color: var(--bg-secondary);
		box-shadow: none;
		transform: none;
	}

	/* Tamanhos */
	input[data-size='sm'] {
		height: var(--control-height-sm);
		padding-inline: var(--space-sm);
		font-size: var(--text-xs);
	}

	input[data-size='md'] {
		height: var(--control-height-md);
		padding-inline: var(--space-md);
		font-size: var(--text-sm);
	}

	input[data-size='lg'] {
		height: var(--control-height-lg);
		padding-inline: var(--space-lg);
		font-size: var(--text-base);
	}

	input[data-full-width='true'] {
		width: 100%;
	}

	/* Grupo de Input com Prefixo / Sufixo */
	div {
		display: inline-flex;
		align-items: center;
		box-sizing: border-box;
		background-color: var(--bg-primary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		box-shadow: var(--shadow);
		transition:
			transform 0.12s cubic-bezier(0.4, 0, 0.2, 1),
			box-shadow 0.12s cubic-bezier(0.4, 0, 0.2, 1),
			border-color 0.15s ease;
	}

	div:focus-within {
		border-color: var(--color-primary);
		box-shadow: 2px 2px 0px var(--color-primary);
		transform: translate(-1px, -1px);
	}

	div[data-invalid='true'] {
		border-color: var(--color-danger);
		box-shadow: 2px 2px 0px var(--color-danger);
	}

	div[data-invalid='true']:focus-within {
		box-shadow: 3px 3px 0px var(--color-danger);
		transform: translate(-1px, -1px);
	}

	div input {
		flex: 1;
		width: 100%;
		border: none;
		outline: none;
		background: transparent;
		color: var(--text-primary);
		font-family: inherit;
		font-size: inherit;
		padding-inline: var(--space-sm);
		height: 100%;
		box-shadow: none;
		transform: none;
	}

	div[data-size='sm'] {
		height: var(--control-height-sm);
		font-size: var(--text-xs);
	}
	div[data-size='md'] {
		height: var(--control-height-md);
		font-size: var(--text-sm);
	}
	div[data-size='lg'] {
		height: var(--control-height-lg);
		font-size: var(--text-base);
	}

	div[data-full-width='true'] {
		width: 100%;
	}

	.prefix,
	.suffix {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding-inline: var(--space-sm);
		color: var(--text-secondary);
		flex-shrink: 0;
	}

	@media (prefers-reduced-motion: reduce) {
		input,
		div {
			transition: none;
		}
	}
</style>
