import { describe, it, expect } from 'vitest';
import { render } from 'svelte/server';
import TabsTestFixture from './TabsTestFixture.svelte';
import TabsNavRouteFixture from './TabsNavRouteFixture.svelte';

describe('Tabs Navigation Primitive (WAI-ARIA APG & SSR)', () => {
	it('renders semantic tablist, tabs, and active tabpanel with matching aria associations in SSR', () => {
		const result = render(TabsTestFixture, {
			props: {
				value: 'extrato'
			}
		});

		expect(result.body).toContain('role="tablist"');
		expect(result.body).toContain('aria-label="Minhas Abas"');
		expect(result.body).toContain('aria-orientation="horizontal"');

		// Abas presentes
		expect(result.body).toContain('role="tab"');
		expect(result.body).toContain('Extrato');
		expect(result.body).toContain('Gráficos');
		expect(result.body).toContain('Metas');

		// Painel ativo
		expect(result.body).toContain('role="tabpanel"');
		expect(result.body).toContain('Conteúdo do Extrato');
	});

	it('renders semantic <nav> with route links (<a>) when asNav and href are provided', () => {
		const result = render(TabsNavRouteFixture, {
			props: {
				value: '/votar'
			}
		});

		// Deve renderizar elemento semântico <nav> em vez de <div role="tablist">
		expect(result.body).toContain('<nav');
		expect(result.body).toContain('aria-label="Navegação Principal"');
		expect(result.body).toContain('tablist');
		expect(result.body).toContain('full-width');

		// Deve renderizar tags <a> semânticas com href
		expect(result.body).toContain('<a');
		expect(result.body).toContain('href="/"');
		expect(result.body).toContain('href="/votar"');
		expect(result.body).toContain('href="/fiscalizar"');

		// Aba ativa deve ter aria-current="page" e classe .selected
		expect(result.body).toContain('aria-current="page"');
		expect(result.body).toContain('selected');
	});
});
