/** @type {import('stylelint').Config} */
export default {
	/**
	 * @see https://github.com/stylelint-stylistic/stylelint-stylistic
	 * @see https://github.com/hudochenkov/stylelint-order
	 */
	plugins: ['@stylistic/stylelint-plugin', 'stylelint-order'],

	/**
	 * @see https://github.com/stormwarning/stylelint-config-recess-order
	 */
	extends: ['stylelint-config-recess-order'],

	rules: {
		/**
		 * @see https://stylelint.io/user-guide/rules/alpha-value-notation
		 */
		'alpha-value-notation': 'percentage',

		/**
		 * Keep at-rules consistently spaced-out for better legibility.
		 * @see https://stylelint.io/user-guide/rules/at-rule-empty-line-before
		 */
		'at-rule-empty-line-before': [
			'always',
			{
				except: ['blockless-after-same-name-blockless', 'first-nested'],
				ignore: ['after-comment'],
			},
		],

		/**
		 * Use modern color function syntax.
		 * @see https://stylelint.io/user-guide/rules/color-function-notation
		 */
		'color-function-notation': 'modern',

		/**
		 * Use short hex values where possible.
		 * @see https://stylelint.io/user-guide/rules/color-hex-length
		 */
		'color-hex-length': 'short',

		/**
		 * Ensure names in font-family lists are quoted consistently.
		 * @see https://stylelint.io/user-guide/rules/font-family-name-quotes
		 */
		'font-family-name-quotes': 'always-where-recommended',

		/**
		 * Will probably be migrated to @stylistic at some point.
		 * @see https://stylelint.io/user-guide/rules/function-name-case
		 */
		'function-name-case': 'lower',

		/**
		 * Ensure URLs are quoted consistently.
		 * @see https://stylelint.io/user-guide/rules/function-url-quotes
		 */
		'function-url-quotes': 'always',

		/**
		 * @see https://stylelint.io/user-guide/rules/hue-degree-notation
		 */
		'hue-degree-notation': 'angle',

		/**
		 * Avoid redundant units on zero values.
		 * @see https://stylelint.io/user-guide/rules/length-zero-no-unit
		 */
		'length-zero-no-unit': [true, { ignore: ['custom-properties'] }],

		/**
		 * @see https://stylelint.io/user-guide/rules/lightness-notation
		 */
		'lightness-notation': 'percentage',

		/**
		 * Keep style rules consistently spaced-out for better legibility.
		 * @see https://stylelint.io/user-guide/rules/rule-empty-line-before
		 */
		'rule-empty-line-before': [
			'always',
			{
				except: ['after-single-line-comment', 'first-nested'],
				ignore: ['after-comment'],
			},
		],

		/**
		 * Ensure attribute selectors are quoted consistently.
		 * @see https://stylelint.io/user-guide/rules/selector-attribute-quotes
		 */
		'selector-attribute-quotes': 'always',

		/**
		 * Enforce accurate pseudo-element syntax.
		 * @see https://stylelint.io/user-guide/rules/selector-pseudo-element-colon-notation
		 */
		'selector-pseudo-element-colon-notation': 'double',

		/**
		 * Will probably be migrated to @stylistic at some point.
		 * @see https://stylelint.io/user-guide/rules/selector-type-case
		 */
		'selector-type-case': 'lower',

		/**
		 * Will probably be migrated to @stylistic at some point.
		 * @see https://stylelint.io/user-guide/rules/value-keyword-case
		 */
		'value-keyword-case': 'lower',

		/**
		 * Recommended in `@stylistic/stylelint-config`.
		 * @see https://github.com/stylelint-stylistic/stylelint-config/blob/main/.stylelintrc.json
		 */
		'@stylistic/at-rule-name-case': 'lower',
		'@stylistic/color-hex-case': 'lower',
		'@stylistic/media-feature-name-case': 'lower',
		'@stylistic/no-extra-semicolons': true,
		'@stylistic/number-leading-zero': 'always',
		'@stylistic/number-no-trailing-zeros': true,
		'@stylistic/property-case': 'lower',
		'@stylistic/selector-pseudo-class-case': 'lower',
		'@stylistic/selector-pseudo-element-case': 'lower',
		'@stylistic/unit-case': 'lower',

		/**
		 * Maintain a consistent order of the contents of declaration blocks.
		 * @see https://github.com/hudochenkov/stylelint-order/blob/master/rules/order/README.md
		 */
		'order/order': [
			'dollar-variables',
			'custom-properties',
			{
				type: 'at-rule',
				name: 'extend',
			},
			{
				type: 'at-rule',
				name: 'include',
				hasBlock: false,
			},
			'declarations',
			'rules',
			{
				type: 'rule',
				selector: /^&:[\w-]+$/,
			},
			{
				type: 'rule',
				selector: /^&::[\w-]+$/,
			},
			{
				type: 'at-rule',
				hasBlock: true,
			},
		],

		/**
		 * Ensure other property order settings don't conflict with the
		 * `recess-order` config.  Turning this rule off explicitly in case it
		 * is enabled in an extended config.
		 * @see https://github.com/hudochenkov/stylelint-order/blob/master/rules/properties-alphabetical-order/README.md
		 */
		'order/properties-alphabetical-order': null,
	},
}
