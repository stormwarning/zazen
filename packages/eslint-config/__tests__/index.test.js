import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { ESLint } from 'eslint'
import { describe, expect, it } from 'vitest'

import configBase from '../configs/index.js'
import configNode from '../configs/node.js'
import configTypeScript from '../configs/typescript.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const CONFIG_MAP = {
	base: {
		config: configBase,
		errors: ['prefer-let/prefer-let', 'unicorn/prefer-ternary'],
	},
	node: {
		config: [...configBase, ...configNode],
		errors: [
			'n/no-deprecated-api',
			'import-x/extensions',
			'unicorn/prefer-node-protocol',
		],
	},
	typescript: {
		config: [...configBase, ...configTypeScript],
		errors: ['@typescript-eslint/naming-convention'],
	},
}

/**
 * @param {import('eslint').Linter.LintMessage[]} errors
 * @param {string} ruleId
 */
function hasRule(errors, ruleId) {
	return errors.some((error) => error.ruleId === ruleId)
}

/**
 * @param {string} name
 * @param {import('eslint').Linter.Config} config
 * @returns
 */
async function runEslint(name, config) {
	let linter = new ESLint({
		overrideConfigFile: true,
		overrideConfig: config,
	})
	let [firstResult] = await linter.lintFiles(
		path.resolve(
			__dirname,
			`./${name}-errors.${name === 'typescript' ? 'ts' : 'js'}`,
		),
	)

	return firstResult.messages
}

describe.each(['base', 'node', 'typescript'])('%s config', (name) => {
	it('reports expected errors', async () => {
		let errors = await runEslint(name, CONFIG_MAP[name].config)

		for (let rule of CONFIG_MAP[name].errors) {
			expect(hasRule(errors, rule), JSON.stringify(errors)).toBeTruthy()
		}
	})
})
