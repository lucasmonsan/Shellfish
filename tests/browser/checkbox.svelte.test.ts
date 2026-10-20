import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Checkbox from '$lib/components/forms/Checkbox.svelte';

describe('Checkbox Interactive Browser Component Test', () => {
	it('renders semantic checkbox and toggles checked state on clicking label', async () => {
		const handleChange = vi.fn();
		render(Checkbox, {
			props: {
				label: 'Aceito os termos',
				checked: false,
				onchange: handleChange
			}
		});

		const checkboxInput = page.getByRole('checkbox', { name: 'Aceito os termos' });
		await expect.element(checkboxInput).not.toBeChecked();

		// Clica no rótulo visível
		await page.getByText('Aceito os termos').click();
		await expect.element(checkboxInput).toBeChecked();
		expect(handleChange).toHaveBeenCalled();
	});

	it('does not toggle when disabled', async () => {
		const handleChange = vi.fn();
		render(Checkbox, {
			props: {
				label: 'Termos desabilitados',
				checked: false,
				disabled: true,
				onchange: handleChange
			}
		});

		const checkboxInput = page.getByRole('checkbox', { name: 'Termos desabilitados' });
		await expect.element(checkboxInput).toBeDisabled();

		await page.getByText('Termos desabilitados').click({ force: true });
		await expect.element(checkboxInput).not.toBeChecked();
		expect(handleChange).not.toHaveBeenCalled();
	});

	it('renders invalid state with aria-invalid="true"', async () => {
		render(Checkbox, {
			props: {
				label: 'Campo obrigatório',
				invalid: true
			}
		});

		const checkboxInput = page.getByRole('checkbox', { name: 'Campo obrigatório' });
		await expect.element(checkboxInput).toHaveAttribute('aria-invalid', 'true');
	});
});
