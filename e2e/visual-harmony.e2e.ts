import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Visual & Geometric Harmony Invariants (Real Browser DOM)', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');
	});

	test('enforces identical computed height across all md single-line controls', async ({
		page
	}) => {
		const metrics = await page.evaluate(() => {
			const selectors: Record<string, string> = {
				Button: 'button.md:not(.loading)',
				Input: '.input-container.md',
				Select: '.select-trigger.md',
				DatePicker: '.datepicker-container.md',
				TimePicker: '.timepicker-container.md',
				ColorPicker: '.color-trigger.md'
			};

			const results: Record<string, number> = {};
			for (const [name, sel] of Object.entries(selectors)) {
				const elements = Array.from(document.querySelectorAll(sel));
				const el = elements.find((e) => (e as HTMLElement).offsetHeight > 0) || elements[0];
				if (el) {
					results[name] = Number(el.getBoundingClientRect().height.toFixed(2));
				}
			}
			return results;
		});

		const baseHeight = metrics.Input;
		expect(baseHeight).toBeGreaterThan(24);

		const heightMismatches: string[] = [];
		for (const [component, height] of Object.entries(metrics)) {
			if (Math.abs(height - baseHeight) > 0.5) {
				heightMismatches.push(
					`  [ALTURA DIVERGENTE] ${component}.md tem ${height}px, mas Input.md tem ${baseHeight}px`
				);
			}
		}

		expect(
			heightMismatches,
			`Desalinhamento geométrico de altura entre controles md:\n\n${heightMismatches.join('\n')}`
		).toEqual([]);
	});

	test('enforces uniform border-radius (2px), border-width (1px), and non-transparent input surfaces across form controls', async ({
		page
	}) => {
		const audit = await page.evaluate(() => {
			const formSelectors: Record<string, string> = {
				Input: '.input-container.md',
				Select: '.select-trigger.md',
				Textarea: '.textarea-container.md',
				Tags: '.tag-input-container.md',
				DatePicker: '.datepicker-container.md',
				TimePicker: '.timepicker-container.md',
				ColorPicker: '.color-trigger.md'
			};

			const violations: string[] = [];

			for (const [name, sel] of Object.entries(formSelectors)) {
				const elements = Array.from(document.querySelectorAll(sel));
				const el = elements.find((e) => (e as HTMLElement).offsetHeight > 0) || elements[0];
				if (!el) continue;

				const cs = window.getComputedStyle(el);
				if (cs.borderRadius !== '2px') {
					violations.push(
						`  [RAIO DIVERGENTE] ${name} tem border-radius: ${cs.borderRadius} (esperado: 2px / var(--radius-xs))`
					);
				}
				if (cs.borderTopWidth !== '1px') {
					violations.push(
						`  [BORDA DIVERGENTE] ${name} tem border-width: ${cs.borderTopWidth} (esperado: 1px / var(--border-width))`
					);
				}
				if (cs.backgroundColor === 'rgba(0, 0, 0, 0)' || cs.backgroundColor === 'transparent') {
					violations.push(
						`  [SUPERFÍCIE TRANSPARENTE] ${name} está com background-color transparente em vez de var(--bg-input)`
					);
				}
			}

			return violations;
		});

		expect(audit, `Inconsistências visuais computadas no DOM real:\n\n${audit.join('\n')}`).toEqual(
			[]
		);
	});

	test('passes full WCAG 2.2 AA accessibility and color-contrast audit in Dark Theme', async ({
		page
	}) => {
		await page.evaluate(() => {
			document.documentElement.setAttribute('data-theme', 'dark');
		});

		await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
		// Aguarda a conclusão da transição CSS de cores de tema (--transition-fast = 150ms)
		await page.waitForTimeout(250);

		const results = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
			.analyze();

		const summary = results.violations
			.map(
				(v) =>
					`  [${v.id}] (${v.impact}): ${v.help}\n` +
					v.nodes.map((n) => `    - ${n.html}\n      ${n.failureSummary}`).join('\n')
			)
			.join('\n\n');

		expect(
			results.violations,
			`Violações de Acessibilidade / Contraste detectadas pelo Axe-Core no Tema Escuro (Dark):\n\n${summary}`
		).toEqual([]);
	});
});
