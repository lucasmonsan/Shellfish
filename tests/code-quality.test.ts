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

describe('Anti-Gambiarra Code Quality Gate', () => {
	const srcLibDir = path.resolve(process.cwd(), 'src/lib');
	const sourceFiles = getFilesRecursively(srcLibDir, ['.svelte', '.ts', '.js', '.css']);

	it('proíbe expressamente o uso de !important nos componentes', () => {
		const violations: string[] = [];

		for (const file of sourceFiles) {
			// Ignora prefers-reduced-motion do reset global
			if (file.endsWith('index.css')) continue;

			const content = fs.readFileSync(file, 'utf-8');
			if (content.includes('!important')) {
				violations.push(path.relative(process.cwd(), file));
			}
		}

		expect(violations).toEqual([]);
	});

	it('proíbe desativadores de linter e ignoradores de TypeScript (@ts-ignore, eslint-disable)', () => {
		const violations: string[] = [];

		for (const file of sourceFiles) {
			const content = fs.readFileSync(file, 'utf-8');
			if (
				content.includes('eslint-disable') ||
				content.includes('@ts-ignore') ||
				content.includes('@ts-nocheck') ||
				content.includes('prettier-ignore')
			) {
				violations.push(path.relative(process.cwd(), file));
			}
		}

		expect(violations).toEqual([]);
	});

	it('proíbe emojis hardcoded nos arquivos da biblioteca src/lib/', () => {
		const emojiRegex =
			/[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}]/u;
		const violations: string[] = [];

		for (const file of sourceFiles) {
			const content = fs.readFileSync(file, 'utf-8');
			if (emojiRegex.test(content)) {
				violations.push(path.relative(process.cwd(), file));
			}
		}

		expect(violations).toEqual([]);
	});
});
