<script lang="ts">
	import type { SwitchProps } from '$lib/types/index.js';

	let {
		checked = $bindable(false),
		label,
		size = 'md',
		invalid = false,
		disabled = false,
		class: className,
		...restProps
	}: SwitchProps = $props();
</script>

<label
	class={`shellfish-switch-label ${className ?? ''}`}
	data-size={size}
	data-disabled={disabled}
	data-invalid={invalid}
>
	<input
		type="checkbox"
		role="switch"
		aria-checked={checked}
		bind:checked
		{disabled}
		{...restProps}
	/>
	<span class="switch-track" data-checked={checked} data-invalid={invalid}>
		<span class="switch-thumb"></span>
	</span>
	{#if label}
		<span class="switch-text">{label}</span>
	{/if}
</label>

<style>
	.shellfish-switch-label {
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

	.shellfish-switch-label[data-disabled='true'] {
		cursor: not-allowed;
		opacity: 0.5;
	}

	input[type='checkbox'] {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
		margin: 0;
		pointer-events: none;
	}

	.switch-track {
		position: relative;
		display: inline-flex;
		align-items: center;
		box-sizing: border-box;
		background-color: var(--bg-secondary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		box-shadow: 1px 1px 0px var(--border-color);
		transition:
			background-color 0.15s ease,
			border-color 0.15s ease,
			transform 0.12s ease,
			box-shadow 0.12s ease;
		flex-shrink: 0;
	}

	.switch-thumb {
		position: absolute;
		box-sizing: border-box;
		background-color: var(--bg-primary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		transition:
			transform 0.18s cubic-bezier(0.4, 0, 0.2, 1),
			background-color 0.15s ease;
	}

	/* Tamanhos */
	.shellfish-switch-label[data-size='sm'] .switch-track {
		width: 32px;
		height: 18px;
	}
	.shellfish-switch-label[data-size='sm'] .switch-thumb {
		width: 12px;
		height: 12px;
		left: 1px;
	}
	.shellfish-switch-label[data-size='sm'] .switch-track[data-checked='true'] .switch-thumb {
		transform: translateX(14px);
	}

	.shellfish-switch-label[data-size='md'] .switch-track {
		width: 44px;
		height: 24px;
	}
	.shellfish-switch-label[data-size='md'] .switch-thumb {
		width: 16px;
		height: 16px;
		left: 2px;
	}
	.shellfish-switch-label[data-size='md'] .switch-track[data-checked='true'] .switch-thumb {
		transform: translateX(20px);
	}

	.shellfish-switch-label[data-size='lg'] .switch-track {
		width: 56px;
		height: 30px;
	}
	.shellfish-switch-label[data-size='lg'] .switch-thumb {
		width: 22px;
		height: 22px;
		left: 2px;
	}
	.shellfish-switch-label[data-size='lg'] .switch-track[data-checked='true'] .switch-thumb {
		transform: translateX(26px);
	}

	/* Hover & Focus */
	.shellfish-switch-label:hover:not([data-disabled='true']) .switch-track {
		border-color: var(--color-primary);
		transform: translate(-1px, -1px);
		box-shadow: 2px 2px 0px var(--border-color);
	}

	input:focus-visible + .switch-track {
		border-color: var(--color-primary);
		box-shadow: 3px 3px 0px var(--color-primary);
		transform: translate(-1px, -1px);
	}

	.switch-track[data-checked='true'] {
		background-color: var(--color-primary);
		border-color: var(--border-color);
	}

	.switch-track[data-checked='true'] .switch-thumb {
		background-color: #ffffff;
		border-color: var(--border-color);
	}

	.switch-track[data-invalid='true'] {
		border-color: var(--color-danger);
		box-shadow: 2px 2px 0px var(--color-danger);
	}

	.switch-text {
		line-height: 1.25;
	}

	@media (prefers-reduced-motion: reduce) {
		.switch-track,
		.switch-thumb {
			transition: none;
		}
	}
</style>
