import pluginStylistic from '@stylistic/eslint-plugin'
import configPrettier from 'eslint-config-prettier'
import pluginDecoratorPosition from 'eslint-plugin-decorator-position'

/** @type {import('eslint').Linter.Config} */
const config = {
	name: 'zazen:rules:stylistic',
	plugins: {
		'@stylistic': pluginStylistic,
		'decorator-position': pluginDecoratorPosition,
	},
	rules: {
		/**
		 * Put decorators above what they decorate.
		 * @see https://github.com/NullVoxPopuli/eslint-plugin-decorator-position/blob/main/docs/rules/decorator-position.md
		 */
		'decorator-position/decorator-position': [
			'error',
			{
				properties: 'above',
				methods: 'above',
			},
		],

		...configPrettier.rules,
	},
}

export default config
