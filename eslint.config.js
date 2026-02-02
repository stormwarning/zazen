import zazen from '@zazen/eslint-config'
import zazenNode from '@zazen/eslint-config/node'
import zazenStylistic from '@zazen/eslint-config/stylistic'
import { defineConfig } from 'eslint/config'

const config = defineConfig([
	{
		name: 'project:ignores',
		ignores: ['**/dist', '**/__tests__/*-errors.js'],
	},

	...zazen,
	...zazenNode,

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
		name: 'project/rules/stylelint',
		files: ['packages/stylelint-config/**/*.js'],
		rules: {
			/**
			 * Stylelint rules use `null` to explicitly disable.
			 */
			'unicorn/no-null': 'off',
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

	zazenStylistic,
])

export default config
