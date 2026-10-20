<script lang="ts">
	import Tooltip from '$lib/components/overlay/Tooltip.svelte';
</script>

<div style="padding: 80px;">
	<Tooltip text="Informação de ajuda" delay={0}>
		{#snippet trigger(describedBy)}
			<button type="button" aria-describedby={describedBy}> Ação com Dica </button>
		{/snippet}
	</Tooltip>
</div>
