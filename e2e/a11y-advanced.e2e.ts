import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Advanced Accessibility & Responsive Reflow Invariants (WCAG 2.2)', () => {
	test('satisfies WCAG 1.4.10 Reflow at 320px viewport without two-dimensional horizontal scrolling', async ({
		page
	}) => {
		// Simula viewport estreito de 320px (equivalente a 400% de zoom em tela desktop de 1280px)
		await page.setViewportSize({ width: 320, height: 640 });
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		const hasHorizontalOverflow = await page.evaluate(() => {
			const root = document.documentElement;
			const body = document.body;
			return Math.max(root.scrollWidth, body.scrollWidth) > window.innerWidth + 2;
		});

		expect(
			hasHorizontalOverflow,
			'A página quebrou o critério WCAG 1.4.10 Reflow: gerou barra de rolagem horizontal indesejada em 320px de largura'
		).toBe(false);
	});

	test('maintains visible borders and interactive boundaries under forced-colors mode (Windows High Contrast)', async ({
		page
	}) => {
		await page.emulateMedia({ forcedColors: 'active' });
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		const forcedColorsViolations = await page.evaluate(() => {
			const interactiveSelectors = [
				'button.primary',
				'.input-container',
				'.select-trigger',
				'.tag-input-container'
			];

			const violations: string[] = [];

			for (const sel of interactiveSelectors) {
				const el = document.querySelector(sel);
				if (!el) continue;

				const cs = window.getComputedStyle(el);
				if (cs.borderTopStyle === 'none' && cs.outlineStyle === 'none') {
					violations.push(`Elemento '${sel}' não possui borda nem outline em modo forced-colors`);
				}
			}

			return violations;
		});

		expect(
			forcedColorsViolations,
			`Falha de alto contraste de sistema (forced-colors):\n${forcedColorsViolations.join('\n')}`
		).toEqual([]);
	});

	test('passes comprehensive Axe-Core WCAG 2.2 AA audit under forced-colors mode', async ({
		page
	}) => {
		await page.emulateMedia({ forcedColors: 'active' });
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		const results = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
			.analyze();

		// Em modo forced-colors, as regras de color-contrast são ignoradas pelo Axe porque o SO sobrepõe as cores
		const nonColorViolations = results.violations.filter((v) => v.id !== 'color-contrast');
		expect(nonColorViolations).toEqual([]);
	});
});
