import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Actions & Interactive Tactile Physics Engine', () => {
	const actionsDir = path.resolve(process.cwd(), 'src/lib/components/actions');
	const suiteDir = path.resolve(process.cwd(), 'src/lib/components/suite');
	const interactiveFiles = [
		path.join(actionsDir, 'Button.svelte'),
		path.join(suiteDir, 'ThemeSelector.svelte'),
		path.join(suiteDir, 'LocaleSelector.svelte')
	];

	it('garante dinamicamente que todos os controles acionáveis implementem a fórmula matemática da física tátil', () => {
		const formulaViolations: string[] = [];

		for (const file of interactiveFiles) {
			const content = fs.readFileSync(file, 'utf-8');
			const relPath = path.relative(process.cwd(), file);

			const hasRestShadow =
				content.includes('box-shadow: var(--shadow);') ||
				content.includes('box-shadow: 1px 1px 0px');
			const hasHoverElevation =
				content.includes('transform: translate(-1px, -1px);') &&
				content.includes('box-shadow: 2px 2px 0px var(--border-color);');
			const hasActiveCompression =
				content.includes('transform: translate(1px, 1px);') &&
				(content.includes('box-shadow: 0px 0px 0px') ||
					content.includes('box-shadow: 0px 0px 0px var(--border-color);'));

			if (!hasRestShadow || !hasHoverElevation || !hasActiveCompression) {
				formulaViolations.push(
					`${relPath}: Divergência na fórmula mecânica tátil (repouso, elevação ou compressão)`
				);
			}
		}

		expect(formulaViolations, 'Violações na física mecânica tátil').toEqual([]);
	});

	it('Button.svelte deve usar tag <button> pura na raiz sem wrappers', () => {
		const content = fs.readFileSync(path.join(actionsDir, 'Button.svelte'), 'utf-8');
		expect(content).toMatch(/<button[\s\S]*>[\s\S]*<\/button>/);
		expect(content).not.toContain('<div');
	});

	it('Button.svelte deve suportar loading com aria-busy e desabilitação automática', () => {
		const content = fs.readFileSync(path.join(actionsDir, 'Button.svelte'), 'utf-8');
		expect(content).toContain("aria-busy={loading ? 'true' : undefined}");
		expect(content).toContain('let isDisabled = $derived(disabled || loading);');
		expect(content).toContain('class="button-spinner"');
	});

	it('Tabs.svelte deve usar role="tablist" e botões com role="tab" e aria-selected', () => {
		const content = fs.readFileSync(path.join(actionsDir, 'Tabs.svelte'), 'utf-8');
		expect(content).toContain('role="tablist"');
		expect(content).toContain('role="tab"');
		expect(content).toContain('aria-selected={isSelected}');
		expect(content).toContain('tabindex={isSelected ? 0 : -1}');
		expect(content).toContain('handleKeydown');
	});
});
