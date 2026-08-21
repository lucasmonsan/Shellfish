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

describe('Containers & Layout Primitives (Zero Div-Soup Invariant)', () => {
	const containersDir = path.resolve(process.cwd(), 'src/lib/components/containers');
	const layoutDir = path.resolve(process.cwd(), 'src/lib/components/layout');
	const nonExpandableContainers = [
		path.join(containersDir, 'Main.svelte'),
		path.join(containersDir, 'Header.svelte'),
		path.join(containersDir, 'Section.svelte')
	];
	const allLayoutFiles = getFilesRecursively(layoutDir, ['.svelte']);

	it('garante que containers estáticos não possuam divs intermediárias de wrapper ou container artificial', () => {
		const wrapperViolations: string[] = [];

		for (const file of nonExpandableContainers) {
			const content = fs.readFileSync(file, 'utf-8');
			const relPath = path.relative(process.cwd(), file);

			if (
				content.includes('-wrapper') ||
				content.includes('-container') ||
				content.includes('class="content"') ||
				content.includes('class="inner"')
			) {
				wrapperViolations.push(relPath);
			}
		}

		expect(wrapperViolations, 'Containers com wrappers artificiais').toEqual([]);
	});

	it('Main.svelte deve usar tag <main> pura na raiz sem wrappers artificiais', () => {
		const content = fs.readFileSync(path.join(containersDir, 'Main.svelte'), 'utf-8');
		expect(content).toMatch(/<main[\s\S]*>[\s\S]*<\/main>/);
		expect(content).not.toContain('<div');
	});

	it('Header.svelte deve usar tag <header> pura na raiz', () => {
		const content = fs.readFileSync(path.join(containersDir, 'Header.svelte'), 'utf-8');
		expect(content).toMatch(/<header[\s\S]*>[\s\S]*<\/header>/);
		expect(content).not.toContain('<div');
	});

	it('Footer.svelte deve usar tag <footer> pura na raiz com suporte a expandable', () => {
		const content = fs.readFileSync(path.join(containersDir, 'Footer.svelte'), 'utf-8');
		expect(content).toMatch(/<footer[\s\S]*>[\s\S]*<\/footer>/);
		expect(content).toContain('data-expandable={expandable}');
	});

	it('Section.svelte deve usar tag <section> pura na raiz sem nenhuma <div> interna para conteúdo', () => {
		const content = fs.readFileSync(path.join(containersDir, 'Section.svelte'), 'utf-8');
		expect(content).toMatch(/<section[\s\S]*>[\s\S]*<\/section>/);
		expect(content).not.toContain('<div');
	});

	it('garante dinamicamente que todas as primitivas de layout aceitem class e repassem restProps', () => {
		const propViolations: string[] = [];

		for (const file of allLayoutFiles) {
			const content = fs.readFileSync(file, 'utf-8');
			const relPath = path.relative(process.cwd(), file);

			if (!content.includes('class: className') && !content.includes('class={className}')) {
				propViolations.push(`${relPath}: Não aceita ou não propaga prop class`);
			}
			if (!content.includes('...restProps')) {
				propViolations.push(`${relPath}: Não propaga ...restProps`);
			}
		}

		expect(propViolations, 'Primitivas de layout sem propagação de class ou restProps').toEqual([]);
	});

	it('Row.svelte deve renderizar primitiva flex com atributos de dados claros', () => {
		const content = fs.readFileSync(path.join(layoutDir, 'Row.svelte'), 'utf-8');
		expect(content).toContain('data-align={align}');
		expect(content).toContain('data-justify={justify}');
		expect(content).toContain('data-wrap={wrap}');
		expect(content).toContain('data-full-width={fullWidth}');
	});

	it('Column.svelte deve renderizar primitiva flex vertical com atributos de dados claros', () => {
		const content = fs.readFileSync(path.join(layoutDir, 'Column.svelte'), 'utf-8');
		expect(content).toContain('data-align={align}');
		expect(content).toContain('data-justify={justify}');
		expect(content).toContain('data-full-width={fullWidth}');
	});

	it('Grid.svelte deve renderizar CSS Grid com suporte a columns numérico e auto-fit', () => {
		const content = fs.readFileSync(path.join(layoutDir, 'Grid.svelte'), 'utf-8');
		expect(content).toContain('grid-template-columns: repeat(');
	});
});
