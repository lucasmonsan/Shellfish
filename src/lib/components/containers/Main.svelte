<script lang="ts">
	import type { MainProps } from '$lib/types/index.js';

	let {
		children,
		fullWidth = false,
		fullHeight = true,
		gap = 'none',
		padding = 'none',
		class: className,
		...restProps
	}: MainProps = $props();
</script>

<main
	data-full-width={fullWidth}
	data-full-height={fullHeight}
	data-padding={padding}
	data-gap={gap}
	class={className}
	{...restProps}
>
	{@render children?.()}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		width: 100%;
		box-sizing: border-box;
		position: relative;
		margin-inline: auto;
		background-color: var(--bg-primary);
		color: var(--text-primary);
	}

	main[data-full-height='true'] {
		height: 100dvh;
		max-height: 100dvh;
		overflow: hidden;
	}

	main[data-full-width='false'] {
		max-width: 1280px;
	}

	main[data-full-width='true'] {
		max-width: 100%;
	}

	/* Paddings */
	main[data-padding='none'] {
		padding: var(--space-none);
	}
	main[data-padding='xs'] {
		padding: var(--space-xs);
	}
	main[data-padding='sm'] {
		padding: var(--space-sm);
	}
	main[data-padding='md'] {
		padding: var(--space-md);
	}
	main[data-padding='lg'] {
		padding: var(--space-lg);
	}
	main[data-padding='xl'] {
		padding: var(--space-xl);
	}
	main[data-padding='2xl'] {
		padding: var(--space-2xl);
	}

	/* Gaps */
	main[data-gap='none'] {
		gap: var(--space-none);
	}
	main[data-gap='xs'] {
		gap: var(--space-xs);
	}
	main[data-gap='sm'] {
		gap: var(--space-sm);
	}
	main[data-gap='md'] {
		gap: var(--space-md);
	}
	main[data-gap='lg'] {
		gap: var(--space-lg);
	}
	main[data-gap='xl'] {
		gap: var(--space-xl);
	}
	main[data-gap='2xl'] {
		gap: var(--space-2xl);
	}
</style>
