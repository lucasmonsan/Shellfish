import type { LayoutServerLoad } from './$types';
import type { Locale } from '$lib/types/i18n.js';

export const load: LayoutServerLoad = ({ cookies, request }) => {
	const cookieLocale = cookies.get('zoo_locale') as Locale | undefined;
	if (cookieLocale === 'pt-BR' || cookieLocale === 'en-US') {
		return { locale: cookieLocale };
	}

	// Analisa Accept-Language do cabeçalho
	const acceptLang = request.headers.get('accept-language') || '';
	const prefersEn =
		acceptLang.startsWith('en') || (acceptLang.includes('en') && !acceptLang.includes('pt'));
	const detectedLocale: Locale = prefersEn ? 'en-US' : 'pt-BR';

	return { locale: detectedLocale };
};
