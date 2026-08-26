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

describe('Global Code Quality & Architecture Invariants (Scale-Proof)', () => {
	const srcDir = path.resolve(process.cwd(), 'src');
	const srcLibDir = path.resolve(process.cwd(), 'src/lib');
	const componentsDir = path.resolve(process.cwd(), 'src/lib/components');
	const typesDir = path.resolve(process.cwd(), 'src/lib/types');
	const staticDir = path.resolve(process.cwd(), 'static');

	const allSourceFiles = getFilesRecursively(srcDir, ['.svelte', '.ts', '.js', '.css']);
	const allComponentFiles = getFilesRecursively(componentsDir, ['.svelte']);
	const allTypeFiles = getFilesRecursively(typesDir, ['.ts']).filter(
		(f) => !f.endsWith('index.ts')
	);

	it('proíbe !important, exceto no reset global de movimento reduzido', () => {
		const violations: string[] = [];
		const allowedReducedMotionDeclarations = new Set([
			'animation-duration: 0.01ms !important;',
			'animation-iteration-count: 1 !important;',
			'transition-duration: 0.01ms !important;',
			'scroll-behavior: auto !important;'
		]);

		for (const file of allSourceFiles) {
			if (file.endsWith('modern-normalize.css')) continue;

			const content = fs.readFileSync(file, 'utf-8');
			const relPath = path.relative(process.cwd(), file);

			for (const line of content.split('\n')) {
				if (!line.includes('!important')) continue;

				if (file.endsWith('index.css') && allowedReducedMotionDeclarations.has(line.trim())) {
					continue;
				}

				violations.push(`${relPath}: ${line.trim()}`);
			}
		}

		expect(violations, 'Arquivos contendo !important não permitido').toEqual([]);
	});

	it('proíbe z-index numérico em componentes', () => {
		const violations: string[] = [];

		for (const file of allComponentFiles) {
			const content = fs.readFileSync(file, 'utf-8');
			if (/z-index:\s*\d/.test(content)) {
				violations.push(path.relative(process.cwd(), file));
			}
		}

		expect(violations, 'Componentes com z-index numérico').toEqual([]);
	});

	it('proíbe desativadores de linter e supressores de TypeScript em todo o projeto (src/)', () => {
		const violations: string[] = [];

		for (const file of allSourceFiles) {
			const content = fs.readFileSync(file, 'utf-8');
			if (
				content.includes('eslint-disable') ||
				content.includes('@ts-ignore') ||
				content.includes('@ts-expect-error') ||
				content.includes('svelte-ignore') ||
				content.includes('@ts-nocheck') ||
				content.includes('prettier-ignore')
			) {
				violations.push(path.relative(process.cwd(), file));
			}
		}

		expect(violations, 'Supressores de linter/TypeScript/Svelte encontrados').toEqual([]);
	});

	it('proíbe emojis hardcoded nos arquivos da biblioteca src/lib/', () => {
		const emojiRegex =
			/[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}]/u;
		const violations: string[] = [];

		for (const file of allSourceFiles.filter((f) => f.includes('src/lib/'))) {
			const content = fs.readFileSync(file, 'utf-8');
			if (emojiRegex.test(content)) {
				violations.push(path.relative(process.cwd(), file));
			}
		}

		expect(violations, 'Emojis hardcoded encontrados em src/lib/').toEqual([]);
	});

	it('garante que 100% dos componentes Svelte utilizem Runes do Svelte 5 e proíbe sintaxe legado do Svelte 4', () => {
		const legacyViolations: string[] = [];

		for (const file of allComponentFiles) {
			const content = fs.readFileSync(file, 'utf-8');
			const relPath = path.relative(process.cwd(), file);

			// Proíbe sintaxes legadas do Svelte 4
			if (content.match(/\bexport\s+let\s+/)) {
				legacyViolations.push(`${relPath}: usa export let (Svelte 4 legado)`);
			}
			if (content.includes('$$props') || content.includes('$$restProps')) {
				legacyViolations.push(`${relPath}: usa $$props/$$restProps`);
			}
			if (content.match(/<slot(\s|>|\/)/)) {
				legacyViolations.push(`${relPath}: usa <slot> em vez de Snippets/children`);
			}
			if (content.includes('beforeUpdate') || content.includes('afterUpdate')) {
				legacyViolations.push(`${relPath}: usa lifecycle legado`);
			}
		}

		expect(legacyViolations, 'Componentes contendo sintaxes legadas do Svelte 4').toEqual([]);
	});

	it('proíbe expressamente cores rgba() hardcoded em todos os componentes de src/lib/ (deve usar tokens ou color-mix)', () => {
		const rgbaViolations: string[] = [];

		for (const file of allComponentFiles) {
			const content = fs.readFileSync(file, 'utf-8');
			if (content.includes('rgba(')) {
				rgbaViolations.push(path.relative(process.cwd(), file));
			}
		}

		expect(rgbaViolations, 'Cores rgba() hardcoded encontradas em componentes').toEqual([]);
	});

	it('valida existência de todo o bundle de ícones PWA e referências no site.webmanifest e app.html', () => {
		const requiredIcons = [
			'favicon.svg',
			'apple-touch-icon.png',
			'web-app-manifest-192x192.png',
			'web-app-manifest-512x512.png',
			'site.webmanifest'
		];

		for (const icon of requiredIcons) {
			const iconPath = path.join(staticDir, icon);
			expect(fs.existsSync(iconPath), `Arquivo ${icon} deve existir em static/`).toBe(true);
		}

		const appHtmlContent = fs.readFileSync(path.resolve(srcDir, 'app.html'), 'utf-8');
		expect(appHtmlContent).toContain('rel="icon"');
		expect(appHtmlContent).toContain('rel="apple-touch-icon"');
		expect(appHtmlContent).toContain('rel="manifest"');
	});

	it('valida configuração E2E com pnpm e porta 5172 no playwright.config.ts e vite.config.ts', () => {
		const playwrightConfig = fs.readFileSync(
			path.resolve(process.cwd(), 'playwright.config.ts'),
			'utf-8'
		);
		const viteConfig = fs.readFileSync(path.resolve(process.cwd(), 'vite.config.ts'), 'utf-8');

		expect(playwrightConfig).toContain("command: 'pnpm run build && pnpm run preview'");
		expect(playwrightConfig).toContain('port: 5172');
		expect(viteConfig).toContain('port: 5172');
	});

	it('garante que a versão de package.json seja a fonte da verdade evolutiva e o README não use links file://', () => {
		const pkg = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf-8'));
		const readmeContent = fs.readFileSync(path.resolve(process.cwd(), 'README.md'), 'utf-8');
		const showcaseContent = fs.readFileSync(
			path.resolve(process.cwd(), 'src/routes/+page.svelte'),
			'utf-8'
		);
		const layoutServerContent = fs.readFileSync(
			path.resolve(process.cwd(), 'src/routes/+layout.server.ts'),
			'utf-8'
		);

		expect(pkg.version).toBeDefined();
		expect(layoutServerContent).toContain('version: pkg.version');
		expect(showcaseContent).toContain('v{data.version}');
		expect(readmeContent).not.toContain('file://');
		expect(readmeContent).toContain('[LICENSE](./LICENSE)');
	});

	it('garante dinamicamente que TODOS os componentes criados em src/lib/components/ estejam exportados em src/lib/index.ts', () => {
		const indexContent = fs.readFileSync(path.resolve(srcLibDir, 'index.ts'), 'utf-8');
		const missingExports: string[] = [];

		for (const file of allComponentFiles) {
			const componentName = path.basename(file, '.svelte');
			const exportRegex = new RegExp(`\\b${componentName}\\b`);

			if (!exportRegex.test(indexContent)) {
				missingExports.push(componentName);
			}
		}

		expect(
			missingExports,
			'Componentes existentes em src/lib/components mas não exportados em src/lib/index.ts'
		).toEqual([]);
	});

	it('garante dinamicamente que TODOS os módulos de tipos em src/lib/types/ estejam re-exportados em src/lib/types/index.ts', () => {
		const typesIndexContent = fs.readFileSync(path.resolve(typesDir, 'index.ts'), 'utf-8');
		const missingTypeExports: string[] = [];

		for (const file of allTypeFiles) {
			const moduleName = path.basename(file, '.ts');
			const exportPattern = `./${moduleName}.js`;

			if (!typesIndexContent.includes(exportPattern)) {
				missingTypeExports.push(moduleName);
			}
		}

		expect(missingTypeExports, 'Módulos de tipos não exportados em src/lib/types/index.ts').toEqual(
			[]
		);
	});
});
