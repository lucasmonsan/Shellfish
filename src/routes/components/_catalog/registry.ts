import type { CatalogEntry, CatalogCategory } from './types.js';

const space = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
const size = ['sm', 'md', 'lg'] as const;
const variants = ['primary', 'secondary', 'outline', 'ghost', 'danger'] as const;

const entries: CatalogEntry[] = [
	{
		name: 'Main',
		propsType: 'MainProps',
		category: 'layout',
		slug: 'main',
		root: 'main',
		props: ['children', 'fullWidth', 'fullHeight', 'gap', 'padding'],
		controls: [
			{ prop: 'fullWidth', kind: 'boolean', defaultValue: false },
			{ prop: 'fullHeight', kind: 'boolean', defaultValue: false },
			{ prop: 'gap', kind: 'select', defaultValue: 'md', options: space },
			{ prop: 'padding', kind: 'select', defaultValue: 'md', options: space }
		],
		load: () => import('$lib/components/containers/Main.svelte')
	},
	{
		name: 'Header',
		propsType: 'HeaderProps',
		category: 'layout',
		slug: 'header',
		root: 'header',
		props: ['children', 'sticky', 'padding'],
		controls: [
			{ prop: 'sticky', kind: 'boolean', defaultValue: false },
			{ prop: 'padding', kind: 'select', defaultValue: 'md', options: space }
		],
		load: () => import('$lib/components/containers/Header.svelte')
	},
	{
		name: 'Section',
		propsType: 'SectionProps',
		category: 'layout',
		slug: 'section',
		root: 'section',
		props: ['children', 'scrollable', 'gap', 'padding'],
		controls: [
			{ prop: 'scrollable', kind: 'boolean', defaultValue: false },
			{ prop: 'gap', kind: 'select', defaultValue: 'md', options: space },
			{ prop: 'padding', kind: 'select', defaultValue: 'md', options: space }
		],
		load: () => import('$lib/components/containers/Section.svelte')
	},
	{
		name: 'Footer',
		propsType: 'FooterProps',
		category: 'layout',
		slug: 'footer',
		root: 'footer',
		props: ['children', 'sticky', 'padding', 'expandable', 'open'],
		controls: [
			{ prop: 'sticky', kind: 'boolean', defaultValue: false },
			{ prop: 'padding', kind: 'select', defaultValue: 'md', options: space },
			{ prop: 'expandable', kind: 'boolean', defaultValue: false },
			{ prop: 'open', kind: 'boolean', defaultValue: true }
		],
		load: () => import('$lib/components/containers/Footer.svelte')
	},
	{
		name: 'Row',
		propsType: 'RowProps',
		category: 'layout',
		slug: 'row',
		root: 'div',
		props: ['children', 'gap', 'align', 'justify', 'wrap', 'fullWidth'],
		controls: [
			{ prop: 'gap', kind: 'select', defaultValue: 'md', options: space },
			{
				prop: 'align',
				kind: 'select',
				defaultValue: 'center',
				options: ['start', 'center', 'end', 'baseline', 'stretch']
			},
			{
				prop: 'justify',
				kind: 'select',
				defaultValue: 'start',
				options: ['start', 'center', 'end', 'between', 'around', 'evenly']
			},
			{ prop: 'wrap', kind: 'boolean', defaultValue: true },
			{ prop: 'fullWidth', kind: 'boolean', defaultValue: false }
		],
		load: () => import('$lib/components/layout/Row.svelte')
	},
	{
		name: 'Column',
		propsType: 'ColumnProps',
		category: 'layout',
		slug: 'column',
		root: 'div',
		props: ['children', 'gap', 'align', 'justify', 'fullWidth'],
		controls: [
			{ prop: 'gap', kind: 'select', defaultValue: 'md', options: space },
			{
				prop: 'align',
				kind: 'select',
				defaultValue: 'stretch',
				options: ['start', 'center', 'end', 'baseline', 'stretch']
			},
			{
				prop: 'justify',
				kind: 'select',
				defaultValue: 'start',
				options: ['start', 'center', 'end', 'between', 'around', 'evenly']
			},
			{ prop: 'fullWidth', kind: 'boolean', defaultValue: false }
		],
		load: () => import('$lib/components/layout/Column.svelte')
	},
	{
		name: 'Grid',
		propsType: 'GridProps',
		category: 'layout',
		slug: 'grid',
		root: 'div',
		props: ['children', 'columns', 'minColumnWidth', 'gap', 'fullWidth'],
		controls: [
			{ prop: 'columns', kind: 'number', defaultValue: 2, min: 1, max: 6, step: 1 },
			{ prop: 'minColumnWidth', kind: 'text', defaultValue: '12rem' },
			{ prop: 'gap', kind: 'select', defaultValue: 'md', options: space },
			{ prop: 'fullWidth', kind: 'boolean', defaultValue: false }
		],
		load: () => import('$lib/components/layout/Grid.svelte')
	},
	{
		name: 'Button',
		propsType: 'ButtonProps',
		category: 'actions',
		slug: 'button',
		root: 'button',
		props: ['children', 'variant', 'size', 'fullWidth', 'iconOnly', 'loading', 'casing'],
		controls: [
			{ prop: 'variant', kind: 'select', defaultValue: 'primary', options: variants },
			{ prop: 'size', kind: 'select', defaultValue: 'md', options: size },
			{ prop: 'fullWidth', kind: 'boolean', defaultValue: false },
			{ prop: 'iconOnly', kind: 'boolean', defaultValue: false },
			{ prop: 'loading', kind: 'boolean', defaultValue: false },
			{ prop: 'casing', kind: 'select', defaultValue: 'none', options: ['none', 'uppercase'] }
		],
		load: () => import('$lib/components/actions/Button.svelte')
	},
	{
		name: 'Tabs',
		propsType: 'TabsProps',
		category: 'actions',
		slug: 'tabs',
		root: 'nav',
		props: ['items', 'value', 'size', 'fullWidth', 'children', 'onchange'],
		controls: [
			{
				prop: 'value',
				kind: 'select',
				defaultValue: 'first',
				options: ['first', 'second', 'third']
			},
			{ prop: 'size', kind: 'select', defaultValue: 'md', options: size },
			{ prop: 'fullWidth', kind: 'boolean', defaultValue: false },
			{ prop: 'items', kind: 'scenario', defaultValue: 'default' },
			{ prop: 'onchange', kind: 'scenario', defaultValue: 'log' }
		],
		load: () => import('$lib/components/actions/Tabs.svelte')
	},
	{
		name: 'Dropdown',
		propsType: 'DropdownProps',
		category: 'actions',
		slug: 'dropdown',
		root: 'div',
		props: ['label', 'trigger', 'items', 'children', 'open', 'variant', 'size', 'placement'],
		controls: [
			{ prop: 'label', kind: 'text', defaultValue: 'Options' },
			{ prop: 'open', kind: 'boolean', defaultValue: false },
			{ prop: 'variant', kind: 'select', defaultValue: 'primary', options: variants },
			{ prop: 'size', kind: 'select', defaultValue: 'md', options: size },
			{
				prop: 'placement',
				kind: 'select',
				defaultValue: 'bottom-start',
				options: ['bottom-start', 'bottom-end', 'top-start', 'top-end']
			},
			{ prop: 'items', kind: 'scenario', defaultValue: 'default' },
			{ prop: 'trigger', kind: 'scenario', defaultValue: 'default' }
		],
		load: () => import('$lib/components/actions/Dropdown.svelte')
	},
	{
		name: 'Input',
		propsType: 'InputProps',
		category: 'forms',
		slug: 'input',
		root: 'input',
		props: ['label', 'size', 'invalid', 'fullWidth', 'prefix', 'suffix'],
		controls: [
			{ prop: 'label', kind: 'text', defaultValue: 'Label' },
			{ prop: 'size', kind: 'select', defaultValue: 'md', options: size },
			{ prop: 'invalid', kind: 'boolean', defaultValue: false },
			{ prop: 'fullWidth', kind: 'boolean', defaultValue: false },
			{ prop: 'prefix', kind: 'scenario', defaultValue: 'none' },
			{ prop: 'suffix', kind: 'scenario', defaultValue: 'none' }
		],
		load: () => import('$lib/components/forms/Input.svelte')
	},
	{
		name: 'Textarea',
		propsType: 'TextareaProps',
		category: 'forms',
		slug: 'textarea',
		root: 'textarea',
		props: ['label', 'size', 'invalid', 'fullWidth', 'resize'],
		controls: [
			{ prop: 'label', kind: 'text', defaultValue: 'Label' },
			{ prop: 'size', kind: 'select', defaultValue: 'md', options: size },
			{ prop: 'invalid', kind: 'boolean', defaultValue: false },
			{ prop: 'fullWidth', kind: 'boolean', defaultValue: false },
			{
				prop: 'resize',
				kind: 'select',
				defaultValue: 'vertical',
				options: ['none', 'vertical', 'horizontal', 'both']
			}
		],
		load: () => import('$lib/components/forms/Textarea.svelte')
	},
	{
		name: 'Select',
		propsType: 'SelectProps',
		category: 'forms',
		slug: 'select',
		root: 'select',
		props: [
			'label',
			'children',
			'size',
			'invalid',
			'fullWidth',
			'options',
			'placeholder',
			'nativeOnMobile'
		],
		controls: [
			{ prop: 'label', kind: 'text', defaultValue: 'Label' },
			{ prop: 'size', kind: 'select', defaultValue: 'md', options: size },
			{ prop: 'invalid', kind: 'boolean', defaultValue: false },
			{ prop: 'fullWidth', kind: 'boolean', defaultValue: false },
			{ prop: 'placeholder', kind: 'text', defaultValue: 'Choose one' },
			{ prop: 'nativeOnMobile', kind: 'boolean', defaultValue: false },
			{ prop: 'options', kind: 'scenario', defaultValue: 'default' }
		],
		load: () => import('$lib/components/forms/Select.svelte')
	},
	{
		name: 'Checkbox',
		propsType: 'CheckboxProps',
		category: 'forms',
		slug: 'checkbox',
		root: 'input',
		props: ['label', 'children', 'invalid', 'indeterminate', 'variant'],
		controls: [
			{ prop: 'label', kind: 'text', defaultValue: 'Option' },
			{ prop: 'invalid', kind: 'boolean', defaultValue: false },
			{ prop: 'indeterminate', kind: 'boolean', defaultValue: false },
			{ prop: 'variant', kind: 'select', defaultValue: 'default', options: ['default', 'card'] },
			{ prop: 'children', kind: 'scenario', defaultValue: 'default' }
		],
		load: () => import('$lib/components/forms/Checkbox.svelte')
	},
	{
		name: 'Radio',
		propsType: 'RadioProps',
		category: 'forms',
		slug: 'radio',
		root: 'input',
		props: ['label', 'children', 'invalid', 'group', 'value', 'variant'],
		controls: [
			{ prop: 'label', kind: 'text', defaultValue: 'Option' },
			{ prop: 'invalid', kind: 'boolean', defaultValue: false },
			{ prop: 'value', kind: 'text', defaultValue: 'first' },
			{ prop: 'variant', kind: 'select', defaultValue: 'default', options: ['default', 'card'] },
			{ prop: 'group', kind: 'scenario', defaultValue: 'default' },
			{ prop: 'children', kind: 'scenario', defaultValue: 'default' }
		],
		load: () => import('$lib/components/forms/Radio.svelte')
	},
	{
		name: 'Switch',
		propsType: 'SwitchProps',
		category: 'forms',
		slug: 'switch',
		root: 'input',
		props: ['label', 'size', 'invalid'],
		controls: [
			{ prop: 'label', kind: 'text', defaultValue: 'Enabled' },
			{ prop: 'size', kind: 'select', defaultValue: 'md', options: size },
			{ prop: 'invalid', kind: 'boolean', defaultValue: false }
		],
		load: () => import('$lib/components/forms/Switch.svelte')
	},
	{
		name: 'Slider',
		propsType: 'SliderProps',
		category: 'forms',
		slug: 'slider',
		root: 'input',
		props: ['label', 'size', 'invalid', 'min', 'max', 'step', 'showValue', 'valueSuffix'],
		controls: [
			{ prop: 'label', kind: 'text', defaultValue: 'Value' },
			{ prop: 'size', kind: 'select', defaultValue: 'md', options: size },
			{ prop: 'invalid', kind: 'boolean', defaultValue: false },
			{ prop: 'min', kind: 'number', defaultValue: 0, min: 0, max: 100, step: 1 },
			{ prop: 'max', kind: 'number', defaultValue: 100, min: 1, max: 1000, step: 1 },
			{ prop: 'step', kind: 'number', defaultValue: 1, min: 1, max: 100, step: 1 },
			{ prop: 'showValue', kind: 'boolean', defaultValue: true },
			{ prop: 'valueSuffix', kind: 'text', defaultValue: '%' }
		],
		load: () => import('$lib/components/forms/Slider.svelte')
	},
	{
		name: 'Calendar',
		propsType: 'CalendarProps',
		category: 'forms',
		slug: 'calendar',
		root: 'div',
		props: ['value', 'mode', 'minDate', 'maxDate', 'disablePast', 'onselect'],
		controls: [
			{ prop: 'value', kind: 'date', defaultValue: '2026-09-01' },
			{
				prop: 'mode',
				kind: 'select',
				defaultValue: 'month',
				options: ['month', 'strip', 'week', 'expandable']
			},
			{ prop: 'minDate', kind: 'date', defaultValue: '2026-01-01' },
			{ prop: 'maxDate', kind: 'date', defaultValue: '2026-12-31' },
			{ prop: 'disablePast', kind: 'boolean', defaultValue: false },
			{ prop: 'onselect', kind: 'scenario', defaultValue: 'log' }
		],
		load: () => import('$lib/components/forms/Calendar.svelte')
	},
	{
		name: 'Chips',
		propsType: 'ChipsProps',
		category: 'forms',
		slug: 'chips',
		root: 'div',
		props: [
			'value',
			'label',
			'placeholder',
			'disabled',
			'invalid',
			'suggestions',
			'fullWidth',
			'name',
			'onadd',
			'onremove'
		],
		controls: [
			{ prop: 'label', kind: 'text', defaultValue: 'Tags' },
			{ prop: 'placeholder', kind: 'text', defaultValue: 'Add a tag' },
			{ prop: 'disabled', kind: 'boolean', defaultValue: false },
			{ prop: 'invalid', kind: 'boolean', defaultValue: false },
			{ prop: 'fullWidth', kind: 'boolean', defaultValue: false },
			{ prop: 'name', kind: 'text', defaultValue: 'tags' },
			{ prop: 'value', kind: 'scenario', defaultValue: 'default' },
			{ prop: 'suggestions', kind: 'scenario', defaultValue: 'default' },
			{ prop: 'onadd', kind: 'scenario', defaultValue: 'log' },
			{ prop: 'onremove', kind: 'scenario', defaultValue: 'log' }
		],
		load: () => import('$lib/components/forms/Chips.svelte')
	},
	{
		name: 'Card',
		propsType: 'CardProps',
		category: 'display',
		slug: 'card',
		root: 'article',
		props: [
			'children',
			'header',
			'footer',
			'variant',
			'padding',
			'radius',
			'interactive',
			'fullWidth',
			'collapsible',
			'open',
			'badgeTitle',
			'back',
			'flipped'
		],
		controls: [
			{
				prop: 'variant',
				kind: 'select',
				defaultValue: 'default',
				options: ['default', 'outlined', 'flat']
			},
			{ prop: 'padding', kind: 'select', defaultValue: 'md', options: space },
			{ prop: 'radius', kind: 'select', defaultValue: 'md', options: ['sm', 'md'] },
			{ prop: 'interactive', kind: 'boolean', defaultValue: false },
			{ prop: 'fullWidth', kind: 'boolean', defaultValue: false },
			{ prop: 'collapsible', kind: 'boolean', defaultValue: false },
			{ prop: 'open', kind: 'boolean', defaultValue: true },
			{ prop: 'badgeTitle', kind: 'text', defaultValue: '' },
			{ prop: 'flipped', kind: 'boolean', defaultValue: false },
			{ prop: 'children', kind: 'scenario', defaultValue: 'default' },
			{ prop: 'header', kind: 'scenario', defaultValue: 'default' },
			{ prop: 'footer', kind: 'scenario', defaultValue: 'default' },
			{ prop: 'back', kind: 'scenario', defaultValue: 'default' }
		],
		load: () => import('$lib/components/display/Card.svelte')
	},
	{
		name: 'Badge',
		propsType: 'BadgeProps',
		category: 'display',
		slug: 'badge',
		root: 'span',
		props: ['children', 'variant', 'size', 'pill'],
		controls: [
			{
				prop: 'variant',
				kind: 'select',
				defaultValue: 'primary',
				options: [
					'primary',
					'secondary',
					'outline',
					'ghost',
					'danger',
					'success',
					'warning',
					'neutral'
				]
			},
			{ prop: 'size', kind: 'select', defaultValue: 'md', options: ['sm', 'md'] },
			{ prop: 'pill', kind: 'boolean', defaultValue: false }
		],
		load: () => import('$lib/components/display/Badge.svelte')
	},
	{
		name: 'Divider',
		propsType: 'DividerProps',
		category: 'display',
		slug: 'divider',
		root: 'hr',
		props: ['label', 'spacing', 'vertical'],
		controls: [
			{ prop: 'label', kind: 'text', defaultValue: '' },
			{ prop: 'spacing', kind: 'select', defaultValue: 'md', options: space },
			{ prop: 'vertical', kind: 'boolean', defaultValue: false }
		],
		load: () => import('$lib/components/display/Divider.svelte')
	},
	{
		name: 'Avatar',
		propsType: 'AvatarProps',
		category: 'display',
		slug: 'avatar',
		root: 'span',
		props: ['src', 'alt', 'name', 'size', 'square', 'circle'],
		controls: [
			{ prop: 'src', kind: 'text', defaultValue: '' },
			{ prop: 'alt', kind: 'text', defaultValue: 'Avatar' },
			{ prop: 'name', kind: 'text', defaultValue: 'Shellfish' },
			{ prop: 'size', kind: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg', 'xl'] },
			{ prop: 'square', kind: 'boolean', defaultValue: false },
			{ prop: 'circle', kind: 'boolean', defaultValue: false }
		],
		load: () => import('$lib/components/display/Avatar.svelte')
	},
	{
		name: 'Alert',
		propsType: 'AlertProps',
		category: 'feedback',
		slug: 'alert',
		root: 'div',
		accessibilityKey: 'catalog.a11y.alert',
		props: ['children', 'variant', 'title', 'closable', 'closeLabel', 'onclose'],
		controls: [
			{
				prop: 'variant',
				kind: 'select',
				defaultValue: 'info',
				options: ['info', 'success', 'warning', 'danger']
			},
			{ prop: 'title', kind: 'text', defaultValue: 'Title' },
			{ prop: 'closable', kind: 'boolean', defaultValue: true },
			{ prop: 'closeLabel', kind: 'text', defaultValue: 'Close' },
			{ prop: 'onclose', kind: 'scenario', defaultValue: 'log' }
		],
		load: () => import('$lib/components/feedback/Alert.svelte')
	},
	{
		name: 'Spinner',
		propsType: 'SpinnerProps',
		category: 'feedback',
		slug: 'spinner',
		root: 'aside',
		props: ['variant', 'size', 'color', 'label'],
		controls: [
			{
				prop: 'variant',
				kind: 'select',
				defaultValue: 'cube',
				options: ['cube', 'ratchet', 'chaser']
			},
			{ prop: 'size', kind: 'select', defaultValue: 'md', options: size },
			{
				prop: 'color',
				kind: 'select',
				defaultValue: 'primary',
				options: ['primary', 'success', 'warning', 'danger', 'info']
			},
			{ prop: 'label', kind: 'text', defaultValue: 'Loading' }
		],
		load: () => import('$lib/components/feedback/Spinner.svelte')
	},
	{
		name: 'ProgressBar',
		propsType: 'ProgressBarProps',
		category: 'feedback',
		slug: 'progress-bar',
		root: 'div',
		props: ['value', 'max', 'size', 'variant', 'striped', 'showLabel', 'label'],
		controls: [
			{ prop: 'value', kind: 'number', defaultValue: 50, min: 0, max: 100, step: 1 },
			{ prop: 'max', kind: 'number', defaultValue: 100, min: 1, max: 1000, step: 1 },
			{ prop: 'size', kind: 'select', defaultValue: 'md', options: size },
			{
				prop: 'variant',
				kind: 'select',
				defaultValue: 'primary',
				options: ['primary', 'secondary', 'success', 'warning', 'danger']
			},
			{ prop: 'striped', kind: 'boolean', defaultValue: false },
			{ prop: 'showLabel', kind: 'boolean', defaultValue: true },
			{ prop: 'label', kind: 'text', defaultValue: 'Progress' }
		],
		load: () => import('$lib/components/feedback/ProgressBar.svelte')
	},
	{
		name: 'Dialog',
		propsType: 'DialogProps',
		category: 'feedback',
		slug: 'dialog',
		root: 'dialog',
		props: [
			'open',
			'title',
			'children',
			'footer',
			'size',
			'closeOnOutsideClick',
			'closeLabel',
			'onclose'
		],
		controls: [
			{ prop: 'open', kind: 'boolean', defaultValue: false },
			{ prop: 'title', kind: 'text', defaultValue: 'Dialog' },
			{ prop: 'size', kind: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg', 'full'] },
			{ prop: 'closeOnOutsideClick', kind: 'boolean', defaultValue: true },
			{ prop: 'closeLabel', kind: 'text', defaultValue: 'Close' },
			{ prop: 'children', kind: 'scenario', defaultValue: 'default' },
			{ prop: 'footer', kind: 'scenario', defaultValue: 'default' },
			{ prop: 'onclose', kind: 'scenario', defaultValue: 'log' }
		],
		load: () => import('$lib/components/feedback/Dialog.svelte')
	},
	{
		name: 'Toast',
		propsType: 'ToastProps',
		category: 'feedback',
		slug: 'toast',
		root: 'div',
		accessibilityKey: 'catalog.a11y.toast',
		props: ['children', 'variant', 'duration', 'open', 'closeLabel', 'onclose'],
		controls: [
			{
				prop: 'variant',
				kind: 'select',
				defaultValue: 'info',
				options: ['info', 'success', 'warning', 'danger']
			},
			{ prop: 'duration', kind: 'number', defaultValue: 4000, min: 0, max: 10000, step: 500 },
			{ prop: 'open', kind: 'boolean', defaultValue: true },
			{ prop: 'closeLabel', kind: 'text', defaultValue: 'Close' },
			{ prop: 'onclose', kind: 'scenario', defaultValue: 'log' }
		],
		load: () => import('$lib/components/feedback/Toast.svelte')
	},
	{
		name: 'ThemeSelector',
		propsType: 'ThemeSelectorProps',
		category: 'suite',
		slug: 'theme-selector',
		root: 'button',
		props: ['size', 'storageKey'],
		controls: [
			{ prop: 'size', kind: 'select', defaultValue: 'md', options: size },
			{ prop: 'storageKey', kind: 'text', defaultValue: 'shellfish-catalog-theme' }
		],
		load: () => import('$lib/components/suite/ThemeSelector.svelte')
	},
	{
		name: 'LocaleSelector',
		propsType: 'LocaleSelectorProps',
		category: 'suite',
		slug: 'locale-selector',
		root: 'button',
		props: ['size', 'storageKey'],
		controls: [
			{ prop: 'size', kind: 'select', defaultValue: 'md', options: size },
			{ prop: 'storageKey', kind: 'text', defaultValue: 'zoo_locale' }
		],
		load: () => import('$lib/components/suite/LocaleSelector.svelte')
	}
];

export const catalogEntries = entries as readonly CatalogEntry[];

export function getCategoryEntries(category: CatalogCategory): CatalogEntry[] {
	return catalogEntries.filter((entry) => entry.category === category);
}

export function getCatalogEntry(category: string, slug: string): CatalogEntry | undefined {
	return catalogEntries.find((entry) => entry.category === category && entry.slug === slug);
}
