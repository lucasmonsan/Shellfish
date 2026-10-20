<script lang="ts">
	import Modal from '$lib/components/overlay/Modal.svelte';
	import Select from '$lib/components/forms/Select.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import Button from '$lib/components/actions/Button.svelte';

	let modalOpen = $state(false);
	let selectedValue = $state('');
	let textValue = $state('');

	const options = [
		{ value: 'opt1', label: 'Opção 1' },
		{ value: 'opt2', label: 'Opção 2' },
		{ value: 'opt3', label: 'Opção 3' }
	];
</script>

<button type="button" class="open-modal-btn" onclick={() => (modalOpen = true)}>
	Abrir Modal
</button>

<Modal bind:open={modalOpen} title="Modal de Teste">
	<div class="modal-inner-content">
		<p>Texto dentro do modal</p>
		<Input bind:value={textValue} placeholder="Campo de texto" />
		<Select bind:value={selectedValue} {options} placeholder="Selecione um item" />
	</div>
	{#snippet footer(close)}
		<Button variant="danger" onclick={close}>Cancelar</Button>
		<Button variant="primary" onclick={close}>Confirmar</Button>
	{/snippet}
</Modal>
