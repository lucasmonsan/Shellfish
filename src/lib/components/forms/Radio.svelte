<script lang="ts">
	import type { RadioProps } from '$lib/types/index.js';

	let {
		group = $bindable(),
		value,
		label,
		variant = 'default',
		invalid = false,
		disabled = false,
		children,
		class: className,
		...restProps
	}: RadioProps = $props();

	let isChecked = $derived(group !== undefined && value !== undefined && group === value);
</script>

{#if variant === 'card'}
	<label
		class={`radio-card ${className ?? ''}`}
		data-checked={isChecked}
		data-disabled={disabled}
		data-invalid={invalid}
	>
		<input type="radio" bind:group {value} {disabled} {...restProps} />
		{#if children}
			{@render children()}
		{:else if label}
			<span class="card-label-row">
				<span class="circle" data-checked={isChecked} data-invalid={invalid}>
					<span class="dot"></span>
				</span>
				<span class="label">{label}</span>
			</span>
		{/if}
	</label>
{:else}
	<label class={className} data-disabled={disabled} data-invalid={invalid}>
		<input type="radio" bind:group {value} {disabled} {...restProps} />
		<span class="circle" data-checked={isChecked} data-invalid={invalid}>
			<span class="dot"></span>
		</span>
		{#if label}
			<span class="label">{label}</span>
		{/if}
	</label>
{/if}

<style>
	label {
		display: inline-flex;
		align-items: center;
		gap: var(--space-sm);
		cursor: pointer;
		user-select: none;
		font-family: inherit;
		font-size: var(--text-sm);
		color: var(--text-primary);
		vertical-align: middle;
	}

	label[data-disabled='true'] {
		cursor: not-allowed;
		opacity: 0.5;
	}

	input[type='radio'] {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
		margin: 0;
		pointer-events: none;
	}

	.circle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
		box-sizing: border-box;
		border: var(--border-width) solid var(--border-color);
		border-radius: 50%;
		background-color: var(--bg-primary);
		box-shadow: 1px 1px 0px var(--border-color);
		transition:
			transform 0.12s cubic-bezier(0.4, 0, 0.2, 1),
			background-color 0.15s ease,
			box-shadow 0.15s ease;
		flex-shrink: 0;
	}

	label:hover:not([data-disabled='true']) .circle {
		transform: translate(-1px, -1px);
		box-shadow: 2px 2px 0px var(--border-color);
	}

	input:focus-visible + .circle {
		border-color: var(--color-primary);
		box-shadow: 3px 3px 0px var(--color-primary);
		transform: translate(-1px, -1px);
	}

	.circle[data-checked='true'] {
		border-color: var(--color-primary);
	}

	.circle[data-invalid='true'] {
		border-color: var(--color-danger);
		box-shadow: 2px 2px 0px var(--color-danger);
	}

	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color: var(--color-primary);
		transform: scale(0);
		transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.circle[data-checked='true'] .dot {
		transform: scale(1);
	}

	.circle[data-invalid='true'] .dot {
		background-color: var(--color-danger);
	}

	.label {
		line-height: 1.25;
	}

	/* Card Variant */
	.radio-card {
		position: relative;
		display: flex;
		flex-direction: column;
		padding: var(--space-md);
		box-sizing: border-box;
		background-color: var(--bg-primary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow);
		cursor: pointer;
		transition:
			transform 0.12s cubic-bezier(0.4, 0, 0.2, 1),
			box-shadow 0.12s cubic-bezier(0.4, 0, 0.2, 1),
			background-color 0.15s ease;
	}

	.radio-card:hover:not([data-disabled='true']) {
		transform: translate(-1px, -1px);
		box-shadow: 2px 2px 0px var(--border-color);
	}

	.radio-card:has(input:focus-visible) {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 3px 3px 0px var(--color-primary);
		transform: translate(-1px, -1px);
	}

	.radio-card:active:not([data-disabled='true']) {
		transform: translate(1px, 1px);
		box-shadow: 0px 0px 0px var(--border-color);
	}

	.radio-card[data-checked='true'] {
		border-color: var(--color-primary);
		box-shadow: 2px 2px 0px var(--color-primary);
		background-color: var(--bg-secondary);
	}

	.card-label-row {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
	}

	@media (prefers-reduced-motion: reduce) {
		.circle,
		.dot,
		.radio-card {
			transition: none;
		}
	}
</style>
