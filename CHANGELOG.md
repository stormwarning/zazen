# @zazen/cli

## 0.4.0

### Minor Changes

- [#108](https://github.com/stormwarning/zazen/pull/108) [`29aa0d8`](https://github.com/stormwarning/zazen/commit/29aa0d892ec2bd1d218c7c0b72e5e9bd45712558) Thanks [@stormwarning](https://github.com/stormwarning)! - Add `lint` command

  Checks files for formatting issues and linter errors.

* [#104](https://github.com/stormwarning/zazen/pull/104) [`3d02806`](https://github.com/stormwarning/zazen/commit/3d02806407615c538cc923a6a5fd9ce84de8e3db) Thanks [@stormwarning](https://github.com/stormwarning)! - Add `format` command

  Applies ESLint autofixes and Prettier formatting.

- [#100](https://github.com/stormwarning/zazen/pull/100) [`df69513`](https://github.com/stormwarning/zazen/commit/df69513b8c4e14e9895e0d766cda1ae39e19fc6d) Thanks [@stormwarning](https://github.com/stormwarning)! - Include eslint and prettier in dependencies

  Preparing for dedicated `lint` and `format` commands.

## 0.3.2 — 2022-02-15

#### ♻️ Changed

- Update `tsconfig.json` output [#85](https://github.com/stormwarning/zazen/pull/85), [#92](https://github.com/stormwarning/zazen/pull/92)

  Sets `outDir` to `./dist` (will eventually be configurable). Sets `target` and
  `module` to `esnext` and `moduleResolution` to `node`. Enables `allowJs` for
  better results in non-TypeScript projects. Enables `isolatedModules` based on
  [esbuild’s recommendation](https://esbuild.github.io/content-types/#isolated-modules).

## 0.3.1 — 2022-02-06

#### 🐛 Fixed

- Fix output from custom ESLint config [#83](https://github.com/stormwarning/zazen/pull/83)

## 0.3.0 — 2022-02-04

#### ♻️ Changed

- Upgrade `@zazen/eslint-config` to latest [`183e9c8`](https://github.com/stormwarning/zazen/commit/183e9c85c2beab2b0bfd06519910dc67d171abdd)

## 0.2.0 — 2022-02-02

#### ♻️ Changed

- Upgrade `@zazen/eslint-config` to latest [`b02fe22`](https://github.com/stormwarning/zazen/commit/b02fe225e8ca1081a8f7d9c6858a0fc6c88c3f8a)

## 0.1.2 — 2022-02-01

#### 🐛 Fixed

- Make default ESLint config a direct dependency [`7803181`](https://github.com/stormwarning/zazen/commit/780318175544b5001e63c8abd387837c058576f3)

### 0.1.1 — 2022-02-01

#### 🐛 Fixed

- Add JSON/YML formatting to default Prettier config [`d47eea8`](https://github.com/stormwarning/zazen/commit/d47eea8ef9353d7f323795da183b48ffcfc846ce)

## 0.1.0 — 2022-02-01

#### 🎉 Initial release [#71](https://github.com/stormwarning/zazen/pull/71)
