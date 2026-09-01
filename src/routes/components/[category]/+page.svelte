<script lang="ts">
	import { getI18n } from '$lib/utils/i18n.svelte.js';
	import { resolve } from '$app/paths';
	import { getCategoryEntries } from '../_catalog/registry.js';
	import { catalogT } from '../_catalog/translations.js';
	import type { PageData } from './$types.js';
	let { data }: { data: PageData } = $props();
	const i18n = getI18n();
	let entries = $derived(getCategoryEntries(data.category));
</script>

<main>
	<a href={resolve('/components')}>{catalogT(i18n.currentLocale, 'catalog.back')}</a>
	<h1>{catalogT(i18n.currentLocale, `catalog.category.${data.category}`)}</h1>
	<ul>
		{#each entries as entry (entry.name)}<li>
				<a href={resolve(`/components/${entry.category}/${entry.slug}`)}>{entry.name}</a>
			</li>{/each}
	</ul>
</main>
