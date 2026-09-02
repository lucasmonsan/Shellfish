import { expect, test } from '@playwright/test';

test('keeps the healthcheck public and challenges unauthenticated catalog requests', async ({
	baseURL
}) => {
	const health = await fetch(new URL('/up', baseURL));
	const catalog = await fetch(new URL('/', baseURL));

	expect(health.status).toBe(200);
	expect(await health.text()).toBe('ok');
	expect(catalog.status).toBe(401);
	expect(catalog.headers.get('www-authenticate')).toContain('Basic');
});
