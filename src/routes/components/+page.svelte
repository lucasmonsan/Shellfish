<script lang="ts">
	import { resolve } from '$app/paths';
	import { getI18n } from '$lib/utils/i18n.svelte.js';
	import CatalogCard from './_catalog/CatalogCard.svelte';
	import { catalogEntries, getCategoryEntries } from './_catalog/registry.js';
	import { catalogCategories } from './_catalog/types.js';
	import { catalogT } from './_catalog/translations.js';
	const i18n = getI18n();
</script>

<svelte:head><title>{catalogT(i18n.currentLocale, 'catalog.title')} · Shellfish</title></svelte:head
>

<header class="page-heading">
	<p class="eyebrow">Shellfish</p>
	<h1>{catalogT(i18n.currentLocale, 'catalog.title')}</h1>
	<p>{catalogT(i18n.currentLocale, 'catalog.description')}</p>
</header>

{#each catalogCategories as category (category)}
	<section class="category-section" aria-labelledby={`category-${category}`}>
		<div class="category-heading">
			<h2 id={`category-${category}`}>
				{catalogT(i18n.currentLocale, `catalog.category.${category}`)}
			</h2>
			<a href={resolve(`/components/${category}`)}
				>{getCategoryEntries(category).length}
				{catalogT(i18n.currentLocale, 'catalog.componentsCount')} →</a
			>
		</div>
		<div class="cards">
			{#each catalogEntries.filter((entry) => entry.category === category) as entry (entry.name)}<CatalogCard
					{entry}
				/>{/each}
		</div>
	</section>
{/each}

<style>
	.page-heading {
		max-width: 48rem;
		padding-block: var(--space-xl) var(--space-lg);
		border-bottom: var(--border-width) solid var(--border-color);
	}
	.eyebrow {
		margin: 0 0 var(--space-sm);
		color: var(--color-primary);
		font-size: var(--text-xs);
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}
	h1,
	h2 {
		margin: 0;
		font-family: var(--font-display);
	}
	h1 {
		font-size: var(--text-4xl);
	}
	.page-heading > p:last-child {
		color: var(--text-secondary);
		font-size: var(--text-lg);
	}
	.category-section {
		margin-top: var(--space-2xl);
	}
	.category-heading {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--space-md);
		margin-bottom: var(--space-md);
	}
	.category-heading a {
		color: var(--text-primary);
		font-size: var(--text-sm);
		font-weight: 800;
	}
	.cards {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--space-md);
	}
	@media (max-width: 60rem) {
		.cards {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	@media (max-width: 40rem) {
		.cards {
			grid-template-columns: 1fr;
		}
	}
</style>
