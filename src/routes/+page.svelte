<script lang="ts">
	import {
		Main,
		Header,
		Section,
		Footer,
		Row,
		Column,
		Grid,
		Button,
		Tabs,
		Dropdown,
		Input,
		Textarea,
		Select,
		Checkbox,
		Radio,
		Switch,
		Slider,
		Calendar,
		Chips,
		Card,
		Badge,
		Divider,
		Avatar,
		Spinner,
		ProgressBar,
		Dialog,
		Toast,
		ThemeSelector,
		LocaleSelector,
		getI18n
	} from '$lib/index.js';
	import type { CalendarMode, Space, Radius } from '$lib/types/index.js';
	import type { LayoutData } from './$types.js';

	let { data }: { data: LayoutData } = $props();

	// Instância contextual inicializada no top-level do componente
	const i18n = getI18n();
	const t = (key: string, params?: Record<string, string | number>) => i18n.t(key, params);

	let activeTab = $state('actions');
	let tabItems = $derived([
		{ id: 'actions', label: t('showcase.tabs.actions') },
		{ id: 'forms', label: t('showcase.tabs.forms') },
		{ id: 'display', label: t('showcase.tabs.display') },
		{ id: 'feedback', label: t('showcase.tabs.feedback') }
	]);

	// Toast de Feedback Unificado
	let toastMessage = $state('');
	let isActionToastOpen = $state(false);

	function triggerAction(actionName: string) {
		toastMessage = t('showcase.toast.actionTriggered', { action: actionName });
		isActionToastOpen = true;
	}

	// Estados de Chips / Tags
	let tagsValue = $state(['Design System', 'Svelte 5', 'Neobrutalismo', 'Shellfish']);
	let tagSuggestions = ['SvelteKit', 'TypeScript', 'Vite', 'Tailwind', 'Accessibility', 'Tokens'];

	// Estados de Formulários
	let inputValue = $state('Exemplo de texto');
	let textareaValue = $state('Área de texto neobrutalista.');
	let selectValue = $state('option-1');
	let isInvalid = $state(false);

	let switchChecked = $state(true);
	let sliderValue = $state(65);

	// Seletor de Variantes de Checkbox e Radio
	let checkboxVariant = $state('standard');
	let checkboxVariantTabs = $derived([
		{ id: 'standard', label: t('showcase.variant.standard') },
		{ id: 'cards', label: t('showcase.variant.card') }
	]);

	let radioVariant = $state('standard');
	let radioVariantTabs = $derived([
		{ id: 'standard', label: t('showcase.variant.standard') },
		{ id: 'cards', label: t('showcase.variant.card') }
	]);

	// Estados de Checkbox
	let standardCheck1 = $state(true);
	let standardCheck2 = $state(false);
	let standardCheck3 = $state(false);
	let choiceCheck1 = $state(true);
	let choiceCheck2 = $state(false);

	// Estados de Radio
	let standardRadio = $state('opt-a');
	let choiceRadio = $state('service-1');

	// Calendário
	let calendarMode = $state<CalendarMode>('strip');
	let calendarValue = $state(new Date());
	let calendarTabs = $derived([
		{ id: 'strip', label: t('showcase.calendar.strip') },
		{ id: 'month', label: t('showcase.calendar.month') }
	]);

	// Painel de Superfícies & Cards
	let cardVariantTab = $state('default');
	let cardHasHeader = $state(true);
	let cardHasFooter = $state(true);
	let cardPadding = $state<Space>('md');
	let cardRadius = $state<Radius>('md');
	let isCardFlipped = $state(false);
	let cardTabs = $derived([
		{ id: 'default', label: t('showcase.variant.standard') },
		{ id: 'collapsible', label: t('showcase.variant.collapsible') },
		{ id: 'badge', label: t('showcase.variant.badge') },
		{ id: 'flip', label: t('showcase.variant.flip') }
	]);

	// Feedback
	let isDialogOpen = $state(false);
	let progressValue = $state(72);

	let selectOptions = $derived([
		{ value: 'option-1', label: t('showcase.forms.selectOption1') },
		{ value: 'option-2', label: t('showcase.forms.selectOption2') },
		{ value: 'option-3', label: t('showcase.forms.selectOption3'), disabled: true }
	]);

	let dropdownItems = $derived([
		{
			id: 'opt-1',
			label: t('showcase.dropdown.profile'),
			onclick: () => triggerAction(t('showcase.dropdown.profile'))
		},
		{
			id: 'opt-2',
			label: t('showcase.dropdown.settings'),
			onclick: () => triggerAction(t('showcase.dropdown.settings'))
		},
		{
			id: 'opt-3',
			label: t('showcase.dropdown.delete'),
			danger: true,
			onclick: () => triggerAction(t('showcase.dropdown.delete'))
		}
	]);
</script>

{#snippet defaultHeader()}
	<span>{t('showcase.card.defaultHeader')}</span>
{/snippet}

{#snippet defaultFooter()}
	<Row justify="end" gap="sm">
		<Button size="sm" variant="outline" onclick={() => triggerAction(t('common.cancel'))}>
			{t('common.cancel')}
		</Button>
		<Button size="sm" variant="primary" onclick={() => triggerAction(t('common.confirm'))}>
			{t('common.confirm')}
		</Button>
	</Row>
{/snippet}

{#snippet collapsibleHeader()}
	<span>{t('showcase.card.collapsibleHeader')}</span>
{/snippet}

{#snippet collapsibleFooter()}
	<Row justify="end" gap="sm">
		<Button size="sm" variant="outline" onclick={() => triggerAction(t('common.close'))}>
			{t('common.close')}
		</Button>
	</Row>
{/snippet}

{#snippet badgeFooter()}
	<Row justify="end" gap="sm">
		<Button size="sm" variant="primary" onclick={() => triggerAction(t('showcase.card.action'))}>
			{t('showcase.card.action')}
		</Button>
	</Row>
{/snippet}

{#snippet flipHeader()}
	<span>{t('showcase.card.flipHeader')}</span>
{/snippet}

{#snippet flipFooter()}
	<Row justify="end" gap="sm">
		<Badge variant="secondary">{t('showcase.card.sideA')}</Badge>
	</Row>
{/snippet}

<Main fullHeight={true} padding="none" gap="none">
	<!-- Header Limpo com Logo Oficial -->
	<Header sticky={true} padding="md">
		<Row fullWidth={true} justify="between" align="center">
			<button
				type="button"
				class="header-logo-btn"
				onclick={() => (activeTab = 'actions')}
				aria-label={t('showcase.logo.aria')}
			>
				<img
					src="/favicon.svg"
					alt={t('showcase.logo.alt')}
					width="36"
					height="36"
					class="header-logo-img"
				/>
				<Column gap="none">
					<h1 style="font-size: var(--text-lg); margin: 0; line-height: 1.1;">
						{t('showcase.title')}
					</h1>
					<span style="font-size: var(--text-xs); color: var(--text-secondary);">
						{t('showcase.subtitle')}
					</span>
				</Column>
			</button>
			<Row align="center" gap="sm">
				<LocaleSelector size="md" />
				<ThemeSelector size="md" />
			</Row>
		</Row>
	</Header>

	<Section scrollable={true} padding="md" gap="md">
		<Row fullWidth={true} justify="between" align="center">
			<Tabs items={tabItems} bind:value={activeTab} />
		</Row>

		{#if activeTab === 'actions'}
			<!-- 1. Botões -->
			<Card radius="md" padding="md">
				{#snippet header()}
					<span>{t('showcase.buttonVariants.title')}</span>
				{/snippet}
				<Column gap="md">
					<Row wrap={true} gap="md">
						<Button variant="primary" onclick={() => triggerAction(t('showcase.buttons.primary'))}>
							{t('showcase.buttons.primary')}
						</Button>
						<Button
							variant="secondary"
							onclick={() => triggerAction(t('showcase.buttons.secondary'))}
						>
							{t('showcase.buttons.secondary')}
						</Button>
						<Button variant="outline" onclick={() => triggerAction(t('showcase.buttons.outline'))}>
							{t('showcase.buttons.outline')}
						</Button>
						<Button variant="ghost" onclick={() => triggerAction(t('showcase.buttons.ghost'))}>
							{t('showcase.buttons.ghost')}
						</Button>
						<Button variant="danger" onclick={() => triggerAction(t('showcase.buttons.danger'))}>
							{t('showcase.buttons.danger')}
						</Button>
					</Row>
				</Column>
			</Card>

			<!-- 2. Chips (Entrada de Tags) -->
			<Card radius="md" padding="md">
				{#snippet header()}
					<Row fullWidth={true} justify="between" align="center">
						<span>{t('showcase.chips.title')}</span>
						<Badge variant="secondary"
							>{tagsValue.length} {t('showcase.chips.activeTags').toLowerCase()}</Badge
						>
					</Row>
				{/snippet}
				<Column gap="sm">
					<Chips
						bind:value={tagsValue}
						suggestions={tagSuggestions}
						placeholder={t('showcase.chips.placeholder')}
						fullWidth={true}
						onadd={(tag) => triggerAction(`Tag "${tag}"`)}
						onremove={(tag) => triggerAction(`Tag "${tag}"`)}
					/>
					<span style="font-size: var(--text-xs); color: var(--text-secondary);">
						{t('showcase.chips.helper')}
					</span>
				</Column>
			</Card>

			<!-- 3. Dropdowns -->
			<Card radius="md" padding="md">
				{#snippet header()}
					<span>{t('showcase.dropdown.title')}</span>
				{/snippet}
				<Row wrap={true} gap="md" align="center">
					<Dropdown
						label={t('showcase.dropdown.neutral')}
						variant="secondary"
						items={dropdownItems}
					/>
					<Dropdown
						label={t('showcase.dropdown.terracotta')}
						variant="primary"
						items={dropdownItems}
					/>
					<Dropdown
						label={t('showcase.dropdown.rightMenu')}
						placement="bottom-end"
						variant="outline"
						items={dropdownItems}
					/>
				</Row>
			</Card>
		{:else if activeTab === 'forms'}
			<!-- 1. Entradas de Texto -->
			<Card radius="md" padding="md">
				{#snippet header()}
					<span>{t('showcase.forms.title')}</span>
				{/snippet}
				<Column gap="md">
					<Row align="center" gap="sm">
						<Checkbox label={t('showcase.forms.simulateInvalid')} bind:checked={isInvalid} />
					</Row>
					<Grid columns={2} gap="md">
						<Input
							label={t('showcase.forms.inputLabel')}
							bind:value={inputValue}
							invalid={isInvalid}
							placeholder={t('showcase.forms.inputPlaceholder')}
							fullWidth={true}
						/>
						<Select
							label={t('showcase.forms.selectLabel')}
							bind:value={selectValue}
							options={selectOptions}
							invalid={isInvalid}
							fullWidth={true}
						/>
					</Grid>
					<Textarea
						label={t('showcase.forms.textareaLabel')}
						bind:value={textareaValue}
						invalid={isInvalid}
						fullWidth={true}
					/>
				</Column>
			</Card>

			<!-- 2. Switches & Slider -->
			<Card radius="md" padding="md">
				{#snippet header()}
					<span>{t('showcase.forms.switches')} & {t('showcase.forms.slider')}</span>
				{/snippet}
				<Column gap="lg">
					<Row wrap={true} gap="lg" align="center">
						<Switch
							label={t('showcase.forms.switchNotifications')}
							size="md"
							bind:checked={switchChecked}
						/>
						<Switch label={t('showcase.forms.switchSync')} size="sm" checked={true} />
						<Switch label={t('showcase.forms.switchBackup')} size="lg" checked={false} />
					</Row>

					<Divider />

					<Slider
						label={t('showcase.forms.sliderIntensity')}
						bind:value={sliderValue}
						min={0}
						max={100}
						showValue={true}
						valueSuffix="%"
					/>
				</Column>
			</Card>

			<!-- 3. Calendário com Seletor no Header -->
			<Card radius="md" padding="md">
				{#snippet header()}
					<Row fullWidth={true} justify="between" align="center">
						<span>{t('showcase.forms.calendar')}</span>
						<Tabs size="sm" items={calendarTabs} bind:value={calendarMode as unknown as string} />
					</Row>
				{/snippet}
				<Row justify="center" style="padding-top: var(--space-xs);">
					<Calendar mode={calendarMode} bind:value={calendarValue} />
				</Row>
			</Card>

			<!-- 4. Painel de Checkboxes com Seletor no Header -->
			<Card radius="md" padding="md">
				{#snippet header()}
					<Row fullWidth={true} justify="between" align="center">
						<span>{t('showcase.forms.checkboxes')}</span>
						<Tabs size="sm" items={checkboxVariantTabs} bind:value={checkboxVariant} />
					</Row>
				{/snippet}

				{#if checkboxVariant === 'standard'}
					<Row wrap={true} gap="md" align="center">
						<Checkbox label={t('showcase.forms.checkedOption')} bind:checked={standardCheck1} />
						<Checkbox label={t('showcase.forms.uncheckedOption')} bind:checked={standardCheck2} />
						<Checkbox
							label={t('showcase.forms.indeterminateOption')}
							indeterminate={true}
							bind:checked={standardCheck3}
						/>
						<Checkbox label={t('showcase.forms.disabledOption')} disabled={true} checked={true} />
					</Row>
				{:else}
					<Grid columns={3} gap="md">
						<Checkbox variant="card" bind:checked={choiceCheck1}>
							<Column gap="none">
								<strong style="font-size: var(--text-sm);"
									>{t('showcase.forms.serviceHotTowel')}</strong
								>
								<span style="font-size: var(--text-xs); color: var(--text-secondary);"
									>{t('showcase.forms.serviceHotTowelDesc')}</span
								>
							</Column>
							<Badge variant="secondary" style="margin-top: var(--space-xs);"
								>{t('showcase.forms.servicePrice15')}</Badge
							>
						</Checkbox>

						<Checkbox variant="card" bind:checked={choiceCheck2}>
							<Column gap="none">
								<strong style="font-size: var(--text-sm);">{t('showcase.forms.serviceWash')}</strong
								>
								<span style="font-size: var(--text-xs); color: var(--text-secondary);"
									>{t('showcase.forms.serviceWashDesc')}</span
								>
							</Column>
							<Badge variant="secondary" style="margin-top: var(--space-xs);"
								>{t('showcase.forms.servicePrice20')}</Badge
							>
						</Checkbox>

						<Checkbox variant="card" disabled={true} checked={false}>
							<Column gap="none">
								<strong style="font-size: var(--text-sm);"
									>{t('showcase.forms.serviceMassage')}</strong
								>
								<span style="font-size: var(--text-xs); color: var(--text-secondary);"
									>{t('showcase.forms.serviceUnavailable')}</span
								>
							</Column>
							<Badge variant="ghost" style="margin-top: var(--space-xs);"
								>{t('showcase.forms.serviceSoldOut')}</Badge
							>
						</Checkbox>
					</Grid>
				{/if}
			</Card>

			<!-- 5. Painel de Radios com Seletor no Header -->
			<Card radius="md" padding="md">
				{#snippet header()}
					<Row fullWidth={true} justify="between" align="center">
						<span>{t('showcase.forms.radios')}</span>
						<Tabs size="sm" items={radioVariantTabs} bind:value={radioVariant} />
					</Row>
				{/snippet}

				{#if radioVariant === 'standard'}
					<Row wrap={true} gap="md" align="center">
						<Radio
							label={t('showcase.forms.radioA')}
							name="std-radio"
							value="opt-a"
							bind:group={standardRadio}
						/>
						<Radio
							label={t('showcase.forms.radioB')}
							name="std-radio"
							value="opt-b"
							bind:group={standardRadio}
						/>
						<Radio
							label={t('showcase.forms.radioCDisabled')}
							name="std-radio"
							value="opt-c"
							disabled={true}
							bind:group={standardRadio}
						/>
					</Row>
				{:else}
					<Grid columns={3} gap="md">
						<Radio variant="card" name="service-choice" value="service-1" bind:group={choiceRadio}>
							<Column gap="none">
								<strong style="font-size: var(--text-sm);"
									>{t('showcase.forms.serviceQuickCut')}</strong
								>
								<span style="font-size: var(--text-xs); color: var(--text-secondary);"
									>{t('showcase.forms.time30min')}</span
								>
							</Column>
							<Badge variant="primary" style="margin-top: var(--space-xs);"
								>{t('showcase.forms.servicePrice45')}</Badge
							>
						</Radio>

						<Radio variant="card" name="service-choice" value="service-2" bind:group={choiceRadio}>
							<Column gap="none">
								<strong style="font-size: var(--text-sm);"
									>{t('showcase.forms.serviceCutBeard')}</strong
								>
								<span style="font-size: var(--text-xs); color: var(--text-secondary);"
									>{t('showcase.forms.time60min')}</span
								>
							</Column>
							<Badge variant="primary" style="margin-top: var(--space-xs);"
								>{t('showcase.forms.servicePrice80')}</Badge
							>
						</Radio>

						<Radio
							variant="card"
							name="service-choice"
							value="service-3"
							disabled={true}
							bind:group={choiceRadio}
						>
							<Column gap="none">
								<strong style="font-size: var(--text-sm);">{t('showcase.forms.serviceVip')}</strong>
								<span style="font-size: var(--text-xs); color: var(--text-secondary);"
									>{t('showcase.forms.serviceUnavailable')}</span
								>
							</Column>
							<Badge variant="ghost" style="margin-top: var(--space-xs);"
								>{t('showcase.forms.servicePrice130')}</Badge
							>
						</Radio>
					</Grid>
				{/if}
			</Card>
		{:else if activeTab === 'display'}
			<!-- 1. Badges & Avatares -->
			<Card radius="md" padding="md">
				{#snippet header()}
					<span>{t('showcase.display.badgesTitle')}</span>
				{/snippet}
				<Column gap="md">
					<Row wrap={true} gap="sm" align="center">
						<Badge variant="primary">{t('showcase.display.badgeOnline')}</Badge>
						<Badge variant="secondary">{t('showcase.display.badgeCache')}</Badge>
						<Badge variant="success">{t('showcase.display.badgeSuccess')}</Badge>
						<Badge variant="warning">{t('showcase.display.badgeWarning')}</Badge>
						<Badge variant="danger">{t('showcase.display.badgeError')}</Badge>
					</Row>
					<Row wrap={true} gap="md" align="center">
						<Avatar name="Lucas Monsan" size="lg" />
						<Avatar name="Zoo Engine" size="md" />
						<Avatar name="Bot" size="sm" />
					</Row>
				</Column>
			</Card>

			<!-- 2. Cards com Seletor de Variantes e Barra de Ajuste -->
			<Card radius="md" padding="md">
				{#snippet header()}
					<Row fullWidth={true} justify="between" align="center">
						<span>{t('showcase.display.cardsTitle')}</span>
						<Tabs size="sm" items={cardTabs} bind:value={cardVariantTab} />
					</Row>
				{/snippet}
				<Column gap="md">
					<!-- Barra de Configuração de Props -->
					<Row
						wrap={true}
						gap="md"
						align="center"
						style="background-color: var(--bg-secondary); padding: var(--space-sm); border: var(--border-width) solid var(--border-color); border-radius: var(--radius-sm);"
					>
						<Checkbox
							label={t('showcase.card.withHeader')}
							bind:checked={cardHasHeader}
							disabled={cardVariantTab === 'badge' || cardVariantTab === 'collapsible'}
						/>
						<Checkbox label={t('showcase.card.withFooter')} bind:checked={cardHasFooter} />
						<Row align="center" gap="xs">
							<span style="font-size: var(--text-xs); font-weight: 700; text-transform: uppercase;"
								>{t('showcase.card.padding')}</span
							>
							<Button
								size="sm"
								variant={cardPadding === 'sm' ? 'primary' : 'outline'}
								onclick={() => (cardPadding = 'sm')}>SM (8px)</Button
							>
							<Button
								size="sm"
								variant={cardPadding === 'md' ? 'primary' : 'outline'}
								onclick={() => (cardPadding = 'md')}>MD (16px)</Button
							>
							<Button
								size="sm"
								variant={cardPadding === 'lg' ? 'primary' : 'outline'}
								onclick={() => (cardPadding = 'lg')}>LG (24px)</Button
							>
						</Row>
						<Row align="center" gap="xs">
							<span style="font-size: var(--text-xs); font-weight: 700; text-transform: uppercase;"
								>{t('showcase.card.radius')}</span
							>
							<Button
								size="sm"
								variant={cardRadius === 'sm' ? 'primary' : 'outline'}
								onclick={() => (cardRadius = 'sm')}>SM (2px)</Button
							>
							<Button
								size="sm"
								variant={cardRadius === 'md' ? 'primary' : 'outline'}
								onclick={() => (cardRadius = 'md')}>MD (4px)</Button
							>
						</Row>
					</Row>

					<!-- Renderização do Card Selecionado -->
					{#if cardVariantTab === 'default'}
						<Card
							radius={cardRadius}
							padding={cardPadding}
							header={cardHasHeader ? defaultHeader : undefined}
							footer={cardHasFooter ? defaultFooter : undefined}
						>
							<Column gap="xs">
								<strong style="font-size: var(--text-base); margin: 0;"
									>{t('showcase.card.standardTitle', {
										padding: cardPadding.toUpperCase()
									})}</strong
								>
								<p
									style="margin: 0; font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.5;"
								>
									{t('showcase.card.standardDesc', {
										padding: cardPadding.toUpperCase()
									})}
								</p>
							</Column>
						</Card>
					{:else if cardVariantTab === 'collapsible'}
						<Card
							radius={cardRadius}
							padding={cardPadding}
							collapsible={true}
							header={collapsibleHeader}
							footer={cardHasFooter ? collapsibleFooter : undefined}
						>
							<Column gap="xs">
								<strong style="font-size: var(--text-base); margin: 0;"
									>{t('showcase.card.collapsibleTitle')}</strong
								>
								<p
									style="margin: 0; font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.5;"
								>
									{t('showcase.card.collapsibleDesc', {
										padding: cardPadding.toUpperCase()
									})}
								</p>
							</Column>
						</Card>
					{:else if cardVariantTab === 'badge'}
						<Card
							radius={cardRadius}
							padding={cardPadding}
							badgeTitle={t('showcase.card.module')}
							footer={cardHasFooter ? badgeFooter : undefined}
						>
							<Column gap="xs">
								<strong style="font-size: var(--text-base); margin: 0;"
									>{t('showcase.card.topBadgeTitle')}</strong
								>
								<p
									style="margin: 0; font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.5;"
								>
									{t('showcase.card.topBadgeDesc', {
										padding: cardPadding.toUpperCase()
									})}
								</p>
							</Column>
						</Card>
					{:else if cardVariantTab === 'flip'}
						<Card
							radius={cardRadius}
							padding={cardPadding}
							bind:flipped={isCardFlipped}
							header={cardHasHeader ? flipHeader : undefined}
							footer={cardHasFooter ? flipFooter : undefined}
						>
							<Column gap="sm">
								<strong style="font-size: var(--text-base); margin: 0;"
									>{t('showcase.card.interactive3d')}</strong
								>
								<p
									style="margin: 0; font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.5;"
								>
									{t('showcase.card.interactive3dDesc', {
										padding: cardPadding.toUpperCase()
									})}
								</p>
								<Row>
									<Badge variant="primary">{t('showcase.card.clickToFlip')}</Badge>
								</Row>
							</Column>
							{#snippet back()}
								<Column gap="md" style="padding: var(--space-md);">
									<strong style="font-size: var(--text-base);"
										>{t('showcase.display.flipBackTitle')}</strong
									>
									<p style="margin: 0; font-size: var(--text-sm);">
										{t('showcase.display.flipBackDesc')}
									</p>
									<Row justify="between" align="center">
										<Badge variant="secondary">{t('showcase.display.flipBackUnflip')}</Badge>
										<Badge variant="primary">{t('showcase.display.flipBackSideB')}</Badge>
									</Row>
								</Column>
							{/snippet}
						</Card>
					{/if}
				</Column>
			</Card>
		{:else if activeTab === 'feedback'}
			<!-- 1. Progresso -->
			<Card radius="md" padding="md">
				{#snippet header()}
					<span>{t('showcase.feedback.progressBarTitle')}</span>
				{/snippet}
				<Column gap="md">
					<ProgressBar value={progressValue} variant="primary" showLabel={true} size="md" />
					<ProgressBar value={50} striped={true} variant="primary" size="md" showLabel={true} />
					<ProgressBar value={85} variant="success" size="sm" />
				</Column>
			</Card>

			<!-- 2. Spinners -->
			<Card radius="md" padding="md">
				{#snippet header()}
					<span>{t('showcase.feedback.spinnersTitle')}</span>
				{/snippet}
				<Grid columns={3} gap="md">
					<Card radius="sm" padding="sm" variant="flat">
						<Column align="center" gap="sm">
							<Spinner variant="cube" size="lg" />
							<span style="font-size: var(--text-xs); font-weight: 700; text-align: center;">
								{t('showcase.feedback.spinnerCube')}
							</span>
						</Column>
					</Card>
					<Card radius="sm" padding="sm" variant="flat">
						<Column align="center" gap="sm">
							<Spinner variant="ratchet" size="lg" />
							<span style="font-size: var(--text-xs); font-weight: 700; text-align: center;">
								{t('showcase.feedback.spinnerRatchet')}
							</span>
						</Column>
					</Card>
					<Card radius="sm" padding="sm" variant="flat">
						<Column align="center" gap="sm">
							<Spinner variant="chaser" size="lg" />
							<span style="font-size: var(--text-xs); font-weight: 700; text-align: center;">
								{t('showcase.feedback.spinnerChaser')}
							</span>
						</Column>
					</Card>
				</Grid>
			</Card>

			<!-- 3. Modais & Toasts -->
			<Card radius="md" padding="md">
				{#snippet header()}
					<span>{t('showcase.feedback.dialogsTitle')}</span>
				{/snippet}
				<Row wrap={true} gap="md">
					<Button variant="primary" onclick={() => (isDialogOpen = true)}>
						{t('showcase.feedback.openDialog')}
					</Button>
					<Button
						variant="secondary"
						onclick={() => triggerAction(t('showcase.feedback.triggerToast'))}
					>
						{t('showcase.feedback.triggerToast')}
					</Button>
				</Row>
			</Card>
		{/if}
	</Section>

	<!-- Rodapé Canônico com Links e Versão Dinâmica do package.json -->
	<Footer sticky={true} padding="sm">
		<Row fullWidth={true} justify="between" align="center">
			<span style="font-size: var(--text-xs); color: var(--text-secondary);">
				{t('showcase.footer.createdWith')}
				<a
					href="https://github.com/lucasmonsan"
					target="_blank"
					rel="noreferrer"
					class="footer-link">Monsan</a
				>
				{t('showcase.footer.with')}
				<a href="https://svelte.dev" target="_blank" rel="noreferrer" class="footer-link">Svelte</a
				>!
			</span>
			<span style="font-size: var(--text-xs); font-weight: 700; color: var(--text-secondary);">
				v{data.version}
			</span>
		</Row>
	</Footer>
</Main>

<!-- Modal Nativo com Footer Alinhado à Direita -->
<Dialog
	bind:open={isDialogOpen}
	title={t('showcase.dialog.title')}
	size="md"
	closeOnOutsideClick={true}
>
	<Column gap="md">
		<p style="margin: 0; font-size: var(--text-sm); line-height: 1.5;">
			{t('showcase.dialog.desc')}
		</p>
	</Column>
	{#snippet footer()}
		<Row justify="end" gap="sm" fullWidth={true}>
			<Button variant="outline" onclick={() => (isDialogOpen = false)}>
				{t('common.cancel')}
			</Button>
			<Button
				variant="primary"
				onclick={() => {
					isDialogOpen = false;
					triggerAction(t('common.confirm'));
				}}
			>
				{t('common.confirm')}
			</Button>
		</Row>
	{/snippet}
</Dialog>

<!-- Toast de Ação e Feedback Unificado -->
<Toast bind:open={isActionToastOpen} variant="info" duration={2500}>
	<span style="font-size: var(--text-sm); font-weight: 700;">{toastMessage}</span>
</Toast>

<style>
	.header-logo-btn {
		display: inline-flex;
		align-items: center;
		gap: var(--space-sm);
		background: transparent;
		border: none;
		padding: 0;
		cursor: pointer;
		text-align: left;
		color: inherit;
		font: inherit;
	}

	.header-logo-btn:hover {
		opacity: 0.85;
	}

	.header-logo-btn:focus-visible {
		outline: 2px solid var(--color-primary);
		border-radius: var(--radius-sm);
	}

	.header-logo-img {
		display: block;
		flex-shrink: 0;
	}

	.footer-link {
		color: var(--text-primary);
		font-weight: 700;
		text-decoration: underline;
		text-underline-offset: 2px;
	}
</style>
