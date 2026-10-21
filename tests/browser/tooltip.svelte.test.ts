import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';
import { createRawSnippet } from 'svelte';
import Tooltip from '$lib/components/overlay/Tooltip.svelte';
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

	it('passes aria-describedby to children snippet when active', async () => {
		render(Tooltip, {
			props: {
				text: 'Dica via children',
				delay: 0,
				style: 'margin-top: 80px;',
				children: createRawSnippet<[ariaDescribedBy: string | undefined]>((describedBy) => ({
					render: () =>
						`<button type="button" aria-describedby="${describedBy() || ''}">Botão com Children</button>`
				}))
			}
		});

		const btn = page.getByRole('button', { name: 'Botão com Children' });
		await btn.hover();

		const tooltip = page.getByRole('tooltip');
		await expect.element(tooltip).toBeVisible();
		await expect.element(btn).toHaveAttribute('aria-describedby');
	});

	it('allows pointer hover directly over the tooltip bubble without disappearing (WCAG 2.1 SC 1.4.13)', async () => {
		render(TooltipTestFixture);

		const triggerBtn = page.getByRole('button', { name: 'Ação com Dica' });
		await triggerBtn.hover();

		const tooltip = page.getByRole('tooltip');
		await expect.element(tooltip).toBeVisible();

		// Move o ponteiro diretamente sobre a bolha do tooltip
		await tooltip.hover();
		// O tooltip deve permanecer visível!
		await expect.element(tooltip).toBeVisible();
	});

	it('cancels scheduled RAF when pointer leaves immediately without flickering', async () => {
		render(Tooltip, {
			props: {
				text: 'Dica rápida',
				delay: 0,
				children: createRawSnippet(() => ({
					render: () => '<button type="button">Alvo Rápido</button>'
				}))
			}
		});

		const btn = page.getByRole('button', { name: 'Alvo Rápido' });

		// Simula entrada e saída imediata no mesmo ciclo de eventos (flicker)
		btn.element().dispatchEvent(new PointerEvent('pointerenter', { bubbles: true }));
		btn.element().dispatchEvent(new PointerEvent('pointerleave', { bubbles: true }));

		// Aguarda a resolução dos frames de animação
		await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

		// O tooltip não deve ter a classe .visible
		const tooltipEl = document.querySelector('[role="tooltip"]');
		if (tooltipEl) {
			expect(tooltipEl.classList.contains('visible')).toBe(false);
		}
	});

	it('smoothly unmounts tooltip bubble after pointer leaves', async () => {
		render(Tooltip, {
			props: {
				text: 'Dica com Saída',
				delay: 0,
				children: createRawSnippet(() => ({
					render: () => '<button type="button">Alvo Saída</button>'
				}))
			}
		});

		const btn = page.getByRole('button', { name: 'Alvo Saída' });
		await btn.hover();

		const tooltip = page.getByRole('tooltip');
		await expect.element(tooltip).toBeVisible();

		// Desloca o ponteiro para fora do elemento
		btn.element().dispatchEvent(new PointerEvent('pointerleave', { bubbles: true }));

		// Após a transição de saída (200ms), a bolha deve ser desmontada do DOM
		await expect.element(tooltip).not.toBeInTheDocument();
	});
});
