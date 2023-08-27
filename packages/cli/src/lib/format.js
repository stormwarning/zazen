import process from 'process'

import consola from 'consola'

import { runEslint, runPrettier } from '../utils.js'

export async function format(files) {
	consola.log('')
	consola.info(`Formatting '${files}'...`)

	try {
		await runEslint(files, { fix: true })
		await runPrettier(files, { write: true })
	} catch (error) {
		if (error) consola.error(error.message || error)
		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(1)
	}

	consola.success('Formatting complete!')
}
