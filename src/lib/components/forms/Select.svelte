<script lang="ts">
	import type { SelectProps } from '$lib/types/index.js';

	let {
		children,
		value = $bindable(),
		size = 'md',
		invalid = false,
		fullWidth = false,
		label,
		options,
		placeholder,
		id,
		class: className,
		...restProps
	}: SelectProps = $props();

	const autoId = `select-${Math.random().toString(36).slice(2, 9)}`;
	let selectId = $derived(id || autoId);
</script>

<div
	class={`select-wrapper ${className ?? ''}`}
	data-size={size}
	data-invalid={invalid}
	data-full-width={fullWidth}
	data-has-label={label ? 'true' : undefined}
	data-disabled={restProps.disabled}
>
	{#if label}
		<label for={selectId} class="select-straddled-label">
			{label}
			{#if restProps.required}
				<span class="required" aria-hidden="true">*</span>
			{/if}
		</label>
	{/if}
	<select
		id={selectId}
		bind:value
		aria-invalid={invalid ? 'true' : undefined}
		data-size={size}
		{...restProps}
	>
		{#if placeholder}
			<option value="" disabled selected={value === undefined || value === ''}>
				{placeholder}
			</option>
		{/if}
		{#if options}
			{#each options as opt (opt.value)}
				<option value={opt.value} disabled={opt.disabled}>{opt.label}</option>
			{/each}
		{:else}
			{@render children?.()}
		{/if}
	</select>
	<span class="arrow" aria-hidden="true">
		<svg
			viewBox="0 0 16 16"
			fill="none"
			stroke="currentColor"
			stroke-width="2.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<polyline points="4 6 8 10 12 6" />
		</svg>
	</span>
</div>

<style>
	.select-wrapper {
		position: relative;
		display: inline-flex;
		align-items: center;
		box-sizing: border-box;
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		background-color: var(--bg-primary);
		box-shadow: var(--shadow);
		transition:
			transform 0.12s cubic-bezier(0.4, 0, 0.2, 1),
			box-shadow 0.12s cubic-bezier(0.4, 0, 0.2, 1),
			border-color 0.15s ease,
			background-color 0.15s ease;
	}

	.select-wrapper[data-has-label='true'] {
		margin-top: var(--space-xs);
	}

	.select-straddled-label {
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

	.select-straddled-label .required {
		color: var(--color-danger);
	}

	.select-wrapper:focus-within {
		border-color: var(--color-primary);
		box-shadow: 2px 2px 0px var(--color-primary);
		transform: translate(-1px, -1px);
	}

	.select-wrapper:focus-within .select-straddled-label {
		color: var(--color-primary);
	}

	.select-wrapper[data-invalid='true'] {
		border-color: var(--color-danger);
		box-shadow: 1px 1px 0px var(--color-danger);
	}

	.select-wrapper[data-invalid='true']:focus-within {
		box-shadow: 2px 2px 0px var(--color-danger);
		transform: translate(-1px, -1px);
	}

	.select-wrapper[data-invalid='true'] .select-straddled-label {
		border-color: var(--color-danger);
		color: var(--color-danger);
	}

	.select-wrapper[data-disabled='true'] {
		opacity: 0.5;
		cursor: not-allowed;
		background-color: var(--bg-secondary);
		box-shadow: none;
		transform: none;
	}

	select {
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		font-family: inherit;
		background: transparent;
		color: var(--text-primary);
		border: none;
		outline: none;
		width: 100%;
		box-sizing: border-box;
		cursor: pointer;
		padding-right: var(--space-xl);
	}

	select:disabled {
		cursor: not-allowed;
	}

	option {
		background-color: var(--bg-primary);
		color: var(--text-primary);
		font-family: inherit;
		font-weight: 700;
	}

	option:disabled {
		color: var(--text-secondary);
		opacity: 0.5;
	}

	/* Tamanhos */
	.select-wrapper[data-size='sm'] {
		height: var(--control-height-sm);
	}
	.select-wrapper[data-size='sm'] select {
		height: 100%;
		padding-left: var(--space-sm);
		font-size: var(--text-xs);
	}

	.select-wrapper[data-size='md'] {
		height: var(--control-height-md);
	}
	.select-wrapper[data-size='md'] select {
		height: 100%;
		padding-left: var(--space-md);
		font-size: var(--text-sm);
	}

	.select-wrapper[data-size='lg'] {
		height: var(--control-height-lg);
	}
	.select-wrapper[data-size='lg'] select {
		height: 100%;
		padding-left: var(--space-lg);
		font-size: var(--text-base);
	}

	.select-wrapper[data-full-width='true'] {
		width: 100%;
	}

	.arrow {
		position: absolute;
		right: var(--space-sm);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
		color: var(--text-secondary);
		width: 16px;
		height: 16px;
	}

	.arrow svg {
		width: 100%;
		height: 100%;
	}
</style>
