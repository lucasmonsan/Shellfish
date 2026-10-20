import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';
import Tags from '$lib/components/forms/Tags.svelte';

describe('Tags Interactive Browser Component Test', () => {
	it('adds a tag on typing and pressing Enter', async () => {
		render(Tags, {
			props: {
				tags: ['HTML', 'CSS']
			}
		});

		await expect.element(page.getByText('HTML')).toBeVisible();
		await expect.element(page.getByText('CSS')).toBeVisible();

		const input = page.getByRole('textbox');
		await input.fill('JavaScript');
		await userEvent.keyboard('{Enter}');

		await expect.element(page.getByText('JavaScript')).toBeVisible();
	});

	it('removes tag on clicking remove button', async () => {
		render(Tags, {
			props: {
				tags: ['TypeScript', 'Rust']
			}
		});

		const tsTag = page.getByText('TypeScript');
		await expect.element(tsTag).toBeVisible();

		// Clica no botão de remover do primeiro chip
		const removeBtn = page.getByRole('button', { name: 'Remover' }).first();
		await removeBtn.click();

		await expect.element(tsTag).not.toBeInTheDocument();
		await expect.element(page.getByText('Rust')).toBeVisible();
	});
});
