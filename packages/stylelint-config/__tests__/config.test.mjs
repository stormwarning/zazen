import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { describe, it } from 'node:test'

import stylelint from 'stylelint'

import stylistic from '../conf/stylistic.js'
import config from '../index.js'

const VALID_CSS = readFileSync('./__tests__/valid.css', 'utf8')
const INVALID_CSS = readFileSync('./__tests__/invalid.css', 'utf8')
const RULE_WARNINGS = new Set([
	'color-function-notation',
	'alpha-value-notation',
	'number-max-precision',
	'no-descending-specificity',
	'rule-empty-line-before',
	'color-named',
	'plugin/use-logical-properties-and-values',
	'order/properties-order',
	'length-zero-no-unit',
	'order/order',
	'selector-type-no-unknown',
	'declaration-property-value-no-unknown',
])

describe('valid css', async () => {
	let result = await stylelint.lint({
		code: VALID_CSS,
		config,
	})

	it('has no errors', () => {
		assert.equal(result.errored, false)
	})

	it('flags no warnings', () => {
		assert.equal(result.results[0].warnings.length, 0)
	})
})

describe('invalid css', async () => {
	let result = await stylelint.lint({
		code: INVALID_CSS,
		config,
	})
	let rules = new Set(
		result.results[0].warnings.map((warning) => warning.rule),
	)

	it('includes errors', () => {
		assert.equal(result.errored, true)
	})

	it('flags correct warnings', () => {
		for (let rule of rules) {
			assert.ok(RULE_WARNINGS.has(rule))
		}
	})
})

describe('deprecated rules are excluded', () => {
	let ruleNames = [
		...Object.keys(config.rules),
		...Object.keys(stylistic.rules),
	]

	it('is not empty', () => {
		assert.ok(ruleNames.length > 0)
	})

	for (let ruleName of ruleNames) {
		it(`${ruleName}`, async () => {
			let rule = await stylelint.rules[ruleName]

			if (rule?.meta) assert.ok(!rule.meta.deprecated)
		})
	}
})
