import consola from 'consola'
import { execaCommand } from 'execa'

export async function runPrettier(path, options) {
	let flag = ''
	if (options['list-different']) flag = '-l'
	if (options.write) flag = '-w'

	try {
		await execaCommand(`npx prettier ${path} ${flag}`)
	} catch (error) {
		if (error) {
			if (error.stdout && !error.stderr) {
				// Results of `list-different` flag.
				consola.warn('Code style issues found in:\n', error.stdout)
			} else {
				await Promise.reject(error)
			}
		}
	}
}
