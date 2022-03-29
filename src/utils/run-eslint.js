import consola from 'consola'
import { ESLint } from 'eslint'

export async function runEslint(paths, options) {
	let linter = new ESLint({
		fix: options.fix,
	})

	try {
		let report = await linter.lintFiles(paths)

		/**
		 * If `fix` is passed, then don't worry about reporting errors, just
		 * do the fixes (likely being run as part of `format` command).
		 */
		if (options.fix) {
			ESLint.outputFixes(report)
		} else {
			let { errorCount, warningCount, results } = report

			if (errorCount || warningCount) {
				let formatter = linter.getFormatter()
				consola.log(formatter(results))
			}

			if (errorCount > 0) await Promise.reject()
		}
	} catch (error) {
		if (error) {
			if (error.message?.includes('No files matching')) {
				consola.warn(error.message)
			} else {
				await Promise.reject(error)
			}
		}
	}

	await Promise.resolve()
}
