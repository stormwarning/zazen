import prettier from 'eslint-config-prettier'
import n from 'eslint-plugin-n'
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
		plugins: { n },
		rules: {
			/**
			 * We have this enabled in addition to `import/extensions` as
			 * this one has an auto-fix.
			 */
			'n/file-extension-in-import': [
				'error',
				'always',
				/**
				 * TypeScript doesn't yet support using extensions and
				 * fails with error TS2691.
				 */
				{ '.ts': 'never', '.tsx': 'never' },
			],
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
	prettier,
]

export default config