<script lang="ts">
	import type { TextareaProps } from '$lib/types/index.js';

	let {
		value = $bindable(),
		size = 'md',
		invalid = false,
		fullWidth = false,
		resize = 'vertical',
		class: className,
		...restProps
	}: TextareaProps = $props();
</script>

<textarea
	bind:value
	aria-invalid={invalid ? 'true' : undefined}
	data-size={size}
	data-invalid={invalid}
	data-full-width={fullWidth}
	data-resize={resize}
	class={className}
	{...restProps}></textarea>

<style>
	textarea {
		display: block;
		box-sizing: border-box;
		font-family: inherit;
		font-size: var(--text-sm);
		color: var(--text-primary);
		background-color: var(--bg-primary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		box-shadow: var(--shadow);
		outline: none;
		min-height: 80px;
		line-height: 1.5;
		transition:
			transform 0.12s cubic-bezier(0.4, 0, 0.2, 1),
			box-shadow 0.12s cubic-bezier(0.4, 0, 0.2, 1),
			border-color 0.15s ease,
			background-color 0.15s ease;
	}

	textarea:focus-visible {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 2px 2px 0px var(--color-primary);
		transform: translate(-1px, -1px);
	}

	textarea[data-invalid='true'] {
		border-color: var(--color-danger);
		box-shadow: 1px 1px 0px var(--color-danger);
	}

	textarea[data-invalid='true']:focus-visible {
		box-shadow: 2px 2px 0px var(--color-danger);
		transform: translate(-1px, -1px);
	}

	textarea:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		background-color: var(--bg-secondary);
		box-shadow: none;
		transform: none;
	}

	/* Tamanhos */
	textarea[data-size='sm'] {
		padding: var(--space-xs) var(--space-sm);
		font-size: var(--text-xs);
	}

	textarea[data-size='md'] {
		padding: var(--space-sm) var(--space-md);
		font-size: var(--text-sm);
	}

	textarea[data-size='lg'] {
		padding: var(--space-md) var(--space-lg);
		font-size: var(--text-base);
	}

	textarea[data-full-width='true'] {
		width: 100%;
	}

	/* Resize Controls */
	textarea[data-resize='none'] {
		resize: none;
	}
	textarea[data-resize='vertical'] {
		resize: vertical;
	}
	textarea[data-resize='horizontal'] {
		resize: horizontal;
	}
	textarea[data-resize='both'] {
		resize: both;
	}

	@media (prefers-reduced-motion: reduce) {
		textarea {
			transition: none;
		}
	}
</style>
