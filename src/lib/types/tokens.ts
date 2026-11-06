/** Supported spacing token. */
export type Space = 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/** Supported radius token. */
export type Radius = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'full';

/** Shared action variant. */
export type Variant =
	| 'primary'
	| 'secondary'
	| 'outline'
	| 'ghost'
	| 'danger'
	| 'error'
	| 'warning'
	| 'success'
	| 'info';

/** Shared control height. */
export type Size = 'sm' | 'md' | 'lg';

/** Supported visual theme. */
export type Theme = 'light' | 'dark';

/** Identificador das 10 famílias de cores minerais da paleta Monsan. */
export type PaletteColorId =
	| 'terracotta'
	| 'amber'
	| 'olive'
	| 'emerald'
	| 'celadon'
	| 'cobalt'
	| 'indigo'
	| 'plum'
	| 'crimson'
	| 'slate';

/** Definição canônica de uma cor da paleta Monsan. */
export interface PaletteColorDef {
	id: PaletteColorId;
	hex: string;
	subtleHex: string;
	nameKey: string;
}

/**
 * Paleta Cromática Mineral Monsan (10 famílias canônicas calibradas).
 * Base unificada para Shellfish e produtos da suíte (ex: Whallet).
 */
export const MONSAN_PALETTE: readonly PaletteColorDef[] = [
	{ id: 'terracotta', hex: '#b94b38', subtleHex: '#fbeee9', nameKey: 'palette.terracotta' },
	{ id: 'amber', hex: '#c2831b', subtleHex: '#fef8eb', nameKey: 'palette.amber' },
	{ id: 'olive', hex: '#5b6e2d', subtleHex: '#f2f6e9', nameKey: 'palette.olive' },
	{ id: 'emerald', hex: '#236f4c', subtleHex: '#edf7f1', nameKey: 'palette.emerald' },
	{ id: 'celadon', hex: '#1d767d', subtleHex: '#ecf7f7', nameKey: 'palette.celadon' },
	{ id: 'cobalt', hex: '#295594', subtleHex: '#eff4fb', nameKey: 'palette.cobalt' },
	{ id: 'indigo', hex: '#4e449c', subtleHex: '#f2f1fa', nameKey: 'palette.indigo' },
	{ id: 'plum', hex: '#823877', subtleHex: '#f9eff7', nameKey: 'palette.plum' },
	{ id: 'crimson', hex: '#a82b3d', subtleHex: '#fdefef', nameKey: 'palette.crimson' },
	{ id: 'slate', hex: '#47535e', subtleHex: '#edf1f3', nameKey: 'palette.slate' }
] as const;

/** Variantes cromáticas de cada família da Paleta Mineral Monsan por tema. */
export interface PaletteFamilyTokens {
	base: string;
	hover: string;
	subtle: string;
	text: string;
	onSolid: string;
}

/** Conjunto de tokens de superfície, tipografia, bordas e paleta mineral para um tema (light ou dark). */
export interface ThemeTokenSet extends Record<PaletteColorId, PaletteFamilyTokens> {
	bgPrimary: string;
	bgSecondary: string;
	bgElevated: string;
	textPrimary: string;
	textSecondary: string;
	textMuted: string;
	borderColor: string;
	borderStrong: string;
	palette: Record<PaletteColorId, PaletteFamilyTokens>;
}

/** Estrutura tipada completa dos tokens de tema (light e dark) do Shellfish. */
export type ShellfishThemeTokens = Record<Theme, ThemeTokenSet>;

const LIGHT_PALETTE_TOKENS: Record<PaletteColorId, PaletteFamilyTokens> = {
	terracotta: {
		base: '#b94b38',
		hover: '#9c3b2a',
		subtle: '#fbeee9',
		text: '#8a2c1d',
		onSolid: '#fdfbf7'
	},
	amber: {
		base: '#c2831b',
		hover: '#a87114',
		subtle: '#fef8eb',
		text: '#7a4b08',
		onSolid: '#1d1817'
	},
	olive: {
		base: '#5b6e2d',
		hover: '#4b5b24',
		subtle: '#f2f6ea',
		text: '#3f4d1e',
		onSolid: '#fdfbf7'
	},
	emerald: {
		base: '#236f4c',
		hover: '#1a563b',
		subtle: '#edf7f1',
		text: '#174d34',
		onSolid: '#fdfbf7'
	},
	celadon: {
		base: '#1d767d',
		hover: '#165f65',
		subtle: '#ecf7f8',
		text: '#135156',
		onSolid: '#fdfbf7'
	},
	cobalt: {
		base: '#295594',
		hover: '#204377',
		subtle: '#eff4fb',
		text: '#1a3863',
		onSolid: '#fdfbf7'
	},
	indigo: {
		base: '#4e449c',
		hover: '#3e3680',
		subtle: '#f2f1fb',
		text: '#342c70',
		onSolid: '#fdfbf7'
	},
	plum: {
		base: '#823877',
		hover: '#6a2c61',
		subtle: '#f9eff7',
		text: '#5b2353',
		onSolid: '#fdfbf7'
	},
	crimson: {
		base: '#a82b3d',
		hover: '#8d2030',
		subtle: '#fdefef',
		text: '#781725',
		onSolid: '#fdfbf7'
	},
	slate: {
		base: '#47535e',
		hover: '#37414a',
		subtle: '#edf1f3',
		text: '#293138',
		onSolid: '#fdfbf7'
	}
} as const;

const DARK_PALETTE_TOKENS: Record<PaletteColorId, PaletteFamilyTokens> = {
	terracotta: {
		base: '#b94b38',
		hover: '#a33f2d',
		subtle: '#38201b',
		text: '#f09a88',
		onSolid: '#fdfbf7'
	},
	amber: {
		base: '#e5a93c',
		hover: '#f0b84d',
		subtle: '#332610',
		text: '#f8c575',
		onSolid: '#1d1817'
	},
	olive: {
		base: '#5f762a',
		hover: '#4e6221',
		subtle: '#232a13',
		text: '#bcd47c',
		onSolid: '#fdfbf7'
	},
	emerald: {
		base: '#357a5b',
		hover: '#3e8e6b',
		subtle: '#182b22',
		text: '#7ed4a7',
		onSolid: '#fdfbf7'
	},
	celadon: {
		base: '#297a82',
		hover: '#338e97',
		subtle: '#14282a',
		text: '#7ad9e1',
		onSolid: '#fdfbf7'
	},
	cobalt: {
		base: '#3f70a1',
		hover: '#4c82b8',
		subtle: '#182533',
		text: '#8db5f0',
		onSolid: '#fdfbf7'
	},
	indigo: {
		base: '#5c52b8',
		hover: '#6b60cc',
		subtle: '#211d3d',
		text: '#aba2f5',
		onSolid: '#fdfbf7'
	},
	plum: {
		base: '#8a3f7e',
		hover: '#9c4b90',
		subtle: '#33182f',
		text: '#e094d4',
		onSolid: '#fdfbf7'
	},
	crimson: {
		base: '#c4383e',
		hover: '#b03036',
		subtle: '#331719',
		text: '#ff7b72',
		onSolid: '#fdfbf7'
	},
	slate: {
		base: '#536270',
		hover: '#627485',
		subtle: '#1d2328',
		text: '#aab8c4',
		onSolid: '#fdfbf7'
	}
} as const;

/**
 * Tokens oficiais de tema (light e dark) e Paleta Mineral Monsan em TypeScript.
 * Permite consumo direto em geradores server-side (ex: Satori/OG Images) sem hardcoding ou parse de CSS.
 */
export const SHELLFISH_THEME_TOKENS: ShellfishThemeTokens = {
	light: {
		bgPrimary: '#fdfbf7',
		bgSecondary: '#f4efe6',
		bgElevated: '#faf6ef',
		textPrimary: '#2d2422',
		textSecondary: '#5e544f',
		textMuted: '#706660',
		borderColor: 'rgba(45, 36, 34, 0.25)',
		borderStrong: 'rgba(45, 36, 34, 0.45)',
		...LIGHT_PALETTE_TOKENS,
		palette: LIGHT_PALETTE_TOKENS
	},
	dark: {
		bgPrimary: '#221d1c',
		bgSecondary: '#352e2d',
		bgElevated: '#2a2423',
		textPrimary: '#fdfbf7',
		textSecondary: '#b8aeaa',
		textMuted: '#918783',
		borderColor: 'rgba(253, 251, 247, 0.22)',
		borderStrong: 'rgba(253, 251, 247, 0.42)',
		...DARK_PALETTE_TOKENS,
		palette: DARK_PALETTE_TOKENS
	}
} as const;

/** Declared palette color token. */
export type PaletteColor =
	| PaletteColorId
	| 'red'
	| 'orange'
	| 'purple'
	| 'pink'
	| 'green-dark'
	| 'green-light'
	| 'blue-dark'
	| 'blue-light'
	| 'yellow'
	| 'white'
	| 'gray'
	| 'black';
