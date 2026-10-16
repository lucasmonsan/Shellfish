import { expect, test } from '@playwright/test';

const httpCredentials = { username: 'shellfish-e2e', password: 'shellfish-e2e' };

test.describe('Catalog locale and theme behavior', () => {
	for (const scenario of [
		{ locale: 'pt-BR', header: 'pt-BR,pt;q=0.9', saveLabel: 'Salvar' },
		{ locale: 'en-US', header: 'en-US,en;q=0.9', saveLabel: 'Save' },
		{ locale: 'es', header: 'es-ES,es;q=0.9', saveLabel: 'Guardar' }
	] as const) {
		test(`renders ${scenario.locale} before hydration`, async ({ browser, baseURL }) => {
			const context = await browser.newContext({
				baseURL,
				httpCredentials,
				locale: scenario.locale,
				extraHTTPHeaders: { 'Accept-Language': scenario.header },
				javaScriptEnabled: false
			});
			const page = await context.newPage();
			await page.goto('/');
			await expect(page.locator('html')).toHaveAttribute('lang', scenario.locale);
			await expect(page.getByRole('button', { name: scenario.saveLabel })).toBeVisible();
			await context.close();
		});
	}

	test('cycles locale across pt-BR -> en-US -> es while keeping the route stable', async ({
		page,
		context
	}) => {
		await context.clearCookies();
		await context.setExtraHTTPHeaders({ 'Accept-Language': 'pt-BR,pt;q=0.9' });
		await page.goto('/');
		await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');

		await page.getByRole('button', { name: 'Alternar idioma' }).click();
		await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');
		await expect(page).toHaveURL(/\/$/);

		await page.getByRole('button', { name: 'Toggle language' }).click();
		await expect(page.locator('html')).toHaveAttribute('lang', 'es');
		await expect(page).toHaveURL(/\/$/);
	});
});
