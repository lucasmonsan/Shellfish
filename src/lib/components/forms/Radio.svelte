<script lang="ts">
	import type { RadioProps } from '$lib/types/index.js';

	let {
		group = $bindable(),
		value,
		label,
		invalid = false,
		disabled = false,
		class: className,
		...restProps
	}: RadioProps = $props();

	let isChecked = $derived(group !== undefined && value !== undefined && group === value);
</script>

<label class={className} data-disabled={disabled} data-invalid={invalid}>
	<input type="radio" bind:group {value} {disabled} {...restProps} />
	<span class="circle" data-checked={isChecked} data-invalid={invalid}>
		<span class="dot"></span>
	</span>
	{#if label}
		<span class="label">{label}</span>
	{/if}
</label>

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
			border-color 0.15s ease,
			box-shadow 0.15s ease;
		flex-shrink: 0;
	}

	label:hover:not([data-disabled='true']) .circle {
		border-color: var(--color-primary);
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

	@media (prefers-reduced-motion: reduce) {
		.circle,
		.dot {
			transition: none;
		}
	}
</style>
