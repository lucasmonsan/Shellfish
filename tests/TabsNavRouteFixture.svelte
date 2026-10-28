<script lang="ts">
	import { Tabs, TabList, Tab } from '$lib/index.js';

	let { value = '/votar' } = $props();
</script>

<Tabs {value}>
	<TabList asNav label="Navegação Principal" fullWidth>
		<Tab value="/" href="/" label="Cobrar" />
		<Tab value="/votar" href="/votar" label="Votar" />
		<Tab value="/fiscalizar" href="/fiscalizar" label="Fiscalizar" />
	</TabList>
</Tabs>
