import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';
import TooltipTestFixture from './TooltipTestFixture.svelte';

describe('Tooltip Interactive Browser Component Test', () => {
	it('reveals tooltip on hover and links aria-describedby', async () => {
		render(TooltipTestFixture);

		const triggerBtn = page.getByRole('button', { name: 'Ação com Dica' });
		await expect.element(triggerBtn).toBeVisible();

		// Inicialmente sem tooltip visível
		const tooltip = page.getByRole('tooltip');
		await expect.element(tooltip).not.toBeInTheDocument();

		// Passa o mouse sobre o botão
		await triggerBtn.hover();

		await expect.element(tooltip).toBeVisible();
		await expect.element(tooltip).toHaveTextContent('Informação de ajuda');

		// aria-describedby deve estar presente no botão
		await expect.element(triggerBtn).toHaveAttribute('aria-describedby');

		// Pressiona Escape para descartar o tooltip
		await userEvent.keyboard('{Escape}');
		await expect.element(tooltip).not.toBeInTheDocument();
	});
});
