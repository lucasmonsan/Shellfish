<script lang="ts">
	import type { SectionProps } from '$lib/types/layout.js';

	let {
		children,
		gap = 'md',
		padding = 'none',
		contained = false,
		maxWidth,
		class: className = '',
		style = '',
		...restProps
	}: SectionProps = $props();
</script>

<section
	class="{maxWidth ? `max-w-${maxWidth}` : ''} {className}"
	class:contained
	style="--section-gap: var(--space-{gap}); --section-pad: var(--space-{padding}); {style}"
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		gap: var(--section-gap, var(--space-md));
		padding: var(--section-pad, var(--space-none));
		width: 100%;
		box-sizing: border-box;
	}

	section.contained {
		max-width: var(--container-max-width);
		margin: 0 auto;
	}

	section.max-w-sm {
		max-width: var(--container-sm);
		margin-inline: auto;
		width: 100%;
	}

	section.max-w-md {
		max-width: var(--container-md);
		margin-inline: auto;
		width: 100%;
	}

	section.max-w-lg {
		max-width: var(--container-lg);
		margin-inline: auto;
		width: 100%;
	}

	section.max-w-xl {
		max-width: var(--container-xl);
		margin-inline: auto;
		width: 100%;
	}

	section.max-w-full {
		max-width: 100%;
		margin-inline: auto;
		width: 100%;
	}
</style>
