<script lang="ts">
	import {
		AppShell,
		Button,
		IconButton,
		Spinner,
		Sun,
		Moon,
		Globe,
		Search,
		X,
		Check,
		ChevronDown,
		ChevronUp,
		ChevronLeft,
		ChevronRight,
		ArrowRight,
		Trash,
		Pencil,
		Plus,
		Minus,
		Eye,
		EyeOff,
		AlertCircle,
		CheckCircle,
		Copy,
		User,
		Settings,
		LogOut,
		FileText,
		Folder,
		Lock,
		Unlock,
		RotateCw,
		Save,
		Download,
		Upload,
		ListBullets,
		BarChart,
		DotsThreeVertical,
		Sparkles,
		Zap
	} from '$lib/index.js';
	import { getI18n } from '$lib/utils/i18n.svelte.js';
	import type { LayoutData } from './$types.js';
	import { onMount } from 'svelte';

	let { data }: { data: LayoutData } = $props();
	const i18n = getI18n();

	let currentTheme = $state<'light' | 'dark'>('light');
	let manualLoading = $state(false);
	let notificationCount = $state(3);

	onMount(() => {
		const active = document.documentElement.dataset.theme;
		if (active === 'dark' || active === 'light') {
			currentTheme = active;
		}
	});

	function toggleTheme() {
		const next = currentTheme === 'light' ? 'dark' : 'light';
		currentTheme = next;
		if (typeof document !== 'undefined') {
			document.documentElement.dataset.theme = next;
			try {
				localStorage.setItem('shellfish-theme', next);
			} catch {
				// Ignora indisponibilidade do storage
			}
		}
	}

	async function simulateAsync() {
		await new Promise((resolve) => setTimeout(resolve, 1200));
	}

	const iconCatalog = [
		{ name: 'Sun', component: Sun },
		{ name: 'Moon', component: Moon },
		{ name: 'Globe', component: Globe },
		{ name: 'Search', component: Search },
		{ name: 'X', component: X },
		{ name: 'Check', component: Check },
		{ name: 'ChevronDown', component: ChevronDown },
		{ name: 'ChevronUp', component: ChevronUp },
		{ name: 'ChevronLeft', component: ChevronLeft },
		{ name: 'ChevronRight', component: ChevronRight },
		{ name: 'ArrowRight', component: ArrowRight },
		{ name: 'Trash', component: Trash },
		{ name: 'Pencil', component: Pencil },
		{ name: 'Plus', component: Plus },
		{ name: 'Minus', component: Minus },
		{ name: 'Eye', component: Eye },
		{ name: 'EyeOff', component: EyeOff },
		{ name: 'AlertCircle', component: AlertCircle },
		{ name: 'CheckCircle', component: CheckCircle },
		{ name: 'Copy', component: Copy },
		{ name: 'User', component: User },
		{ name: 'Settings', component: Settings },
		{ name: 'LogOut', component: LogOut },
		{ name: 'FileText', component: FileText },
		{ name: 'Folder', component: Folder },
		{ name: 'Lock', component: Lock },
		{ name: 'Unlock', component: Unlock },
		{ name: 'RotateCw', component: RotateCw },
		{ name: 'Save', component: Save },
		{ name: 'Download', component: Download },
		{ name: 'Upload', component: Upload },
		{ name: 'ListBullets', component: ListBullets },
		{ name: 'BarChart', component: BarChart },
		{ name: 'DotsThreeVertical', component: DotsThreeVertical },
		{ name: 'Sparkles', component: Sparkles },
		{ name: 'Zap', component: Zap }
	];
</script>

<svelte:head>
	<title>{i18n.t('document.title')}</title>
</svelte:head>

<AppShell>
	{#snippet top()}
		<div class="bar">
			<div class="brand">
				<span class="brand-icon" aria-hidden="true"></span>
				<span class="brand-name">Shellfish</span>
			</div>

			<div class="actions">
				<Button
					variant="secondary"
					size="sm"
					ariaLabel={i18n.t('locale.toggle')}
					onclick={() => i18n.toggleLocale()}
				>
					<Globe size={16} />
					{i18n.t('locale.current')}
				</Button>

				<IconButton
					label={i18n.t('theme.toggle')}
					variant="secondary"
					size="sm"
					onclick={toggleTheme}
				>
					{#if currentTheme === 'light'}
						<Sun size={16} />
					{:else}
						<Moon size={16} />
					{/if}
				</IconButton>
			</div>
		</div>
	{/snippet}

	<div class="catalog">
		<section class="group">
			<h2>Button</h2>

			<div class="subgroup">
				<span class="label">Variants</span>
				<div class="row">
					<Button variant="primary">
						<Check size={16} />
						Primary
					</Button>
					<Button variant="secondary">
						<Settings size={16} />
						Secondary
					</Button>
					<Button variant="danger">
						<Trash size={16} />
						Danger
					</Button>
					<Button variant="warning">
						<AlertCircle size={16} />
						Warning
					</Button>
					<Button variant="success">
						<CheckCircle size={16} />
						Success
					</Button>
					<Button variant="outline">
						<Search size={16} />
						Outline
					</Button>
					<Button variant="ghost">
						<Copy size={16} />
						Ghost
					</Button>
					<Button variant="primary" disabled>{i18n.t('common.disabled')}</Button>
				</div>
			</div>

			<div class="subgroup">
				<span class="label">Sizes</span>
				<div class="row">
					<Button size="sm" variant="secondary">
						<Plus size={14} />
						sm
					</Button>
					<Button size="md" variant="secondary">
						<Plus size={16} />
						md
					</Button>
					<Button size="lg" variant="secondary">
						<Plus size={18} />
						lg
					</Button>
				</div>
			</div>

			<div class="subgroup">
				<span class="label">Loading & IconButton</span>
				<div class="row">
					<Button variant="primary" onclick={simulateAsync}>
						<Save size={16} />
						{i18n.t('common.save')}
					</Button>

					<Button
						variant="secondary"
						loading={manualLoading}
						onclick={() => {
							manualLoading = !manualLoading;
						}}
					>
						Loading
					</Button>

					<Button variant="secondary" square ariaLabel={i18n.t('common.add')}>
						<Plus size={18} />
					</Button>

					<Button variant="primary" square ariaLabel={i18n.t('common.search')}>
						<Search size={18} />
					</Button>

					<Button variant="danger" square ariaLabel={i18n.t('common.delete')}>
						<Trash size={18} />
					</Button>

					<IconButton
						label={i18n.t('common.notifications')}
						count={notificationCount}
						onclick={() => {
							notificationCount = notificationCount > 0 ? 0 : 3;
						}}
					>
						<Sparkles size={18} />
					</IconButton>
				</div>
			</div>
		</section>

		<section class="group">
			<h2>Spinner</h2>
			<div class="row">
				<div class="cell">
					<Spinner size="sm" />
					<span class="mono">sm</span>
				</div>
				<div class="cell">
					<Spinner size="md" />
					<span class="mono">md</span>
				</div>
				<div class="cell">
					<Spinner size="lg" />
					<span class="mono">lg</span>
				</div>
			</div>
		</section>

		<section class="group">
			<h2>Icons</h2>
			<div class="icons-grid">
				{#each iconCatalog as icon (icon.name)}
					<div class="icon-cell">
						<icon.component size={20} />
						<span class="mono">{icon.name}</span>
					</div>
				{/each}
			</div>
		</section>
	</div>

	{#snippet bottom()}
		<div class="bar footer">
			<span>v{data.version}</span>
			<span>Monsan</span>
		</div>
	{/snippet}
</AppShell>

<style>
	.bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--space-sm) var(--space-lg);
		max-width: 1280px;
		margin: 0 auto;
		width: 100%;
	}

	.footer {
		font-size: var(--text-xs);
		font-family: var(--font-mono);
		color: var(--text-muted);
	}

	.brand {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
	}

	.brand-icon {
		display: inline-block;
		width: 20px;
		height: 20px;
		background-color: var(--color-primary);
		-webkit-mask: url('/favicon.svg') no-repeat center / contain;
		mask: url('/favicon.svg') no-repeat center / contain;
		flex-shrink: 0;
	}

	.brand-name {
		font-weight: 700;
		font-size: var(--text-md);
	}

	.actions {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
	}

	.catalog {
		max-width: 1280px;
		margin: 0 auto;
		padding: var(--space-lg);
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.group {
		background-color: var(--bg-elevated);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-xs);
		padding: var(--space-lg);
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	h2 {
		margin: 0;
		font-size: var(--text-lg);
		font-weight: 700;
	}

	.subgroup {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.label {
		font-size: var(--text-xs);
		font-family: var(--font-mono);
		color: var(--text-muted);
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
		align-items: center;
	}

	.cell {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-sm);
		padding: var(--space-md);
		background-color: var(--bg-primary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-xs);
		min-width: 80px;
	}

	.icons-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(128px, 1fr));
		gap: var(--space-sm);
	}

	.icon-cell {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-sm);
		padding: var(--space-sm);
		background-color: var(--bg-primary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-xs);
	}

	.mono {
		font-size: var(--text-xxs);
		font-family: var(--font-mono);
		color: var(--text-secondary);
	}
</style>
