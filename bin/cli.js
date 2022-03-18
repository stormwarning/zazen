#!/usr/bin/env node

import { createRequire } from 'module'
import process from 'process'

import consola from 'consola'
import sade from 'sade'

import { configure, format } from '../src/lib.js'

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
		consola.log('project name is', project)
	})

prog.command('configure')
	.describe('Generate tooling config files')
	.action(async () => {
		await configure()
	})

prog.command('format <glob>')
	.describe('Apply a consistent code style')
	.option('-c, --check', 'Check if the given files are formatted')
	.option(
		'-l, --list-different',
		'Print the names of files that are different from Prettier’s formatting'
	)
	.option('-w, --write', 'Edit files in-place')
	.action(async (glob, options) => {
		await format(glob, options)
	})

prog.parse(process.argv)
