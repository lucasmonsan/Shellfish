import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

function walkSvelteFiles(dir: string, fileList: string[] = []): string[] {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			walkSvelteFiles(fullPath, fileList);
		} else if (entry.isFile() && entry.name.endsWith('.svelte')) {
			fileList.push(fullPath);
		}
	}
	return fileList;
}

describe('Invariant Test: Universal Controls, Geometry & RestProps (SF-A03, SF-V05, SF-V06, SF-V09)', () => {
	const componentsDir = path.resolve('src/lib/components');
	const allComponents = walkSvelteFiles(componentsDir);

	it('guarantees Rule SF-A03: 100% of components declare ...restProps and bind {...restProps} to their root markup', () => {
		const missingPropsDeclaration: string[] = [];
		const missingMarkupBinding: string[] = [];

		for (const file of allComponents) {
			const relPath = path.relative(process.cwd(), file);
			const content = fs.readFileSync(file, 'utf8');

			if (!/\.\.\.restProps\b/.test(content)) {
				missingPropsDeclaration.push(relPath);
			}

			if (!/\{\s*\.\.\.restProps\s*\}/.test(content)) {
				missingMarkupBinding.push(relPath);
			}
		}

		expect(
			missingPropsDeclaration,
			`Componentes encontrados sem declaração de "...restProps":\n${missingPropsDeclaration.join('\n')}`
		).toHaveLength(0);

		expect(
			missingMarkupBinding,
			`Componentes encontrados sem binding de "{...restProps}":\n${missingMarkupBinding.join('\n')}`
		).toHaveLength(0);
	});

	it('guarantees Rule SF-V05: inline action and form controls enforce height/min-height using suite tokens', () => {
		const inlineControls = [
			'actions/Button.svelte',
			'actions/IconButton.svelte',
			'forms/Input.svelte',
			'forms/Select.svelte',
			'forms/Tags.svelte',
			'forms/DatePicker.svelte',
			'forms/TimePicker.svelte',
			'forms/ColorPicker.svelte'
		];

		const violations: string[] = [];

		for (const rel of inlineControls) {
			const fullPath = path.join(componentsDir, rel);
			if (!fs.existsSync(fullPath)) continue;

			const content = fs.readFileSync(fullPath, 'utf8');
			const hasHeightToken =
				/var\(--(?:control-height|btn-min-height|base)/.test(content) ||
				/min-height:\s*var\(--/.test(content);

			if (!hasHeightToken) {
				violations.push(`${rel} não declara min-height ou height baseado em tokens da suíte.`);
			}
		}

		expect(
			violations,
			`Violações de geometria de controles inline (SF-V05):\n${violations.join('\n')}`
		).toHaveLength(0);
	});

	it('guarantees Rule SF-V05: single-line action and badge primitives enforce white-space: nowrap and flex-shrink: 0', () => {
		const actionPrimitives = [
			'actions/Button.svelte',
			'display/Badge.svelte',
			'forms/Tag.svelte'
		];

		const violations: string[] = [];

		for (const rel of actionPrimitives) {
			const fullPath = path.join(componentsDir, rel);
			if (!fs.existsSync(fullPath)) continue;

			const content = fs.readFileSync(fullPath, 'utf8');
			const hasNowrap = /white-space\s*:\s*nowrap/.test(content);
			const hasFlexShrink = /flex-shrink\s*:\s*0/.test(content);

			if (!hasNowrap) {
				violations.push(`${rel} não declara 'white-space: nowrap'.`);
			}
			if (!hasFlexShrink) {
				violations.push(`${rel} não declara 'flex-shrink: 0'.`);
			}
		}

		// Garante que IconButton delega para Button com square={true}
		const iconButtonPath = path.join(componentsDir, 'actions/IconButton.svelte');
		const iconBtnContent = fs.readFileSync(iconButtonPath, 'utf8');
		expect(iconBtnContent).toContain('<Button');
		expect(iconBtnContent).toContain('square={true}');

		expect(
			violations,
			`Violações de integridade em controles single-line (SF-V05):\n${violations.join('\n')}`
		).toHaveLength(0);
	});

	it('guarantees Rule SF-V06: buttons and controls keep overflow: visible at rest (overflow: hidden only when morphing/collapsing)', () => {
		const buttonPath = path.join(componentsDir, 'actions/Button.svelte');
		const content = fs.readFileSync(buttonPath, 'utf8');

		// Garante que o estado base declara overflow: visible
		expect(content).toMatch(/button\s*\{[\s\S]*?overflow\s*:\s*visible/);
		// Garante que overflow: hidden é condicional ao estado .morphing
		expect(content).toMatch(/button\.morphing\s*\{[\s\S]*?overflow\s*:\s*hidden/);
	});

	it('guarantees Rule SF-V09: showcase catalog copy avoids promotional marketing buzzwords', () => {
		const routesDir = path.resolve('src/routes');
		if (!fs.existsSync(routesDir)) return;

		const routeFiles = walkSvelteFiles(routesDir);
		const forbiddenBuzzwords = [
			/\brevolucionário\b/i,
			/\binovador\b/i,
			/\bo melhor\b/i,
			/\bexclusivo\b/i,
			/\bimperdível\b/i,
			/\bsensacional\b/i
		];

		const violations: string[] = [];

		for (const file of routeFiles) {
			const content = fs.readFileSync(file, 'utf8');
			const rel = path.relative(process.cwd(), file);

			for (const pattern of forbiddenBuzzwords) {
				if (pattern.test(content)) {
					violations.push(`${rel} contém palavra promocional proibida (${pattern})`);
				}
			}
		}

		expect(
			violations,
			`Copy promocional detectada no catálogo Shellfish (SF-V09):\n${violations.join('\n')}`
		).toHaveLength(0);
	});
});
