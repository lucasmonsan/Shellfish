import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

export interface RgbaColor {
	r: number;
	g: number;
	b: number;
	a: number;
}

export type TokenMap = Record<string, string>;

/**
 * Extrai os tokens de :root (Light) e :root[data-theme='dark'] (Dark) do variables.css.
 * No tema Dark, tokens não sobrescritos herdam automaticamente do Light.
 */
export function extractThemeTokens(cssContent: string): { light: TokenMap; dark: TokenMap } {
	const rootMatch = cssContent.match(/:root\s*\{([\s\S]*?)\n\}/);
	const darkMatch = cssContent.match(/:root\[data-theme=['"]dark['"]\]\s*\{([\s\S]*?)\n\}/);

	function parseBlock(blockText: string): TokenMap {
		const tokens: TokenMap = {};
		for (const line of blockText.split('\n')) {
			const match = line.match(/^\s*(--[\w-]+)\s*:\s*([^;]+);/);
			if (match) {
				tokens[match[1]] = match[2].trim();
			}
		}
		return tokens;
	}

	const light = rootMatch ? parseBlock(rootMatch[1]) : {};
	const darkOverrides = darkMatch ? parseBlock(darkMatch[1]) : {};
	const dark = { ...light, ...darkOverrides };

	return { light, dark };
}

/**
 * Converte qualquer representação de cor CSS (hex, rgb, rgba ou var(--...)) em RGBA numérico.
 */
export function parseColor(raw: string, tokens: TokenMap = {}): RgbaColor | null {
	let val = (tokens[raw] || raw).trim();
	let depth = 0;

	while (val.startsWith('var(') && depth < 5) {
		const varName = val.slice(4, -1).trim();
		if (tokens[varName]) {
			val = tokens[varName].trim();
			depth++;
		} else {
			break;
		}
	}

	if (val.startsWith('#')) {
		let hex = val.slice(1);
		if (hex.length === 3) {
			hex = hex
				.split('')
				.map((c) => c + c)
				.join('');
		}
		if (hex.length === 6) {
			return {
				r: parseInt(hex.slice(0, 2), 16),
				g: parseInt(hex.slice(2, 4), 16),
				b: parseInt(hex.slice(4, 6), 16),
				a: 1
			};
		}
	}

	const rgbaMatch = val.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/);
	if (rgbaMatch) {
		return {
			r: parseInt(rgbaMatch[1], 10),
			g: parseInt(rgbaMatch[2], 10),
			b: parseInt(rgbaMatch[3], 10),
			a: rgbaMatch[4] !== undefined ? parseFloat(rgbaMatch[4]) : 1
		};
	}

	return null;
}

/**
 * Realiza composição alfa (alpha compositing) de uma cor translúcida sobre um fundo opaco.
 */
export function blendAlpha(fg: RgbaColor, bg: RgbaColor): RgbaColor {
	return {
		r: Math.round(fg.r * fg.a + bg.r * (1 - fg.a)),
		g: Math.round(fg.g * fg.a + bg.g * (1 - fg.a)),
		b: Math.round(fg.b * fg.a + bg.b * (1 - fg.a)),
		a: 1
	};
}

/**
 * Calcula a Luminância Relativa conforme o padrão W3C WCAG 2.1.
 * Fórmula: L = 0.2126 * R + 0.7152 * G + 0.0722 * B
 */
export function getRelativeLuminance(color: RgbaColor): number {
	const [r, g, b] = [color.r, color.g, color.b].map((channel) => {
		const s = channel / 255;
		return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
	});
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calcula a Razão de Contraste WCAG 2.1 entre dois tokens.
 */
export function calculateContrastRatio(
	fgToken: string,
	bgToken: string,
	tokens: TokenMap,
	baseCanvasToken: string = '--bg-primary'
): number | null {
	const bg = parseColor(bgToken, tokens);
	const fg = parseColor(fgToken, tokens);
	if (!fg || !bg) return null;

	const baseCanvas = parseColor(baseCanvasToken, tokens) ?? { r: 255, g: 255, b: 255, a: 1 };
	const resolvedBg = bg.a < 1 ? blendAlpha(bg, baseCanvas) : bg;
	const resolvedFg = fg.a < 1 ? blendAlpha(fg, resolvedBg) : fg;

	const l1 = getRelativeLuminance(resolvedFg);
	const l2 = getRelativeLuminance(resolvedBg);

	const lighter = Math.max(l1, l2);
	const darker = Math.min(l1, l2);

	return Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
}

interface ContrastPairSpec {
	fg: string;
	bg: string;
	minRatio: number;
	context: string;
}

function assertContrastMatrix(
	themeName: 'Light' | 'Dark',
	tokens: TokenMap,
	pairs: ContrastPairSpec[]
) {
	const violations: string[] = [];

	for (const { fg, bg, minRatio, context } of pairs) {
		const ratio = calculateContrastRatio(fg, bg, tokens, '--bg-primary');
		const fgVal = tokens[fg] ?? fg;
		const bgVal = tokens[bg] ?? bg;

		if (ratio === null) {
			violations.push(
				`  [${themeName}] Token inválido ou não encontrado: ${fg} (${fgVal}) sobre ${bg} (${bgVal})`
			);
			continue;
		}

		if (ratio < minRatio) {
			violations.push(
				`  [${themeName}] ${fg} (${fgVal}) sobre ${bg} (${bgVal}) -> Contraste atual: ${ratio}:1 | Exigido: >= ${minRatio}:1 (${context})`
			);
		}
	}

	if (violations.length > 0) {
		expect.fail(
			`Violações de Contraste WCAG 2.1 detectadas no tema ${themeName}:\n\n${violations.join('\n')}\n\nCalibre os tokens em src/lib/styles/variables.css para atingir os limiares exigidos.`
		);
	}

	expect(violations).toHaveLength(0);
}

describe('Invariant Test: Universal WCAG 2.1 Color Contrast Matrix (Hard Fail)', () => {
	const varsPath = path.resolve('src/lib/styles/variables.css');
	const cssContent = fs.readFileSync(varsPath, 'utf8');
	const { light, dark } = extractThemeTokens(cssContent);

	const typographyAndSurfacePairs: ContrastPairSpec[] = [
		{ fg: '--text-primary', bg: '--bg-primary', minRatio: 7.0, context: 'Texto principal AAA' },
		{ fg: '--text-primary', bg: '--bg-secondary', minRatio: 7.0, context: 'Texto principal AAA' },
		{ fg: '--text-primary', bg: '--bg-elevated', minRatio: 7.0, context: 'Texto principal AAA' },
		{ fg: '--text-primary', bg: '--bg-input', minRatio: 7.0, context: 'Texto de input AAA' },
		{ fg: '--text-secondary', bg: '--bg-primary', minRatio: 4.5, context: 'Texto secundário AA' },
		{ fg: '--text-secondary', bg: '--bg-secondary', minRatio: 4.5, context: 'Texto secundário AA' },
		{ fg: '--text-secondary', bg: '--bg-elevated', minRatio: 4.5, context: 'Texto secundário AA' },
		{
			fg: '--text-muted',
			bg: '--bg-primary',
			minRatio: 4.5,
			context: 'Texto auxiliar / placeholder / contador AA'
		},
		{
			fg: '--text-muted',
			bg: '--bg-input',
			minRatio: 4.5,
			context: 'Placeholder sobre fundo de input AA'
		}
	];

	const solidButtonPairs: ContrastPairSpec[] = [
		{
			fg: '--color-primary-contrast',
			bg: '--color-primary',
			minRatio: 4.5,
			context: 'Texto sobre botão/badge Primary AA'
		},
		{
			fg: '--color-on-solid',
			bg: '--color-primary-hover',
			minRatio: 4.5,
			context: 'Texto sobre botão Primary Hover AA'
		},
		{
			fg: '--color-on-solid',
			bg: '--color-danger',
			minRatio: 4.5,
			context: 'Texto sobre botão/badge Danger AA'
		},
		{
			fg: '--color-on-solid',
			bg: '--color-success',
			minRatio: 4.5,
			context: 'Texto sobre botão/badge Success AA'
		},
		{
			fg: '--color-on-solid',
			bg: '--color-info',
			minRatio: 4.5,
			context: 'Texto sobre superfície Info AA'
		},
		{
			fg: '--color-warning-contrast',
			bg: '--color-warning',
			minRatio: 4.5,
			context: 'Texto sobre botão/badge Warning AA'
		}
	];

	const semanticAccentPairs: ContrastPairSpec[] = [
		{
			fg: '--color-outline',
			bg: '--bg-primary',
			minRatio: 4.5,
			context: 'Texto/borda de botão Outline sobre fundo primário AA'
		},
		{
			fg: '--color-primary',
			bg: '--bg-primary',
			minRatio: 3.0,
			context: 'Acento primário / foco / controle ativo sobre fundo (WCAG 1.4.11 >= 3.0:1)'
		},
		{
			fg: '--color-danger',
			bg: '--bg-primary',
			minRatio: 3.0,
			context: 'Acento de perigo / estado inválido sobre fundo (WCAG 1.4.11 >= 3.0:1)'
		},
		{
			fg: '--color-danger-text',
			bg: '--bg-primary',
			minRatio: 4.5,
			context: 'Mensagem de erro (FormField) sobre fundo AA'
		},
		{
			fg: '--color-warning',
			bg: '--bg-primary',
			minRatio: 3.0,
			context: 'Indicador/borda/ícone de alerta sobre fundo (WCAG 1.4.11 >= 3.0:1)'
		},
		{
			fg: '--color-success',
			bg: '--bg-primary',
			minRatio: 3.0,
			context: 'Indicador/borda/ícone de sucesso sobre fundo (WCAG 1.4.11 >= 3.0:1)'
		},
		{
			fg: '--color-info',
			bg: '--bg-primary',
			minRatio: 3.0,
			context: 'Indicador/borda/ícone informativo sobre fundo (WCAG 1.4.11 >= 3.0:1)'
		}
	];

	describe('Light Theme (:root)', () => {
		it('enforces WCAG AAA/AA on all typography and surface combinations', () => {
			assertContrastMatrix('Light', light, typographyAndSurfacePairs);
		});

		it('enforces WCAG AA (>= 4.5:1) on all solid buttons and badges', () => {
			assertContrastMatrix('Light', light, solidButtonPairs);
		});

		it('enforces WCAG AA/UI contrast on semantic accents, error messages, and indicators', () => {
			assertContrastMatrix('Light', light, semanticAccentPairs);
		});
	});

	describe('Dark Theme (:root[data-theme="dark"])', () => {
		it('enforces WCAG AAA/AA on all typography and surface combinations', () => {
			assertContrastMatrix('Dark', dark, typographyAndSurfacePairs);
		});

		it('enforces WCAG AA (>= 4.5:1) on all solid buttons and badges', () => {
			assertContrastMatrix('Dark', dark, solidButtonPairs);
		});

		it('enforces WCAG AA/UI contrast on semantic accents, error messages, and indicators', () => {
			assertContrastMatrix('Dark', dark, semanticAccentPairs);
		});
	});
});
