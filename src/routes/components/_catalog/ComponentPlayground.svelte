<script lang="ts">
	import { getI18n } from '$lib/utils/i18n.svelte.js';
	import { catalogT } from './translations.js';
	import { createCode, createExampleProps } from './code.js';
	import type { ApiDefinition, CatalogEntry } from './types.js';

	let { entry, api }: { entry: CatalogEntry; api?: ApiDefinition } = $props();
	const i18n = getI18n();
	let values = $state<Record<string, unknown>>({});
	let Preview = $state<Awaited<ReturnType<CatalogEntry['load']>>['default']>();
	let loadError = $state(false);
	let copied = $state(false);

	$effect(() => {
		values = createExampleProps(entry);
		loadError = false;
		entry
			.load()
			.then((module) => (Preview = module.default))
			.catch(() => (loadError = true));
	});

	let code = $derived(createCode(entry, values));
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
		<aside aria-labelledby="controls-title">
			<h3 id="controls-title">{catalogT(i18n.currentLocale, 'catalog.controls')}</h3>
			{#each entry.controls as control (control.prop)}
				{#if control.kind === 'boolean'}
					<label
						><input
							type="checkbox"
							checked={Boolean(values[control.prop])}
							onchange={(event) => updateValue(control.prop, event.currentTarget.checked)}
						/>
						{control.prop}</label
					>
				{:else if control.kind === 'select'}
					<label
						>{control.prop}<select
							value={String(values[control.prop])}
							onchange={(event) => updateValue(control.prop, event.currentTarget.value)}
							>{#each control.options ?? [] as option (option)}<option value={option}
									>{option}</option
								>{/each}</select
						></label
					>
				{:else if control.kind === 'number'}
					<label
						>{control.prop}<input
							type="number"
							value={Number(values[control.prop])}
							min={control.min}
							max={control.max}
							step={control.step}
							oninput={(event) => updateValue(control.prop, Number(event.currentTarget.value))}
						/></label
					>
				{:else if control.kind === 'date'}
					<label
						>{control.prop}<input
							type="date"
							value={String(values[control.prop])}
							onchange={(event) => updateValue(control.prop, event.currentTarget.value)}
						/></label
					>
				{:else if control.kind === 'text'}
					<label
						>{control.prop}<input
							value={String(values[control.prop])}
							oninput={(event) => updateValue(control.prop, event.currentTarget.value)}
						/></label
					>
				{:else}
					<p>
						<strong>{control.prop}</strong>: {catalogT(i18n.currentLocale, 'catalog.scenario')}
						{String(values[control.prop])}
					</p>
				{/if}
			{/each}
		</aside>
		<div class="preview" aria-labelledby="preview-title">
			<h3 id="preview-title">{catalogT(i18n.currentLocale, 'catalog.preview')}</h3>
			{#if loadError}
				<p role="alert">{catalogT(i18n.currentLocale, 'catalog.loadError')}</p>
			{:else if Preview}
				<Preview {...previewValues}>{catalogT(i18n.currentLocale, 'catalog.example')}</Preview>
			{/if}
		</div>
	</div>
</section>

<section aria-labelledby="code-title">
	<h2 id="code-title">{catalogT(i18n.currentLocale, 'catalog.code')}</h2>
	<pre><code>{code}</code></pre>
	<button type="button" onclick={copyCode} aria-live="polite"
		>{copied
			? catalogT(i18n.currentLocale, 'catalog.copied')
			: catalogT(i18n.currentLocale, 'catalog.copy')}</button
	>
</section>

<section aria-labelledby="api-title">
	<h2 id="api-title">{catalogT(i18n.currentLocale, 'catalog.api')}</h2>
	{#if api}
		<p>{api.documentation}</p>
		<ul>
			{#each api.props as prop (prop.name)}
				<li>
					<code>{prop.name}{prop.optional ? '?' : ''}: {prop.type}</code>{#if prop.documentation}
						— {prop.documentation}{/if}
				</li>
			{/each}
		</ul>
	{/if}
	<h3>{catalogT(i18n.currentLocale, 'catalog.native')}</h3>
	<p>{catalogT(i18n.currentLocale, 'catalog.nativeDescription')}</p>
	<h3>{catalogT(i18n.currentLocale, 'catalog.a11y')}</h3>
	<p>{catalogT(i18n.currentLocale, 'catalog.a11yDescription')}</p>
</section>

<style>
	.playground-grid {
		display: grid;
		grid-template-columns: minmax(14rem, 20rem) minmax(0, 1fr);
		gap: var(--space-md);
	}
	aside,
	.preview,
	pre {
		border: var(--border-width) solid var(--border-color);
		padding: var(--space-md);
		background: var(--bg-secondary);
	}
	label {
		display: grid;
		gap: var(--space-xs);
		margin-block-end: var(--space-sm);
		font: inherit;
	}
	input,
	select {
		min-height: var(--control-height-sm);
		border: var(--border-width) solid var(--border-color);
		background: var(--bg-primary);
		color: var(--text-primary);
		font: inherit;
	}
	pre {
		overflow: auto;
		white-space: pre-wrap;
	}
	button {
		min-height: var(--control-height-md);
		border: var(--border-width) solid var(--border-color);
		background: var(--color-primary);
		color: var(--color-primary-contrast);
		box-shadow: var(--shadow);
		font: inherit;
		cursor: pointer;
	}
	button:hover {
		transform: translate(-1px, -1px);
		box-shadow: 2px 2px 0px var(--border-color);
	}
	button:active {
		transform: translate(1px, 1px);
		box-shadow: 0px 0px 0px var(--border-color);
	}
	button:focus-visible,
	input:focus-visible,
	select:focus-visible {
		outline: var(--border-width) solid var(--color-primary);
		outline-offset: var(--space-xs);
	}
	@media (max-width: 48rem) {
		.playground-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
