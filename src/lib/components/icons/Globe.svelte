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
	<circle cx="12" cy="12" r="10" />
	<path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
	<path d="M2 12h20" />
</svg>

<style>
	svg {
		flex-shrink: 0;
	}
</style>
