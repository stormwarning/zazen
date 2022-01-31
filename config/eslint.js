import { createRequire } from 'module'

import outdent from 'outdent'

import { context } from '../context/index.js'

const require = createRequire(import.meta.url)
const coreConfig = require.resolve('@zazen/eslint-config', import.meta.url)
const { eslintDecorator } = context

export function buildEslintConfig() {
	let baseConfig = `extends: ['${coreConfig}'],`

	return outdent`
		module.exports = {
			${eslintDecorator(baseConfig)}
		}`
}
