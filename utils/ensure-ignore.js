import { readFile, writeFile } from 'fs/promises'
import path from 'path'

const DIVIDER =
	'######################################################################'

/**
 * Ported from [ensure-ignore]{@link https://github.com/seek-oss/ensure-gitignore}.
 */
export default async function ({
	filepath = path.resolve(process.cwd(), '.gitignore'),
	patterns = [],
	comment = '',
}) {
	let contents = ''
	try {
		contents = await readFile(filepath, 'utf-8')
	} catch (error) {
		if (error.code !== 'ENOENT') throw error
	}

	let sortedPatterns = patterns.sort()
	let rawPatterns = contents
		.trim()
		.split(/\r?\n/)
		.filter((pattern) => !sortedPatterns.includes(pattern))

	let startComment = dividerComment(comment)
	let endComment = dividerComment(`END ${comment}`, true)
	let startIndex = rawPatterns.indexOf(startComment)
	let endIndex = rawPatterns.indexOf(endComment)

	let before =
		startIndex >= 0
			? trimArray(rawPatterns.slice(0, startIndex))
			: rawPatterns
	let after =
		endIndex >= 0
			? trimArray(rawPatterns.slice(rawPatterns.indexOf(endComment) + 1))
			: []

	let controlledPatterns =
		patterns.length > 0
			? [`\n${startComment}`, ...sortedPatterns, `${endComment}\n`]
			: []

	let outputPatterns = [...before, ...controlledPatterns, ...after]
		.join('\n')
		.trim()

	let output = `${outputPatterns}\n`

	return contents !== output ? await writeFile(filepath, output) : output
}

function trimArray(arr) {
	return arr.join('\n').trim().split('\n')
}

/**
 * @param {string} comment
 * @param {boolean} [end=false]
 */
function dividerComment(comment, end = false) {
	let commentLength = comment.length + 2
	let str = [
		...DIVIDER.slice(end ? commentLength + 2 : DIVIDER.length - 2),
		` ${comment} `,
		...DIVIDER.slice(end ? DIVIDER.length - 2 : commentLength + 2),
	]

	return str.join('')
}
