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
			// Elevates the buffer limit assigned to the child process.
			// This limit is set to `200 * 1024` in node v10 and being
			// elevated to `1024 * 1024` in node v12.
			//
			// See node v10: https://nodejs.org/docs/latest-v10.x/api/child_process.html#child_process_child_process_exec_command_options_callback
			// See node v12: https://nodejs.org/docs/latest-v12.x/api/child_process.html#child_process_child_process_exec_command_options_callback
			maxBuffer: 1024 * 1024,
		})
	} catch (error) {
		// Print the stdout of a failed command so it shows in test output.
		if (error.stdout) console.warn(error.stdout)
		if (error.stderr) console.warn(error.stderr)

		throw error
	}
}
