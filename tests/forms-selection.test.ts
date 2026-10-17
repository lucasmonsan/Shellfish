import { describe, it, expect } from 'vitest';
import { render } from 'svelte/server';
import { createRawSnippet } from 'svelte';
import { Checkbox, Radio, RadioGroup, Switch } from '$lib/index.js';

describe('Selection Controls (Checkbox, Radio, RadioGroup, Switch)', () => {
	describe('Checkbox', () => {
		it('renders native checkbox with default attributes', () => {
			const result = render(Checkbox, {
				props: {
					id: 'test-chk',
					name: 'terms',
					label: 'Aceito os termos'
				}
			});

			expect(result.body).toContain('<input');
			expect(result.body).toContain('type="checkbox"');
			expect(result.body).toContain('id="test-chk"');
			expect(result.body).toContain('name="terms"');
			expect(result.body).toContain('Aceito os termos');
			expect(result.body).toContain('checkbox-root md');
			// HTML-AAM: Não deve ter aria-checked em input nativo
			expect(result.body).not.toContain('aria-checked');
		});

		it('supports checked state natively', () => {
			const result = render(Checkbox, {
				props: {
					checked: true,
					label: 'Opção marcada'
				}
			});

			expect(result.body).toContain('checkbox-root');
			expect(result.body).toContain('checked');
			expect(result.body).toContain('checked=""');
			expect(result.body).not.toContain('aria-checked');
		});

		it('supports indeterminate state and renders visual indicator', () => {
			const result = render(Checkbox, {
				props: {
					indeterminate: true,
					label: 'Parcialmente selecionado'
				}
			});

			expect(result.body).toContain('indeterminate');
			expect(result.body).toContain('<line x1="3.5" y1="8" x2="12.5" y2="8"');
			// HTML-AAM: Indeterminate nativo é IDL, não atributo HTML aria-checked
			expect(result.body).not.toContain('aria-checked');
		});

		it('applies sizes (sm, md, lg)', () => {
			for (const size of ['sm', 'md', 'lg'] as const) {
				const result = render(Checkbox, {
					props: { size, label: `Size ${size}` }
				});
				expect(result.body).toContain(`checkbox-root ${size}`);
			}
		});

		it('supports disabled and invalid states', () => {
			const result = render(Checkbox, {
				props: {
					disabled: true,
					invalid: true,
					label: 'Desabilitado com erro'
				}
			});

			expect(result.body).toContain('disabled');
			expect(result.body).toContain('invalid');
			expect(result.body).toContain('disabled=""');
			expect(result.body).toContain('aria-invalid="true"');
		});

		it('renders custom children snippet instead of label prop', () => {
			const childSnippet = createRawSnippet(() => ({
				render: () => '<span class="custom-chk">Custom Label</span>'
			}));

			const result = render(Checkbox, {
				props: {
					children: childSnippet
				}
			});

			expect(result.body).toContain('custom-chk');
			expect(result.body).toContain('Custom Label');
		});
	});

	describe('Radio', () => {
		it('renders native radio with value and name', () => {
			const result = render(Radio, {
				props: {
					name: 'plan',
					value: 'pro',
					label: 'Plano Pro'
				}
			});

			expect(result.body).toContain('<input');
			expect(result.body).toContain('type="radio"');
			expect(result.body).toContain('name="plan"');
			expect(result.body).toContain('value="pro"');
			expect(result.body).toContain('Plano Pro');
			expect(result.body).toContain('radio-root md');
		});

		it('detects checked state when group matches value', () => {
			const result = render(Radio, {
				props: {
					name: 'plan',
					value: 'pro',
					group: 'pro',
					label: 'Selecionado'
				}
			});

			expect(result.body).toContain('checked');
			expect(result.body).toContain('checked=""');
		});

		it('applies sizes and states', () => {
			for (const size of ['sm', 'md', 'lg'] as const) {
				const result = render(Radio, {
					props: { size, value: 'test' }
				});
				expect(result.body).toContain(`radio-root ${size}`);
			}

			const invalidResult = render(Radio, {
				props: { invalid: true, disabled: true, value: 'err' }
			});
			expect(invalidResult.body).toContain('invalid');
			expect(invalidResult.body).toContain('disabled');
			expect(invalidResult.body).toContain('disabled=""');
		});
	});

	describe('RadioGroup', () => {
		it('renders semantic radiogroup role with orientation', () => {
			const result = render(RadioGroup, {
				props: {
					label: 'Escolha uma opção',
					orientation: 'horizontal',
					gap: 'md'
				}
			});

			expect(result.body).toContain('role="radiogroup"');
			expect(result.body).toContain('aria-label="Escolha uma opção"');
			expect(result.body).toContain('radiogroup-root horizontal');
			expect(result.body).toContain('radiogroup-label');
			expect(result.body).toContain('Escolha uma opção');
		});

		it('propagates value and name to nested child radios via context', () => {
			const children = createRawSnippet(() => ({
				render: () => `
					<label class="radio-root md checked">
						<input type="radio" name="billing" value="monthly" checked="" />
						<span class="label-text">Mensal</span>
					</label>
					<label class="radio-root md">
						<input type="radio" name="billing" value="annual" />
						<span class="label-text">Anual</span>
					</label>
				`
			}));

			const result = render(RadioGroup, {
				props: {
					name: 'billing',
					value: 'monthly',
					children
				}
			});

			expect(result.body).toContain('name="billing"');
			expect(result.body).toContain('value="monthly"');
			expect(result.body).toContain('Mensal');
			expect(result.body).toContain('Anual');
		});
	});

	describe('Switch', () => {
		it('renders native checkbox with role="switch"', () => {
			const result = render(Switch, {
				props: {
					id: 'theme-switch',
					label: 'Modo escuro'
				}
			});

			expect(result.body).toContain('<input');
			expect(result.body).toContain('type="checkbox"');
			expect(result.body).toContain('role="switch"');
			expect(result.body).toContain('id="theme-switch"');
			expect(result.body).toContain('Modo escuro');
			expect(result.body).toContain('switch-root md');
			expect(result.body).toContain('aria-checked="false"');
		});

		it('supports checked state and aria-checked', () => {
			const result = render(Switch, {
				props: {
					checked: true,
					label: 'Ativado'
				}
			});

			expect(result.body).toContain('switch-root');
			expect(result.body).toContain('checked');
			expect(result.body).toContain('checked=""');
			expect(result.body).toContain('aria-checked="true"');
		});

		it('applies sizes (sm, md, lg)', () => {
			for (const size of ['sm', 'md', 'lg'] as const) {
				const result = render(Switch, {
					props: { size }
				});
				expect(result.body).toContain(`switch-root ${size}`);
			}
		});

		it('supports disabled and invalid states', () => {
			const result = render(Switch, {
				props: {
					disabled: true,
					invalid: true,
					label: 'Bloqueado'
				}
			});

			expect(result.body).toContain('disabled');
			expect(result.body).toContain('invalid');
			expect(result.body).toContain('disabled=""');
			expect(result.body).toContain('aria-invalid="true"');
		});
	});
});
