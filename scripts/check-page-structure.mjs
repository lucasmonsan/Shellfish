import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const scanRoots = ['src/routes'];
const allowedPageShell = new Map([['src/routes/+page.svelte', 'Initial mock page shell allowed']]);
const allowedForcedFade = new Map();
const legacyPaddingPattern = /\bpadding=["'](?:app-authenticated|page|page-wide|page-compact)["']/;

function normalizePath(path) {
	return path.split('\\').join('/');
}

function walk(path, files = []) {
	const stat = statSync(path);
	if (stat.isDirectory()) {
		for (const entry of readdirSync(path)) {
			walk(join(path, entry), files);
		}
		return files;
	}

	if (path.endsWith('+page.svelte')) {
		files.push(path);
	}
	return files;
}

const files = scanRoots.flatMap((scanRoot) => walk(join(root, scanRoot)));
const errors = [];

for (const file of files) {
	const rel = normalizePath(relative(root, file));
	const source = readFileSync(file, 'utf8');

	if (/<PageShell\b/.test(source) && !allowedPageShell.has(rel)) {
		errors.push(`${rel}: PageShell usage must be migrated to AppViewport or allowlisted.`);
	}

	if (legacyPaddingPattern.test(source)) {
		errors.push(`${rel}: legacy viewport padding must use app, flow, document or fullscreen.`);
	}

	if (/\b(?:fade|contentFade)="(?:top|bottom|both)"/.test(source) && !allowedForcedFade.has(rel)) {
		errors.push(`${rel}: forced fade must use automatic overflow affordance or be allowlisted.`);
	}
}

if (errors.length > 0) {
	console.error('Page structure check failed:');
	for (const error of errors) {
		console.error(`- ${error}`);
	}
	process.exit(1);
}

console.log('Page structure check passed.');
