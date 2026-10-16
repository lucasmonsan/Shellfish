import type { SVGAttributes } from 'svelte/elements';

/**
 * Standard contract for all curated Shellfish vector icons.
 */
export interface IconProps extends SVGAttributes<SVGSVGElement> {
	/**
	 * Icon size in pixels (number) or arbitrary CSS dimension string.
	 * Default: 20
	 */
	size?: number | string;

	/**
	 * Stroke / fill color.
	 * Default: 'currentColor'
	 */
	color?: string;

	/**
	 * Stroke line width for geometric outline icons.
	 * Default: 2
	 */
	strokeWidth?: number | string;

	/**
	 * Optional CSS class list.
	 */
	class?: string;

	/**
	 * Accessible label when icon conveys standalone semantic meaning.
	 * If omitted, icon will be treated as decorative (aria-hidden="true").
	 */
	ariaLabel?: string;
}
