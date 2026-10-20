import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Input from '$lib/components/forms/Input.svelte';

describe('Input Interactive Browser Component Test', () => {
	it('renders text input and responds to user typing', async () => {
		const handleInput = vi.fn();
		render(Input, {
			props: {
				placeholder: 'Digite seu nome',
				oninput: handleInput
			}
		});

		const input = page.getByPlaceholder('Digite seu nome');
		await expect.element(input).toBeVisible();

		await input.fill('Lucas Monsan');
		await expect.element(input).toHaveValue('Lucas Monsan');
		expect(handleInput).toHaveBeenCalled();
	});

	it('respects disabled state and prevents user typing', async () => {
		render(Input, {
			props: {
				placeholder: 'Campo desabilitado',
				disabled: true
			}
		});

		const input = page.getByPlaceholder('Campo desabilitado');
		await expect.element(input).toBeDisabled();
	});

	it('respects readonly state and prevents value mutation', async () => {
		render(Input, {
			props: {
				placeholder: 'Apenas leitura',
				value: 'Fixo',
				readonly: true
			}
		});

		const input = page.getByPlaceholder('Apenas leitura');
		await expect.element(input).toHaveAttribute('readonly');
		await expect.element(input).toHaveValue('Fixo');
	});

	it('renders invalid state with aria-invalid="true"', async () => {
		render(Input, {
			props: {
				placeholder: 'Campo com erro',
				invalid: true
			}
		});

		const input = page.getByPlaceholder('Campo com erro');
		await expect.element(input).toHaveAttribute('aria-invalid', 'true');
	});
});
