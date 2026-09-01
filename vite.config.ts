import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { sveltekit } from '@sveltejs/kit/vite';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const catalogApiModule = 'virtual:shellfish-catalog-api';
const resolvedCatalogApiModule = `\0${catalogApiModule}`;

function readDocumentation(source: ts.SourceFile, node: ts.Node): string {
	const leading = source.text.slice(node.getFullStart(), node.getStart());
	const matches = [...leading.matchAll(/\/\*\*([\s\S]*?)\*\//g)];
	const raw = matches.at(-1)?.[1] ?? '';
	return raw
		.split('\n')
		.map((line) => line.replace(/^\s*\*?\s?/, '').trim())
		.filter((line) => line.length > 0 && !line.startsWith('@'))
		.join(' ');
}

function createCatalogApiModule(): string {
	const typesDirectory = path.resolve('src/lib/types');
	const api: Record<string, { name: string; documentation: string; props: unknown[] }> = {};

	for (const file of fs.readdirSync(typesDirectory).filter((name) => name.endsWith('.ts'))) {
		const source = ts.createSourceFile(
			file,
			fs.readFileSync(path.join(typesDirectory, file), 'utf8'),
			ts.ScriptTarget.Latest,
			true
		);
		for (const statement of source.statements) {
			if (!ts.isInterfaceDeclaration(statement) || !statement.name.text.endsWith('Props')) continue;
			api[statement.name.text] = {
				name: statement.name.text,
				documentation: readDocumentation(source, statement),
				props: statement.members.filter(ts.isPropertySignature).map((member) => ({
					name: member.name.getText(source),
					type: member.type?.getText(source) ?? 'unknown',
					optional: Boolean(member.questionToken),
					documentation: readDocumentation(source, member)
				}))
			};
		}
	}

	return `export default ${JSON.stringify(api)};`;
}

const catalogApiPlugin = {
	name: 'shellfish-catalog-api',
	resolveId(id: string) {
		return id === catalogApiModule ? resolvedCatalogApiModule : undefined;
	},
	load(id: string) {
		return id === resolvedCatalogApiModule ? createCatalogApiModule() : undefined;
	}
};

export default defineConfig({
	server: {
		port: 5172,
		host: true
	},
	preview: {
		port: 5172,
		host: true
	},
	plugins: [sveltekit(), catalogApiPlugin],
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }]
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**']
				}
			},

			{
				extends: './vite.config.ts',
				test: {
					name: 'unit',
					environment: 'node',
					include: ['tests/**/*.{test,spec}.{js,ts}', 'src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
