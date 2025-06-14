import { compat } from '../utils/compat.js'
import prettier from 'eslint-config-prettier'
import importSorting from 'eslint-plugin-import-sorting'
import preferLet from 'eslint-plugin-prefer-let'
import unicorn from 'eslint-plugin-unicorn'

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
		'import-x/parsers': {
			espree: ['.js', '.cjs', '.mjs', '.jsx'],
		},

		'import-sorting/known-first-party': /^~/.source,
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
	/** @see https://github.com/sindresorhus/eslint-plugin-unicorn */
	unicorn.configs['flat/recommended'],

	/**
	 * @see https://github.com/xojs/eslint-config-xo
	 * @todo
	 */
	...compat.extends('xo'),
	/** @see https://github.com/import-js/eslint-plugin-import */
	...compat.extends('plugin:import-x/recommended'),
	/** @see https://github.com/xjamundx/eslint-plugin-promise */
	...compat.extends('plugin:promise/recommended'),

	rules,

	/** @see https://github.com/prettier/eslint-config-prettier */
	prettier,
]

export default config
