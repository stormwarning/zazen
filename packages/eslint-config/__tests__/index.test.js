import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import configBase from '../configs/index.js'
import configNode from '../configs/node.js'
import { ESLint } from 'eslint'
import { describe, expect, it } from 'vitest'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const CONFIG_MAP = {
	base: {
		config: configBase,
		errors: ['prefer-let/prefer-let', 'unicorn/prefer-ternary'],
	},
	node: {
		config: configNode,
		errors: ['n/no-deprecated-api', 'import-x/extensions'],
	},
}

function hasRule(errors, ruleId) {
	return errors.some((error) => error.ruleId === ruleId)
}

async function runEslint(string, config) {
	let linter = new ESLint({
		overrideConfig: config,
	})

	let [firstResult] = await linter.lintText(string, {
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
		let errors = await runEslint(code, CONFIG_MAP[config].config)

		for (let rule of CONFIG_MAP[config].errors) {
			expect(hasRule(errors, rule), JSON.stringify(errors)).toBeTruthy()
		}
	})
})
