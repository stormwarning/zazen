import { execSync } from 'node:child_process'
import process from 'node:process'

import { getBinPath } from 'get-bin-path'

export async function runScript(script, cwd, args = []) {
	let binPath = await getBinPath()

	try {
		return await execSync(`${binPath} ${script} ${args.join(' ')}`, {
			stdio: 'inherit',
			cwd,
			env: process.env,
		})
	} catch (error) {
		// Print the stdout so it shows in test output.
		if (error.stdout) console.warn(error.stdout)
		if (error.stderr) console.warn(error.stderr)

		throw error
	}
}
