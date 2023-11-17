/**
 * Custom changelog functions to modify release line formatting.
 *
 * @see https://github.com/atlassian/changesets/blob/main/packages/changelog-github/src/index.ts
 */

import { getInfo } from '@changesets/get-github-info'

const REPO = 'stormwarning/zazen'

/** @type {import('@changesets/types').ChangelogFunctions} */
const changelogFunctions = {
	async getDependencyReleaseLine(changesets, dependenciesUpdated) {
		if (dependenciesUpdated.length === 0) return ''

		let changesetCommits = await Promise.all(
			changesets.map(async (cs) => {
				if (cs.commit) {
					let { links } = await getInfo({
						repo: REPO,
						commit: cs.commit,
					})
					return links.commit
				}
			}),
		)
		let changesetLink = `- Updated dependencies [${changesetCommits
			.filter(Boolean)
			.join(', ')}]:`

		let updatedDepenenciesList = dependenciesUpdated.map(
			(dependency) => `  - ${dependency.name}@${dependency.newVersion}`,
		)

		return [changesetLink, ...updatedDepenenciesList].join('\n')
	},
	async getReleaseLine(changeset) {
		let [firstLine, ...futureLines] = changeset.summary
			.split('\n')
			.map((l) => l.trimEnd())

		if (changeset.commit) {
			let { links } = await getInfo({
				repo: REPO,
				commit: changeset.commit,
			})

			let versionInfo =
				links.pull === null ? changeset.commit : links.pull

			let summary = `- ${firstLine} (${versionInfo})`

			return `${summary}\n${futureLines.map((l) => `  ${l}`).join('\n')}`
		}

		return `\n\n- ${firstLine}\n${futureLines
			.map((l) => `  ${l}`)
			.join('\n')}`
	},
}

export default changelogFunctions
