import { test, expect } from '@playwright/test';

test.describe('Showcase SSR & i18n E2E Behavior', () => {
	test('renderiza SSR inicialmente em português quando Accept-Language for pt-BR (sem JS, provando ausência de FOUC)', async ({
		browser
	}) => {
		const context = await browser.newContext({
			locale: 'pt-BR',
			extraHTTPHeaders: {
				'Accept-Language': 'pt-BR,pt;q=0.9'
			},
			javaScriptEnabled: false
		});
		const page = await context.newPage();
		await page.goto('/');

		// Valida atributo lang no SSR puro
		const htmlTag = page.locator('html');
		await expect(htmlTag).toHaveAttribute('lang', 'pt-BR');

		// Valida textos em português no SSR sem execução de JavaScript
		const body = page.locator('body');
		await expect(body).toContainText('Ações');
		await expect(body).toContainText('Formulários');
		await expect(body).toContainText('Superfícies');
		await expect(body).toContainText('Feedback');
		await expect(body).toContainText('Botões');
		await expect(body).toContainText('Principal');
		await expect(body).toContainText('Chips');
		await expect(body).toContainText('Dropdowns');

		await context.close();
	});

	test('renderiza SSR inicialmente em inglês quando Accept-Language for en-US (sem JS, provando ausência de FOUC)', async ({
		browser
	}) => {
		const context = await browser.newContext({
			locale: 'en-US',
			extraHTTPHeaders: {
				'Accept-Language': 'en-US,en;q=0.9'
			},
			javaScriptEnabled: false
		});
		const page = await context.newPage();
		await page.goto('/');

		// Valida atributo lang no SSR puro
		const htmlTag = page.locator('html');
		await expect(htmlTag).toHaveAttribute('lang', 'en-US');

		// Valida textos em inglês no SSR sem execução de JavaScript (sem FOUC)
		const body = page.locator('body');
		await expect(body).toContainText('Actions');
		await expect(body).toContainText('Forms');
		await expect(body).toContainText('Surfaces');
		await expect(body).toContainText('Feedback');
		await expect(body).toContainText('Buttons');
		await expect(body).toContainText('Primary');
		await expect(body).toContainText('Chips');
		await expect(body).toContainText('Dropdowns');

		await context.close();
	});

	test('alterna idioma interativamente via LocaleSelector e persiste preferência por cookie após reload', async ({
		page,
		context
	}) => {
		await page.goto('/');

		// Botão seletor de idioma inicial
		const localeButton = page.locator('button[title="Português"], button[title="English"]');
		await expect(localeButton).toBeVisible();

		// Se estiver em PT, clica para alternar para EN
		if ((await localeButton.getAttribute('title')) === 'Português') {
			await localeButton.click();
			await expect(page.locator('body')).toContainText('Actions');
			await expect(page.locator('body')).toContainText('Buttons');
		}

		// Verifica se o cookie zoo_locale foi gravado
		const cookies = await context.cookies();
		const zooCookie = cookies.find((c) => c.name === 'zoo_locale');
		expect(zooCookie).toBeDefined();
		expect(zooCookie?.value).toBe('en-US');

		// Recarrega a página e valida persistência da preferência
		await page.reload();
		await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');
		await expect(page.locator('body')).toContainText('Actions');
		await expect(page.locator('body')).toContainText('Buttons');
	});
});
