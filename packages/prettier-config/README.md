# @zazen/prettier-config

## Usage

```shell
npm install --save-dev prettier @zazen/prettier-config
```

Add the following to your `package.json`:

```json
  "prettier": "@zazen/prettier-config",
```

To extend the configuration, create `prettier.config.js` and spread this config
onto your own config object:

```js
import zazenConfig from '@zazen/prettier-config'

/** @type {import('prettier').Config} */
const config = {
	...zazenConfig,
	experimentalTernaries: true,
}

export default config
```
