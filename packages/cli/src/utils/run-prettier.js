import { resolve } from 'node:path'

import consola from 'consola'
import { execaCommand } from 'execa'

export async function runPrettier(path, options = {}) {
	let flag = ''
	if (options['list-different']) flag = '-l'
	if (options.write) flag = '-w'

	try {
		await execaCommand(`npx prettier -c ${flag} ${resolve(path)}`)
	} catch (error) {
		if (error) {
			if (error.stdout && !error.stderr) {
				/**
				 * Results of `list-different` flag.
				 * When checking formatting with `lint` command, indicate where
				 * formatting is incorrect, but don't fail the process.
				 */
				consola.warn('Code style issues found in:\n', error.stdout)
			} else {
				await Promise.reject(error)
			}
		}
	}
}
