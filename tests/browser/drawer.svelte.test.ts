import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';
import { createRawSnippet } from 'svelte';
import Drawer from '$lib/components/overlay/Drawer.svelte';
import DrawerWithSelectFixture from './DrawerWithSelectFixture.svelte';

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

	it('renders with scrollable class on drawer-body when scrollable prop is true', async () => {
		render(Drawer, {
			props: {
				open: true,
				scrollable: true,
				title: 'Gaveta com rolagem',
				children: createRawSnippet(() => ({
					render: () => '<span>Conteúdo longo da gaveta</span>'
				}))
			}
		});

		const dialog = page.getByRole('dialog');
		await expect.element(dialog).toBeVisible();

		const body = dialog.element().querySelector('.drawer-body');
		expect(body?.classList.contains('scrollable')).toBe(true);
	});

	it('closing a nested Select via Escape does NOT close the parent Drawer', async () => {
		render(DrawerWithSelectFixture);

		const openDrawerBtn = page.getByRole('button', { name: 'Abrir Drawer' });
		await openDrawerBtn.click();

		const dialog = page.getByRole('dialog');
		await expect.element(dialog).toBeVisible();

		// Abre o Select interno dentro do Drawer
		const selectTrigger = page.getByRole('combobox');
		await expect.element(selectTrigger).toBeVisible();
		await selectTrigger.click();

		const listbox = page.getByRole('listbox');
		await expect.element(listbox).toBeVisible();

		// Pressiona Escape: apenas o Select deve fechar, o Drawer deve permanecer aberto!
		await userEvent.keyboard('{Escape}');
		await expect.element(listbox).not.toBeInTheDocument();
		await expect.element(dialog).toBeVisible();

		// Pressiona Escape novamente: agora sim o Drawer fecha
		await userEvent.keyboard('{Escape}');
		await expect.element(dialog).not.toBeInTheDocument();
	});

	it('select options float over the drawer footer and are fully clickable', async () => {
		render(DrawerWithSelectFixture);

		const openDrawerBtn = page.getByRole('button', { name: 'Abrir Drawer' });
		await openDrawerBtn.click();

		const dialog = page.getByRole('dialog');
		await expect.element(dialog).toBeVisible();

		const selectTrigger = page.getByRole('combobox');
		await selectTrigger.click();

		const opt3 = page.getByRole('option', { name: 'Opção 3' });
		await expect.element(opt3).toBeVisible();
		await opt3.click();

		// Após a seleção, o valor é atualizado e o drawer permanece aberto
		await expect.element(dialog).toBeVisible();
		await expect.element(selectTrigger).toHaveTextContent('Opção 3');
	});

	it('clicking on the backdrop when Select is open closes ONLY the Select and preserves the Drawer', async () => {
		render(DrawerWithSelectFixture);

		const openDrawerBtn = page.getByRole('button', { name: 'Abrir Drawer' });
		await openDrawerBtn.click();

		const dialog = page.getByRole('dialog');
		await expect.element(dialog).toBeVisible();

		const selectTrigger = page.getByRole('combobox');
		await selectTrigger.click();

		const listbox = page.getByRole('listbox');
		await expect.element(listbox).toBeVisible();

		// Simula o clique no backdrop do diálogo
		const dialogNode = dialog.element();
		dialogNode.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true }));
		dialogNode.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

		// O Select fecha, mas o Drawer continua 100% aberto!
		await expect.element(listbox).not.toBeInTheDocument();
		await expect.element(dialog).toBeVisible();

		// Um segundo clique no backdrop agora sim fecha o drawer
		dialogNode.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true }));
		dialogNode.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
		await expect.element(dialog).not.toBeInTheDocument();
	});
});
