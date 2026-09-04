<script lang="ts">
	import { resolve } from '$app/paths';
	import { getI18n } from '$lib/utils/i18n.svelte.js';
	import { getCatalogGuide } from './guides.js';
	import { catalogT } from './translations.js';
	import type { CatalogEntry } from './types.js';

	let { entry }: { entry: CatalogEntry } = $props();
	const i18n = getI18n();
	let guide = $derived(getCatalogGuide(i18n.currentLocale, entry.name));
</script>

<a class="catalog-card" href={resolve(`/components/${entry.category}/${entry.slug}`)}>
	<span class="catalog-card__meta">
		<span>{catalogT(i18n.currentLocale, `catalog.category.${entry.category}`)}</span>
		<span aria-hidden="true">→</span>
	</span>
	<strong>{entry.name}</strong>
	<span>{guide.summary}</span>
</a>

<style>
	.catalog-card {
		display: grid;
		gap: var(--space-sm);
		min-height: 10rem;
		padding: var(--space-md);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		background: var(--bg-primary);
		box-shadow: var(--shadow);
		color: var(--text-primary);
		text-decoration: none;
		transition:
			transform 0.12s cubic-bezier(0.4, 0, 0.2, 1),
			box-shadow 0.12s cubic-bezier(0.4, 0, 0.2, 1);
	}
	.catalog-card:hover {
		transform: translate(-1px, -1px);
		box-shadow: 3px 3px 0 var(--border-color);
	}
	.catalog-card:active {
		transform: translate(1px, 1px);
		box-shadow: 0 0 0 var(--border-color);
	}
	.catalog-card:focus-visible {
		outline: var(--border-width) solid var(--color-primary);
		outline-offset: var(--space-xs);
	}
	.catalog-card__meta {
		display: flex;
		justify-content: space-between;
		color: var(--text-secondary);
		font-size: var(--text-xs);
		font-weight: 800;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}
	strong {
		font-family: var(--font-display);
		font-size: var(--text-xl);
	}
</style>
