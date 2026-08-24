<script lang="ts">
	import '$lib/styles/index.css';
	import { setI18n, createI18n } from '$lib/utils/i18n.svelte.js';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types.js';

	let { data, children }: { data: LayoutData; children: import('svelte').Snippet } = $props();

	// Cria instância isolada e segura por árvore de renderização / request
	const i18n = createI18n(() => data.locale, 'zoo_locale');
	setI18n(i18n);

	$effect(() => {
		if (data?.locale) {
			i18n.setLocale(data.locale, false);
		}
	});

	onMount(() => {
		// Fallback de migração se houver preferência anterior no localStorage
		i18n.hydrateFromLocalStorage();
	});
</script>

<svelte:head>
	<title>Shellfish UI</title>
</svelte:head>

{@render children()}
