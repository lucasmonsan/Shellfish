import { expect, test } from '@playwright/test';

const httpCredentials = { username: 'shellfish-e2e', password: 'shellfish-e2e' };

test.describe('Catalog overview locale behavior', () => {
	for (const scenario of [
		{ locale: 'pt-BR', header: 'pt-BR,pt;q=0.9', label: 'Todos' },
		{ locale: 'en-US', header: 'en-US,en;q=0.9', label: 'All components' }
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
			await expect(
				page.locator('#catalog-content').getByRole('link', { name: scenario.label, exact: true })
			).toBeVisible();
			await context.close();
		});
	}

	test('changes locale while keeping the catalog route stable', async ({ page, context }) => {
		await context.clearCookies();
		await context.setExtraHTTPHeaders({ 'Accept-Language': 'pt-BR,pt;q=0.9' });
		await page.goto('/components');
		await page.getByRole('button', { name: 'Alternar idioma' }).click();
		await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');
		await expect(page).toHaveURL(/\/components$/);
		await expect(page.getByRole('heading', { name: 'Components' })).toBeVisible();
	});
});
