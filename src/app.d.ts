import type { Locale } from '$lib/types/i18n.js';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			locale: Locale;
			hasLocaleCookie: boolean;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
