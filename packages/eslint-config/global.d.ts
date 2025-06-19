declare module '@typescript-eslint/eslint-plugin' {
	import type { ESLint } from 'eslint'

	const plugin: ESLint.Plugin
	export default plugin
}

declare module 'eslint-plugin-etc' {
	import type { ESLint } from 'eslint'

	const plugin: ESLint.Plugin
	export default plugin
}

declare module 'eslint-plugin-import-x' {
	import type { ESLint } from 'eslint'
	import type importX from 'eslint-plugin-import-x'

	const plugin: ESLint.Plugin & {
		configs: typeof importX.configs
		flatConfigs: typeof importX.flatConfigs
	}
	export default plugin
}

declare module 'eslint-plugin-prefer-let' {
	import type { ESLint } from 'eslint'

	const plugin: ESLint.Plugin
	export default plugin
}

declare module 'eslint-plugin-promise' {
	import type { ESLint } from 'eslint'
	import type promise from 'eslint-plugin-promise'

	const plugin: ESLint.Plugin & {
		configs: typeof promise.configs
	}
	export default plugin
}

declare module 'eslint-config-xo' {
	import type { Linter } from 'eslint'

	const config: Linter.Config[]
	export default config
}

declare module 'eslint-config-xo-typescript' {
	import type { Linter } from 'eslint'

	const config: Linter.Config[]
	export default config
}
