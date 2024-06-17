# Change Log

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
