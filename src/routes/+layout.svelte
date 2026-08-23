<script lang="ts">
	import '$lib/styles/index.css';
	import { i18n } from '$lib/utils/i18n.svelte.js';
	import type { LayoutData } from './$types.js';

	let { data, children }: { data: LayoutData; children: import('svelte').Snippet } = $props();

	$effect.pre(() => {
		if (data?.locale) {
			i18n.setLocale(data.locale, false);
		}
	});
</script>

<svelte:head>
	<title>Shellfish UI</title>
</svelte:head>

{@render children()}
