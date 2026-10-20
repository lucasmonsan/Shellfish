import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Radio from '$lib/components/forms/Radio.svelte';

describe('Radio and RadioGroup Interactive Browser Component Test', () => {
	it('renders standalone radio and handles selection on label click', async () => {
		const handleChange = vi.fn();
		render(Radio, {
			props: {
				label: 'Opção Alpha',
				value: 'alpha',
				name: 'demo-radio',
				onchange: handleChange
			}
		});

		const radioInput = page.getByRole('radio', { name: 'Opção Alpha' });
		await expect.element(radioInput).not.toBeChecked();

		await page.getByText('Opção Alpha').click();
		await expect.element(radioInput).toBeChecked();
		expect(handleChange).toHaveBeenCalled();
	});

	it('disables radio interaction when disabled={true}', async () => {
		const handleChange = vi.fn();
		render(Radio, {
			props: {
				label: 'Opção Inativa',
				value: 'inactive',
				disabled: true,
				onchange: handleChange
			}
		});

		const radioInput = page.getByRole('radio', { name: 'Opção Inativa' });
		await expect.element(radioInput).toBeDisabled();

		await page.getByText('Opção Inativa').click({ force: true });
		await expect.element(radioInput).not.toBeChecked();
		expect(handleChange).not.toHaveBeenCalled();
	});
});
