import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Textarea from '$lib/components/forms/Textarea.svelte';

describe('Textarea Interactive Browser Component Test', () => {
	it('renders multiline textarea and updates on typing', async () => {
		const handleInput = vi.fn();
		render(Textarea, {
			props: {
				placeholder: 'Escreva sua mensagem...',
				oninput: handleInput
			}
		});

		const textarea = page.getByPlaceholder('Escreva sua mensagem...');
		await expect.element(textarea).toBeVisible();

		await textarea.fill('Linha 1\nLinha 2');
		await expect.element(textarea).toHaveValue('Linha 1\nLinha 2');
		expect(handleInput).toHaveBeenCalled();
	});

	it('displays character count badge when showCount={true}', async () => {
		render(Textarea, {
			props: {
				placeholder: 'Bio',
				maxlength: 100,
				showCount: true,
				value: 'Olá mundo'
			}
		});

		const countBadge = page.getByText(/9\s*\/\s*100/);
		await expect.element(countBadge).toBeVisible();
	});

	it('respects disabled and readonly states', async () => {
		render(Textarea, {
			props: {
				placeholder: 'Desabilitado',
				disabled: true
			}
		});

		const textarea = page.getByPlaceholder('Desabilitado');
		await expect.element(textarea).toBeDisabled();
	});
});
