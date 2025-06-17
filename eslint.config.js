import zazen from '@zazen/eslint-config'
import zazenNode from '@zazen/eslint-config/node'

/** @type {import('eslint').Linter.Config[]} */
const config = [
	...zazen,
	...zazenNode,

	{
		name: 'project:ignores',
		ignores: ['**/dist', '**/__tests__/*-errors.js'],
	},
	{
		name: 'project:rules',
		settings: {
			'import-x/ignore': ['node_modules'],
			node: {
				version: '20',
			},
		},
		rules: {
			'import-x/no-anonymous-default-export': [
				'error',
				{ allowObject: true },
			],
		},
	},

	{
		name: 'project:rules:tests',
		files: ['**/__tests__/**/*.?(m|c)js'],
		ignores: ['**/__tests__/*-errors.js'],
		rules: {
			'import-x/no-extraneous-dependencies': 'off',
		},
	},
	{
		name: 'project:rules:configs',
		files: ['**/*.config.js'],
		rules: {
			'import-x/no-extraneous-dependencies': 'off',
		},
	},
]

export default config
