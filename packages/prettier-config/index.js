/** @type {import('prettier').Config} */
const config = {
	plugins: [import.meta.resolve('prettier-plugin-packagejson')],
	semi: false,
	singleQuote: true,
	useTabs: true,
	overrides: [
		/**
		 * Give TypeScript code a little more room for type annotations.
		 */
		{
			files: ['*.ts', '*.tsx'],
			options: {
				printWidth: 100,
			},
		},

		/**
		 * Follow conventions from @stylistic/stylelint-config.
		 * @see https://github.com/stylelint-stylistic/stylelint-config/blob/main/stylelint.config.js
		 */
		{
			files: ['*.css', '*.scss'],
			options: {
				singleQuote: false,
				printWidth: 120,
			},
		},
	],
}

export default config
