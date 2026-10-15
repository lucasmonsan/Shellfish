<script lang="ts">
	import { AppShell } from '$lib/index.js';
	import { getI18n } from '$lib/utils/i18n.svelte.js';
	import type { LayoutData } from './$types.js';

	let { data }: { data: LayoutData } = $props();
	const i18n = getI18n();

	let currentTheme = $state<'light' | 'dark'>('light');

	function toggleTheme() {
		const next = currentTheme === 'light' ? 'dark' : 'light';
		currentTheme = next;
		if (typeof document !== 'undefined') {
			document.documentElement.dataset.theme = next;
			try {
				localStorage.setItem('shellfish-theme', next);
			} catch {
				// Ignora erro de storage
			}
		}
	}

	function handleToggleLocale() {
		i18n.toggleLocale();
	}
</script>

<svelte:head>
	<title>{i18n.t('showcase.title')} — {i18n.t('showcase.subtitle')}</title>
</svelte:head>

<AppShell>
	{#snippet top()}
		<div class="shell-top-bar">
			<div class="brand">
				<span class="logo-mark">🐚</span>
				<div class="brand-text">
					<span class="brand-name">{i18n.t('showcase.title')}</span>
					<span class="version-badge">v{data.version}</span>
				</div>
			</div>

			<div class="top-actions">
				<button type="button" class="action-btn" onclick={handleToggleLocale}>
					🌐 {i18n.t('locale.current')}
				</button>
				<button type="button" class="action-btn" onclick={toggleTheme}>
					{currentTheme === 'light' ? '🌙 Escuro' : '☀️ Claro'}
				</button>
			</div>
		</div>
	{/snippet}

	<div class="page-content">
		<header class="hero-section">
			<span class="phase-pill">Fase 1 Concluída</span>
			<h1>AppShell & Viewport</h1>
			<p class="hero-desc">
				O contêiner oficial de layout da Suíte Monsan com semântica estrita, viewport dinâmica (<code
					>100dvh</code
				>), e degradês de scroll automáticos.
			</p>
		</header>

		<section class="demo-card">
			<h2>Como o AppShell Funciona</h2>
			<div class="demo-grid">
				<div class="demo-feature">
					<div class="feature-icon">🔝</div>
					<h3>Região Top</h3>
					<p>Fixo no topo com suporte a <code>backdrop-filter</code> e borda sutil.</p>
				</div>
				<div class="demo-feature">
					<div class="feature-icon">📜</div>
					<h3>Região Content (Center)</h3>
					<p>
						Rolagem interna suave com fades superior e inferior que surgem quando o conteúdo
						transborda.
					</p>
				</div>
				<div class="demo-feature">
					<div class="feature-icon">🔻</div>
					<h3>Região Bottom</h3>
					<p>Rodapé ou barra de ações fixa na base da viewport sem quebrar em mobile.</p>
				</div>
			</div>
		</section>

		<section class="demo-card">
			<h2>Demonstração de Scroll e Fades Automáticos</h2>
			<p>
				Role esta página para cima e para baixo. Observe como o degradê suave superior surge assim
				que o conteúdo afunda sob o cabeçalho, e o degradê inferior desaparece quando você atinge o
				final.
			</p>

			<div class="mock-cards-list">
				{#each Array.from({ length: 8 }, (_, i) => i + 1) as item (item)}
					<article class="mock-item">
						<span class="item-number">#{item}</span>
						<div class="item-body">
							<h4>Bloco de Demonstração {item}</h4>
							<p>
								Simulação de superfície de conteúdo para validação do cálculo dinâmico de rolagem e
								integridade do viewport em telas móveis e desktop.
							</p>
						</div>
					</article>
				{/each}
			</div>
		</section>
	</div>

	{#snippet bottom()}
		<div class="shell-bottom-bar">
			<span>🐚 Shellfish — Porta <code>4401</code></span>
			<span>Suíte Monsan</span>
		</div>
	{/snippet}
</AppShell>

<style>
	.shell-top-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--space-sm) var(--space-md);
		max-width: 960px;
		margin: 0 auto;
		width: 100%;
	}

	.brand {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
	}

	.logo-mark {
		font-size: 1.5rem;
		line-height: 1;
	}

	.brand-text {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
	}

	.brand-name {
		font-weight: 700;
		font-size: var(--text-md);
		letter-spacing: -0.01em;
	}

	.version-badge {
		font-size: var(--text-xs);
		background-color: var(--border-color);
		padding: 2px 6px;
		border-radius: var(--radius-sm);
		color: var(--text-secondary);
	}

	.top-actions {
		display: flex;
		gap: var(--space-xs);
	}

	.action-btn {
		font-family: inherit;
		font-size: var(--text-xs);
		font-weight: 500;
		background-color: var(--bg-elevated);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		padding: 6px 12px;
		cursor: pointer;
		color: var(--text-primary);
		transition: background-color var(--transition-fast);
	}

	.action-btn:hover {
		background-color: var(--bg-secondary);
	}

	.page-content {
		max-width: 840px;
		margin: 0 auto;
		padding: var(--space-xl) var(--space-md) var(--space-2xl);
		display: flex;
		flex-direction: column;
		gap: var(--space-xl);
	}

	.hero-section {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.phase-pill {
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

	.hero-desc {
		font-size: var(--text-lg);
		color: var(--text-secondary);
		margin: 0;
	}

	.demo-card {
		background-color: var(--bg-elevated);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.demo-card h2 {
		margin: 0;
		font-size: var(--text-xl);
	}

	.demo-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: var(--space-md);
	}

	.demo-feature {
		background-color: var(--bg-primary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		padding: var(--space-md);
	}

	.feature-icon {
		font-size: 1.5rem;
		margin-bottom: var(--space-xs);
	}

	.demo-feature h3 {
		font-size: var(--text-md);
		margin: 0 0 var(--space-xs) 0;
	}

	.demo-feature p {
		font-size: var(--text-sm);
		color: var(--text-secondary);
		margin: 0;
	}

	.mock-cards-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		margin-top: var(--space-xs);
	}

	.mock-item {
		display: flex;
		align-items: flex-start;
		gap: var(--space-md);
		padding: var(--space-md);
		background-color: var(--bg-primary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
	}

	.item-number {
		font-size: var(--text-xs);
		font-family: var(--font-mono);
		font-weight: 700;
		padding: 2px 6px;
		background-color: var(--bg-secondary);
		border-radius: var(--radius-sm);
		color: var(--text-secondary);
	}

	.item-body h4 {
		margin: 0 0 var(--space-xxs) 0;
		font-size: var(--text-sm);
	}

	.item-body p {
		margin: 0;
		font-size: var(--text-xs);
		color: var(--text-secondary);
	}

	.shell-bottom-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--space-sm) var(--space-md);
		max-width: 960px;
		margin: 0 auto;
		width: 100%;
		font-size: var(--text-xs);
		color: var(--text-muted);
	}
</style>
