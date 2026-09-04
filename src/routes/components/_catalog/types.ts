import type { Component } from 'svelte';

export const catalogCategories = [
	'layout',
	'actions',
	'forms',
	'display',
	'feedback',
	'suite'
] as const;

export type CatalogCategory = (typeof catalogCategories)[number];

export type ControlKind = 'boolean' | 'select' | 'text' | 'number' | 'date' | 'scenario';

export interface CatalogControl {
	prop: string;
	kind: ControlKind;
	defaultValue: unknown;
	options?: readonly string[];
	min?: number;
	max?: number;
	step?: number;
}

export interface CatalogEntry {
	name: string;
	propsType: string;
	category: CatalogCategory;
	slug: string;
	root: string;
	accessibilityKey?: string;
	props: readonly string[];
	controls: readonly CatalogControl[];
	load: () => Promise<{ default: Component }>;
	/** Catalog-only interactive demo, loaded only on the component route. */
	loadDemo: () => Promise<{
		default: Component<{ entry: CatalogEntry; values: Record<string, unknown> }>;
	}>;
}

export interface ApiProp {
	name: string;
	type: string;
	optional: boolean;
	documentation: string;
}

export interface ApiDefinition {
	name: string;
	documentation: string;
	props: ApiProp[];
}
