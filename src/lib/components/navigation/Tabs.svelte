<script lang="ts">
	import { setContext } from 'svelte';
	import type { TabsProps } from '$lib/types/navigation.js';
	import { TABS_CONTEXT_KEY, type TabsContext } from './context.js';

	let {
		value = $bindable(),
		orientation = 'horizontal',
		activation = 'automatic',
		size = 'md',
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

<div class="tabs-root {orientation} {className}" data-orientation={orientation} {...restProps}>
	{@render children?.()}
</div>

<style>
	.tabs-root {
		display: flex;
		width: 100%;
		gap: var(--space-sm);
	}

	.tabs-root.horizontal {
		flex-direction: column;
	}

	.tabs-root.vertical {
		flex-direction: row;
	}
</style>
