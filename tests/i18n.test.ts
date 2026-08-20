import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { i18n, t, translations } from '../src/lib/utils/i18n.svelte.js';
import type { Locale } from '../src/lib/types/i18n.js';

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
			// Ignora o próprio arquivo de testes e o arquivo que define os dicionários
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

	it('proíbe strings literais hardcoded em atributos aria-label ou title nos componentes da biblioteca', () => {
		const componentsDir = path.resolve(process.cwd(), 'src/lib/components');
		const componentFiles = getFilesRecursively(componentsDir, ['.svelte']);
		const hardcodedViolations: string[] = [];

		// Detecta aria-label="..." ou title="..." onde o valor é uma string estática (e não {expressao})
		const hardcodedAttrRegex = /(aria-label|title)=["']([^"'{}\n]+)["']/g;

		for (const file of componentFiles) {
			const relativePath = path.relative(process.cwd(), file);
			const content = fs.readFileSync(file, 'utf-8');

			let match;
			while ((match = hardcodedAttrRegex.exec(content)) !== null) {
				const attr = match[1];
				const val = match[2].trim();
				// Permite valores técnicos vazios ou estruturais se houver
				if (val.length > 0) {
					hardcodedViolations.push(`${relativePath}: ${attr}="${val}"`);
				}
			}
		}

		expect(
			hardcodedViolations,
			'Atributos de acessibilidade estáticos não internacionalizados encontrados em componentes'
		).toEqual([]);
	});

	it('deve traduzir corretamente para pt-BR e en-US dinamicamente em tempo de execução', () => {
		i18n.setLocale('pt-BR');
		expect(t('common.close')).toBe('Fechar');
		expect(t('common.cancel')).toBe('Cancelar');
		expect(t('dialog.close')).toBe('Fechar modal');

		i18n.setLocale('en-US');
		expect(t('common.close')).toBe('Close');
		expect(t('common.cancel')).toBe('Cancel');
		expect(t('dialog.close')).toBe('Close modal');

		// Restaura para o padrão da suíte
		i18n.setLocale('pt-BR');
	});

	it('deve alternar idiomas com toggleLocale() e sincronizar o estado', () => {
		i18n.setLocale('pt-BR');
		expect(i18n.currentLocale).toBe('pt-BR');

		i18n.toggleLocale();
		expect(i18n.currentLocale).toBe('en-US');

		i18n.toggleLocale();
		expect(i18n.currentLocale).toBe('pt-BR');
	});

	it('deve interpolar múltiplos parâmetros dinâmicos na tradução', () => {
		translations['pt-BR']['test.interpolation'] = 'Olá {name}, você tem {count} notificações.';
		translations['en-US']['test.interpolation'] = 'Hello {name}, you have {count} notifications.';

		i18n.setLocale('pt-BR');
		expect(t('test.interpolation', { name: 'Lucas', count: 5 })).toBe(
			'Olá Lucas, você tem 5 notificações.'
		);

		i18n.setLocale('en-US');
		expect(t('test.interpolation', { name: 'Lucas', count: 5 })).toBe(
			'Hello Lucas, you have 5 notifications.'
		);

		delete translations['pt-BR']['test.interpolation'];
		delete translations['en-US']['test.interpolation'];
	});

	it('deve retornar a chave original como fallback caso a tradução não exista (sem quebrar a UI)', () => {
		expect(t('chave.inexistente.de.teste')).toBe('chave.inexistente.de.teste');
	});

	it('LocaleSelector.svelte deve usar tag <button> pura e exibir código do idioma atual', () => {
		const filePath = path.resolve(process.cwd(), 'src/lib/components/suite/LocaleSelector.svelte');
		const content = fs.readFileSync(filePath, 'utf-8');

		expect(content).toMatch(/<button[\s\S]*>[\s\S]*<\/button>/);
		expect(content).toContain("i18n.currentLocale === 'pt-BR' ? 'PT' : 'EN'");
		expect(content).toContain("aria-label={t('locale.toggle')}");
		expect(content).toContain("title={t('locale.name')}");
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
});
