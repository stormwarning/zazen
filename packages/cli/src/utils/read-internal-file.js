import { readFile } from 'node:fs/promises'

/**
 * Load a file relative to the file calling the function.
 *
 * `__dirname` is not available in Node ES modules.
 *
 * @see https://nodejs.org/docs/latest/api/esm.html#importmetaurl
 * @param {string} path
 * @param {string} encoding
 * @returns {Promise<Buffer>}
 */
export async function readInternalFile(path, encoding) {
	return await readFile(new URL(path, import.meta.url), encoding)
}
