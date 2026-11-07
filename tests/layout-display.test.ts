import { describe, it, expect } from 'vitest';
import { render } from 'svelte/server';
import { createRawSnippet } from 'svelte';
import {
	Section,
	Row,
	Column,
	Grid,
	Card,
	Badge,
	Divider,
	FloatingBanner,
	SHELLFISH_THEME_TOKENS
} from '$lib/index.js';

describe('Layout Primitives (Section, Row, Column, Grid)', () => {
	it('renders semantic <section> with contained and spacing tokens', () => {
		const children = createRawSnippet(() => ({
			render: () => '<h2>Título</h2>'
		}));

		const result = render(Section, {
			props: {
				contained: true,
				gap: 'lg',
				padding: 'md',
				children
			}
		});

		expect(result.body).toMatch(/<section[^>]*class="[^"]*contained/);
		expect(result.body).toContain('--section-gap: var(--space-lg)');
		expect(result.body).toContain('--section-pad: var(--space-md)');
		expect(result.body).toContain('<h2>Título</h2>');
	});

	it('renders Row with alignment, justification, wrap, and fullWidth', () => {
		const children = createRawSnippet(() => ({
			render: () => '<span>Item</span>'
		}));

		const result = render(Row, {
			props: {
				gap: 'md',
				align: 'center',
				justify: 'between',
				wrap: true,
				fullWidth: true,
				children
			}
		});

		expect(result.body).toContain('row align-center justify-between');
		expect(result.body).toContain('wrap');
		expect(result.body).toContain('full-width');
		expect(result.body).toContain('--row-gap: var(--space-md)');
	});

	it('renders Column with vertical flex alignment and spacing tokens', () => {
		const children = createRawSnippet(() => ({
			render: () => '<span>Coluna</span>'
		}));

		const result = render(Column, {
			props: {
				gap: 'xs',
				align: 'start',
				justify: 'center',
				fullWidth: true,
				children
			}
		});

		expect(result.body).toContain('column align-start justify-center');
		expect(result.body).toContain('full-width');
		expect(result.body).toContain('--col-gap: var(--space-xs)');
	});

	it('applies contained maxWidth presets (sm, md, lg, xl, full) on Section and Column', () => {
		const children = createRawSnippet(() => ({
			render: () => '<span>Contido</span>'
		}));

		const presets = ['sm', 'md', 'lg', 'xl', 'full'] as const;
		for (const preset of presets) {
			const sectionRes = render(Section, { props: { maxWidth: preset, children } });
			expect(sectionRes.body).toContain(`max-w-${preset}`);

			const colRes = render(Column, { props: { maxWidth: preset, children } });
			expect(colRes.body).toContain(`max-w-${preset}`);
		}
	});

	it('renders non-blocking FloatingBanner with contained maxWidth and optional actions/dismiss', () => {
		const children = createRawSnippet(() => ({
			render: () => '<span>3 itens selecionados</span>'
		}));
		const actions = createRawSnippet(() => ({
			render: () => '<button type="button">Compartilhar</button>'
		}));

		const result = render(FloatingBanner, {
			props: {
				maxWidth: 'lg',
				dismissible: true,
				ariaLabel: 'Ações em lote',
				children,
				actions
			}
		});

		expect(result.body).toContain('floating-banner-anchor');
		expect(result.body).toContain('floating-banner max-w-lg');
		expect(result.body).toContain('aria-label="Ações em lote"');
		expect(result.body).toContain('3 itens selecionados');
		expect(result.body).toContain('Compartilhar');
		expect(result.body).toContain('floating-banner-close');
	});

	it('exposes typed SHELLFISH_THEME_TOKENS for light and dark themes and all 10 Monsan mineral families', () => {
		expect(SHELLFISH_THEME_TOKENS.light.bgPrimary).toBe('#fdfbf7');
		expect(SHELLFISH_THEME_TOKENS.dark.bgPrimary).toBe('#221d1c');
		expect(SHELLFISH_THEME_TOKENS.light.terracotta.base).toBe('#b94b38');
		expect(SHELLFISH_THEME_TOKENS.dark.terracotta.text).toBe('#f09a88');
		expect(SHELLFISH_THEME_TOKENS.light.amber.onSolid).toBe('#1d1817');
		expect(SHELLFISH_THEME_TOKENS.dark.slate.subtle).toBe('#1d2328');
	});

	it('renders Grid with fluid default, explicit minItemWidth or fixed columns', () => {
		const children = createRawSnippet(() => ({
			render: () => '<div>Cell</div>'
		}));

		const defaultGrid = render(Grid, { props: { children } });
		expect(defaultGrid.body).not.toContain('--grid-cols');
		expect(defaultGrid.body).toContain('--grid-gap: var(--space-sm)');

		const autoGrid = render(Grid, {
			props: {
				minItemWidth: 'calc(var(--base) * 11)',
				gap: 'sm',
				children
			}
		});
		expect(autoGrid.body).toContain('repeat(auto-fill, minmax(calc(var(--base) * 11), 1fr))');

		const fixedGrid = render(Grid, {
			props: {
				columns: 3,
				gap: 'md',
				children
			}
		});
		expect(fixedGrid.body).toContain('repeat(3, minmax(0, 1fr))');
		expect(fixedGrid.body).toContain('cols-3');

		const responsiveGrid = render(Grid, {
			props: {
				columns: 2,
				columnsMd: 4,
				fillLastItem: true,
				gap: 'sm',
				children
			}
		});
		expect(responsiveGrid.body).toContain('cols-2');
		expect(responsiveGrid.body).toContain('cols-md-4');
		expect(responsiveGrid.body).toContain('has-cols-md');
		expect(responsiveGrid.body).toContain('fill-last');
		expect(responsiveGrid.body).toContain('--grid-cols: repeat(2, minmax(0, 1fr));');
		expect(responsiveGrid.body).toContain('--grid-cols-md: repeat(4, minmax(0, 1fr));');
	});

	it('renders Column with sticky class when sticky prop is true', () => {
		const children = createRawSnippet(() => ({
			render: () => '<span>Barra fixa</span>'
		}));

		const defaultCol = render(Column, { props: { children } });
		expect(defaultCol.body).not.toContain('sticky');

		const stickyCol = render(Column, { props: { sticky: true, children } });
		expect(stickyCol.body).toContain('sticky');
	});
});

describe('Display Primitives (Card, Badge, Divider)', () => {
	it('renders semantic <article> for Card as a pure non-focusable surface', () => {
		const children = createRawSnippet(() => ({
			render: () => '<p>Card body</p>'
		}));

		const card = render(Card, {
			props: {
				variant: 'primary',
				padding: 'sm',
				gap: 'sm',
				align: 'center',
				children
			}
		});
		expect(card.body).toMatch(/<article[^>]*class="primary align-center/);
		expect(card.body).not.toContain('tabindex');
		expect(card.body).toContain('--card-pad: var(--space-sm)');
	});

	it('renders Badge with all suite variants and sizes', () => {
		const variants = [
			'primary',
			'secondary',
			'outline',
			'ghost',
			'danger',
			'error',
			'warning',
			'success'
		] as const;

		for (const variant of variants) {
			const res = render(Badge, {
				props: { variant, size: 'sm', label: variant }
			});
			const expected = variant === 'error' ? 'danger' : variant;
			expect(res.body).toContain(expected);
			expect(res.body).toContain('sm');
			expect(res.body).not.toContain('square');
		}

		const squareBadge = render(Badge, {
			props: { variant: 'primary', size: 'md', square: true, label: '1' }
		});
		expect(squareBadge.body).toContain('square');
	});

	it('renders horizontal <hr> and vertical separator for Divider', () => {
		const horizontal = render(Divider, { props: { spacing: 'sm' } });
		expect(horizontal.body).toContain('<hr');
		expect(horizontal.body).toContain('--div-space: var(--space-sm)');

		const vertical = render(Divider, { props: { vertical: true, spacing: 'xs' } });
		expect(vertical.body).toContain('role="separator"');
		expect(vertical.body).toContain('aria-orientation="vertical"');
		expect(vertical.body).toContain('vertical');
	});
});
