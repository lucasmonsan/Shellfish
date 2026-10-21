import { describe, it, expect } from 'vitest';
import { render } from 'svelte/server';
import TabsTestFixture from './TabsTestFixture.svelte';

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
});
