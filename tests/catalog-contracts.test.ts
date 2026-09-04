import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { catalogEntries } from '../src/routes/components/_catalog/registry.js';
import { getCatalogGuide } from '../src/routes/components/_catalog/guides.js';

const root = process.cwd();
const componentsDirectory = path.join(root, 'src/lib/components');
const typesDirectory = path.join(root, 'src/lib/types');

function listComponents(directory: string): string[] {
	return fs.readdirSync(directory, { withFileTypes: true }).flatMap((item) => {
		const itemPath = path.join(directory, item.name);
		return item.isDirectory()
			? listComponents(itemPath)
			: item.name.endsWith('.svelte')
				? [path.basename(item.name, '.svelte')]
				: [];
	});
}

function readInterfaces(): Map<string, string[]> {
	const interfaces = new Map<string, string[]>();
	for (const filename of fs.readdirSync(typesDirectory).filter((name) => name.endsWith('.ts'))) {
		const source = ts.createSourceFile(
			filename,
			fs.readFileSync(path.join(typesDirectory, filename), 'utf8'),
			ts.ScriptTarget.Latest,
			true
		);
		for (const statement of source.statements) {
			if (ts.isInterfaceDeclaration(statement) && statement.name.text.endsWith('Props')) {
				interfaces.set(
					statement.name.text,
					statement.members
						.filter(ts.isPropertySignature)
						.map((member) => member.name.getText(source))
				);
			}
		}
	}
	return interfaces;
}

describe('Catalog contracts', () => {
	it('locks the complete current public component inventory', () => {
		const expected = [
			'Alert',
			'Avatar',
			'Badge',
			'Button',
			'Calendar',
			'Card',
			'Checkbox',
			'Chips',
			'Column',
			'Dialog',
			'Divider',
			'Dropdown',
			'Footer',
			'Grid',
			'Header',
			'Input',
			'LocaleSelector',
			'Main',
			'ProgressBar',
			'Radio',
			'Row',
			'Section',
			'Select',
			'Slider',
			'Spinner',
			'Switch',
			'Tabs',
			'Textarea',
			'ThemeSelector',
			'Toast'
		];
		expect([...catalogEntries.map((entry) => entry.name)].sort()).toEqual(expected);
	});

	it('requires every discovered component to be exported, cataloged and dynamically loadable', async () => {
		const componentNames = listComponents(componentsDirectory).sort();
		const exports = fs.readFileSync(path.join(root, 'src/lib/index.ts'), 'utf8');
		expect(catalogEntries.map((entry) => entry.name).sort()).toEqual(componentNames);
		for (const entry of catalogEntries) {
			expect(exports).toContain(`default as ${entry.name}`);
			await expect(entry.load()).resolves.toHaveProperty('default');
			await expect(entry.loadDemo()).resolves.toHaveProperty('default');
			for (const locale of ['pt-BR', 'en-US'] as const) {
				const guide = getCatalogGuide(locale, entry.name);
				expect(guide.summary, `${entry.name} ${locale} summary`).not.toHaveLength(0);
				expect(guide.when, `${entry.name} ${locale} when`).not.toHaveLength(0);
				expect(guide.avoid, `${entry.name} ${locale} avoid`).not.toHaveLength(0);
				expect(guide.accessibility, `${entry.name} ${locale} accessibility`).not.toHaveLength(0);
			}
		}
	}, 20_000);

	it('requires every catalog prop list to exactly match its direct Props interface', () => {
		const interfaces = readInterfaces();
		for (const entry of catalogEntries) {
			expect(interfaces.get(entry.propsType), entry.name).toBeDefined();
			expect([...entry.props].sort(), entry.name).toEqual(
				[...(interfaces.get(entry.propsType) ?? [])].sort()
			);
		}
	});

	it('requires stable unique category and component route identities', () => {
		const ids = catalogEntries.map((entry) => `${entry.category}/${entry.slug}`);
		expect(new Set(ids).size).toBe(ids.length);
		for (const entry of catalogEntries) expect(entry.slug).toMatch(/^[a-z0-9-]+$/);
	});
});
