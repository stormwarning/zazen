import { parseChangesetFile } from '@changesets/parse'
import { describe, expect, it, test, vi } from 'vitest'

import changelogFunctions from '../index.js'

const { getReleaseLine } = changelogFunctions

const DOUBLE_SPACE = `  `
const MOCK_DATA = {
	commit: 'ed20541',
	user: 'stormwarning',
	pull: 420,
	repo: 'stormwarning/zazen',
}

vi.mock('@changesets/get-github-info', () => {
	// This is duplicated because `vi.mock` is hoisted.
	let data = {
		commit: 'ed20541',
		user: 'stormwarning',
		pull: 420,
		repo: 'stormwarning/zazen',
	}
	let pull = {
		number: data.pull,
		url: `https://github.com/${data.repo}/pull/${data.pull}`,
		markdownLink: `[#${data.pull}](https://github.com/${data.repo}/pull/${data.pull})`,
	}
	let commit = {
		sha: data.commit,
		url: `https://github.com/${data.repo}/commit/${data.commit}`,
		markdownLink: `[\`${data.commit}\`](https://github.com/${data.repo}/commit/${data.commit})`,
	}
	let author = {
		login: data.user,
		url: `https://github.com/${data.user}`,
		markdownLink: `[@${data.user}](https://github.com/${data.user})`,
	}

	return {
		async getCommitInfo({ commit: sha, repo }) {
			expect(sha).toBe(data.commit)
			expect(repo).toBe(data.repo)
			return { commit, author, pull }
		},
		async getPullRequestInfo({ pull: number, repo }) {
			expect(number).toBe(data.pull)
			expect(repo).toBe(data.repo)
			return { pull, author, commit }
		},
	}
})

/**
 * @param {string} content
 * @param {string} [commit]
 * @param {string} [line]
 * @returns {Parameters<import('@changesets/types').GetReleaseLine>}
 */
function getChangeset(content, commit, line = 'multi') {
	return [
		{
			...parseChangesetFile(
				`---
pkg: "minor"
---

Change${
					line === 'multi'
						? `

Description of change.`
						: ''
				}
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

it.each(['single', 'multi'])(
	'outputs a %s-line changelog entry',
	async (line) => {
		let singleOutput = `- Change ([#420](https://github.com/stormwarning/zazen/pull/420))`
		let multiOutput = `- Change ([#420](https://github.com/stormwarning/zazen/pull/420))
${DOUBLE_SPACE}
  Description of change.`

		expect(
			await getReleaseLine(...getChangeset('', 'ed20541', line)),
		).toEqual(line === 'single' ? singleOutput : multiOutput)
	},
)

describe.each([MOCK_DATA.commit])(
	'with commit from changeset of %s',
	(commitFromChangeset) => {
		describe.each(['pr', 'pull request', 'pull'])(
			'override pr with %s keyword',
			(keyword) => {
				test.each(['with #', 'without #'])('%s', async (kind) => {
					let output = `- Change ([#420](https://github.com/stormwarning/zazen/pull/420))
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
			let output = `- Change ([#420](https://github.com/stormwarning/zazen/pull/420))
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
				let output = `- Change ([#420](https://github.com/stormwarning/zazen/pull/420))
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
				let output = `- Change ([#420](https://github.com/stormwarning/zazen/pull/420))
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
				let output = `- Change ([#420](https://github.com/stormwarning/zazen/pull/420))
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
