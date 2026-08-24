<script lang="ts">
	import Layout from '../src/routes/+layout.svelte';
	import Page from '../src/routes/+page.svelte';
	import type { LayoutData } from '../src/routes/$types.js';

	let { data }: { data: LayoutData } = $props();
</script>

<Layout {data}>
	<Page {data} />
</Layout>
