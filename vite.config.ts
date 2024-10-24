import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import envCompatible from 'vite-plugin-env-compatible'; // Import plugin

export default defineConfig({
	plugins: [
		sveltekit(),
		envCompatible() // Tambahkan plugin ke dalam array plugins
	]
});
