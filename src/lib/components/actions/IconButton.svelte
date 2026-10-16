<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { Variant, Size } from '../../types/tokens.js';
	import Button from './Button.svelte';

	interface Props extends HTMLButtonAttributes {
		/**
		 * Mandatory accessible label for screen readers.
		 */
		label: string;

		/**
		 * Hover tooltip. Defaults to label.
		 */
		title?: string;

		/**
		 * Button visual variant.
		 * Default: 'secondary'
		 */
		variant?: Variant;

		/**
		 * Button size preset ('sm' = 32px, 'md' = 40px, 'lg' = 48px).
		 * Default: 'md'
		 */
		size?: Size;

		/**
		 * Toggle state (sets aria-pressed and switches to primary highlight).
		 * Default: false
		 */
		selected?: boolean;

		/**
		 * Optional numeric notification counter badge. Zero and negatives are hidden.
		 * Default: 0
		 */
		count?: number;

		/**
		 * Loading state.
		 * Default: false
		 */
		loading?: boolean;

		/**
		 * Disabled state.
		 * Default: false
		 */
		disabled?: boolean;

		/**
		 * Button type attribute.
		 * Default: 'button'
		 */
		type?: 'button' | 'submit' | 'reset';

		/**
		 * Click event handler.
		 */
		onclick?: (event: MouseEvent) => unknown;

		/**
		 * Icon snippet content.
		 */
		children?: Snippet;

		/**
		 * Additional CSS classes.
		 */
		class?: string;
	}

	let {
		label,
		title = label,
		variant = 'secondary',
		size = 'md',
		selected = false,
		count = 0,
		loading = false,
		disabled = false,
		type = 'button',
		onclick,
		children,
		class: className = '',
		...restProps
	}: Props = $props();

	let visibleCount = $derived(Math.max(0, Math.trunc(count)));
	let accessibleLabel = $derived(visibleCount > 0 ? `${label}: ${visibleCount}` : label);
</script>

<Button
	{type}
	{title}
	{disabled}
	{loading}
	{onclick}
	variant={selected ? 'primary' : variant}
	{size}
	square={true}
	ariaLabel={accessibleLabel}
	aria-pressed={selected}
	class="{selected ? 'selected' : ''} {className}"
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}

	{#if visibleCount > 0}
		<span class="badge" aria-hidden="true">{visibleCount}</span>
	{/if}
</Button>

<style>
	.badge {
		position: absolute;
		top: calc(var(--space-xxs) * -1.5);
		right: calc(var(--space-xxs) * -1.5);
		min-width: calc(var(--base) * 0.9);
		height: calc(var(--base) * 0.9);
		padding: 0 var(--space-xxs);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--bg-primary);
		border-radius: var(--radius-xs);
		background-color: var(--color-danger);
		color: var(--color-on-solid);
		font-family: var(--font-sans);
		font-size: calc(var(--base) * 0.6);
		font-weight: 700;
		line-height: 1;
		text-align: center;
		pointer-events: none;
	}
</style>
