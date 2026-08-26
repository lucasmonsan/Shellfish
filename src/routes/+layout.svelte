<script lang="ts">
	import '$lib/styles/index.css';
	import { setI18n, createI18n } from '$lib/utils/i18n.svelte.js';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types.js';

	let { data, children }: { data: LayoutData; children: import('svelte').Snippet } = $props();

	// Cria instância isolada e segura por árvore de renderização / request
	const i18n = createI18n(() => data.locale, 'zoo_locale');
	setI18n(i18n);

	let lastDataLocale = $state<string>();
	$effect(() => {
		if (lastDataLocale !== undefined && data.locale !== lastDataLocale) {
			i18n.setLocale(data.locale, false);
		}
		lastDataLocale = data.locale;
	});

	onMount(() => {
		// Fallback de migração se houver preferência anterior no localStorage e SSR não veio de cookie explícito
		i18n.hydrateFromLocalStorage(data.hasLocaleCookie);
	});
</script>

<svelte:head>
	<title>{i18n.t('document.title')}</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

{@render children()}
