module.exports = {
	root: true,
	env: {
		es6: true,
		node: true,
	},
	parserOptions: {
		ecmaVersion: 2021,
	},
	extends: '@zazen',
	rules: {
		'import/order': [
			'error',
			{
				'newlines-between': 'always',
				alphabetize: { order: 'asc' },
				groups: [
					'builtin',
					'external',
					'internal',
					'parent',
					'sibling',
					'index',
				],
				pathGroups: [
					{
						pattern: '*.+(treat|less|css)',
						group: 'index',
						position: 'after',
						patternOptions: { matchBase: true },
					},
				],
			},
		],
	},
}
