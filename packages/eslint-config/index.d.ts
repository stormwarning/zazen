declare module '@zazen/eslint-config' {
	import type { Linter } from 'eslint'

	const config: Linter.Config[]
	export default config
}

declare module '@zazen/eslint-config/node' {
	import type { Linter } from 'eslint'

	const config: Linter.Config[]
	export default config
}

declare module '@zazen/eslint-config/typescript' {
	import type { Linter } from 'eslint'

	const config: Linter.Config[]
	export const rulesTs: Linter.Config
	export const rulesDts: Linter.Config
	export default config
}
