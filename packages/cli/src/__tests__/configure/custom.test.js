import { rm } from 'node:fs/promises'
import path from 'node:path'

import test from 'ava'
import createEsmUtils from 'esm-utils'

import { prependBanner } from '../../lib.js'
import { readInternalFile } from '../../utils.js'
import { readFileContents, readIgnore, setupTest } from './setup.js'

const { __dirname } = createEsmUtils(import.meta)
const APP_DIR = path.resolve(__dirname, 'custom')

test.before(async (_t) => {
	await setupTest(APP_DIR, ['zazen.config.js'])
})

test.after.always(async (_t) => {
	await rm(APP_DIR, { recursive: true, force: true })
})

test('generates an eslint config', async (t) => {
	let config = await readFileContents(APP_DIR, '.eslintrc.js')

	t.snapshot(config)
})

test('generates a prettier config', async (t) => {
	let internal = await readInternalFile('../config/prettier.cjs', 'utf8')
	let config = await readFileContents(APP_DIR, 'prettier.config.js')

	t.is(config, prependBanner(internal))
})

test('generates a gitignore', async (t) => {
	let ignoreContents = await readIgnore(APP_DIR, '.gitignore')

	t.is(ignoreContents.length, 3)
	t.true(ignoreContents.includes('.eslintrc.js'))
	t.true(ignoreContents.includes('prettier.config.js'))
	t.true(ignoreContents.includes('tsconfig.json'))
})
