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

	it('skips disabled options during keyboard navigation according to WAI-ARIA APG', async () => {
		const navOptions = [
			{ value: 'opt1', label: 'Option 1' },
			{ value: 'opt2', label: 'Option 2 (Disabled)', disabled: true },
			{ value: 'opt3', label: 'Option 3' }
		];

		render(Select, {
			props: {
				options: navOptions,
				placeholder: 'Select an option'
			}
		});

		const trigger = page.getByRole('combobox');
		trigger.element().focus();

		// ArrowDown abre a lista e foca Option 1
		await userEvent.keyboard('{ArrowDown}');
		const listbox = page.getByRole('listbox');
		await expect.element(listbox).toBeVisible();

		const opt1 = page.getByRole('option', { name: 'Option 1' });
		const opt2 = page.getByRole('option', { name: 'Option 2 (Disabled)' });
		const opt3 = page.getByRole('option', { name: 'Option 3' });

		await expect.element(opt1).toHaveClass(/focused/);

		// ArrowDown pula Option 2 (disabled) e foca diretamente Option 3
		await userEvent.keyboard('{ArrowDown}');
		await expect.element(opt2).not.toHaveClass(/focused/);
		await expect.element(opt3).toHaveClass(/focused/);

		// Pressiona Enter para selecionar Option 3
		await userEvent.keyboard('{Enter}');
		await expect.element(listbox).not.toBeInTheDocument();
		await expect.element(trigger).toHaveTextContent('Option 3');
	});
});
