import path from 'node:path'
import process from 'node:process'

/**
 * @param {string} filePath
 */
export function getPathFromCwd(filePath) {
	return path.join(process.cwd(), filePath)
}
