<script lang="ts">
	import { Main, Header, Section, Footer, Row, LocaleSelector, ThemeSelector } from '$lib/index.js';
	import { resolve } from '$app/paths';
	import { getI18n } from '$lib/utils/i18n.svelte.js';
	import { catalogT } from './components/_catalog/translations.js';
	import type { LayoutData } from './$types.js';

	let { data }: { data: LayoutData } = $props();
	const i18n = getI18n();
</script>

<Main fullHeight={true} padding="none" gap="none">
	<Header sticky={true} padding="md">
		<Row fullWidth={true} justify="between" align="center">
			<a href={resolve('/')} aria-label="Shellfish">Shellfish</a>
			<Row align="center" gap="sm"><LocaleSelector size="md" /><ThemeSelector size="md" /></Row>
		</Row>
	</Header>
	<Section padding="xl" gap="lg">
		<h1>{catalogT(i18n.currentLocale, 'catalog.homeTitle')}</h1>
		<p>{catalogT(i18n.currentLocale, 'catalog.homeDescription')}</p>
		<a class="catalog-link" href={resolve('/components')}
			>{catalogT(i18n.currentLocale, 'catalog.openCatalog')}</a
		>
	</Section>
	<Footer padding="md"><small>Shellfish v{data.version}</small></Footer>
</Main>

<style>
	.catalog-link {
		align-self: start;
		display: inline-flex;
		min-height: var(--control-height-md);
		align-items: center;
		padding-inline: var(--space-md);
		border: var(--border-width) solid var(--border-color);
		background: var(--color-primary);
		color: var(--color-primary-contrast);
		box-shadow: var(--shadow);
		text-decoration: none;
	}
	.catalog-link:hover {
		transform: translate(-1px, -1px);
		box-shadow: 2px 2px 0px var(--border-color);
	}
	.catalog-link:active {
		transform: translate(1px, 1px);
		box-shadow: 0px 0px 0px var(--border-color);
	}
	.catalog-link:focus-visible {
		outline: var(--border-width) solid var(--color-primary);
		outline-offset: var(--space-xs);
	}
</style>
