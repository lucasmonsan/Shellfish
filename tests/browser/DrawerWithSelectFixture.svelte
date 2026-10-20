<script lang="ts">
	import Drawer from '$lib/components/overlay/Drawer.svelte';
	import Select from '$lib/components/forms/Select.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import Button from '$lib/components/actions/Button.svelte';

	let drawerOpen = $state(false);
	let selectedValue = $state('');
	let textValue = $state('');

	const options = [
		{ value: 'opt1', label: 'Opção 1' },
		{ value: 'opt2', label: 'Opção 2' },
		{ value: 'opt3', label: 'Opção 3' }
	];
</script>

<button type="button" class="open-drawer-btn" onclick={() => (drawerOpen = true)}>
	Abrir Drawer
</button>

<Drawer bind:open={drawerOpen} title="Drawer de Teste" placement="right">
	<div class="drawer-inner-content">
		<p>Texto dentro do drawer</p>
		<Input bind:value={textValue} placeholder="Campo de texto do drawer" />
		<Select bind:value={selectedValue} {options} placeholder="Selecione um item no drawer" />
	</div>
	{#snippet footer(close)}
		<Button variant="danger" onclick={close}>Fechar</Button>
		<Button variant="primary" onclick={close}>Salvar</Button>
	{/snippet}
</Drawer>
