import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import FileUpload from '$lib/components/forms/FileUpload.svelte';

describe('FileUpload Interactive Browser Component Test', () => {
	it('renders dropzone button and displays initial files', async () => {
		const testFile = new File(['conteúdo'], 'documento.pdf', { type: 'application/pdf' });

		render(FileUpload, {
			props: {
				label: 'Documentos',
				primaryText: 'Arraste seu arquivo',
				files: [testFile]
			}
		});

		await expect.element(page.getByText('Arraste seu arquivo')).toBeVisible();
		await expect.element(page.getByText('documento.pdf')).toBeVisible();
	});

	it('removes file from list on delete button click', async () => {
		const file1 = new File(['1'], 'arquivo1.png', { type: 'image/png' });
		const file2 = new File(['2'], 'arquivo2.png', { type: 'image/png' });
		const handleFiles = vi.fn();

		render(FileUpload, {
			props: {
				files: [file1, file2],
				onfiles: handleFiles
			}
		});

		await expect.element(page.getByText('arquivo1.png')).toBeVisible();
		await expect.element(page.getByText('arquivo2.png')).toBeVisible();

		const removeBtn = page.getByRole('button', { name: 'Remover arquivo1.png' });
		await removeBtn.click();

		await expect.element(page.getByText('arquivo1.png')).not.toBeInTheDocument();
		await expect.element(page.getByText('arquivo2.png')).toBeVisible();
		expect(handleFiles).toHaveBeenCalled();
	});
});
