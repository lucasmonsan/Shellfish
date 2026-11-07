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
		Popover,
		Modal,
		Drawer,
		Tooltip,
		FloatingBanner,
		FormField,
		Input,
		FormStack,
		Checkbox,
		Radio,
		RadioGroup,
		Switch,
		Select,
		Textarea,
		Tags,
		FileUpload,
		ColorPicker,
		DatePicker,
		TimePicker,
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
		Share,
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
		Zap,
		Construction,
		Lightbulb,
		Droplet,
		Bus,
		HeartPulse,
		PawPrint,
		Megaphone,
		MapPin,
		Mail,
		WhatsApp,
		Instagram,
		Facebook,
		Twitter,
		YouTube,
		Telegram,
		LinkedIn,
		GitHub,
		Google,
		MONSAN_PALETTE,
		SHELLFISH_THEME_TOKENS,
		Tabs,
		TabList,
		Tab,
		TabPanel,
		Table,
		TableHeader,
		TableBody,
		TableRow,
		TableCell,
		TableFooter,
		Progress,
		Skeleton,
		toast
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
		{ name: 'Share', component: Share },
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
		{ name: 'Zap', component: Zap },
		{ name: 'Construction', component: Construction },
		{ name: 'Lightbulb', component: Lightbulb },
		{ name: 'Droplet', component: Droplet },
		{ name: 'Bus', component: Bus },
		{ name: 'HeartPulse', component: HeartPulse },
		{ name: 'PawPrint', component: PawPrint },
		{ name: 'Megaphone', component: Megaphone },
		{ name: 'MapPin', component: MapPin },
		{ name: 'Mail', component: Mail },
		{ name: 'WhatsApp', component: WhatsApp },
		{ name: 'Instagram', component: Instagram },
		{ name: 'Facebook', component: Facebook },
		{ name: 'Twitter', component: Twitter },
		{ name: 'YouTube', component: YouTube },
		{ name: 'Telegram', component: Telegram },
		{ name: 'LinkedIn', component: LinkedIn },
		{ name: 'GitHub', component: GitHub },
		{ name: 'Google', component: Google }
	];

	const SAMPLE_IMAGE =
		'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" width="400" height="200"><defs><linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="%231e3a8a"/><stop offset="100%" stop-color="%2338bdf8"/></linearGradient></defs><rect width="100%" height="100%" fill="url(%23skyGrad)"/><polygon points="30,170 35,40 45,40 50,170" fill="%23f8fafc"/><rect x="34" y="60" width="12" height="15" fill="%23dc2626"/><rect x="32" y="105" width="16" height="18" fill="%23dc2626"/><rect x="30" y="145" width="20" height="20" fill="%23dc2626"/><polygon points="32,40 40,25 48,40" fill="%231e293b"/><circle cx="40" cy="35" r="5" fill="%23fef08a"/><circle cx="200" cy="70" r="32" fill="%23fbbf24"/><polygon points="100,180 180,90 260,180" fill="%23047857"/><polygon points="160,180 230,110 300,180" fill="%23065f46"/><polygon points="330,170 380,170 370,185 340,185" fill="%2378350f"/><polygon points="355,165 355,120 375,165" fill="%23f8fafc"/><polygon points="352,165 352,130 335,165" fill="%23ea580c"/><rect x="0" y="175" width="100%" height="25" fill="%230f172a"/><path d="M10 185 L80 185 M120 190 L260 190 M300 185 L390 185" stroke="%23bae6fd" stroke-width="2" stroke-linecap="round"/></svg>';

	const SAMPLE_AVATAR =
		'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><rect width="100%" height="100%" fill="%230284c7"/><circle cx="50" cy="38" r="22" fill="%23fed7aa"/><path d="M28 32 Q50 16 72 32 Q50 24 28 32 Z" fill="%237c2d12"/><path d="M20 95 C20 70 34 62 50 62 C66 62 80 70 80 95 Z" fill="%23ea580c"/></svg>';

	let imageState = $state<'valid' | 'error' | 'empty'>('valid');
	let imageFit = $state<'cover' | 'contain'>('cover');
	let imageRadiusIndex = $state(0); // 0 = 'xs' (canonical square)
	const radiusOptions = ['xs', 'none', 'sm'] as const;
	let currentImageRadius = $derived(radiusOptions[imageRadiusIndex]);

	let currentImageSrc = $derived.by(() => {
		if (imageState === 'valid') return SAMPLE_IMAGE;
		if (imageState === 'error') return 'data:image/svg+xml;utf8,<broken-svg-data';
		return null;
	});

	function cycleImageRadius() {
		imageRadiusIndex = (imageRadiusIndex + 1) % radiusOptions.length;
	}

	function toggleImageFit() {
		imageFit = imageFit === 'cover' ? 'contain' : 'cover';
	}

	let searchQuery = $state('');
	let showPassword = $state(false);
	let passwordValue = $state('');
	let formName = $state('');
	let formEmail = $state('');
	let formSubmitted = $state(false);
	let chkRemember = $state(false);
	let chkIndeterminate = $state(true);
	let selectedPlan = $state('pro');
	let switchEmail = $state(true);
	let switchDark = $state(false);
	let selectedCountry = $state('br');
	let bioText = $state('');
	let demoTags = $state(['Monsan', 'Shellfish', 'Svelte5']);
	let demoFiles = $state<File[]>([]);
	let demoColor = $state('#b94b38');
	let demoDate = $state('2026-10-17');
	let demoTime = $state('14:30');
	let demoTab = $state('extrato');
	let demoProgress = $state(68);
	let demoModalOpen = $state(false);
	let demoDrawerOpen = $state(false);
	let demoBannerOpen = $state(false);
	let demoBannerWidth = $state<'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');
	let demoMaxWidth = $state<'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');
	const maxWidthPresets = ['sm', 'md', 'lg', 'xl', 'full'] as const;
	let activeThemeTokens = $derived(SHELLFISH_THEME_TOKENS[currentTheme]);
	let demoModalOption = $state('opt1');

	async function handleFormSubmit() {
		await new Promise((resolve) => setTimeout(resolve, 600));
		formSubmitted = true;
	}
</script>

<svelte:head>
	<title>{i18n.t('document.title')}</title>
</svelte:head>

<AppShell>
	{#snippet top()}
		<Section contained padding="sm">
			<Row justify="between" fullWidth>
				<Row gap="xs" align="center">
					<span class="brand-icon" aria-hidden="true"></span>
					<h1 class="brand-name">{i18n.t('brand.name')}</h1>
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
			<h2>{i18n.t('catalog.button_title')}</h2>

			<Column gap="xs">
				<span class="label">{i18n.t('catalog.variants')}</span>
				<Row gap="sm">
					<Button variant="primary">
						<Check size={16} />
						{i18n.t('variants.primary')}
					</Button>
					<Button variant="secondary">
						<Settings size={16} />
						{i18n.t('variants.secondary')}
					</Button>
					<Button variant="danger">
						<Trash size={16} />
						{i18n.t('variants.danger')}
					</Button>
					<Button variant="warning">
						<AlertCircle size={16} />
						{i18n.t('variants.warning')}
					</Button>
					<Button variant="success">
						<CheckCircle size={16} />
						{i18n.t('variants.success')}
					</Button>
					<Button variant="outline">
						<Search size={16} />
						{i18n.t('variants.outline')}
					</Button>
					<Button variant="ghost">
						<Copy size={16} />
						{i18n.t('variants.ghost')}
					</Button>
					<Button variant="primary" disabled>{i18n.t('common.disabled')}</Button>
				</Row>
			</Column>

			<Divider spacing="xxs" />

			<Column gap="xs">
				<span class="label">{i18n.t('catalog.sizes')}</span>
				<Row gap="sm">
					<Button size="sm" variant="secondary">
						<Plus size={14} />
						{i18n.t('catalog.size_sm')}
					</Button>
					<Button size="md" variant="secondary">
						<Plus size={16} />
						{i18n.t('catalog.size_md')}
					</Button>
					<Button size="lg" variant="secondary">
						<Plus size={18} />
						{i18n.t('catalog.size_lg')}
					</Button>
				</Row>
			</Column>

			<Divider spacing="xxs" />

			<Column gap="xs">
				<span class="label">{i18n.t('catalog.loading_icon_button')}</span>
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
						{i18n.t('common.loading')}
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
			<h2>{i18n.t('catalog.badge_divider_title')}</h2>

			<Column gap="xs">
				<span class="label">{i18n.t('catalog.variants')}</span>
				<Row gap="sm">
					<Badge variant="primary">{i18n.t('variants.primary')}</Badge>
					<Badge variant="secondary">{i18n.t('variants.secondary')}</Badge>
					<Badge variant="danger">{i18n.t('variants.danger')}</Badge>
					<Badge variant="warning">{i18n.t('variants.warning')}</Badge>
					<Badge variant="success">{i18n.t('variants.success')}</Badge>
					<Badge variant="outline">{i18n.t('variants.outline')}</Badge>
					<Badge variant="ghost">{i18n.t('variants.ghost')}</Badge>
				</Row>
			</Column>

			<Divider spacing="xxs" />

			<Column gap="xs">
				<span class="label">{i18n.t('catalog.sizes_vertical_divider')}</span>
				<Row gap="sm">
					<Badge size="sm" variant="primary">{i18n.t('catalog.size_sm')}</Badge>
					<Badge size="md" variant="primary">{i18n.t('catalog.size_md')}</Badge>
					<Divider vertical spacing="xs" />
					<Badge size="sm" variant="secondary">
						<Sparkles size={12} />
						{i18n.t('catalog.icon')}
					</Badge>
				</Row>
			</Column>
		</Card>

		<Card gap="sm">
			<h2>{i18n.t('palette.title')}</h2>

			<Grid minItemWidth="calc(var(--base) * 11)" gap="sm">
				{#each MONSAN_PALETTE as color (color.id)}
					{@const familyTokens = activeThemeTokens[color.id]}
					<div
						class="palette-card"
						style:--palette-swatch={`var(--palette-${color.id})`}
						style:--palette-subtle={`var(--palette-${color.id}-subtle)`}
						style:--palette-border={`var(--palette-${color.id}-border)`}
						style:--palette-text={`var(--palette-${color.id}-text)`}
						style:--palette-on-solid={`var(--palette-${color.id}-on-solid)`}
					>
						<div class="palette-swatches">
							<div
								class="palette-swatch-box solid"
								title={i18n.t('palette.swatch_preview', { name: i18n.t(color.nameKey) })}
							>
								<span class="swatch-hex mono">{familyTokens.base.toUpperCase()}</span>
							</div>
							<div
								class="palette-swatch-box subtle"
								title={i18n.t('palette.swatch_preview', { name: i18n.t(color.nameKey) })}
							>
								<span class="swatch-hex mono">{familyTokens.subtle.toUpperCase()}</span>
							</div>
						</div>
						<div class="palette-meta">
							<span class="palette-name">{i18n.t(color.nameKey)}</span>
						</div>
					</div>
				{/each}
			</Grid>

			<Divider spacing="xxs" />

			<Column gap="xs">
				<span class="label">{i18n.t('palette.theme_tokens_title')}</span>
				<Row gap="xs" wrap>
					<Badge size="sm" variant="secondary">{`bgPrimary: ${activeThemeTokens.bgPrimary}`}</Badge>
					<Badge size="sm" variant="secondary"
						>{`bgSecondary: ${activeThemeTokens.bgSecondary}`}</Badge
					>
					<Badge size="sm" variant="secondary"
						>{`bgElevated: ${activeThemeTokens.bgElevated}`}</Badge
					>
					<Badge size="sm" variant="secondary"
						>{`textPrimary: ${activeThemeTokens.textPrimary}`}</Badge
					>
					<Badge size="sm" variant="secondary"
						>{`textSecondary: ${activeThemeTokens.textSecondary}`}</Badge
					>
					<Badge size="sm" variant="secondary">{`textMuted: ${activeThemeTokens.textMuted}`}</Badge>
				</Row>
			</Column>
		</Card>

		<Card gap="sm">
			<h2>{i18n.t('catalog.card_title')}</h2>
			<Grid minItemWidth="calc(var(--base) * 11)" gap="sm">
				<Card variant="primary" padding="md" gap="xs">
					<span class="mono">{i18n.t('card.primary')}</span>
				</Card>
				<Card variant="elevated" padding="md" gap="xs">
					<span class="mono">{i18n.t('card.elevated')}</span>
				</Card>
				<Card variant="secondary" padding="md" gap="xs">
					<span class="mono">{i18n.t('card.secondary')}</span>
				</Card>
				<Card variant="outlined" padding="md" gap="xs">
					<span class="mono">{i18n.t('card.outlined')}</span>
				</Card>
			</Grid>

			<Divider spacing="xxs" />

			<Column gap="xs">
				<span class="label">{i18n.t('catalog.maxwidth_title')}</span>
				<Row gap="xs" wrap>
					{#each maxWidthPresets as preset (preset)}
						<Button
							size="sm"
							variant={demoMaxWidth === preset ? 'primary' : 'secondary'}
							onclick={() => (demoMaxWidth = preset)}
						>
							{preset}
						</Button>
					{/each}
				</Row>
				<Column maxWidth={demoMaxWidth}>
					<Card variant="secondary" padding="sm" align="center">
						<span class="mono">{`maxWidth="${demoMaxWidth}"`}</span>
					</Card>
				</Column>
			</Column>
		</Card>

		<Card gap="sm">
			<h2>{i18n.t('catalog.spinner_title')}</h2>
			<Row gap="sm">
				<Card variant="primary" padding="md" gap="sm" align="center">
					<Spinner size="sm" />
					<span class="mono">{i18n.t('catalog.size_sm')}</span>
				</Card>
				<Card variant="primary" padding="md" gap="sm" align="center">
					<Spinner size="md" />
					<span class="mono">{i18n.t('catalog.size_md')}</span>
				</Card>
				<Card variant="primary" padding="md" gap="sm" align="center">
					<Spinner size="lg" />
					<span class="mono">{i18n.t('catalog.size_lg')}</span>
				</Card>
			</Row>
		</Card>

		<Card gap="sm">
			<h2>{i18n.t('catalog.icons_title')}</h2>
			<Grid gap="sm">
				{#each iconCatalog as icon (icon.name)}
					<Card variant="primary" padding="sm" gap="sm" align="center">
						<icon.component size={20} />
						<span class="mono">{icon.name}</span>
					</Card>
				{/each}
			</Grid>
		</Card>

		<Card gap="sm">
			<h2>{i18n.t('catalog.tabs_title')}</h2>
			<Tabs bind:value={demoTab}>
				<TabList label={i18n.t('catalog.tabs_title')}>
					<Tab value="extrato">{i18n.t('catalog.tabs_sample_extrato')}</Tab>
					<Tab value="graficos">{i18n.t('catalog.tabs_sample_graficos')}</Tab>
					<Tab value="metas">{i18n.t('catalog.tabs_sample_metas')}</Tab>
				</TabList>

				<TabPanel value="extrato">
					<Table fullWidth striped hoverable>
						<TableHeader>
							<TableRow>
								<TableCell asHead>{i18n.t('catalog.table_col_date')}</TableCell>
								<TableCell asHead>{i18n.t('catalog.table_col_desc')}</TableCell>
								<TableCell asHead>{i18n.t('catalog.table_col_category')}</TableCell>
								<TableCell asHead align="numeric">{i18n.t('catalog.table_col_amount')}</TableCell>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell>2026-10-21</TableCell>
								<TableCell>{i18n.t('catalog.sample_tx_1')}</TableCell>
								<TableCell>{i18n.t('catalog.sample_cat_1')}</TableCell>
								<TableCell align="numeric">{i18n.t('catalog.sample_amt_1')}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>2026-10-20</TableCell>
								<TableCell>{i18n.t('catalog.sample_tx_2')}</TableCell>
								<TableCell>{i18n.t('catalog.sample_cat_2')}</TableCell>
								<TableCell align="numeric">{i18n.t('catalog.sample_amt_2')}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TabPanel>
				<TabPanel value="graficos">
					<Column gap="sm">
						<Row justify="between" fullWidth>
							<span class="mono">{i18n.t('catalog.tabs_sample_graficos')}</span>
							<span class="mono">75%</span>
						</Row>
						<Progress value={75} variant="emerald" />
					</Column>
				</TabPanel>
				<TabPanel value="metas">
					<Column gap="sm">
						<Row justify="between" fullWidth>
							<span class="mono">{i18n.t('catalog.tabs_sample_metas')}</span>
							<span class="mono">42%</span>
						</Row>
						<Progress value={42} variant="cobalt" />
					</Column>
				</TabPanel>
			</Tabs>
		</Card>

		<Card gap="sm">
			<h2>{i18n.t('catalog.table_title')}</h2>
			<Table fullWidth striped hoverable>
				<TableHeader>
					<TableRow>
						<TableCell asHead>{i18n.t('catalog.table_col_date')}</TableCell>
						<TableCell asHead>{i18n.t('catalog.table_col_desc')}</TableCell>
						<TableCell asHead>{i18n.t('catalog.table_col_category')}</TableCell>
						<TableCell asHead align="numeric">{i18n.t('catalog.table_col_amount')}</TableCell>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>2026-10-21</TableCell>
						<TableCell>{i18n.t('catalog.sample_tx_1')}</TableCell>
						<TableCell>{i18n.t('catalog.sample_cat_1')}</TableCell>
						<TableCell align="numeric">{i18n.t('catalog.sample_amt_1')}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>2026-10-20</TableCell>
						<TableCell>{i18n.t('catalog.sample_tx_2')}</TableCell>
						<TableCell>{i18n.t('catalog.sample_cat_2')}</TableCell>
						<TableCell align="numeric">{i18n.t('catalog.sample_amt_2')}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>2026-10-19</TableCell>
						<TableCell>{i18n.t('catalog.sample_tx_3')}</TableCell>
						<TableCell>{i18n.t('catalog.sample_cat_3')}</TableCell>
						<TableCell align="numeric">{i18n.t('catalog.sample_amt_3')}</TableCell>
					</TableRow>
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colspan={3}>{i18n.t('common.total')}</TableCell>
						<TableCell align="numeric">{i18n.t('catalog.sample_amt_total')}</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</Card>

		<Card gap="sm">
			<h2>{i18n.t('catalog.progress_title')}</h2>
			<Column gap="sm">
				<Progress value={demoProgress} showValue variant="emerald" />
				<Progress value={40} showValue variant="amber" size="sm" />
				<Progress value={85} showValue variant="danger" size="lg" />
			</Column>
		</Card>

		<Card gap="sm">
			<h2>{i18n.t('catalog.skeleton_title')}</h2>
			<Row gap="sm" align="center">
				<Skeleton variant="circle" />
				<Column gap="xs" style="flex: 1;">
					<Skeleton variant="text" width="60%" />
					<Skeleton variant="text" width="90%" />
				</Column>
			</Row>
		</Card>

		<Card gap="sm">
			<h2>{i18n.t('catalog.toast_title')}</h2>
			<Row gap="sm">
				<Button
					variant="success"
					size="sm"
					onclick={() => toast.success(i18n.t('catalog.toast_msg_success'))}
				>
					{i18n.t('catalog.toast_btn_success')}
				</Button>
				<Button
					variant="danger"
					size="sm"
					onclick={() => toast.error(i18n.t('catalog.toast_msg_error'))}
				>
					{i18n.t('catalog.toast_btn_error')}
				</Button>
				<Button
					variant="warning"
					size="sm"
					onclick={() => toast.warning(i18n.t('catalog.toast_msg_warning'))}
				>
					{i18n.t('catalog.toast_btn_warning')}
				</Button>
				<Button
					variant="secondary"
					size="sm"
					onclick={() => toast.info(i18n.t('catalog.toast_msg_info'))}
				>
					{i18n.t('catalog.toast_btn_info')}
				</Button>
			</Row>
		</Card>

		<Card gap="sm">
			<h2>{i18n.t('image.title')}</h2>

			<!-- 1. Interactive States -->
			<Column gap="xs">
				<span class="label">{i18n.t('image.interactive_playground')}</span>
				<Row gap="md" align="center" wrap>
					<!-- Contained Interactive Preview (Square 180x180 to contrast with 2:1 image) -->
					<div style="width: 180px; height: 180px; flex-shrink: 0;">
						<Image
							src={currentImageSrc}
							alt={i18n.t('image.sample_alt')}
							fit={imageFit}
							radius={currentImageRadius}
							aspectRatio="1/1"
							bordered
						>
							{#if imageState === 'error'}
								<div
									style="display: flex; flex-direction: column; align-items: center; gap: var(--space-xxs); color: var(--color-danger); text-align: center;"
								>
									<AlertCircle size={28} />
									<span style="font-size: var(--text-xs); font-weight: 600;">
										{i18n.t('image.load_error')}
									</span>
								</div>
							{:else}
								<div
									style="display: flex; flex-direction: column; align-items: center; gap: var(--space-xxs); color: var(--text-secondary); text-align: center;"
								>
									<FileText size={28} />
									<span style="font-size: var(--text-xs); font-weight: 600;">
										{i18n.t('image.no_image')}
									</span>
								</div>
							{/if}
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

		<Card gap="sm">
			<h2>{i18n.t('popover.title')}</h2>

			<!-- 1. Interactive Profile Menu Composition (Canonical LEGO) -->
			<Column gap="xs">
				<span class="label">{i18n.t('popover.interactive_profile')}</span>
				<Row gap="sm" align="center">
					<Popover
						align="start"
						placement="bottom"
						ariaLabel={i18n.t('popover.interactive_profile')}
					>
						{#snippet trigger(toggle, open, ariaProps)}
							<Button variant="secondary" size="md" onclick={toggle} {...ariaProps}>
								<Image size="sm" src={SAMPLE_AVATAR} alt="" bordered />
								<span>{i18n.t('demo.user_name')}</span>
								{#if open}<ChevronUp size={14} />{:else}<ChevronDown size={14} />{/if}
							</Button>
						{/snippet}
						{#snippet children(close)}
							<Card
								variant="primary"
								padding="sm"
								gap="xs"
								style="min-width: 220px; box-shadow: var(--shadow-md);"
							>
								<Row gap="xs" align="center">
									<Image size="md" src={SAMPLE_AVATAR} alt="" bordered />
									<Column gap="none">
										<strong style="font-size: var(--text-sm);">{i18n.t('demo.user_name')}</strong>
										<span class="mono">{i18n.t('popover.profile_role')}</span>
									</Column>
								</Row>
								<Divider spacing="xxs" />
								<Button
									variant="ghost"
									size="sm"
									block
									style="justify-content: flex-start;"
									onclick={close}
								>
									<User size={14} />
									<span>{i18n.t('popover.profile_account')}</span>
								</Button>
								<Button
									variant="ghost"
									size="sm"
									block
									style="justify-content: flex-start;"
									onclick={close}
								>
									<Settings size={14} />
									<span>{i18n.t('popover.profile_settings')}</span>
								</Button>
								<Divider spacing="xxs" />
								<Button
									variant="danger"
									size="sm"
									block
									style="justify-content: flex-start;"
									onclick={close}
								>
									<LogOut size={14} />
									<span>{i18n.t('popover.profile_logout')}</span>
								</Button>
							</Card>
						{/snippet}
					</Popover>
				</Row>
			</Column>

			<Divider spacing="xxs" />

			<!-- 2. Alignments (start, center, end) -->
			<Column gap="xs">
				<span class="label">{i18n.t('popover.alignments')}</span>
				<Row gap="sm" wrap>
					<Popover align="start" ariaLabel={i18n.t('popover.align_start')}>
						{#snippet trigger(toggle, open, ariaProps)}
							<Button variant="outline" size="sm" onclick={toggle} {...ariaProps}>
								{i18n.t('popover.align_start')}
								{#if open}<ChevronUp size={12} />{:else}<ChevronDown size={12} />{/if}
							</Button>
						{/snippet}
						{#snippet children(close)}
							<Card
								variant="primary"
								padding="sm"
								gap="xs"
								style="min-width: 200px; box-shadow: var(--shadow-md);"
							>
								<strong style="font-size: var(--text-xs);">{i18n.t('popover.align_start')}</strong>
								<p class="mono" style="margin: 0;">{i18n.t('popover.panel_sample_desc')}</p>
								<Button variant="secondary" size="sm" onclick={close}
									>{i18n.t('common.close')}</Button
								>
							</Card>
						{/snippet}
					</Popover>

					<Popover align="center" ariaLabel={i18n.t('popover.align_center')}>
						{#snippet trigger(toggle, open, ariaProps)}
							<Button variant="outline" size="sm" onclick={toggle} {...ariaProps}>
								{i18n.t('popover.align_center')}
								{#if open}<ChevronUp size={12} />{:else}<ChevronDown size={12} />{/if}
							</Button>
						{/snippet}
						{#snippet children(close)}
							<Card
								variant="primary"
								padding="sm"
								gap="xs"
								style="min-width: 200px; box-shadow: var(--shadow-md);"
							>
								<strong style="font-size: var(--text-xs);">{i18n.t('popover.align_center')}</strong>
								<p class="mono" style="margin: 0;">{i18n.t('popover.panel_sample_desc')}</p>
								<Button variant="secondary" size="sm" onclick={close}
									>{i18n.t('common.close')}</Button
								>
							</Card>
						{/snippet}
					</Popover>

					<Popover align="end" ariaLabel={i18n.t('popover.align_end')}>
						{#snippet trigger(toggle, open, ariaProps)}
							<Button variant="outline" size="sm" onclick={toggle} {...ariaProps}>
								{i18n.t('popover.align_end')}
								{#if open}<ChevronUp size={12} />{:else}<ChevronDown size={12} />{/if}
							</Button>
						{/snippet}
						{#snippet children(close)}
							<Card
								variant="primary"
								padding="sm"
								gap="xs"
								style="min-width: 200px; box-shadow: var(--shadow-md);"
							>
								<strong style="font-size: var(--text-xs);">{i18n.t('popover.align_end')}</strong>
								<p class="mono" style="margin: 0;">{i18n.t('popover.panel_sample_desc')}</p>
								<Button variant="secondary" size="sm" onclick={close}
									>{i18n.t('common.close')}</Button
								>
							</Card>
						{/snippet}
					</Popover>
				</Row>
			</Column>

			<Divider spacing="xxs" />

			<!-- 3. Placements (auto, top, bottom) -->
			<Column gap="xs">
				<span class="label">{i18n.t('popover.placements')}</span>
				<Row gap="sm" wrap>
					<Popover placement="auto" ariaLabel={i18n.t('popover.placement_auto')}>
						{#snippet trigger(toggle, open, ariaProps)}
							<Button variant="secondary" size="sm" onclick={toggle} {...ariaProps}>
								{i18n.t('popover.placement_auto')}
								{#if open}<ChevronUp size={12} />{:else}<ChevronDown size={12} />{/if}
							</Button>
						{/snippet}
						{#snippet children(close)}
							<Card
								variant="primary"
								padding="sm"
								gap="xs"
								style="min-width: 200px; box-shadow: var(--shadow-md);"
							>
								<strong style="font-size: var(--text-xs);"
									>{i18n.t('popover.placement_auto')}</strong
								>
								<p class="mono" style="margin: 0;">{i18n.t('popover.panel_sample_desc')}</p>
								<Button variant="secondary" size="sm" onclick={close}
									>{i18n.t('common.close')}</Button
								>
							</Card>
						{/snippet}
					</Popover>

					<Popover placement="top" ariaLabel={i18n.t('popover.placement_top')}>
						{#snippet trigger(toggle, open, ariaProps)}
							<Button variant="secondary" size="sm" onclick={toggle} {...ariaProps}>
								{i18n.t('popover.placement_top')}
								{#if open}<ChevronUp size={12} />{:else}<ChevronDown size={12} />{/if}
							</Button>
						{/snippet}
						{#snippet children(close)}
							<Card
								variant="primary"
								padding="sm"
								gap="xs"
								style="min-width: 200px; box-shadow: var(--shadow-md);"
							>
								<strong style="font-size: var(--text-xs);">{i18n.t('popover.placement_top')}</strong
								>
								<p class="mono" style="margin: 0;">{i18n.t('popover.panel_sample_desc')}</p>
								<Button variant="secondary" size="sm" onclick={close}
									>{i18n.t('common.close')}</Button
								>
							</Card>
						{/snippet}
					</Popover>

					<Popover placement="bottom" ariaLabel={i18n.t('popover.placement_bottom')}>
						{#snippet trigger(toggle, open, ariaProps)}
							<Button variant="secondary" size="sm" onclick={toggle} {...ariaProps}>
								{i18n.t('popover.placement_bottom')}
								{#if open}<ChevronUp size={12} />{:else}<ChevronDown size={12} />{/if}
							</Button>
						{/snippet}
						{#snippet children(close)}
							<Card
								variant="primary"
								padding="sm"
								gap="xs"
								style="min-width: 200px; box-shadow: var(--shadow-md);"
							>
								<strong style="font-size: var(--text-xs);"
									>{i18n.t('popover.placement_bottom')}</strong
								>
								<p class="mono" style="margin: 0;">{i18n.t('popover.panel_sample_desc')}</p>
								<Button variant="secondary" size="sm" onclick={close}
									>{i18n.t('common.close')}</Button
								>
							</Card>
						{/snippet}
					</Popover>
				</Row>
			</Column>
		</Card>

		<Card gap="sm">
			<h2>{i18n.t('modal.title')}</h2>

			<Column gap="xs">
				<span class="label">{i18n.t('modal.title')}</span>
				<Row gap="sm" align="center">
					<Button variant="primary" onclick={() => (demoModalOpen = true)}>
						{i18n.t('modal.open_button')}
					</Button>

					<Modal bind:open={demoModalOpen} title={i18n.t('modal.sample_title')}>
						<Column gap="md">
							<p style="margin: 0;">{i18n.t('modal.sample_desc')}</p>
							<FormField forId="demo-modal-select" label={i18n.t('forms.select_label')}>
								<Select
									id="demo-modal-select"
									bind:value={demoModalOption}
									options={[
										{ value: 'opt1', label: 'Opção 1' },
										{ value: 'opt2', label: 'Opção 2' },
										{ value: 'opt3', label: 'Opção 3' }
									]}
									placeholder={i18n.t('forms.select_placeholder')}
								/>
							</FormField>
						</Column>
						{#snippet footer(close)}
							<Button variant="danger" onclick={close}>{i18n.t('common.cancel')}</Button>
							<Button variant="primary" onclick={close}>{i18n.t('common.confirm')}</Button>
						{/snippet}
					</Modal>
				</Row>
			</Column>

			<Column gap="xs">
				<span class="label">{i18n.t('drawer.title')}</span>
				<Row gap="sm" align="center">
					<Button variant="secondary" onclick={() => (demoDrawerOpen = true)}>
						{i18n.t('drawer.open_button')}
					</Button>

					<Drawer bind:open={demoDrawerOpen} title={i18n.t('drawer.title')}>
						<Column gap="md">
							<p style="margin: 0;">{i18n.t('drawer.sample_desc')}</p>
						</Column>
						{#snippet footer(close)}
							<Button variant="danger" onclick={close}>{i18n.t('common.close')}</Button>
						{/snippet}
					</Drawer>
				</Row>
			</Column>

			<Column gap="xs">
				<span class="label">{i18n.t('tooltip.title')}</span>
				<Row gap="sm" align="center">
					<Tooltip text={i18n.t('tooltip.sample_text')}>
						{#snippet trigger(describedBy)}
							<Button variant="outline" aria-describedby={describedBy}>
								{i18n.t('tooltip.sample_button')}
							</Button>
						{/snippet}
					</Tooltip>
				</Row>
			</Column>

			<Divider spacing="xxs" />

			<Column gap="xs">
				<span class="label">{i18n.t('banner.title')}</span>
				<Row gap="sm" align="center" wrap>
					<Button
						variant={demoBannerOpen ? 'primary' : 'secondary'}
						onclick={() => (demoBannerOpen = !demoBannerOpen)}
					>
						<Share size={16} />
						{i18n.t('banner.toggle_button')}
					</Button>

					{#each maxWidthPresets as preset (preset)}
						<Button
							size="sm"
							variant={demoBannerWidth === preset ? 'primary' : 'outline'}
							onclick={() => {
								demoBannerWidth = preset;
								demoBannerOpen = true;
							}}
						>
							{preset}
						</Button>
					{/each}
				</Row>
			</Column>
		</Card>

		<Card gap="sm">
			<h2>{i18n.t('forms.title')}</h2>

			<!-- 1. Tamanhos e Estados (Input Atômico Puro) -->
			<Column gap="xs">
				<Grid minItemWidth={220} gap="sm" style="align-items: center;">
					<Input
						size="sm"
						placeholder={i18n.t('forms.size_sm')}
						aria-label={i18n.t('forms.size_sm')}
					/>
					<Input
						size="md"
						placeholder={i18n.t('forms.size_md')}
						aria-label={i18n.t('forms.size_md')}
					/>
					<Input
						size="lg"
						placeholder={i18n.t('forms.size_lg')}
						aria-label={i18n.t('forms.size_lg')}
					/>
				</Grid>

				<Grid minItemWidth={220} gap="sm">
					<!-- Busca com Ícone e Limpeza -->
					<Input
						bind:value={searchQuery}
						placeholder={i18n.t('forms.search_placeholder')}
						aria-label={i18n.t('forms.search')}
					>
						{#snippet before()}
							<Search size={16} />
						{/snippet}
						{#snippet after()}
							{#if searchQuery.length > 0}
								<IconButton
									size="sm"
									variant="ghost"
									label={i18n.t('forms.clear')}
									onclick={() => (searchQuery = '')}
								>
									<X size={14} />
								</IconButton>
							{/if}
						{/snippet}
					</Input>

					<!-- Senha com Alternador de Visibilidade -->
					<Input
						type={showPassword ? 'text' : 'password'}
						bind:value={passwordValue}
						placeholder={i18n.t('forms.password_placeholder')}
						aria-label={i18n.t('forms.password')}
					>
						{#snippet before()}
							<Lock size={16} />
						{/snippet}
						{#snippet after()}
							<IconButton
								size="sm"
								variant="ghost"
								label={showPassword ? i18n.t('forms.hide_password') : i18n.t('forms.show_password')}
								onclick={() => (showPassword = !showPassword)}
							>
								{#if showPassword}<EyeOff size={14} />{:else}<Eye size={14} />{/if}
							</IconButton>
						{/snippet}
					</Input>

					<!-- Prefixo de Moeda -->
					<Input type="text" placeholder="0,00" aria-label={i18n.t('forms.price')}>
						{#snippet before()}
							<span class="mono" style="font-weight: 700;">{i18n.t('forms.currency_symbol')}</span>
						{/snippet}
					</Input>
				</Grid>

				<Grid minItemWidth={220} gap="sm">
					<Input
						disabled
						placeholder={i18n.t('forms.disabled')}
						aria-label={i18n.t('forms.disabled')}
					/>
					<Input
						readonly
						placeholder={i18n.t('forms.readonly')}
						aria-label={i18n.t('forms.readonly')}
					/>
				</Grid>
			</Column>

			<Divider spacing="xxs" />

			<!-- 2. Validação Semântica (FormField) -->
			<Column gap="xs">
				<span class="label">{i18n.t('forms.validation')}</span>
				<Grid minItemWidth={260} gap="sm">
					<FormField
						label={i18n.t('forms.email')}
						forId="demo-email-helper"
						helper={i18n.t('forms.email_helper')}
						required
					>
						{#snippet control(ctx)}
							<Input
								id={ctx.id}
								type="email"
								placeholder={i18n.t('forms.email_placeholder')}
								aria-describedby={ctx.describedby}
								required={ctx.required}
							/>
						{/snippet}
					</FormField>

					<FormField
						label={i18n.t('forms.error_label')}
						forId="demo-input-invalid"
						error={i18n.t('forms.error_message')}
					>
						{#snippet control(ctx)}
							<Input id={ctx.id} aria-describedby={ctx.describedby} invalid={ctx.invalid} />
						{/snippet}
					</FormField>
				</Grid>
			</Column>

			<Divider spacing="xxs" />

			<!-- 3. Formulário (FormStack) -->
			<Column gap="xs">
				<span class="label">{i18n.t('forms.form')}</span>
				<Card variant="primary" padding="sm" gap="xs">
					<FormStack gap="sm" onsubmit={handleFormSubmit}>
						<Grid minItemWidth={240} gap="sm">
							<FormField label={i18n.t('forms.name')} forId="formstack-name" required>
								{#snippet control(ctx)}
									<Input
										id={ctx.id}
										bind:value={formName}
										placeholder={i18n.t('forms.name_placeholder')}
										aria-describedby={ctx.describedby}
										required={ctx.required}
									/>
								{/snippet}
							</FormField>

							<FormField label={i18n.t('forms.email')} forId="formstack-email" required>
								{#snippet control(ctx)}
									<Input
										id={ctx.id}
										type="email"
										bind:value={formEmail}
										placeholder={i18n.t('forms.email_placeholder')}
										aria-describedby={ctx.describedby}
										required={ctx.required}
									/>
								{/snippet}
							</FormField>
						</Grid>

						<Row justify="between" align="center">
							<Button type="submit" variant="primary" size="md">
								{i18n.t('forms.submit')}
							</Button>
							{#if formSubmitted}
								<Row gap="xs" align="center" style="color: var(--color-success);">
									<CheckCircle size={16} />
									<span class="mono">{i18n.t('forms.submitted')}</span>
								</Row>
							{/if}
						</Row>
					</FormStack>
				</Card>
			</Column>

			<Divider spacing="xxs" />

			<!-- 4. Controles de Seleção (Checkbox, Radio, Switch) -->
			<Column gap="xs">
				<span class="label">{i18n.t('forms.selection_title')}</span>
				<Grid minItemWidth={240} gap="md">
					<!-- Checkboxes -->
					<Column gap="xs">
						<Checkbox bind:checked={chkRemember} label={i18n.t('forms.checkbox_label')} />
						<Checkbox
							bind:indeterminate={chkIndeterminate}
							label={i18n.t('forms.checkbox_indeterminate')}
						/>
						<Checkbox checked disabled label={i18n.t('forms.disabled')} />
					</Column>

					<!-- RadioGroup -->
					<RadioGroup name="plan" bind:value={selectedPlan} gap="xs">
						<Radio value="free" label={i18n.t('forms.radio_plan_free')} />
						<Radio value="pro" label={i18n.t('forms.radio_plan_pro')} />
						<Radio value="enterprise" label={i18n.t('forms.radio_plan_enterprise')} disabled />
					</RadioGroup>

					<!-- Switches -->
					<Column gap="xs">
						<Switch bind:checked={switchEmail} label={i18n.t('forms.switch_notifications')} />
						<Switch bind:checked={switchDark} label={i18n.t('forms.switch_dark_mode')} />
						<Switch checked disabled label={i18n.t('forms.disabled')} />
					</Column>
				</Grid>
			</Column>

			<Divider spacing="xxs" />

			<!-- 5. Seletores e Texto Multilinha (Select, Textarea) -->
			<Column gap="xs">
				<span class="label">{i18n.t('forms.select_textarea_title')}</span>
				<Grid minItemWidth={260} gap="sm">
					<FormField label={i18n.t('forms.country_label')} forId="demo-country-select">
						{#snippet control(ctx)}
							<Select
								id={ctx.id}
								bind:value={selectedCountry}
								placeholder={i18n.t('forms.country_placeholder')}
								aria-describedby={ctx.describedby}
								options={[
									{ value: 'br', label: i18n.t('forms.country_br') },
									{ value: 'us', label: i18n.t('forms.country_us') },
									{ value: 'es', label: i18n.t('forms.country_es') },
									{ value: 'pt', label: i18n.t('forms.country_pt') }
								]}
							/>
						{/snippet}
					</FormField>

					<FormField label={i18n.t('forms.bio_label')} forId="demo-bio-textarea">
						{#snippet control(ctx)}
							<Textarea
								id={ctx.id}
								bind:value={bioText}
								placeholder={i18n.t('forms.bio_placeholder')}
								maxlength={120}
								showCount
								rows={3}
								aria-describedby={ctx.describedby}
							/>
						{/snippet}
					</FormField>
				</Grid>
			</Column>

			<Divider spacing="xxs" />

			<!-- 6. Entradas Especializadas (Tag, Tags, FileUpload, ColorPicker, DatePicker, TimePicker) -->
			<Column gap="xs">
				<span class="label">{i18n.t('forms.advanced_title')}</span>
				<Grid minItemWidth={260} gap="md">
					<!-- Tags -->
					<Column gap="xs">
						<FormField label={i18n.t('forms.tag_input_label')} forId="demo-tag-input">
							{#snippet control(ctx)}
								<Tags
									id={ctx.id}
									label={i18n.t('forms.tag_input_label')}
									bind:tags={demoTags}
									placeholder={i18n.t('forms.tag_input_placeholder')}
									maxTags={6}
								/>
							{/snippet}
						</FormField>
					</Column>

					<!-- FileUpload -->
					<Column gap="xs">
						<FileUpload
							bind:files={demoFiles}
							label={i18n.t('forms.upload_label')}
							maxSizeMb={5}
							multiple
							maxFiles={3}
							accept="image/*,.pdf"
						/>
					</Column>

					<!-- ColorPicker, DatePicker, TimePicker -->
					<Column gap="sm">
						<FormField label={i18n.t('forms.color_label')} forId="demo-color-picker">
							{#snippet control()}
								<Row gap="sm" align="center">
									<ColorPicker
										bind:value={demoColor}
										showHexInput={true}
										label={i18n.t('forms.color_label')}
									/>
									<ColorPicker
										bind:value={demoColor}
										showHexInput={false}
										label={i18n.t('forms.color_label')}
									/>
								</Row>
							{/snippet}
						</FormField>

						<Row gap="sm" align="start">
							<FormField
								label={i18n.t('forms.date_label')}
								forId="demo-date-picker"
								style="width: auto;"
							>
								{#snippet control(ctx)}
									<DatePicker
										id={ctx.id}
										bind:value={demoDate}
										aria-describedby={ctx.describedby}
									/>
								{/snippet}
							</FormField>

							<FormField
								label={i18n.t('forms.time_label')}
								forId="demo-time-picker"
								style="width: auto;"
							>
								{#snippet control(ctx)}
									<TimePicker
										id={ctx.id}
										bind:value={demoTime}
										aria-describedby={ctx.describedby}
									/>
								{/snippet}
							</FormField>
						</Row>
					</Column>
				</Grid>
			</Column>
		</Card>
		<FloatingBanner
			bind:open={demoBannerOpen}
			maxWidth={demoBannerWidth}
			dismissible
			ariaLabel={i18n.t('banner.title')}
		>
			<Row gap="xs" align="center">
				<Sparkles size={16} />
				<span>{i18n.t('banner.sample_text')}</span>
			</Row>
			{#snippet actions()}
				<Button
					size="sm"
					variant="primary"
					onclick={() => toast.success(i18n.t('catalog.toast_msg_success'))}
				>
					<Share size={14} />
					{i18n.t('banner.share_action')}
				</Button>
			{/snippet}
		</FloatingBanner>
	</Section>

	{#snippet bottom()}
		<Section contained padding="sm">
			<Row justify="between" fullWidth class="footer">
				<span>v{data.version}</span>
				<span>{i18n.t('brand.company')}</span>
			</Row>
		</Section>
	{/snippet}
</AppShell>

<style>
	.brand-icon {
		display: inline-block;
		width: calc(var(--base) * 1.6);
		height: calc(var(--base) * 1.6);
		background-color: var(--color-primary);
		-webkit-mask: url('/favicon.svg') no-repeat center / contain;
		mask: url('/favicon.svg') no-repeat center / contain;
		flex-shrink: 0;
	}

	.brand-name {
		font-weight: 700;
		font-size: var(--text-lg);
		margin: 0;
		line-height: var(--leading-none);
	}

	:global(.footer) {
		font-size: var(--text-xs);
		font-family: var(--font-mono);
		color: var(--text-secondary);
	}

	h2 {
		margin: 0;
		font-size: var(--text-lg);
		font-weight: 700;
	}

	.label {
		font-size: var(--text-xs);
		font-family: var(--font-mono);
		color: var(--text-secondary);
	}

	.mono {
		font-size: var(--text-xxs);
		font-family: var(--font-mono);
		color: var(--text-secondary);
	}

	.palette-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-xs);
		border-radius: var(--radius-xs);
		border: var(--border-width) solid var(--border-color);
		background-color: var(--bg-surface);
	}

	.palette-swatches {
		display: flex;
		gap: var(--space-xxs);
		height: calc(var(--base) * 2.5);
	}

	.palette-swatch-box {
		flex: 1;
		height: 100%;
		border-radius: var(--radius-xs);
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.palette-swatch-box.solid {
		background-color: var(--palette-swatch);
		color: var(--palette-on-solid);
	}

	.palette-swatch-box.subtle {
		background-color: var(--palette-subtle);
		border: var(--border-width) solid var(--palette-border);
		color: var(--palette-text);
	}

	.swatch-hex {
		font-size: var(--text-xxs);
		font-family: var(--font-mono);
		font-weight: 600;
		letter-spacing: 0.02em;
		color: inherit;
	}

	.palette-meta {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.palette-name {
		font-weight: 600;
		font-size: var(--text-xs);
		color: var(--text-primary);
	}
</style>
