import fs from 'node:fs'
import { createRequire } from 'node:module'

import { register } from 'esbuild-register/dist/node.js'

import { getPathFromCwd } from '../utils.js'

import defaultConfig from './default-config.js'

const require = createRequire(import.meta.url)

/**
 * Read the configuration options from the project's config file.
 */
function getZazenConfig() {
	let tsPath = getPathFromCwd('zazen.config.ts')
	let jsPath = getPathFromCwd('zazen.config.js')
	let configPath

	if (fs.existsSync(tsPath)) {
		configPath = tsPath
	} else if (fs.existsSync(jsPath)) {
		configPath = jsPath
	} else {
		return {
			config: {},
			configPath: null,
		}
	}

	let { unregister } = register({ target: 'node16' })
	let config = require(configPath)
	unregister()

	return {
		config: config.default || config,
		zazenConfigPath: configPath,
	}
}

const { config, zazenConfigPath } = getZazenConfig()
const zazenConfig = {
	...defaultConfig,
	...config,
}
const paths = {
	zazenConfigPath,
	src: zazenConfig.srcPaths.map((path) => getPathFromCwd(path)),
}

export default {
	paths,
	eslintDecorator: zazenConfig.setEslintConfig,
}
