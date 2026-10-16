import { describe, it, expect } from 'vitest';
import { render } from 'svelte/server';
import Button from '$lib/components/actions/Button.svelte';
import IconButton from '$lib/components/actions/IconButton.svelte';
import { createRawSnippet } from 'svelte';

describe('Button Primitive', () => {
	it('renders semantic <button> with clean classes and children', () => {
		const childrenSnippet = createRawSnippet(() => ({
			render: () => 'Salvar Registro'
		}));

		const result = render(Button, {
			props: {
				children: childrenSnippet
			}
		});

		expect(result.body).toContain('<button');
		expect(result.body).not.toContain('shellfish-button');
		expect(result.body).toContain('primary');
		expect(result.body).toContain('md');
		expect(result.body).toContain('Salvar Registro');
		expect(result.body).toContain('type="button"');
	});

	it('renders all variants correctly including error, warning, success', () => {
		const variants = [
			'primary',
			'secondary',
			'outline',
			'ghost',
			'danger',
			'error',
			'warning',
			'success'
		] as const;

		for (const variant of variants) {
			const result = render(Button, {
				props: { variant }
			});
			// error aliases to danger class
			const expectedClass = variant === 'error' ? 'danger' : variant;
			expect(result.body).toContain(expectedClass);
		}
	});

	it('renders all sizes correctly', () => {
		const sizes = ['sm', 'md', 'lg'] as const;

		for (const size of sizes) {
			const result = render(Button, {
				props: { size }
			});
			expect(result.body).toContain(size);
		}
	});

	it('supports block and square props', () => {
		const blockBtn = render(Button, { props: { block: true } });
		expect(blockBtn.body).toContain('block');

		const squareBtn = render(Button, { props: { square: true } });
		expect(squareBtn.body).toContain('square');
	});

	it('supports label prop when children is omitted', () => {
		const result = render(Button, { props: { label: 'Ação Rápida' } });
		expect(result.body).toContain('Ação Rápida');
	});

	it('supports free composition of icons and text via children', () => {
		const childrenSnippet = createRawSnippet(() => ({
			render: () =>
				'<svg id="icon-lead"></svg><span>Confirmar Ação</span><svg id="icon-trail"></svg>'
		}));

		const result = render(Button, {
			props: {
				children: childrenSnippet
			}
		});

		expect(result.body).toContain('id="icon-lead"');
		expect(result.body).toContain('Confirmar Ação');
		expect(result.body).toContain('id="icon-trail"');
	});

	it('applies disabled state when disabled={true}', () => {
		const result = render(Button, {
			props: {
				disabled: true
			}
		});

		expect(result.body).toContain('disabled=""');
	});

	it('applies loading classes and Option B dissolving spinner when loading={true}', () => {
		const childrenSnippet = createRawSnippet(() => ({
			render: () => 'Processando'
		}));

		const result = render(Button, {
			props: {
				loading: true,
				children: childrenSnippet
			}
		});

		expect(result.body).toContain('loading');
		expect(result.body).toContain('aria-busy="true"');
		expect(result.body).toContain('disabled=""');
		expect(result.body).toContain('spinner');
		expect(result.body).toContain('role="status"');
	});

	it('supports custom type and ariaLabel', () => {
		const result = render(Button, {
			props: {
				type: 'submit',
				ariaLabel: 'Enviar formulário'
			}
		});

		expect(result.body).toContain('type="submit"');
		expect(result.body).toContain('aria-label="Enviar formulário"');
	});
});

describe('IconButton Primitive', () => {
	it('renders accessible square button with label and title', () => {
		const iconSnippet = createRawSnippet(() => ({
			render: () => '<svg id="test-icon"></svg>'
		}));

		const result = render(IconButton, {
			props: {
				label: 'Excluir Item',
				children: iconSnippet
			}
		});

		expect(result.body).toContain('square');
		expect(result.body).toContain('aria-label="Excluir Item"');
		expect(result.body).toContain('title="Excluir Item"');
		expect(result.body).not.toContain('aria-pressed');
		expect(result.body).toContain('id="test-icon"');
	});

	it('renders aria-pressed only when selected is explicitly provided', () => {
		const iconSnippet = createRawSnippet(() => ({
			render: () => '<svg></svg>'
		}));

		const pressed = render(IconButton, {
			props: {
				label: 'Favoritar',
				selected: true,
				children: iconSnippet
			}
		});
		expect(pressed.body).toContain('aria-pressed="true"');

		const unpressed = render(IconButton, {
			props: {
				label: 'Favoritar',
				selected: false,
				children: iconSnippet
			}
		});
		expect(unpressed.body).toContain('aria-pressed="false"');
	});

	it('displays notification count badge when count > 0', () => {
		const iconSnippet = createRawSnippet(() => ({
			render: () => '<svg></svg>'
		}));

		const result = render(IconButton, {
			props: {
				label: 'Notificações',
				count: 5,
				children: iconSnippet
			}
		});

		expect(result.body).toContain('badge');
		expect(result.body).toContain('5');
		expect(result.body).toContain('aria-label="Notificações: 5"');
	});
});
