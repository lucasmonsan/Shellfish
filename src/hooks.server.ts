import type { Handle } from '@sveltejs/kit';
import type { Locale } from '$lib/types/i18n.js';
import { parseAcceptLanguage } from '$lib/utils/i18n.svelte.js';

export const handle: Handle = async ({ event, resolve }) => {
	const cookieLocale = event.cookies.get('zoo_locale') as Locale | undefined;
	let locale: Locale = 'pt-BR';

	if (cookieLocale === 'pt-BR' || cookieLocale === 'en-US') {
		locale = cookieLocale;
	} else {
		const acceptLang = event.request.headers.get('accept-language');
		locale = parseAcceptLanguage(acceptLang);
	}

	event.locals.locale = locale;

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', locale)
	});
};
