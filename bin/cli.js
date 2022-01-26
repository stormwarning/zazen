#!/usr/bin/env node

import { createRequire } from 'node:module'

import sade from 'sade'

const require = createRequire(import.meta.url)

/**
 * Basic CLI setup.
 *
 * @see https://github.com/lukeed/sade
 * @see https://github.com/sindresorhus/ora
 */
const prog = sade('zazen')

const { version } = require('../package.json')

prog.version(version)

prog.command('configure')
	.describe('Generate tooling config files')
	.action(() => {
		console.log('this is the configure command')
	})

prog.parse(process.argv)
