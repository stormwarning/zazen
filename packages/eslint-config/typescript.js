/**
 * @see https://github.com/eslint/eslint/issues/3458
 * @see https://www.npmjs.com/package/@rushstack/eslint-patch
 */
require('@rushstack/eslint-patch/modern-module-resolution')

/** @type {import('eslint').Linter.Config} */
const config = {
	/**
	 * @see https://github.com/xojs/eslint-config-xo-typescript
	 * @see https://github.com/cartant/eslint-plugin-etc
	 */
	extends: ['xo-typescript', 'plugin:etc/recommended', 'prettier'],
	rules: {
		/**
		 * Used in conjunction with `no-import-type-side-effects` and
		 * `import/no-duplicates` for TypeScript import style.
		 *
		 * @see https://typescript-eslint.io/rules/consistent-type-imports
		 */
		'@typescript-eslint/consistent-type-imports': [
			'error',
			{ prefer: 'type-imports' },
		],

		/**
		 * Used in conjunction with `consistent-type-imports` and
		 * `import/no-duplicates` for TypeScript import style.
		 *
		 * @see https://typescript-eslint.io/rules/no-import-type-side-effects
		 */
		'@typescript-eslint/no-import-type-side-effects': 'error',

		/**
		 * Disabled in `eslint-plugin-import` `typescript` config.
		 * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/named.md
		 */
		'import/named': 'off',

		/**
		 * Organise comparisons left-to-right from lower to higher.
		 * @see https://github.com/cartant/eslint-plugin-etc/blob/main/docs/rules/prefer-less-than.md
		 */
		'etc/prefer-less-than': 'error',
	},
}

module.exports = config
