import { expect, test } from '@playwright/test';

test.describe('Universal WAI-ARIA APG Keyboard & Focus Engine', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');
	});

	test('toggles Checkbox state via Space key', async ({ page }) => {
		const label = page.locator('label.checkbox-root', { hasText: 'Lembrar de mim' });
		await expect(label).toBeVisible();

		const checkboxInput = label.locator('input[type="checkbox"]');

		// Foca o input do checkbox e garante estado inicial desmarcado
		await checkboxInput.focus();
		await expect(checkboxInput).toBeFocused();
		await expect(checkboxInput).not.toBeChecked();

		// Pressiona barra de espaço para marcar
		await page.keyboard.press('Space');
		await expect(checkboxInput).toBeChecked();

		// Pressiona novamente para desmarcar
		await page.keyboard.press('Space');
		await expect(checkboxInput).not.toBeChecked();
	});

	test('toggles Switch state via Space key', async ({ page }) => {
		const label = page.locator('label.switch-root', { hasText: 'Notificações por email' });
		await expect(label).toBeVisible();

		const switchInput = label.locator('input[type="checkbox"]');

		// Foca o switch e valida estado inicial ativo
		await switchInput.focus();
		await expect(switchInput).toBeFocused();
		await expect(switchInput).toHaveAttribute('aria-checked', 'true');

		// Pressiona barra de espaço para desativar
		await page.keyboard.press('Space');
		await expect(switchInput).toHaveAttribute('aria-checked', 'false');

		// Pressiona barra de espaço para reativar
		await page.keyboard.press('Space');
		await expect(switchInput).toHaveAttribute('aria-checked', 'true');
	});

	test('navigates RadioGroup via Arrow keys according to WAI-ARIA APG', async ({ page }) => {
		const proLabel = page.locator('label.radio-root', { hasText: 'Profissional' });
		const freeLabel = page.locator('label.radio-root', { hasText: 'Gratuito' });

		await expect(proLabel).toBeVisible();
		await expect(freeLabel).toBeVisible();

		const proRadio = proLabel.locator('input[type="radio"]');
		const freeRadio = freeLabel.locator('input[type="radio"]');

		// Estado inicial: 'pro' selecionado
		await proRadio.focus();
		await expect(proRadio).toBeFocused();
		await expect(proRadio).toBeChecked();

		// Tecla Seta Acima deve mover foco e seleção para a opção anterior 'free'
		await page.keyboard.press('ArrowUp');
		await expect(freeRadio).toBeFocused();
		await expect(freeRadio).toBeChecked();

		// Tecla Seta Abaixo retorna para 'pro'
		await page.keyboard.press('ArrowDown');
		await expect(proRadio).toBeFocused();
		await expect(proRadio).toBeChecked();
	});

	test('restores focus to trigger when Popover is closed via Escape key', async ({ page }) => {
		const popoverTrigger = page.getByRole('button', { name: /Opções|Options|Popover/i }).first();
		if (await popoverTrigger.isVisible()) {
			await popoverTrigger.focus();
			await expect(popoverTrigger).toBeFocused();

			// Abre o popover via Enter
			await page.keyboard.press('Enter');
			const region = page.getByRole('region');
			await expect(region).toBeVisible();

			// Fecha via tecla Escape
			await page.keyboard.press('Escape');
			await expect(region).not.toBeVisible();

			// O foco deve retornar obrigatoriamente ao botão que disparou o popover
			await expect(popoverTrigger).toBeFocused();
		}
	});

	test('validates minimum target size (WCAG 2.2 SC 2.5.8 >= 24x24px)', async ({ page }) => {
		// Seleciona botões e rótulos de controles de seleção interativos
		const interactiveTargets = await page
			.locator('button, label.checkbox-root, label.radio-root, label.switch-root')
			.all();

		expect(interactiveTargets.length).toBeGreaterThan(10);

		for (const target of interactiveTargets) {
			const isVisible = await target.isVisible();
			if (!isVisible) continue;

			const box = await target.boundingBox();
			if (box) {
				// Tolerância de 1px para subpixel rendering do navegador (ex: 23.625px arredonda para 24px)
				const effectiveWidth = Math.round(box.width);
				const effectiveHeight = Math.round(box.height);

				expect(
					effectiveWidth,
					`Largura efetiva do alvo ${await target.evaluate((n) => n.className)} menor que 24px`
				).toBeGreaterThanOrEqual(24);
				expect(
					effectiveHeight,
					`Altura efetiva do alvo ${await target.evaluate((n) => n.className)} menor que 24px`
				).toBeGreaterThanOrEqual(24);
			}
		}
	});
});
