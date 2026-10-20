import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import ColorPicker from '$lib/components/forms/ColorPicker.svelte';

describe('ColorPicker Interactive Browser Component Test', () => {
	it('opens popover panel on click and selects a color preset', async () => {
		render(ColorPicker, {
			props: {
				value: '#b94b38',
				presets: ['#b94b38', '#2b6140', '#e09f2d']
			}
		});

		const trigger = page.getByRole('button', { name: /Seletor de cor/i });
		await expect.element(trigger).toBeVisible();

		// Clica para abrir a grade de cores
		await trigger.click();

		const greenOption = page.getByRole('radio', { name: /#2b6140/i });
		await expect.element(greenOption).toBeVisible();

		await greenOption.click();

		// O trigger deve refletir a nova cor selecionada
		await expect.element(page.getByRole('button', { name: /#2b6140/i })).toBeVisible();
	});

	it('disables interaction when disabled={true}', async () => {
		render(ColorPicker, {
			props: {
				disabled: true
			}
		});

		const trigger = page.getByRole('button', { name: /Seletor de cor/i });
		await expect.element(trigger).toBeDisabled();
	});
});
