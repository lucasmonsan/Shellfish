<script lang="ts">
	import type { RowProps } from '$lib/types/index.js';

	let {
		children,
		gap = 'md',
		align = 'center',
		justify = 'start',
		wrap = false,
		fullWidth = false,
		class: className,
		...restProps
	}: RowProps = $props();
</script>

<div
	class={className}
	data-gap={gap}
	data-align={align}
	data-justify={justify}
	data-wrap={wrap}
	data-full-width={fullWidth}
	{...restProps}
>
	{@render children?.()}
</div>

<style>
	div {
		display: flex;
		flex-direction: row;
		box-sizing: border-box;
	}

	div[data-wrap='true'] {
		flex-wrap: wrap;
	}

	div[data-full-width='true'] {
		width: 100%;
	}

	/* Align */
	div[data-align='start'] {
		align-items: flex-start;
	}
	div[data-align='center'] {
		align-items: center;
	}
	div[data-align='end'] {
		align-items: flex-end;
	}
	div[data-align='baseline'] {
		align-items: baseline;
	}
	div[data-align='stretch'] {
		align-items: stretch;
	}

	/* Justify */
	div[data-justify='start'] {
		justify-content: flex-start;
	}
	div[data-justify='center'] {
		justify-content: center;
	}
	div[data-justify='end'] {
		justify-content: flex-end;
	}
	div[data-justify='between'] {
		justify-content: space-between;
	}
	div[data-justify='around'] {
		justify-content: space-around;
	}
	div[data-justify='evenly'] {
		justify-content: space-evenly;
	}

	/* Gaps */
	div[data-gap='none'] {
		gap: var(--space-none);
	}
	div[data-gap='xs'] {
		gap: var(--space-xs);
	}
	div[data-gap='sm'] {
		gap: var(--space-sm);
	}
	div[data-gap='md'] {
		gap: var(--space-md);
	}
	div[data-gap='lg'] {
		gap: var(--space-lg);
	}
	div[data-gap='xl'] {
		gap: var(--space-xl);
	}
	div[data-gap='2xl'] {
		gap: var(--space-2xl);
	}
</style>
