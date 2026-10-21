<script lang="ts">
	import '$lib/styles/index.css';
	import { setI18n, createI18n } from '$lib/utils/i18n.svelte.js';
	import { ToastContainer } from '$lib/components/feedback/index.js';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types.js';

	let { data, children }: { data: LayoutData; children: import('svelte').Snippet } = $props();

	const i18n = createI18n(() => data.locale, 'monsan_locale');
	setI18n(i18n);

	let lastDataLocale = $state<string>();
	$effect(() => {
		if (lastDataLocale !== undefined && data.locale !== lastDataLocale) {
			i18n.setLocale(data.locale, false);
		}
		lastDataLocale = data.locale;
	});

	onMount(() => {
		i18n.hydrateFromLocalStorage(data.hasLocaleCookie);
	});
</script>

<svelte:head>
	<title>{i18n.t('document.title')}</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

{@render children()}

<ToastContainer />
