import { describe, it, expect } from 'vitest';
import { render } from 'svelte/server';
import { createRawSnippet } from 'svelte';
import { Section, Row, Column, Grid, Card, Badge, Divider } from '$lib/index.js';

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

	it('renders Grid with auto-fill minItemWidth or fixed columns', () => {
		const children = createRawSnippet(() => ({
			render: () => '<div>Cell</div>'
		}));

		const autoGrid = render(Grid, {
			props: {
				minItemWidth: 128,
				gap: 'sm',
				children
			}
		});
		expect(autoGrid.body).toContain('repeat(auto-fill, minmax(128px, 1fr))');
		expect(autoGrid.body).toContain('--grid-gap: var(--space-sm)');

		const fixedGrid = render(Grid, {
			props: {
				columns: 3,
				gap: 'md',
				children
			}
		});
		expect(fixedGrid.body).toContain('repeat(3, minmax(0, 1fr))');
	});
});

describe('Display Primitives (Card, Badge, Divider)', () => {
	it('renders semantic <article> for Card with variants and interactive mode', () => {
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
		expect(card.body).not.toContain('tabindex="0"');

		const interactiveCard = render(Card, {
			props: {
				interactive: true,
				children
			}
		});
		expect(interactiveCard.body).toContain('interactive');
		expect(interactiveCard.body).toContain('tabindex="0"');
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
		}
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
