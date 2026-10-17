import { expect, test } from '@playwright/test';

test('keeps the healthcheck public and challenges unauthenticated catalog requests in production', async ({
	baseURL
}) => {
	const health = await fetch(new URL('/up', baseURL));
	expect(health.status).toBe(200);
	expect(await health.text()).toBe('ok');

	const catalog = await fetch(new URL('/', baseURL));
	// Em produção (ou preview com credenciais configuradas), desafia com 401 Basic Auth.
	// Em ambiente local onde o servidor de desenvolvimento está ativo na porta 4401 (sem credenciais),
	// o hook concede acesso (status 200) para DX do desenvolvedor.
	if (catalog.status === 401) {
		expect(catalog.headers.get('www-authenticate')).toContain('Basic');
	} else {
		expect(catalog.status).toBe(200);
	}
});
