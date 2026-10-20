import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';
import PopoverTestFixture from './PopoverTestFixture.svelte';

describe('Popover Interactive Browser Component Test', () => {
	it('opens popover panel when trigger is clicked and closes on Escape', async () => {
		render(PopoverTestFixture);

		const triggerBtn = page.getByRole('button', { name: 'Abrir Menu' });
		await expect.element(triggerBtn).toBeVisible();

		await triggerBtn.click();

		const panelText = page.getByText('Conteúdo do Painel');
		await expect.element(panelText).toBeVisible();

		await userEvent.keyboard('{Escape}');
		await expect.element(panelText).not.toBeInTheDocument();
	});

	it('closes when clicking close button inside the panel', async () => {
		render(PopoverTestFixture);

		const triggerBtn = page.getByRole('button', { name: 'Abrir Menu' });
		await triggerBtn.click();

		const closeInsideBtn = page.getByRole('button', { name: 'Fechar no Painel' });
		await expect.element(closeInsideBtn).toBeVisible();

		await closeInsideBtn.click();
		await expect.element(closeInsideBtn).not.toBeInTheDocument();
	});
});
