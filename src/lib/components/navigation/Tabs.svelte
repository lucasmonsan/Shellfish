<script lang="ts">
	import { setContext } from 'svelte';
	import type { TabsProps } from '$lib/types/navigation.js';
	import { TABS_CONTEXT_KEY, type TabsContext } from './context.js';

	let {
		value = $bindable(),
		orientation = 'horizontal',
		activation = 'automatic',
		size = 'md',
		width = 'full',
		children,
		class: className = '',
		...restProps
	}: TabsProps = $props();

	const baseId = $props.id();

	function selectTab(newValue: string) {
		value = newValue;
	}

	const context: TabsContext = {
		getValue: () => value,
		selectTab,
		getOrientation: () => orientation,
		getActivation: () => activation,
		getSize: () => size,
		getBaseId: () => baseId
	};

	setContext(TABS_CONTEXT_KEY, context);
</script>

<div
	class="tabs-root {orientation} width-{width} {className}"
	class:full-width={width === 'full'}
	class:width-auto={width === 'auto'}
	class:width-flex={width === 'flex'}
	data-orientation={orientation}
	data-width={width}
	{...restProps}
>
	{@render children?.()}
</div>

<style>
	.tabs-root {
		display: grid;
		gap: var(--space-sm);
	}

	.tabs-root.width-full {
		width: 100%;
	}

	.tabs-root.width-auto {
		width: max-content;
		max-width: 100%;
	}

	.tabs-root.width-flex {
		flex: 1 1 0%;
		min-width: 0;
		width: auto;
	}

	.tabs-root.horizontal {
		grid-template-columns: 100%;
	}

	.tabs-root.vertical {
		grid-template-columns: auto 1fr;
	}
</style>
