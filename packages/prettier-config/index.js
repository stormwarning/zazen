/** @type {import('prettier').Config} */
const config = {
	plugins: ['prettier-plugin-packagejson'],
	semi: false,
	singleQuote: true,
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			options: {
				printWidth: 100,
			},
		},
	],
}

export default config
