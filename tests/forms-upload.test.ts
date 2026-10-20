import { describe, it, expect } from 'vitest';
import { render } from 'svelte/server';
import { createRawSnippet } from 'svelte';
import { FileUpload } from '$lib/index.js';

describe('FileUpload / Dropzone Primitive (FileUpload)', () => {
	it('renders accessible dropzone button and hidden native file input', () => {
		const result = render(FileUpload, {
			props: {
				label: 'Enviar documentos',
				primaryText: 'Clique ou arraste seus arquivos',
				accept: '.pdf,.png',
				maxSizeMb: 10,
				multiple: true
			}
		});

		expect(result.body).toContain('file-upload-root');
		expect(result.body).toContain('type="file"');
		expect(result.body).toContain('accept=".pdf,.png"');
		expect(result.body).toContain('multiple');
		expect(result.body).toContain('role="button"');
		expect(result.body).toContain('tabindex="0"');
		expect(result.body).toContain('aria-label="Enviar documentos"');
		expect(result.body).toContain('Clique ou arraste seus arquivos');
		expect(result.body).toContain('.pdf, .png até 10MB');
	});

	it('renders custom secondaryText when explicitly provided', () => {
		const result = render(FileUpload, {
			props: {
				primaryText: 'Selecione a imagem',
				secondaryText: 'Apenas avatares quadrados até 2MB'
			}
		});

		expect(result.body).toContain('Selecione a imagem');
		expect(result.body).toContain('Apenas avatares quadrados até 2MB');
	});

	it('renders custom children snippet inside dropzone when provided', () => {
		const customContent = createRawSnippet(() => ({
			render: () => '<span class="custom-drop-prompt">Solte o CSV aqui</span>'
		}));

		const result = render(FileUpload, {
			props: {
				children: customContent
			}
		});

		expect(result.body).toContain('custom-drop-prompt');
		expect(result.body).toContain('Solte o CSV aqui');
	});

	it('applies disabled and invalid states', () => {
		const result = render(FileUpload, {
			props: {
				disabled: true,
				invalid: true
			}
		});

		expect(result.body).toContain('disabled');
		expect(result.body).toContain('aria-disabled="true"');
		expect(result.body).toContain('tabindex="-1"');
		expect(result.body).toContain('invalid');
	});
});
