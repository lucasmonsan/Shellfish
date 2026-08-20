import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { i18n, t, translations } from '../src/lib/utils/i18n.svelte.js';

describe('Internationalization (i18n) Engine & Components', () => {
	it('deve possuir 100% de paridade de chaves entre pt-BR e en-US', () => {
		const ptKeys = Object.keys(translations['pt-BR']).sort();
		const enKeys = Object.keys(translations['en-US']).sort();

		expect(ptKeys).toEqual(enKeys);
		expect(ptKeys.length).toBeGreaterThan(30);
	});

	it('deve traduzir corretamente para pt-BR e en-US dinamicamente', () => {
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

	it('deve alternar idiomas com toggleLocale()', () => {
		i18n.setLocale('pt-BR');
		expect(i18n.currentLocale).toBe('pt-BR');

		i18n.toggleLocale();
		expect(i18n.currentLocale).toBe('en-US');

		i18n.toggleLocale();
		expect(i18n.currentLocale).toBe('pt-BR');
	});

	it('deve interpolar parâmetros dinâmicos na tradução', () => {
		// Adiciona temporariamente uma chave com interpolação
		translations['pt-BR']['test.greeting'] = 'Olá, {name}!';
		translations['en-US']['test.greeting'] = 'Hello, {name}!';

		i18n.setLocale('pt-BR');
		expect(t('test.greeting', { name: 'Lucas' })).toBe('Olá, Lucas!');

		i18n.setLocale('en-US');
		expect(t('test.greeting', { name: 'Lucas' })).toBe('Hello, Lucas!');
	});

	it('deve retornar a chave original como fallback caso a tradução não exista', () => {
		expect(t('non.existent.translation.key')).toBe('non.existent.translation.key');
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
