import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import flat from 'eslint/use-at-your-own-risk'
import { describe, expect, it } from 'vitest'

import configBase from '../configs/index.js'
import configNode from '../configs/node.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const CONFIG_MAP = {
	base: {
		config: configBase,
		errors: ['prefer-let/prefer-let'],
	},
	node: {
		config: configNode,
		errors: ['n/no-deprecated-api'],
	},
}

function hasRule(errors, ruleId) {
	return errors.some((error) => error.ruleId === ruleId)
}

async function runEslint(string, config) {
	let { FlatESLint } = flat
	let eslint = new FlatESLint({
		overrideConfig: [
			...config,
			{
				rules: {
					'import/no-unresolved': 'off',
					'unicorn/expiring-todo-comments': 'off',
				},
			},
		],
	})

	let [firstResult] = await eslint.lintText(string, {
		filePath: 'test-file.js',
	})

	return firstResult.messages
}

describe.each(['base', 'node'])('%s config', (config) => {
	it('reports expected errors', async () => {
		let code = await readFile(
			path.resolve(__dirname, `./${config}-errors.js`),
			'utf8',
		)
		let errors = await runEslint(code, [
			...CONFIG_MAP.base.config,
			...(config === 'base' ? [] : CONFIG_MAP[config].config),
		])

		for (let rule of CONFIG_MAP[config].errors)
			expect(hasRule(errors, rule), JSON.stringify(errors)).toBeTruthy()

		//
		// expect(
		// 	hasRule(errors, 'prefer-let/prefer-let'),
		// 	JSON.stringify(errors),
		// ).toBeTruthy()
	})
})

// Test.skip('node', async (t) => {
// 	let config = require('../configs/node.js')

// 	t.true(isPlainObj(config))
// 	t.true(isPlainObj(config.rules))

// 	let errors = await runEslint(
// 		"import path from 'path'\nimport foo from './utils/foo'\n",
// 		{
// 			parserOptions: { sourceType: 'module', ecmaVersion: 2020 },
// 			...config,
// 		},
// 	)
// 	/** @todo Figure out why this rule isn't being caught in tests. */
// 	t.false(
// 		hasRule(errors, 'n/file-extension-in-import'),
// 		JSON.stringify(errors),
// 	)
// })
