<script lang="ts">
	import { getI18n } from '$lib/utils/i18n.svelte.js';
	import type { LayoutData } from './$types.js';

	let { data }: { data: LayoutData } = $props();
	const i18n = getI18n();
</script>

<svelte:head>
	<title>{i18n.t('showcase.title')} — {i18n.t('showcase.subtitle')}</title>
</svelte:head>

<main class="foundation-container">
	<header class="foundation-header">
		<span class="badge">{i18n.t('showcase.status')}</span>
		<h1>{i18n.t('showcase.title')}</h1>
		<p class="subtitle">{i18n.t('showcase.subtitle')}</p>
		<p class="tagline">{i18n.t('showcase.tagline')}</p>
	</header>

	<section class="foundation-card">
		<h2>Próximos Passos (Fase 1)</h2>
		<p>
			A base limpa em Svelte 5 foi inicializada com sucesso. Agora estamos prontos para implementar
			o primeiro bloco fundamental:
		</p>
		<ul>
			<li>
				<strong>AppShell:</strong> Contêiner de Viewport com regiões <code>Top</code>,
				<code>Content</code>
				(com scroll interno e degradês automáticos) e <code>Bottom</code>.
			</li>
			<li>
				<strong>Tokens Minimalistas:</strong> Paleta refinada, elevação sutil e controle automático de
				blur por performance.
			</li>
			<li>
				<strong>Acessibilidade & i18n:</strong> Suporte nativo a <code>pt-BR</code>,
				<code>en-US</code>
				e <code>es</code>.
			</li>
		</ul>
	</section>

	<footer class="foundation-footer">
		<span>v{data.version}</span>
		<span>Suíte Monsan</span>
	</footer>
</main>

<style>
	.foundation-container {
		max-width: 720px;
		margin: 0 auto;
		padding: var(--space-2xl) var(--space-md);
		display: flex;
		flex-direction: column;
		gap: var(--space-xl);
		min-height: 100dvh;
		justify-content: center;
	}

	.foundation-header {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.badge {
		align-self: flex-start;
		font-size: var(--text-xs);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 4px 10px;
		background-color: var(--color-primary-subtle);
		color: var(--color-primary);
		border-radius: var(--radius-full);
	}

	h1 {
		font-size: var(--text-3xl);
		letter-spacing: -0.02em;
		margin: 0;
	}

	.subtitle {
		font-size: var(--text-lg);
		color: var(--text-secondary);
		margin: 0;
	}

	.tagline {
		font-size: var(--text-sm);
		color: var(--text-muted);
		margin: 0;
	}

	.foundation-card {
		background-color: var(--bg-elevated);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
	}

	.foundation-card h2 {
		font-size: var(--text-xl);
		margin-bottom: var(--space-sm);
	}

	.foundation-card ul {
		margin: var(--space-sm) 0 0 0;
		padding-left: var(--space-lg);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		color: var(--text-secondary);
		font-size: var(--text-sm);
	}

	.foundation-footer {
		display: flex;
		justify-content: space-between;
		font-size: var(--text-xs);
		color: var(--text-muted);
		border-top: var(--border-width) solid var(--border-color);
		padding-top: var(--space-md);
	}
</style>
