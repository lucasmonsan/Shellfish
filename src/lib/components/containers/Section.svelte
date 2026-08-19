<script lang="ts">
	import type { SectionProps } from '$lib/types/index.js';

	let {
		children,
		scrollable = false,
		padding = 'md',
		gap = 'md',
		class: className,
		...restProps
	}: SectionProps = $props();

	let sectionEl = $state<HTMLElement>();
	let hasTopOverflow = $state(false);
	let hasBottomOverflow = $state(false);
	let rafId: number | null = null;

	function checkScroll() {
		if (!sectionEl || !scrollable) return;
		const { scrollTop, scrollHeight, clientHeight } = sectionEl;
		const maxScroll = scrollHeight - clientHeight;

		// Tolerância de 2px para evitar oscilação de subpixel
		hasTopOverflow = scrollTop > 2;
		hasBottomOverflow = maxScroll - scrollTop > 2;
	}

	function requestScrollCheck() {
		if (rafId !== null) cancelAnimationFrame(rafId);
		rafId = requestAnimationFrame(() => {
			checkScroll();
			rafId = null;
		});
	}

	$effect(() => {
		if (!scrollable || !sectionEl) {
			hasTopOverflow = false;
			hasBottomOverflow = false;
			return;
		}

		checkScroll();

		const resizeObserver = new ResizeObserver(() => {
			requestScrollCheck();
		});

		resizeObserver.observe(sectionEl);
		sectionEl.addEventListener('scroll', requestScrollCheck, { passive: true });

		return () => {
			resizeObserver.disconnect();
			sectionEl?.removeEventListener('scroll', requestScrollCheck);
			if (rafId !== null) {
				cancelAnimationFrame(rafId);
				rafId = null;
			}
		};
	});
</script>

<section
	bind:this={sectionEl}
	data-scrollable={scrollable}
	data-padding={padding}
	data-gap={gap}
	data-overflow-top={hasTopOverflow}
	data-overflow-bottom={hasBottomOverflow}
	class={className}
	{...restProps}
>
	{@render children?.()}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		width: 100%;
		box-sizing: border-box;
		position: relative;
		background-color: var(--bg-primary);
		color: var(--text-primary);
	}

	/* Scrollable Mode */
	section[data-scrollable='true'] {
		flex: 1;
		min-height: 0;
		overflow-y: auto;
		overflow-x: hidden;
		scrollbar-width: thin;
		scrollbar-color: var(--border-color) transparent;
	}

	/* Fade de Rolagem Sutil via Pseudo-elementos (Zero Div-Soup) */
	section[data-scrollable='true']::before,
	section[data-scrollable='true']::after {
		content: '';
		position: sticky;
		left: 0;
		right: 0;
		height: 24px;
		pointer-events: none;
		z-index: var(--z-sticky);
		opacity: 0;
		transition: opacity 0.2s ease;
		flex-shrink: 0;
	}

	section[data-scrollable='true']::before {
		top: 0;
		margin-bottom: -24px;
		background: linear-gradient(to bottom, var(--bg-primary) 0%, transparent 100%);
	}

	section[data-scrollable='true']::after {
		bottom: 0;
		margin-top: -24px;
		background: linear-gradient(to top, var(--bg-primary) 0%, transparent 100%);
	}

	section[data-scrollable='true'][data-overflow-top='true']::before {
		opacity: 1;
	}

	section[data-scrollable='true'][data-overflow-bottom='true']::after {
		opacity: 1;
	}

	/* Paddings */
	section[data-padding='none'] {
		padding: var(--space-none);
	}
	section[data-padding='xs'] {
		padding: var(--space-xs);
	}
	section[data-padding='sm'] {
		padding: var(--space-sm);
	}
	section[data-padding='md'] {
		padding: var(--space-md);
	}
	section[data-padding='lg'] {
		padding: var(--space-lg);
	}
	section[data-padding='xl'] {
		padding: var(--space-xl);
	}
	section[data-padding='2xl'] {
		padding: var(--space-2xl);
	}

	/* Gaps */
	section[data-gap='none'] {
		gap: var(--space-none);
	}
	section[data-gap='xs'] {
		gap: var(--space-xs);
	}
	section[data-gap='sm'] {
		gap: var(--space-sm);
	}
	section[data-gap='md'] {
		gap: var(--space-md);
	}
	section[data-gap='lg'] {
		gap: var(--space-lg);
	}
	section[data-gap='xl'] {
		gap: var(--space-xl);
	}
	section[data-gap='2xl'] {
		gap: var(--space-2xl);
	}

	@media (prefers-reduced-motion: reduce) {
		section[data-scrollable='true']::before,
		section[data-scrollable='true']::after {
			transition: none;
		}
	}
</style>
