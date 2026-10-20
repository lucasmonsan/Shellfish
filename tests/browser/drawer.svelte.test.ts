import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';
import Drawer from '$lib/components/overlay/Drawer.svelte';

describe('Drawer Interactive Browser Component Test', () => {
	it('opens drawer panel and closes via close button', async () => {
		render(Drawer, {
			props: {
				open: true,
				placement: 'right',
				title: 'Painel Lateral'
			}
		});

		const dialog = page.getByRole('dialog');
		await expect.element(dialog).toBeVisible();

		const title = page.getByText('Painel Lateral');
		await expect.element(title).toBeVisible();

		const closeBtn = page.getByRole('button', { name: 'Fechar diálogo' });
		await closeBtn.click();

		await expect.element(dialog).not.toBeInTheDocument();
	});

	it('closes drawer on Escape key', async () => {
		render(Drawer, {
			props: {
				open: true,
				placement: 'left',
				title: 'Menu Lateral'
			}
		});

		const dialog = page.getByRole('dialog');
		await expect.element(dialog).toBeVisible();

		await userEvent.keyboard('{Escape}');
		await expect.element(dialog).not.toBeInTheDocument();
	});
});
