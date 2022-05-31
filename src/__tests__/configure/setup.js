import { copyFile, mkdir, readFile, writeFile } from 'fs/promises'
import path from 'path'

import { runScript } from '../_test-utils/_run-script.js'

export async function readFileContents(directory, filename) {
	let contents = await readFile(path.join(directory, filename), 'utf8')
	return contents
}

export async function readIgnore(directory, filename) {
	let contents = await readFileContents(directory, filename)
	return (
		contents
			.split('\n')
			// Remove blanks and comments.
			.filter((ignore) => ignore && !ignore.startsWith('#'))
	)
}

const copyToApp = async (filename, folder) =>
	copyFile(new URL(filename, import.meta.url), path.join(folder, filename))

export async function setupTest(directory, filesToCopy) {
	await mkdir(directory, { recursive: true })

	let packageJson = JSON.stringify(
		{
			name: 'test-app',
			version: '0.0.0',
			type: 'commonjs',
		},
		null,
		2
	)
	await writeFile(path.join(directory, 'package.json'), packageJson)

	if (filesToCopy) {
		for (let file of filesToCopy) {
			// eslint-disable-next-line no-await-in-loop
			await copyToApp(file, directory)
		}
	}

	await runScript('configure', directory)
}
