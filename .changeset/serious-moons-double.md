---
'@zazen/cli': patch
---

Update `tsconfig.json` output

Sets `outDir` to `./dist` and `target` to `esnext`. Enables `allowJs`
for better results in non-TypeScript projects. Enables
`isolatedModules` based on [esbuild’s recommendation](https://esbuild.github.io/content-types/#isolated-modules).
