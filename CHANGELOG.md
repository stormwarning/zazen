# @zazen/cli

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
