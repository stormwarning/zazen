import process from 'process'

import consola from 'consola'
import { execaCommand } from 'execa'

async function runPrettier(files, options) {
	let flag = '-w'
	if (options.check) flag = '-c'
	if (options['list-different']) flag = '-l'
	if (options.write) flag = '-w'

	try {
		await execaCommand(`npx prettier ${files} ${flag}`)
	} catch (error) {
		if (error) {
			if (!error.stderr) {
				consola.warn(
					'The following files have incorrect formatting:\n',
					error.stdout
				)
			} else if (error.stderr.includes('Forgot to run Prettier?')) {
				consola.warn(
					'Code style issues found in:\n',
					error.stderr
						.replace(
							'[warn] Code style issues found in the above file(s). Forgot to run Prettier?',
							''
						)
						.replace('[warn] ', '')
				)
			} else {
				consola.error(error)
			}
		}
	}
}

export async function format(files, options) {
	consola.log('')
	consola.info(`Formatting '${files}'...`)

	try {
		await runPrettier(files, options)
	} catch (error) {
		if (error) consola.error(error)
		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(1)
	}

	consola.success('Formatting complete!')
}
