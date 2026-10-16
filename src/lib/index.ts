// Tipos do Shellfish
export * from './types/index.js';

// Utilitários Reativos de i18n (Svelte 5 Runes)
export {
	i18n,
	t,
	translations,
	createI18n,
	setI18n,
	getI18n,
	parseAcceptLanguage,
	I18N_CONTEXT_KEY
} from './utils/i18n.svelte.js';

// Layout & Viewport Primitives
export { default as AppShell } from './components/layout/AppShell.svelte';

// Action Components
export { default as Button } from './components/actions/Button.svelte';
export { default as IconButton } from './components/actions/IconButton.svelte';

// Feedback & Loading
export { default as Spinner } from './components/feedback/Spinner.svelte';

// Curated Icons
export * from './components/icons/index.js';
