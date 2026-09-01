import type { CatalogEntry } from './types.js';

function formatValue(value: unknown): string {
	if (typeof value === 'string') return JSON.stringify(value);
	if (typeof value === 'number' || typeof value === 'boolean') return String(value);
	if (Array.isArray(value)) return JSON.stringify(value);
	return JSON.stringify(value ?? '');
}

export function createExampleProps(entry: CatalogEntry): Record<string, unknown> {
	const values: Record<string, unknown> = {};
	for (const control of entry.controls) values[control.prop] = control.defaultValue;

	if (entry.name === 'Tabs')
		values.items = [
			{ id: 'first', label: 'First' },
			{ id: 'second', label: 'Second' },
			{ id: 'third', label: 'Third', disabled: true }
		];
	if (entry.name === 'Dropdown')
		values.items = [
			{ id: 'first', label: 'First' },
			{ id: 'second', label: 'Second' }
		];
	if (entry.name === 'Select')
		values.options = [
			{ value: 'first', label: 'First' },
			{ value: 'second', label: 'Second' }
		];
	if (entry.name === 'Chips') {
		values.value = ['Svelte', 'Shellfish'];
		values.suggestions = ['Svelte 5', 'TypeScript', 'Accessibility'];
	}
	return values;
}

export function createCode(entry: CatalogEntry, values: Record<string, unknown>): string {
	const props = Object.entries(values)
		.filter(
			([name]) =>
				![
					'children',
					'header',
					'footer',
					'back',
					'trigger',
					'onclose',
					'onchange',
					'onselect',
					'onadd',
					'onremove'
				].includes(name)
		)
		.filter(([, value]) => value !== '' && value !== false)
		.map(([name, value]) => `\t${name}={${formatValue(value)}}`)
		.join('\n');
	const opening = props ? `<${entry.name}\n${props}\n>` : `<${entry.name}>`;
	const needsChildren = entry.props.includes('children');
	const body = needsChildren ? '\n\tExample content\n' : '';
	return `import { ${entry.name} } from 'shellfish';\n\n${opening}${body}</${entry.name}>`;
}
