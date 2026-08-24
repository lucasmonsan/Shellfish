import type { LayoutServerLoad } from './$types';
import type { Locale } from '$lib/types/i18n.js';
import pkg from '../../package.json' with { type: 'json' };

export const load: LayoutServerLoad = ({ locals }) => {
	return {
		locale: (locals.locale || 'pt-BR') as Locale,
		version: pkg.version
	};
};
