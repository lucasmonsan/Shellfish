<script lang="ts">
	import type { CatalogEntry } from './types.js';
	import { getI18n } from '$lib/utils/i18n.svelte.js';
	import { catalogT } from './translations.js';

	let { entry, values }: { entry: CatalogEntry; values: Record<string, unknown> } = $props();
	let Preview = $state<Awaited<ReturnType<CatalogEntry['load']>>['default']>();
	let loadError = $state(false);
	const i18n = getI18n();
	let previewValues = $derived(
		Object.fromEntries(
			Object.entries(values).filter(
				([name]) =>
					![
						'children',
						'header',
						'footer',
						'back',
						'trigger',
						'prefix',
						'suffix',
						'onclose',
						'onchange',
						'onselect',
						'onadd',
						'onremove',
						'group'
					].includes(name)
			)
		)
	);

	$effect(() => {
		loadError = false;
		entry
			.load()
			.then((module) => (Preview = module.default))
			.catch(() => (loadError = true));
	});
</script>

{#if loadError}
	<p role="alert">{catalogT(i18n.currentLocale, 'catalog.loadError')}</p>
{:else if Preview}
	<div
		class:layout-demo={['Row', 'Column', 'Grid'].includes(entry.name)}
		data-catalog-demo={entry.slug}
	>
		{#if entry.name === 'Button' && values.iconOnly}
			<Preview {...previewValues} aria-label={catalogT(i18n.currentLocale, 'catalog.addItem')}
				><svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg
				></Preview
			>
		{:else if ['Row', 'Column', 'Grid'].includes(entry.name)}
			<Preview {...previewValues}
				><span class="demo-block">A</span><span class="demo-block demo-block--tall">B</span><span
					class="demo-block">C</span
				></Preview
			>
		{:else if entry.name === 'Dialog'}
			<Preview {...previewValues}>{catalogT(i18n.currentLocale, 'catalog.example')}</Preview>
		{:else if entry.name === 'Toast'}
			<Preview {...previewValues}>{catalogT(i18n.currentLocale, 'catalog.example')}</Preview>
		{:else if entry.name === 'Alert'}
			<Preview {...previewValues}>{catalogT(i18n.currentLocale, 'catalog.example')}</Preview>
		{:else if entry.props.includes('children')}
			<Preview {...previewValues}>{catalogT(i18n.currentLocale, 'catalog.example')}</Preview>
		{:else}
			<Preview {...previewValues} />
		{/if}
	</div>
{/if}

<style>
	.layout-demo {
		width: 100%;
		resize: horizontal;
		overflow: auto;
		padding: var(--space-sm);
		border: var(--border-width) dashed var(--border-color);
	}
	.demo-block {
		display: grid;
		min-width: 4rem;
		min-height: 3rem;
		place-items: center;
		border: var(--border-width) solid var(--border-color);
		background: var(--bg-primary);
		font-weight: 800;
	}
	.demo-block--tall {
		min-height: 5rem;
	}
	svg {
		width: 1.25rem;
		height: 1.25rem;
	}
</style>
