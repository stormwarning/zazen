# @zazen/changesets-changelog

> A simplified version of [@changesets/changelog-github](https://github.com/changesets/changesets/tree/main/packages/changelog-github).

## Usage

```shell
npm install --save-dev @changesets/cli @zazen/changesets-changelog
```

Add the following to your `.changeset/config.json`:

```json
  "changelog": [
    "@changesets/changelog-github",
    { "repo": "org/repo" }
  ],
```
