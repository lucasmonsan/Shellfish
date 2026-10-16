import { describe, it, expect } from 'vitest';
import { render } from 'svelte/server';
import { createRawSnippet } from 'svelte';
import { Popover, type PopoverAriaProps } from '$lib/index.js';

describe('Popover Overlay Primitive', () => {
	const triggerSnippet = createRawSnippet<
		[toggle: () => void, isOpen: boolean, ariaProps: PopoverAriaProps]
	>((_getToggle, getIsOpen, getAriaProps) => ({
		render: () => {
			const props = getAriaProps?.();
			const isOpen = getIsOpen?.() ?? false;
			const controls = props?.['aria-controls'] ? ` aria-controls="${props['aria-controls']}"` : '';
			return `<button type="button" aria-haspopup="${props?.['aria-haspopup'] ?? 'dialog'}" aria-expanded="${props?.['aria-expanded'] ?? false}"${controls}>Trigger (open: ${isOpen})</button>`;
		}
	}));

	const contentSnippet = createRawSnippet<[close: () => void]>(() => ({
		render: () => '<div class="custom-card">Painel Popover</div>'
	}));

	it('renders trigger with aria attributes on button and does not render panel when closed', () => {
		const result = render(Popover, {
			props: {
				open: false,
				trigger: triggerSnippet,
				children: contentSnippet
			}
		});

		expect(result.body).toContain('<button');
		expect(result.body).toContain('Trigger (open: false)');
		expect(result.body).toContain('aria-haspopup="dialog"');
		expect(result.body).toContain('aria-expanded="false"');
		expect(result.body).not.toContain('<div class="sf-popover-trigger" aria-haspopup');
		expect(result.body).not.toContain('custom-card');
		expect(result.body).not.toContain('Painel Popover');
	});

	it('renders floating panel with role="region" and aria-label when open is true', () => {
		const result = render(Popover, {
			props: {
				open: true,
				ariaLabel: 'Menu de Opções',
				trigger: triggerSnippet,
				children: contentSnippet
			}
		});

		expect(result.body).toContain('aria-expanded="true"');
		expect(result.body).toContain('role="region"');
		expect(result.body).toContain('aria-label="Menu de Opções"');
		expect(result.body).toContain('custom-card');
		expect(result.body).toContain('Painel Popover');
	});

	it('applies horizontal alignment classes (start, center, end)', () => {
		const alignments = ['start', 'center', 'end'] as const;

		for (const align of alignments) {
			const result = render(Popover, {
				props: {
					open: true,
					align,
					trigger: triggerSnippet,
					children: contentSnippet
				}
			});
			expect(result.body).toContain(`align-${align}`);
		}
	});

	it('applies vertical placement classes (bottom, top)', () => {
		const placements = ['bottom', 'top'] as const;

		for (const placement of placements) {
			const result = render(Popover, {
				props: {
					open: true,
					placement,
					trigger: triggerSnippet,
					children: contentSnippet
				}
			});
			expect(result.body).toContain(`placement-${placement}`);
		}
	});

	it('supports offset and panelClass', () => {
		const result = render(Popover, {
			props: {
				open: true,
				offset: 8,
				panelClass: 'custom-panel-class',
				trigger: triggerSnippet,
				children: contentSnippet
			}
		});

		expect(result.body).toContain('--popover-offset: 8px');
		expect(result.body).toContain('custom-panel-class');
	});

	it('renders explicit content snippet if provided', () => {
		const explicitContent = createRawSnippet<[close: () => void]>(() => ({
			render: () => '<span>Conteúdo Explícito</span>'
		}));

		const result = render(Popover, {
			props: {
				open: true,
				trigger: triggerSnippet,
				content: explicitContent
			}
		});

		expect(result.body).toContain('<span>Conteúdo Explícito</span>');
	});
});
