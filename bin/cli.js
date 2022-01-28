#!/usr/bin/env node

import { createRequire } from 'node:module'

import sade from 'sade'

import configure from '../lib/configure.js'

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

prog.command('init <project>')
	.describe('Bootstrap a new project')
	.action((project, opts) => {
		console.log('project name is', project)
	})

prog.command('configure')
	.describe('Generate tooling config files')
	.action(async () => {
		await configure()
	})

prog.parse(process.argv)
