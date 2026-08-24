import type { Handle } from '@sveltejs/kit';
import type { Locale } from '$lib/types/i18n.js';
import { parseAcceptLanguage } from '$lib/utils/i18n.svelte.js';

export const handle: Handle = async ({ event, resolve }) => {
	const cookieLocale = event.cookies.get('zoo_locale');
	const hasLocaleCookie = cookieLocale === 'pt-BR' || cookieLocale === 'en-US';
	const locale: Locale = hasLocaleCookie
		? (cookieLocale as Locale)
		: parseAcceptLanguage(event.request.headers.get('accept-language'));

	event.locals.locale = locale;
	event.locals.hasLocaleCookie = hasLocaleCookie;

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', locale)
	});
};
