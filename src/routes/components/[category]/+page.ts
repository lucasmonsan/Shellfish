import { error } from '@sveltejs/kit';
import { catalogCategories } from '../_catalog/types.js';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	if (!catalogCategories.includes(params.category as (typeof catalogCategories)[number]))
		error(404, 'Category not found');
	return { category: params.category as (typeof catalogCategories)[number] };
};
