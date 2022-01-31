import { readFile } from 'fs/promises'

/**
 * Load a file relative to the file calling the function.
 *
 * `__dirname` is not available in Node ES modules.
 *
 * @see https://nodejs.org/docs/latest/api/esm.html#importmetaurl
 * @param {string} path
 * @returns {Promise<Buffer>}
 */
export async function readInternalFile(path) {
	return await readFile(new URL(path, import.meta.url))
}
