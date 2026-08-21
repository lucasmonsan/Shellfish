<script lang="ts">
	import type { InputProps } from '$lib/types/index.js';

	let {
		value = $bindable(),
		type = 'text',
		size = 'md',
		invalid = false,
		fullWidth = false,
		label,
		prefix,
		suffix,
		id,
		class: className,
		...restProps
	}: InputProps = $props();

	const autoId = `input-${Math.random().toString(36).slice(2, 9)}`;
	let inputId = $derived(id || autoId);
</script>

{#if label || prefix || suffix}
	<div
		class={`input-wrapper ${className ?? ''}`}
		data-size={size}
		data-invalid={invalid}
		data-full-width={fullWidth}
		data-has-label={label ? 'true' : undefined}
		data-disabled={restProps.disabled}
	>
		{#if label}
			<label for={inputId} class="input-straddled-label">
				{label}
				{#if restProps.required}
					<span class="required" aria-hidden="true">*</span>
				{/if}
			</label>
		{/if}
		{#if prefix}
			<span class="prefix">{@render prefix()}</span>
		{/if}
		<input
			{type}
			id={inputId}
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
		id={inputId}
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

	/* Wrapper com Label Presilha / Prefixo / Sufixo */
	.input-wrapper {
		position: relative;
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

	.input-wrapper[data-has-label='true'] {
		margin-top: var(--space-xs);
	}

	.input-straddled-label {
		position: absolute;
		top: 0;
		left: var(--space-sm);
		transform: translateY(-50%);
		display: inline-flex;
		align-items: center;
		gap: 2px;
		padding-inline: 4px;
		background-color: var(--bg-primary);
		color: var(--text-secondary);
		font-family: var(--font-display);
		font-size: var(--text-xs);
		font-weight: 700;
		line-height: 1;
		white-space: nowrap;
		z-index: 2;
		pointer-events: none;
		user-select: none;
		transition: color 0.15s ease;
	}

	.input-straddled-label .required {
		color: var(--color-danger);
	}

	.input-wrapper:focus-within {
		border-color: var(--color-primary);
		box-shadow: 2px 2px 0px var(--color-primary);
		transform: translate(-1px, -1px);
	}

	.input-wrapper:focus-within .input-straddled-label {
		color: var(--color-primary);
	}

	.input-wrapper[data-invalid='true'] {
		border-color: var(--color-danger);
		box-shadow: 1px 1px 0px var(--color-danger);
	}

	.input-wrapper[data-invalid='true']:focus-within {
		box-shadow: 2px 2px 0px var(--color-danger);
		transform: translate(-1px, -1px);
	}

	.input-wrapper[data-invalid='true'] .input-straddled-label {
		border-color: var(--color-danger);
		color: var(--color-danger);
	}

	.input-wrapper[data-disabled='true'] {
		opacity: 0.5;
		cursor: not-allowed;
		background-color: var(--bg-secondary);
		box-shadow: none;
		transform: none;
	}

	.input-wrapper[data-full-width='true'] {
		width: 100%;
	}

	.input-wrapper input {
		border: none;
		box-shadow: none;
		transform: none;
		background: transparent;
		flex: 1;
		width: 100%;
		height: 100%;
	}

	.input-wrapper input:focus-visible {
		box-shadow: none;
		transform: none;
	}

	.input-wrapper[data-size='sm'] {
		height: var(--control-height-sm);
	}
	.input-wrapper[data-size='md'] {
		height: var(--control-height-md);
	}
	.input-wrapper[data-size='lg'] {
		height: var(--control-height-lg);
	}

	.prefix,
	.suffix {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding-inline: var(--space-xs);
		color: var(--text-secondary);
		user-select: none;
		flex-shrink: 0;
	}
</style>
