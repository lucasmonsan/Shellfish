import { describe, it, expect } from 'vitest';
import { render } from 'svelte/server';
import AppShell from '$lib/components/layout/AppShell.svelte';
import { createRawSnippet } from 'svelte';

describe('AppShell Component', () => {
	it('renders semantic <main> region with children', () => {
		const childrenSnippet = createRawSnippet(() => ({
			render: () => '<p id="test-content">Conteúdo Principal</p>'
		}));

		const result = render(AppShell, {
			props: {
				children: childrenSnippet
			}
		});

		expect(result.body).toMatch(/<main[^>]*class="[^"]*shell-main/);
		expect(result.body).toContain('id="test-content"');
		expect(result.body).toContain('Conteúdo Principal');
	});

	it('renders semantic <header> when top snippet is provided', () => {
		const childrenSnippet = createRawSnippet(() => ({
			render: () => '<p>Conteúdo</p>'
		}));
		const topSnippet = createRawSnippet(() => ({
			render: () => '<nav id="test-nav">Barra Superior</nav>'
		}));

		const result = render(AppShell, {
			props: {
				children: childrenSnippet,
				top: topSnippet
			}
		});

		expect(result.body).toMatch(/<header[^>]*class="[^"]*shell-top/);
		expect(result.body).toContain('id="test-nav"');
	});

	it('renders semantic <footer> when bottom snippet is provided', () => {
		const childrenSnippet = createRawSnippet(() => ({
			render: () => '<p>Conteúdo</p>'
		}));
		const bottomSnippet = createRawSnippet(() => ({
			render: () => '<div id="test-footer">Rodapé da Aplicação</div>'
		}));

		const result = render(AppShell, {
			props: {
				children: childrenSnippet,
				bottom: bottomSnippet
			}
		});

		expect(result.body).toMatch(/<footer[^>]*class="[^"]*shell-bottom/);
		expect(result.body).toContain('id="test-footer"');
	});

	it('includes scroll-fade indicators by default', () => {
		const childrenSnippet = createRawSnippet(() => ({
			render: () => '<p>Conteúdo</p>'
		}));

		const result = render(AppShell, {
			props: {
				children: childrenSnippet
			}
		});

		expect(result.body).toContain('scroll-fade--top');
		expect(result.body).toContain('scroll-fade--bottom');
	});

	it('disables scroll-fade indicators when scrollFades={false}', () => {
		const childrenSnippet = createRawSnippet(() => ({
			render: () => '<p>Conteúdo</p>'
		}));

		const result = render(AppShell, {
			props: {
				children: childrenSnippet,
				scrollFades: false
			}
		});

		expect(result.body).not.toContain('scroll-fade');
	});
});
