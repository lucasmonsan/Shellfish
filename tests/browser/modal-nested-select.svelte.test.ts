import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';
import ModalWithSelectFixture from './ModalWithSelectFixture.svelte';

describe('Modal & Nested Overlays Architectural Integrity', () => {
	it('closing a nested Select via Escape does NOT close the parent Modal', async () => {
		render(ModalWithSelectFixture);

		const openModalBtn = page.getByRole('button', { name: 'Abrir Modal' });
		await openModalBtn.click();

		const dialog = page.getByRole('dialog');
		await expect.element(dialog).toBeVisible();

		// Abre o Select interno dentro do Modal
		const selectTrigger = page.getByRole('combobox');
		await expect.element(selectTrigger).toBeVisible();
		await selectTrigger.click();

		const listbox = page.getByRole('listbox');
		await expect.element(listbox).toBeVisible();

		// Pressiona Escape: apenas o Select deve fechar, o Modal deve permanecer aberto!
		await userEvent.keyboard('{Escape}');
		await expect.element(listbox).not.toBeInTheDocument();
		await expect.element(dialog).toBeVisible();

		// Pressiona Escape novamente: agora sim o Modal fecha
		await userEvent.keyboard('{Escape}');
		await expect.element(dialog).not.toBeInTheDocument();
	});

	it('clicking outside a nested Select dropdown closes only the Select and preserves the Modal', async () => {
		render(ModalWithSelectFixture);

		const openModalBtn = page.getByRole('button', { name: 'Abrir Modal' });
		await openModalBtn.click();

		const dialog = page.getByRole('dialog');
		await expect.element(dialog).toBeVisible();

		// Abre o Select interno
		const selectTrigger = page.getByRole('combobox');
		await selectTrigger.click();

		const listbox = page.getByRole('listbox');
		await expect.element(listbox).toBeVisible();

		// Clica em um texto dentro do modal, fora do dropdown do Select
		const modalText = page.getByText('Texto dentro do modal');
		await modalText.click();

		// O Select fecha, mas o Modal continua 100% aberto
		await expect.element(listbox).not.toBeInTheDocument();
		await expect.element(dialog).toBeVisible();
	});
});
