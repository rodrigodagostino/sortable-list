import js from '@eslint/js';
import ts from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier/recommended';
import { configs as wc } from 'eslint-plugin-wc';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		files: ['**/*.{js,mjs,cjs,ts}'],
	},
	{
		languageOptions: {
			globals: globals.browser,
		},
	},
	js.configs.recommended,
	...ts.configs.recommended,
	wc['flat/best-practice'],
	prettier,
];
