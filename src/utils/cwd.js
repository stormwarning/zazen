import path from 'path'

/**
 * @param {string} filePath
 */
export function getPathFromCwd(filePath) {
	return path.join(process.cwd(), filePath)
}
