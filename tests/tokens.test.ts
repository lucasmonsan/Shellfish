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

describe('Design Tokens & CSS Variables Dynamic Engine', () => {
	const variablesCssPath = path.resolve(process.cwd(), 'src/lib/styles/variables.css');
	const variablesContent = fs.readFileSync(variablesCssPath, 'utf-8');
	const srcLibDir = path.resolve(process.cwd(), 'src/lib');
	const sourceFiles = getFilesRecursively(srcLibDir, ['.svelte', '.css']);

	// Extrai todas as variáveis CSS definidas em variables.css
	const declaredVariables = new Set<string>();
	const varDeclRegex = /(--[a-zA-Z0-9_-]+)\s*:/g;
	let declMatch;
	while ((declMatch = varDeclRegex.exec(variablesContent)) !== null) {
		declaredVariables.add(declMatch[1]);
	}

	it('deve ter 1 único padrão de sombra sólida (--shadow: 2px 2px 0px var(--border-color))', () => {
		expect(variablesContent).toContain('--shadow: 2px 2px 0px var(--border-color);');
		expect(variablesContent).not.toContain('--shadow-sm');
		expect(variablesContent).not.toContain('--shadow-md');
		expect(variablesContent).not.toContain('--shadow-lg');
	});

	it('deve conter as 12 cores da paleta de harmonia terracota', () => {
		const expectedColors = [
			'--color-red:',
			'--color-orange:',
			'--color-purple:',
			'--color-pink:',
			'--color-green-dark:',
			'--color-green-light:',
			'--color-blue-dark:',
			'--color-blue-light:',
			'--color-yellow:',
			'--color-white:',
			'--color-gray:',
			'--color-black:'
		];

		for (const color of expectedColors) {
			expect(variablesContent).toContain(color);
		}

		expect(variablesContent).toContain('--color-primary: #b94b38;');
	});

	it('deve conter apenas 2 níveis de radius (--radius-sm e --radius-md)', () => {
		expect(variablesContent).toContain('--radius-sm: 1px;');
		expect(variablesContent).toContain('--radius-md: 2px;');

		// Garante que níveis descartados foram removidos
		expect(variablesContent).not.toContain('--radius-xs:');
		expect(variablesContent).not.toContain('--radius-lg:');
		expect(variablesContent).not.toContain('--radius-full:');
	});

	it('deve conter a escala de espaçamento enxuta de 6 níveis', () => {
		const expectedSpaces = [
			'--space-none:',
			'--space-xs:',
			'--space-sm:',
			'--space-md:',
			'--space-lg:',
			'--space-xl:',
			'--space-2xl:'
		];

		for (const space of expectedSpaces) {
			expect(variablesContent).toContain(space);
		}

		expect(variablesContent).not.toContain('--space-xxxs:');
		expect(variablesContent).not.toContain('--space-xxxl:');
	});

	it('deve conter a escala semântica de z-index de 6 posições', () => {
		const expectedZIndexes = [
			'--z-below:',
			'--z-base:',
			'--z-sticky:',
			'--z-popover:',
			'--z-drawer:',
			'--z-toast:'
		];

		for (const z of expectedZIndexes) {
			expect(variablesContent).toContain(z);
		}
	});

	it('deve ter suporte completo a Dark Mode via data-theme="dark"', () => {
		expect(variablesContent).toContain(":root[data-theme='dark']");
		expect(variablesContent).toContain('--bg-primary:');
		expect(variablesContent).toContain('--text-primary:');
		expect(variablesContent).toContain('--border-color:');
	});

	it('garante dinamicamente que TODAS as variáveis CSS utilizadas em todos os arquivos estejam declaradas em variables.css', () => {
		const varUsageRegex = /var\(\s*(--[a-zA-Z0-9_-]+)/g;
		const undeclaredUsages: string[] = [];

		for (const file of sourceFiles) {
			if (file.endsWith('modern-normalize.css')) continue;

			const content = fs.readFileSync(file, 'utf-8');
			const relPath = path.relative(process.cwd(), file);
			let usageMatch;

			while ((usageMatch = varUsageRegex.exec(content)) !== null) {
				const varName = usageMatch[1];
				if (!declaredVariables.has(varName)) {
					undeclaredUsages.push(`${relPath}: ${varName}`);
				}
			}
		}

		expect(
			undeclaredUsages,
			'Variáveis CSS não declaradas em variables.css (erros de digitação ou tokens fantasmas)'
		).toEqual([]);
	});
});
