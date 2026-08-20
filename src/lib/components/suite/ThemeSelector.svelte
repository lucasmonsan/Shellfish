<script lang="ts">
	import type { ThemeSelectorProps } from '$lib/types/index.js';
	import type { Theme } from '$lib/types/tokens.js';
	import { t } from '$lib/utils/i18n.svelte.js';

	let {
		size = 'md',
		storageKey = 'shellfish-theme',
		class: className,
		...restProps
	}: ThemeSelectorProps = $props();

	let currentTheme = $state<Theme>('light');

	$effect(() => {
		if (typeof window === 'undefined') return;

		const savedTheme = localStorage.getItem(storageKey) as Theme | null;
		if (savedTheme === 'light' || savedTheme === 'dark') {
			currentTheme = savedTheme;
			document.documentElement.setAttribute('data-theme', savedTheme);
		} else {
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			currentTheme = prefersDark ? 'dark' : 'light';
			document.documentElement.setAttribute('data-theme', currentTheme);
		}
	});

	function toggleTheme() {
		const nextTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
		currentTheme = nextTheme;
		if (typeof window !== 'undefined') {
			localStorage.setItem(storageKey, nextTheme);
			document.documentElement.setAttribute('data-theme', nextTheme);
		}
	}
</script>

<button
	type="button"
	data-size={size}
	aria-label={t('theme.toggle')}
	title={t('theme.toggle')}
	onclick={toggleTheme}
	class={className}
	{...restProps}
>
	{#if currentTheme === 'light'}
		<!-- Ícone de Lua (Modo Escuro) -->
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
		</svg>
	{:else}
		<!-- Ícone de Sol (Modo Claro) -->
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			<circle cx="12" cy="12" r="5" />
			<line x1="12" y1="1" x2="12" y2="3" />
			<line x1="12" y1="21" x2="12" y2="23" />
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
			<line x1="1" y1="12" x2="3" y2="12" />
			<line x1="21" y1="12" x2="23" y2="12" />
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
		</svg>
	{/if}
</button>

<style>
	button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		background-color: var(--bg-secondary);
		color: var(--text-primary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		box-shadow: var(--shadow);
		cursor: pointer;
		padding: 0;
		aspect-ratio: 1;
		transition:
			transform 0.12s cubic-bezier(0.4, 0, 0.2, 1),
			box-shadow 0.12s cubic-bezier(0.4, 0, 0.2, 1),
			background-color 0.15s ease,
			border-color 0.15s ease;
	}

	button:hover {
		transform: translate(-1px, -1px);
		box-shadow: 2px 2px 0px var(--border-color);
	}

	button:active {
		transform: translate(1px, 1px);
		box-shadow: 0px 0px 0px var(--border-color);
	}

	/* Tamanhos */
	button[data-size='sm'] {
		width: var(--control-height-sm);
		height: var(--control-height-sm);
	}
	button[data-size='md'] {
		width: var(--control-height-md);
		height: var(--control-height-md);
	}
	button[data-size='lg'] {
		width: var(--control-height-lg);
		height: var(--control-height-lg);
	}

	svg {
		width: 50%;
		height: 50%;
	}

	@media (prefers-reduced-motion: reduce) {
		button {
			transition: none;
		}
	}
</style>
