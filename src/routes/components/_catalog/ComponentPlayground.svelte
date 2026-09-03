<script lang="ts">
	import { getI18n } from '$lib/utils/i18n.svelte.js';
	import { catalogT } from './translations.js';
	import { createCode, createExampleProps } from './code.js';
	import type { ApiDefinition, CatalogEntry } from './types.js';

	let { entry, api }: { entry: CatalogEntry; api?: ApiDefinition } = $props();
	const i18n = getI18n();
	let values = $state<Record<string, unknown>>({});
	let Demo = $state<Awaited<ReturnType<CatalogEntry['loadDemo']>>['default']>();
	let loadError = $state(false);
	let copied = $state(false);

	$effect(() => {
		values = createExampleProps(entry);
		loadError = false;
		entry
			.loadDemo()
			.then((module) => (Demo = module.default))
			.catch(() => (loadError = true));
	});
	let code = $derived(createCode(entry, values));
	async function copyCode() {
		await navigator.clipboard.writeText(code);
		copied = true;
		setTimeout(() => (copied = false), 1600);
	}
	function updateValue(prop: string, value: string | boolean | number) {
		values = { ...values, [prop]: value };
	}
</script>

<section aria-labelledby="playground-title">
	<h2 id="playground-title">{catalogT(i18n.currentLocale, 'catalog.playground')}</h2>
	<div class="playground-grid">
		<div class="preview" aria-labelledby="preview-title">
			<h3 id="preview-title">{catalogT(i18n.currentLocale, 'catalog.preview')}</h3>
			{#if loadError}<p role="alert">
					{catalogT(i18n.currentLocale, 'catalog.loadError')}
				</p>{:else if Demo}<Demo {entry} {values} />{/if}
		</div>
		<aside aria-labelledby="controls-title">
			<h3 id="controls-title">{catalogT(i18n.currentLocale, 'catalog.controls')}</h3>
			{#each entry.controls as control (control.prop)}
				{#if control.kind === 'boolean'}<label
						><input
							type="checkbox"
							checked={Boolean(values[control.prop])}
							onchange={(event) => updateValue(control.prop, event.currentTarget.checked)}
						/>{control.prop}</label
					>
				{:else if control.kind === 'select'}<label
						>{control.prop}<select
							value={String(values[control.prop])}
							onchange={(event) => updateValue(control.prop, event.currentTarget.value)}
							>{#each control.options ?? [] as option (option)}<option value={option}
									>{option}</option
								>{/each}</select
						></label
					>
				{:else if control.kind === 'number'}<label
						>{control.prop}<input
							type="number"
							value={Number(values[control.prop])}
							min={control.min}
							max={control.max}
							step={control.step}
							oninput={(event) => updateValue(control.prop, Number(event.currentTarget.value))}
						/></label
					>
				{:else if control.kind === 'date'}<label
						>{control.prop}<input
							type="date"
							value={String(values[control.prop])}
							onchange={(event) => updateValue(control.prop, event.currentTarget.value)}
						/></label
					>
				{:else if control.kind === 'text'}<label
						>{control.prop}<input
							value={String(values[control.prop])}
							oninput={(event) => updateValue(control.prop, event.currentTarget.value)}
						/></label
					>
				{:else}<p>
						<strong>{control.prop}</strong>: {catalogT(i18n.currentLocale, 'catalog.scenario')}
						{String(values[control.prop])}
					</p>{/if}
			{/each}
		</aside>
	</div>
</section>

<section aria-labelledby="code-title">
	<div class="section-title">
		<h2 id="code-title">{catalogT(i18n.currentLocale, 'catalog.code')}</h2>
		<button type="button" onclick={copyCode} aria-live="polite"
			>{copied
				? catalogT(i18n.currentLocale, 'catalog.copied')
				: catalogT(i18n.currentLocale, 'catalog.copy')}</button
		>
	</div>
	<pre><code>{code}</code></pre>
</section>

<section aria-labelledby="api-title">
	<h2 id="api-title">{catalogT(i18n.currentLocale, 'catalog.api')}</h2>
	{#if api}<p>{api.documentation}</p>
		<div class="api-table" role="region" aria-label={catalogT(i18n.currentLocale, 'catalog.api')}>
			<table>
				<thead
					><tr
						><th>{catalogT(i18n.currentLocale, 'catalog.prop')}</th><th
							>{catalogT(i18n.currentLocale, 'catalog.type')}</th
						><th>{catalogT(i18n.currentLocale, 'catalog.required')}</th><th
							>{catalogT(i18n.currentLocale, 'catalog.descriptionLabel')}</th
						></tr
					></thead
				><tbody
					>{#each api.props as prop (prop.name)}<tr
							><td><code>{prop.name}</code></td><td><code>{prop.type}</code></td><td
								>{prop.optional
									? catalogT(i18n.currentLocale, 'catalog.optional')
									: catalogT(i18n.currentLocale, 'catalog.required')}</td
							><td>{prop.documentation}</td></tr
						>{/each}</tbody
				>
			</table>
		</div>{/if}
</section>

<style>
	section {
		margin-top: var(--space-2xl);
	}
	h2,
	h3 {
		margin: 0;
		font-family: var(--font-display);
	}
	.playground-grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(15rem, 20rem);
		gap: var(--space-md);
	}
	.preview,
	aside,
	pre,
	.api-table {
		border: var(--border-width) solid var(--border-color);
		background: var(--bg-secondary);
		box-shadow: var(--shadow);
	}
	.preview,
	aside {
		padding: var(--space-md);
	}
	.preview {
		min-height: 18rem;
	}
	.preview :global([data-catalog-demo]) {
		display: grid;
		min-height: 12rem;
		place-items: center;
	}
	aside {
		display: grid;
		align-content: start;
		gap: var(--space-sm);
	}
	label {
		display: grid;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		font-weight: 800;
	}
	input,
	select {
		min-height: var(--control-height-sm);
		border: var(--border-width) solid var(--border-color);
		background: var(--bg-primary);
		color: var(--text-primary);
		font: inherit;
	}
	.section-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-md);
		margin-bottom: var(--space-sm);
	}
	button {
		min-height: var(--control-height-sm);
		padding-inline: var(--space-sm);
		border: var(--border-width) solid var(--border-color);
		background: var(--color-primary);
		color: var(--color-primary-contrast);
		box-shadow: var(--shadow);
		font: inherit;
		font-weight: 800;
		cursor: pointer;
	}
	pre {
		margin: 0;
		padding: var(--space-md);
		overflow: auto;
		white-space: pre-wrap;
	}
	.api-table {
		overflow: auto;
	}
	table {
		width: 100%;
		border-collapse: collapse;
		text-align: left;
	}
	th,
	td {
		padding: var(--space-sm);
		border-bottom: var(--border-width) solid var(--border-color);
		vertical-align: top;
	}
	th {
		font-size: var(--text-xs);
		text-transform: uppercase;
	}
	@media (max-width: 48rem) {
		.playground-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
