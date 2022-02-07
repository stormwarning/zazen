import { outdent } from 'outdent'

import context from '../context.js'

const { eslintDecorator } = context

export function buildEslintConfig() {
	let baseConfig = { extends: ['@zazen/eslint-config'] }

	return outdent`
		module.exports = ${JSON.stringify(eslintDecorator(baseConfig), null, 2)}\n
	`
}
