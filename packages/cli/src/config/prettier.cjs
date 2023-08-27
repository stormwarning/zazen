module.exports = {
	semi: false,
	singleQuote: true,
	useTabs: true,
	overrides: [
		{
			files: ['*.json', '*.yml'],
			options: {
				tabWidth: 2,
				useTabs: false,
			},
		},
	],
}
