import pluginEtc from 'eslint-plugin-etc'
import tsEslint from 'typescript-eslint'

import { TS_FILES_GLOB } from '../utils/constants.js'

/**
 * This config also draws inspiration from xo-typescript, although rules are
 * added manually, in order to configure type-aware rules separately.
 *
 * @see https://github.com/xojs/eslint-config-xo-typescript
 * @see https://github.com/cartant/eslint-plugin-etc
 */

/** @type {import('eslint').Linter.Config} */
export const rulesTs = {
	name: 'zazen:rules:typescript',
	plugins: { etc: pluginEtc },
	rules: {
		/**
		 * Just get the typescript-eslint rules from the recommended config;
		 * ignore the setup and base eslint rules.
		 */
		...tsEslint.configs.recommended.find(
			({ name }) => name === 'typescript-eslint/recommended',
		)?.rules,

		/**
		 * Use a consistent format for array types: shorthand for simple cases,
		 * `Array<...>` for better readability otherwise.  Readonly arrays
		 * always use the generic form.
		 *
		 * @see https://typescript-eslint.io/rules/array-type
		 */
		'@typescript-eslint/array-type': [
			'error',
			{ default: 'array-simple', readonly: 'generic' },
		],

		/**
		 * @see https://typescript-eslint.io/rules/ban-ts-comment
		 */
		'@typescript-eslint/ban-ts-comment': [
			'error',
			{
				'ts-expect-error': 'allow-with-description',
				minimumDescriptionLength: 6,
			},
		],

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
		 * Used in conjunction with `consistent-type-imports` and
		 * `import/no-duplicates` for TypeScript import style.
		 *
		 * @see https://typescript-eslint.io/rules/no-import-type-side-effects
		 */
		'@typescript-eslint/no-import-type-side-effects': 'error',

		/**
		 * Allow functions to be defined after use.  This allows small utility
		 * functions to be within the file they are used, but keeping the more
		 * "important" code at the top.
		 *
		 * @see https://typescript-eslint.io/rules/no-use-before-define/
		 * @see https://eslint.org/docs/latest/rules/no-use-before-define
		 */
		'no-use-before-define': 'off',
		'@typescript-eslint/no-use-before-define': [
			'error',
			{
				functions: false,
				classes: true,
				variables: true,
				allowNamedExports: false,
				enums: true,
				typedefs: true,
				ignoreTypeReferences: true,
			},
		],

		/**
		 * Organise comparisons left-to-right from lower to higher.
		 * @see https://github.com/cartant/eslint-plugin-etc/blob/main/docs/rules/prefer-less-than.md
		 */
		'etc/prefer-less-than': 'error',

		/**
		 * Disabled in `eslint-plugin-import` `typescript` config.
		 * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/named.md
		 */
		'import-x/named': 'off',

		/**
		 * Enforce consistent ordering for interfaces and type objects.
		 * Required members will be grouped before optional ones.  These rules
		 * are an autofixable alternative to the `member-ordering` rule from
		 * typescript-eslint.
		 *
		 * @see https://perfectionist.dev/rules/sort-interfaces
		 * @see https://perfectionist.dev/rules/sort-object-types
		 */
		'perfectionist/sort-interfaces': [
			'warn',
			{ ignoreCase: false, groupKind: 'required-first', type: 'natural' },
		],
		'perfectionist/sort-object-types': [
			'warn',
			{ ignoreCase: false, groupKind: 'required-first', type: 'natural' },
		],
	},
}

/** @type {import('eslint').Linter.Config} */
export const rulesDts = {
	name: 'zazen:rules:typescript:dts',
	files: ['**/*.d.ts'],
	rules: {
		'@typescript-eslint/no-unused-vars': 'off',
		'prefer-let/prefer-let': 'off',
	},
}

/** @type {tsEslint.ConfigWithExtends} */
const typeAware = {
	name: 'zazen:rules:typescript:type-aware',
	files: [TS_FILES_GLOB],
	extends: [
		tsEslint.configs.strictTypeCheckedOnly,
		tsEslint.configs.stylisticTypeCheckedOnly,
	],
	languageOptions: {
		parserOptions: {
			projectService: true,
		},
	},
	rules: {
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
				format: undefined,
				modifiers: ['requiresQuotes'],
			},
		],

		/**
		 * The #1 rule of promises is that every promise chain must be
		 * terminated by a `catch()` handler.  Thus wherever a Promise arises,
		 * the code must either append a catch handler, or else return the
		 * object to a caller (who assumes this responsibility).  Unterminated
		 * promise chains are a serious issue.  Besides causing errors to be
		 * silently ignored, they can also cause a NodeJS process to
		 * terminate unexpectedly.
		 *
		 * @see https://typescript-eslint.io/rules/no-floating-promises/
		 */
		'@typescript-eslint/no-floating-promises': [
			'error',
			{
				checkThenables: true,
				/**
				 * Prepend a function call with `void` to mark it as not
				 * needing to be awaited, which silences this rule.
				 */
				ignoreVoid: true,
				ignoreIIFE: true,
			},
		],

		/**
		 * TypeScript already catches unused variables.
		 * @see https://typescript-eslint.io/rules/no-unused-vars
		 */
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': 'off',

		/**
		 * Avoid assigning mutated arrays.
		 * @see https://github.com/cartant/eslint-plugin-etc/blob/main/docs/rules/no-assign-mutated-array.md
		 */
		'etc/no-assign-mutated-array': 'error',
	},
}

const config = tsEslint.config(typeAware)

export default config
