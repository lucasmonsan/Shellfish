import { expect, test } from '@playwright/test';
import { catalogEntries } from '../src/routes/components/_catalog/registry.js';

const viewports = [
	{ name: 'desktop', width: 1440, height: 960 },
	{ name: 'mobile', width: 390, height: 844 }
] as const;

test.describe('Catalog visual regression', () => {
	for (const entry of catalogEntries) {
		for (const viewport of viewports) {
			test(`${entry.name} ${viewport.name}`, async ({ page, browserName }) => {
				test.skip(browserName !== 'chromium', 'Visual fixtures are maintained in Chromium only.');
				await page.setViewportSize(viewport);
				await page.goto(`/components/${entry.category}/${entry.slug}`);
				await expect(page.getByRole('heading', { name: entry.name, exact: true })).toBeVisible();
				await expect(page.locator(`[data-catalog-demo="${entry.slug}"]`)).toBeVisible();
				await expect(page).toHaveScreenshot(
					`components-${entry.category}-${entry.slug}-${viewport.name}.png`,
					{ animations: 'disabled', fullPage: true, maxDiffPixels: 1000 }
				);
			});
		}
	}
});
