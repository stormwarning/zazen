import path from 'path'

import context from '../context.js'

const { paths } = context

export function buildTsConfig() {
	let includes = paths.src

	if (paths.zazenConfigPath && paths.zazenConfigPath.endsWith('.ts')) {
		includes.push(paths.zazenConfigPath)
	} else {
		includes.push(path.join(import.meta.url, '../lib/placeholder.ts'))
	}

	let config = {
		compilerOptions: {
			allowSyntheticDefaultImports: true,

			// Interop between ESM and CJS modules. Recommended by TS.
			esModuleInterop: true,

			jsx: 'preserve',
			lib: ['dom', 'esnext'],
			noEmit: true,
			noUnusedLocals: true,

			/**
			 * Significant perf increase by skipping checking .d.ts files,
			 * particularly those in node_modules. Recommended by TS.
			 */
			skipLibCheck: true,

			resolveJsonModule: true,
		},
		include: includes,
	}

	return config
}
