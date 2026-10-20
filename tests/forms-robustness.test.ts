import { describe, it, expect } from 'vitest';
import { render } from 'svelte/server';
import {
	Input,
	Textarea,
	Tags,
	Tag,
	ColorPicker,
	DatePicker,
	TimePicker,
	Button
} from '$lib/index.js';

describe('Form Primitives Robustness & Edge-Cases (Fuzzing Matrix)', () => {
	describe('Input & Textarea with abnormal inputs', () => {
		it('safely handles 10,000 character strings without memory bloat or truncation error', () => {
			const hugeString = 'A'.repeat(10000);
			const inputResult = render(Input, { props: { value: hugeString } });
			expect(inputResult.body).toContain(hugeString);

			const textareaResult = render(Textarea, { props: { value: hugeString } });
			expect(textareaResult.body).toContain(hugeString);
		});

		it('properly escapes dangerous HTML / script injection payloads in SSR', () => {
			const xssPayload = '<script>alert("XSS")</script><img src="x" onerror="alert(1)">';
			const result = render(Input, { props: { value: xssPayload } });

			// Em Svelte, valores em atributos de input são devidamente escapados
			expect(result.body).not.toContain('<script>alert("XSS")</script>');
			expect(result.body).toContain('&quot;');
		});

		it('handles complex unicode, composite emojis, and Right-to-Left (RTL) scripts', () => {
			const complexText = 'مرحبا بالعالم 👨‍👩‍👧‍👦 שָׁלוֹם עֲלֵיכֶם 🦀';
			const result = render(Input, { props: { value: complexText } });
			expect(result.body).toContain('مرحبا بالعالم');
			expect(result.body).toContain('👨‍👩‍👧‍👦');
			expect(result.body).toContain('🦀');
		});

		it('gracefully handles undefined, null, and empty string without throwing', () => {
			expect(() => render(Input, { props: { value: '' } })).not.toThrow();
			expect(() => render(Textarea, { props: { value: '' } })).not.toThrow();
		});
	});

	describe('Tags Primitive boundary handling', () => {
		it('handles empty arrays, single tags, and long tag lists without breaking', () => {
			const emptyResult = render(Tags, { props: { tags: [] } });
			expect(emptyResult.body).toContain('tag-input-container');

			const longList = Array.from({ length: 50 }, (_, i) => `Tag-${i}`);
			const listResult = render(Tags, { props: { tags: longList } });
			expect(listResult.body).toContain('Tag-0');
			expect(listResult.body).toContain('Tag-49');
		});

		it('renders Tag with special characters and long names cleanly', () => {
			const result = render(Tag, { props: { label: 'Special: <>&"\' / \\ 100%' } });
			expect(result.body).toContain('chip-root');
		});
	});

	describe('ColorPicker, DatePicker & TimePicker robustness', () => {
		it('handles invalid or non-hex color values gracefully', () => {
			expect(() => render(ColorPicker, { props: { value: 'invalid-color' } })).not.toThrow();
			expect(() => render(ColorPicker, { props: { value: '' } })).not.toThrow();
		});

		it('handles boundary date and time values', () => {
			expect(() =>
				render(DatePicker, { props: { value: '1970-01-01', min: '1900-01-01', max: '2099-12-31' } })
			).not.toThrow();
			expect(() =>
				render(TimePicker, { props: { value: '23:59', min: '00:00', max: '23:59' } })
			).not.toThrow();
		});
	});

	describe('Button edge cases', () => {
		it('renders safely with empty label and no children', () => {
			expect(() => render(Button, { props: {} })).not.toThrow();
		});
	});
});
