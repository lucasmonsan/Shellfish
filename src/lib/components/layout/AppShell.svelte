<script lang="ts">
	import type { AppShellProps } from '$lib/types/layout.js';

	let {
		top,
		children,
		bottom,
		scrollFades = true,
		class: className = '',
		...restProps
	}: AppShellProps = $props();

	let contentElement = $state<HTMLElement>();
	let hasScrollTop = $state(false);
	let hasScrollBottom = $state(false);

	function updateScrollState() {
		if (!contentElement) return;
		const { scrollTop, scrollHeight, clientHeight } = contentElement;
		// Tolerância de 4px para arredondamentos de subpixel
		hasScrollTop = scrollTop > 4;
		hasScrollBottom = scrollHeight - scrollTop - clientHeight > 4;
	}

	$effect(() => {
		if (!contentElement) return;

		updateScrollState();

		const observer = new ResizeObserver(() => {
			updateScrollState();
		});

		observer.observe(contentElement);

		return () => {
			observer.disconnect();
		};
	});
</script>

<div class="app-shell {className}" {...restProps}>
	{#if top}
		<header class="shell-top">
			{@render top()}
		</header>
	{/if}

	<div class="shell-content-wrapper">
		{#if scrollFades}
			<div
				class="scroll-fade scroll-fade--top"
				class:is-active={hasScrollTop}
				aria-hidden="true"
			></div>
		{/if}

		<main class="shell-main" bind:this={contentElement} onscroll={updateScrollState}>
			{@render children()}
		</main>

		{#if scrollFades}
			<div
				class="scroll-fade scroll-fade--bottom"
				class:is-active={hasScrollBottom}
				aria-hidden="true"
			></div>
		{/if}
	</div>

	{#if bottom}
		<footer class="shell-bottom">
			{@render bottom()}
		</footer>
	{/if}
</div>

<style>
	.app-shell {
		display: flex;
		flex-direction: column;
		height: 100dvh;
		max-height: 100dvh;
		width: 100%;
		overflow: hidden;
		background-color: var(--bg-primary);
		color: var(--text-primary);
		position: relative;
	}

	header {
		flex-shrink: 0;
		z-index: var(--layer-header);
		background-color: var(--backdrop-surface);
		backdrop-filter: var(--blur-surface);
		border-bottom: var(--border-width) solid var(--border-color);
		transition:
			background-color var(--transition-base),
			border-color var(--transition-base);
	}

	.shell-content-wrapper {
		flex: 1;
		min-height: 0;
		position: relative;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	main {
		flex: 1;
		min-height: 0;
		overflow-y: auto;
		overflow-x: hidden;
		-webkit-overflow-scrolling: touch;
		scroll-behavior: smooth;
	}

	footer {
		flex-shrink: 0;
		z-index: var(--layer-sticky);
		background-color: var(--backdrop-surface);
		backdrop-filter: var(--blur-surface);
		border-top: var(--border-width) solid var(--border-color);
		transition:
			background-color var(--transition-base),
			border-color var(--transition-base);
	}

	.scroll-fade {
		position: absolute;
		left: 0;
		right: 0;
		height: var(--scroll-fade-height);
		pointer-events: none;
		z-index: var(--layer-sticky);
		opacity: 0;
		transition: opacity var(--transition-fast);
	}

	.scroll-fade--top {
		top: 0;
		background: linear-gradient(to bottom, var(--bg-primary), transparent);
	}

	.scroll-fade--bottom {
		bottom: 0;
		background: linear-gradient(to top, var(--bg-primary), transparent);
	}

	.scroll-fade.is-active {
		opacity: 1;
	}
</style>
