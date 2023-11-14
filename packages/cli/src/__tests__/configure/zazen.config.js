// eslint-disable-next-line unicorn/prefer-module
module.exports = {
	setEslintConfig: (base) => ({
		...base,
		extends: [...base.extends, 'other-config'],
		rules: { 'no-console': 'off' },
	}),
}
