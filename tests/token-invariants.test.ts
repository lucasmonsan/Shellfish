import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

function walkDir(dir: string, fileList: string[] = []): string[] {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			walkDir(fullPath, fileList);
		} else if (entry.isFile() && (entry.name.endsWith('.svelte') || entry.name.endsWith('.css'))) {
			fileList.push(fullPath);
		}
	}
	return fileList;
}

interface Violation {
	file: string;
	line: number;
	property: string;
	value: string;
	reason: string;
}

function checkCssForHardcodedValues(
	filePath: string,
	cssContent: string,
	lineOffset = 0
): Violation[] {
	const violations: Violation[] = [];
	const lines = cssContent.split('\n');

	// Propriedades estritamente sujeitas aos tokens
	const spacingProps =
		/^(padding|padding-top|padding-bottom|padding-left|padding-right|padding-inline|padding-block|margin|margin-top|margin-bottom|margin-left|margin-right|margin-inline|margin-block|gap|row-gap|column-gap)$/;
	const radiusProps =
		/^(border-radius|border-top-left-radius|border-top-right-radius|border-bottom-left-radius|border-bottom-right-radius)$/;
	const shadowProps = /^(box-shadow)$/;

	// Valores brutos não permitidos (ex: 12px, 0.5rem, 1em - exceto 0, 0px, 100%, 50%, etc.)
	const rawUnitRegex = /\b\d+(\.\d+)?(px|rem|em)\b/;

	for (let i = 0; i < lines.length; i++) {
		const rawLine = lines[i].trim();
		const currentLineNumber = i + 1 + lineOffset;

		// Ignora comentários CSS
		if (rawLine.startsWith('/*') || rawLine.startsWith('*') || rawLine.endsWith('*/')) continue;

		// Divide declaração "prop: value;"
		const colonIndex = rawLine.indexOf(':');
		if (colonIndex === -1) continue;

		const prop = rawLine.slice(0, colonIndex).trim().toLowerCase();
		const value = rawLine
			.slice(colonIndex + 1)
			.replace(';', '')
			.trim();

		// 1. Verificação de Espaçamento
		if (spacingProps.test(prop)) {
			// Permite: 0, 0px, auto, inherit, initial, unset
			const isAllowedLiteral = /^(0(px)?|auto|inherit|initial|unset)$/.test(value);
			if (!isAllowedLiteral && !value.includes('var(--space-') && !value.includes('var(--')) {
				if (rawUnitRegex.test(value)) {
					violations.push({
						file: filePath,
						line: currentLineNumber,
						property: prop,
						value,
						reason: `Espaçamento fixo detectado. Use 'var(--space-*)' da suíte.`
					});
				}
			}
		}

		// 2. Verificação de Raio de Borda
		if (radiusProps.test(prop)) {
			const isAllowedLiteral = /^(0(px)?|50%|9999px|inherit|initial)$/.test(value);
			if (!isAllowedLiteral && !value.includes('var(--radius-') && !value.includes('var(--')) {
				if (rawUnitRegex.test(value)) {
					violations.push({
						file: filePath,
						line: currentLineNumber,
						property: prop,
						value,
						reason: `Raio de borda fixo detectado. Use 'var(--radius-*)' da suíte.`
					});
				}
			}
		}

		// 3. Verificação de Box Shadow
		if (shadowProps.test(prop)) {
			const isAllowedLiteral = /^(none|inherit|initial)$/.test(value);
			if (!isAllowedLiteral && !value.includes('var(--shadow-') && !value.includes('var(--')) {
				violations.push({
					file: filePath,
					line: currentLineNumber,
					property: prop,
					value,
					reason: `Sombra fixa detectada. Use 'var(--shadow-*)' da suíte.`
				});
			}
		}
	}

	return violations;
}

describe('Invariant Test: Zero Hardcoded Design Values in Library Code', () => {
	it('guarantees that all component styles in src/lib strictly use CSS variables', () => {
		const libDir = path.resolve('src/lib');
		const files = walkDir(libDir);

		const allViolations: Violation[] = [];

		for (const file of files) {
			const relativePath = path.relative(process.cwd(), file);

			// Ignora os arquivos declaradores de tokens
			if (relativePath.includes('variables.css') || relativePath.includes('modern-normalize.css')) {
				continue;
			}

			const content = fs.readFileSync(file, 'utf8');

			if (file.endsWith('.svelte')) {
				// Extrai bloco <style>...</style>
				const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
				let match: RegExpExecArray | null;

				while ((match = styleRegex.exec(content)) !== null) {
					const beforeStyle = content.slice(0, match.index);
					const lineOffset = beforeStyle.split('\n').length - 1;
					const styleContent = match[1];

					const violations = checkCssForHardcodedValues(relativePath, styleContent, lineOffset);
					allViolations.push(...violations);
				}
			} else if (file.endsWith('.css')) {
				const violations = checkCssForHardcodedValues(relativePath, content, 0);
				allViolations.push(...violations);
			}
		}

		if (allViolations.length > 0) {
			const report = allViolations
				.map((v) => `  [VIOLAÇÃO] ${v.file}:${v.line} -> "${v.property}: ${v.value}" (${v.reason})`)
				.join('\n');

			expect.fail(
				`Foram encontrados valores fixos em componentes da biblioteca:\n\n${report}\n\nUse exclusivamente variáveis CSS da suíte.`
			);
		}

		expect(allViolations).toHaveLength(0);
	});

	it('guarantees that variables.css derives spacing, typography, and control heights from fluid --base', () => {
		const varsPath = path.resolve('src/lib/styles/variables.css');
		const content = fs.readFileSync(varsPath, 'utf8');

		expect(content).toContain('--base: clamp(');
		expect(content).toContain('--control-height: calc(var(--base)');
		expect(content).toContain('--space-xs: calc(var(--base)');
		expect(content).toContain('--space-sm: calc(var(--base)');
		expect(content).toContain('--space-md: var(--base)');
		expect(content).toContain('--text-sm: calc(var(--base)');
		expect(content).toContain('--text-md: var(--base)');
		expect(content.toLowerCase()).not.toContain('#ffffff');
		expect(content.toLowerCase()).not.toContain('#000000');
	});

	it('guarantees zero .shellfish-* class prefixes, zero leading/trailing slot props, and zero hardcoded hex colors in src/lib components', () => {
		const libDir = path.resolve('src/lib/components');
		const files = walkDir(libDir);

		for (const file of files) {
			const relativePath = path.relative(process.cwd(), file);
			const content = fs.readFileSync(file, 'utf8');

			expect(
				content.includes('shellfish-'),
				`Prefixo redundante '.shellfish-*' encontrado em ${relativePath}`
			).toBe(false);

			expect(
				/\b(leading|trailing)\??\s*:\s*Snippet/.test(content),
				`Props de posição engessadas (leading/trailing) encontradas em ${relativePath}`
			).toBe(false);

			const styleMatch = /<style[^>]*>([\s\S]*?)<\/style>/.exec(content);
			if (styleMatch) {
				expect(
					/#[0-9a-fA-F]{3,8}\b/.test(styleMatch[1]),
					`Cor hexadecimal hardcoded encontrada no <style> de ${relativePath}`
				).toBe(false);
			}
		}
	});
});
