import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const blocked = [
	'https://owlth.monsan.dev.br',
	'https://examster.monsan.dev.br',
	'https://manki.monsan.dev.br',
	'https://directus.monsan.dev.br'
];

const roots = ['src/lib/server', 'src/routes', 'src/hooks.server.ts', 'svelte.config.js'];
const allowedFiles = new Set(['src/app.html']);

function collectFiles(target) {
	const stat = statSync(target);
	if (stat.isFile()) return [target];

	return readdirSync(target).flatMap((entry) => collectFiles(join(target, entry)));
}

const files = roots.flatMap((root) => {
	try {
		return collectFiles(root);
	} catch {
		return [];
	}
});
const violations = [];

for (const file of files) {
	const path = relative(process.cwd(), file);
	if (allowedFiles.has(path)) continue;

	const source = readFileSync(file, 'utf8');
	for (const domain of blocked) {
		if (source.includes(domain)) violations.push(`${path}: hardcoded production origin ${domain}`);
	}
}

if (violations.length) {
	console.error('Runtime environment hardening failed:');
	for (const violation of violations) console.error(`- ${violation}`);
	process.exit(1);
}

console.log('Runtime environment hardening passed.');
