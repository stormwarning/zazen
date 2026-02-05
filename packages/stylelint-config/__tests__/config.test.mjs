import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { describe, it } from 'node:test'

import stylelint from 'stylelint'

import config from '../index.js'

const VALID_CSS = readFileSync('./__tests__/valid.css', 'utf8')
const INVALID_CSS = readFileSync('./__tests__/invalid.css', 'utf8')
const RULE_WARNINGS = new Set([
	'plugin/use-logical-properties-and-values',
	'plugin/use-logical-units',
	'order/order',
	'order/properties-order',
	'color-named',
	'declaration-property-value-no-unknown',
	'function-url-no-scheme-relative',
	'no-descending-specificity',
	'selector-type-no-unknown',

	// Included in stylelint-config-standard.
	'alpha-value-notation',
	'color-function-alias-notation',
	'color-function-notation',
	'custom-property-empty-line-before',
	'declaration-empty-line-before',
	'function-name-case', //
	'length-zero-no-unit',
	'number-max-precision',
	'rule-empty-line-before',
	'selector-type-case',
	'value-keyword-case',
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
			assert.ok(RULE_WARNINGS.has(rule), `Unexpected '${rule}' warning.`)
		}

		for (let warning of RULE_WARNINGS) {
			assert.ok(rules.has(warning), `Missing '${warning}' warning.`)
		}
	})
})

describe('deprecated rules are excluded', () => {
	let ruleNames = Object.keys(config.rules ?? {})

	it('is not empty', () => {
		// eslint-disable-next-line etc/prefer-less-than
		assert.ok(ruleNames.length > 0)
	})

	for (let ruleName of ruleNames) {
		it(`${ruleName}`, async () => {
			let rule = await stylelint.rules[ruleName]

			if (rule?.meta) assert.ok(!rule.meta.deprecated)
		})
	}
})
