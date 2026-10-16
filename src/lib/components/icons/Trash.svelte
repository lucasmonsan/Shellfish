<script lang="ts">
	import type { IconProps } from '../../types/icons.js';

	let {
		size = 20,
		color = 'currentColor',
		strokeWidth = 2,
		class: className = '',
		ariaLabel,
		...restProps
	}: IconProps = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke={color}
	stroke-width={strokeWidth}
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden={!ariaLabel}
	aria-label={ariaLabel}
	role={ariaLabel ? 'img' : 'presentation'}
	class={className}
	{...restProps}
>
	<path d="M3 6h18" />
	<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
	<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
	<line x1="10" x2="10" y1="11" y2="17" />
	<line x1="14" x2="14" y1="11" y2="17" />
</svg>

<style>
	svg {
		flex-shrink: 0;
	}
</style>
