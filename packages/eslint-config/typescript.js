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
		 * Prefer `interface`, but `type` is allowed in some cases.
		 * @see https://typescript-eslint.io/rules/consistent-type-definitions
		 */
		'@typescript-eslint/consistent-type-definitions': [
			'error',
			'interface',
		],

		/**
		 * Used in conjunction with `no-import-type-side-effects` and
		 * `import/no-duplicates` for TypeScript import style.
		 *
		 * @see https://typescript-eslint.io/rules/consistent-type-imports
		 */
		'@typescript-eslint/consistent-type-imports': [
			'error',
			{ prefer: 'type-imports', fixStyle: 'inline-type-imports' },
		],

		/**
		 * Could potentially make this more strict in future.
		 * @see https://typescript-eslint.io/rules/naming-convention
		 */
		'@typescript-eslint/naming-convention': [
			'warn',
			{
				selector: ['variableLike', 'memberLike', 'property', 'method'],
				format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
				leadingUnderscore: 'allowSingleOrDouble',
			},
			{
				// Types should use PascalCase.
				selector: ['class', 'typeAlias', 'enum', 'typeParameter'],
				format: ['PascalCase'],
				leadingUnderscore: 'allow',
			},
			{
				// Enforce a semantic verb prefix on boolean variables.
				selector: 'variable',
				types: ['boolean'],
				format: ['StrictPascalCase'],
				prefix: ['is', 'has', 'can', 'should', 'will', 'did'],
			},
			{
				// Interface name should not be prefixed with `I`.
				selector: 'interface',
				filter: /^(?!I)[A-Z]/.source,
				format: ['StrictPascalCase'],
			},
			{
				// Type parameter name should either be `T` or a descriptive name.
				selector: 'typeParameter',
				filter: /^T$|^[A-Z][A-Za-z]+$/.source,
				format: ['StrictPascalCase'],
			},
			{
				// Allow any format when quoted.
				selector: ['classProperty', 'objectLiteralProperty'],
				format: null,
				modifiers: ['requiresQuotes'],
			},
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
