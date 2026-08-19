import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Form Controls (Pure Semantics & Tactile Focus)', () => {
	const formsDir = path.resolve(process.cwd(), 'src/lib/components/forms');

	it('Input.svelte deve renderizar <input> diretamente na raiz quando sem afixos e usar seletores de tag', () => {
		const content = fs.readFileSync(path.join(formsDir, 'Input.svelte'), 'utf-8');
		expect(content).toContain('class={className}');
		expect(content).toContain("aria-invalid={invalid ? 'true' : undefined}");
		expect(content).toContain('input:focus-visible');
		expect(content).toContain('box-shadow: 3px 3px 0px var(--color-primary);');
		expect(content).toContain('transform: translate(-1px, -1px);');
	});

	it('Textarea.svelte deve usar tag <textarea> pura na raiz sem wrappers e estilizar textarea diretamente', () => {
		const content = fs.readFileSync(path.join(formsDir, 'Textarea.svelte'), 'utf-8');
		expect(content).toMatch(/<textarea[\s\S]*>[\s\S]*<\/textarea>/);
		expect(content).not.toContain('<div');
		expect(content).toContain('data-resize={resize}');
		expect(content).toContain('textarea:focus-visible');
		expect(content).toContain('box-shadow: 3px 3px 0px var(--color-primary);');
	});

	it('Select.svelte deve renderizar <select> com foco tátil e chevron SVG', () => {
		const content = fs.readFileSync(path.join(formsDir, 'Select.svelte'), 'utf-8');
		expect(content).toContain('<select');
		expect(content).toContain('class="arrow"');
		expect(content).toContain('div:focus-within');
		expect(content).toContain('box-shadow: 3px 3px 0px var(--color-primary);');
	});

	it('Checkbox.svelte deve renderizar input checkbox com indicador SVG e suporte a indeterminate', () => {
		const content = fs.readFileSync(path.join(formsDir, 'Checkbox.svelte'), 'utf-8');
		expect(content).toContain('type="checkbox"');
		expect(content).toContain('inputEl.indeterminate = indeterminate;');
		expect(content).toContain('class="box"');
	});

	it('Radio.svelte deve renderizar input radio com reatividade em bind:group', () => {
		const content = fs.readFileSync(path.join(formsDir, 'Radio.svelte'), 'utf-8');
		expect(content).toContain('type="radio"');
		expect(content).toContain(
			'let isChecked = $derived(group !== undefined && value !== undefined && group === value);'
		);
		expect(content).toContain('class="circle"');
	});
});
