import { /* copyFile, */ mkdir, readFile, rm, writeFile } from 'fs/promises'
import path from 'path'

import test from 'ava'
import createEsmUtils from 'esm-utils'

import { prependBanner } from '../../lib.js'
import { readInternalFile } from '../../utils.js'
import { runScript } from '../_test-utils/_run-script.js'

const { __dirname, require } = createEsmUtils(import.meta)
const APP_DIR = path.resolve(__dirname, 'App')

async function readFileContents(directory, filename) {
	let contents = await readFile(path.join(directory, filename), 'utf-8')
	return contents
}

// Disabled for now
// async function readJsonC(directory, filename) {
// 	let contents = await readFileContents(directory, filename)
// 	return jsonc.parse(contents)
// }

async function readIgnore(directory, filename) {
	let contents = await readFileContents(directory, filename)
	return (
		contents
			.split('\n')
			// Remove blanks and comments.
			.filter((ignore) => ignore && !ignore.startsWith('#'))
	)
}

// Disabled for now
// const copyToApp = async (filename, folder) =>
// 	copyFile(
// 		path.resolve(new URL(filename, import.meta.url).toString()),
// 		path.join(folder, filename)
// 	)

test.before(async (_t) => {
	await mkdir(APP_DIR, { recursive: true })

	let packageJson = JSON.stringify(
		{
			name: 'test-app',
			version: '0.0.0',
			type: 'commonjs',
		},
		null,
		2
	)
	await writeFile(path.join(APP_DIR, 'package.json'), packageJson)

	// Await copyToApp('App.js', APP_DIR)
	await runScript('configure', APP_DIR)
})

test.after.always(async (_t) => {
	await rm(APP_DIR, { recursive: true, force: true })
})

test('generates an eslint config', async (t) => {
	let eslintConfig = require.resolve('@zazen/eslint-config')
	let config = await readFileContents(APP_DIR, '.eslintrc.js')

	t.true(config.includes(eslintConfig))
})

test('generates a prettier config', async (t) => {
	let prettierConfig = await readInternalFile(
		'../config/prettier.cjs',
		'utf-8'
	)
	let config = await readFileContents(APP_DIR, 'prettier.config.js')

	t.is(config, prependBanner(prettierConfig))
})

test('generates a gitignore', async (t) => {
	let ignoreContents = await readIgnore(APP_DIR, '.gitignore')

	t.is(ignoreContents.length, 3)
	t.true(ignoreContents.includes('.eslintrc.js'))
	t.true(ignoreContents.includes('prettier.config.js'))
	t.true(ignoreContents.includes('tsconfig.json'))
})
