# zazen-stylelint-config

[![npm version][npm-img]][npm-url]
[![npm downloads][npm-dls]][npm-url]

[Stylelint][] configuration for [zazen][]-generated projects.

## Usage

Install the conventions by running:

```sh
npm install --save-dev stylelint @zazen/stylelint-config
```

Then add the extends to your `stylelint.config.js`:

```js
/** @type {import('stylelint').Config} */
export default {
	extends: ['@zazen/stylelint-config'],
	rules: { /* … */ }
}
```

[npm-url]: https://www.npmjs.com/package/@zazen/stylelint-config

[npm-img]: https://img.shields.io/npm/v/@zazen/stylelint-config.svg?style=flat-square

[npm-dls]: https://img.shields.io/npm/dt/@zazen/stylelint-config.svg?style=flat-square

[issues-url]: https://github.com/stormwarning/zazen-stylelint-config/issues

[issues-img]: https://img.shields.io/github/issues/stormwarning/zazen-stylelint-config.svg?style=flat-square

[stylelint]: https://stylelint.io

[zazen]: https://github.com/stormwarning/zazen
