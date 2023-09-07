import process from 'node:process'

import consola from 'consola'

import { runEslint, runPrettier } from '../utils.js'

export async function lint(patterns) {
	consola.log('')
	consola.info(`Checking '${patterns}'...`)

	try {
		await runPrettier(patterns, { 'list-different': true })
		await runEslint(patterns)
	} catch (error) {
		if (error) consola.error(error.message || error)
		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(1)
	}

	consola.success('Linting complete!')
}
