<script lang="ts">
	import { resolve } from '$app/paths';
	import { getI18n } from '$lib/utils/i18n.svelte.js';
	import CatalogCard from '../_catalog/CatalogCard.svelte';
	import { getCategoryEntries } from '../_catalog/registry.js';
	import { catalogT } from '../_catalog/translations.js';
	import type { PageData } from './$types.js';
	let { data }: { data: PageData } = $props();
	const i18n = getI18n();
	let entries = $derived(getCategoryEntries(data.category));
</script>

<svelte:head
	><title>{catalogT(i18n.currentLocale, `catalog.category.${data.category}`)} · Shellfish</title
	></svelte:head
>

<a class="back" href={resolve('/components')}>← {catalogT(i18n.currentLocale, 'catalog.back')}</a>
<header class="page-heading">
	<p class="eyebrow">{catalogT(i18n.currentLocale, 'catalog.categoryLabel')}</p>
	<h1>{catalogT(i18n.currentLocale, `catalog.category.${data.category}`)}</h1>
	<p>{catalogT(i18n.currentLocale, `catalog.categoryDescription.${data.category}`)}</p>
</header>
<div class="cards">
	{#each entries as entry (entry.name)}<CatalogCard {entry} />{/each}
</div>

<style>
	.back {
		display: inline-flex;
		margin-top: var(--space-md);
		color: var(--text-primary);
		font-size: var(--text-sm);
		font-weight: 800;
	}
	.page-heading {
		max-width: 48rem;
		padding-block: var(--space-lg);
	}
	.eyebrow {
		margin: 0 0 var(--space-sm);
		color: var(--color-primary);
		font-size: var(--text-xs);
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}
	h1 {
		margin: 0;
		font-family: var(--font-display);
		font-size: var(--text-4xl);
	}
	.page-heading > p:last-child {
		color: var(--text-secondary);
		font-size: var(--text-lg);
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
