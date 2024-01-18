/**
 * Custom changelog functions to modify release line formatting.
 *
 * @see https://github.com/atlassian/changesets/blob/main/packages/changelog-github/src/index.ts
 */

import { getInfo, getInfoFromPullRequest } from '@changesets/get-github-info'
import { config } from 'dotenv'

config()

/**
 * @param {Record<string, any> | null} options
 */
function validateOptions(options) {
	if (!options || !options.repo) {
		throw new Error(
			'Please provide a repo to this changelog generator like this:\n"changelog": ["@zazen/changesets-changelog", { "repo": "org/repo" }]',
		)
	}
}

/** @type {import('@changesets/types').ChangelogFunctions} */
const changelogFunctions = {
	async getDependencyReleaseLine(changesets, dependenciesUpdated, options) {
		validateOptions(options)

		if (dependenciesUpdated.length === 0) return ''

		let changesetCommits = await Promise.all(
			changesets.map(async (cs) => {
				if (cs.commit) {
					let { links } = await getInfo({
						repo: options.repo,
						commit: cs.commit,
					})
					return links.commit
				}
			}),
		)
		let changesetLink = `- Updated dependencies ${changesetCommits
			.filter(Boolean)
			.join(', ')}:`
		let updatedDepenenciesList = dependenciesUpdated.map(
			(dependency) => `  - ${dependency.name}@${dependency.newVersion}`,
		)

		return [changesetLink, ...updatedDepenenciesList].join('\n')
	},

	async getReleaseLine(changeset, type, options) {
		validateOptions(options)

		let [repoOwner] = options.repo.split('/')
		/** @type {number} */
		let prFromSummary
		/** @type {string} */
		let commitFromSummary
		/** @type {Array<string>} */
		let usersFromSummary = []

		let replacedSummary = changeset.summary
			.replace(/^\s*(?:pr|pull|pull\s+request):\s*#?(\d+)/im, (_, pr) => {
				let prNumber = Number(pr)
				if (!Number.isNaN(prNumber)) prFromSummary = prNumber
				return ''
			})
			.replace(/^\s*commit:\s*(\S+)/im, (_, commit) => {
				commitFromSummary = commit
				return ''
			})
			.replaceAll(/^\s*(?:author|user):\s*@?(\S+)/gim, (_, user) => {
				// Ignore user if it's your own repo.
				if (!user.includes(repoOwner)) usersFromSummary.push(user)
				return ''
			})
			.trim()

		let [firstLine, ...futureLines] = replacedSummary
			.split('\n')
			.map((l) => l.trimEnd())

		let links = await (async () => {
			if (prFromSummary !== undefined) {
				let { links } = await getInfoFromPullRequest({
					repo: options.repo,
					pull: prFromSummary,
				})

				if (commitFromSummary) {
					links = {
						...links,
						commit: `[\`${commitFromSummary}\`](https://github.com/${options.repo}/commit/${commitFromSummary})`,
					}
				}

				return links
			}

			let commitToFetchFrom = commitFromSummary || changeset.commit
			if (commitToFetchFrom) {
				let { links } = await getInfo({
					repo: options.repo,
					commit: commitToFetchFrom,
				})
				return links
			}

			return {
				commit: null,
				pull: null,
				user: null,
			}
		})()
		let users =
			usersFromSummary.length > 0
				? usersFromSummary
						.map(
							(userFromSummary) =>
								`[@${userFromSummary}](https://github.com/${userFromSummary})`,
						)
						.join(', ')
				: null
		let userThanks = users === null ? '' : `\n  Thanks ${users}!`
		let versionInfo =
			links.pull === null ? ` ${links.commit}` : ` (${links.pull})`
		let description =
			futureLines.length > 0
				? `\n${futureLines.map((l) => `  ${l}`).join('\n')}`
				: ''

		return `- ${firstLine}${versionInfo}${userThanks}${description}`
	},
}

export default changelogFunctions
