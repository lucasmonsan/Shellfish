<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ImageProps } from '$lib/types/display.js';
	import Spinner from '../feedback/Spinner.svelte';

	let {
		src,
		alt = '',
		fit = 'cover',
		aspectRatio = 'auto',
		radius = 'xs',
		size,
		width,
		height,
		fallback,
		children,
		loading = 'lazy',
		decoding = 'async',
		bordered = false,
		class: className = '',
		style = '',
		onload,
		onerror,
		...restProps
	}: ImageProps = $props();

	let isLoaded = $state(false);
	let hasError = $state(false);
	let prevSrc = $state<string | null | undefined>(undefined);

	// Normaliza dimensões baseadas em size ('sm' | 'md' | 'lg' ou número/string)
	let resolvedWidth = $derived.by(() => {
		if (width !== undefined) return typeof width === 'number' ? `${width}px` : width;
		if (size === 'sm') return 'var(--control-height-sm)';
		if (size === 'md') return 'var(--control-height)';
		if (size === 'lg') return 'var(--control-height-lg)';
		if (size !== undefined) return typeof size === 'number' ? `${size}px` : size;
		return undefined;
	});

	let resolvedHeight = $derived.by(() => {
		if (height !== undefined) return typeof height === 'number' ? `${height}px` : height;
		if (size === 'sm') return 'var(--control-height-sm)';
		if (size === 'md') return 'var(--control-height)';
		if (size === 'lg') return 'var(--control-height-lg)';
		if (size !== undefined) return typeof size === 'number' ? `${size}px` : size;
		return undefined;
	});

	let dynamicStyles = $derived.by(() => {
		const parts: string[] = [];
		if (aspectRatio !== 'auto') {
			parts.push(`aspect-ratio: ${aspectRatio};`);
			if (!resolvedWidth && !resolvedHeight) {
				parts.push('width: 100%;');
			}
		}
		if (resolvedWidth) {
			parts.push(`width: ${resolvedWidth};`);
		}
		if (resolvedHeight) {
			parts.push(`height: ${resolvedHeight};`);
		}
		return parts.join(' ');
	});

	function handleLoad(e: Event) {
		isLoaded = true;
		hasError = false;
		onload?.(e);
	}

	function handleError(e: Event) {
		hasError = true;
		isLoaded = false;
		onerror?.(e);
	}

	$effect(() => {
		const currentSrc = src;
		if (currentSrc !== prevSrc) {
			prevSrc = currentSrc;
			isLoaded = false;
			hasError = false;
		}
	});

	let isFallbackVisible = $derived(!src || hasError);
	let isLoading = $derived(Boolean(src) && !isLoaded && !hasError);
	let fallbackText = $derived(typeof fallback === 'string' ? fallback : undefined);
</script>

<div
	class="sf-image radius-{radius} {className}"
	class:bordered
	class:loaded={isLoaded && !isFallbackVisible}
	class:fallback={isFallbackVisible}
	style="{dynamicStyles} {style}"
	role={isFallbackVisible ? 'img' : undefined}
	aria-label={isFallbackVisible ? alt || fallbackText || 'Image' : undefined}
	{...restProps}
>
	{#if src}
		<img
			{src}
			{alt}
			{loading}
			{decoding}
			style:object-fit={fit}
			class:hidden={hasError}
			onload={handleLoad}
			onerror={handleError}
		/>
	{/if}

	{#if isLoading}
		<div class="loading-content" aria-hidden="true">
			<Spinner size="sm" />
		</div>
	{/if}

	{#if isFallbackVisible}
		<div class="fallback-content" aria-hidden="true">
			{#if typeof fallback === 'function'}
				{@render (fallback as Snippet)()}
			{:else if children}
				{@render children()}
			{:else if fallbackText}
				<span class="fallback-text">{fallbackText}</span>
			{:else}
				<span class="fallback-text">{alt || ''}</span>
			{/if}
		</div>
	{/if}
</div>

<style>
	.sf-image {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		box-sizing: border-box;
		vertical-align: middle;
		background-color: var(--bg-secondary);
		color: var(--text-primary);
		flex-shrink: 0;
		max-width: 100%;
	}

	.bordered {
		border: var(--border-width) solid var(--border-color);
	}

	.radius-none {
		border-radius: var(--radius-none);
	}

	.radius-xs {
		border-radius: var(--radius-xs);
	}

	.radius-sm {
		border-radius: var(--radius-sm);
	}

	.radius-md {
		border-radius: var(--radius-md);
	}

	.radius-lg {
		border-radius: var(--radius-lg);
	}

	.radius-full {
		border-radius: var(--radius-full);
	}

	img {
		width: 100%;
		height: 100%;
		display: block;
		border-radius: inherit;
		opacity: 0;
		transition: opacity var(--transition-fast);
	}

	img.hidden {
		display: none;
	}

	.loaded img {
		opacity: 1;
	}

	.loading-content {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
	}

	.fallback-content {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		padding: var(--space-xs);
		box-sizing: border-box;
		color: var(--text-secondary);
		font-family: var(--font-sans);
		font-size: var(--text-xs);
		line-height: var(--leading-tight);
		text-align: center;
		user-select: none;
		overflow: hidden;
	}

	.fallback-text {
		display: inline-block;
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		font-weight: 700;
		letter-spacing: 0.02em;
	}

	.fallback-content :global(svg) {
		flex-shrink: 0;
		max-width: 80%;
		max-height: 80%;
	}

	@media (prefers-reduced-motion: reduce) {
		img {
			transition: none;
		}
	}
</style>
