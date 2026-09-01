<script lang="ts">
	import { getI18n } from '$lib/utils/i18n.svelte.js';
	import { resolve } from '$app/paths';
	import { catalogEntries } from './_catalog/registry.js';
	import { catalogCategories } from './_catalog/types.js';
	import { catalogT } from './_catalog/translations.js';

	const i18n = getI18n();
	let search = $state('');
	let visibleEntries = $derived(
		catalogEntries.filter(
			(entry) =>
				entry.name.toLowerCase().includes(search.toLowerCase()) ||
				entry.category.includes(search.toLowerCase())
		)
	);
</script>

<svelte:head><title>{catalogT(i18n.currentLocale, 'catalog.title')} · Shellfish</title></svelte:head
>

<main>
	<a href={resolve('/')}>Shellfish</a>
	<h1>{catalogT(i18n.currentLocale, 'catalog.title')}</h1>
	<p>{catalogT(i18n.currentLocale, 'catalog.description')}</p>
	<label>{catalogT(i18n.currentLocale, 'catalog.search')}<input bind:value={search} /></label>
	{#each catalogCategories as category (category)}
		<section aria-labelledby={`category-${category}`}>
			<h2 id={`category-${category}`}>
				<a href={resolve(`/components/${category}`)}
					>{catalogT(i18n.currentLocale, `catalog.category.${category}`)}</a
				>
			</h2>
			<ul>
				{#each visibleEntries.filter((entry) => entry.category === category) as entry (entry.name)}
					<li><a href={resolve(`/components/${entry.category}/${entry.slug}`)}>{entry.name}</a></li>
				{/each}
			</ul>
		</section>
	{/each}
	{#if visibleEntries.length === 0}<p>{catalogT(i18n.currentLocale, 'catalog.empty')}</p>{/if}
</main>
