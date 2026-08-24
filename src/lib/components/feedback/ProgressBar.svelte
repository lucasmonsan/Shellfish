<script lang="ts">
	import type { ProgressBarProps } from '$lib/types/index.js';

	let {
		value = 0,
		max = 100,
		size = 'md',
		variant = 'primary',
		striped = false,
		showLabel = false,
		label,
		class: className,
		...restProps
	}: ProgressBarProps = $props();

	let percentage = $derived(
		Math.min(Math.max(Math.round(((value ?? 0) / (max || 100)) * 100), 0), 100)
	);
</script>

<div
	role="progressbar"
	aria-valuenow={value}
	aria-valuemin={0}
	aria-valuemax={max}
	aria-label={label ?? `${percentage}%`}
	data-size={size}
	data-variant={variant}
	data-striped={striped}
	class={`shellfish-progress-container ${className ?? ''}`}
	{...restProps}
>
	<div class="progress-fill" style:width="{percentage}%">
		{#if showLabel && size !== 'sm'}
			<span class="progress-label">{percentage}%</span>
		{/if}
	</div>
</div>

<style>
	.shellfish-progress-container {
		position: relative;
		width: 100%;
		box-sizing: border-box;
		background-color: var(--bg-secondary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		box-shadow: 1px 1px 0px var(--border-color);
		overflow: hidden;
		display: flex;
		align-items: center;
	}

	.progress-fill {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-right: var(--space-xs);
		box-sizing: border-box;
		background-color: var(--color-primary);
		transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		min-width: 0;
	}

	/* Variantes */
	.shellfish-progress-container[data-variant='primary'] .progress-fill {
		background-color: var(--color-primary);
	}
	.shellfish-progress-container[data-variant='secondary'] .progress-fill {
		background-color: var(--color-blue-light);
	}
	.shellfish-progress-container[data-variant='success'] .progress-fill {
		background-color: var(--color-green-light);
	}
	.shellfish-progress-container[data-variant='warning'] .progress-fill {
		background-color: var(--color-yellow);
	}
	.shellfish-progress-container[data-variant='danger'] .progress-fill {
		background-color: var(--color-danger);
	}

	/* Listrado Neobrutalista */
	.shellfish-progress-container[data-striped='true'] .progress-fill {
		background-image: repeating-linear-gradient(
			45deg,
			transparent,
			transparent 8px,
			color-mix(in srgb, var(--border-color) 15%, transparent) 8px,
			color-mix(in srgb, var(--border-color) 15%, transparent) 16px
		);
	}

	/* Tamanhos */
	.shellfish-progress-container[data-size='sm'] {
		height: 8px;
	}
	.shellfish-progress-container[data-size='md'] {
		height: 16px;
	}
	.shellfish-progress-container[data-size='lg'] {
		height: 24px;
	}

	.progress-label {
		font-family: var(--font-display);
		font-size: var(--text-xs);
		font-weight: 800;
		color: var(--color-primary-contrast);
		line-height: 1;
		user-select: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.progress-fill {
			transition: none;
		}
	}
</style>
