import consola from 'consola'
import { ESLint } from 'eslint'

export async function runEslint(paths, options = {}) {
	let linter = new ESLint({
		fix: options.fix,
	})
	let errors = 0

	try {
		let report = await linter.lintFiles(paths)

		/**
		 * If `fix` is passed, then don't worry about reporting errors, just
		 * do the fixes (likely being run as part of `format` command).
		 */
		if (options.fix) {
			ESLint.outputFixes(report)
		} else {
			let { errorCount, warningCount, results } = processReport(report)

			if (errorCount || warningCount) {
				let { format } = await linter.loadFormatter()
				consola.log(format(results))
			}

			errors = errorCount
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

	/**
	 * For some reason `reject`ing in the conditional block above doesn't exit
	 * with the correct error code.
	 */
	if (errors > 0) await Promise.reject()
	await Promise.resolve()
}

function processReport(report) {
	let result = {
		results: report,
		...getReportStatistics(report),
	}

	return result
}

const getReportStatistics = (results) => {
	let statistics = {
		errorCount: 0,
		warningCount: 0,
		fixableErrorCount: 0,
		fixableWarningCount: 0,
	}

	for (let result of results) {
		statistics.errorCount += result.errorCount
		statistics.warningCount += result.warningCount
		statistics.fixableErrorCount += result.fixableErrorCount
		statistics.fixableWarningCount += result.fixableWarningCount
	}

	return statistics
}
