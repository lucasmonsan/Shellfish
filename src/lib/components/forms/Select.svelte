<script lang="ts">
	import type { SelectProps } from '$lib/types/index.js';

	let {
		children,
		value = $bindable(),
		size = 'md',
		invalid = false,
		fullWidth = false,
		options,
		placeholder,
		class: className,
		...restProps
	}: SelectProps = $props();
</script>

<div
	class={className}
	data-size={size}
	data-invalid={invalid}
	data-full-width={fullWidth}
	data-disabled={restProps.disabled}
>
	<select bind:value aria-invalid={invalid ? 'true' : undefined} data-size={size} {...restProps}>
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
	div {
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

	div:focus-within {
		border-color: var(--color-primary);
		box-shadow: 2px 2px 0px var(--color-primary);
		transform: translate(-1px, -1px);
	}

	div[data-invalid='true'] {
		border-color: var(--color-danger);
		box-shadow: 1px 1px 0px var(--color-danger);
	}

	div[data-invalid='true']:focus-within {
		box-shadow: 2px 2px 0px var(--color-danger);
		transform: translate(-1px, -1px);
	}

	div[data-disabled='true'] {
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

	/* Tamanhos */
	div[data-size='sm'] {
		height: var(--control-height-sm);
	}
	div[data-size='sm'] select {
		height: 100%;
		padding-left: var(--space-sm);
		font-size: var(--text-xs);
	}

	div[data-size='md'] {
		height: var(--control-height-md);
	}
	div[data-size='md'] select {
		height: 100%;
		padding-left: var(--space-md);
		font-size: var(--text-sm);
	}

	div[data-size='lg'] {
		height: var(--control-height-lg);
	}
	div[data-size='lg'] select {
		height: 100%;
		padding-left: var(--space-lg);
		font-size: var(--text-base);
	}

	div[data-full-width='true'] {
		width: 100%;
	}

	.arrow {
		position: absolute;
		right: var(--space-sm);
		pointer-events: none;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: var(--text-secondary);
	}

	svg {
		width: 14px;
		height: 14px;
	}

	@media (prefers-reduced-motion: reduce) {
		div {
			transition: none;
		}
	}
</style>
