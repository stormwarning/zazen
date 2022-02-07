import { execSync } from 'child_process'
import process from 'process'

import createEsmUtils from 'esm-utils'

const { __dirname } = createEsmUtils(import.meta)
const BIN = `${__dirname}/../../../bin/cli.js`

// eslint-disable-next-line unicorn/prevent-abbreviations
export async function runScript(script, cwd, args = []) {
	try {
		return await execSync(`${BIN} ${script} ${args.join(' ')}`, {
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
