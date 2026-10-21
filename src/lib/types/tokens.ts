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
