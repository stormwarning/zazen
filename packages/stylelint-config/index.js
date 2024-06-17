const KEBAB_CASE_REGEX = /([a-z][\da-z]*(-[\da-z]+)*)/

/** @type {import('stylelint').Config} */
export default {
	ignoreFiles: ['node_modules', '**/dist/**/*.css'],

	/**
	 * @see https://github.com/RJWadley/stylelint-no-unsupported-browser-features
	 * @see https://github.com/yuschick/stylelint-plugin-logical-css
	 */
	plugins: [
		'stylelint-no-unsupported-browser-features',
		'stylelint-plugin-logical-css',
	],

	/**
	 * @see https://github.com/stylelint/stylelint-config-recommended
	 */
	extends: ['stylelint-config-recommended', './conf/stylistic.js'],

	rules: {
		/**
		 * Avoid vendor prefixes in at-rules.  Autoprefixer should handle
		 * prefixing where necessary.
		 * @see https://stylelint.io/user-guide/rules/at-rule-no-vendor-prefix
		 */
		'at-rule-no-vendor-prefix': true,

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
		 * Use kebab-case for keyframe animation names.
		 * @see https://stylelint.io/user-guide/rules/keyframes-name-pattern
		 */
		'keyframes-name-pattern': [
			KEBAB_CASE_REGEX,
			{ message: (n) => `Expected animation "${n}" to be kebab-case` },
		],

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
		 * Avoid vendor prefixes in media queries.  Autoprefixer should handle
		 * prefixing where necessary.
		 * @see https://stylelint.io/user-guide/rules/media-feature-name-no-vendor-prefix
		 */
		'media-feature-name-no-vendor-prefix': true,

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
		 * Avoid using greater precision than browsers care about.
		 * @see https://stylelint.io/user-guide/rules/number-max-precision
		 */
		'number-max-precision': 4,

		/**
		 * Use kebab-case for class and id names.
		 * @see https://stylelint.io/user-guide/rules/selector-class-pattern
		 * @see https://stylelint.io/user-guide/rules/selector-id-pattern
		 */
		'selector-class-pattern': [
			KEBAB_CASE_REGEX,
			{ message: (s) => `Expected class "${s}" to be kebab-case.` },
		],
		'selector-id-pattern': [
			KEBAB_CASE_REGEX,
			{ message: (s) => `Expected id "${s}" to be kebab-case.` },
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
		 * Avoid vendor prefixes in selectors.  Autoprefixer should handle
		 * prefixing where necessary.
		 * @see https://stylelint.io/user-guide/rules/selector-no-vendor-prefix
		 */
		'selector-no-vendor-prefix': [
			true,
			{ ignoreSelectors: ['::-webkit-input-placeholder'] },
		],

		/**
		 * Avoid redundant values in shorthand properties.
		 * @see https://stylelint.io/user-guide/rules/shorthand-property-no-redundant-values
		 */
		'shorthand-property-no-redundant-values': true,

		/**
		 * @see https://stylelint.io/user-guide/rules/value-no-vendor-prefix
		 */
		'value-no-vendor-prefix': [
			true,
			{ ignoreValues: ['grab', 'grabbing'] },
		],

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
