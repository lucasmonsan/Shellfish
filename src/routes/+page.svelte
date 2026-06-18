<script lang="ts">
	import { onMount, tick } from 'svelte';
	import {
		AppViewport,
		AppHeader,
		ThemeSelector,
		LanguageSelector,
		ResponsiveGrid,
		Panel,
		Stack,
		Inline,
		Button,
		Text,
		Badge,
		StatusPill,
		ZapIcon,
		FolderIcon,
		RotateCwIcon
	} from 'monsan-ui';
	import { getLocale, setLocale } from '$lib/paraglide/runtime';
	import * as m from '$lib/paraglide/messages';

	// Mock game data
	const mockGames = [
		{
			id: 'g1',
			title: 'God of War (2018)',
			platform: 'Steam',
			status: 'installed',
			hours: '42h',
			badge: 'Installed',
			tone: 'success' as const,
			panelVariant: 'secondary' as const,
			coverUrl: '/images/covers/god-of-war.jpg'
		},
		{
			id: 'g2',
			title: 'Hades II',
			platform: 'Epic Games',
			status: 'downloading',
			hours: '12h',
			badge: 'Downloading (67%)',
			tone: 'warning' as const,
			panelVariant: 'secondary' as const,
			coverUrl: '/images/covers/hades-2.jpg'
		},
		{
			id: 'g3',
			title: 'Celeste',
			platform: 'Itch.io',
			status: 'installed',
			hours: '85h',
			badge: 'Installed',
			tone: 'success' as const,
			panelVariant: 'secondary' as const,
			coverUrl: '/images/covers/celeste.jpg'
		},
		{
			id: 'g4',
			title: 'Super Mario Odyssey',
			platform: 'Nintendo Switch',
			status: 'cloud',
			hours: '0h',
			badge: 'Cloud Sync',
			tone: 'info' as const,
			panelVariant: 'secondary' as const,
			coverUrl: '/images/covers/super-mario.jpg'
		}
	];

	let focusedIndex = $state(0);
	let gamepadConnected = $state(false);
	let gamepadId = $state('');

	// Cooldown to prevent ultra-fast scrolling
	let inputCooldown = false;
	const COOLDOWN_MS = 250;

	function triggerAction(index: number) {
		const game = mockGames[index];
		alert(`Ação executada para o jogo: ${game.title}`);
	}

	function handleDirection(direction: 'left' | 'right' | 'up' | 'down') {
		if (inputCooldown) return;

		if (direction === 'left') {
			focusedIndex = Math.max(0, focusedIndex - 1);
		} else if (direction === 'right') {
			focusedIndex = Math.min(mockGames.length - 1, focusedIndex + 1);
		} else if (direction === 'up') {
			focusedIndex = Math.max(0, focusedIndex - 2);
		} else if (direction === 'down') {
			focusedIndex = Math.min(mockGames.length - 1, focusedIndex + 2);
		}

		inputCooldown = true;
		setTimeout(() => {
			inputCooldown = false;
		}, COOLDOWN_MS);
	}

	function handleLocaleChange(lang: string) {
		setLocale(lang as 'en' | 'pt' | 'es');
	}

	// Keep browser focus aligned with focusedIndex
	$effect(() => {
		const index = focusedIndex;
		tick().then(() => {
			const elements = document.querySelectorAll('.monsan-panel.is-interactive');
			const activeEl = elements[index] as HTMLElement;
			if (activeEl) {
				activeEl.focus();
			}
		});
	});

	onMount(() => {
		// Keyboard navigation listener
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'ArrowLeft') {
				e.preventDefault();
				handleDirection('left');
			} else if (e.key === 'ArrowRight') {
				e.preventDefault();
				handleDirection('right');
			} else if (e.key === 'ArrowUp') {
				e.preventDefault();
				handleDirection('up');
			} else if (e.key === 'ArrowDown') {
				e.preventDefault();
				handleDirection('down');
			} else if (e.key === 'Enter') {
				e.preventDefault();
				triggerAction(focusedIndex);
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		// Explicit event listeners to force the browser to activate the Gamepad API
		const handleGamepadConnected = (e: GamepadEvent) => {
			console.log('Gamepad connected event:', e.gamepad.id, e.gamepad.mapping);
			gamepadConnected = true;
			gamepadId = e.gamepad.id;
		};

		const handleGamepadDisconnected = (e: GamepadEvent) => {
			console.log('Gamepad disconnected event:', e.gamepad.id);
			gamepadConnected = false;
			gamepadId = '';
		};

		window.addEventListener('gamepadconnected', handleGamepadConnected);
		window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);

		// Gamepad polling loop
		let frameId: number;
		const checkGamepad = () => {
			const gamepads = navigator.getGamepads();
			const gp = Array.from(gamepads).find((g) => g !== null);

			if (gp) {
				gamepadConnected = true;
				gamepadId = gp.id;

				// 1. D-pad buttons (12: Up, 13: Down, 14: Left, 15: Right)
				if (gp.buttons[14]?.pressed) handleDirection('left');
				else if (gp.buttons[15]?.pressed) handleDirection('right');
				else if (gp.buttons[12]?.pressed) handleDirection('up');
				else if (gp.buttons[13]?.pressed) handleDirection('down');

				// 2. Analog Sticks
				const threshold = 0.5;
				const axisX = gp.axes[0]; // Left stick horizontal
				const axisY = gp.axes[1]; // Left stick vertical

				if (axisX < -threshold) handleDirection('left');
				else if (axisX > threshold) handleDirection('right');
				else if (axisY < -threshold) handleDirection('up');
				else if (axisY > threshold) handleDirection('down');

				// 3. Action Buttons (Button A is index 0)
				if (gp.buttons[0]?.pressed && !inputCooldown) {
					triggerAction(focusedIndex);
					inputCooldown = true;
					setTimeout(() => {
						inputCooldown = false;
					}, COOLDOWN_MS);
				}
			} else {
				gamepadConnected = false;
				gamepadId = '';
			}

			frameId = requestAnimationFrame(checkGamepad);
		};

		frameId = requestAnimationFrame(checkGamepad);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('gamepadconnected', handleGamepadConnected);
			window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected);
			cancelAnimationFrame(frameId);
		};
	});
</script>

<AppViewport padding="app" gap="md" contentGap="md" contentMaxWidth="content">
	{#snippet header()}
		<AppHeader
			title="Shellfish"
			subtitle="Console-style game launcher"
			logoSrc="/favicon.svg"
			size="compact"
		>
			{#snippet actions()}
				<Inline gap="sm" align="center">
					<ThemeSelector storageKey="shellfish_theme" />
					<LanguageSelector value={getLocale()} onChange={handleLocaleChange} />
				</Inline>
			{/snippet}
		</AppHeader>
	{/snippet}

	<Stack gap="lg" fullWidth>
		<!-- Welcome notice or summary -->
		<Panel padding="var(--space-md)" variant="secondary" maxWidth="none">
			<Stack gap="xs">
				<Text tag="h2" size="lg" weight="bold">
					{m.hello_world({ name: 'Gamer' })}
				</Text>
				<Text tag="p" size="sm" variant="secondary">
					Your unified PC game library. Configured for gamepad navigation, local backups, and
					neobrutalist visual excellence.
				</Text>
				{#if gamepadConnected}
					<StatusPill tone="success" pulse>
						Gamepad Connected: {gamepadId.split(' (')[0]}
					</StatusPill>
				{:else}
					<StatusPill tone="neutral">No Gamepad Detected (Press a button to connect)</StatusPill>
				{/if}
			</Stack>
		</Panel>

		<!-- Game grid -->
		<Stack gap="sm" fullWidth>
			<Text tag="h3" size="md" weight="bold">Library</Text>
			<ResponsiveGrid minItemWidth="md">
				{#each mockGames as game, index (game.id)}
					<Panel
						padding="var(--space-md)"
						maxWidth="none"
						variant={focusedIndex === index ? 'neutral' : game.panelVariant}
						interactive
						onclick={() => triggerAction(index)}
					>
						<Stack gap="md" fullWidth>
							<!-- Image rendering container -->
							<Panel padding="none" maxWidth="none" overflow="hidden" variant="secondary">
								<img
									src={game.coverUrl}
									alt={game.title}
									style="width: 100%; height: 260px; object-fit: cover; display: block;"
								/>
							</Panel>

							<Stack gap="xs">
								<Text tag="h4" size="md" weight="bold" truncate>
									{game.title}
								</Text>
								<Inline gap="xs" align="center">
									<Badge variant="secondary">{game.platform}</Badge>
									<StatusPill tone={game.tone} pulse={game.status === 'downloading'}>
										{game.badge}
									</StatusPill>
								</Inline>
							</Stack>

							<Inline gap="xs" align="center">
								<Text tag="span" size="sm" variant="secondary">
									Playtime: <strong>{game.hours}</strong>
								</Text>
							</Inline>

							<!-- Action button -->
							{#if game.status === 'installed'}
								<Button
									variant={focusedIndex === index ? 'primary' : 'secondary'}
									block
									size="sm"
									onclick={(e) => {
										e.stopPropagation();
										triggerAction(index);
									}}
								>
									<ZapIcon size={14} /> Play
								</Button>
							{:else if game.status === 'downloading'}
								<Button variant="secondary" block size="sm" disabled>
									<RotateCwIcon size={14} /> Downloading...
								</Button>
							{:else}
								<Button
									variant={focusedIndex === index ? 'primary' : 'secondary'}
									block
									size="sm"
									onclick={(e) => {
										e.stopPropagation();
										triggerAction(index);
									}}
								>
									<FolderIcon size={14} /> Install
								</Button>
							{/if}
						</Stack>
					</Panel>
				{/each}
			</ResponsiveGrid>
		</Stack>
	</Stack>
</AppViewport>
