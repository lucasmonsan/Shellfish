import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import TimePicker from '$lib/components/forms/TimePicker.svelte';

describe('TimePicker Interactive Browser Component Test', () => {
	it('renders time input and accepts time string change', async () => {
		const handleChange = vi.fn();
		render(TimePicker, {
			props: {
				value: '14:30',
				onchange: handleChange
			}
		});

		const timeInput = page.getByRole('textbox');
		await expect.element(timeInput).toBeVisible();
		await expect.element(timeInput).toHaveValue('14:30');

		await timeInput.fill('18:00');
		await expect.element(timeInput).toHaveValue('18:00');
	});

	it('honors disabled attribute', async () => {
		render(TimePicker, {
			props: {
				disabled: true
			}
		});

		const timeInput = page.getByRole('textbox');
		await expect.element(timeInput).toBeDisabled();
	});
});
