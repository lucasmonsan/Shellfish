import { describe, it, expect } from 'vitest';
import { render } from 'svelte/server';
import TableTestFixture from './TableTestFixture.svelte';

describe('Table Primitive (Semantic LEGO & Whallet Financials)', () => {
	it('renders complete semantic HTML table structure with thead, tbody, tfoot and caption', () => {
		const result = render(TableTestFixture);

		expect(result.body).toContain('<table');
		expect(result.body).toContain('<thead');
		expect(result.body).toContain('<tbody');
		expect(result.body).toContain('<tfoot');
		expect(result.body).toContain('<caption class="table-caption');
		expect(result.body).toContain('Extrato Mensal</caption>');
	});

	it('renders table classes for full-width, striped, dense and hoverable', () => {
		const result = render(TableTestFixture);

		expect(result.body).toContain('full-width');
		expect(result.body).toContain('striped');
		expect(result.body).toContain('dense');
		expect(result.body).toContain('hoverable');
	});

	it('renders head cells with scope="col" and numeric cells with alignment class', () => {
		const result = render(TableTestFixture);

		expect(result.body).toContain('<th scope="col"');
		expect(result.body).toContain('class="table-cell head numeric');
		expect(result.body).toContain('class="table-cell data numeric');
		expect(result.body).toContain('selected');
		expect(result.body).toContain('colspan="2"');
	});
});
