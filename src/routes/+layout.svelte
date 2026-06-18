<script lang="ts">
	import '../app.css';
	import { getLocale } from '$lib/paraglide/runtime';
	import favicon from '$lib/assets/favicon.svg';
	import { PageShell, Background, i18n } from 'monsan-ui';

	let { children } = $props();

	$effect(() => {
		i18n.currentLocale = getLocale();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Shellfish</title>
</svelte:head>

<PageShell tag="div" maxWidth="none" padding="none" height="viewport" overflow="visible">
	<Background pattern="grid" animate={true} />
	{@render children()}
</PageShell>
