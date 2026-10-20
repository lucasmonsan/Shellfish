<script lang="ts">
	import type { SwitchProps } from '$lib/types/forms.js';

	let {
		checked = $bindable(false),
		label,
		size = 'md',
		invalid = false,
		disabled = false,
		children,
		class: className,
		...restProps
	}: SwitchProps = $props();
</script>

<label class="switch-root {size} {className ?? ''}" class:checked class:invalid class:disabled>
	<input
		type="checkbox"
		role="switch"
		aria-checked={checked}
		bind:checked
		{disabled}
		aria-invalid={invalid ? 'true' : undefined}
		{...restProps}
	/>

	<span class="track" aria-hidden="true">
		<span class="thumb"></span>
	</span>

	{#if children}
		<span class="label-text">
			{@render children()}
		</span>
	{:else if label}
		<span class="label-text">{label}</span>
	{/if}
</label>

<style>
	.switch-root {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
		cursor: pointer;
		user-select: none;
		font-family: var(--font-sans);
		color: var(--text-primary);
		vertical-align: middle;
		position: relative;
		line-height: var(--leading-normal);
	}

	.switch-root.disabled {
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

	.track {
		display: inline-flex;
		align-items: center;
		position: relative;
		box-sizing: border-box;
		background-color: var(--bg-secondary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-xs);
		flex-shrink: 0;
		transition:
			background-color 0.15s ease,
			border-color 0.15s ease,
			box-shadow 0.15s ease;
	}

	.thumb {
		position: absolute;
		box-sizing: border-box;
		background-color: var(--bg-primary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-xs);
		transition:
			transform 0.18s cubic-bezier(0.4, 0, 0.2, 1),
			background-color 0.15s ease,
			border-color 0.15s ease;
	}

	/* Escala de tamanhos derivada matematicamente de --base */
	.switch-root.sm {
		font-size: var(--text-xs);
	}
	.switch-root.sm .track {
		width: calc(var(--base) * 1.75);
		height: var(--base);
	}
	.switch-root.sm .thumb {
		width: calc(var(--base) * 0.625);
		height: calc(var(--base) * 0.625);
		left: calc(var(--base) * 0.125);
	}
	.switch-root.sm.checked .thumb {
		transform: translateX(calc(var(--base) * 0.75));
	}

	.switch-root.md {
		font-size: var(--text-sm);
	}
	.switch-root.md .track {
		width: calc(var(--base) * 2.25);
		height: calc(var(--base) * 1.25);
	}
	.switch-root.md .thumb {
		width: calc(var(--base) * 0.8125);
		height: calc(var(--base) * 0.8125);
		left: calc(var(--base) * 0.15625);
	}
	.switch-root.md.checked .thumb {
		transform: translateX(calc(var(--base) * 1));
	}

	.switch-root.lg {
		font-size: var(--text-md);
	}
	.switch-root.lg .track {
		width: calc(var(--base) * 2.75);
		height: calc(var(--base) * 1.5);
	}
	.switch-root.lg .thumb {
		width: var(--base);
		height: var(--base);
		left: calc(var(--base) * 0.1875);
	}
	.switch-root.lg.checked .thumb {
		transform: translateX(calc(var(--base) * 1.25));
	}

	/* Interações */
	.switch-root:hover:not(.disabled) .track {
		border-color: var(--border-strong);
	}

	.switch-root:has(input:focus-visible):not(.disabled) .track {
		border-color: var(--color-primary);
		outline: none;
	}

	.switch-root.checked .track {
		background-color: var(--color-primary);
		border-color: var(--color-primary);
	}

	.switch-root.checked .thumb {
		background-color: var(--color-on-solid);
		border-color: var(--color-primary);
	}

	.switch-root.invalid .track {
		border-color: var(--color-danger);
	}

	.switch-root.invalid:has(input:focus-visible):not(.disabled) .track {
		border-color: var(--color-danger);
		outline: none;
	}

	.switch-root.invalid.checked .track {
		background-color: var(--color-danger);
		border-color: var(--color-danger);
	}

	.label-text {
		display: inline-block;
	}

	@media (prefers-reduced-motion: reduce) {
		.track,
		.thumb {
			transition: none;
		}
	}
</style>
