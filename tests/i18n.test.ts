import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { render } from 'svelte/server';
import {
	i18n,
	t,
	translations,
	createI18n,
	parseAcceptLanguage
} from '../src/lib/utils/i18n.svelte.js';
import { handle as serverHandle } from '../src/hooks.server.js';
import { load as layoutServerLoad } from '../src/routes/+layout.server.js';
import TestLayoutWrapper from './TestLayoutWrapper.svelte';
import type { Locale } from '../src/lib/types/i18n.js';
import pkg from '../package.json' with { type: 'json' };

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

describe('Internationalization (i18n) Engine, Integrity & Future-Proofing', () => {
	const srcDir = path.resolve(process.cwd(), 'src');
	const allSourceFiles = getFilesRecursively(srcDir, ['.svelte', '.ts', '.js']);
	const locales: Locale[] = ['pt-BR', 'en-US'];

	it('deve possuir 100% de paridade de chaves entre todos os idiomas suportados (pt-BR e en-US)', () => {
		const ptKeys = Object.keys(translations['pt-BR']).sort();
		const enKeys = Object.keys(translations['en-US']).sort();

		const missingInEn = ptKeys.filter((k) => !translations['en-US'][k]);
		const missingInPt = enKeys.filter((k) => !translations['pt-BR'][k]);

		expect(missingInEn, 'Chaves presentes em pt-BR mas ausentes em en-US').toEqual([]);
		expect(missingInPt, 'Chaves presentes em en-US mas ausentes em pt-BR').toEqual([]);
		expect(ptKeys).toEqual(enKeys);
	});

	it('garante que nenhuma tradução seja vazia ou apenas espaços em branco', () => {
		const emptyTranslations: string[] = [];

		for (const locale of locales) {
			for (const [key, value] of Object.entries(translations[locale])) {
				if (!value || value.trim().length === 0) {
					emptyTranslations.push(`${locale}: "${key}"`);
				}
			}
		}

		expect(emptyTranslations, 'Traduções vazias encontradas').toEqual([]);
	});

	it('valida dinamicamente que TODAS as chamadas t("chave") no código-fonte existem nos dicionários', () => {
		const tCallRegex = /\bt\(\s*['"]([a-zA-Z0-9_.-]+)['"]/g;
		const usedKeys = new Set<string>();

		for (const file of allSourceFiles) {
			if (file.includes('i18n.test.ts') || file.includes('i18n.svelte.ts')) continue;

			const content = fs.readFileSync(file, 'utf-8');
			let match;
			while ((match = tCallRegex.exec(content)) !== null) {
				usedKeys.add(match[1]);
			}
		}

		expect(usedKeys.size).toBeGreaterThan(0);

		const missingInPtBR: string[] = [];
		const missingInEnUS: string[] = [];

		for (const key of usedKeys) {
			if (!translations['pt-BR'][key]) missingInPtBR.push(key);
			if (!translations['en-US'][key]) missingInEnUS.push(key);
		}

		expect(missingInPtBR, 'Chaves usadas no código-fonte mas ausentes no dicionário pt-BR').toEqual(
			[]
		);
		expect(missingInEnUS, 'Chaves usadas no código-fonte mas ausentes no dicionário en-US').toEqual(
			[]
		);
	});

	it('garante a correspondência exata de placeholders/parâmetros ({param}) entre os idiomas', () => {
		const placeholderRegex = /\{([a-zA-Z0-9_]+)\}/g;
		const mismatchedPlaceholders: string[] = [];

		for (const key of Object.keys(translations['pt-BR'])) {
			const ptText = translations['pt-BR'][key] || '';
			const enText = translations['en-US'][key] || '';

			const ptMatches = Array.from(ptText.matchAll(placeholderRegex), (m) => m[1]).sort();
			const enMatches = Array.from(enText.matchAll(placeholderRegex), (m) => m[1]).sort();

			if (JSON.stringify(ptMatches) !== JSON.stringify(enMatches)) {
				mismatchedPlaceholders.push(
					`Chave "${key}": pt-BR possui [${ptMatches}] e en-US possui [${enMatches}]`
				);
			}
		}

		expect(mismatchedPlaceholders, 'Incompatibilidade de parâmetros entre idiomas').toEqual([]);
	});

	it('parseAcceptLanguage deve respeitar pesos q e descartar estritamente q=0', () => {
		expect(parseAcceptLanguage('')).toBe('pt-BR');
		expect(parseAcceptLanguage(null)).toBe('pt-BR');
		expect(parseAcceptLanguage(undefined)).toBe('pt-BR');

		// 1. Simples
		expect(parseAcceptLanguage('en-US,en;q=0.9')).toBe('en-US');
		expect(parseAcceptLanguage('pt-BR,pt;q=0.9')).toBe('pt-BR');

		// 2. Pesos q onde o inglês possui maior prioridade que o português
		expect(parseAcceptLanguage('pt;q=0.1,en;q=0.9')).toBe('en-US');

		// 3. Pesos q onde o português possui maior prioridade que o inglês
		expect(parseAcceptLanguage('en;q=0.5,pt-BR;q=0.9')).toBe('pt-BR');

		// 4. Idiomas não suportados com fallback para o maior peso suportado
		expect(parseAcceptLanguage('es;q=0.9,de;q=0.8,en;q=0.7,pt;q=0.6')).toBe('en-US');
		expect(parseAcceptLanguage('es;q=0.9,de;q=0.8,pt;q=0.7,en;q=0.6')).toBe('pt-BR');

		// 5. Descarte estrito de q=0 ("not acceptable")
		expect(parseAcceptLanguage('en;q=0,pt;q=0')).toBe('pt-BR');
		expect(parseAcceptLanguage('en;q=0,pt;q=0.5')).toBe('pt-BR');
		expect(parseAcceptLanguage('pt;q=0,en;q=0.8')).toBe('en-US');

		// 6. Idiomas desconhecidos sem nenhum suportado devem retornar o padrão pt-BR
		expect(parseAcceptLanguage('zh-CN,zh;q=0.9,ja;q=0.8')).toBe('pt-BR');
	});

	it('hooks.server.ts deve resolver locale, preencher event.locals e substituir %lang% no SSR', async () => {
		type ServerHandler = (input: unknown) => Promise<Response>;
		const handle = serverHandle as unknown as ServerHandler;

		// 1. Teste com cookie definido
		let transformedHtml = '';
		const mockEvent1 = {
			cookies: { get: (key: string) => (key === 'zoo_locale' ? 'en-US' : undefined) },
			request: { headers: new Headers() },
			locals: {} as { locale?: Locale }
		};

		const mockResolve1 = async (
			_event: unknown,
			opts?: { transformPageChunk?: (chunk: { html: string }) => string }
		) => {
			if (opts?.transformPageChunk) {
				transformedHtml = opts.transformPageChunk({
					html: '<html lang="%lang%"><body>Test</body></html>'
				});
			}
			return new Response(transformedHtml);
		};

		await handle({ event: mockEvent1, resolve: mockResolve1 });
		expect(mockEvent1.locals.locale).toBe('en-US');
		expect(transformedHtml).toContain('lang="en-US"');

		// 2. Teste com cabeçalho Accept-Language quando sem cookie
		const mockHeaders = new Headers();
		mockHeaders.set('accept-language', 'pt;q=0.2,en-US;q=0.8');

		const mockEvent2 = {
			cookies: { get: () => undefined },
			request: { headers: mockHeaders },
			locals: {} as { locale?: Locale }
		};

		await handle({ event: mockEvent2, resolve: mockResolve1 });
		expect(mockEvent2.locals.locale).toBe('en-US');
		expect(transformedHtml).toContain('lang="en-US"');
	});

	it('+layout.server.ts deve expor locale e versão dinâmica do package.json', () => {
		type LayoutLoader = (event: unknown) => { locale: Locale; version: string };
		const loader = layoutServerLoad as unknown as LayoutLoader;

		const res = loader({
			locals: { locale: 'en-US' },
			cookies: { get: () => undefined },
			request: { headers: new Headers() }
		});

		expect(res.locale).toBe('en-US');
		expect(res.version).toBe(pkg.version);
	});

	it('instâncias criadas via createI18n devem ser 100% isoladas (segurança para SSR concorrente)', () => {
		const instanceA = createI18n('pt-BR');
		const instanceB = createI18n('en-US');

		expect(instanceA.currentLocale).toBe('pt-BR');
		expect(instanceB.currentLocale).toBe('en-US');

		expect(instanceA.t('common.close')).toBe('Fechar');
		expect(instanceB.t('common.close')).toBe('Close');

		// Modificar uma instância nunca pode interferir na outra
		instanceA.setLocale('en-US', false);
		expect(instanceA.currentLocale).toBe('en-US');
		expect(instanceB.currentLocale).toBe('en-US');

		instanceB.setLocale('pt-BR', false);
		expect(instanceA.currentLocale).toBe('en-US');
		expect(instanceB.currentLocale).toBe('pt-BR');
	});

	it('hydrateFromLocalStorage deve migrar preferências salvas no localStorage e sincronizar cookie', () => {
		const store: Record<string, string> = { zoo_locale: 'en-US' };
		let cookieValue = '';

		const mockLocalStorage = {
			getItem: (k: string) => store[k] ?? null,
			setItem: (k: string, v: string) => {
				store[k] = v;
			}
		};

		const originalWindow = globalThis.window;
		const originalDoc = globalThis.document;

		// Mock de ambiente de navegador sem any
		Object.defineProperty(globalThis, 'window', {
			value: { localStorage: mockLocalStorage },
			configurable: true,
			writable: true
		});
		Object.defineProperty(globalThis, 'document', {
			value: {
				documentElement: { lang: 'pt-BR' },
				get cookie() {
					return cookieValue;
				},
				set cookie(val: string) {
					cookieValue = val;
				}
			},
			configurable: true,
			writable: true
		});

		const instance = createI18n('pt-BR', 'zoo_locale');
		expect(instance.currentLocale).toBe('pt-BR');

		instance.hydrateFromLocalStorage();
		expect(instance.currentLocale).toBe('en-US');
		expect(cookieValue).toContain('zoo_locale=en-US');

		// Restaura ambiente
		Object.defineProperty(globalThis, 'window', {
			value: originalWindow,
			configurable: true,
			writable: true
		});
		Object.defineProperty(globalThis, 'document', {
			value: originalDoc,
			configurable: true,
			writable: true
		});
	});

	it('deve persistir cookie zoo_locale com sucesso mesmo se window.localStorage estiver indisponível ou lançar erro', () => {
		let cookieValue = '';
		const originalWindow = globalThis.window;
		const originalDoc = globalThis.document;

		// Mock de localStorage lançando erro (ex: SecurityError / cookies desativados)
		Object.defineProperty(globalThis, 'window', {
			value: {
				get localStorage(): Storage {
					throw new Error('SecurityError: The operation is insecure.');
				}
			},
			configurable: true,
			writable: true
		});
		Object.defineProperty(globalThis, 'document', {
			value: {
				documentElement: { lang: 'pt-BR' },
				get cookie() {
					return cookieValue;
				},
				set cookie(val: string) {
					cookieValue = val;
				}
			},
			configurable: true,
			writable: true
		});

		const instance = createI18n('pt-BR', 'zoo_locale');
		// Ao trocar de idioma, o cookie deve ser salvo mesmo com erro no storage
		instance.setLocale('en-US', true);
		expect(instance.currentLocale).toBe('en-US');
		expect(cookieValue).toContain('zoo_locale=en-US');

		// Restaura ambiente
		Object.defineProperty(globalThis, 'window', {
			value: originalWindow,
			configurable: true,
			writable: true
		});
		Object.defineProperty(globalThis, 'document', {
			value: originalDoc,
			configurable: true,
			writable: true
		});
	});

	it('deve renderizar SSR do catálogo integralmente em inglês quando data.locale for en-US', () => {
		const rendered = render(TestLayoutWrapper, {
			props: {
				data: {
					locale: 'en-US' as Locale,
					version: pkg.version
				}
			}
		});

		const body = rendered.body;
		expect(body).toContain('Buttons');
		expect(body).toContain('Actions');
		expect(body).toContain('Forms');
		expect(body).toContain('Surfaces');
		expect(body).toContain('Dropdowns');
		expect(body).toContain('Shellfish Logo');
		expect(body).toContain(`v${pkg.version}`);
	});

	it('LocaleSelector.svelte deve usar tag <button> pura e exibir código do idioma da instância', () => {
		const filePath = path.resolve(process.cwd(), 'src/lib/components/suite/LocaleSelector.svelte');
		const content = fs.readFileSync(filePath, 'utf-8');

		expect(content).toMatch(/<button[\s\S]*>[\s\S]*<\/button>/);
		expect(content).toContain("i18n.currentLocale === 'pt-BR' ? 'PT' : 'EN'");
		expect(content).toContain("aria-label={i18n.t('locale.toggle')}");
		expect(content).toContain("title={i18n.t('locale.name')}");
	});

	it('Componentes de feedback devem permitir customização de rótulos de acessibilidade por prop', () => {
		const dialogContent = fs.readFileSync(
			path.resolve(process.cwd(), 'src/lib/components/feedback/Dialog.svelte'),
			'utf-8'
		);
		const alertContent = fs.readFileSync(
			path.resolve(process.cwd(), 'src/lib/components/feedback/Alert.svelte'),
			'utf-8'
		);
		const toastContent = fs.readFileSync(
			path.resolve(process.cwd(), 'src/lib/components/feedback/Toast.svelte'),
			'utf-8'
		);
		const spinnerContent = fs.readFileSync(
			path.resolve(process.cwd(), 'src/lib/components/feedback/Spinner.svelte'),
			'utf-8'
		);

		expect(dialogContent).toContain("closeLabel ?? t('dialog.close')");
		expect(alertContent).toContain("closeLabel ?? t('alert.close')");
		expect(toastContent).toContain("closeLabel ?? t('toast.close')");
		expect(spinnerContent).toContain("label ?? t('spinner.loading')");
	});

	it('funções globais t() e i18n devem funcionar como fallback standalone seguro', () => {
		i18n.setLocale('pt-BR', false);
		expect(t('common.close')).toBe('Fechar');
		expect(i18n.currentLocale).toBe('pt-BR');

		i18n.setLocale('en-US', false);
		expect(t('common.close')).toBe('Close');
		expect(i18n.currentLocale).toBe('en-US');

		i18n.setLocale('pt-BR', false);
	});
});
