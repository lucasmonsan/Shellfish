<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ImageProps } from '$lib/types/display.js';

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

	let imgEl = $state<HTMLImageElement>();
	let isLoaded = $state(false);
	let hasError = $state(false);

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
		if (!src) {
			isLoaded = false;
			hasError = false;
			return;
		}

		isLoaded = false;
		hasError = false;

		// Sincroniza se a imagem já foi resolvida pelo cache do navegador
		if (imgEl && imgEl.complete) {
			if (imgEl.naturalWidth > 0) {
				isLoaded = true;
			} else {
				hasError = true;
			}
		}
	});

	let isFallbackVisible = $derived(!src || hasError);
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
	{#if src && !hasError}
		<img
			bind:this={imgEl}
			{src}
			{alt}
			{loading}
			{decoding}
			style:object-fit={fit}
			onload={handleLoad}
			onerror={handleError}
		/>
	{/if}

	{#if isFallbackVisible}
		<div class="fallback-content" aria-hidden="true">
			{#if typeof fallback === 'function'}
				{@render (fallback as Snippet)()}
			{:else if fallbackText}
				<span class="fallback-text">{fallbackText}</span>
			{:else if children}
				{@render children()}
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

	.loaded img {
		opacity: 1;
	}

	.fallback-content {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		padding: var(--space-xxs);
		color: var(--text-secondary);
		font-family: var(--font-sans);
		font-size: calc(var(--base) * 0.75);
		font-weight: 700;
		letter-spacing: 0.02em;
		text-transform: uppercase;
		line-height: 1;
		user-select: none;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.fallback-content :global(svg) {
		flex-shrink: 0;
		max-width: 75%;
		max-height: 75%;
	}

	@media (prefers-reduced-motion: reduce) {
		img {
			transition: none;
		}
	}
</style>
