import { describe, it, expect } from 'vitest';
import { render } from 'svelte/server';
import { createRawSnippet } from 'svelte';
import { Input, FormField, FormStack } from '$lib/index.js';

describe('Form Primitives (FormField, Input, FormStack)', () => {
	describe('Input', () => {
		it('renders native input with default attributes and block layout', () => {
			const result = render(Input, {
				props: {
					id: 'test-email',
					name: 'email',
					type: 'email',
					placeholder: 'nome@exemplo.com'
				}
			});

			expect(result.body).toContain('<input');
			expect(result.body).toContain('type="email"');
			expect(result.body).toContain('id="test-email"');
			expect(result.body).toContain('name="email"');
			expect(result.body).toContain('placeholder="nome@exemplo.com"');
			expect(result.body).toContain('input-container');
			expect(result.body).toContain('block');
			expect(result.body).toContain('md');
		});

		it('applies sizes (sm, md, lg)', () => {
			for (const size of ['sm', 'md', 'lg'] as const) {
				const result = render(Input, {
					props: { size }
				});
				expect(result.body).toContain(`input-container ${size}`);
			}
		});

		it('applies invalid state and sets aria-invalid attribute', () => {
			const result = render(Input, {
				props: {
					invalid: true
				}
			});

			expect(result.body).toContain('invalid');
			expect(result.body).toContain('aria-invalid="true"');
		});

		it('supports disabled and readonly states', () => {
			const result = render(Input, {
				props: {
					disabled: true,
					readonly: true
				}
			});

			expect(result.body).toContain('disabled');
			expect(result.body).toContain('readonly');
			expect(result.body).toContain('disabled=""');
			expect(result.body).toContain('readonly=""');
		});

		it('renders before and after adornments', () => {
			const beforeSnippet = createRawSnippet(() => ({
				render: () => '<span class="icon-search">🔍</span>'
			}));
			const afterSnippet = createRawSnippet(() => ({
				render: () => '<button type="button" class="clear-btn">✕</button>'
			}));

			const result = render(Input, {
				props: {
					before: beforeSnippet,
					after: afterSnippet
				}
			});

			expect(result.body).toContain('icon-search');
			expect(result.body).toContain('clear-btn');
			expect(result.body).toContain('adornment before');
			expect(result.body).toContain('adornment after');
		});
	});

	describe('FormField', () => {
		const inputSnippet = createRawSnippet(() => ({
			render: () => '<input id="field-input" type="text" />'
		}));

		it('renders label associated with input via for attribute', () => {
			const result = render(FormField, {
				props: {
					label: 'Nome Completo',
					forId: 'field-input',
					children: inputSnippet
				}
			});

			expect(result.body).toContain('<label for="field-input"');
			expect(result.body).toContain('Nome Completo');
			expect(result.body).toContain('field-input');
			expect(result.body).not.toContain('required-indicator');
		});

		it('renders required indicator when required is true', () => {
			const result = render(FormField, {
				props: {
					label: 'Email',
					forId: 'field-input',
					required: true,
					children: inputSnippet
				}
			});

			expect(result.body).toContain('required-indicator');
			expect(result.body).toContain('aria-hidden="true"');
			expect(result.body).toContain('*');
		});

		it('renders helper text when provided', () => {
			const result = render(FormField, {
				props: {
					label: 'Usuário',
					forId: 'user-input',
					helper: 'Use de 3 a 16 caracteres.',
					children: inputSnippet
				}
			});

			expect(result.body).toContain('id="user-input-helper"');
			expect(result.body).toContain('helper-message');
			expect(result.body).toContain('Use de 3 a 16 caracteres.');
		});

		it('renders error message with role="alert" when error is provided', () => {
			const result = render(FormField, {
				props: {
					label: 'Senha',
					forId: 'pwd-input',
					error: 'Senha incorreta.',
					children: inputSnippet
				}
			});

			expect(result.body).toContain('id="pwd-input-error"');
			expect(result.body).toContain('error-message');
			expect(result.body).toContain('role="alert"');
			expect(result.body).toContain('Senha incorreta.');
			expect(result.body).toContain('invalid');
		});

		it('provides context to control snippet with describedby and invalid state', () => {
			const controlSnippet = createRawSnippet<
				[
					context: {
						id: string;
						describedby?: string;
						invalid: boolean;
						required: boolean;
						disabled: boolean;
					}
				]
			>((getContext) => ({
				render: () => {
					const ctx = getContext?.() ?? {
						id: '',
						invalid: false,
						required: false,
						disabled: false
					};
					return `<input id="${ctx.id}" aria-describedby="${ctx.describedby ?? ''}" aria-invalid="${ctx.invalid}" />`;
				}
			}));

			const result = render(FormField, {
				props: {
					label: 'Campo com Contexto',
					forId: 'ctx-input',
					error: 'Erro de validação',
					control: controlSnippet
				}
			});

			expect(result.body).toContain('id="ctx-input"');
			expect(result.body).toContain('aria-describedby="ctx-input-error"');
			expect(result.body).toContain('aria-invalid="true"');
		});

		it('renders extra snippet in the label row', () => {
			const extraSnippet = createRawSnippet(() => ({
				render: () => '<a href="/recover">Esqueci a senha</a>'
			}));

			const result = render(FormField, {
				props: {
					label: 'Senha',
					forId: 'pwd-input',
					extra: extraSnippet,
					children: inputSnippet
				}
			});

			expect(result.body).toContain('label-extra');
			expect(result.body).toContain('Esqueci a senha');
		});
	});

	describe('FormStack', () => {
		const childrenSnippet = createRawSnippet(() => ({
			render: () => '<div>Campos do formulário</div>'
		}));

		it('renders form tag with default gap', () => {
			const result = render(FormStack, {
				props: {
					children: childrenSnippet
				}
			});

			expect(result.body).toContain('<form');
			expect(result.body).toContain('form-stack');
			expect(result.body).toContain('gap-md');
			expect(result.body).toContain('Campos do formulário');
		});

		it('supports custom gaps (xs, sm, md, lg)', () => {
			for (const gap of ['xs', 'sm', 'md', 'lg'] as const) {
				const result = render(FormStack, {
					props: {
						gap,
						children: childrenSnippet
					}
				});
				expect(result.body).toContain(`gap-${gap}`);
			}
		});
	});
});
