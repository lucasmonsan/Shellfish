<script lang="ts">
	import type { DividerProps } from '$lib/types/index.js';

	let {
		label,
		spacing = 'md',
		vertical = false,
		class: className,
		...restProps
	}: DividerProps = $props();
</script>

{#if label}
	<div
		role="separator"
		aria-orientation={vertical ? 'vertical' : 'horizontal'}
		data-spacing={spacing}
		data-vertical={vertical}
		class={className}
		{...restProps}
	>
		<span>{label}</span>
	</div>
{:else}
	<hr
		aria-orientation={vertical ? 'vertical' : 'horizontal'}
		data-spacing={spacing}
		data-vertical={vertical}
		class={className}
		{...restProps}
	/>
{/if}

<style>
	hr {
		border: none;
		border-top: var(--border-width) solid var(--border-color);
		width: 100%;
		margin: 0;
		box-sizing: border-box;
	}

	hr[data-vertical='true'] {
		width: 0;
		height: 100%;
		border-top: none;
		border-left: var(--border-width) solid var(--border-color);
		display: inline-block;
	}

	/* Spacings para HR */
	hr[data-spacing='none'] {
		margin-block: var(--space-none);
	}
	hr[data-spacing='xs'] {
		margin-block: var(--space-xs);
	}
	hr[data-spacing='sm'] {
		margin-block: var(--space-sm);
	}
	hr[data-spacing='md'] {
		margin-block: var(--space-md);
	}
	hr[data-spacing='lg'] {
		margin-block: var(--space-lg);
	}
	hr[data-spacing='xl'] {
		margin-block: var(--space-xl);
	}
	hr[data-spacing='2xl'] {
		margin-block: var(--space-2xl);
	}

	/* Spacings verticais para HR */
	hr[data-vertical='true'][data-spacing='xs'] {
		margin-inline: var(--space-xs);
		margin-block: 0;
	}
	hr[data-vertical='true'][data-spacing='sm'] {
		margin-inline: var(--space-sm);
		margin-block: 0;
	}
	hr[data-vertical='true'][data-spacing='md'] {
		margin-inline: var(--space-md);
		margin-block: 0;
	}
	hr[data-vertical='true'][data-spacing='lg'] {
		margin-inline: var(--space-lg);
		margin-block: 0;
	}

	/* Divider com Rótulo (Label) */
	div {
		display: flex;
		align-items: center;
		width: 100%;
		text-align: center;
		box-sizing: border-box;
	}

	div::before,
	div::after {
		content: '';
		flex: 1;
		border-top: var(--border-width) solid var(--border-color);
	}

	div span {
		padding-inline: var(--space-sm);
		font-family: inherit;
		font-size: var(--text-xs);
		font-weight: 700;
		text-transform: uppercase;
		color: var(--text-secondary);
		letter-spacing: 0.05em;
	}

	/* Spacings para Div */
	div[data-spacing='none'] {
		margin-block: var(--space-none);
	}
	div[data-spacing='xs'] {
		margin-block: var(--space-xs);
	}
	div[data-spacing='sm'] {
		margin-block: var(--space-sm);
	}
	div[data-spacing='md'] {
		margin-block: var(--space-md);
	}
	div[data-spacing='lg'] {
		margin-block: var(--space-lg);
	}
	div[data-spacing='xl'] {
		margin-block: var(--space-xl);
	}
	div[data-spacing='2xl'] {
		margin-block: var(--space-2xl);
	}
</style>
