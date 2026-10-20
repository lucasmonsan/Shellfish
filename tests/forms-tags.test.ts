import { describe, it, expect } from 'vitest';
import { render } from 'svelte/server';
import { Tag, Tags, Chip, TagInput } from '$lib/index.js';

describe('Tag & Multi-Tag Form Primitives (Tag, Tags, Chip, TagInput)', () => {
	describe('Tag (and Chip alias)', () => {
		it('exports Chip as a strict backward-compatible alias for Tag', () => {
			expect(Chip).toBe(Tag);
		});

		it('renders non-interactive static tag by default', () => {
			const result = render(Tag, {
				props: {
					label: 'Svelte 5'
				}
			});

			expect(result.body).toContain('chip-root secondary md');
			expect(result.body).toContain('Svelte 5');
			expect(result.body).not.toContain('role="button"');
			expect(result.body).not.toContain('remove-button');
		});

		it('renders as WAI-ARIA toggle button when selected prop is provided and removable is false', () => {
			const result = render(Tag, {
				props: {
					label: 'Filtro UX',
					selected: true
				}
			});

			expect(result.body).toContain('role="button"');
			expect(result.body).toContain('aria-pressed="true"');
			expect(result.body).toContain('selected');
			expect(result.body).toContain('interactive');
		});

		it('prevents nested-interactive HTML-AAM violation when removable is true', () => {
			const result = render(Tag, {
				props: {
					label: 'Removível',
					removable: true,
					removeLabel: 'Excluir tag',
					selected: true
				}
			});

			// Container principal NÃO pode ter role="button" quando possui <button class="remove-button"> interno
			expect(result.body).toContain('remove-button');
			expect(result.body).toContain('aria-label="Excluir tag"');
			expect(result.body).not.toContain('role="button"');
		});

		it('supports all variants and sizes (sm, md, lg)', () => {
			for (const variant of ['primary', 'secondary', 'outline', 'ghost'] as const) {
				for (const size of ['sm', 'md', 'lg'] as const) {
					const result = render(Tag, {
						props: { label: 'Item', variant, size }
					});
					expect(result.body).toContain(`chip-root ${variant} ${size}`);
				}
			}
		});
	});

	describe('Tags (and TagInput alias)', () => {
		it('exports TagInput as a strict backward-compatible alias for Tags', () => {
			expect(TagInput).toBe(Tags);
		});

		it('renders existing tags as removable Tag primitives alongside text input', () => {
			const result = render(Tags, {
				props: {
					id: 'skills-tags',
					label: 'Habilidades',
					tags: ['TypeScript', 'SvelteKit']
				}
			});

			expect(result.body).toContain('tag-input-container md');
			expect(result.body).toContain('TypeScript');
			expect(result.body).toContain('SvelteKit');
			expect(result.body).toContain('remove-button');
			expect(result.body).toContain('<input');
			expect(result.body).toContain('id="skills-tags"');
			expect(result.body).toContain('aria-label="Habilidades"');
		});

		it('hides text input when tags length reaches maxTags', () => {
			const result = render(Tags, {
				props: {
					tags: ['Um', 'Dois'],
					maxTags: 2
				}
			});

			expect(result.body).toContain('Um');
			expect(result.body).toContain('Dois');
			expect(result.body).not.toContain('<input');
		});

		it('disables tag removal and hides input when disabled is true', () => {
			const result = render(Tags, {
				props: {
					tags: ['Fixo'],
					disabled: true,
					invalid: true
				}
			});

			expect(result.body).toContain('disabled');
			expect(result.body).toContain('invalid');
			expect(result.body).not.toContain('remove-button');
			expect(result.body).not.toContain('<input');
		});
	});
});
