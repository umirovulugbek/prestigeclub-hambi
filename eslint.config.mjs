import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tailwindPlugin from 'eslint-plugin-tailwindcss';
import unusedImports from 'eslint-plugin-unused-imports';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
	{
		ignores: ['**/.*', '**/node_modules', '**/dist/**', '**/*.config.js', '**/*.config.ts', '**/coverage', '**/*.d.ts'],
	},
	js.configs.recommended,
	// ...tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	{
		files: ['**/*.{jsx,ts,tsx}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parser: tseslint.parser,
			parserOptions: {
				project: ['./tsconfig.json'],
			},
			globals: globals.browser,
		},
		plugins: {
			js,
			'@typescript-eslint': tseslint.plugin,
			react: pluginReact,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			import: importPlugin,
			tailwindcss: tailwindPlugin,
			'unused-imports': unusedImports,
			prettier: prettier,
		},
		settings: {
			react: { version: 'detect' },
			'import/resolver': {
				typescript: true,
				node: true,
			},
			tailwindcss: {
				callees: ['clsx', 'classnames', 'tw'],
				config: 'tailwind.config.js',
			},
		},
		rules: {
			'prettier/prettier': 'off',

			'@typescript-eslint/no-explicit-any': 'off',

			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',

			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',

			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

			'no-console': ['error', { allow: ['warn', 'error'] }],

			'tailwindcss/classnames-order': 'off',
			'tailwindcss/enforces-shorthand': 'warn',
			'tailwindcss/migration-from-tailwind-2': 'warn',
			'tailwindcss/no-contradicting-classname': 'error',

			'import/order': [
				'error',
				{
					groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
					'newlines-between': 'always',
					alphabetize: { order: 'asc', caseInsensitive: true },
				},
			],
			'import/no-duplicates': 'error',

			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': [
				'warn',
				{
					vars: 'all',
					varsIgnorePattern: '^_',
					args: 'after-used',
					argsIgnorePattern: '^_',
				},
			],
			'@typescript-eslint/no-unused-vars': 'off',

			'padding-line-between-statements': ['error', { blankLine: 'always', prev: '*', next: 'return' }],
		},
	},
]);
