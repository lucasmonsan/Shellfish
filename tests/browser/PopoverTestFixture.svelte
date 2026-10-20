<script lang="ts">
	import Popover from '$lib/components/overlay/Popover.svelte';

	let { open = $bindable(false) } = $props();
</script>

<Popover bind:open>
	{#snippet trigger(toggle, isOpen, ariaProps)}
		<button type="button" onclick={toggle} {...ariaProps}>
			{isOpen ? 'Fechar' : 'Abrir Menu'}
		</button>
	{/snippet}

	{#snippet content(close)}
		<div role="dialog">
			<span>Conteúdo do Painel</span>
			<button type="button" onclick={close}>Fechar no Painel</button>
		</div>
	{/snippet}
</Popover>
