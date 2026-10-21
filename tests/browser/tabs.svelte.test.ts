import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import TabsTestFixture from '../TabsTestFixture.svelte';

describe('Tabs Interactive Browser Component Test', () => {
	it('switches active tab and panel on click and updates aria-selected attributes', async () => {
		render(TabsTestFixture, {
			props: {
				value: 'extrato'
			}
		});

		const tablist = page.getByRole('tablist');
		await expect.element(tablist).toBeVisible();

		const extratoTab = page.getByRole('tab', { name: 'Extrato' });
		const graficosTab = page.getByRole('tab', { name: 'Gráficos' });

		await expect.element(extratoTab).toHaveAttribute('aria-selected', 'true');
		await expect.element(graficosTab).toHaveAttribute('aria-selected', 'false');

		// Painel inicial
		const extratoPanel = page.getByTestId('panel-extrato');
		await expect.element(extratoPanel).toBeVisible();

		// Clica na aba Gráficos
		await graficosTab.click();

		await expect.element(graficosTab).toHaveAttribute('aria-selected', 'true');
		await expect.element(extratoTab).toHaveAttribute('aria-selected', 'false');

		// Novo painel deve estar visível
		const graficosPanel = page.getByTestId('panel-graficos');
		await expect.element(graficosPanel).toBeVisible();
	});
});
