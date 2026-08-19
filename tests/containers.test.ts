import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Containers & Layout Primitives (Zero Div-Soup)', () => {
	const componentsDir = path.resolve(process.cwd(), 'src/lib/components');

	it('Main.svelte deve usar tag <main> pura na raiz sem wrappers artificiais', () => {
		const content = fs.readFileSync(path.join(componentsDir, 'containers/Main.svelte'), 'utf-8');
		expect(content).toMatch(/<main[\s\S]*>[\s\S]*<\/main>/);
		expect(content).not.toContain('<div class="main-wrapper"');
		expect(content).not.toContain('<div class="content"');
	});

	it('Header.svelte deve usar tag <header> pura na raiz', () => {
		const content = fs.readFileSync(path.join(componentsDir, 'containers/Header.svelte'), 'utf-8');
		expect(content).toMatch(/<header[\s\S]*>[\s\S]*<\/header>/);
	});

	it('Footer.svelte deve usar tag <footer> pura na raiz', () => {
		const content = fs.readFileSync(path.join(componentsDir, 'containers/Footer.svelte'), 'utf-8');
		expect(content).toMatch(/<footer[\s\S]*>[\s\S]*<\/footer>/);
	});

	it('Section.svelte deve usar tag <section> pura na raiz sem nenhuma <div> interna para conteúdo', () => {
		const content = fs.readFileSync(path.join(componentsDir, 'containers/Section.svelte'), 'utf-8');
		expect(content).toMatch(/<section[\s\S]*>[\s\S]*<\/section>/);
		// Garante que não há nenhuma div aninhada dentro de section
		expect(content).not.toContain('<div');
		expect(content).not.toContain('class="content"');
		expect(content).not.toContain('class="section-inner"');
	});

	it('Row.svelte deve renderizar primitiva flex com atributos de dados claros', () => {
		const content = fs.readFileSync(path.join(componentsDir, 'layout/Row.svelte'), 'utf-8');
		expect(content).toContain('data-align={align}');
		expect(content).toContain('data-justify={justify}');
		expect(content).toContain('data-wrap={wrap}');
		expect(content).toContain('data-full-width={fullWidth}');
	});

	it('Column.svelte deve renderizar primitiva flex vertical com atributos de dados claros', () => {
		const content = fs.readFileSync(path.join(componentsDir, 'layout/Column.svelte'), 'utf-8');
		expect(content).toContain('data-align={align}');
		expect(content).toContain('data-justify={justify}');
		expect(content).toContain('data-full-width={fullWidth}');
	});

	it('Grid.svelte deve renderizar CSS Grid com suporte a columns numérico e auto-fit', () => {
		const content = fs.readFileSync(path.join(componentsDir, 'layout/Grid.svelte'), 'utf-8');
		expect(content).toContain('grid-template-columns: repeat(');
	});
});
