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
	import type { CalendarMode } from '$lib/types/index.js';

	let activeTab = $state('actions');
	let tabItems = $derived([
		{ id: 'actions', label: t('showcase.tabs.actions') },
		{ id: 'forms', label: t('showcase.tabs.forms') },
		{ id: 'display', label: t('showcase.tabs.display') },
		{ id: 'feedback', label: t('showcase.tabs.feedback') }
	]);

	// Estados de Formulários & Interações
	let inputValue = $state('Exemplo de texto');
	let textareaValue = $state('Área de texto neobrutalista.');
	let selectValue = $state('option-1');
	let isInvalid = $state(false);

	let switchChecked = $state(true);
	let sliderValue = $state(65);

	// Seletor de Modos do Calendário
	let calendarMode = $state<CalendarMode>('expandable');
	let calendarValue = $state(new Date());
	let calendarTabs = [
		{ id: 'expandable', label: 'Híbrido' },
		{ id: 'week', label: 'Faixa' },
		{ id: 'month', label: 'Mês' }
	];

	// Seletor de Modos do Card
	let cardVariantTab = $state('default');
	let isCardFlipped = $state(false);
	let cardTabs = [
		{ id: 'default', label: 'Padrão' },
		{ id: 'collapsible', label: 'Colapsável' },
		{ id: 'badge', label: 'Placa' },
		{ id: 'flip', label: 'Flip 3D' }
	];

	let selectedChip = $state('10:00');
	let choiceCardRadio = $state('service-1');
	let choiceCardCheck1 = $state(true);
	let choiceCardCheck2 = $state(false);

	let isDialogOpen = $state(false);
	let isToastOpen = $state(false);
	let progressValue = $state(72);

	let selectOptions = $derived([
		{ value: 'option-1', label: t('showcase.forms.selectOption1') },
		{ value: 'option-2', label: t('showcase.forms.selectOption2') },
		{ value: 'option-3', label: t('showcase.forms.selectOption3'), disabled: true }
	]);

	let dropdownItems = [
		{ id: 'opt-1', label: 'Perfil', onclick: () => {} },
		{ id: 'opt-2', label: 'Configurações', onclick: () => {} },
		{ id: 'opt-3', label: 'Excluir', danger: true, onclick: () => {} }
	];
</script>

<Main fullHeight={true} padding="none" gap="none">
	<!-- Header com Logo Oficial da Concha Terracota -->
	<Header sticky={true} padding="md">
		<Row fullWidth={true} justify="between" align="center">
			<button
				type="button"
				class="header-logo-btn"
				onclick={() => (activeTab = 'actions')}
				aria-label="Ir para a Home do Shellfish"
			>
				<img
					src="/favicon.svg"
					alt="Shellfish Logo"
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
			<!-- 1. Botões -->
			<Card radius="md" padding="md">
				{#snippet header()}
					<span>{t('showcase.buttonVariants.title')}</span>
				{/snippet}
				<Column gap="md">
					<Row wrap={true} gap="md">
						<Button variant="primary">{t('showcase.buttons.primary')}</Button>
						<Button variant="secondary">{t('showcase.buttons.secondary')}</Button>
						<Button variant="outline">{t('showcase.buttons.outline')}</Button>
						<Button variant="ghost">{t('showcase.buttons.ghost')}</Button>
						<Button variant="danger">{t('showcase.buttons.danger')}</Button>
					</Row>
				</Column>
			</Card>

			<!-- 2. Chips -->
			<Card radius="md" padding="md">
				{#snippet header()}
					<span>{t('showcase.chips.title')}</span>
				{/snippet}
				<Row wrap={true} gap="sm" align="center">
					<Chip selected={selectedChip === '09:00'} onclick={() => (selectedChip = '09:00')}>
						09:00
					</Chip>
					<Chip selected={selectedChip === '10:00'} onclick={() => (selectedChip = '10:00')}>
						10:00
					</Chip>
					<Chip selected={selectedChip === '11:00'} onclick={() => (selectedChip = '11:00')}>
						11:00
					</Chip>
					<Chip selected={selectedChip === '14:00'} onclick={() => (selectedChip = '14:00')}>
						14:00
					</Chip>
					<Chip removable={true} onremove={() => (isToastOpen = true)}>Filtro Ativo</Chip>
				</Row>
			</Card>

			<!-- 3. Dropdowns -->
			<Card radius="md" padding="md">
				{#snippet header()}
					<span>{t('showcase.dropdown.title')}</span>
				{/snippet}
				<Row wrap={true} gap="md" align="center">
					<Dropdown label="Opções (Neutro)" variant="secondary" items={dropdownItems} />
					<Dropdown label="Ação (Terracota)" variant="primary" items={dropdownItems} />
					<Dropdown
						label="Menu à Direita"
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
						<Switch label="Notificações" size="md" bind:checked={switchChecked} />
						<Switch label="Sincronização" size="sm" checked={true} />
						<Switch label="Backup Automático" size="lg" checked={false} />
					</Row>

					<Divider />

					<Slider
						label="Intensidade"
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

			<!-- 4. Cards de Seleção (Radio e Checkbox Card) -->
			<Card radius="md" padding="md">
				{#snippet header()}
					<span>{t('showcase.forms.choiceCards')}</span>
				{/snippet}
				<Column gap="md">
					<span
						style="font-size: var(--text-xs); font-weight: 700; color: var(--text-secondary); text-transform: uppercase;"
					>
						Seleção Única (Radio)
					</span>
					<Grid columns={2} gap="md">
						<Radio variant="card" group={choiceCardRadio} value="service-1" name="showcase-choice">
							<Row justify="between" align="center">
								<Column gap="none">
									<strong style="font-size: var(--text-sm);">Corte Rápido</strong>
									<span style="font-size: var(--text-xs); color: var(--text-secondary);"
										>30 min</span
									>
								</Column>
								<Badge variant="primary">R$ 45</Badge>
							</Row>
						</Radio>

						<Radio variant="card" group={choiceCardRadio} value="service-2" name="showcase-choice">
							<Row justify="between" align="center">
								<Column gap="none">
									<strong style="font-size: var(--text-sm);">Corte & Barba</strong>
									<span style="font-size: var(--text-xs); color: var(--text-secondary);"
										>60 min</span
									>
								</Column>
								<Badge variant="primary">R$ 80</Badge>
							</Row>
						</Radio>
					</Grid>

					<span
						style="font-size: var(--text-xs); font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-top: var(--space-xs);"
					>
						Múltipla Seleção (Checkbox)
					</span>
					<Grid columns={2} gap="md">
						<Checkbox variant="card" bind:checked={choiceCardCheck1}>
							<Row justify="between" align="center">
								<Column gap="none">
									<strong style="font-size: var(--text-sm);">Toalha Quente</strong>
									<span style="font-size: var(--text-xs); color: var(--text-secondary);"
										>Adicional</span
									>
								</Column>
								<Badge variant="secondary">+ R$ 15</Badge>
							</Row>
						</Checkbox>

						<Checkbox variant="card" bind:checked={choiceCardCheck2}>
							<Row justify="between" align="center">
								<Column gap="none">
									<strong style="font-size: var(--text-sm);">Lavagem Especial</strong>
									<span style="font-size: var(--text-xs); color: var(--text-secondary);"
										>Adicional</span
									>
								</Column>
								<Badge variant="secondary">+ R$ 20</Badge>
							</Row>
						</Checkbox>
					</Grid>
				</Column>
			</Card>
		{:else if activeTab === 'display'}
			<!-- 1. Badges & Avatares -->
			<Card radius="md" padding="md">
				{#snippet header()}
					<span>{t('showcase.display.badgesTitle')}</span>
				{/snippet}
				<Column gap="md">
					<Row wrap={true} gap="sm" align="center">
						<Badge variant="primary">ONLINE</Badge>
						<Badge variant="secondary">CACHE</Badge>
						<Badge variant="success">200 OK</Badge>
						<Badge variant="warning">AVISO</Badge>
						<Badge variant="danger">ERRO</Badge>
					</Row>
					<Row wrap={true} gap="md" align="center">
						<Avatar name="Lucas Monsan" size="lg" />
						<Avatar name="Zoo Engine" size="md" />
						<Avatar name="Bot" size="sm" />
					</Row>
				</Column>
			</Card>

			<!-- 2. Cards com Seletor de Variantes no Header -->
			{#if cardVariantTab === 'default'}
				<Card radius="md" padding="md">
					{#snippet header()}
						<Row fullWidth={true} justify="between" align="center">
							<span>{t('showcase.display.cardsTitle')}</span>
							<Tabs size="sm" items={cardTabs} bind:value={cardVariantTab} />
						</Row>
					{/snippet}
					<Column gap="sm">
						<p style="margin: 0; font-size: var(--text-sm);">
							Card neobrutalista padrão com elevação sólida de 1px.
						</p>
					</Column>
					{#snippet footer()}
						<Row justify="end" gap="sm">
							<Button size="sm" variant="outline">Cancelar</Button>
							<Button size="sm" variant="primary">Salvar</Button>
						</Row>
					{/snippet}
				</Card>
			{:else if cardVariantTab === 'collapsible'}
				<Card radius="md" padding="md" collapsible={true}>
					{#snippet header()}
						<Row fullWidth={true} justify="between" align="center">
							<span>Card Colapsável</span>
							<Tabs size="sm" items={cardTabs} bind:value={cardVariantTab} />
						</Row>
					{/snippet}
					<Column gap="sm">
						<p style="margin: 0; font-size: var(--text-sm);">
							Clique no cabeçalho para recolher ou expandir este painel fluidamente.
						</p>
					</Column>
				</Card>
			{:else if cardVariantTab === 'badge'}
				<Card radius="md" padding="md" badgeTitle="Módulo #01">
					{#snippet header()}
						<Row fullWidth={true} justify="between" align="center">
							<span>Card com Placa na Borda</span>
							<Tabs size="sm" items={cardTabs} bind:value={cardVariantTab} />
						</Row>
					{/snippet}
					<Column gap="sm">
						<p style="margin: 0; font-size: var(--text-sm);">
							Placa cravada a 50% na linha superior como uma etiqueta física.
						</p>
					</Column>
				</Card>
			{:else if cardVariantTab === 'flip'}
				<Card radius="md" padding="md" bind:flipped={isCardFlipped}>
					{#snippet header()}
						<Row fullWidth={true} justify="between" align="center">
							<span>Card Flip 3D</span>
							<Tabs size="sm" items={cardTabs} bind:value={cardVariantTab} />
						</Row>
					{/snippet}
					<Column gap="md">
						<p style="margin: 0; font-size: var(--text-sm);">
							Clique em qualquer área do Card para girar e ver o verso.
						</p>
						<Row>
							<Badge variant="primary">Clique no Card para Virar ➔</Badge>
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
							<Row>
								<Badge variant="secondary">Clique novamente para desvirar</Badge>
							</Row>
						</Column>
					{/snippet}
				</Card>
			{/if}
		{:else if activeTab === 'feedback'}
			<!-- 1. Progresso -->
			<Card radius="md" padding="md">
				{#snippet header()}
					<span>{t('showcase.feedback.progressBarTitle')}</span>
				{/snippet}
				<Column gap="md">
					<ProgressBar value={progressValue} variant="primary" showLabel={true} size="md" />
					<ProgressBar value={50} striped={true} variant="primary" size="lg" showLabel={true} />
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
					<Button variant="secondary" onclick={() => (isToastOpen = true)}>
						{t('showcase.feedback.triggerToast')}
					</Button>
				</Row>
			</Card>
		{/if}
	</Section>

	<!-- Rodapé -->
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

<!-- Modal Nativo -->
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

<!-- Toast Flutuante -->
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

	.header-logo-img {
		display: block;
		flex-shrink: 0;
	}
</style>
