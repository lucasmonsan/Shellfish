<script lang="ts">
	import { Tabs, TabList, Tab, TabPanel } from '$lib/index.js';

	let {
		value = $bindable('extrato'),
		orientation = 'horizontal' as const,
		activation = 'automatic' as const
	} = $props();
</script>

<Tabs bind:value {orientation} {activation}>
	<TabList label="Minhas Abas">
		<Tab value="extrato">Extrato</Tab>
		<Tab value="graficos">Gráficos</Tab>
		<Tab value="metas" disabled>Metas</Tab>
	</TabList>

	<TabPanel value="extrato">
		<div data-testid="panel-extrato">Conteúdo do Extrato</div>
	</TabPanel>
	<TabPanel value="graficos">
		<div data-testid="panel-graficos">Conteúdo dos Gráficos</div>
	</TabPanel>
	<TabPanel value="metas">
		<div data-testid="panel-metas">Conteúdo das Metas</div>
	</TabPanel>
</Tabs>
