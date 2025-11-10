import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/server.ts'],
	format: ['esm'],
	platform: 'node',
	target: 'esnext',
	external: ['uWebSockets.js'],
	dts: true,
	clean: true,
	minify: true,
	treeshake: true,
	splitting: true,
	sourcemap: true
});
