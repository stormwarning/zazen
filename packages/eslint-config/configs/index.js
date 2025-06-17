import pluginTypeScript from '@typescript-eslint/eslint-plugin'
import parserTypeScript from '@typescript-eslint/parser'
import configPrettier from 'eslint-config-prettier'
import configXo from 'eslint-config-xo'
// @ts-expect-error -- Something misconfigured in the exported types on this.
import pluginImportSorting from 'eslint-plugin-import-sorting'
import pluginImport from 'eslint-plugin-import-x'
import pluginPreferLet from 'eslint-plugin-prefer-let'
import pluginPromise from 'eslint-plugin-promise'
import pluginUnicorn from 'eslint-plugin-unicorn'
import globals from 'globals'

import {
	ALL_EXTENSIONS,
	JS_EXTENSIONS,
	JSX_FILES_GLOB,
	TS_EXTENSIONS,
	TSX_FILES_GLOB,
} from '../utils/constants.js'
import { rulesDts, rulesTs } from './typescript.js'

/** @type {import('eslint').Linter.Config} */
const setup = {
	name: 'zazen:setup',
	languageOptions: {
		ecmaVersion: 2022,
		globals: {
			...globals.es2022,
		},
		sourceType: 'module',
		parser: parserTypeScript,
		parserOptions: {
			ecmaVersion: 'latest',
		},
	},
	linterOptions: {
		reportUnusedDisableDirectives: true,
	},
	plugins: {
		'@typescript-eslint': pluginTypeScript,
		'import-sorting': pluginImportSorting,
		'import-x': pluginImport,
		'prefer-let': pluginPreferLet,
		promise: pluginPromise,
		// Unicorn: pluginUnicorn,
	},
	settings: {
		'import-x/extensions': ALL_EXTENSIONS,
		/**
		 * Fix error with `parserPath` not available in eslint-plugin-import.
		 * @see https://github.com/import-js/eslint-plugin-import/issues/2556
		 */
		'import-x/parsers': {
			espree: JS_EXTENSIONS,
			'@typescript-eslint/parser': TS_EXTENSIONS,
		},
		'import-x/external-module-folders': [
			'node_modules',
			'node_modules/@types',
		],
		'import-x/resolver': {
			node: ALL_EXTENSIONS,
		},

		'import-sorting/internal-patterns': /^~/.source,
	},
}

/** @type {import('eslint').Linter.Config} */
const jsx = {
	name: 'zazen:setup:jsx',
	files: [JSX_FILES_GLOB, TSX_FILES_GLOB],
	languageOptions: {
		parserOptions: {
			ecmaFeatures: {
				jsx: true,
			},
		},
	},
}

/** @type {import('eslint').Linter.Config} */
const rules = {
	name: 'zazen:rules',
	rules: {
		'no-console': 'warn',

		/**
		 * @see https://github.com/thefrontside/javascript/tree/v3/packages/eslint-plugin-prefer-let
		 */
		'prefer-const': 'off',
		'prefer-let/prefer-let': 'error',

		'unicorn/consistent-destructuring': 'off',
		'unicorn/consistent-function-scoping': 'off',

		/**
		 * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/expiring-todo-comments.md
		 */
		'unicorn/expiring-todo-comments': ['warn', { terms: ['@todo'] }],

		'unicorn/no-null': 'off',
		'unicorn/no-useless-undefined': 'off',
		'unicorn/prefer-ternary': ['error', 'only-single-line'],

		/**
		 * Encourage more readable variable names using complete words.
		 * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prevent-abbreviations.md
		 * @see https://thenextweb.com/dd/2020/07/13/linux-kernel-will-no-longer-use-terms-blacklist-and-slave/
		 */
		'unicorn/prevent-abbreviations': [
			'error',
			{
				allowList: { args: true, lib: true },
				replacements: {
					whitelist: {
						include: true,
					},
					blacklist: {
						exclude: true,
					},
					master: {
						main: true,
					},
					slave: {
						secondary: true,
					},
				},
			},
		],

		/**
		 * Only require braces around the case body if scope is needed.
		 * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/switch-case-braces.md
		 */
		'unicorn/switch-case-braces': ['error', 'avoid'],

		'promise/param-names': 'error',
		'promise/no-return-wrap': ['error', { allowReject: true }],
		'promise/no-new-statics': 'error',
		'promise/no-return-in-finally': 'error',
		'promise/valid-params': 'error',
		'promise/prefer-await-to-then': 'error',

		'import-x/default': 'error',
		'import-x/export': 'error',
		'import-x/extensions': ['error', 'always', { ignorePackages: true }],
		'import-x/first': 'error',
		'import-x/named': 'error',
		'import-x/namespace': ['error', { allowComputed: true }],
		'import-x/newline-after-import': 'error',
		'import-x/no-absolute-path': 'error',
		'import-x/no-amd': 'error',
		'import-x/no-anonymous-default-export': 'error',
		'import-x/no-cycle': ['error', { ignoreExternal: true }],

		/**
		 * Used in conjunction with `no-import-type-side-effects` and
		 * `consistent-type-imports` for TypeScript import style.
		 *
		 * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-duplicates.md
		 */
		'import-x/no-duplicates': ['error', { 'prefer-inline': true }],

		/**
		 * Forbid empty named import blocks.  Might be redundant with
		 * other rules, but enabled just in case.
		 *
		 * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-empty-named-blocks.md
		 */
		'import-x/no-empty-named-blocks': 'error',

		/**
		 * Allow importing devDependencies within test files.
		 * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-extraneous-dependencies.md
		 */
		'import-x/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: [
					'**/__tests__/**/*.{mjs,js,ts,tsx}',
					'**/tests/**/*.{mjs,js,ts,tsx}',
					'**/*.@(spec|test).{mjs,js,ts,tsx}',
				],
			},
		],

		'import-x/no-mutable-exports': 'error',
		'import-x/no-named-as-default-member': 'error',
		'import-x/no-named-as-default': 'error',
		'import-x/no-named-default': 'error',
		'import-x/no-self-import': 'error',

		/**
		 * Buggy, and doesn't work with TypeScript.
		 * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-unresolved.md
		 */
		'import-x/no-unresolved': 'off',

		'import-x/no-useless-path-segments': 'error',
		'import-x/no-webpack-loader-syntax': 'error',

		/**
		 * @see https://github.com/stormwarning/eslint-plugin-import-sorting
		 */
		'import-x/order': 'off',
		'import-sorting/order': 'error',
		'import-sorting/specifier-order': 'error',
	},
}

/** @type {import('eslint').Linter.Config[]} */
const config = [
	setup,
	jsx,

	/** @see https://github.com/un-ts/eslint-plugin-import-x */
	pluginImport.flatConfigs.recommended,
	/** @see https://github.com/xjamundx/eslint-plugin-promise */
	pluginPromise.configs['flat/recommended'],
	/** @see https://github.com/sindresorhus/eslint-plugin-unicorn */
	pluginUnicorn.configs.recommended,
	/** @see https://github.com/xojs/eslint-config-xo */
	...configXo,

	rules,
	rulesTs,
	rulesDts,

	/** @see https://github.com/prettier/eslint-config-prettier */
	configPrettier,
]

export default config
