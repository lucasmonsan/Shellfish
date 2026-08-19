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
		ButtonGroup,
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
		ThemeSelector
	} from '$lib/index.js';

	let activeTab = $state('actions');
	const tabItems = [
		{ id: 'actions', label: 'Ações & Navegação' },
		{ id: 'forms', label: 'Formulários' },
		{ id: 'display', label: 'Superfícies & Exibição' },
		{ id: 'feedback', label: 'Feedback & Diálogos' }
	];

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

	const selectOptions = [
		{ value: 'option-1', label: 'Opção 1 - Principal' },
		{ value: 'option-2', label: 'Opção 2 - Secundária' },
		{ value: 'option-3', label: 'Opção 3 - Desabilitada', disabled: true }
	];
</script>

<Main fullHeight={true} padding="none" gap="none">
	<Header sticky={true} padding="md">
		<Row fullWidth={true} justify="between" align="center">
			<Row align="center" gap="sm">
				<Avatar name="Shellfish UI" size="md" square={true} />
				<Column gap="none">
					<h1 style="font-size: var(--text-lg); margin: 0;">Shellfish UI</h1>
					<span style="font-size: var(--text-xs); color: var(--text-secondary);">
						Design System Tátil para a Suíte Zoo
					</span>
				</Column>
			</Row>
			<Row align="center" gap="sm">
				<Badge variant="primary" pill={true}>v1.0.0</Badge>
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
					<span>Variantes de Botão</span>
				{/snippet}
				<Column gap="md">
					<p style="font-size: var(--text-sm); color: var(--text-secondary);">
						Física mecânica real: sombra sólida de 2px no repouso, elevação de 3px no hover, e
						compressão no chão no clique.
					</p>
					<Row wrap={true} gap="md">
						<Button variant="primary">Principal</Button>
						<Button variant="secondary">Secundário</Button>
						<Button variant="outline">Contorno</Button>
						<Button variant="ghost">Fantasma</Button>
						<Button variant="danger">Perigo</Button>
					</Row>
				</Column>
			</Card>

			<Card radius="md" padding="lg">
				{#snippet header()}
					<span>Tamanhos & Estados de Botão</span>
				{/snippet}
				<Column gap="md">
					<Row wrap={true} align="center" gap="md">
						<Button size="sm">Pequeno (SM)</Button>
						<Button size="md">Médio (MD)</Button>
						<Button size="lg">Grande (LG)</Button>
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
							{buttonLoading ? 'Carregando...' : 'Clique para Carregar'}
						</Button>
						<Button disabled={true}>Desabilitado</Button>
						<Button iconOnly={true} aria-label="Ação rápida">
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

			<Card radius="md" padding="lg">
				{#snippet header()}
					<span>Grupo de Botões (ButtonGroup)</span>
				{/snippet}
				<ButtonGroup>
					<Button variant="secondary">Esquerda</Button>
					<Button variant="secondary">Centro</Button>
					<Button variant="secondary">Direita</Button>
				</ButtonGroup>
			</Card>
		{/if}

		{#if activeTab === 'forms'}
			<Card radius="md" padding="lg">
				{#snippet header()}
					<span>Controles de Entrada</span>
				{/snippet}
				<Column gap="lg">
					<Row align="center" gap="md">
						<Checkbox bind:checked={isInvalid} label="Simular estado inválido nos campos" />
					</Row>

					<Grid columns={2} gap="lg">
						<Column gap="xs">
							<label
								for="demo-input"
								style="font-size: var(--text-xs); font-weight: 700; text-transform: uppercase;"
							>
								Campo de Texto
							</label>
							<Input
								id="demo-input"
								bind:value={inputValue}
								invalid={isInvalid}
								placeholder="Digite seu texto..."
								fullWidth={true}
							/>
						</Column>

						<Column gap="xs">
							<label
								for="demo-select"
								style="font-size: var(--text-xs); font-weight: 700; text-transform: uppercase;"
							>
								Seleção (Select)
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
							Área de Texto (Textarea)
						</label>
						<Textarea
							id="demo-textarea"
							bind:value={textareaValue}
							invalid={isInvalid}
							fullWidth={true}
						/>
					</Column>

					<Divider label="Seleções Táteis" spacing="sm" />

					<Row wrap={true} gap="xl">
						<Column gap="xs">
							<span style="font-size: var(--text-xs); font-weight: 700; text-transform: uppercase;"
								>Checkboxes</span
							>
							<Checkbox bind:checked={checkboxChecked} invalid={isInvalid} label="Opção marcada" />
							<Checkbox bind:indeterminate={checkboxIndeterminate} label="Opção indeterminada" />
							<Checkbox disabled={true} label="Opção desabilitada" />
						</Column>

						<Column gap="xs">
							<span style="font-size: var(--text-xs); font-weight: 700; text-transform: uppercase;"
								>Radios</span
							>
							<Radio bind:group={radioGroup} value="op-a" invalid={isInvalid} label="Opção A" />
							<Radio bind:group={radioGroup} value="op-b" invalid={isInvalid} label="Opção B" />
							<Radio
								bind:group={radioGroup}
								value="op-c"
								disabled={true}
								label="Opção C (Desabilitada)"
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
						<span>Badges & Marcadores</span>
					{/snippet}
					<Column gap="md">
						<Row wrap={true} gap="sm">
							<Badge variant="primary">Primário</Badge>
							<Badge variant="secondary">Secundário</Badge>
							<Badge variant="outline">Contorno</Badge>
							<Badge variant="ghost">Fantasma</Badge>
							<Badge variant="danger">Perigo</Badge>
						</Row>
						<Row wrap={true} gap="sm">
							<Badge variant="primary" pill={true}>Pill</Badge>
							<Badge variant="secondary" pill={true}>Sucesso</Badge>
							<Badge variant="danger" pill={true}>99+</Badge>
						</Row>
					</Column>
				</Card>

				<Card radius="md" padding="lg">
					{#snippet header()}
						<span>Avatares</span>
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
					<span>Card Interativo com Elevação Tátil</span>
				{/snippet}
				<p style="margin: 0; font-size: var(--text-sm);">
					Passe o cursor sobre este card ou clique nele para sentir a física de interação tátil
					neobrutalista.
				</p>
			</Card>
		{/if}

		{#if activeTab === 'feedback'}
			<Column gap="lg">
				<Alert variant="info" title="Informação">
					Este é um banner de alerta informativo com tag semântica pura.
				</Alert>
				<Alert variant="success" title="Sucesso" closable={true}>
					Operação realizada com sucesso. Você pode fechar este alerta.
				</Alert>
				<Alert variant="warning" title="Atenção">
					Verifique suas credenciais antes de continuar o processo.
				</Alert>
				<Alert variant="danger" title="Erro Crítico">
					Falha ao conectar com o serviço remoto. Tente novamente.
				</Alert>

				<Card radius="md" padding="lg">
					{#snippet header()}
						<span>Diálogos Nativos & Notificações</span>
					{/snippet}
					<Row wrap={true} gap="md" align="center">
						<Button onclick={() => (isDialogOpen = true)}>Abrir Modal Nativo</Button>
						<Button variant="secondary" onclick={() => (isToastOpen = true)}
							>Disparar Notificação Toast</Button
						>
						<Spinner size="md" />
					</Row>
				</Card>
			</Column>
		{/if}
	</Section>

	<Footer sticky={true} padding="sm">
		<Row fullWidth={true} justify="between" align="center">
			<span style="font-size: var(--text-xs); color: var(--text-secondary);">
				Shellfish UI — Design System Nativo do Zoo
			</span>
			<Badge variant="secondary">Porta 5172</Badge>
		</Row>
	</Footer>
</Main>

<!-- Modal Nativo HTML5 -->
<Dialog bind:open={isDialogOpen} title="Diálogo Modal Nativo" size="md">
	<p style="margin: 0; font-size: var(--text-sm); line-height: 1.6;">
		Este modal utiliza a tag nativa <code>&lt;dialog&gt;</code> do HTML5 com renderização na Top
		Layer do navegador, eliminando conflitos de z-index e fornecendo acessibilidade nativa com
		suporte à tecla <code>ESC</code>.
	</p>
	{#snippet footer()}
		<Button variant="secondary" onclick={() => (isDialogOpen = false)}>Cancelar</Button>
		<Button variant="primary" onclick={() => (isDialogOpen = false)}>Confirmar</Button>
	{/snippet}
</Dialog>

<!-- Toast Flutuante -->
<Toast bind:open={isToastOpen} variant="success" duration={3500}>
	<strong>Ação executada:</strong> Demonstração de notificação flutuante com auto-dismiss.
</Toast>
