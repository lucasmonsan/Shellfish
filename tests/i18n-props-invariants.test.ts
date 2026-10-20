import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

function walkSvelteFiles(dir: string, fileList: string[] = []): string[] {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			if (entry.name !== 'icons') {
				walkSvelteFiles(fullPath, fileList);
			}
		} else if (entry.isFile() && entry.name.endsWith('.svelte')) {
			fileList.push(fullPath);
		}
	}
	return fileList;
}

describe('Invariant Test: Zero Hardcoded Portuguese Text in Component Props and Templates (Hard Fail)', () => {
	const componentsDir = path.resolve('src/lib/components');
	const svelteFiles = walkSvelteFiles(componentsDir);

	it('guarantees that components in src/lib do not have hardcoded Portuguese text in default props or templates', () => {
		const hardcodedPatterns = [
			{
				pattern: /placeholder\s*=\s*['"]Digite e pressione/i,
				desc: 'Placeholder fixo em português em Tags'
			},
			{
				pattern: /removeLabel\s*=\s*['"]Remover['"]/i,
				desc: 'removeLabel padrão "Remover" hardcoded em Tag'
			},
			{
				pattern: /label\s*=\s*['"]Seletor de cor['"]/i,
				desc: 'label padrão "Seletor de cor" hardcoded em ColorPicker'
			},
			{
				pattern: /O arquivo.*excede o tamanho/i,
				desc: 'Mensagem de erro de tamanho hardcoded em FileUpload'
			},
			{
				pattern: /Limite máximo de.*atingido/i,
				desc: 'Mensagem de limite de arquivos hardcoded em FileUpload'
			},
			{ pattern: /PNG, JPG ou PDF até/i, desc: 'Texto de ajuda padrão hardcoded em FileUpload' },
			{
				pattern: /aria-label=['"]Upload de arquivos['"]/i,
				desc: 'aria-label hardcoded em FileUpload'
			},
			{
				pattern: /aria-label=['"]Área de envio de arquivos['"]/i,
				desc: 'aria-label da dropzone hardcoded em FileUpload'
			},
			{
				pattern: /aria-label=['"]Arquivos selecionados['"]/i,
				desc: 'aria-label de lista hardcoded em FileUpload'
			},
			{
				pattern: /Remover \$\{file\.name\}/i,
				desc: 'aria-label de remoção hardcoded em FileUpload'
			}
		];

		const violations: string[] = [];

		for (const file of svelteFiles) {
			const rel = path.relative(process.cwd(), file);
			const content = fs.readFileSync(file, 'utf8');

			for (const { pattern, desc } of hardcodedPatterns) {
				const match = pattern.exec(content);
				if (match) {
					const lineNum = content.slice(0, match.index).split('\n').length;
					violations.push(`  [TEXTO HARDCODED] ${rel}:${lineNum} -> ${desc} ("${match[0]}")`);
				}
			}
		}

		if (violations.length > 0) {
			expect.fail(
				`Violações de i18n em componentes (Regra Pétrea AGENTS.md: 100% de suporte a pt-BR, en-US e es):\n\n${violations.join('\n')}\n\nParametrize as mensagens via props ou utilize i18n.t(...) da suíte.`
			);
		}

		expect(violations).toHaveLength(0);
	});
});
