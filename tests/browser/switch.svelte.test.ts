import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Switch from '$lib/components/forms/Switch.svelte';

describe('Switch Interactive Browser Component Test', () => {
	it('renders semantic switch and toggles state on clicking label', async () => {
		const handleChange = vi.fn();
		render(Switch, {
			props: {
				label: 'Modo escuro',
				checked: false,
				onchange: handleChange
			}
		});

		const switchInput = page.getByRole('switch', { name: 'Modo escuro' });
		await expect.element(switchInput).not.toBeChecked();
		await expect.element(switchInput).toHaveAttribute('aria-checked', 'false');

		// Clica no rótulo visível do switch
		await page.getByText('Modo escuro').click();
		await expect.element(switchInput).toBeChecked();
		await expect.element(switchInput).toHaveAttribute('aria-checked', 'true');
		expect(handleChange).toHaveBeenCalled();
	});

	it('honors disabled state and prevents toggle', async () => {
		const handleChange = vi.fn();
		render(Switch, {
			props: {
				label: 'Configuração travada',
				checked: false,
				disabled: true,
				onchange: handleChange
			}
		});

		const switchInput = page.getByRole('switch', { name: 'Configuração travada' });
		await expect.element(switchInput).toBeDisabled();

		await page.getByText('Configuração travada').click({ force: true });
		await expect.element(switchInput).not.toBeChecked();
		expect(handleChange).not.toHaveBeenCalled();
	});
});
