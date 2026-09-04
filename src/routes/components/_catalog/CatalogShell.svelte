<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import {
		Button,
		Dialog,
		Dropdown,
		Footer,
		Header,
		Input,
		LocaleSelector,
		Main,
		Section,
		ThemeSelector
	} from '$lib/index.js';
	import { getI18n } from '$lib/utils/i18n.svelte.js';
	import { catalogEntries, getCategoryEntries } from './registry.js';
	import { catalogCategories } from './types.js';
	import { catalogT } from './translations.js';
	import { getCatalogGuide } from './guides.js';

	let { version, children }: { version: string; children: import('svelte').Snippet } = $props();
	const i18n = getI18n();
	let searchOpen = $state(false);
	let query = $state('');
	let results = $derived(
		catalogEntries.filter((entry) => {
			const guide = getCatalogGuide(i18n.currentLocale, entry.name);
			const haystack = `${entry.name} ${entry.category} ${guide.summary}`.toLocaleLowerCase();
			return haystack.includes(query.trim().toLocaleLowerCase());
		})
	);
	let categoryItems = $derived(
		catalogCategories.map((category) => ({
			id: category,
			label: `${catalogT(i18n.currentLocale, `catalog.category.${category}`)} (${getCategoryEntries(category).length})`,
			onclick: () => goto(resolve(`/components/${category}`))
		}))
	);

	$effect(() => {
		if (!searchOpen) return;
		const timer = window.setTimeout(() => document.getElementById('catalog-search-input')?.focus());
		return () => window.clearTimeout(timer);
	});

	function openSearch() {
		searchOpen = true;
	}

	function closeSearch() {
		searchOpen = false;
		document.getElementById('catalog-search-trigger')?.focus();
	}

	function handleKeydown(event: KeyboardEvent) {
		if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
			event.preventDefault();
			openSearch();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<a class="skip-link" href="#catalog-content">{catalogT(i18n.currentLocale, 'catalog.skip')}</a>

<Main fullWidth={true} fullHeight={true} padding="none" gap="none">
	<Header sticky={true} padding="sm" class="catalog-header">
		<div class="catalog-header__inner">
			<a class="brand" href={resolve('/')} aria-label="Shellfish">
				<img src="/favicon.svg" alt="" width="32" height="32" />
				<span>Shellfish</span>
			</a>
			<nav aria-label={catalogT(i18n.currentLocale, 'catalog.primaryNavigation')}>
				<Dropdown
					label={catalogT(i18n.currentLocale, 'catalog.categories')}
					items={categoryItems}
					variant="secondary"
					size="sm"
				/>
				<a class="header-link" href={resolve('/components')}
					>{catalogT(i18n.currentLocale, 'catalog.allComponents')}</a
				>
			</nav>
			<div class="catalog-header__actions">
				<Button
					id="catalog-search-trigger"
					size="sm"
					variant="secondary"
					aria-label={catalogT(i18n.currentLocale, 'catalog.search')}
					onclick={openSearch}
				>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						aria-hidden="true"><circle cx="11" cy="11" r="6" /><path d="m16 16 4 4" /></svg
					>
					<span class="search-label">{catalogT(i18n.currentLocale, 'catalog.search')}</span>
					<kbd>⌘K</kbd>
				</Button>
				<ThemeSelector size="sm" storageKey="shellfish-catalog-theme" />
				<LocaleSelector size="sm" storageKey="zoo_locale" />
			</div>
		</div>
	</Header>

	<Section scrollable={true} padding="none" gap="none" class="catalog-section">
		<div id="catalog-content" class="catalog-content">{@render children()}</div>
	</Section>

	<Footer sticky={true} padding="sm">
		<div class="catalog-footer">
			<span>Shellfish v{version}</span><span aria-hidden="true">•</span><span
				>{catalogT(i18n.currentLocale, 'catalog.internalCatalog')}</span
			><span aria-hidden="true">•</span><span>AGPL-3.0-only</span>
		</div>
	</Footer>
</Main>

<Dialog
	bind:open={searchOpen}
	title={catalogT(i18n.currentLocale, 'catalog.searchTitle')}
	size="lg"
	closeLabel={catalogT(i18n.currentLocale, 'catalog.close')}
	onclose={closeSearch}
>
	<div class="search-dialog">
		<Input
			id="catalog-search-input"
			bind:value={query}
			fullWidth={true}
			label={catalogT(i18n.currentLocale, 'catalog.search')}
			placeholder={catalogT(i18n.currentLocale, 'catalog.searchPlaceholder')}
		/>
		<p aria-live="polite">{results.length} {catalogT(i18n.currentLocale, 'catalog.results')}</p>
		<div class="search-results">
			{#each results as entry (entry.name)}
				<a href={resolve(`/components/${entry.category}/${entry.slug}`)} onclick={closeSearch}>
					<strong>{entry.name}</strong><span
						>{getCatalogGuide(i18n.currentLocale, entry.name).summary}</span
					>
				</a>
			{:else}
				<p>{catalogT(i18n.currentLocale, 'catalog.empty')}</p>
			{/each}
		</div>
	</div>
</Dialog>

<style>
	.skip-link {
		position: fixed;
		inset-inline-start: var(--space-sm);
		inset-block-start: var(--space-sm);
		z-index: var(--z-critical);
		padding: var(--space-sm);
		background: var(--color-primary);
		color: var(--color-primary-contrast);
		transform: translateY(-150%);
	}
	.skip-link:focus {
		transform: translateY(0);
	}
	.catalog-header__inner,
	.catalog-footer {
		display: flex;
		align-items: center;
		width: min(100%, 80rem);
		margin-inline: auto;
		gap: var(--space-sm);
	}
	.catalog-header__inner {
		justify-content: space-between;
	}
	.brand,
	nav,
	.catalog-header__actions {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
	}
	.brand {
		color: var(--text-primary);
		font-family: var(--font-display);
		font-size: var(--text-lg);
		font-weight: 700;
		text-decoration: none;
	}
	.brand img {
		width: var(--control-height-sm);
		height: var(--control-height-sm);
	}
	.header-link {
		min-height: var(--control-height-sm);
		display: inline-flex;
		align-items: center;
		padding-inline: var(--space-sm);
		color: var(--text-primary);
		font-size: var(--text-sm);
		font-weight: 800;
		text-decoration: none;
	}
	.header-link:hover {
		color: var(--color-primary);
	}
	.catalog-header__actions :global(button) {
		gap: var(--space-xs);
	}
	.catalog-header__actions svg {
		width: 1rem;
		height: 1rem;
	}
	kbd {
		padding: 1px var(--space-xs);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		background: var(--bg-primary);
		font: inherit;
		font-size: var(--text-xs);
	}
	.catalog-content {
		width: min(100%, 80rem);
		margin-inline: auto;
		padding: var(--space-xl) var(--space-md);
	}
	.catalog-footer {
		border-top: var(--border-width) solid var(--border-color);
		color: var(--text-secondary);
		font-size: var(--text-xs);
	}
	.search-dialog {
		display: grid;
		gap: var(--space-md);
	}
	.search-results {
		display: grid;
		max-height: 50dvh;
		gap: var(--space-xs);
		overflow: auto;
	}
	.search-results a {
		display: grid;
		gap: var(--space-xs);
		padding: var(--space-sm);
		border: var(--border-width) solid transparent;
		color: var(--text-primary);
		text-decoration: none;
	}
	.search-results a:hover,
	.search-results a:focus-visible {
		border-color: var(--border-color);
		background: var(--bg-secondary);
	}
	.search-results span {
		color: var(--text-secondary);
		font-size: var(--text-sm);
	}
	@media (max-width: 48rem) {
		.catalog-header__inner {
			flex-wrap: wrap;
		}
		nav {
			order: 3;
			width: 100%;
		}
		.catalog-header__actions {
			margin-inline-start: auto;
		}
		.search-label,
		kbd,
		.header-link {
			display: none;
		}
		.catalog-content {
			padding: var(--space-lg) var(--space-sm);
		}
	}
</style>
