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
	import { scale } from 'svelte/transition';
	import type { CalendarMode, Space, Radius } from '$lib/types/index.js';

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
		toastMessage = `${actionName} acionado!`;
		isActionToastOpen = true;
	}

	// Estados de Ações
	let selectedChip = $state('10:00');
	let showRemovableChip = $state(true);

	// Estados de Formulários
	let inputValue = $state('Exemplo de texto');
	let textareaValue = $state('Área de texto neobrutalista.');
	let selectValue = $state('option-1');
	let isInvalid = $state(false);

	let switchChecked = $state(true);
	let sliderValue = $state(65);

	// Seletor de Variantes de Checkbox e Radio
	let checkboxVariant = $state('standard');
	let checkboxVariantTabs = [
		{ id: 'standard', label: 'Padrão' },
		{ id: 'cards', label: 'Cards de Seleção' }
	];

	let radioVariant = $state('standard');
	let radioVariantTabs = [
		{ id: 'standard', label: 'Padrão' },
		{ id: 'cards', label: 'Cards de Escolha' }
	];

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
	let calendarTabs = [
		{ id: 'strip', label: 'Faixa' },
		{ id: 'month', label: 'Mês' }
	];

	// Painel de Superfícies & Cards
	let cardVariantTab = $state('default');
	let cardHasHeader = $state(true);
	let cardHasFooter = $state(true);
	let cardPadding = $state<Space>('md');
	let cardRadius = $state<Radius>('md');
	let isCardFlipped = $state(false);
	let cardTabs = [
		{ id: 'default', label: 'Padrão' },
		{ id: 'collapsible', label: 'Colapsável' },
		{ id: 'badge', label: 'Placa na Borda' },
		{ id: 'flip', label: 'Flip 3D' }
	];

	// Feedback
	let isDialogOpen = $state(false);
	let progressValue = $state(72);

	let selectOptions = $derived([
		{ value: 'option-1', label: t('showcase.forms.selectOption1') },
		{ value: 'option-2', label: t('showcase.forms.selectOption2') },
		{ value: 'option-3', label: t('showcase.forms.selectOption3'), disabled: true }
	]);

	let dropdownItems = [
		{ id: 'opt-1', label: 'Perfil', onclick: () => triggerAction('Opção Perfil') },
		{ id: 'opt-2', label: 'Configurações', onclick: () => triggerAction('Opção Configurações') },
		{ id: 'opt-3', label: 'Excluir', danger: true, onclick: () => triggerAction('Opção Excluir') }
	];
</script>

{#snippet defaultHeader()}
	<span>Card Padrão</span>
{/snippet}

{#snippet defaultFooter()}
	<Row justify="end" gap="sm">
		<Button size="sm" variant="outline" onclick={() => triggerAction('Card Cancelar')}
			>Cancelar</Button
		>
		<Button size="sm" variant="primary" onclick={() => triggerAction('Card Confirmar')}
			>Confirmar</Button
		>
	</Row>
{/snippet}

{#snippet collapsibleHeader()}
	<span>Card Colapsável</span>
{/snippet}

{#snippet collapsibleFooter()}
	<Row justify="end" gap="sm">
		<Button size="sm" variant="outline" onclick={() => triggerAction('Card Fechar')}>Fechar</Button>
	</Row>
{/snippet}

{#snippet badgeFooter()}
	<Row justify="end" gap="sm">
		<Button size="sm" variant="primary" onclick={() => triggerAction('Card Ação')}>Ação</Button>
	</Row>
{/snippet}

{#snippet flipHeader()}
	<span>Card Frente</span>
{/snippet}

{#snippet flipFooter()}
	<Row justify="end" gap="sm">
		<Badge variant="secondary">Lado A</Badge>
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
						<Button variant="primary" onclick={() => triggerAction('Botão Primário')}>
							{t('showcase.buttons.primary')}
						</Button>
						<Button variant="secondary" onclick={() => triggerAction('Botão Secundário')}>
							{t('showcase.buttons.secondary')}
						</Button>
						<Button variant="outline" onclick={() => triggerAction('Botão Contorno')}>
							{t('showcase.buttons.outline')}
						</Button>
						<Button variant="ghost" onclick={() => triggerAction('Botão Fantasma')}>
							{t('showcase.buttons.ghost')}
						</Button>
						<Button variant="danger" onclick={() => triggerAction('Botão Perigo')}>
							{t('showcase.buttons.danger')}
						</Button>
					</Row>
				</Column>
			</Card>

			<!-- 2. Chips -->
			<Card radius="md" padding="md">
				{#snippet header()}
					<span>{t('showcase.chips.title')}</span>
				{/snippet}
				<Row wrap={true} gap="sm" align="center">
					<Chip
						selected={selectedChip === '09:00'}
						onclick={() => {
							selectedChip = '09:00';
							triggerAction('Chip 09:00');
						}}
					>
						09:00
					</Chip>
					<Chip
						selected={selectedChip === '10:00'}
						onclick={() => {
							selectedChip = '10:00';
							triggerAction('Chip 10:00');
						}}
					>
						10:00
					</Chip>
					<Chip
						selected={selectedChip === '11:00'}
						onclick={() => {
							selectedChip = '11:00';
							triggerAction('Chip 11:00');
						}}
					>
						11:00
					</Chip>
					<Chip
						selected={selectedChip === '14:00'}
						onclick={() => {
							selectedChip = '14:00';
							triggerAction('Chip 14:00');
						}}
					>
						14:00
					</Chip>

					{#if showRemovableChip}
						<div
							style="display: inline-flex; align-items: center;"
							transition:scale={{ duration: 180, start: 0.85 }}
						>
							<Chip
								removable={true}
								onremove={() => {
									showRemovableChip = false;
									triggerAction('Chip Removido');
								}}
							>
								Filtro Ativo
							</Chip>
						</div>
					{:else}
						<div
							style="display: inline-flex; align-items: center;"
							transition:scale={{ duration: 180, start: 0.85 }}
						>
							<Chip
								variant="outline"
								onclick={() => {
									showRemovableChip = true;
									triggerAction('Chip Restaurado');
								}}
							>
								<svg
									viewBox="0 0 16 16"
									fill="none"
									stroke="currentColor"
									stroke-width="2.5"
									stroke-linecap="round"
									style="width: 12px; height: 12px; margin-right: 2px;"
								>
									<line x1="8" y1="3" x2="8" y2="13" />
									<line x1="3" y1="8" x2="13" y2="8" />
								</svg>
								Restaurar Chip
							</Chip>
						</div>
					{/if}
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

			<!-- 4. Painel de Checkboxes com Seletor no Header -->
			<Card radius="md" padding="md">
				{#snippet header()}
					<Row fullWidth={true} justify="between" align="center">
						<span>Checkboxes</span>
						<Tabs size="sm" items={checkboxVariantTabs} bind:value={checkboxVariant} />
					</Row>
				{/snippet}

				{#if checkboxVariant === 'standard'}
					<Row wrap={true} gap="md" align="center">
						<Checkbox label="Marcado" bind:checked={standardCheck1} />
						<Checkbox label="Desmarcado" bind:checked={standardCheck2} />
						<Checkbox label="Indeterminado" indeterminate={true} bind:checked={standardCheck3} />
						<Checkbox label="Desabilitado" disabled={true} checked={true} />
					</Row>
				{:else}
					<Grid columns={3} gap="md">
						<Checkbox variant="card" bind:checked={choiceCheck1}>
							<Column gap="none">
								<strong style="font-size: var(--text-sm);">Toalha Quente</strong>
								<span style="font-size: var(--text-xs); color: var(--text-secondary);"
									>Tratamento facial</span
								>
							</Column>
							<Badge variant="secondary" style="margin-top: var(--space-xs);">+ R$ 15</Badge>
						</Checkbox>

						<Checkbox variant="card" bind:checked={choiceCheck2}>
							<Column gap="none">
								<strong style="font-size: var(--text-sm);">Lavagem Especial</strong>
								<span style="font-size: var(--text-xs); color: var(--text-secondary);"
									>Shampoo premium</span
								>
							</Column>
							<Badge variant="secondary" style="margin-top: var(--space-xs);">+ R$ 20</Badge>
						</Checkbox>

						<Checkbox variant="card" disabled={true} checked={false}>
							<Column gap="none">
								<strong style="font-size: var(--text-sm);">Massagem Capilar</strong>
								<span style="font-size: var(--text-xs); color: var(--text-secondary);"
									>Indisponível</span
								>
							</Column>
							<Badge variant="ghost" style="margin-top: var(--space-xs);">Esgotado</Badge>
						</Checkbox>
					</Grid>
				{/if}
			</Card>

			<!-- 5. Painel de Radios com Seletor no Header -->
			<Card radius="md" padding="md">
				{#snippet header()}
					<Row fullWidth={true} justify="between" align="center">
						<span>Radios</span>
						<Tabs size="sm" items={radioVariantTabs} bind:value={radioVariant} />
					</Row>
				{/snippet}

				{#if radioVariant === 'standard'}
					<Row wrap={true} gap="md" align="center">
						<Radio label="Opção A" name="std-radio" value="opt-a" bind:group={standardRadio} />
						<Radio label="Opção B" name="std-radio" value="opt-b" bind:group={standardRadio} />
						<Radio
							label="Opção C (Desabilitada)"
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
								<strong style="font-size: var(--text-sm);">Corte Rápido</strong>
								<span style="font-size: var(--text-xs); color: var(--text-secondary);">30 min</span>
							</Column>
							<Badge variant="primary" style="margin-top: var(--space-xs);">R$ 45</Badge>
						</Radio>

						<Radio variant="card" name="service-choice" value="service-2" bind:group={choiceRadio}>
							<Column gap="none">
								<strong style="font-size: var(--text-sm);">Corte & Barba</strong>
								<span style="font-size: var(--text-xs); color: var(--text-secondary);">60 min</span>
							</Column>
							<Badge variant="primary" style="margin-top: var(--space-xs);">R$ 80</Badge>
						</Radio>

						<Radio
							variant="card"
							name="service-choice"
							value="service-3"
							disabled={true}
							bind:group={choiceRadio}
						>
							<Column gap="none">
								<strong style="font-size: var(--text-sm);">Completo VIP</strong>
								<span style="font-size: var(--text-xs); color: var(--text-secondary);"
									>Indisponível</span
								>
							</Column>
							<Badge variant="ghost" style="margin-top: var(--space-xs);">R$ 130</Badge>
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

			<!-- 2. Cards com Seletor de Variantes e Barra de Ajuste -->
			<Card radius="md" padding="md">
				{#snippet header()}
					<Row fullWidth={true} justify="between" align="center">
						<span>Cards</span>
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
							label="Com Header"
							bind:checked={cardHasHeader}
							disabled={cardVariantTab === 'badge' || cardVariantTab === 'collapsible'}
						/>
						<Checkbox label="Com Footer" bind:checked={cardHasFooter} />
						<Row align="center" gap="xs">
							<span style="font-size: var(--text-xs); font-weight: 700; text-transform: uppercase;"
								>Padding:</span
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
								>Radius:</span
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
								<strong style="font-size: var(--text-base); margin: 0;">Superfície Padrão</strong>
								<p
									style="margin: 0; font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.5;"
								>
									Superfície tátil neobrutalista com elevação física sólida e contenção pura de
									conteúdo ({cardPadding.toUpperCase()}).
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
								<strong style="font-size: var(--text-base); margin: 0;">Painel Expansível</strong>
								<p
									style="margin: 0; font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.5;"
								>
									Clique no cabeçalho acima para recolher ou expandir este painel de forma contínua
									e suave ({cardPadding.toUpperCase()}).
								</p>
							</Column>
						</Card>
					{:else if cardVariantTab === 'badge'}
						<Card
							radius={cardRadius}
							padding={cardPadding}
							badgeTitle="Módulo #01"
							footer={cardHasFooter ? badgeFooter : undefined}
						>
							<Column gap="xs">
								<strong style="font-size: var(--text-base); margin: 0;"
									>Placa na Borda Superior</strong
								>
								<p
									style="margin: 0; font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.5;"
								>
									A placa de identificação fica cravada a 50% na linha superior como uma etiqueta de
									hardware ({cardPadding.toUpperCase()}).
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
								<strong style="font-size: var(--text-base); margin: 0;">Card Interativo 3D</strong>
								<p
									style="margin: 0; font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.5;"
								>
									Clique em qualquer área do Card para girar em 3D e revelar o verso ({cardPadding.toUpperCase()}).
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
									<Row justify="between" align="center">
										<Badge variant="secondary">Clique para desvirar</Badge>
										<Badge variant="primary">Lado B</Badge>
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
					<Button variant="secondary" onclick={() => triggerAction('Toast Disparado')}>
						{t('showcase.feedback.triggerToast')}
					</Button>
				</Row>
			</Card>
		{/if}
	</Section>

	<!-- Rodapé Canônico com Links e Versão -->
	<Footer sticky={true} padding="sm">
		<Row fullWidth={true} justify="between" align="center">
			<span style="font-size: var(--text-xs); color: var(--text-secondary);">
				Shellfish — Criado por <a
					href="https://github.com/lucasmonsan"
					target="_blank"
					rel="noreferrer"
					class="footer-link">Monsan</a
				>
				com
				<a href="https://svelte.dev" target="_blank" rel="noreferrer" class="footer-link">Svelte</a
				>!
			</span>
			<span style="font-size: var(--text-xs); font-weight: 700; color: var(--text-secondary);">
				v1.1.0
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
					triggerAction('Modal Confirmado');
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

	.footer-link:hover {
		color: var(--color-primary);
	}
</style>
