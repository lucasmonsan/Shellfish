import { describe, it, expect } from 'vitest';
import { createI18n, parseAcceptLanguage, translations } from '$lib/utils/i18n.svelte.js';

describe('Shellfish Foundation & i18n', () => {
	it('supports all 3 official suite languages: pt-BR, en-US, es', () => {
		expect(translations['pt-BR']).toBeDefined();
		expect(translations['en-US']).toBeDefined();
		expect(translations['es']).toBeDefined();
	});

	it('initializes with pt-BR by default and resolves translations', () => {
		const i18n = createI18n('pt-BR');
		expect(i18n.currentLocale).toBe('pt-BR');
		expect(i18n.t('common.close')).toBe('Fechar');
	});

	it('switches locales and translates accordingly', () => {
		const i18n = createI18n('pt-BR');
		i18n.setLocale('en-US', false);
		expect(i18n.currentLocale).toBe('en-US');
		expect(i18n.t('common.close')).toBe('Close');

		i18n.setLocale('es', false);
		expect(i18n.currentLocale).toBe('es');
		expect(i18n.t('common.close')).toBe('Cerrar');
	});

	it('toggles smoothly between the 3 locales in cycle', () => {
		const i18n = createI18n('pt-BR');
		expect(i18n.toggleLocale()).toBe('en-US');
		expect(i18n.toggleLocale()).toBe('es');
		expect(i18n.toggleLocale()).toBe('pt-BR');
	});

	it('parses Accept-Language header accurately', () => {
		expect(parseAcceptLanguage(null)).toBe('pt-BR');
		expect(parseAcceptLanguage('en-US,en;q=0.9')).toBe('en-US');
		expect(parseAcceptLanguage('es-ES,es;q=0.8')).toBe('es');
		expect(parseAcceptLanguage('pt-BR,pt;q=0.9')).toBe('pt-BR');
	});
});
