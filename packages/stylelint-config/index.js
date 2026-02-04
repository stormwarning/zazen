/** @type {import('stylelint').Config} */
export default {
	ignoreFiles: ['node_modules', '**/dist/**/*.css'],

	/**
	 * @see https://github.com/stylelint-stylistic/stylelint-stylistic
	 * @see https://github.com/hudochenkov/stylelint-order
	 * @see https://github.com/RJWadley/stylelint-no-unsupported-browser-features
	 * @see https://github.com/yuschick/stylelint-plugin-logical-css
	 */
	plugins: [
		'@stylistic/stylelint-plugin',
		'stylelint-no-unsupported-browser-features',
		'stylelint-order',
		'stylelint-plugin-logical-css',
	],

	/**
	 * @see https://github.com/stylelint/stylelint-config-standard
	 * @see https://github.com/stormwarning/stylelint-config-recess-order
	 */
	extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],

	rules: {
		/**
		 * Ensure `font-display` and `font-style` are included in @font-face
		 * definitions.
		 * @see https://stylelint.io/user-guide/rules/at-rule-property-required-list
		 */
		'at-rule-property-required-list': {
			'font-face': ['font-display', 'font-family', 'font-style'],
		},

		/**
		 * Avoid use of named colours.
		 * @see https://stylelint.io/user-guide/rules/color-named
		 */
		'color-named': 'never',

		/**
		 * Ensure a concise list of properties.
		 * @see https://stylelint.io/user-guide/rules/declaration-block-no-redundant-longhand-properties
		 */
		'declaration-block-no-redundant-longhand-properties': [
			true,
			{ ignoreShorthands: ['grid-template'] },
		],

		/**
		 * Avoid use of `!important`.
		 * @see https://stylelint.io/user-guide/rules/declaration-no-important
		 */
		'declaration-no-important': true,

		/**
		 * Avoid incorrect property value types.
		 * @see https://stylelint.io/user-guide/rules/declaration-property-value-no-unknown
		 */
		'declaration-property-value-no-unknown': true,

		/**
		 * @see https://stylelint.io/user-guide/rules/function-url-no-scheme-relative
		 */
		'function-url-no-scheme-relative': true,

		/**
		 * Avoid nesting too deeply as it can be harder to follow and lead to
		 * specificity issues.
		 * @see https://stylelint.io/user-guide/rules/max-nesting-depth
		 */
		'max-nesting-depth': [
			3,
			{ ignore: ['blockless-at-rules', 'pseudo-classes'] },
		],

		/**
		 * Source order matters in CSS.  Keep stylesheets legible by having
		 * higher-specificity selectors follow lower.
		 * @see https://stylelint.io/user-guide/rules/no-descending-specificity
		 */
		'no-descending-specificity': [
			true,
			{ ignore: ['selectors-within-list'] },
		],

		/**
		 * Maintain a sensible level of selector complexity.
		 * @see https://stylelint.io/user-guide/rules/selector-max-attribute
		 * @see https://stylelint.io/user-guide/rules/selector-max-class
		 * @see https://stylelint.io/user-guide/rules/selector-max-compound-selectors
		 * @see https://stylelint.io/user-guide/rules/selector-max-universal
		 */
		'selector-max-attribute': 8,
		'selector-max-class': 8,
		'selector-max-compound-selectors': 8,
		'selector-max-universal': 1,

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
				selector: /^&::[\w-]+$/,
			},
			{
				type: 'rule',
				selector: /^&:[\w-]+$/,
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

		/**
		 * Encourage the use of logical properties and values.
		 * @see https://github.com/yuschick/stylelint-plugin-logical-css
		 */
		'plugin/use-logical-properties-and-values': [
			true,
			{ severity: 'warning' },
		],
		'plugin/use-logical-units': [true, { severity: 'warning' }],
	},
}
