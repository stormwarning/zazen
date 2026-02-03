# Change Log

## 5.0.0

### Major Changes

- Upgrade dependencies ([#275](https://github.com/stormwarning/zazen/pull/275))

  Bumps plugins and extended configs to their latest. Minimum versions of `stylelint` and `node` are now `17` and `20.19.0`.

### Patch Changes

- Order nested pseudo-classes after pseudo-elements ([#273](https://github.com/stormwarning/zazen/pull/273))

## 4.0.2

### Patch Changes

- Update peerDependencies version range syntax ([#270](https://github.com/stormwarning/zazen/pull/270))

## 4.0.1

### Patch Changes

- Upgrade config dependencies ([#244](https://github.com/stormwarning/zazen/pull/244))

  - `@stylistic/stylelint-plugin` to 3.1.1
  - `stylelint-config-recess-order` to 5.1.1
  - `stylelint-config-recommended` to 14.0.1
  - `stylelint-no-unsupported-browser-features` to 8.0.2

## 4.0.0

### Major Changes

- Update minimum required versions ([#221](https://github.com/stormwarning/zazen/pull/221))

  - `node@18`
  - `stylelint@16`

## 3.0.0 — 2022-05-07

#### 💣 Breaking

- Upgrade `recommended` config to latest [`f637c27`](https://github.com/stormwarning/zazen-stylelint-config/commit/f637c27343f5664298d4223d5435f77d94d74e10)
- Upgrade `recess-order` config to latest [#175](https://github.com/stormwarning/zazen-stylelint-config/pull/175)

  The minimum supported version of Stylelint is now >=14; the peerDependencies of this config have been updated to match.

## 2.0.0 — 2021-03-02

#### ♻️ Changed

- Bumps extended configs to their latest version [#146](https://github.com/stormwarning/zazen-stylelint-config/pull/146)

  `stylelint-config-recommended` 2.1.0 → 3.0.0  
  `stylelint-order` 2.0.0 → 4.1.0

  Also updates the CI and release workflow and config

## 1.0.0 — 2018-12-19

#### 💣 Breaking

- Adds some new rules — including new optional rules for Sass — and removes a few. Partials are renamed to match [Stylelint's categories](https://stylelint.io/VISION/) and `stylelint-config-recommended` is used as a baseline.

#### 🎁 Added

- Update linting rules ([#3](https://github.com/stormwarning/zazen-stylelint-config/issues/3))

## 0.2.0 — 2018-09-07

#### 🎁 Added

- `except` and `ignore` options for `comment-empty-line-before` rule \([#2](https://github.com/stormwarning/zazen-stylelint-config/pull/2))

### 0.1.1 — 2018-04-11

#### 🐛 Fixed

- Include `stylelint-config-recess-order` module in dependencies \[[`5c32443`](https://github.com/stormwarning/zazen-stylelint-config/commit/5c3244318e0e5d9a05197784c6eb642d02f13066)]

## 0.1.0 — 2018-04-11

### 🎉 Initial release
