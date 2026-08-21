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
		Chip,
		Dropdown,
		Input,
		Textarea,
		Select,
		Checkbox,
		Radio,
		Switch,
		Slider,
		Calendar,
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
	let inputValue = $state('Texto de exemplo');
	let textareaValue = $state('Área de texto com foco tátil e expansão vertical.');
	let selectValue = $state('option-1');
	let switchChecked = $state(true);
	let sliderValue = $state(65);
	let calendarValue = $state(new Date());
	let selectedChip = $state('10:00am');
	let isInvalid = $state(false);
	let isCardFlipped = $state(false);

	let choiceCardRadio = $state('service-1');

	let isDialogOpen = $state(false);
	let isToastOpen = $state(false);
	let progressValue = $state(72);

	let selectOptions = $derived([
		{ value: 'option-1', label: t('showcase.forms.selectOption1') },
		{ value: 'option-2', label: t('showcase.forms.selectOption2') },
		{ value: 'option-3', label: t('showcase.forms.selectOption3'), disabled: true }
	]);

	let dropdownItems = [
		{ id: 'opt-1', label: 'Editar Perfil', onclick: () => {} },
		{ id: 'opt-2', label: 'Configurações de Rede', onclick: () => {} },
		{ id: 'opt-3', label: 'Excluir Item', danger: true, onclick: () => {} }
	];
</script>

<Main fullHeight={true} padding="none" gap="none">
	<!-- Header com Logo clicável que reseta para a Home -->
	<Header sticky={true} padding="md">
		<Row fullWidth={true} justify="between" align="center">
			<button
				type="button"
				class="header-logo-btn"
				onclick={() => (activeTab = 'actions')}
				aria-label="Ir para a Home do Shellfish"
			>
				<Avatar name="Shellfish UI" size="md" square={true} />
				<Column gap="none">
					<h1 style="font-size: var(--text-lg); margin: 0;">{t('showcase.title')}</h1>
					<span style="font-size: var(--text-xs); color: var(--text-secondary);">
						{t('showcase.subtitle')}
					</span>
				</Column>
			</button>
			<Row align="center" gap="sm">
				<Badge variant="primary" pill={true}>v1.1.0</Badge>
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
			<!-- 1. Variantes de Botão -->
			<Card radius="md" padding="md">
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

			<!-- 2. Chips & Tags Interativas -->
			<Card radius="md" padding="md">
				{#snippet header()}
					<span>{t('showcase.chips.title')}</span>
				{/snippet}
				<Column gap="md">
					<Row wrap={true} gap="sm" align="center">
						<Chip selected={selectedChip === '9:00am'} onclick={() => (selectedChip = '9:00am')}>
							9:00 AM
						</Chip>
						<Chip selected={selectedChip === '10:00am'} onclick={() => (selectedChip = '10:00am')}>
							10:00 AM
						</Chip>
						<Chip selected={selectedChip === '11:00am'} onclick={() => (selectedChip = '11:00am')}>
							11:00 AM
						</Chip>
						<Chip selected={selectedChip === '2:00pm'} onclick={() => (selectedChip = '2:00pm')}>
							2:00 PM
						</Chip>
						<Chip removable={true} onremove={() => alert('Tag removida!')}>Filtro Removível</Chip>
					</Row>
				</Column>
			</Card>

			<!-- 3. Dropdowns & Menus Suspensos -->
			<Card radius="md" padding="md">
				{#snippet header()}
					<span>{t('showcase.dropdown.title')}</span>
				{/snippet}
				<Row wrap={true} gap="md" align="center">
					<Dropdown label="Menu de Opções" items={dropdownItems} />
					<Dropdown label="Alinhamento à Direita" placement="bottom-end" items={dropdownItems} />
				</Row>
			</Card>
		{:else if activeTab === 'forms'}
			<!-- 1. Campos com Notched Label -->
			<Card radius="md" padding="md">
				{#snippet header()}
					<span>{t('showcase.forms.badgedInputsTitle')}</span>
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

			<!-- 2. Switches, Sliders e Calendários -->
			<Card radius="md" padding="md">
				{#snippet header()}
					<span>{t('showcase.forms.tactileSelections')}</span>
				{/snippet}
				<Column gap="lg">
					<Row wrap={true} gap="lg" align="center">
						<Switch label="Notificações Push (MD)" size="md" bind:checked={switchChecked} />
						<Switch label="Modo Alta Fidelidade (SM)" size="sm" checked={true} />
						<Switch label="Automação Ativa (LG)" size="lg" checked={false} />
					</Row>

					<Divider />

					<Slider
						label="Ajuste de Volume / Intensidade"
						bind:value={sliderValue}
						min={0}
						max={100}
						showValue={true}
						valueSuffix="%"
					/>

					<Divider />

					<Column gap="sm">
						<span style="font-size: var(--text-sm); font-weight: 700; text-transform: uppercase;">
							{t('showcase.forms.calendar')}
						</span>
						<Row wrap={true} gap="md">
							<Calendar mode="expandable" bind:value={calendarValue} />
						</Row>
					</Column>
				</Column>
			</Card>

			<!-- 3. Choice Cards (Radio Card & Checkbox Card em Grade) -->
			<Card radius="md" padding="md">
				{#snippet header()}
					<span>{t('showcase.forms.choiceCards')}</span>
				{/snippet}
				<Grid columns={2} gap="md">
					<Radio variant="card" group={choiceCardRadio} value="service-1" name="showcase-choice">
						<Row justify="between" align="center">
							<Column gap="xs">
								<span style="font-weight: 800;">Clipper Cut</span>
								<span style="font-size: var(--text-xs); color: var(--text-secondary);">
									Corte rápido e alinhamento
								</span>
							</Column>
							<Badge variant="primary">$55.00</Badge>
						</Row>
					</Radio>

					<Radio variant="card" group={choiceCardRadio} value="service-2" name="showcase-choice">
						<Row justify="between" align="center">
							<Column gap="xs">
								<span style="font-weight: 800;">Haircut & Shave</span>
								<span style="font-size: var(--text-xs); color: var(--text-secondary);">
									Corte completo com toalha quente
								</span>
							</Column>
							<Badge variant="primary">$90.00</Badge>
						</Row>
					</Radio>
				</Grid>
			</Card>
		{:else if activeTab === 'display'}
			<!-- 1. Badges & Avatares Neobrutalistas Quadrados -->
			<Card radius="md" padding="md">
				{#snippet header()}
					<span>{t('showcase.display.badgesTitle')} & {t('showcase.display.avatarsTitle')}</span>
				{/snippet}
				<Column gap="md">
					<Row wrap={true} gap="sm" align="center">
						<Badge variant="primary">ONLINE</Badge>
						<Badge variant="secondary">CACHE HIT</Badge>
						<Badge variant="success">200 OK</Badge>
						<Badge variant="warning">DEPRECATED</Badge>
						<Badge variant="danger">DISCONNECTED</Badge>
					</Row>
					<Row wrap={true} gap="md" align="center">
						<Avatar name="Lucas Monsan" size="lg" />
						<Avatar name="Zoo Engine" size="md" />
						<Avatar name="Dev Bot" size="sm" />
					</Row>
				</Column>
			</Card>

			<!-- 2. Flip Card 3D -->
			<Card radius="md" padding="md" flipped={isCardFlipped}>
				{#snippet header()}
					<span>{t('showcase.display.flipCardTitle')}</span>
				{/snippet}
				<Column gap="md">
					<p style="font-size: var(--text-sm); color: var(--text-secondary);">
						{t('showcase.display.flipCardDesc')}
					</p>
					<Row>
						<Button variant="primary" onclick={() => (isCardFlipped = !isCardFlipped)}>
							{t('showcase.display.flipBtn')}
						</Button>
					</Row>
				</Column>
				{#snippet back()}
					<Column gap="md" style="padding: var(--space-md);">
						<span style="font-weight: 800;">{t('showcase.display.flipBackTitle')}</span>
						<p style="font-size: var(--text-sm); color: var(--text-secondary);">
							{t('showcase.display.flipBackDesc')}
						</p>
						<Row>
							<Button variant="secondary" onclick={() => (isCardFlipped = false)}>
								Voltar para a Frente
							</Button>
						</Row>
					</Column>
				{/snippet}
			</Card>
		{:else if activeTab === 'feedback'}
			<!-- 1. Barras de Progresso -->
			<Card radius="md" padding="md">
				{#snippet header()}
					<span>{t('showcase.feedback.progressBarTitle')}</span>
				{/snippet}
				<Column gap="md">
					<ProgressBar value={progressValue} showLabel={true} size="md" />
					<ProgressBar value={45} striped={true} variant="success" size="lg" showLabel={true} />
					<ProgressBar value={85} variant="warning" size="sm" />
				</Column>
			</Card>

			<!-- 2. Spinners Neobrutalistas -->
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

			<!-- 3. Diálogos Nativos & Toasts -->
			<Card radius="md" padding="md">
				{#snippet header()}
					<span>{t('showcase.feedback.dialogsTitle')}</span>
				{/snippet}
				<Row wrap={true} gap="md">
					<Button variant="primary" onclick={() => (isDialogOpen = true)}>
						{t('showcase.feedback.openDialog')}
					</Button>
					<Button variant="secondary" onclick={() => (isToastOpen = true)}>
						{t('showcase.feedback.triggerToast')}
					</Button>
				</Row>
			</Card>
		{/if}
	</Section>

	<!-- Rodapé da Aplicação -->
	<Footer sticky={true} padding="sm">
		<Row fullWidth={true} justify="between" align="center">
			<span style="font-size: var(--text-xs); color: var(--text-secondary);">
				{t('showcase.footer.tagline')}
			</span>
			<span style="font-size: var(--text-xs); color: var(--text-secondary);">
				{t('showcase.footer.port')}
			</span>
		</Row>
	</Footer>
</Main>

<!-- Modal Nativo com Saída Fluida e Zero Blur -->
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
		<Row justify="end" gap="sm">
			<Button variant="outline" onclick={() => (isDialogOpen = false)}>
				{t('common.cancel')}
			</Button>
			<Button variant="primary" onclick={() => (isDialogOpen = false)}>
				{t('common.confirm')}
			</Button>
		</Row>
	{/snippet}
</Dialog>

<!-- Toast Flutuante com Transição Fly -->
<Toast bind:open={isToastOpen} variant="success" duration={3500}>
	<Column gap="none">
		<strong>{t('showcase.toast.title')}</strong>
		<span>{t('showcase.toast.msg')}</span>
	</Column>
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
</style>
