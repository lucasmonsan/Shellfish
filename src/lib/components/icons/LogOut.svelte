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
	<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
	<polyline points="16 17 21 12 16 7" />
	<line x1="21" x2="9" y1="12" y2="12" />
</svg>

<style>
	svg {
		flex-shrink: 0;
	}
</style>
