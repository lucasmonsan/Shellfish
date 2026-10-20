import { describe, it, expect } from 'vitest';
import { render } from 'svelte/server';
import { Select, Textarea } from '$lib/index.js';

describe('Text & Combobox Form Primitives (Select, Textarea)', () => {
	const sampleOptions = [
		{ value: 'br', label: 'Brasil' },
		{ value: 'us', label: 'Estados Unidos' },
		{ value: 'es', label: 'Espanha', disabled: true }
	];

	describe('Select', () => {
		it('renders WAI-ARIA combobox trigger with placeholder when no value is selected', () => {
			const result = render(Select, {
				props: {
					id: 'country-select',
					options: sampleOptions,
					placeholder: 'Selecione um país...'
				}
			});

			expect(result.body).toContain('role="combobox"');
			expect(result.body).toContain('aria-haspopup="listbox"');
			expect(result.body).toContain('id="country-select"');
			expect(result.body).toContain('Selecione um país...');
			expect(result.body).toContain('has-placeholder');
			expect(result.body).toContain('select-trigger md');
			expect(result.body).toContain('block');
		});

		it('displays selected option label when value matches an option', () => {
			const result = render(Select, {
				props: {
					options: sampleOptions,
					value: 'br',
					placeholder: 'Selecione um país...'
				}
			});

			expect(result.body).toContain('Brasil');
			expect(result.body).not.toContain('has-placeholder');
		});

		it('applies size presets (sm, md, lg)', () => {
			for (const size of ['sm', 'md', 'lg'] as const) {
				const result = render(Select, {
					props: {
						options: sampleOptions,
						size
					}
				});
				expect(result.body).toContain(`select-trigger ${size}`);
			}
		});

		it('applies disabled and invalid states with aria-invalid', () => {
			const result = render(Select, {
				props: {
					options: sampleOptions,
					disabled: true,
					invalid: true
				}
			});

			expect(result.body).toContain('disabled');
			expect(result.body).toContain('invalid');
			expect(result.body).toContain('aria-invalid="true"');
		});
	});

	describe('Textarea', () => {
		it('renders native textarea with default rows and block layout', () => {
			const result = render(Textarea, {
				props: {
					id: 'bio-textarea',
					placeholder: 'Escreva sua bio...'
				}
			});

			expect(result.body).toContain('<textarea');
			expect(result.body).toContain('id="bio-textarea"');
			expect(result.body).toContain('rows="3"');
			expect(result.body).toContain('placeholder="Escreva sua bio..."');
			expect(result.body).toContain('textarea-container md');
			expect(result.body).toContain('block');
		});

		it('applies size presets (sm, md, lg) and custom rows', () => {
			for (const size of ['sm', 'md', 'lg'] as const) {
				const result = render(Textarea, {
					props: { size, rows: 5 }
				});
				expect(result.body).toContain(`textarea-container ${size}`);
				expect(result.body).toContain('rows="5"');
			}
		});

		it('renders character counter when showCount is true and tracks maxlength thresholds', () => {
			const normalResult = render(Textarea, {
				props: {
					value: 'Shellfish UI',
					maxlength: 100,
					showCount: true
				}
			});
			expect(normalResult.body).toContain('has-count');
			expect(normalResult.body).toContain('count-badge');
			expect(normalResult.body).toContain('12 / 100');

			const warningResult = render(Textarea, {
				props: {
					value: '123456789',
					maxlength: 10,
					showCount: true
				}
			});
			expect(warningResult.body).toContain('9 / 10');
			expect(warningResult.body).toContain('warning');

			const overLimitResult = render(Textarea, {
				props: {
					value: '12345678901',
					maxlength: 10,
					showCount: true
				}
			});
			expect(overLimitResult.body).toContain('11 / 10');
			expect(overLimitResult.body).toContain('danger');
			expect(overLimitResult.body).toContain('aria-invalid="true"');
		});

		it('applies disabled, readonly, and invalid states', () => {
			const result = render(Textarea, {
				props: {
					disabled: true,
					readonly: true,
					invalid: true
				}
			});

			expect(result.body).toContain('disabled');
			expect(result.body).toContain('readonly');
			expect(result.body).toContain('invalid');
			expect(result.body).toContain('aria-invalid="true"');
		});
	});
});
