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
export * from './components/layout/index.js';

// Action Components
export * from './components/actions/index.js';

// Display & Surface Components
export * from './components/display/index.js';

// Feedback & Loading
export * from './components/feedback/index.js';

// Curated Icons
export * from './components/icons/index.js';

// Overlay & Floating Primitives
export * from './components/overlay/index.js';
