import zazen from '@zazen/eslint-config'
import zazenNode from '@zazen/eslint-config/node'

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
	{ ignores: ['**/dist', '**/__tests__/*-errors.js'] },
	...zazen,
	...zazenNode,
	{
		name: 'project:base',
		settings: {
			'import/ignore': ['node_modules'],
			node: {
				version: '20',
			},
		},
		rules: {
			// Deprecated rule.
			'no-return-await': 'off',
			'import/no-anonymous-default-export': [
				'error',
				{ allowObject: true },
			],
		},
	},
	{
		name: 'project:tests',
		files: ['**/__tests__/**/*.?(m|c)js'],
		ignores: ['**/__tests__/*-errors.js'],
		rules: {
			'import/no-extraneous-dependencies': 'off',
		},
	},
	{
		name: 'project:configs',
		files: ['**/eslint.config.js'],
		rules: {
			'import/no-extraneous-dependencies': 'off',
		},
	},
]

export default config
