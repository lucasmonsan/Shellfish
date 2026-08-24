// Tipos
export * from './types/index.js';

// Utilitários Reativos de i18n
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

// Containers Estruturais
export { default as Main } from './components/containers/Main.svelte';
export { default as Header } from './components/containers/Header.svelte';
export { default as Section } from './components/containers/Section.svelte';
export { default as Footer } from './components/containers/Footer.svelte';

// Primitivas de Layout
export { default as Row } from './components/layout/Row.svelte';
export { default as Column } from './components/layout/Column.svelte';
export { default as Grid } from './components/layout/Grid.svelte';

// Ações & Navegação
export { default as Button } from './components/actions/Button.svelte';
export { default as Tabs } from './components/actions/Tabs.svelte';
export { default as Dropdown } from './components/actions/Dropdown.svelte';

// Formulários & Entradas
export { default as Input } from './components/forms/Input.svelte';
export { default as Textarea } from './components/forms/Textarea.svelte';
export { default as Select } from './components/forms/Select.svelte';
export { default as Checkbox } from './components/forms/Checkbox.svelte';
export { default as Radio } from './components/forms/Radio.svelte';
export { default as Switch } from './components/forms/Switch.svelte';
export { default as Slider } from './components/forms/Slider.svelte';
export { default as Calendar } from './components/forms/Calendar.svelte';
export { default as Chips } from './components/forms/Chips.svelte';

// Superfícies & Exibição
export { default as Card } from './components/display/Card.svelte';
export { default as Badge } from './components/display/Badge.svelte';
export { default as Divider } from './components/display/Divider.svelte';
export { default as Avatar } from './components/display/Avatar.svelte';

// Feedback & Diálogos
export { default as Alert } from './components/feedback/Alert.svelte';
export { default as Spinner } from './components/feedback/Spinner.svelte';
export { default as ProgressBar } from './components/feedback/ProgressBar.svelte';
export { default as Dialog } from './components/feedback/Dialog.svelte';
export { default as Toast } from './components/feedback/Toast.svelte';

// Suíte Zoo
export { default as ThemeSelector } from './components/suite/ThemeSelector.svelte';
export { default as LocaleSelector } from './components/suite/LocaleSelector.svelte';
