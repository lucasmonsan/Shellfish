import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Button from '$lib/components/actions/Button.svelte';

describe('Button Interactive Browser Component Test', () => {
	it('renders and dispatches click event when clicked', async () => {
		const handleClick = vi.fn();
		render(Button, {
			props: {
				label: 'Clique aqui',
				onclick: handleClick
			}
		});

		const button = page.getByRole('button', { name: 'Clique aqui' });
		await expect.element(button).toBeVisible();

		await button.click();
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('does not dispatch click when disabled', async () => {
		const handleClick = vi.fn();
		render(Button, {
			props: {
				label: 'Desabilitado',
				disabled: true,
				onclick: handleClick
			}
		});

		const button = page.getByRole('button', { name: 'Desabilitado' });
		await button.click({ force: true });
		expect(handleClick).not.toHaveBeenCalled();
	});

	it('activates loading state and morphing when clicked with async handler', async () => {
		let resolvePromise: () => void;
		const asyncAction = vi.fn(
			() =>
				new Promise<void>((res) => {
					resolvePromise = res;
				})
		);

		render(Button, {
			props: {
				label: 'Salvar',
				onclick: asyncAction
			}
		});

		const button = page.getByRole('button', { name: 'Salvar' });
		await button.click();

		// O botão deve entrar em aria-busy="true"
		await expect.element(button).toHaveAttribute('aria-busy', 'true');

		resolvePromise!();
	});
});
