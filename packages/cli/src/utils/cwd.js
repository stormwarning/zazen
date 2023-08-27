import path from 'path'
import process from 'process'

/**
 * @param {string} filePath
 */
export function getPathFromCwd(filePath) {
	return path.join(process.cwd(), filePath)
}
