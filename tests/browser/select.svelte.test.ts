import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';
import Select from '$lib/components/forms/Select.svelte';

describe('Select Interactive Browser Component Test', () => {
	const sampleOptions = [
		{ value: 'svelte', label: 'Svelte' },
		{ value: 'react', label: 'React' },
		{ value: 'vue', label: 'Vue', disabled: true }
	];

	it('opens listbox options on trigger click and selects an option', async () => {
		render(Select, {
			props: {
				options: sampleOptions,
				placeholder: 'Escolha uma biblioteca'
			}
		});

		const trigger = page.getByRole('combobox');
		await expect.element(trigger).toBeVisible();
		await expect.element(trigger).toHaveTextContent('Escolha uma biblioteca');

		// Clica para abrir o popover
		await trigger.click();

		const svelteOption = page.getByRole('option', { name: 'Svelte' });
		await expect.element(svelteOption).toBeVisible();

		// Clica na opção
		await svelteOption.click();

		// O trigger agora deve exibir o valor selecionado
		await expect.element(trigger).toHaveTextContent('Svelte');
	});

	it('dispatches change event synchronously when option is selected via custom listbox', async () => {
		let changedValue: string | null = null;
		render(Select, {
			props: {
				options: sampleOptions,
				placeholder: 'Escolha uma biblioteca',
				onchange: (e: Event) => {
					changedValue = (e.target as HTMLSelectElement).value;
				}
			}
		});

		const trigger = page.getByRole('combobox');
		await trigger.click();

		const reactOption = page.getByRole('option', { name: 'React' });
		await reactOption.click();

		expect(changedValue).toBe('react');
	});

	it('closes listbox when Escape is pressed', async () => {
		render(Select, {
			props: {
				options: sampleOptions,
				placeholder: 'Escolha uma biblioteca'
			}
		});

		const trigger = page.getByRole('combobox');
		await trigger.click();

		const listbox = page.getByRole('listbox');
		await expect.element(listbox).toBeVisible();

		await userEvent.keyboard('{Escape}');
		await expect.element(listbox).not.toBeInTheDocument();
	});
});
