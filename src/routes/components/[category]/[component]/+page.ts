import { error } from '@sveltejs/kit';
import { getCatalogEntry } from '../../_catalog/registry.js';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const entry = getCatalogEntry(params.category, params.component);
	if (!entry) error(404, 'Component not found');
	return { category: entry.category, slug: entry.slug };
};
