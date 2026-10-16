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
	<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
	<polyline points="7 10 12 15 17 10" />
	<line x1="12" x2="12" y1="15" y2="3" />
</svg>

<style>
	svg {
		flex-shrink: 0;
	}
</style>
