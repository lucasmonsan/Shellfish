import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import * as PublicApi from '$lib/index.js';

describe('Public API Contract Snapshot Invariant', () => {
	it('guarantees that all official components and utilities are properly exported', () => {
		const expectedExports = [
			// Utilitários de i18n
			'i18n',
			't',
			'translations',
			'createI18n',
			'setI18n',
			'getI18n',
			'parseAcceptLanguage',
			'I18N_CONTEXT_KEY',

			// Layout
			'AppShell',
			'Column',
			'Grid',
			'Row',
			'Section',

			// Actions
			'Button',
			'IconButton',

			// Display
			'Badge',
			'Card',
			'Divider',
			'Image',

			// Feedback
			'Spinner',

			// Overlays
			'Popover',
			'Modal',
			'Drawer',
			'Tooltip',
			'overlayStack',

			// Forms
			'Input',
			'FormField',
			'FormStack',
			'Checkbox',
			'Radio',
			'RadioGroup',
			'Switch',
			'Select',
			'Textarea',
			'Tag',
			'Chip',
			'Tags',
			'TagInput',
			'FileUpload',
			'ColorPicker',
			'DatePicker',
			'TimePicker'
		];

		const actualExports = Object.keys(PublicApi);

		for (const exp of expectedExports) {
			expect(
				actualExports,
				`Export público '${exp}' não foi encontrado em src/lib/index.ts`
			).toContain(exp);

			expect(
				PublicApi[exp as keyof typeof PublicApi],
				`Export público '${exp}' está undefined em src/lib/index.ts`
			).toBeDefined();
		}

		// Garante que Chip e TagInput são aliases idênticos
		expect(PublicApi.Chip).toBe(PublicApi.Tag);
		expect(PublicApi.TagInput).toBe(PublicApi.Tags);
	});

	it('guarantees that compiled dist/ package has zero unresolved $lib aliases and valid CSS exports', () => {
		const distPath = path.resolve('dist');
		if (!fs.existsSync(distPath)) {
			try {
				execSync('pnpm run build:package', { stdio: 'pipe' });
			} catch (err) {
				expect.fail(`Falha ao compilar o pacote com 'pnpm run build:package': ${String(err)}`);
			}
		}

		if (!fs.existsSync(distPath)) {
			expect.fail('Diretório dist/ não pôde ser gerado para os testes de integridade do pacote.');
		}

		const indexJsPath = path.join(distPath, 'index.js');
		const indexDtsPath = path.join(distPath, 'index.d.ts');
		const cssPath = path.join(distPath, 'styles/index.css');
		const varsPath = path.join(distPath, 'styles/variables.css');

		expect(fs.existsSync(indexJsPath), 'dist/index.js deve existir').toBe(true);
		expect(fs.existsSync(indexDtsPath), 'dist/index.d.ts deve existir').toBe(true);
		expect(fs.existsSync(cssPath), 'dist/styles/index.css deve existir').toBe(true);
		expect(fs.existsSync(varsPath), 'dist/styles/variables.css deve existir').toBe(true);

		const indexJs = fs.readFileSync(indexJsPath, 'utf8');
		expect(indexJs).not.toContain('$lib/');

		const indexDts = fs.readFileSync(indexDtsPath, 'utf8');
		expect(indexDts).not.toContain('$lib/');
	});
});
