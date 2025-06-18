# zazen-eslint-config

[![npm version][npm-img]][npm-url]
[![npm downloads][npm-dls]][npm-url]

[ESLint] configuration for [zazen]-generated projects.

## Usage

Install the config by running:

```sh
npm install --save-dev eslint @zazen/eslint-config
```

Add the config to your `eslint.config.js`:

```js
import configZazen from '@zazen/eslint-config'
import configZazenStylistic from '@zazen/eslint-config/stylistic'
import { defineConfig } from 'eslint/config'

export default defineConfig([
	{
		extends: [configZazen, configZazenStylistic],
		rules: { /* … */ },
	}
])
```

The Stylistic config disables rules handled by Prettier. This config should come
*last*, either in the `extends` array of a general config object, or at the end
of the array of config objects.

### Node projects

Extend the base config as well as the Node-specific rules:

```js
import configZazen from '@zazen/eslint-config'
import configZazenNode from '@zazen/eslint-config/node'
import configZazenStylistic from '@zazen/eslint-config/stylistic'
import { defineConfig } from 'eslint/config'

export default defineConfig([
	{
		extends: [configZazen, configZazenNode, configZazenStylistic],
		rules: { /* … */ },
	}
])
```

### TypeScript projects

Extend the base config as well as the TypeScript-specific rules:

```js
import configZazen from '@zazen/eslint-config'
import configZazenStylistic from '@zazen/eslint-config/stylistic'
import configZazenTypeScript from '@zazen/eslint-config/typescript'
import { defineConfig } from 'eslint/config'

export default defineConfig([
	{
		extends: [configZazen, configZazenTypeScript, configZazenStylistic],
		rules: { /* … */ },
	}
])
```

The base config includes rules for both JavaScript and TypeScript and uses the
TypeScript parser. The `typescript` config adds extra rules that require type
checking, so a `tsconfig.json` file must be present.

### Vue.js projects

Removed for now until/unless I get more opinionated about Vue code. For now,
install `eslint-plugin-vue` per-project, and extend the recommended config in
addition to the base config here.

```js
{
    extends: [
        'plugin:vue/[vue3-]recommended',
        '@zazen',
        'prettier',
    ],
    rules: { /* … */ },
}
```

The TypeScript rules can be included as well, but remember to [set the `parser`
option correctly].

[npm-url]: https://www.npmjs.com/package/@zazen/eslint-config
[npm-img]: https://img.shields.io/npm/v/@zazen/eslint-config.svg?style=flat-square
[npm-dls]: https://img.shields.io/npm/dt/@zazen/eslint-config.svg?style=flat-square
[eslint]: https://eslint.org
[zazen]: https://github.com/stormwarning/zazen
[set the `parser` option correctly]: https://eslint.vuejs.org/user-guide/#what-is-the-use-the-latest-vue-eslint-parser-error
