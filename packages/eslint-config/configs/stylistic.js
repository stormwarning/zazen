import configPrettier from 'eslint-config-prettier'

/** @type {import('eslint').Linter.Config} */
const config = {
	name: 'zazen:prettier',
	rules: {
		...configPrettier.rules,
	},
}

export default config
