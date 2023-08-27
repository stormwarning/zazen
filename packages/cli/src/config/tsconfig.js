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
			allowJs: true,
			allowSyntheticDefaultImports: true,

			// Interop between ESM and CJS modules. Recommended by TS.
			esModuleInterop: true,

			// Recommended by esbuild.
			isolatedModules: true,

			jsx: 'preserve',
			lib: ['dom', 'esnext'],
			module: 'esnext',
			moduleResolution: 'node',
			noUnusedLocals: true,
			outDir: './dist',
			resolveJsonModule: true,

			/**
			 * Significant perf increase by skipping checking .d.ts files,
			 * particularly those in node_modules. Recommended by TS.
			 */
			skipLibCheck: true,

			sourceMap: true,
			target: 'esnext',
		},
		include: includes,
	}

	return config
}
