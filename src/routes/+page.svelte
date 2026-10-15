<script lang="ts">
	import { AppShell } from '$lib/index.js';
	import { getI18n } from '$lib/utils/i18n.svelte.js';
	import type { LayoutData } from './$types.js';
	import { onMount } from 'svelte';

	let { data }: { data: LayoutData } = $props();
	const i18n = getI18n();

	let currentTheme = $state<'light' | 'dark'>('light');

	onMount(() => {
		const active = document.documentElement.dataset.theme;
		if (active === 'dark' || active === 'light') {
			currentTheme = active;
		}
	});

	function toggleTheme() {
		const next = currentTheme === 'light' ? 'dark' : 'light';
		currentTheme = next;
		if (typeof document !== 'undefined') {
			document.documentElement.dataset.theme = next;
			try {
				localStorage.setItem('shellfish-theme', next);
			} catch {
				// Ignora indisponibilidade do storage
			}
		}
	}

	function handleToggleLocale() {
		i18n.toggleLocale();
	}
</script>

<svelte:head>
	<title>{i18n.t('showcase.title')} — {i18n.t('showcase.subtitle')}</title>
</svelte:head>

<AppShell>
	{#snippet top()}
		<div class="shell-top-bar">
			<div class="brand">
				<span class="brand-icon" aria-hidden="true"></span>
				<div class="brand-text">
					<span class="brand-name">{i18n.t('showcase.title')}</span>
					<span class="version-badge">v{data.version}</span>
				</div>
			</div>

			<div class="top-actions">
				<button type="button" class="action-btn" onclick={handleToggleLocale}>
					{i18n.t('locale.current')}
				</button>
				<button type="button" class="action-btn" onclick={toggleTheme}>
					{currentTheme === 'light'
						? i18n.t('showcase.theme_light')
						: i18n.t('showcase.theme_dark')}
				</button>
			</div>
		</div>
	{/snippet}

	<div class="page-content">
		<header class="hero-section">
			<span class="phase-pill">{i18n.t('showcase.phase1_badge')}</span>
			<h1>{i18n.t('showcase.hero_title')}</h1>
			<p class="hero-desc">{i18n.t('showcase.hero_desc')}</p>
		</header>

		<section class="demo-card">
			<h2>{i18n.t('showcase.how_it_works')}</h2>
			<div class="demo-grid">
				<div class="demo-feature">
					<h3>{i18n.t('showcase.top_title')}</h3>
					<p>{i18n.t('showcase.top_desc')}</p>
				</div>
				<div class="demo-feature">
					<h3>{i18n.t('showcase.center_title')}</h3>
					<p>{i18n.t('showcase.center_desc')}</p>
				</div>
				<div class="demo-feature">
					<h3>{i18n.t('showcase.bottom_title')}</h3>
					<p>{i18n.t('showcase.bottom_desc')}</p>
				</div>
			</div>
		</section>

		<section class="demo-card">
			<h2>{i18n.t('showcase.demo_title')}</h2>
			<p>{i18n.t('showcase.demo_desc')}</p>

			<div class="mock-cards-list">
				{#each Array.from({ length: 8 }, (_, i) => i + 1) as item (item)}
					<article class="mock-item">
						<span class="item-number">#{item}</span>
						<div class="item-body">
							<h4>{i18n.t('showcase.mock_block_title')} {item}</h4>
							<p>{i18n.t('showcase.mock_block_desc')}</p>
						</div>
					</article>
				{/each}
			</div>
		</section>
	</div>

	{#snippet bottom()}
		<div class="shell-bottom-bar">
			<span>Shellfish — Porta <code>4401</code></span>
			<span>{i18n.t('showcase.footer_suite')}</span>
		</div>
	{/snippet}
</AppShell>

<style>
	.shell-top-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--space-sm) var(--space-md);
		max-width: 960px;
		margin: 0 auto;
		width: 100%;
	}

	.brand {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
	}

	.brand-icon {
		display: inline-block;
		width: 22px;
		height: 22px;
		background-color: var(--color-primary);
		-webkit-mask: url('/favicon.svg') no-repeat center / contain;
		mask: url('/favicon.svg') no-repeat center / contain;
		flex-shrink: 0;
	}

	.brand-text {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
	}

	.brand-name {
		font-weight: 700;
		font-size: var(--text-md);
		letter-spacing: -0.01em;
	}

	.version-badge {
		font-size: var(--text-xs);
		background-color: var(--border-color);
		padding: 2px 6px;
		border-radius: var(--radius-sm);
		color: var(--text-secondary);
	}

	.top-actions {
		display: flex;
		gap: var(--space-xs);
	}

	.action-btn {
		font-family: inherit;
		font-size: var(--text-xs);
		font-weight: 500;
		background-color: var(--bg-elevated);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		padding: 6px 12px;
		cursor: pointer;
		color: var(--text-primary);
		transition: background-color var(--transition-fast);
	}

	.action-btn:hover {
		background-color: var(--bg-secondary);
	}

	.page-content {
		max-width: 840px;
		margin: 0 auto;
		padding: var(--space-xl) var(--space-md) var(--space-2xl);
		display: flex;
		flex-direction: column;
		gap: var(--space-xl);
	}

	.hero-section {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.phase-pill {
		align-self: flex-start;
		font-size: var(--text-xs);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 4px 10px;
		background-color: var(--color-primary-subtle);
		color: var(--color-primary);
		border-radius: var(--radius-full);
	}

	h1 {
		font-size: var(--text-3xl);
		letter-spacing: -0.02em;
		margin: 0;
	}

	.hero-desc {
		font-size: var(--text-lg);
		color: var(--text-secondary);
		margin: 0;
	}

	.demo-card {
		background-color: var(--bg-elevated);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.demo-card h2 {
		margin: 0;
		font-size: var(--text-xl);
	}

	.demo-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: var(--space-md);
	}

	.demo-feature {
		background-color: var(--bg-primary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		padding: var(--space-md);
	}

	.demo-feature h3 {
		font-size: var(--text-md);
		margin: 0 0 var(--space-xs) 0;
	}

	.demo-feature p {
		font-size: var(--text-sm);
		color: var(--text-secondary);
		margin: 0;
	}

	.mock-cards-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		margin-top: var(--space-xs);
	}

	.mock-item {
		display: flex;
		align-items: flex-start;
		gap: var(--space-md);
		padding: var(--space-md);
		background-color: var(--bg-primary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
	}

	.item-number {
		font-size: var(--text-xs);
		font-family: var(--font-mono);
		font-weight: 700;
		padding: 2px 6px;
		background-color: var(--bg-secondary);
		border-radius: var(--radius-sm);
		color: var(--text-secondary);
	}

	.item-body h4 {
		margin: 0 0 var(--space-xxs) 0;
		font-size: var(--text-sm);
	}

	.item-body p {
		margin: 0;
		font-size: var(--text-xs);
		color: var(--text-secondary);
	}

	.shell-bottom-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--space-sm) var(--space-md);
		max-width: 960px;
		margin: 0 auto;
		width: 100%;
		font-size: var(--text-xs);
		color: var(--text-muted);
	}
</style>
