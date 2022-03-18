module.exports = {
	root: true,
	env: {
		es6: true,
		node: true,
	},
	parserOptions: {
		ecmaVersion: 2021,
	},
	extends: ['@zazen', '@zazen/eslint-config/node'],
	rules: {
		'no-return-await': 'off',

		/**
		 * @todo [@zazen/eslint-config@>5.1] Re-enable this when `import/order` works with `node:` prefix.
		 */
		'unicorn/prefer-node-protocol': 'off',

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
						pattern: '*.+(css)',
						group: 'index',
						position: 'after',
						patternOptions: { matchBase: true },
					},
				],
			},
		],
		'import/no-anonymous-default-export': ['error', { allowObject: true }],
	},
}
