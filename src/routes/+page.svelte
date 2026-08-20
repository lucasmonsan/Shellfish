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
		Input,
		Textarea,
		Select,
		Checkbox,
		Radio,
		Card,
		Badge,
		Divider,
		Avatar,
		Alert,
		Spinner,
		Dialog,
		Toast,
		ThemeSelector,
		LocaleSelector,
		t
	} from '$lib/index.js';

	let activeTab = $state('actions');
	let tabItems = $derived([
		{ id: 'actions', label: t('showcase.tabs.actions') },
		{ id: 'forms', label: t('showcase.tabs.forms') },
		{ id: 'display', label: t('showcase.tabs.display') },
		{ id: 'feedback', label: t('showcase.tabs.feedback') }
	]);

	// Estados reativos para testes interativos
	let buttonLoading = $state(false);
	let inputValue = $state('Texto de exemplo');
	let textareaValue = $state('Área de texto com foco tátil e expansão vertical.');
	let selectValue = $state('option-1');
	let checkboxChecked = $state(true);
	let checkboxIndeterminate = $state(false);
	let radioGroup = $state('op-a');
	let isInvalid = $state(false);

	let isDialogOpen = $state(false);
	let isToastOpen = $state(false);

	let selectOptions = $derived([
		{ value: 'option-1', label: t('showcase.forms.selectOption1') },
		{ value: 'option-2', label: t('showcase.forms.selectOption2') },
		{ value: 'option-3', label: t('showcase.forms.selectOption3'), disabled: true }
	]);
</script>

<Main fullHeight={true} padding="none" gap="none">
	<Header sticky={true} padding="md">
		<Row fullWidth={true} justify="between" align="center">
			<Row align="center" gap="sm">
				<Avatar name="Shellfish UI" size="md" square={true} />
				<Column gap="none">
					<h1 style="font-size: var(--text-lg); margin: 0;">{t('showcase.title')}</h1>
					<span style="font-size: var(--text-xs); color: var(--text-secondary);">
						{t('showcase.subtitle')}
					</span>
				</Column>
			</Row>
			<Row align="center" gap="sm">
				<Badge variant="primary" pill={true}>v1.0.0</Badge>
				<LocaleSelector size="md" />
				<ThemeSelector size="md" />
			</Row>
		</Row>
	</Header>

	<Section scrollable={true} padding="lg" gap="lg">
		<Row fullWidth={true} justify="between" align="center">
			<Tabs items={tabItems} bind:value={activeTab} />
		</Row>

		{#if activeTab === 'actions'}
			<Card radius="md" padding="lg">
				{#snippet header()}
					<span>{t('showcase.buttonVariants.title')}</span>
				{/snippet}
				<Column gap="md">
					<p style="font-size: var(--text-sm); color: var(--text-secondary);">
						{t('showcase.buttonVariants.desc')}
					</p>
					<Row wrap={true} gap="md">
						<Button variant="primary">{t('showcase.buttons.primary')}</Button>
						<Button variant="secondary">{t('showcase.buttons.secondary')}</Button>
						<Button variant="outline">{t('showcase.buttons.outline')}</Button>
						<Button variant="ghost">{t('showcase.buttons.ghost')}</Button>
						<Button variant="danger">{t('showcase.buttons.danger')}</Button>
					</Row>
				</Column>
			</Card>

			<Card radius="md" padding="lg">
				{#snippet header()}
					<span>{t('showcase.buttonSizes.title')}</span>
				{/snippet}
				<Column gap="md">
					<Row wrap={true} align="center" gap="md">
						<Button size="sm">{t('showcase.buttons.small')}</Button>
						<Button size="md">{t('showcase.buttons.medium')}</Button>
						<Button size="lg">{t('showcase.buttons.large')}</Button>
					</Row>

					<Divider spacing="sm" />

					<Row wrap={true} align="center" gap="md">
						<Button
							loading={buttonLoading}
							onclick={() => {
								buttonLoading = true;
								setTimeout(() => {
									buttonLoading = false;
								}, 2000);
							}}
						>
							{buttonLoading ? t('showcase.buttons.loading') : t('showcase.buttons.clickToLoad')}
						</Button>
						<Button disabled={true}>{t('showcase.buttons.disabled')}</Button>
						<Button iconOnly={true} aria-label={t('showcase.buttons.quickAction')}>
							<svg
								viewBox="0 0 24 24"
								width="18"
								height="18"
								fill="none"
								stroke="currentColor"
								stroke-width="2.5"
								stroke-linecap="round"
							>
								<line x1="12" y1="5" x2="12" y2="19" />
								<line x1="5" y1="12" x2="19" y2="12" />
							</svg>
						</Button>
					</Row>
				</Column>
			</Card>
		{/if}

		{#if activeTab === 'forms'}
			<Card radius="md" padding="lg">
				{#snippet header()}
					<span>{t('showcase.forms.title')}</span>
				{/snippet}
				<Column gap="lg">
					<Row align="center" gap="md">
						<Checkbox bind:checked={isInvalid} label={t('showcase.forms.simulateInvalid')} />
					</Row>

					<Grid columns={2} gap="lg">
						<Column gap="xs">
							<label
								for="demo-input"
								style="font-size: var(--text-xs); font-weight: 700; text-transform: uppercase;"
							>
								{t('showcase.forms.inputLabel')}
							</label>
							<Input
								id="demo-input"
								bind:value={inputValue}
								invalid={isInvalid}
								placeholder={t('showcase.forms.inputPlaceholder')}
								fullWidth={true}
							/>
						</Column>

						<Column gap="xs">
							<label
								for="demo-select"
								style="font-size: var(--text-xs); font-weight: 700; text-transform: uppercase;"
							>
								{t('showcase.forms.selectLabel')}
							</label>
							<Select
								id="demo-select"
								bind:value={selectValue}
								options={selectOptions}
								invalid={isInvalid}
								fullWidth={true}
							/>
						</Column>
					</Grid>

					<Column gap="xs">
						<label
							for="demo-textarea"
							style="font-size: var(--text-xs); font-weight: 700; text-transform: uppercase;"
						>
							{t('showcase.forms.textareaLabel')}
						</label>
						<Textarea
							id="demo-textarea"
							bind:value={textareaValue}
							invalid={isInvalid}
							fullWidth={true}
						/>
					</Column>

					<Divider label={t('showcase.forms.tactileSelections')} spacing="sm" />

					<Row wrap={true} gap="xl">
						<Column gap="xs">
							<span style="font-size: var(--text-xs); font-weight: 700; text-transform: uppercase;">
								{t('showcase.forms.checkboxes')}
							</span>
							<Checkbox
								bind:checked={checkboxChecked}
								invalid={isInvalid}
								label={t('showcase.forms.checkedOption')}
							/>
							<Checkbox
								bind:indeterminate={checkboxIndeterminate}
								label={t('showcase.forms.indeterminateOption')}
							/>
							<Checkbox disabled={true} label={t('showcase.forms.disabledOption')} />
						</Column>

						<Column gap="xs">
							<span style="font-size: var(--text-xs); font-weight: 700; text-transform: uppercase;">
								{t('showcase.forms.radios')}
							</span>
							<Radio
								bind:group={radioGroup}
								value="op-a"
								invalid={isInvalid}
								label={t('showcase.forms.radioA')}
							/>
							<Radio
								bind:group={radioGroup}
								value="op-b"
								invalid={isInvalid}
								label={t('showcase.forms.radioB')}
							/>
							<Radio
								bind:group={radioGroup}
								value="op-c"
								disabled={true}
								label={t('showcase.forms.radioCDisabled')}
							/>
						</Column>
					</Row>
				</Column>
			</Card>
		{/if}

		{#if activeTab === 'display'}
			<Grid columns={2} gap="lg">
				<Card radius="md" padding="lg">
					{#snippet header()}
						<span>{t('showcase.display.badgesTitle')}</span>
					{/snippet}
					<Column gap="md">
						<Row wrap={true} gap="sm">
							<Badge variant="primary">{t('showcase.buttons.primary')}</Badge>
							<Badge variant="secondary">{t('showcase.buttons.secondary')}</Badge>
							<Badge variant="outline">{t('showcase.buttons.outline')}</Badge>
							<Badge variant="ghost">{t('showcase.buttons.ghost')}</Badge>
							<Badge variant="danger">{t('showcase.buttons.danger')}</Badge>
						</Row>
						<Row wrap={true} gap="sm">
							<Badge variant="primary" pill={true}>Pill</Badge>
							<Badge variant="secondary" pill={true}>Badge</Badge>
							<Badge variant="danger" pill={true}>99+</Badge>
						</Row>
					</Column>
				</Card>

				<Card radius="md" padding="lg">
					{#snippet header()}
						<span>{t('showcase.display.avatarsTitle')}</span>
					{/snippet}
					<Row wrap={true} align="center" gap="md">
						<Avatar name="Lucas Monsan" size="sm" />
						<Avatar name="Lucas Monsan" size="md" />
						<Avatar name="Lucas Monsan" size="lg" />
						<Avatar name="Lucas Monsan" size="xl" square={true} />
					</Row>
				</Card>
			</Grid>

			<Card radius="md" padding="lg" interactive={true}>
				{#snippet header()}
					<span>{t('showcase.display.interactiveCardTitle')}</span>
				{/snippet}
				<p style="margin: 0; font-size: var(--text-sm);">
					{t('showcase.display.interactiveCardDesc')}
				</p>
			</Card>
		{/if}

		{#if activeTab === 'feedback'}
			<Column gap="lg">
				<Alert variant="info" title={t('showcase.feedback.infoTitle')}>
					{t('showcase.feedback.infoMsg')}
				</Alert>
				<Alert variant="success" title={t('showcase.feedback.successTitle')} closable={true}>
					{t('showcase.feedback.successMsg')}
				</Alert>
				<Alert variant="warning" title={t('showcase.feedback.warningTitle')}>
					{t('showcase.feedback.warningMsg')}
				</Alert>
				<Alert variant="danger" title={t('showcase.feedback.dangerTitle')}>
					{t('showcase.feedback.dangerMsg')}
				</Alert>

				<Card radius="md" padding="lg">
					{#snippet header()}
						<span>{t('showcase.feedback.dialogsTitle')}</span>
					{/snippet}
					<Row wrap={true} gap="md" align="center">
						<Button onclick={() => (isDialogOpen = true)}>
							{t('showcase.feedback.openDialog')}
						</Button>
						<Button variant="secondary" onclick={() => (isToastOpen = true)}>
							{t('showcase.feedback.triggerToast')}
						</Button>
						<Spinner size="md" />
					</Row>
				</Card>
			</Column>
		{/if}
	</Section>

	<Footer sticky={true} padding="sm">
		<Row fullWidth={true} justify="between" align="center">
			<span style="font-size: var(--text-xs); color: var(--text-secondary);">
				{t('showcase.footer.tagline')}
			</span>
			<Badge variant="secondary">{t('showcase.footer.port')}</Badge>
		</Row>
	</Footer>
</Main>

<!-- Modal Nativo HTML5 -->
<Dialog bind:open={isDialogOpen} title={t('showcase.dialog.title')} size="md">
	<p style="margin: 0; font-size: var(--text-sm); line-height: 1.6;">
		{t('showcase.dialog.desc')}
	</p>
	{#snippet footer()}
		<Button variant="secondary" onclick={() => (isDialogOpen = false)}>
			{t('common.cancel')}
		</Button>
		<Button variant="primary" onclick={() => (isDialogOpen = false)}>
			{t('common.confirm')}
		</Button>
	{/snippet}
</Dialog>

<!-- Toast Flutuante -->
<Toast bind:open={isToastOpen} variant="success" duration={3500}>
	<strong>{t('showcase.toast.title')}</strong>
	{t('showcase.toast.msg')}
</Toast>
