import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import DatePicker from '$lib/components/forms/DatePicker.svelte';

describe('DatePicker Interactive Browser Component Test', () => {
	it('renders date input and accepts date string change', async () => {
		const handleChange = vi.fn();
		render(DatePicker, {
			props: {
				value: '2026-10-19',
				onchange: handleChange
			}
		});

		const dateInput = page.getByRole('textbox');
		await expect.element(dateInput).toBeVisible();
		await expect.element(dateInput).toHaveValue('2026-10-19');

		await dateInput.fill('2026-12-31');
		await expect.element(dateInput).toHaveValue('2026-12-31');
	});

	it('honors min, max, and disabled attributes', async () => {
		render(DatePicker, {
			props: {
				min: '2026-01-01',
				max: '2026-12-31',
				disabled: true
			}
		});

		const dateInput = page.getByRole('textbox');
		await expect.element(dateInput).toBeDisabled();
		await expect.element(dateInput).toHaveAttribute('min', '2026-01-01');
		await expect.element(dateInput).toHaveAttribute('max', '2026-12-31');
	});
});
