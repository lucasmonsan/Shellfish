<script lang="ts">
	import '$lib/styles/index.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Shellfish UI</title>
</svelte:head>

{@render children()}
