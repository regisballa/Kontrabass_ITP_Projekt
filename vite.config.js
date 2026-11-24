import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			// adapter-static macht aus der Seite normale Dateien (Ordner "build") für GitHub Pages
			adapter: adapter(),
			// Auf GitHub Pages liegt die Seite in einem Unterordner (/name-vom-repository).
			// Den Namen setzt die GitHub Action beim Bauen. Am eigenen Computer bleibt es leer.
			paths: { base: process.env.BASE_PATH ?? '' }
		})
	],
	build: { chunkSizeWarningLimit: 1500 }
});