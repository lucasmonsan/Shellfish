import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { catalogEntries } from '../src/routes/components/_catalog/registry.js';

const locales = [
	{ id: 'pt-BR', header: 'pt-BR,pt;q=0.9', catalog: 'Componentes' },
	{ id: 'en-US', header: 'en-US,en;q=0.9', catalog: 'Components' }
] as const;

for (const locale of locales) {
	test.describe(`${locale.id} catalog`, () => {
		test('renders the index without JavaScript and preserves SSR locale', async ({
			browser,
			baseURL
		}) => {
			const context = await browser.newContext({
				baseURL,
				javaScriptEnabled: false,
				locale: locale.id,
				extraHTTPHeaders: { 'Accept-Language': locale.header }
			});
			const page = await context.newPage();
			await page.goto('/components');
			await expect(page.locator('html')).toHaveAttribute('lang', locale.id);
			await expect(page.getByRole('heading', { name: locale.catalog })).toBeVisible();
			await context.close();
		});

		for (const entry of catalogEntries) {
			test(`${entry.name} has a documented accessible playground`, async ({
				browser,
				baseURL,
				browserName
			}) => {
				const context = await browser.newContext({
					baseURL,
					locale: locale.id,
					extraHTTPHeaders: { 'Accept-Language': locale.header }
				});
				if (browserName === 'chromium') {
					await context.grantPermissions(['clipboard-read', 'clipboard-write']);
				}
				const page = await context.newPage();
				await page.goto(`/components/${entry.category}/${entry.slug}`);
				await expect(page.locator('html')).toHaveAttribute('lang', locale.id);
				await expect(page.getByRole('heading', { name: entry.name, exact: true })).toBeVisible();
				await expect(page.getByRole('heading', { name: 'API', exact: true })).toBeVisible();
				await expect(page.locator('pre code')).toContainText(
					`import { ${entry.name} } from 'shellfish'`
				);
				const copyButton = page.getByRole('button', { name: /copy code|copiar código/i });
				await expect(copyButton).toBeVisible();
				if (browserName === 'chromium') {
					await copyButton.click();
					await expect(
						page.getByRole('button', { name: /code copied|código copiado/i })
					).toBeVisible();
				}
				const axe = new AxeBuilder({ page }).disableRules(['color-contrast']);
				if (['main', 'header', 'footer'].includes(entry.root)) {
					axe.disableRules([
						'landmark-main-is-top-level',
						'landmark-no-duplicate-main',
						'landmark-unique'
					]);
				}
				const results = await axe.analyze();
				expect(results.violations).toEqual([]);
				await context.close();
			});
		}
	});
}
