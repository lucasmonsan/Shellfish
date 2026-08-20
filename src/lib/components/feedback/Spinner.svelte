<script lang="ts">
	import type { SpinnerProps } from '$lib/types/index.js';
	import { t } from '$lib/utils/i18n.svelte.js';

	let { size = 'md', color, label, class: className, ...restProps }: SpinnerProps = $props();
</script>

<svg
	viewBox="0 0 24 24"
	fill="none"
	stroke={color ?? 'currentColor'}
	stroke-width="3"
	stroke-linecap="round"
	role="status"
	aria-label={label ?? t('spinner.loading')}
	data-size={size}
	class={className}
	{...restProps}
>
	<circle cx="12" cy="12" r="9" stroke-opacity="0.25" />
	<path d="M12 3a9 9 0 0 1 9 9" />
</svg>

<style>
	svg {
		display: inline-block;
		animation: spin 0.75s linear infinite;
		flex-shrink: 0;
		vertical-align: middle;
	}

	svg[data-size='sm'] {
		width: 16px;
		height: 16px;
	}

	svg[data-size='md'] {
		width: 24px;
		height: 24px;
	}

	svg[data-size='lg'] {
		width: 36px;
		height: 36px;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		svg {
			animation-duration: 1.5s;
		}
	}
</style>
