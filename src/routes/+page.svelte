<script lang="ts">
	import { resolve } from '$app/paths';
	import { Column, Footer, Grid, Header, Row, Section } from '$lib/index.js';
	import { getI18n } from '$lib/utils/i18n.svelte.js';
	import { catalogEntries, getCategoryEntries } from './components/_catalog/registry.js';
	import { catalogCategories } from './components/_catalog/types.js';
	import { catalogT } from './components/_catalog/translations.js';
	import type { LayoutData } from './$types.js';

	let { data }: { data: LayoutData } = $props();
	const i18n = getI18n();
</script>

<svelte:head><title>Shellfish</title></svelte:head>

<section class="hero" aria-labelledby="home-title" data-catalog-version={data.version}>
	<div>
		<p class="eyebrow">{catalogT(i18n.currentLocale, 'catalog.internalCatalog')}</p>
		<h1 id="home-title">{catalogT(i18n.currentLocale, 'catalog.homeTitle')}</h1>
		<p>{catalogT(i18n.currentLocale, 'catalog.homeDescription')}</p>
		<Row gap="sm" wrap={true}>
			<a class="catalog-action" href={resolve('/components')}
				>{catalogT(i18n.currentLocale, 'catalog.allComponents')}</a
			>
			<a class="catalog-action catalog-action--secondary" href={resolve('/components/layout')}
				>{catalogT(i18n.currentLocale, 'catalog.exploreLayout')}</a
			>
		</Row>
	</div>
	<dl class="metrics">
		<div>
			<dt>{catalogT(i18n.currentLocale, 'catalog.componentsCount')}</dt>
			<dd>{catalogEntries.length}</dd>
		</div>
		<div>
			<dt>{catalogT(i18n.currentLocale, 'catalog.categoriesCount')}</dt>
			<dd>{catalogCategories.length}</dd>
		</div>
	</dl>
</section>

<section aria-labelledby="categories-title">
	<div class="section-heading">
		<div>
			<p class="eyebrow">{catalogT(i18n.currentLocale, 'catalog.explore')}</p>
			<h2 id="categories-title">{catalogT(i18n.currentLocale, 'catalog.categories')}</h2>
		</div>
		<a href={resolve('/components')}>{catalogT(i18n.currentLocale, 'catalog.allComponents')} →</a>
	</div>
	<div class="category-grid">
		{#each catalogCategories as category (category)}
			<a href={resolve(`/components/${category}`)}>
				<strong>{catalogT(i18n.currentLocale, `catalog.category.${category}`)}</strong>
				<span
					>{getCategoryEntries(category).length}
					{catalogT(i18n.currentLocale, 'catalog.componentsCount')}</span
				>
			</a>
		{/each}
	</div>
</section>

<section aria-labelledby="composition-title">
	<div class="section-heading">
		<div>
			<p class="eyebrow">{catalogT(i18n.currentLocale, 'catalog.compositionEyebrow')}</p>
			<h2 id="composition-title">{catalogT(i18n.currentLocale, 'catalog.compositionTitle')}</h2>
		</div>
	</div>
	<div class="composition">
		<Header padding="sm"
			><Row fullWidth={true} justify="between"
				><strong>{catalogT(i18n.currentLocale, 'catalog.demoHeader')}</strong><span
					>{catalogT(i18n.currentLocale, 'catalog.demoActions')}</span
				></Row
			></Header
		>
		<Section padding="md"
			><Column gap="sm"
				><span>{catalogT(i18n.currentLocale, 'catalog.demoContent')}</span><Grid
					columns={3}
					gap="sm"
					>{#each [1, 2, 3] as item (item)}<span class="demo-block">{item}</span>{/each}</Grid
				></Column
			></Section
		>
		<Footer padding="sm">{catalogT(i18n.currentLocale, 'catalog.demoFooter')}</Footer>
	</div>
</section>

<style>
	.hero {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: var(--space-xl);
		align-items: end;
		padding-block: var(--space-2xl);
		border-bottom: var(--border-width) solid var(--border-color);
	}
	.catalog-action {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: var(--control-height-md);
		padding-inline: var(--space-md);
		border: var(--border-width) solid var(--border-color);
		background: var(--color-primary);
		box-shadow: var(--shadow);
		color: var(--color-primary-contrast);
		font-weight: 800;
		text-decoration: none;
	}
	.catalog-action--secondary {
		background: var(--bg-secondary);
		color: var(--text-primary);
	}
	.catalog-action:hover {
		transform: translate(-1px, -1px);
		box-shadow: 2px 2px 0 var(--border-color);
	}
	.catalog-action:active {
		transform: translate(1px, 1px);
		box-shadow: none;
	}
	.catalog-action:focus-visible {
		outline: var(--border-width) solid var(--color-primary);
		outline-offset: var(--space-xs);
	}
	h1,
	h2 {
		margin: 0;
		font-family: var(--font-display);
		line-height: 1;
	}
	h1 {
		font-size: clamp(var(--text-3xl), 7vw, 5rem);
	}
	h2 {
		font-size: var(--text-3xl);
	}
	p {
		max-width: 42rem;
		color: var(--text-secondary);
		font-size: var(--text-lg);
	}
	.eyebrow {
		margin: 0 0 var(--space-sm);
		color: var(--color-primary);
		font-size: var(--text-xs);
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}
	.metrics {
		display: flex;
		gap: var(--space-md);
		margin: 0;
	}
	.metrics div {
		min-width: 7rem;
		padding: var(--space-md);
		border: var(--border-width) solid var(--border-color);
		background: var(--bg-secondary);
		box-shadow: var(--shadow);
	}
	dt {
		color: var(--text-secondary);
		font-size: var(--text-xs);
		font-weight: 800;
		text-transform: uppercase;
	}
	dd {
		margin: var(--space-xs) 0 0;
		font-family: var(--font-display);
		font-size: var(--text-3xl);
	}
	section + section {
		margin-top: var(--space-2xl);
	}
	.section-heading {
		display: flex;
		justify-content: space-between;
		align-items: end;
		gap: var(--space-md);
		margin-bottom: var(--space-lg);
	}
	.section-heading a {
		color: var(--text-primary);
		font-weight: 800;
	}
	.category-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--space-md);
	}
	.category-grid a {
		display: grid;
		gap: var(--space-sm);
		min-height: 8rem;
		padding: var(--space-md);
		border: var(--border-width) solid var(--border-color);
		background: var(--bg-primary);
		box-shadow: var(--shadow);
		color: var(--text-primary);
		text-decoration: none;
	}
	.category-grid a:hover {
		transform: translate(-1px, -1px);
		box-shadow: 3px 3px 0 var(--border-color);
	}
	.category-grid strong {
		font-family: var(--font-display);
		font-size: var(--text-xl);
	}
	.category-grid span {
		color: var(--text-secondary);
	}
	.composition {
		border: var(--border-width) solid var(--border-color);
		background: var(--bg-secondary);
		box-shadow: var(--shadow);
	}
	.demo-block {
		display: grid;
		min-height: 4rem;
		place-items: center;
		border: var(--border-width) solid var(--border-color);
		background: var(--bg-primary);
		font-weight: 800;
	}
	@media (max-width: 48rem) {
		.hero {
			grid-template-columns: 1fr;
		}
		.category-grid {
			grid-template-columns: 1fr;
		}
		.section-heading {
			align-items: start;
			flex-direction: column;
		}
		.metrics {
			width: 100%;
		}
		.metrics div {
			flex: 1;
		}
	}
</style>
