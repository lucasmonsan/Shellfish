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
	<line x1="8" x2="21" y1="6" y2="6" />
	<line x1="8" x2="21" y1="12" y2="12" />
	<line x1="8" x2="21" y1="18" y2="18" />
	<line x1="3" x2="3.01" y1="6" y2="6" />
	<line x1="3" x2="3.01" y1="12" y2="12" />
	<line x1="3" x2="3.01" y1="18" y2="18" />
</svg>

<style>
	svg {
		flex-shrink: 0;
	}
</style>
