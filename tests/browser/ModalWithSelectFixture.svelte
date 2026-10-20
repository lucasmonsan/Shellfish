<script lang="ts">
	import Modal from '$lib/components/overlay/Modal.svelte';
	import Select from '$lib/components/forms/Select.svelte';

	let modalOpen = $state(false);
	let selectedValue = $state('');

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
		<Select bind:value={selectedValue} {options} placeholder="Selecione um item" />
	</div>
</Modal>
