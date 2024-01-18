import parse from '@changesets/parse'
import { vi, describe, test, it, expect } from 'vitest'

import changelogFunctions from '../index.js'

const { getReleaseLine } = changelogFunctions

const DOUBLE_SPACE = `  `
const MOCK_DATA = {
	commit: 'a085003',
	user: 'stormwarning',
	pull: 420,
	repo: 'stormwarning/zazen',
}

vi.mock('@changesets/get-github-info', () => {
	// This is duplicated because `vi.mock` is hoisted.
	let data = {
		commit: 'a085003',
		user: 'stormwarning',
		pull: 420,
		repo: 'stormwarning/zazen',
	}
	let links = {
		user: `[@${data.user}](https://github.com/${data.user})`,
		pull: `[#${data.pull}](https://github.com/${data.repo}/pull/${data.pull})`,
		commit: `[\`${data.commit}\`](https://github.com/${data.repo}/commit/${data.commit})`,
	}

	return {
		async getInfo({ commit, repo }) {
			expect(commit).toBe(data.commit)
			expect(repo).toBe(data.repo)
			return {
				pull: data.pull,
				user: data.user,
				links,
			}
		},
		async getInfoFromPullRequest({ pull, repo }) {
			expect(pull).toBe(data.pull)
			expect(repo).toBe(data.repo)
			return {
				commit: data.commit,
				user: data.user,
				links,
			}
		},
	}
})

/**
 * @param {string} content
 * @param {string} [commit]
 */
function getChangeset(content, commit) {
	return [
		{
			...parse(
				`---
pkg: "minor"
---

Change

Description of change.
${content}
`,
			),
			id: 'some-id',
			commit,
		},
		'minor',
		{ repo: MOCK_DATA.repo },
	]
}

describe.each([MOCK_DATA.commit])(
	'with commit from changeset of %s',
	(commitFromChangeset) => {
		describe.each(['pr', 'pull request', 'pull'])(
			'override pr with %s keyword',
			(keyword) => {
				test.each(['with #', 'without #'])('%s', async (kind) => {
					let output = `
- Change ([#420](https://github.com/stormwarning/zazen/pull/420))
${DOUBLE_SPACE}
  Description of change.`

					expect(
						await getReleaseLine(
							...getChangeset(
								`${keyword}: ${kind === 'with #' ? '#' : ''}${
									MOCK_DATA.pull
								}`,
								commitFromChangeset,
							),
						),
					).toEqual(output)
				})
			},
		)
		test('override commit with commit keyword', async () => {
			let output = `
- Change ([#420](https://github.com/stormwarning/zazen/pull/420))
${DOUBLE_SPACE}
  Description of change.`

			expect(
				await getReleaseLine(
					...getChangeset(
						`commit: ${MOCK_DATA.commit}`,
						commitFromChangeset,
					),
				),
			).toEqual(output)
		})
	},
)

describe.each(['author', 'user'])(
	'override author with %s keyword',
	(keyword) => {
		describe.each(['with @', 'without @'])('%s', async (kind) => {
			it('ignores author if they are the repo owner', async () => {
				let output = `
- Change ([#420](https://github.com/stormwarning/zazen/pull/420))
${DOUBLE_SPACE}
  Description of change.`

				expect(
					await getReleaseLine(
						...getChangeset(
							`${keyword}: ${
								kind === 'with @' ? '@' : ''
							}stormwarning`,
							MOCK_DATA.commit,
						),
					),
				).toEqual(output)
			})

			it('thanks author if they are not the repo owner', async () => {
				let output = `
- Change ([#420](https://github.com/stormwarning/zazen/pull/420))
  Thanks [@hubot](https://github.com/hubot)!
${DOUBLE_SPACE}
  Description of change.`

				expect(
					await getReleaseLine(
						...getChangeset(
							`${keyword}: ${kind === 'with @' ? '@' : ''}hubot`,
							MOCK_DATA.commit,
						),
					),
				).toEqual(output)
			})

			it('thanks multiple authors', async () => {
				let output = `
- Change ([#420](https://github.com/stormwarning/zazen/pull/420))
  Thanks [@hubot](https://github.com/hubot), [@tidaltheory](https://github.com/tidaltheory)!
${DOUBLE_SPACE}
  Description of change.`

				expect(
					await getReleaseLine(
						...getChangeset(
							[
								`${keyword}: ${
									kind === 'with @' ? '@' : ''
								}hubot`,
								`${keyword}: ${
									kind === 'with @' ? '@' : ''
								}tidaltheory`,
							].join('\n'),

							MOCK_DATA.commit,
						),
					),
				).toEqual(output)
			})
		})
	},
)
