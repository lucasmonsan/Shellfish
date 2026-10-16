<script lang="ts">
	import type { SectionProps } from '$lib/types/layout.js';

	let {
		children,
		gap = 'md',
		padding = 'none',
		contained = false,
		class: className = '',
		style = '',
		...restProps
	}: SectionProps = $props();
</script>

<section
	class={className}
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
</style>
