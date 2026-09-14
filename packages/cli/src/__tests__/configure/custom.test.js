import { rm } from 'node:fs/promises'
import path from 'node:path'

import createEsmUtils from 'esm-utils'
import { afterAll, beforeAll, expect, it } from 'vitest'

import { prependBanner } from '../../lib.js'
import { readInternalFile } from '../../utils.js'
import { readFileContents, readIgnore, setupTest } from './setup.js'

const { __dirname } = createEsmUtils(import.meta)
const APP_DIR = path.resolve(__dirname, 'custom')

beforeAll(async () => {
	await setupTest(APP_DIR, ['zazen.config.js'])
})

afterAll(async () => {
	await rm(APP_DIR, { recursive: true, force: true })
})

it('generates an eslint config', async () => {
	let config = await readFileContents(APP_DIR, '.eslintrc.js')

	expect(config).toMatchSnapshot()
})

it('generates a prettier config', async () => {
	let internal = await readInternalFile('../config/prettier.cjs', 'utf8')
	let config = await readFileContents(APP_DIR, 'prettier.config.js')

	expect(config).toBe(prependBanner(internal))
})

it('generates a gitignore', async () => {
	let ignoreContents = await readIgnore(APP_DIR, '.gitignore')

	expect(ignoreContents).toHaveLength(3)
	expect(ignoreContents).toContain('.eslintrc.js')
	expect(ignoreContents).toContain('prettier.config.js')
	expect(ignoreContents).toContain('tsconfig.json')
})
