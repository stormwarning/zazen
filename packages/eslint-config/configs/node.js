import pluginN from 'eslint-plugin-n'
import globals from 'globals'

/** @type {import('eslint').Linter.Config[]} */
const config = [
	{
		name: 'zazen:node',
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
		/**
		 * @see https://github.com/eslint-community/eslint-plugin-n
		 */
		plugins: { n: pluginN },
		rules: {
			/**
			 * This is enabled in addition to `import/extensions` as this one
			 * has an auto-fix.
			 *
			 * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/file-extension-in-import.md
			 */
			'n/file-extension-in-import': ['error', 'always'],

			'n/no-deprecated-api': 'error',
			'n/no-missing-import': 'off',
			'n/no-mixed-requires': [
				'error',
				{ grouping: true, allowCall: true },
			],
			'n/no-new-require': 'error',
			'n/no-path-concat': 'error',
			'n/no-unpublished-bin': 'error',
			'n/no-unpublished-import': 'off',
			'n/no-unpublished-require': 'off',
			'n/prefer-global/buffer': ['error', 'never'],
			'n/prefer-global/console': ['error', 'always'],
			'n/prefer-global/process': ['error', 'never'],
			'n/prefer-global/text-decoder': ['error', 'always'],
			'n/prefer-global/text-encoder': ['error', 'always'],
			'n/prefer-global/url-search-params': ['error', 'always'],
			'n/prefer-global/url': ['error', 'always'],
			'n/prefer-promises/dns': 'error',
			'n/prefer-promises/fs': 'error',
			'n/process-exit-as-throw': 'error',
		},
	},
]

export default config
