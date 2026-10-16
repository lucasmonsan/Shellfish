<script lang="ts">
	import {
		AppShell,
		Section,
		Row,
		Column,
		Grid,
		Card,
		Badge,
		Divider,
		Image,
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

	const SAMPLE_IMAGE =
		'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300"><defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="%231e3a8a"/><stop offset="100%" stop-color="%233b82f6"/></linearGradient></defs><rect width="100%" height="100%" fill="url(%23sky)"/><circle cx="310" cy="90" r="45" fill="%23fbbf24"/><polygon points="0,300 130,170 240,300" fill="%23065f46"/><polygon points="150,300 270,140 400,300" fill="%23047857"/><rect x="0" y="260" width="100%" height="40" fill="%230f172a"/><path d="M40 275 L120 275 M180 280 L320 280" stroke="%2393c5fd" stroke-width="3" stroke-linecap="round"/></svg>';

	const SAMPLE_AVATAR =
		'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><rect width="100%" height="100%" fill="%230284c7"/><circle cx="50" cy="38" r="22" fill="%23fed7aa"/><path d="M28 32 Q50 16 72 32 Q50 24 28 32 Z" fill="%237c2d12"/><path d="M20 95 C20 70 34 62 50 62 C66 62 80 70 80 95 Z" fill="%23ea580c"/></svg>';

	let imageState = $state<'valid' | 'error' | 'empty'>('valid');
	let imageFit = $state<'cover' | 'contain'>('cover');
	let imageRadiusIndex = $state(0); // 0 = 'xs' (canonical square)
	const radiusOptions = ['xs', 'none', 'sm'] as const;
	let currentImageRadius = $derived(radiusOptions[imageRadiusIndex]);

	let currentImageSrc = $derived.by(() => {
		if (imageState === 'valid') return SAMPLE_IMAGE;
		if (imageState === 'error') return 'https://invalid-host.broken/non-existent.jpg';
		return null;
	});

	function cycleImageRadius() {
		imageRadiusIndex = (imageRadiusIndex + 1) % radiusOptions.length;
	}

	function toggleImageFit() {
		imageFit = imageFit === 'cover' ? 'contain' : 'cover';
	}
</script>

<svelte:head>
	<title>{i18n.t('document.title')}</title>
</svelte:head>

<AppShell>
	{#snippet top()}
		<Section contained padding="sm">
			<Row justify="between" fullWidth>
				<Row gap="xs">
					<span class="brand-icon" aria-hidden="true"></span>
					<span class="brand-name">Shellfish</span>
				</Row>

				<Row gap="xs">
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
				</Row>
			</Row>
		</Section>
	{/snippet}

	<Section contained padding="lg" gap="md">
		<Card gap="sm">
			<h2>Button</h2>

			<Column gap="xs">
				<span class="label">Variants</span>
				<Row gap="sm">
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
				</Row>
			</Column>

			<Divider spacing="xxs" />

			<Column gap="xs">
				<span class="label">Sizes</span>
				<Row gap="sm">
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
				</Row>
			</Column>

			<Divider spacing="xxs" />

			<Column gap="xs">
				<span class="label">Loading & IconButton</span>
				<Row gap="sm">
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
				</Row>
			</Column>
		</Card>

		<Card gap="sm">
			<h2>Badge & Divider</h2>

			<Column gap="xs">
				<span class="label">Variants</span>
				<Row gap="sm">
					<Badge variant="primary">Primary</Badge>
					<Badge variant="secondary">Secondary</Badge>
					<Badge variant="danger">Danger</Badge>
					<Badge variant="warning">Warning</Badge>
					<Badge variant="success">Success</Badge>
					<Badge variant="outline">Outline</Badge>
					<Badge variant="ghost">Ghost</Badge>
				</Row>
			</Column>

			<Divider spacing="xxs" />

			<Column gap="xs">
				<span class="label">Sizes & Vertical Divider</span>
				<Row gap="sm">
					<Badge size="sm" variant="primary">sm</Badge>
					<Badge size="md" variant="primary">md</Badge>
					<Divider vertical spacing="xs" />
					<Badge size="sm" variant="secondary">
						<Sparkles size={12} />
						Icon
					</Badge>
				</Row>
			</Column>
		</Card>

		<Card gap="sm">
			<h2>Card</h2>
			<Grid minItemWidth="calc(var(--base) * 11)" gap="sm">
				<Card variant="primary" padding="md" gap="xs">
					<span class="mono">primary</span>
				</Card>
				<Card variant="elevated" padding="md" gap="xs">
					<span class="mono">elevated</span>
				</Card>
				<Card variant="secondary" padding="md" gap="xs">
					<span class="mono">secondary</span>
				</Card>
				<Card variant="outlined" padding="md" gap="xs">
					<span class="mono">outlined</span>
				</Card>
			</Grid>
		</Card>

		<Card gap="sm">
			<h2>Spinner</h2>
			<Row gap="sm">
				<Card variant="primary" padding="md" gap="sm" align="center">
					<Spinner size="sm" />
					<span class="mono">sm</span>
				</Card>
				<Card variant="primary" padding="md" gap="sm" align="center">
					<Spinner size="md" />
					<span class="mono">md</span>
				</Card>
				<Card variant="primary" padding="md" gap="sm" align="center">
					<Spinner size="lg" />
					<span class="mono">lg</span>
				</Card>
			</Row>
		</Card>

		<Card gap="sm">
			<h2>Icons</h2>
			<Grid gap="sm">
				{#each iconCatalog as icon (icon.name)}
					<Card variant="primary" padding="sm" gap="sm" align="center">
						<icon.component size={20} />
						<span class="mono">{icon.name}</span>
					</Card>
				{/each}
			</Grid>
		</Card>

		<Card gap="md">
			<h2>{i18n.t('image.title')}</h2>

			<!-- 1. Interactive Playground -->
			<Column gap="xs">
				<span class="label">{i18n.t('image.interactive_playground')}</span>
				<Row gap="md" align="center" wrap>
					<!-- Contained Interactive Preview -->
					<div style="width: 200px; height: 150px; flex-shrink: 0;">
						<Image
							src={currentImageSrc}
							alt={i18n.t('image.sample_alt')}
							fit={imageFit}
							radius={currentImageRadius}
							aspectRatio="4/3"
							fallback="SF"
							bordered
						>
							<User size={32} />
						</Image>
					</div>

					<!-- State & Controls -->
					<Column gap="xs">
						<Row gap="xs" wrap>
							<Button
								size="sm"
								variant={imageState === 'valid' ? 'primary' : 'secondary'}
								onclick={() => (imageState = 'valid')}
							>
								<Check size={14} />
								{i18n.t('image.state_success')}
							</Button>
							<Button
								size="sm"
								variant={imageState === 'error' ? 'danger' : 'secondary'}
								onclick={() => (imageState = 'error')}
							>
								<AlertCircle size={14} />
								{i18n.t('image.state_error')}
							</Button>
							<Button
								size="sm"
								variant={imageState === 'empty' ? 'primary' : 'secondary'}
								onclick={() => (imageState = 'empty')}
							>
								<Minus size={14} />
								{i18n.t('image.state_empty')}
							</Button>
						</Row>

						<Row gap="xs" wrap>
							<Button size="sm" variant="outline" onclick={toggleImageFit}>
								{imageFit === 'cover' ? i18n.t('image.fit_cover') : i18n.t('image.fit_contain')}
							</Button>
							<Button size="sm" variant="outline" onclick={cycleImageRadius}>
								{i18n.t('image.radius_cycle')}: {currentImageRadius}
							</Button>
						</Row>
					</Column>
				</Row>
			</Column>

			<Divider spacing="xxs" />

			<!-- 2. Aspect Ratios Grid (Controlled width, real image rendered) -->
			<Column gap="xs">
				<span class="label">{i18n.t('image.aspect_ratios')}</span>
				<Grid minItemWidth="calc(var(--base) * 7.5)" gap="sm">
					<Card variant="primary" padding="xs" gap="xs" align="center">
						<Image src={SAMPLE_IMAGE} alt={i18n.t('image.sample_alt')} aspectRatio="1/1" bordered />
						<span class="mono">1/1</span>
					</Card>
					<Card variant="primary" padding="xs" gap="xs" align="center">
						<Image src={SAMPLE_IMAGE} alt={i18n.t('image.sample_alt')} aspectRatio="4/3" bordered />
						<span class="mono">4/3</span>
					</Card>
					<Card variant="primary" padding="xs" gap="xs" align="center">
						<Image
							src={SAMPLE_IMAGE}
							alt={i18n.t('image.sample_alt')}
							aspectRatio="16/9"
							bordered
						/>
						<span class="mono">16/9</span>
					</Card>
					<Card variant="primary" padding="xs" gap="xs" align="center">
						<Image src={SAMPLE_IMAGE} alt={i18n.t('image.sample_alt')} aspectRatio="2/1" bordered />
						<span class="mono">2/1</span>
					</Card>
				</Grid>
			</Column>

			<Divider spacing="xxs" />

			<!-- 3. Sizes & Fallbacks -->
			<Column gap="xs">
				<span class="label">{i18n.t('image.sizes_and_fallbacks')}</span>
				<Row gap="sm" align="center" wrap>
					<!-- Real Image in sizes -->
					<Image size="sm" src={SAMPLE_AVATAR} alt={i18n.t('image.avatar_sample_alt')} bordered />
					<Image size="md" src={SAMPLE_AVATAR} alt={i18n.t('image.avatar_sample_alt')} bordered />
					<Image size="lg" src={SAMPLE_AVATAR} alt={i18n.t('image.avatar_sample_alt')} bordered />

					<Divider vertical spacing="xs" />

					<!-- Text Fallback (Initials) -->
					<Image size="md" fallback="SF" alt="Shellfish" bordered />

					<!-- Icon Fallback -->
					<Image size="md" alt={i18n.t('image.avatar_sample_alt')} bordered>
						<User size={18} />
					</Image>
				</Row>
			</Column>
		</Card>
	</Section>

	{#snippet bottom()}
		<Section contained padding="sm">
			<Row justify="between" fullWidth class="footer">
				<span>v{data.version}</span>
				<span>Monsan</span>
			</Row>
		</Section>
	{/snippet}
</AppShell>

<style>
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

	:global(.footer) {
		font-size: var(--text-xs);
		font-family: var(--font-mono);
		color: var(--text-muted);
	}

	h2 {
		margin: 0;
		font-size: var(--text-lg);
		font-weight: 700;
	}

	.label {
		font-size: var(--text-xs);
		font-family: var(--font-mono);
		color: var(--text-muted);
	}

	.mono {
		font-size: var(--text-xxs);
		font-family: var(--font-mono);
		color: var(--text-secondary);
	}
</style>
