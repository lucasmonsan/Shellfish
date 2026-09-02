import type { Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { timingSafeEqual } from 'node:crypto';
import type { Locale } from '$lib/types/i18n.js';
import { parseAcceptLanguage } from '$lib/utils/i18n.svelte.js';

function matchesCatalogCredentials(authorization: string | null): boolean {
	const username = env.SHELLFISH_CATALOG_USERNAME;
	const password = env.SHELLFISH_CATALOG_PASSWORD;

	if (!username || !password) return env.NODE_ENV !== 'production';

	const expected = Buffer.from(
		`Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
	);
	const received = Buffer.from(authorization ?? '');

	return received.length === expected.length && timingSafeEqual(received, expected);
}

function unauthorizedResponse() {
	const configured = Boolean(env.SHELLFISH_CATALOG_USERNAME && env.SHELLFISH_CATALOG_PASSWORD);
	return new Response(
		configured ? 'Authentication required.' : 'Catalog authentication is not configured.',
		{
			status: configured ? 401 : 503,
			headers: configured ? { 'www-authenticate': 'Basic realm="Shellfish Catalog"' } : undefined
		}
	);
}

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url?.pathname === '/up') {
		return resolve(event);
	}

	if (!matchesCatalogCredentials(event.request.headers.get('authorization'))) {
		return unauthorizedResponse();
	}

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
