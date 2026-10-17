import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { translations } from '$lib/utils/i18n.svelte.js';
import type { Locale } from '$lib/types/i18n.js';

describe('Invariant Test: i18n Zero-Exception Linguistic & Structural Integrity', () => {
	const locales: Locale[] = ['pt-BR', 'en-US', 'es'];
	const pt = translations['pt-BR'];
	const en = translations['en-US'];
	const es = translations['es'];

	it('guarantees 100% key parity across all 3 locales (pt-BR, en-US, es)', () => {
		const ptKeys = new Set(Object.keys(pt));
		const enKeys = new Set(Object.keys(en));
		const esKeys = new Set(Object.keys(es));

		const allKeys = new Set([...ptKeys, ...enKeys, ...esKeys]);
		const missing: string[] = [];

		for (const key of allKeys) {
			const missingIn: string[] = [];
			if (!ptKeys.has(key)) missingIn.push('pt-BR');
			if (!enKeys.has(key)) missingIn.push('en-US');
			if (!esKeys.has(key)) missingIn.push('es');

			if (missingIn.length > 0) {
				missing.push(`  [CHAVE FALTANDO] '${key}' não declarada em: ${missingIn.join(', ')}`);
			}
		}

		if (missing.length > 0) {
			expect.fail(`Inconsistência de paridade de chaves no i18n:\n\n${missing.join('\n')}`);
		}

		expect(ptKeys.size).toBe(enKeys.size);
		expect(enKeys.size).toBe(esKeys.size);
	});

	it('guarantees that every translation key used in src/ exists in translations dictionary', () => {
		const usedKeys = new Set<string>();
		const srcDir = path.resolve('src');

		function scanFiles(dir: string) {
			const entries = fs.readdirSync(dir, { withFileTypes: true });
			for (const entry of entries) {
				const fullPath = path.join(dir, entry.name);
				if (entry.isDirectory()) {
					scanFiles(fullPath);
				} else if (
					entry.isFile() &&
					(entry.name.endsWith('.svelte') || entry.name.endsWith('.ts'))
				) {
					const content = fs.readFileSync(fullPath, 'utf8');
					const keyRegex = /\b(?:i18n\.)?t\(\s*['"]([a-zA-Z0-9_.-]+)['"]/g;
					let match: RegExpExecArray | null;
					while ((match = keyRegex.exec(content)) !== null) {
						usedKeys.add(match[1]);
					}
				}
			}
		}

		scanFiles(srcDir);

		const missingFromDict: string[] = [];
		for (const key of usedKeys) {
			for (const loc of locales) {
				if (!translations[loc]?.[key]) {
					missingFromDict.push(
						`  [CHAVE INEXISTENTE] '${key}' usada no código mas ausente em '${loc}'`
					);
				}
			}
		}

		if (missingFromDict.length > 0) {
			expect.fail(
				`Chaves usadas no código não estão no dicionário i18n:\n\n${missingFromDict.join('\n')}`
			);
		}

		expect(missingFromDict).toHaveLength(0);
	});

	it('guarantees no empty strings or key-echoing fallbacks', () => {
		for (const loc of locales) {
			const dict = translations[loc];
			for (const [key, value] of Object.entries(dict)) {
				expect(value.trim().length, `Chave '${key}' em '${loc}' está vazia`).toBeGreaterThan(0);
				expect(
					value,
					`Chave '${key}' em '${loc}' replica o próprio identificador da chave`
				).not.toBe(key);
			}
		}
	});

	it('guarantees template parameter parity ({param}) across locales', () => {
		const paramRegex = /\{(\w+)\}/g;
		const allKeys = Object.keys(pt);

		for (const key of allKeys) {
			const ptParams = Array.from(pt[key]?.matchAll(paramRegex) ?? [], (m) => m[1]).sort();
			const enParams = Array.from(en[key]?.matchAll(paramRegex) ?? [], (m) => m[1]).sort();
			const esParams = Array.from(es[key]?.matchAll(paramRegex) ?? [], (m) => m[1]).sort();

			expect(
				enParams,
				`Parâmetros de template divergentes na chave '${key}' entre pt-BR e en-US`
			).toEqual(ptParams);
			expect(
				esParams,
				`Parâmetros de template divergentes na chave '${key}' entre pt-BR e es`
			).toEqual(ptParams);
		}
	});

	it('detects untranslated English leakages in pt-BR and es dictionaries', () => {
		const forbiddenEnglishTerms = [
			'small',
			'medium',
			'large',
			'disabled',
			'loading...',
			'search...',
			'submit form'
		];

		const violations: string[] = [];

		for (const [key, value] of Object.entries(pt)) {
			const valLower = value.toLowerCase();
			for (const term of forbiddenEnglishTerms) {
				const regex = new RegExp(`\\b${term}\\b`, 'i');
				if (regex.test(valLower)) {
					violations.push(
						`  [pt-BR] Chave '${key}' contém termo em inglês não traduzido: "${term}" em "${value}"`
					);
				}
			}
		}

		for (const [key, value] of Object.entries(es)) {
			const valLower = value.toLowerCase();
			for (const term of forbiddenEnglishTerms) {
				const regex = new RegExp(`\\b${term}\\b`, 'i');
				if (regex.test(valLower)) {
					violations.push(
						`  [es] Chave '${key}' contém termo em inglês não traduzido: "${term}" em "${value}"`
					);
				}
			}
		}

		if (violations.length > 0) {
			expect.fail(
				`Vazamento linguístico (termos em inglês não traduzidos):\n\n${violations.join('\n')}`
			);
		}

		expect(violations).toHaveLength(0);
	});

	it('enforces Zero-Exception rule: no translatable attributes hardcoded with raw strings', () => {
		const srcDir = path.resolve('src/routes');
		const translatableProps = ['placeholder', 'aria-label', 'helper', 'error'];
		const violations: string[] = [];

		function scanSvelteTemplates(dir: string) {
			const entries = fs.readdirSync(dir, { withFileTypes: true });
			for (const entry of entries) {
				const fullPath = path.join(dir, entry.name);
				if (entry.isDirectory()) {
					scanSvelteTemplates(fullPath);
				} else if (entry.isFile() && entry.name.endsWith('.svelte')) {
					const content = fs.readFileSync(fullPath, 'utf8');
					const relative = path.relative(process.cwd(), fullPath);

					// Remove script, style, svg and comments
					const template = content
						.replace(/<script[\s\S]*?<\/script>/gi, '')
						.replace(/<style[\s\S]*?<\/style>/gi, '')
						.replace(/<!--[\s\S]*?-->/g, '')
						.replace(/<svg[\s\S]*?<\/svg>/gi, '');

					const lines = template.split('\n');
					for (let i = 0; i < lines.length; i++) {
						const line = lines[i];
						for (const prop of translatableProps) {
							// Match prop="some text" (with literal string in quotes, not {i18n.t(...)})
							const attrRegex = new RegExp(`\\b${prop}=["']([^"'{}\\n]+)["']`, 'g');
							let match: RegExpExecArray | null;
							while ((match = attrRegex.exec(line)) !== null) {
								const val = match[1].trim();
								// Ignore purely empty strings or technical values
								if (val.length > 0 && !/^[\d.,:/#\-_ ]+$/.test(val)) {
									violations.push(
										`  [HARDCODE ATRIBUTO] ${relative}:${i + 1} -> ${prop}="${val}". Deve usar ${prop}={i18n.t('...')}`
									);
								}
							}
						}
					}
				}
			}
		}

		scanSvelteTemplates(srcDir);

		if (violations.length > 0) {
			expect.fail(
				`Atributos com textos hardcoded encontrados (Regra Zero Exceções):\n\n${violations.join('\n')}`
			);
		}

		expect(violations).toHaveLength(0);
	});

	it('enforces Zero-Exception rule: no visible text nodes hardcoded in catalog templates', () => {
		const routesDir = path.resolve('src/routes');
		const violations: string[] = [];

		function scanTextNodes(dir: string) {
			const entries = fs.readdirSync(dir, { withFileTypes: true });
			for (const entry of entries) {
				const fullPath = path.join(dir, entry.name);
				if (entry.isDirectory()) {
					scanTextNodes(fullPath);
				} else if (entry.isFile() && entry.name.endsWith('.svelte')) {
					const content = fs.readFileSync(fullPath, 'utf8');
					const relative = path.relative(process.cwd(), fullPath);

					// Remove scripts, styles, svgs and comments
					const cleanTemplate = content
						.replace(/<script[\s\S]*?<\/script>/gi, '')
						.replace(/<style[\s\S]*?<\/style>/gi, '')
						.replace(/<!--[\s\S]*?-->/g, '')
						.replace(/<svg[\s\S]*?<\/svg>/gi, '');

					// Scan line by line for literal text between tags: >Some Text<
					const lines = cleanTemplate.split('\n');
					for (let i = 0; i < lines.length; i++) {
						const line = lines[i];
						// Match text strictly between > and <
						const textMatch = />\s*([^<>{}]+?)\s*</g;
						let match: RegExpExecArray | null;
						while ((match = textMatch.exec(line)) !== null) {
							const text = match[1].trim();
							// Filter out empty, single punctuation, numbers, technical symbols
							if (
								text.length > 1 &&
								/[a-zA-ZÀ-ÿ]/.test(text) &&
								!/^[\d.,:/#\-_ *+=|~&()]+$/.test(text)
							) {
								violations.push(
									`  [HARDCODE TEXTO] ${relative}:${i + 1} -> "${text}". Deve usar {i18n.t('...')}`
								);
							}
						}
					}
				}
			}
		}

		scanTextNodes(routesDir);

		if (violations.length > 0) {
			expect.fail(
				`Textos visíveis hardcoded encontrados no catálogo (Regra Zero Exceções):\n\n${violations.join('\n')}`
			);
		}

		expect(violations).toHaveLength(0);
	});
});
