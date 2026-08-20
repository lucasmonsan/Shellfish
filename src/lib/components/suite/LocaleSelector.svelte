<script lang="ts">
	import type { LocaleSelectorProps } from '$lib/types/index.js';
	import { i18n, t } from '$lib/utils/i18n.svelte.js';

	let {
		size = 'md',
		storageKey = 'shellfish-locale',
		class: className,
		...restProps
	}: LocaleSelectorProps = $props();

	$effect(() => {
		if (typeof window === 'undefined') return;
		i18n.storageKey = storageKey;
	});

	function handleClick() {
		i18n.toggleLocale();
	}
</script>

<button
	type="button"
	data-size={size}
	aria-label={t('locale.toggle')}
	title={t('locale.name')}
	onclick={handleClick}
	class={className}
	{...restProps}
>
	<span class="locale-code">{i18n.currentLocale === 'pt-BR' ? 'PT' : 'EN'}</span>
</button>

<style>
	button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		background-color: var(--bg-secondary);
		color: var(--text-primary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		box-shadow: var(--shadow);
		cursor: pointer;
		padding: 0;
		aspect-ratio: 1;
		font-family: inherit;
		font-weight: 800;
		transition:
			transform 0.12s cubic-bezier(0.4, 0, 0.2, 1),
			box-shadow 0.12s cubic-bezier(0.4, 0, 0.2, 1),
			background-color 0.15s ease,
			border-color 0.15s ease;
	}

	button:hover {
		transform: translate(-1px, -1px);
		box-shadow: 2px 2px 0px var(--border-color);
		background-color: var(--bg-primary);
	}

	button:active {
		transform: translate(1px, 1px);
		box-shadow: 0px 0px 0px var(--border-color);
	}

	/* Tamanhos */
	button[data-size='sm'] {
		width: var(--control-height-sm);
		height: var(--control-height-sm);
		font-size: var(--text-xs);
	}
	button[data-size='md'] {
		width: var(--control-height-md);
		height: var(--control-height-md);
		font-size: var(--text-xs);
	}
	button[data-size='lg'] {
		width: var(--control-height-lg);
		height: var(--control-height-lg);
		font-size: var(--text-sm);
	}

	.locale-code {
		letter-spacing: 0.05em;
		line-height: 1;
		user-select: none;
	}

	@media (prefers-reduced-motion: reduce) {
		button {
			transition: none;
		}
	}
</style>
