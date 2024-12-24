import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import socketVitePlugin from './socketVitePlugin';

export default defineConfig({
	plugins: [sveltekit(), socketVitePlugin],
	build: {
		rollupOptions: {
			external: ['bun:sqlite']
		}
	}
});
