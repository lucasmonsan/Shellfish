<script lang="ts">
	import type { CheckboxProps } from '$lib/types/index.js';

	let {
		checked = $bindable(false),
		indeterminate = $bindable(false),
		label,
		variant = 'default',
		invalid = false,
		disabled = false,
		children,
		class: className,
		...restProps
	}: CheckboxProps = $props();

	let inputEl = $state<HTMLInputElement>();

	$effect(() => {
		if (inputEl) {
			inputEl.indeterminate = indeterminate;
		}
	});
</script>

{#if variant === 'card'}
	<label
		class={`checkbox-card ${className ?? ''}`}
		data-checked={checked}
		data-disabled={disabled}
		data-invalid={invalid}
	>
		<input
			bind:this={inputEl}
			type="checkbox"
			bind:checked
			{disabled}
			aria-invalid={invalid ? 'true' : undefined}
			{...restProps}
		/>
		{#if children}
			{@render children()}
		{:else if label}
			<span class="card-label-row">
				<span
					class="box"
					data-checked={checked}
					data-indeterminate={indeterminate}
					data-invalid={invalid}
				>
					{#if indeterminate}
						<svg
							viewBox="0 0 16 16"
							fill="none"
							stroke="currentColor"
							stroke-width="3"
							stroke-linecap="round"
						>
							<line x1="3.5" y1="8" x2="12.5" y2="8" />
						</svg>
					{:else if checked}
						<svg
							viewBox="0 0 16 16"
							fill="none"
							stroke="currentColor"
							stroke-width="3"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
						</svg>
					{/if}
				</span>
				<span class="label">{label}</span>
			</span>
		{/if}
	</label>
{:else}
	<label class={className} data-disabled={disabled} data-invalid={invalid}>
		<input
			bind:this={inputEl}
			type="checkbox"
			bind:checked
			{disabled}
			aria-invalid={invalid ? 'true' : undefined}
			{...restProps}
		/>
		<span
			class="box"
			data-checked={checked}
			data-indeterminate={indeterminate}
			data-invalid={invalid}
		>
			{#if indeterminate}
				<svg
					viewBox="0 0 16 16"
					fill="none"
					stroke="currentColor"
					stroke-width="3"
					stroke-linecap="round"
				>
					<line x1="3.5" y1="8" x2="12.5" y2="8" />
				</svg>
			{:else if checked}
				<svg
					viewBox="0 0 16 16"
					fill="none"
					stroke="currentColor"
					stroke-width="3"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
				</svg>
			{/if}
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

	input[type='checkbox'] {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
		margin: 0;
		pointer-events: none;
	}

	.box {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
		box-sizing: border-box;
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		background-color: var(--bg-primary);
		color: var(--color-primary-contrast);
		box-shadow: 1px 1px 0px var(--border-color);
		transition:
			transform 0.12s cubic-bezier(0.4, 0, 0.2, 1),
			background-color 0.15s ease,
			border-color 0.15s ease,
			box-shadow 0.15s ease;
		flex-shrink: 0;
	}

	label:hover:not([data-disabled='true']) .box {
		transform: translate(-1px, -1px);
		box-shadow: 2px 2px 0px var(--border-color);
	}

	input:focus-visible + .box {
		border-color: var(--color-primary);
		box-shadow: 3px 3px 0px var(--color-primary);
		transform: translate(-1px, -1px);
	}

	.box[data-checked='true'],
	.box[data-indeterminate='true'] {
		background-color: var(--color-primary);
		border-color: var(--color-primary);
	}

	.box[data-invalid='true'] {
		border-color: var(--color-danger);
		box-shadow: 2px 2px 0px var(--color-danger);
	}

	.box[data-invalid='true'][data-checked='true'] {
		background-color: var(--color-danger);
		border-color: var(--color-danger);
	}

	svg {
		width: 12px;
		height: 12px;
	}

	.label {
		line-height: 1.25;
	}

	/* Card Variant */
	.checkbox-card {
		position: relative;
		display: flex;
		flex-direction: column;
		padding: var(--space-md);
		box-sizing: border-box;
		background-color: var(--bg-primary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow);
		transition:
			transform 0.12s cubic-bezier(0.4, 0, 0.2, 1),
			box-shadow 0.12s cubic-bezier(0.4, 0, 0.2, 1),
			border-color 0.15s ease,
			background-color 0.15s ease;
	}

	.checkbox-card:hover:not([data-disabled='true']) {
		transform: translate(-1px, -1px);
		box-shadow: 2px 2px 0px var(--border-color);
	}

	.checkbox-card:has(input:focus-visible) {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 3px 3px 0px var(--color-primary);
		transform: translate(-1px, -1px);
	}

	.checkbox-card:active:not([data-disabled='true']) {
		transform: translate(1px, 1px);
		box-shadow: 0px 0px 0px var(--border-color);
	}

	.checkbox-card[data-checked='true'] {
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
		.box,
		.checkbox-card {
			transition: none;
		}
	}
</style>
