#!/usr/bin/env node

import { createRequire } from 'module'
import process from 'process'

import sade from 'sade'

import { configure } from '../src/lib.js'

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
	.action((project, _options) => {
		console.log('project name is', project)
	})

prog.command('configure')
	.describe('Generate tooling config files')
	.action(async () => {
		await configure()
	})

prog.parse(process.argv)
