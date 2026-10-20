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

describe('Invariant Test: Interactive States & Motion Consistency across Components', () => {
	const componentsDir = path.resolve('src/lib/components');
	const svelteFiles = walkSvelteFiles(componentsDir);

	it('enforces uniform disabled opacity (0.5) across all components with disabled states', () => {
		const violations: string[] = [];

		for (const file of svelteFiles) {
			const relativePath = path.relative(process.cwd(), file);
			const content = fs.readFileSync(file, 'utf8');
			const styleMatch = /<style[^>]*>([\s\S]*?)<\/style>/.exec(content);
			if (!styleMatch) continue;

			const beforeStyle = content.slice(0, styleMatch.index);
			const lineOffset = beforeStyle.split('\n').length - 1;
			const styleContent = styleMatch[1];

			// Extrai blocos CSS que contêm :disabled ou .disabled no seletor
			const ruleRegex = /([^{}]+)\{([^{}]+)\}/g;
			let match: RegExpExecArray | null;

			while ((match = ruleRegex.exec(styleContent)) !== null) {
				const selector = match[1].trim();
				const body = match[2];

				if (selector.includes('disabled')) {
					const opacityMatch = /opacity\s*:\s*([\d.]+)\s*;/.exec(body);
					if (opacityMatch) {
						const opacityVal = opacityMatch[1];
						if (opacityVal !== '0.5' && opacityVal !== '1' && opacityVal !== '0') {
							const lineNum = lineOffset + styleContent.slice(0, match.index).split('\n').length;
							violations.push(
								`  [OPACIDADE DISABLED DIVERGENTE] ${relativePath}:${lineNum} (${selector.replace(/\s+/g, ' ')}) -> opacity: ${opacityVal} (Padrão canônico da suíte: 0.5)`
							);
						}
					}
				}
			}
		}

		if (violations.length > 0) {
			expect.fail(
				`Inconsistências de estado disabled detectadas entre componentes:\n\n${violations.join('\n')}`
			);
		}

		expect(violations).toHaveLength(0);
	});

	it('guarantees that all interactive form and action primitives implement focus indicators (:focus-visible or :focus-within)', () => {
		const interactiveComponents = [
			'actions/Button.svelte',
			'forms/Checkbox.svelte',
			'forms/ColorPicker.svelte',
			'forms/DatePicker.svelte',
			'forms/FileUpload.svelte',
			'forms/Input.svelte',
			'forms/Radio.svelte',
			'forms/Select.svelte',
			'forms/Switch.svelte',
			'forms/Tag.svelte',
			'forms/Tags.svelte',
			'forms/Textarea.svelte',
			'forms/TimePicker.svelte'
		];

		const missingFocus: string[] = [];

		for (const rel of interactiveComponents) {
			const fullPath = path.join(componentsDir, rel);
			const content = fs.readFileSync(fullPath, 'utf8');
			const styleMatch = /<style[^>]*>([\s\S]*?)<\/style>/.exec(content);
			const style = styleMatch ? styleMatch[1] : '';

			if (!style.includes(':focus-visible') && !style.includes(':focus-within')) {
				missingFocus.push(`  [SEM INDICADOR DE FOCO] src/lib/components/${rel}`);
			}
		}

		if (missingFocus.length > 0) {
			expect.fail(
				`Componentes interativos sem regra de foco acessível (:focus-visible / :focus-within):\n\n${missingFocus.join('\n')}`
			);
		}

		expect(missingFocus).toHaveLength(0);
	});

	it('guarantees that every component using CSS transitions respects @media (prefers-reduced-motion: reduce)', () => {
		const missingReducedMotion: string[] = [];

		for (const file of svelteFiles) {
			const relativePath = path.relative(process.cwd(), file);
			const content = fs.readFileSync(file, 'utf8');
			const styleMatch = /<style[^>]*>([\s\S]*?)<\/style>/.exec(content);
			if (!styleMatch) continue;

			const style = styleMatch[1];
			const hasTransition = /\btransition\s*:/.test(style);
			const hasReducedMotion = style.includes('prefers-reduced-motion');

			if (hasTransition && !hasReducedMotion) {
				missingReducedMotion.push(
					`  [SEM REDUCED-MOTION] ${relativePath} usa 'transition:' mas não declara '@media (prefers-reduced-motion: reduce)'`
				);
			}
		}

		if (missingReducedMotion.length > 0) {
			expect.fail(
				`Componentes com transições CSS sem suporte a prefers-reduced-motion:\n\n${missingReducedMotion.join('\n')}`
			);
		}

		expect(missingReducedMotion).toHaveLength(0);
	});

	it('guarantees that all boxed form field controls declare var(--bg-input) and var(--text-primary)', () => {
		const boxedFormControls = [
			'forms/Input.svelte',
			'forms/Select.svelte',
			'forms/Textarea.svelte',
			'forms/Tags.svelte',
			'forms/DatePicker.svelte',
			'forms/TimePicker.svelte',
			'forms/ColorPicker.svelte'
		];

		const surfaceViolations: string[] = [];

		for (const rel of boxedFormControls) {
			const fullPath = path.join(componentsDir, rel);
			const content = fs.readFileSync(fullPath, 'utf8');
			const styleMatch = /<style[^>]*>([\s\S]*?)<\/style>/.exec(content);
			const style = styleMatch ? styleMatch[1] : '';

			if (!style.includes('var(--bg-input)')) {
				surfaceViolations.push(
					`  [FUNDO DE INPUT AUSENTE] src/lib/components/${rel} não define 'background-color: var(--bg-input)'`
				);
			}

			if (!style.includes('var(--text-primary)')) {
				surfaceViolations.push(
					`  [COR DE TEXTO AUSENTE] src/lib/components/${rel} não define 'color: var(--text-primary)'`
				);
			}
		}

		if (surfaceViolations.length > 0) {
			expect.fail(
				`Inconsistências de superfície e cor base em controles de formulário:\n\n${surfaceViolations.join('\n')}`
			);
		}

		expect(surfaceViolations).toHaveLength(0);
	});
});
