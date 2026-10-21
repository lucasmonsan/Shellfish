export const TABS_CONTEXT_KEY = Symbol('tabs-context');

export interface TabsContext {
	getValue: () => string | undefined;
	selectTab: (value: string) => void;
	getOrientation: () => 'horizontal' | 'vertical';
	getActivation: () => 'automatic' | 'manual';
	getSize: () => string;
	getBaseId: () => string;
}
