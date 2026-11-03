import { describe, it, expect } from 'vitest';
import { render } from 'svelte/server';
import { createRawSnippet } from 'svelte';
import { Image } from '$lib/index.js';

describe('Image Display Primitive', () => {
	it('renders <img> with alt, loading, decoding and object-fit when src is provided', () => {
		const result = render(Image, {
			props: {
				src: 'https://example.com/avatar.jpg',
				alt: 'Foto de Lucas Monsan',
				fit: 'cover',
				loading: 'lazy',
				decoding: 'async'
			}
		});

		expect(result.body).toContain('<img');
		expect(result.body).toContain('src="https://example.com/avatar.jpg"');
		expect(result.body).toContain('alt="Foto de Lucas Monsan"');
		expect(result.body).toContain('loading="lazy"');
		expect(result.body).toContain('decoding="async"');
		expect(result.body).toContain('object-fit: cover');
	});

	it('renders fallback container with role="img" when src is missing', () => {
		const result = render(Image, {
			props: {
				alt: 'Avatar sem foto'
			}
		});

		expect(result.body).not.toContain('<img');
		expect(result.body).toContain('role="img"');
		expect(result.body).toContain('aria-label="Avatar sem foto"');
		expect(result.body).toContain('fallback');
	});

	it('renders text fallback (e.g. initials or label)', () => {
		const result = render(Image, {
			props: {
				fallback: 'LM',
				alt: 'Lucas Monsan'
			}
		});

		expect(result.body).toContain('fallback-text');
		expect(result.body).toContain('LM');
		expect(result.body).toContain('aria-label="Lucas Monsan"');
	});

	it('renders snippet fallback when fallback prop is a snippet', () => {
		const fallbackSnippet = createRawSnippet(() => ({
			render: () => '<span class="custom-icon">Ícone</span>'
		}));

		const result = render(Image, {
			props: {
				fallback: fallbackSnippet
			}
		});

		expect(result.body).toContain('<span class="custom-icon">Ícone</span>');
	});

	it('renders children snippet as fallback when src is missing', () => {
		const childrenSnippet = createRawSnippet(() => ({
			render: () => '<svg data-testid="user-icon"></svg>'
		}));

		const result = render(Image, {
			props: {
				children: childrenSnippet
			}
		});

		expect(result.body).toContain('data-testid="user-icon"');
	});

	it('supports all radius tokens', () => {
		const radii = ['none', 'xs', 'sm', 'md', 'lg', 'full'] as const;

		for (const radius of radii) {
			const result = render(Image, {
				props: {
					radius,
					src: 'https://example.com/pic.jpg'
				}
			});
			expect(result.body).toContain(`radius-${radius}`);
		}
	});

	it('applies aspectRatio styles with responsive width default', () => {
		const result = render(Image, {
			props: {
				aspectRatio: '16/9',
				src: 'https://example.com/banner.jpg'
			}
		});

		expect(result.body).toContain('aspect-ratio: 16/9');
		expect(result.body).toContain('width: 100%');
	});

	it('supports size presets for fluid control heights', () => {
		const sizes = [
			{ size: 'sm' as const, expected: 'var(--control-height-sm)' },
			{ size: 'md' as const, expected: 'var(--control-height)' },
			{ size: 'lg' as const, expected: 'var(--control-height-lg)' }
		];

		for (const { size, expected } of sizes) {
			const result = render(Image, {
				props: {
					size,
					src: 'https://example.com/pic.jpg'
				}
			});
			expect(result.body).toContain(`width: ${expected}`);
			expect(result.body).toContain(`height: ${expected}`);
		}
	});

	it('supports explicit numeric or string width and height', () => {
		const result = render(Image, {
			props: {
				width: 64,
				height: '4rem',
				src: 'https://example.com/pic.jpg'
			}
		});

		expect(result.body).toContain('width: 64px');
		expect(result.body).toContain('height: 4rem');
	});

	it('supports bordered prop and custom classes', () => {
		const result = render(Image, {
			props: {
				bordered: true,
				class: 'user-avatar-custom',
				src: 'https://example.com/pic.jpg'
			}
		});

		expect(result.body).toContain('bordered');
		expect(result.body).toContain('user-avatar-custom');
	});

	it('supports transparent prop for vector graphics and logos', () => {
		const result = render(Image, {
			props: {
				transparent: true,
				src: '/brand/logo.svg',
				alt: 'Logo'
			}
		});

		expect(result.body).toContain('transparent');
	});
});
