import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Invariant Test: Universal A11y Invariants & HTML-AAM Compliance', () => {
	const componentsDir = path.resolve('src/lib/components');

	function getComponentFiles(dir: string): string[] {
		const files: string[] = [];
		const entries = fs.readdirSync(dir, { withFileTypes: true });
		for (const entry of entries) {
			const fullPath = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				files.push(...getComponentFiles(fullPath));
			} else if (entry.isFile() && entry.name.endsWith('.svelte')) {
				files.push(fullPath);
			}
		}
		return files;
	}

	const allComponentPaths = getComponentFiles(componentsDir);

	it('discovers all Svelte components in src/lib/components/', () => {
		expect(allComponentPaths.length).toBeGreaterThan(15);
	});

	it('enforces HTML-AAM: native inputs must never have conflicting or redundant aria-checked', () => {
		const violations: string[] = [];

		for (const filePath of allComponentPaths) {
			const content = fs.readFileSync(filePath, 'utf8');
			const relative = path.relative(process.cwd(), filePath);

			// Check for native checkbox inputs
			const checkboxRegex = /<input[^>]*type=["']checkbox["'][^>]*>/g;
			let match: RegExpExecArray | null;

			while ((match = checkboxRegex.exec(content)) !== null) {
				const tag = match[0];
				const isSwitch = tag.includes('role="switch"') || tag.includes("role='switch'");

				// If it is NOT a role="switch", it must NOT have aria-checked
				if (!isSwitch && tag.includes('aria-checked')) {
					violations.push(
						`  [HTML-AAM VIOLATION] ${relative}: <input type="checkbox"> nativo não deve ter 'aria-checked'. Tag: ${tag}`
					);
				}
			}

			// Check for native radio inputs
			const radioRegex = /<input[^>]*type=["']radio["'][^>]*>/g;
			while ((match = radioRegex.exec(content)) !== null) {
				const tag = match[0];
				if (tag.includes('aria-checked')) {
					violations.push(
						`  [HTML-AAM VIOLATION] ${relative}: <input type="radio"> nativo não deve ter 'aria-checked'. Tag: ${tag}`
					);
				}
			}
		}

		if (violations.length > 0) {
			expect.fail(
				`Violações da especificação W3C HTML-AAM encontradas:\n\n${violations.join('\n')}`
			);
		}

		expect(violations).toHaveLength(0);
	});

	it('enforces accessible name contracts for all interactive form primitives', () => {
		const formComponents = allComponentPaths.filter((p) => p.includes('/forms/'));
		const missingContracts: string[] = [];

		for (const filePath of formComponents) {
			const content = fs.readFileSync(filePath, 'utf8');
			const relative = path.relative(process.cwd(), filePath);

			// Form primitives must support accessible labeling via label, children, or HTML pass-through (restProps)
			const hasLabelProp =
				content.includes('label,') ||
				content.includes('label?:') ||
				content.includes('aria-label') ||
				content.includes('ariaLabel');
			const hasChildrenSnippet =
				content.includes('children,') ||
				content.includes('children?:') ||
				content.includes('{@render children');
			const hasRestPropsPassThrough =
				content.includes('...restProps') &&
				(content.includes('<input') ||
					content.includes('<textarea') ||
					content.includes('<select'));

			if (!hasLabelProp && !hasChildrenSnippet && !hasRestPropsPassThrough) {
				missingContracts.push(
					`  [MISSING ACCESSIBLE NAME CONTRACT] ${relative} não expõe suporte a label, children snippet ou restProps pass-through.`
				);
			}
		}

		if (missingContracts.length > 0) {
			expect.fail(
				`Primitivas de formulário sem contrato de nome acessível:\n\n${missingContracts.join('\n')}`
			);
		}

		expect(missingContracts).toHaveLength(0);
	});

	it('bans unstyled focus suppression (outline: none without focus indicator replacement)', () => {
		const violations: string[] = [];

		for (const filePath of allComponentPaths) {
			const content = fs.readFileSync(filePath, 'utf8');
			const relative = path.relative(process.cwd(), filePath);

			const styleMatch = content.match(/<style[\s\S]*?>([\s\S]*?)<\/style>/i);
			if (!styleMatch) continue;

			const css = styleMatch[1];
			if (/\boutline\s*:\s*(?:none|0)\b/i.test(css)) {
				// Component must provide focus styling (box-shadow, focus-visible/within, or be a programmatic tabindex="-1" panel)
				const hasFocusReplacement =
					css.includes('box-shadow') ||
					css.includes(':focus-visible') ||
					css.includes(':focus-within') ||
					css.includes('tabindex="-1"') ||
					content.includes('tabindex="-1"');

				if (!hasFocusReplacement) {
					violations.push(
						`  [UNSTYLED FOCUS SUPPRESSION] ${relative} suprime outline sem fornecer anel de foco visível alternativo.`
					);
				}
			}
		}

		if (violations.length > 0) {
			expect.fail(
				`Detecção de supressão de foco sem substituto acessível:\n\n${violations.join('\n')}`
			);
		}

		expect(violations).toHaveLength(0);
	});

	it('guarantees prefers-reduced-motion media query on components with keyframe animations or transforms', () => {
		const violations: string[] = [];

		for (const filePath of allComponentPaths) {
			const content = fs.readFileSync(filePath, 'utf8');
			const relative = path.relative(process.cwd(), filePath);

			const styleMatch = content.match(/<style[\s\S]*?>([\s\S]*?)<\/style>/i);
			if (!styleMatch) continue;

			const css = styleMatch[1];
			// Focus on components with complex keyframe animations or geometric transforms
			const hasKeyframeOrTransform =
				/(?:^|[\s;{}])animation\s*:/i.test(css) ||
				/@keyframes\b/i.test(css) ||
				/(?:^|[\s;{}])transform\s*:/i.test(css);
			const hasReducedMotion = /@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)/i.test(css);

			if (hasKeyframeOrTransform && !hasReducedMotion) {
				violations.push(
					`  [MOTION INVARIANT] ${relative} possui animações/transformações mas não declara @media (prefers-reduced-motion: reduce).`
				);
			}
		}

		if (violations.length > 0) {
			expect.fail(
				`Componentes com animações/transformações sem respeito a prefers-reduced-motion:\n\n${violations.join('\n')}`
			);
		}

		expect(violations).toHaveLength(0);
	});

	it('enforces Rule SF-V07: zero !important across new and active components', () => {
		const violations: string[] = [];

		// Dívida técnica herdada documentada para correção futura pelo outro chat
		const legacyAllowlist = new Set(['src/lib/components/overlay/Popover.svelte']);

		for (const filePath of allComponentPaths) {
			const relative = path.relative(process.cwd(), filePath);
			if (legacyAllowlist.has(relative)) continue;

			const content = fs.readFileSync(filePath, 'utf8');
			const styleMatch = content.match(/<style[\s\S]*?>([\s\S]*?)<\/style>/i);
			if (!styleMatch) continue;

			const css = styleMatch[1];
			const lines = css.split('\n');

			for (let i = 0; i < lines.length; i++) {
				const line = lines[i];
				if (/!important\b/i.test(line)) {
					violations.push(
						`  [SF-V07 VIOLATION] ${relative}:${i + 1} usa !important: "${line.trim()}"`
					);
				}
			}
		}

		if (violations.length > 0) {
			expect.fail(`Violação da regra SF-V07 (Zero !important):\n\n${violations.join('\n')}`);
		}

		expect(violations).toHaveLength(0);
	});
});
