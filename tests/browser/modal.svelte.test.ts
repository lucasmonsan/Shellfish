import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';
import { createRawSnippet } from 'svelte';
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

	it('renders with scrollable class and flex min-height: 0 constraint when scrollable prop is true, while keeping overflow: visible by default', async () => {
		const { unmount } = render(Modal, {
			props: {
				open: true,
				scrollable: true,
				title: 'Modal com rolagem',
				children: createRawSnippet(() => ({
					render: () => '<div style="height: 2000px;">Conteúdo longo do modal</div>'
				}))
			}
		});

		const dialog = page.getByRole('dialog');
		await expect.element(dialog).toBeVisible();

		const card = dialog.element().querySelector('.modal-card') as HTMLElement;
		const body = dialog.element().querySelector('.modal-body') as HTMLElement;
		expect(body?.classList.contains('scrollable')).toBe(true);

		const cardStyle = window.getComputedStyle(card);
		const bodyStyle = window.getComputedStyle(body);
		expect(cardStyle.minHeight).toBe('0px');
		expect(bodyStyle.minHeight).toBe('0px');
		expect(bodyStyle.overflowY).toBe('auto');
		expect(bodyStyle.overscrollBehavior).toBe('contain');
		expect(card.getBoundingClientRect().height).toBeLessThanOrEqual(
			dialog.element().getBoundingClientRect().height + 1
		);

		unmount();

		render(Modal, {
			props: {
				open: true,
				scrollable: false,
				title: 'Modal padrão',
				children: createRawSnippet(() => ({
					render: () => '<span>Conteúdo padrão</span>'
				}))
			}
		});

		const defaultDialog = page.getByRole('dialog');
		await expect.element(defaultDialog).toBeVisible();
		const defaultBody = defaultDialog.element().querySelector('.modal-body') as HTMLElement;
		expect(window.getComputedStyle(defaultBody).overflow).toBe('visible');
	});

	it('applies is-closing class during exit animation and calls onclose after transition', async () => {
		let closed = false;
		render(Modal, {
			props: {
				open: true,
				title: 'Modal com Transição',
				onclose: () => {
					closed = true;
				}
			}
		});

		const dialog = page.getByRole('dialog');
		await expect.element(dialog).toBeVisible();

		// Pressiona Escape: e.preventDefault() impede fechamento síncrono e ativa transição
		await userEvent.keyboard('{Escape}');

		// Verifica que a classe is-closing foi aplicada durante a transição
		expect(dialog.element().classList.contains('is-closing')).toBe(true);

		// Ao finalizar a animação de saída de 250ms, o diálogo fecha e o callback onclose é invocado
		await expect.element(dialog).not.toBeInTheDocument();
		expect(closed).toBe(true);
	});
});
