import { test, expect } from '@playwright/test';

test.describe('Showcase SSR & i18n E2E Behavior', () => {
	test('renderiza SSR inicialmente em português quando Accept-Language for pt-BR (sem JS, provando ausência de FOUC)', async ({
		browser,
		baseURL
	}) => {
		const targetUrl = baseURL ?? 'http://127.0.0.1:5172';
		const context = await browser.newContext({
			baseURL: targetUrl,
			locale: 'pt-BR',
			extraHTTPHeaders: {
				'Accept-Language': 'pt-BR,pt;q=0.9'
			},
			javaScriptEnabled: false
		});
		const page = await context.newPage();
		await page.goto(targetUrl);

		// Valida atributo lang no SSR puro
		const htmlTag = page.locator('html');
		await expect(htmlTag).toHaveAttribute('lang', 'pt-BR');

		// Valida textos em português no SSR sem execução de JavaScript
		const body = page.locator('body');
		await expect(body).toContainText('Ações');
		await expect(body).toContainText('Formulários');
		await expect(body).toContainText('Superfícies');
		await expect(body).toContainText('Feedback');
		await expect(body).toContainText('Botões');
		await expect(body).toContainText('Principal');
		await expect(body).toContainText('Chips');
		await expect(body).toContainText('Dropdowns');

		await context.close();
	});

	test('renderiza SSR inicialmente em inglês quando Accept-Language for en-US (sem JS, provando ausência de FOUC)', async ({
		browser,
		baseURL
	}) => {
		const targetUrl = baseURL ?? 'http://127.0.0.1:5172';
		const context = await browser.newContext({
			baseURL: targetUrl,
			locale: 'en-US',
			extraHTTPHeaders: {
				'Accept-Language': 'en-US,en;q=0.9'
			},
			javaScriptEnabled: false
		});
		const page = await context.newPage();
		await page.goto(targetUrl);

		// Valida atributo lang no SSR puro
		const htmlTag = page.locator('html');
		await expect(htmlTag).toHaveAttribute('lang', 'en-US');

		// Valida textos em inglês no SSR sem execução de JavaScript (sem FOUC)
		const body = page.locator('body');
		await expect(body).toContainText('Actions');
		await expect(body).toContainText('Forms');
		await expect(body).toContainText('Surfaces');
		await expect(body).toContainText('Feedback');
		await expect(body).toContainText('Buttons');
		await expect(body).toContainText('Primary');
		await expect(body).toContainText('Chips');
		await expect(body).toContainText('Dropdowns');

		await context.close();
	});

	test('alterna idioma interativamente via LocaleSelector e persiste preferência por cookie após reload', async ({
		page,
		context
	}) => {
		// Garante estado inicial determinístico em português
		await context.clearCookies();
		await context.setExtraHTTPHeaders({
			'Accept-Language': 'pt-BR,pt;q=0.9'
		});

		await page.goto('/');

		// Localiza botão seletor de idioma
		const localeButton = page.locator(
			'button[aria-label="Alternar idioma"], button[aria-label="Toggle language"]'
		);
		await expect(localeButton).toBeVisible();

		// Garante que iniciou em PT
		await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
		await expect(page.locator('body')).toContainText('Ações');

		// Clica para alternar para EN
		await localeButton.click();
		await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');
		await expect(page.locator('body')).toContainText('Actions');
		await expect(page.locator('body')).toContainText('Buttons');

		// Verifica se o cookie zoo_locale foi gravado
		const cookies = await context.cookies();
		const zooCookie = cookies.find((c) => c.name === 'zoo_locale');
		expect(zooCookie).toBeDefined();
		expect(zooCookie?.value).toBe('en-US');

		// Recarrega a página e valida persistência da preferência
		await page.reload();
		await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');
		await expect(page.locator('body')).toContainText('Actions');
		await expect(page.locator('body')).toContainText('Buttons');
	});

	test('preserva dados customizados digitados pelo usuário em input e textarea ao alternar idioma', async ({
		page,
		context
	}) => {
		await context.clearCookies();
		await context.setExtraHTTPHeaders({
			'Accept-Language': 'pt-BR,pt;q=0.9'
		});

		await page.goto('/');

		// Navega para a aba de Formulários
		const formsTab = page.locator(
			'button[role="tab"]:has-text("Formulários"), button[role="tab"]:has-text("Forms")'
		);
		await formsTab.click();

		// Digita valores personalizados do usuário
		const customInputText = 'Texto digitado pelo usuário 12345';
		const customTextareaText = 'Observação personalizada que deve permanecer intacta!';

		const textInput = page.locator(
			'input[placeholder="Digite aqui..."], input[placeholder="Type here..."]'
		);
		await textInput.fill(customInputText);

		const textarea = page.locator('textarea');
		await textarea.fill(customTextareaText);

		// Alterna idioma
		const localeButton = page.locator(
			'button[aria-label="Alternar idioma"], button[aria-label="Toggle language"]'
		);
		await localeButton.click();

		// Confirma que o idioma da página mudou (rótulo da aba mudou para "Forms" e header para "Text Inputs")
		await expect(page.locator('body')).toContainText('Text Inputs');

		// Valida que os valores inseridos pelo usuário NÃO foram sobrescritos pela tradução dos exemplos
		await expect(textInput).toHaveValue(customInputText);
		await expect(textarea).toHaveValue(customTextareaText);
	});
});
