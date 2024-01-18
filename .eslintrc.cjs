/** @type {import('eslint').Linter.Config} */
const config = {
	root: true,
	env: {
		es6: true,
		node: true,
	},
	parserOptions: {
		ecmaVersion: 2021,
	},
	settings: {
		'import/ignore': ['node_modules'],
	},
	extends: ['@zazen', '@zazen/eslint-config/node'],
	rules: {
		'no-return-await': 'off',

		/**
		 * Allow `lib` as an abbreviation.
		 * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v41.0.1/docs/rules/prevent-abbreviations.md
		 */
		'unicorn/prevent-abbreviations': [
			'error',
			{ allowList: { lib: true } },
		],

		'import/order': [
			'error',
			{
				'newlines-between': 'always',
				alphabetize: { order: 'asc' },
				groups: [
					'builtin',
					'external',
					'internal',
					'parent',
					'sibling',
					'index',
				],
				pathGroups: [
					{
						pattern: '*.+(css)',
						group: 'index',
						position: 'after',
						patternOptions: { matchBase: true },
					},
				],
			},
		],
		'import/no-anonymous-default-export': ['error', { allowObject: true }],
	},
	overrides: [
		{
			files: '**/__tests__/**/*.js',
			rules: {
				'import/no-extraneous-dependencies': 'off',
			},
		},

		{
			files: 'packages/eslint-config/*.js',
			rules: {
				'unicorn/prefer-module': 'off',
			},
		},
	],
}

module.exports = config
