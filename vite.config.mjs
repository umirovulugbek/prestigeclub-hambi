import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
// import path from 'path';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react()],
	// resolve: {
	// 	alias: {
	// 		'@': path.resolve(__dirname, './src'),
	// 	},
	// },
	css: {
		postcss: {
			plugins: [tailwindcss(), autoprefixer()],
		},
	},
	define: {
		'process.env': {},
		global: 'window',
	},
});
