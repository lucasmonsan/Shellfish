<script lang="ts">
	import type { FooterProps } from '$lib/types/index.js';

	let {
		children,
		sticky = false,
		padding = 'sm',
		expandable = false,
		open = $bindable(true),
		class: className,
		...restProps
	}: FooterProps = $props();
</script>

<footer
	data-sticky={sticky}
	data-padding={padding}
	data-expandable={expandable}
	data-collapsed={expandable && !open ? 'true' : undefined}
	class={className}
	{...restProps}
>
	{#if expandable}
		<div class="footer-expand-wrapper" class:collapsed={!open}>
			<div class="footer-expand-inner">
				{@render children?.()}
			</div>
		</div>
	{:else}
		{@render children?.()}
	{/if}
</footer>

<style>
	footer {
		display: flex;
		align-items: center;
		width: 100%;
		box-sizing: border-box;
		background-color: var(--bg-primary);
		color: var(--text-primary);
		flex-shrink: 0;
		transition: border-color 0.25s ease;
	}

	footer[data-sticky='true'] {
		position: sticky;
		bottom: 0;
		z-index: var(--z-sticky);
		border-top: var(--border-width) solid var(--border-color);
	}

	footer[data-expandable='true'][data-collapsed='true'] {
		border-top-color: transparent;
	}

	.footer-expand-wrapper {
		width: 100%;
		display: grid;
		grid-template-rows: 1fr;
		transition: grid-template-rows 0.28s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.footer-expand-wrapper.collapsed {
		grid-template-rows: 0fr;
	}

	.footer-expand-inner {
		overflow: visible;
		min-height: 0;
		display: flex;
		align-items: center;
		width: 100%;
	}

	.footer-expand-wrapper.collapsed .footer-expand-inner {
		overflow: hidden;
	}

	/* Paddings */
	footer[data-padding='none'] {
		padding: var(--space-none);
	}
	footer[data-padding='xs'] {
		padding: var(--space-xs);
	}
	footer[data-padding='sm'] {
		padding: var(--space-sm);
	}
	footer[data-padding='md'] {
		padding: var(--space-md);
	}
	footer[data-padding='lg'] {
		padding: var(--space-lg);
	}
	footer[data-padding='xl'] {
		padding: var(--space-xl);
	}
	footer[data-padding='2xl'] {
		padding: var(--space-2xl);
	}

	@media (prefers-reduced-motion: reduce) {
		footer,
		.footer-expand-wrapper {
			transition: none;
		}
	}
</style>
