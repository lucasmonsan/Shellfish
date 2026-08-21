import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

function getFilesRecursively(dir: string, extensions: string[]): string[] {
	let results: string[] = [];
	if (!fs.existsSync(dir)) return results;

	const list = fs.readdirSync(dir, { withFileTypes: true });
	for (const file of list) {
		const fullPath = path.join(dir, file.name);
		if (file.isDirectory()) {
			results = results.concat(getFilesRecursively(fullPath, extensions));
		} else if (extensions.some((ext) => file.name.endsWith(ext))) {
			results.push(fullPath);
		}
	}
	return results;
}

describe('Form Controls & Tactile Focus Engine', () => {
	const formsDir = path.resolve(process.cwd(), 'src/lib/components/forms');
	const allFormFiles = getFilesRecursively(formsDir, ['.svelte']);

	it('garante que todos os campos de entrada de texto e seleção implementem o foco tátil padronizado', () => {
		const focusViolations: string[] = [];
		const focusEligible = [
			path.join(formsDir, 'Input.svelte'),
			path.join(formsDir, 'Textarea.svelte'),
			path.join(formsDir, 'Select.svelte')
		];

		for (const file of focusEligible) {
			const content = fs.readFileSync(file, 'utf-8');
			const relPath = path.relative(process.cwd(), file);

			if (!content.includes('box-shadow: 2px 2px 0px var(--color-primary);')) {
				focusViolations.push(`${relPath}: Foco tátil com --color-primary ausente`);
			}
		}

		expect(focusViolations, 'Controles de formulário sem foco tátil padronizado').toEqual([]);
	});

	it('garante que todos os componentes de formulário aceitem a prop class e repassem atributos', () => {
		const propViolations: string[] = [];

		for (const file of allFormFiles) {
			const content = fs.readFileSync(file, 'utf-8');
			const relPath = path.relative(process.cwd(), file);

			if (!content.includes('class: className') && !content.includes('class={className}')) {
				propViolations.push(`${relPath}: Não aceita ou não propaga prop class`);
			}
			if (!content.includes('...restProps')) {
				propViolations.push(`${relPath}: Não repassa ...restProps`);
			}
		}

		expect(
			propViolations,
			'Campos de formulário sem suporte padrão a class e ...restProps'
		).toEqual([]);
	});

	it('Input.svelte deve renderizar <input> diretamente na raiz quando sem afixos e usar seletores de tag', () => {
		const content = fs.readFileSync(path.join(formsDir, 'Input.svelte'), 'utf-8');
		expect(content).toContain('class={className}');
		expect(content).toContain("aria-invalid={invalid ? 'true' : undefined}");
		expect(content).toContain('input:focus-visible');
		expect(content).toContain('transform: translate(-1px, -1px);');
	});

	it('Textarea.svelte deve renderizar <textarea> na raiz quando sem label e suportar label montada com foco tátil', () => {
		const content = fs.readFileSync(path.join(formsDir, 'Textarea.svelte'), 'utf-8');
		expect(content).toMatch(/<textarea[\s\S]*>[\s\S]*<\/textarea>/);
		expect(content).toContain('textarea-straddled-label');
		expect(content).toContain('data-resize={resize}');
		expect(content).toContain('textarea:focus-visible');
	});

	it('Select.svelte deve renderizar <select> com foco tátil e chevron SVG', () => {
		const content = fs.readFileSync(path.join(formsDir, 'Select.svelte'), 'utf-8');
		expect(content).toContain('<select');
		expect(content).toContain('class="arrow"');
		expect(content).toContain(':focus-within');
	});

	it('Checkbox.svelte deve suportar variant="card" e indeterminate', () => {
		const content = fs.readFileSync(path.join(formsDir, 'Checkbox.svelte'), 'utf-8');
		expect(content).toContain('type="checkbox"');
		expect(content).toContain('inputEl.indeterminate = indeterminate;');
		expect(content).toContain('class="box"');
		expect(content).toContain("variant === 'card'");
	});

	it('Radio.svelte deve suportar variant="card" e reatividade em bind:group', () => {
		const content = fs.readFileSync(path.join(formsDir, 'Radio.svelte'), 'utf-8');
		expect(content).toContain('type="radio"');
		expect(content).toContain(
			'let isChecked = $derived(group !== undefined && value !== undefined && group === value);'
		);
		expect(content).toContain('class="circle"');
		expect(content).toContain("variant === 'card'");
	});

	it('Switch.svelte deve implementar role="switch" e física neobrutalista tátil', () => {
		const content = fs.readFileSync(path.join(formsDir, 'Switch.svelte'), 'utf-8');
		expect(content).toContain('role="switch"');
		expect(content).toContain('aria-checked={checked}');
		expect(content).toContain('switch-track');
		expect(content).toContain('switch-thumb');
	});

	it('Slider.svelte deve implementar controle de range com feedback tátil', () => {
		const content = fs.readFileSync(path.join(formsDir, 'Slider.svelte'), 'utf-8');
		expect(content).toContain('type="range"');
		expect(content).toContain('slider-value-display');
	});

	it('Calendar.svelte deve suportar modos week, month e expandable com navegação e disablePast', () => {
		const content = fs.readFileSync(path.join(formsDir, 'Calendar.svelte'), 'utf-8');
		expect(content).toContain("mode = 'month'");
		expect(content).toContain('calendar-strip');
		expect(content).toContain('hybrid-strip');
		expect(content).toContain('toggle-card');
		expect(content).toContain('disablePast');
		expect(content).toContain('calendar-month-grid');
		expect(content).toContain('toggleExpand');
	});
});
