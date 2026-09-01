<script lang="ts">
	import { getI18n } from '$lib/utils/i18n.svelte.js';
	import { resolve } from '$app/paths';
	import api from 'virtual:shellfish-catalog-api';
	import ComponentPlayground from '../../_catalog/ComponentPlayground.svelte';
	import { getCatalogEntry } from '../../_catalog/registry.js';
	import { catalogT } from '../../_catalog/translations.js';
	import type { PageData } from './$types.js';

	let { data }: { data: PageData } = $props();
	const i18n = getI18n();
	let entry = $derived(getCatalogEntry(data.category, data.slug));
	let apiDefinition = $derived(entry ? api[entry.propsType] : undefined);
</script>

<svelte:head><title>{entry?.name ?? 'Component'} · Shellfish</title></svelte:head>

{#if entry}
	<main>
		<a href={resolve(`/components/${entry.category}`)}
			>{catalogT(i18n.currentLocale, 'catalog.back')}</a
		>
		<h1>{entry.name}</h1>
		<p>{entry.propsType}</p>
		<h2>{catalogT(i18n.currentLocale, 'catalog.when')}</h2>
		<p>{catalogT(i18n.currentLocale, 'catalog.whenDescription')}</p>
		<h2>{catalogT(i18n.currentLocale, 'catalog.avoid')}</h2>
		<p>{catalogT(i18n.currentLocale, 'catalog.avoidDescription')}</p>
		<ComponentPlayground {entry} api={apiDefinition} />
	</main>
{/if}
