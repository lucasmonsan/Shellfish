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

	it('select options float over the modal footer and are fully clickable', async () => {
		render(ModalWithSelectFixture);

		const openModalBtn = page.getByRole('button', { name: 'Abrir Modal' });
		await openModalBtn.click();

		const dialog = page.getByRole('dialog');
		await expect.element(dialog).toBeVisible();

		const selectTrigger = page.getByRole('combobox');
		await selectTrigger.click();

		const opt3 = page.getByRole('option', { name: 'Opção 3' });
		await expect.element(opt3).toBeVisible();
		await opt3.click();

		// Após a seleção, o valor é atualizado e o modal permanece aberto
		await expect.element(dialog).toBeVisible();
		await expect.element(selectTrigger).toHaveTextContent('Opção 3');
	});

	it('clicking on the backdrop when Select is open closes ONLY the Select and preserves the Modal', async () => {
		render(ModalWithSelectFixture);

		const openModalBtn = page.getByRole('button', { name: 'Abrir Modal' });
		await openModalBtn.click();

		const dialog = page.getByRole('dialog');
		await expect.element(dialog).toBeVisible();

		const selectTrigger = page.getByRole('combobox');
		await selectTrigger.click();

		const listbox = page.getByRole('listbox');
		await expect.element(listbox).toBeVisible();

		// Simula o clique no backdrop do diálogo (pointerdown no document fora do select seguido de click no dialog)
		const dialogNode = dialog.element();
		dialogNode.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true }));
		dialogNode.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

		// O Select fecha, mas o Modal continua 100% aberto!
		await expect.element(listbox).not.toBeInTheDocument();
		await expect.element(dialog).toBeVisible();

		// Um segundo clique no backdrop agora sim fecha o modal
		dialogNode.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true }));
		dialogNode.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
		await expect.element(dialog).not.toBeInTheDocument();
	});

	it('clicking on the backdrop when an Input is focused blurs the input and preserves the Modal', async () => {
		render(ModalWithSelectFixture);

		const openModalBtn = page.getByRole('button', { name: 'Abrir Modal' });
		await openModalBtn.click();

		const dialog = page.getByRole('dialog');
		await expect.element(dialog).toBeVisible();

		const input = page.getByPlaceholder('Campo de texto');
		await input.click();
		await expect.element(input).toHaveFocus();

		// Primeiro clique no backdrop: apenas desfaz o foco (simula recolhimento de teclado mobile)
		const dialogNode = dialog.element();
		dialogNode.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
		await expect.element(dialog).toBeVisible();
		await expect.element(input).not.toHaveFocus();

		// Segundo clique no backdrop: agora sim fecha o modal
		dialogNode.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
		await expect.element(dialog).not.toBeInTheDocument();
	});

	it('pressing browser back (popstate) when Select is open inside Modal closes ONLY the Select and preserves the Modal', async () => {
		render(ModalWithSelectFixture);

		const openModalBtn = page.getByRole('button', { name: 'Abrir Modal' });
		await openModalBtn.click();

		const dialog = page.getByRole('dialog');
		await expect.element(dialog).toBeVisible();

		const selectTrigger = page.getByRole('combobox');
		await selectTrigger.click();

		const listbox = page.getByRole('listbox');
		await expect.element(listbox).toBeVisible();

		// Dispara popstate (simula botão físico Voltar do Android)
		window.dispatchEvent(new PopStateEvent('popstate'));

		// O Select fecha, mas o Modal continua visível e aberto!
		await expect.element(listbox).not.toBeInTheDocument();
		await expect.element(dialog).toBeVisible();

		// Pressiona Escape para fechar o Modal de forma limpa
		await userEvent.keyboard('{Escape}');
		await expect.element(dialog).not.toBeInTheDocument();
	});
});
