# Change Log

## 7.1.0

### Minor Changes

- Extract just the rules from typescript-eslint configs ([#260](https://github.com/stormwarning/zazen/pull/260))

## 7.0.1

### Patch Changes

- Disable `etc/no-assign-mutated-array` in TypeScript config ([#258](https://github.com/stormwarning/zazen/pull/258))

  Seems like it has issues with the latest version of the TypeScript parser.

- Fix error in `naming-convention` rule ([#258](https://github.com/stormwarning/zazen/pull/258))

## 7.0.0

### Major Changes

- Update to ESLint 9 flat config ([#212](https://github.com/stormwarning/zazen/pull/212))

  Added TypeScript parser to base config, along with various TypeScript rules that also work with vanilla JavaScript. The exported `typescript` config is specifically for rules requiring type checking.

  See README docs for updated method of extending the different configs.

## 6.10.0

### Minor Changes

- Upgrade plugin dependencies ([#249](https://github.com/stormwarning/zazen/pull/249))

  - `@rushstack/eslint-patch` to 1.10.5
  - `@typescript-eslint/eslint-plugin` to 8.22.0
  - `@typescript-eslint/parser` to 8.22.0
  - `eslint-config-xo` to 0.45.0
  - `eslint-config-xo-typescript` to 5.0.0
  - `eslint-plugin-import` to 2.31.0
  - `eslint-plugin-import-sorting` to 2.2.0
  - `eslint-plugin-n` to 17.15.1
  - `eslint-plugin-prefer-let` to 4.0.0
  - `eslint-plugin-promise` to 7.2.1
  - `eslint-plugin-unicorn` to 56.0.1

## 6.9.1

### Patch Changes

- Update eslint-plugin-import-sorting to v2.1.1 ([#242](https://github.com/stormwarning/zazen/pull/242))

## 6.9.0

### Minor Changes

- Update eslint-plugin-import-sorting to v2.1.0 ([#237](https://github.com/stormwarning/zazen/pull/237))

## 6.8.0

### Minor Changes

- Configure `unicorn/switch-case-braces` to avoid braces where possible ([#214](https://github.com/stormwarning/zazen/pull/214))

### Patch Changes

- Update eslint-plugin-import-sorting to v1.1.0 ([#202](https://github.com/stormwarning/zazen/pull/202))
- Update typescript-eslint monorepo to v6.21.0 ([#211](https://github.com/stormwarning/zazen/pull/211))

## 6.7.0

### Minor Changes

- Expand `unicorn/prevent-abbreviations` replacements ([#206](https://github.com/stormwarning/zazen/pull/206))
- Add `import/no-empty-named-blocks` rule ([#205](https://github.com/stormwarning/zazen/pull/205))

## 6.6.2

### Patch Changes

- Update typescript-eslint monorepo to v6.19.1 ([#199](https://github.com/stormwarning/zazen/pull/199))
- Update eslint-plugin-import-sorting to v1.0.3 ([#200](https://github.com/stormwarning/zazen/pull/200))

## 6.6.1

### Patch Changes

- Fix type import autofix style ([#197](https://github.com/stormwarning/zazen/pull/197))
- Update eslint-plugin-import-sorting to v1.0.2 ([#193](https://github.com/stormwarning/zazen/pull/193))

## 6.6.0

### Minor Changes

- Update `import/no-duplicates` rule to prefer inline `type` qualifiers ([#188](https://github.com/stormwarning/zazen/pull/188))
- Update `consistent-type-definitions` rule to prefer `interface` ([#188](https://github.com/stormwarning/zazen/pull/188))
- Update `naming-convention` rule to allow UPPER_CASE variables ([#188](https://github.com/stormwarning/zazen/pull/188))

### Patch Changes

- Update eslint-plugin-unicorn to v50 ([#187](https://github.com/stormwarning/zazen/pull/187))

## 6.5.0

### Minor Changes

- Add rules for consistent TypeScript import style ([#183](https://github.com/stormwarning/zazen/pull/183))
- Add `tests` glob to `no-extraneous-dependencies` rule options ([#182](https://github.com/stormwarning/zazen/pull/182))
- Use `eslint-plugin-import-sorting` for import sort order ([#181](https://github.com/stormwarning/zazen/pull/181))

### Patch Changes

- Update @rushstack/eslint-patch to v1.7.0 ([#177](https://github.com/stormwarning/zazen/pull/177))
- Update typescript-eslint plugin & parser to v6.19.0 ([#172](https://github.com/stormwarning/zazen/pull/172))
- Update eslint-plugin-n to v16.6.2 ([#179](https://github.com/stormwarning/zazen/pull/179))
- Update eslint-config-prettier to v9.1.0 ([#178](https://github.com/stormwarning/zazen/pull/178))
- Update eslint-plugin-import to v2.29.1 ([#163](https://github.com/stormwarning/zazen/pull/163))

## 6.4.0 — 2023-11-15

### Minor Changes

- Upgrade dependencies [#160](https://github.com/stormwarning/zazen/pull/160)

  - Upgrade @rushstack/eslint-patch to 1.5.1
  - Upgrade @typescript-eslint/eslint-plugin to 6.11.0
  - Upgrade @typescript-eslint/parser to 6.11.0
  - Upgrade eslint-config-prettier to 9.0.0
  - Upgrade eslint-config-xo-typescript to 1.0.1
  - Upgrade eslint-plugin-etc to 2.0.3
  - Upgrade eslint-plugin-n to 16.3.1
  - Upgrade eslint-plugin-unicorn to 49.0.0

## 6.3.0 — 2023-03-19

### Minor Changes

- Update eslint-plugin-unicorn to v46 [#335](https://github.com/stormwarning/zazen-eslint-config/pull/335)
- Update eslint-config-prettier to v8.7.0 [#322](https://github.com/stormwarning/zazen-eslint-config/pull/322)
- Update typescript-eslint monorepo to v5.55.0 [#320](https://github.com/stormwarning/zazen-eslint-config/pull/320)
- Update eslint-plugin-import to v2.27.5 [#328](https://github.com/stormwarning/zazen-eslint-config/pull/328)

### Patch Changes

- Patch ESLint’s module resolution so plugins work more reliably [#331](https://github.com/stormwarning/zazen-eslint-config/pull/331)
- Update eslint-plugin-n to v15.6.1 [#327](https://github.com/stormwarning/zazen-eslint-config/pull/327)
- Update eslint-config-xo-typescript to v0.56.0 [#332](https://github.com/stormwarning/zazen-eslint-config/pull/332)

## 6.2.1 — 2022-12-20

### Patch Changes

- Update typescript-eslint monorepo to v5.47.0 [#318](https://github.com/stormwarning/zazen-eslint-config/pull/318)

## 6.2.0 — 2022-12-19

### Minor Changes

- Update @typescript-eslint/eslint-plugin to v5.46.0 [#304](https://github.com/stormwarning/zazen-eslint-config/pull/304)
- Update eslint-config-xo to v0.43.1 [#311](https://github.com/stormwarning/zazen-eslint-config/pull/311)
- Update eslint-config-xo-typescript to v0.55.1 [#312](https://github.com/stormwarning/zazen-eslint-config/pull/312)
- Update eslint-plugin-unicorn to v45 [#313](https://github.com/stormwarning/zazen-eslint-config/pull/313)

### Patch Changes

- Update eslint-plugin-promise to v6.1.1 [#305](https://github.com/stormwarning/zazen-eslint-config/pull/305)
- Update eslint-plugin-n to v15.5.2 [#309](https://github.com/stormwarning/zazen-eslint-config/pull/309)

## 6.1.0 — 2022-10-13

### Minor Changes

- Add import sorting rules [#301](https://github.com/stormwarning/zazen-eslint-config/pull/301)
- Allow `args` and `lib` abbreviations [#300](https://github.com/stormwarning/zazen-eslint-config/pull/300)
- Update eslint-plugin-promise to v6.1.0 [#299](https://github.com/stormwarning/zazen-eslint-config/pull/299)
- Update typescript-eslint monorepo to v5.40.0 [#298](https://github.com/stormwarning/zazen-eslint-config/pull/298)

### Patch Changes

- Update eslint-plugin-unicorn to v44.0.2 [#297](https://github.com/stormwarning/zazen-eslint-config/pull/297)

## 6.0.0 — 2022-10-03

### 💣 Breaking Change

- Upgrade plugin dependencies [#295](https://github.com/stormwarning/zazen-eslint-config/pull/295)

  Also drops support for ESLint v7 (minimum version for the latest `eslint-plugin-unicorn` is v8.23.1).

  - eslint-plugin-unicorn → v44
  - eslint-plugin-promise → v6.0.1
  - eslint-plugin-n → v15.3.0
  - eslint-config-xo-typescript → v0.53.0
  - eslint-config-xo → v0.42.0
  - @typescript-eslint → v5.39.0

## 5.2.0 — 2022-05-15

#### ♻️ Changed

- Update typescript-eslint packages to v5.23.0 [#263](https://github.com/stormwarning/zazen-eslint-config/pull/263)
- Update eslint-plugin-n to v15.2.0 [#264](https://github.com/stormwarning/zazen-eslint-config/pull/264)
- Update eslint-plugin-unicorn to v42 [#270](https://github.com/stormwarning/zazen-eslint-config/pull/270)
- Update eslint-plugin-import to v2.26.0 [#271](https://github.com/stormwarning/zazen-eslint-config/pull/271)

## 5.1.0 — 2022-03-17

#### 🗑️ Removed

- Remove `eslint-plugin-prettier` from extended rulesets [#261](https://github.com/stormwarning/zazen-eslint-config/pull/261)

  Per [Prettier’s integration recommendations](https://prettier.io/docs/en/integrating-with-linters.html), Prettier is run separately from
  ESLint. Should update `lint-staged` config to include `prettier --write` for
  appropriate files.### Minor Changes

#### ♻️ Changed

- Update typescript-eslint packages to v5.15.0 [#245](https://github.com/stormwarning/zazen-eslint-config/pull/245)
- Update eslint-config-xo to v0.40.0 [#246](https://github.com/stormwarning/zazen-eslint-config/pull/246)
- Update eslint-config-xo-typescript to v0.50.0 [#247](https://github.com/stormwarning/zazen-eslint-config/pull/247)
- Update eslint-plugin-unicorn to v41 [#250](https://github.com/stormwarning/zazen-eslint-config/pull/250)
- Update eslint-config-prettier to v8.5.0 [#251](https://github.com/stormwarning/zazen-eslint-config/pull/251)
- Update eslint-plugin-n to v15 [#254](https://github.com/stormwarning/zazen-eslint-config/pull/254)

## 5.0.0 — 2022-02-04

#### 💣 Breaking Change

- Use XO instead of Standard as a baseline [#240](https://github.com/stormwarning/zazen-eslint-config/pull/240)

  Extends `eslint-config-xo` (and `eslint-config-xo-typescript`) rules, as well as the config for `import`, `promise`, and `node` plugins from the XO CLI.

  Internal configs do not extend each other, in order to keep things flexible.

## 4.0.0 — 2022-02-02

#### 💣 Breaking Change

- Include TypeScript rules in default config [#237](https://github.com/stormwarning/zazen-eslint-config/pull/237)

  Also rolls `eslint-config-standard` back to the latest stable version, which
  required a rollback of `eslint-plugin-node` and `eslint-plugin-promise` in order
  for all the peerDependencies to be copacetic.

### 3.0.1 — 2022-01-26

#### 🗑️ Removed

- Remove deprecated `standard` plugin [#232](https://github.com/stormwarning/zazen-eslint-config/pull/232)

  As per [standard/standard#1316](https://github.com/standard/standard/issues/1316).

## 3.0.0 — 2022-01-26

#### ♻️ Changed

- Upgrade plugin dependencies to their latest version [#230](https://github.com/stormwarning/zazen-eslint-config/pull/230)

## 2.3.0 — 2021-03-06

#### ♻️ Changed

- Make project type configs standalone [#200](https://github.com/stormwarning/zazen-eslint-config/pull/200)

## 2.2.0 — 2021-02-22

#### ♻️ Changed

- Use a single file for general config [#181](https://github.com/stormwarning/zazen-eslint-config/pull/181)

#### 🎁 Added

- Add TypeScript config [#193](https://github.com/stormwarning/zazen-eslint-config/pull/193)

### 2.1.1 — 2020-11-13

#### 🐛 Fixed

- Ensure Prettier runs as an ESLint plugin [#170](https://github.com/stormwarning/zazen-eslint-config/pull/170)

## 2.1.0 — 2020-09-27

#### 🎁 Added

- Add `prefer-let` rule (and disable `prefer-const`) [#162](https://github.com/stormwarning/zazen-eslint-config/pull/162)

## 2.0.0 — 2020-01-21

#### 💣 Breaking Change

- Drops `prettier-eslint-cli` in favour of running Prettier as an
  eslint rule.

#### ♻️ Changed

- Downgrade `semantic-release` to previous major [[`7dc7a38`](https://github.com/stormwarning/zazen-eslint-config/commit/7dc7a38)]
- Upgrade dependencies ([#115](https://github.com/stormwarning/zazen-eslint-config/issues/115))

## 1.0.0 — 2019-01-23

#### 🎁 Added

- Add Prettier configs for Standard & Vue ([#9](https://github.com/stormwarning/zazen-eslint-config/issues/9))

#### Other updates

- Add license ([4a18a78](https://github.com/stormwarning/zazen-eslint-config/commit/4a18a78))
- Change Vue plugin to an optional dependency ([#7](https://github.com/stormwarning/zazen-eslint-config/issues/7))

## 0.3.0 — 2018-09-09

#### ♻️ Changed

- Upgraded Standard config and associated plugins to latest major version

### 0.2.1 — 2018-09-08

#### 🐛 Fixed

- Add Vuejs plugin as dependency instead of devDependency

## 0.2.0 — 2018-04-17

#### 🎁 Added

- Add optional rules for Vuejs projects

### 0.1.1 — 2018-02-19

#### 🐛 Fixed

- Include missing `import` plugin for rules that reference it

## 0.1.0 — 2018-02-15

### 🎉 Initial project release
