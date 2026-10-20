import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';
import Modal from '$lib/components/overlay/Modal.svelte';

describe('Modal Interactive Browser Component Test', () => {
	it('opens modal dialog and closes via the close button', async () => {
		render(Modal, {
			props: {
				open: true,
				title: 'Diálogo de Confirmação'
			}
		});

		const dialog = page.getByRole('dialog');
		await expect.element(dialog).toBeVisible();

		const title = page.getByText('Diálogo de Confirmação');
		await expect.element(title).toBeVisible();

		const closeBtn = page.getByRole('button', { name: 'Fechar diálogo' });
		await closeBtn.click();

		await expect.element(dialog).not.toBeInTheDocument();
	});

	it('closes modal when Escape key is pressed', async () => {
		render(Modal, {
			props: {
				open: true,
				title: 'Diálogo Escape'
			}
		});

		const dialog = page.getByRole('dialog');
		await expect.element(dialog).toBeVisible();

		await userEvent.keyboard('{Escape}');
		await expect.element(dialog).not.toBeInTheDocument();
	});

	it('respects closeOnEscape=false and remains open', async () => {
		render(Modal, {
			props: {
				open: true,
				title: 'Diálogo Fixo',
				closeOnEscape: false
			}
		});

		const dialog = page.getByRole('dialog');
		await expect.element(dialog).toBeVisible();

		await userEvent.keyboard('{Escape}');
		await expect.element(dialog).toBeVisible();
	});
});
