import prettier from 'eslint-config-prettier'
import importSorting from 'eslint-plugin-import-sorting'
import preferLet from 'eslint-plugin-prefer-let'
import unicorn from 'eslint-plugin-unicorn'

import { compat } from '../utils/compat.js'

/** @type {import('eslint').Linter.Config} */
const rules = {
	name: 'zazen:base',
	languageOptions: {
		ecmaVersion: 2021,
		sourceType: 'module',
		parserOptions: {
			ecmaVersion: 'latest',
		},
	},
	linterOptions: {
		reportUnusedDisableDirectives: true,
	},
	plugins: { 'import-sorting': importSorting, 'prefer-let': preferLet },
	settings: {
		/**
		 * Fix error with `parserPath` not available in eslint-plugin-import.
		 * @see https://github.com/import-js/eslint-plugin-import/issues/2556
		 */
		'import/parsers': {
			espree: ['.js', '.cjs', '.mjs', '.jsx'],
		},

		/** Fix undefined settings throwing error. */
		'import-sorting/known-framework': '',
		'import-sorting/known-first-party': '',
	},
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

		'import/default': 'error',
		'import/export': 'error',
		'import/extensions': ['error', 'always', { ignorePackages: true }],
		'import/first': 'error',
		'import/named': 'error',
		'import/namespace': ['error', { allowComputed: true }],
		'import/newline-after-import': 'error',
		'import/no-absolute-path': 'error',
		'import/no-amd': 'error',
		'import/no-anonymous-default-export': 'error',
		'import/no-cycle': ['error', { ignoreExternal: true }],

		/**
		 * Used in conjunction with `no-import-type-side-effects` and
		 * `consistent-type-imports` for TypeScript import style.
		 *
		 * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-duplicates.md
		 */
		'import/no-duplicates': ['error', { 'prefer-inline': true }],

		/**
		 * Forbid empty named import blocks.  Might be redundant with
		 * other rules, but enabled just in case.
		 *
		 * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-empty-named-blocks.md
		 */
		'import/no-empty-named-blocks': 'error',

		/**
		 * Allow importing devDependencies within test files.
		 * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-extraneous-dependencies.md
		 */
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: [
					'**/__tests__/**/*.{mjs,js,ts,tsx}',
					'**/tests/**/*.{mjs,js,ts,tsx}',
					'**/*.@(spec|test).{mjs,js,ts,tsx}',
				],
			},
		],

		'import/no-mutable-exports': 'error',
		'import/no-named-as-default-member': 'error',
		'import/no-named-as-default': 'error',
		'import/no-named-default': 'error',
		'import/no-self-import': 'error',

		/**
		 * Buggy, and doesn't work with TypeScript.
		 * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unresolved.md
		 */
		'import/no-unresolved': 'off',

		'import/no-useless-path-segments': 'error',
		'import/no-webpack-loader-syntax': 'error',

		/**
		 * @see https://github.com/stormwarning/eslint-plugin-import-sorting
		 */
		'import/order': 'off',
		'import-sorting/order': 'error',
		'import-sorting/specifier-order': 'error',
	},
}

/** @type {import('eslint').Linter.Config[]} */
const config = [
	/** @see https://github.com/sindresorhus/eslint-plugin-unicorn */
	unicorn.configs['flat/recommended'],

        /**
         * @see https://github.com/xojs/eslint-config-xo
         * @todo
         */
        ...compat.extends('xo'),
        /** @see https://github.com/import-js/eslint-plugin-import */
        ...compat.extends('plugin:import/recommended'),
        /** @see https://github.com/xjamundx/eslint-plugin-promise */
        ...compat.extends('plugin:promise/recommended'),

	rules,

	/** @see https://github.com/prettier/eslint-config-prettier */
	prettier,
]

export default config
