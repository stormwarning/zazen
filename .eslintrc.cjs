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

		'import/no-anonymous-default-export': ['error', { allowObject: true }],
	},
	overrides: [
		{ files: ['*.cjs'], env: { node: true } },

		{
			files: '**/__tests__/**/*.js',
			rules: {
				'import/no-extraneous-dependencies': 'off',
			},
		},

		{
			files: '**/*.config.js',
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

		{
			files: '**/*.ts',
			extends: ['@zazen/eslint-config/typescript'],
			parserOptions: {
				project: './jsconfig.json',
			},
			rules: {
				'@typescript-eslint/ban-types': 'off',
				'@typescript-eslint/lines-between-class-members': 'off',
				'@typescript-eslint/padding-line-between-statements': 'off',

				'import/extensions': ['off'],
			},
		},
	],
}

module.exports = config
