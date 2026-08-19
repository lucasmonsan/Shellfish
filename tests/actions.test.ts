import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Actions & Navigation Components (Pure Semantics & Tactile Physics)', () => {
	const componentsDir = path.resolve(process.cwd(), 'src/lib/components/actions');

	it('Button.svelte deve usar tag <button> pura na raiz sem wrappers', () => {
		const content = fs.readFileSync(path.join(componentsDir, 'Button.svelte'), 'utf-8');
		expect(content).toMatch(/<button[\s\S]*>[\s\S]*<\/button>/);
		expect(content).not.toContain('<div class="button-wrapper"');
		expect(content).not.toContain('<span class="button-container"');
	});

	it('Button.svelte deve implementar a física mecânica real de sombra tátil', () => {
		const content = fs.readFileSync(path.join(componentsDir, 'Button.svelte'), 'utf-8');
		// Repouso
		expect(content).toContain('box-shadow: var(--shadow);');
		// Hover (elevação)
		expect(content).toContain('transform: translate(-1px, -1px);');
		expect(content).toContain('box-shadow: 3px 3px 0px var(--border-color);');
		// Active (compressão no chão)
		expect(content).toContain('transform: translate(2px, 2px);');
		expect(content).toContain('box-shadow: 0px 0px 0px var(--border-color);');
	});

	it('Button.svelte deve suportar loading com aria-busy e desabilitação automática', () => {
		const content = fs.readFileSync(path.join(componentsDir, 'Button.svelte'), 'utf-8');
		expect(content).toContain("aria-busy={loading ? 'true' : undefined}");
		expect(content).toContain('let isDisabled = $derived(disabled || loading);');
		expect(content).toContain('class="button-spinner"');
	});

	it('ButtonGroup.svelte deve agrupar botões com role="group"', () => {
		const content = fs.readFileSync(path.join(componentsDir, 'ButtonGroup.svelte'), 'utf-8');
		expect(content).toContain('role="group"');
		expect(content).toContain('margin-left: calc(var(--border-width) * -1);');
	});

	it('Tabs.svelte deve usar role="tablist" e botões com role="tab" e aria-selected', () => {
		const content = fs.readFileSync(path.join(componentsDir, 'Tabs.svelte'), 'utf-8');
		expect(content).toContain('role="tablist"');
		expect(content).toContain('role="tab"');
		expect(content).toContain('aria-selected={isSelected}');
		expect(content).toContain('tabindex={isSelected ? 0 : -1}');
		expect(content).toContain('handleKeydown');
	});
});
