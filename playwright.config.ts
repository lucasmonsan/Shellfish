import { defineConfig } from '@playwright/test';

export default defineConfig({
	timeout: 30_000,
	reporter: [['html', { open: 'never' }], ['list']],
	webServer: {
		command: 'pnpm run build && pnpm run preview',
		env: {
			...process.env,
			SHELLFISH_CATALOG_USERNAME: 'shellfish-e2e',
			SHELLFISH_CATALOG_PASSWORD: 'shellfish-e2e'
		},
		port: 4401,
		reuseExistingServer: !process.env.CI
	},
	use: {
		baseURL: 'http://127.0.0.1:4401',
		httpCredentials: { username: 'shellfish-e2e', password: 'shellfish-e2e' },
		locale: 'pt-BR',
		trace: 'retain-on-failure',
		screenshot: 'only-on-failure'
	},
	testMatch: '**/*.e2e.{ts,js}',
	projects: [
		{ name: 'chromium', use: { browserName: 'chromium', viewport: { width: 1440, height: 960 } } }
	]
});
