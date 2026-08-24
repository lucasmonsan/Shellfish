import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: { command: 'pnpm run build && pnpm run preview', port: 5172 },
	use: {
		baseURL: 'http://127.0.0.1:5172',
		locale: 'pt-BR'
	},
	testMatch: '**/*.e2e.{ts,js}'
});
