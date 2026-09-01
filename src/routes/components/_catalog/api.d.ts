declare module 'virtual:shellfish-catalog-api' {
	import type { ApiDefinition } from './types.js';
	const api: Record<string, ApiDefinition>;
	export default api;
}
