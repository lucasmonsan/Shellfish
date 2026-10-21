import { describe, it, expect } from 'vitest';
import { render } from 'svelte/server';
import { Progress, Skeleton, Toast, ToastContainer, toast } from '$lib/index.js';

describe('Feedback Primitives (Progress, Skeleton, Toast)', () => {
	describe('Progress Primitive', () => {
		it('renders semantic <progress> element with clamped values and accessible labels', () => {
			const result = render(Progress, {
				props: {
					value: 75,
					max: 100,
					label: 'Carregando extrato'
				}
			});

			expect(result.body).toContain('<progress');
			expect(result.body).toContain('value="75"');
			expect(result.body).toContain('max="100"');
			expect(result.body).toContain('aria-label="Carregando extrato"');
			expect(result.body).toContain('aria-valuenow="75"');
			expect(result.body).toContain('75%');
		});

		it('clamps out-of-range values and shows percentage label when showValue=true', () => {
			const resultNegative = render(Progress, {
				props: { value: -20, max: 100, showValue: true }
			});
			expect(resultNegative.body).toContain('value="0"');
			expect(resultNegative.body).toContain('0%');

			const resultExceed = render(Progress, {
				props: { value: 150, max: 100, showValue: true }
			});
			expect(resultExceed.body).toContain('value="100"');
			expect(resultExceed.body).toContain('100%');
		});

		it('applies mineral palette and semantic variants', () => {
			const resultMineral = render(Progress, {
				props: { value: 50, variant: 'emerald' }
			});
			expect(resultMineral.body).toContain('--progress-fill: var(--palette-emerald)');

			const resultDanger = render(Progress, {
				props: { value: 90, variant: 'danger' }
			});
			expect(resultDanger.body).toContain('--progress-fill: var(--color-danger)');
		});
	});

	describe('Skeleton Primitive', () => {
		it('renders structural placeholder with aria-hidden="true" and variant classes', () => {
			const resultRect = render(Skeleton, {
				props: { variant: 'rect', width: '200px', height: '24px' }
			});
			expect(resultRect.body).toContain('aria-hidden="true"');
			expect(resultRect.body).toContain('skeleton rect');
			expect(resultRect.body).toContain('width: 200px');
			expect(resultRect.body).toContain('height: 24px');
		});

		it('supports circle and text variants', () => {
			const resultCircle = render(Skeleton, { props: { variant: 'circle' } });
			expect(resultCircle.body).toContain('circle');
			expect(resultCircle.body).toContain('border-radius: 50%');

			const resultText = render(Skeleton, { props: { variant: 'text' } });
			expect(resultText.body).toContain('text');
		});
	});

	describe('Toast Store & Container', () => {
		it('dispatches and clears toasts in reactive store', () => {
			toast.clear();
			expect(toast.items).toHaveLength(0);

			const id1 = toast.success('Transação salva!');
			expect(toast.items).toHaveLength(1);
			expect(toast.items[0].id).toBe(id1);
			expect(toast.items[0].message).toBe('Transação salva!');
			expect(toast.items[0].variant).toBe('success');

			const id2 = toast.error('Falha de conexão');
			expect(toast.items).toHaveLength(2);
			expect(toast.items[1].id).toBe(id2);
			expect(toast.items[1].variant).toBe('danger');

			toast.dismiss(id1);
			expect(toast.items).toHaveLength(1);
			expect(toast.items[0].id).toBe(id2);

			toast.clear();
			expect(toast.items).toHaveLength(0);
		});

		it('renders ToastContainer anchored in toast layer with role="region" and aria-live="polite"', () => {
			toast.clear();
			toast.info('Notificação teste');

			const result = render(ToastContainer, {
				props: { position: 'bottom-right' }
			});

			expect(result.body).toContain('role="region"');
			expect(result.body).toContain('aria-live="polite"');
			expect(result.body).toContain('toast-container bottom-right');
			expect(result.body).toContain('Notificação teste');

			toast.clear();
		});

		it('renders individual Toast notification card with semantic role="status"', () => {
			const item = {
				id: 'toast-1',
				message: 'Notificação Direta',
				variant: 'success' as const,
				duration: 4000,
				dismissible: true,
				createdAt: Date.now()
			};
			const result = render(Toast, {
				props: { toast: item, onDismiss: () => {} }
			});
			expect(result.body).toContain('role="status"');
			expect(result.body).toContain('toast success');
			expect(result.body).toContain('Notificação Direta');
		});
	});
});
