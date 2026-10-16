import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const locales = [
	{ id: 'pt-BR', header: 'pt-BR,pt;q=0.9', code: 'PT' },
	{ id: 'en-US', header: 'en-US,en;q=0.9', code: 'EN' },
	{ id: 'es', header: 'es-ES,es;q=0.9', code: 'ES' }
] as const;

const httpCredentials = { username: 'shellfish-e2e', password: 'shellfish-e2e' };

for (const locale of locales) {
	test.describe(`${locale.id} catalog`, () => {
		test('renders the catalog without JavaScript and preserves SSR locale', async ({
			browser,
			baseURL
		}) => {
			const context = await browser.newContext({
				baseURL,
				httpCredentials,
				javaScriptEnabled: false,
				locale: locale.id,
				extraHTTPHeaders: { 'Accept-Language': locale.header }
			});
			const page = await context.newPage();
			await page.goto('/');
			await expect(page.locator('html')).toHaveAttribute('lang', locale.id);
			await expect(page.getByRole('heading', { name: 'Button', exact: true })).toBeVisible();
			await expect(page.getByRole('heading', { name: 'Spinner', exact: true })).toBeVisible();
			await expect(page.getByRole('heading', { name: 'Icons', exact: true })).toBeVisible();
			await context.close();
		});

		test('passes accessibility audit on the catalog', async ({ browser, baseURL }) => {
			const context = await browser.newContext({
				baseURL,
				httpCredentials,
				locale: locale.id,
				extraHTTPHeaders: { 'Accept-Language': locale.header }
			});
			const page = await context.newPage();
			await page.goto('/');
			await expect(page.locator('html')).toHaveAttribute('lang', locale.id);
			const results = await new AxeBuilder({ page }).analyze();
			expect(results.violations).toEqual([]);
			await context.close();
		});
	});
}
