<script lang="ts">
	import type { AvatarProps } from '$lib/types/index.js';

	let {
		src,
		alt = '',
		name,
		size = 'md',
		square = false,
		class: className,
		...restProps
	}: AvatarProps = $props();

	let initials = $derived(
		name
			? name
					.split(' ')
					.filter(Boolean)
					.slice(0, 2)
					.map((w) => w[0].toUpperCase())
					.join('')
			: ''
	);
</script>

<span data-size={size} data-square={square} class={className} {...restProps}>
	{#if src}
		<img {src} {alt} />
	{:else if initials}
		<span class="initials">{initials}</span>
	{:else}
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
			<circle cx="12" cy="7" r="4" />
		</svg>
	{/if}
</span>

<style>
	span {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		border: var(--border-width) solid var(--border-color);
		border-radius: 50%;
		background-color: var(--bg-secondary);
		color: var(--text-primary);
		box-shadow: 1px 1px 0px var(--border-color);
		overflow: hidden;
		user-select: none;
		vertical-align: middle;
		font-family: inherit;
		font-weight: 800;
	}

	span[data-square='true'] {
		border-radius: var(--radius-sm);
	}

	/* Tamanhos */
	span[data-size='sm'] {
		width: 28px;
		height: 28px;
		font-size: var(--text-xs);
	}

	span[data-size='md'] {
		width: 36px;
		height: 36px;
		font-size: var(--text-sm);
	}

	span[data-size='lg'] {
		width: 48px;
		height: 48px;
		font-size: var(--text-base);
	}

	span[data-size='xl'] {
		width: 64px;
		height: 64px;
		font-size: var(--text-lg);
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	svg {
		width: 60%;
		height: 60%;
		color: var(--text-secondary);
	}

	.initials {
		border: none;
		border-radius: 0;
		box-shadow: none;
		background: transparent;
		color: inherit;
		width: auto;
		height: auto;
	}
</style>
