<script lang="ts">
	import { resolve } from '$app/paths';
	import { getI18n } from '$lib/utils/i18n.svelte.js';
	import api from 'virtual:shellfish-catalog-api';
	import ComponentPlayground from '../../_catalog/ComponentPlayground.svelte';
	import { getCatalogGuide } from '../../_catalog/guides.js';
	import { getCatalogEntry } from '../../_catalog/registry.js';
	import { catalogT } from '../../_catalog/translations.js';
	import type { PageData } from './$types.js';
	let { data }: { data: PageData } = $props();
	const i18n = getI18n();
	let entry = $derived(getCatalogEntry(data.category, data.slug));
	let apiDefinition = $derived(entry ? api[entry.propsType] : undefined);
	let guide = $derived(entry ? getCatalogGuide(i18n.currentLocale, entry.name) : undefined);
</script>

<svelte:head><title>{entry?.name ?? 'Component'} · Shellfish</title></svelte:head>

{#if entry && guide}
	<nav class="breadcrumb" aria-label={catalogT(i18n.currentLocale, 'catalog.breadcrumb')}>
		<a href={resolve('/components')}>{catalogT(i18n.currentLocale, 'catalog.title')}</a><span
			aria-hidden="true">/</span
		><a href={resolve(`/components/${entry.category}`)}
			>{catalogT(i18n.currentLocale, `catalog.category.${entry.category}`)}</a
		><span aria-hidden="true">/</span><span aria-current="page">{entry.name}</span>
	</nav>
	<header class="component-heading">
		<p class="eyebrow">{catalogT(i18n.currentLocale, `catalog.category.${entry.category}`)}</p>
		<h1>{entry.name}</h1>
		<p>{guide.summary}</p>
	</header>
	<div class="guide-grid">
		<section>
			<h2>{catalogT(i18n.currentLocale, 'catalog.when')}</h2>
			<p>{guide.when}</p>
		</section>
		<section>
			<h2>{catalogT(i18n.currentLocale, 'catalog.avoid')}</h2>
			<p>{guide.avoid}</p>
		</section>
		<section>
			<h2>{catalogT(i18n.currentLocale, 'catalog.a11y')}</h2>
			<p>{guide.accessibility}</p>
		</section>
	</div>
	<ComponentPlayground {entry} api={apiDefinition} />
{/if}

<style>
	.breadcrumb {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
		margin-top: var(--space-md);
		color: var(--text-secondary);
		font-size: var(--text-sm);
	}
	.breadcrumb a {
		color: var(--text-primary);
	}
	.component-heading {
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
	h1,
	h2 {
		margin: 0;
		font-family: var(--font-display);
	}
	h1 {
		font-size: var(--text-4xl);
	}
	.component-heading > p:last-child {
		color: var(--text-secondary);
		font-size: var(--text-lg);
	}
	.guide-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--space-md);
	}
	.guide-grid section {
		padding: var(--space-md);
		border-top: var(--border-width) solid var(--border-color);
		background: var(--bg-secondary);
	}
	@media (max-width: 48rem) {
		.guide-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
