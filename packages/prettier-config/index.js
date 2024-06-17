/** @type {import('prettier').Config} */
const config = {
	plugins: ['prettier-plugin-packagejson'],
	semi: false,
	singleQuote: true,
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
		 * @see https://github.com/stylelint-stylistic/stylelint-config/blob/main/.stylelintrc.json
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
