<script lang="ts">
	import type { IconButtonProps } from '$lib/types/actions.js';
	import Button from './Button.svelte';

	let {
		label,
		title = label,
		variant = 'secondary',
		size = 'md',
		selected,
		count = 0,
		loading = false,
		disabled = false,
		type = 'button',
		onclick,
		children,
		class: className = '',
		...restProps
	}: IconButtonProps = $props();

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
		border: var(--border-width) solid var(--bg-primary);
		border-radius: var(--radius-xs);
		background-color: var(--color-danger);
		color: var(--color-on-solid);
		font-family: var(--font-sans);
		font-size: var(--text-xxs);
		font-weight: 700;
		line-height: 1;
		text-align: center;
		pointer-events: none;
	}
</style>
