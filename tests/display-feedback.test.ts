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

describe('Display, Feedback & Suite Components (Pure Semantics & Native Top Layer)', () => {
	const displayDir = path.resolve(process.cwd(), 'src/lib/components/display');
	const feedbackDir = path.resolve(process.cwd(), 'src/lib/components/feedback');
	const suiteDir = path.resolve(process.cwd(), 'src/lib/components/suite');

	const allDisplayAndFeedback = [
		...getFilesRecursively(displayDir, ['.svelte']),
		...getFilesRecursively(feedbackDir, ['.svelte']),
		...getFilesRecursively(suiteDir, ['.svelte'])
	];

	it('garante dinamicamente que todos os componentes de display, feedback e suíte aceitem e propaguem a prop class', () => {
		const propViolations: string[] = [];

		for (const file of allDisplayAndFeedback) {
			const content = fs.readFileSync(file, 'utf-8');
			const relPath = path.relative(process.cwd(), file);

			if (!content.includes('class: className') && !content.includes('class={className}')) {
				propViolations.push(`${relPath}: Não aceita ou não propaga prop class`);
			}
			if (!content.includes('...restProps')) {
				propViolations.push(`${relPath}: Não propaga ...restProps`);
			}
		}

		expect(propViolations, 'Componentes sem propagação de class ou restProps').toEqual([]);
	});

	it('Card.svelte deve usar tag <article> pura na raiz, física interativa, header de 42px e suporte a collapsible e badgeTitle', () => {
		const content = fs.readFileSync(path.join(displayDir, 'Card.svelte'), 'utf-8');
		expect(content).toMatch(/<article[\s\S]*>[\s\S]*<\/article>/);
		expect(content).not.toContain('<div class="card-container"');
		expect(content).toContain("article[data-interactive='true']:hover");
		expect(content).toContain('transform: translate(-1px, -1px);');
		expect(content).toContain('min-height: 42px;');
		expect(content).toContain('collapsible = false');
		expect(content).toContain('class="card-chevron"');
		expect(content).toContain('card-straddled-badge');
	});

	it('Badge.svelte deve renderizar <span> diretamente', () => {
		const content = fs.readFileSync(path.join(displayDir, 'Badge.svelte'), 'utf-8');
		expect(content).toMatch(/<span[\s\S]*>[\s\S]*<\/span>/);
		expect(content).toContain("span[data-pill='true']");
	});

	it('Divider.svelte deve renderizar <hr> puro quando sem rótulo', () => {
		const content = fs.readFileSync(path.join(displayDir, 'Divider.svelte'), 'utf-8');
		expect(content).toContain('<hr');
		expect(content).toContain('border-top: var(--border-width) solid var(--border-color);');
	});

	it('Avatar.svelte deve suportar imagem, iniciais e fallback SVG', () => {
		const content = fs.readFileSync(path.join(displayDir, 'Avatar.svelte'), 'utf-8');
		expect(content).toContain('<img {src} {alt} />');
		expect(content).toContain('class="initials"');
		expect(content).toContain('aria-hidden="true"');
	});

	it('Alert.svelte deve usar <aside role="alert"> diretamente', () => {
		const content = fs.readFileSync(path.join(feedbackDir, 'Alert.svelte'), 'utf-8');
		expect(content).toContain('role="alert"');
		expect(content).toContain('<aside');
	});

	it('Spinner.svelte deve renderizar SVG contínuo com a11y', () => {
		const content = fs.readFileSync(path.join(feedbackDir, 'Spinner.svelte'), 'utf-8');
		expect(content).toContain('role="status"');
		expect(content).toContain("aria-label={label ?? t('spinner.loading')}");
		expect(content).toContain('animation: spin 0.75s linear infinite;');
	});

	it('Dialog.svelte deve usar tag HTML5 <dialog> nativa com .showModal() e backdrop', () => {
		const content = fs.readFileSync(path.join(feedbackDir, 'Dialog.svelte'), 'utf-8');
		expect(content).toContain('<dialog');
		expect(content).toContain('dialogEl.showModal();');
		expect(content).toContain('dialogEl.close();');
		expect(content).toContain('dialog::backdrop');
	});

	it('Toast.svelte deve renderizar <aside role="status"> com auto-dismiss', () => {
		const content = fs.readFileSync(path.join(feedbackDir, 'Toast.svelte'), 'utf-8');
		expect(content).toContain('role="status"');
		expect(content).toContain('aria-live="polite"');
		expect(content).toContain('z-index: var(--z-toast);');
	});

	it('ThemeSelector.svelte deve alternar tema e sincronizar com localStorage e data-theme', () => {
		const content = fs.readFileSync(path.join(suiteDir, 'ThemeSelector.svelte'), 'utf-8');
		expect(content).toContain("document.documentElement.setAttribute('data-theme',");
		expect(content).toContain('localStorage.setItem(storageKey,');
	});
});
