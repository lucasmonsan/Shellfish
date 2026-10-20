import { describe, it, expect } from 'vitest';
import { render } from 'svelte/server';
import { DatePicker, TimePicker, ColorPicker } from '$lib/index.js';

describe('Date, Time & Color Picker Primitives (DatePicker, TimePicker, ColorPicker)', () => {
	describe('DatePicker', () => {
		it('renders native date input with min, max, and value attributes', () => {
			const result = render(DatePicker, {
				props: {
					id: 'start-date',
					value: '2026-10-17',
					min: '2026-01-01',
					max: '2026-12-31'
				}
			});

			expect(result.body).toContain('datepicker-container md');
			expect(result.body).toContain('type="date"');
			expect(result.body).toContain('id="start-date"');
			expect(result.body).toContain('value="2026-10-17"');
			expect(result.body).toContain('min="2026-01-01"');
			expect(result.body).toContain('max="2026-12-31"');
			expect(result.body).toContain('block');
		});

		it('applies size presets (sm, md, lg)', () => {
			for (const size of ['sm', 'md', 'lg'] as const) {
				const result = render(DatePicker, {
					props: { size }
				});
				expect(result.body).toContain(`datepicker-container ${size}`);
			}
		});

		it('applies disabled and invalid states with aria-invalid', () => {
			const result = render(DatePicker, {
				props: {
					disabled: true,
					invalid: true
				}
			});

			expect(result.body).toContain('disabled');
			expect(result.body).toContain('invalid');
			expect(result.body).toContain('aria-invalid="true"');
		});
	});

	describe('TimePicker', () => {
		it('renders native time input with min, max, step, and value attributes', () => {
			const result = render(TimePicker, {
				props: {
					id: 'notify-time',
					value: '14:30',
					min: '08:00',
					max: '18:00',
					step: 60
				}
			});

			expect(result.body).toContain('timepicker-container md');
			expect(result.body).toContain('type="time"');
			expect(result.body).toContain('id="notify-time"');
			expect(result.body).toContain('value="14:30"');
			expect(result.body).toContain('min="08:00"');
			expect(result.body).toContain('max="18:00"');
			expect(result.body).toContain('step="60"');
		});

		it('applies size presets (sm, md, lg)', () => {
			for (const size of ['sm', 'md', 'lg'] as const) {
				const result = render(TimePicker, {
					props: { size }
				});
				expect(result.body).toContain(`timepicker-container ${size}`);
			}
		});

		it('applies disabled and invalid states with aria-invalid', () => {
			const result = render(TimePicker, {
				props: {
					disabled: true,
					invalid: true
				}
			});

			expect(result.body).toContain('disabled');
			expect(result.body).toContain('invalid');
			expect(result.body).toContain('aria-invalid="true"');
		});
	});

	describe('ColorPicker', () => {
		it('renders popover color trigger with hex value and accessible label by default', () => {
			const result = render(ColorPicker, {
				props: {
					value: '#b94b38',
					label: 'Cor da Marca'
				}
			});

			expect(result.body).toContain('color-picker-wrapper');
			expect(result.body).toContain('color-trigger md');
			expect(result.body).toContain('with-hex');
			expect(result.body).toContain('#b94b38');
			expect(result.body).toContain('aria-label="Cor da Marca: #b94b38"');
		});

		it('renders compact swatch-only trigger when showHexInput is false', () => {
			const result = render(ColorPicker, {
				props: {
					value: '#2b6140',
					showHexInput: false
				}
			});

			expect(result.body).toContain('swatch-only');
			expect(result.body).not.toContain('with-hex');
		});

		it('applies size presets (sm, md, lg), disabled, and invalid states', () => {
			for (const size of ['sm', 'md', 'lg'] as const) {
				const result = render(ColorPicker, {
					props: { size, disabled: true, invalid: true }
				});
				expect(result.body).toContain(`color-trigger ${size}`);
				expect(result.body).toContain('disabled');
				expect(result.body).toContain('invalid');
			}
		});
	});
});
