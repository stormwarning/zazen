# 座禅

> Zazen is not “step-by-step meditation”. Rather it is simply the easy and
> pleasant practice of a Buddha, the realisation of the Buddha’s Wisdom. The
> Truth appears, there being no [delusion][]. If you understand this, you are
> completely free, like a dragon that has obtained water or a tiger that
> reclines on a mountain. The [supreme Law][] will then appear of itself, *and
> you will be free of weariness and confusion*.

## Common settings & utilities

- [x] **Scaffolding:** [sao][]
- **Linting & formatting:**
  - [x] JavaScript: [eslint][] & [prettier][] \
         See [zazen-eslint-config][] for configuration.
  - [x] Sass: [stylelint][]
  - [x] Markdown: [remark][]
  - [ ] Commit messages: [commitlint][] \
         See [zazen-commit-types][] for message guidlines.
- **Testing & coverage:**
  - [ ] [AVA][]
- **Compiling & bundling:**
  - [ ] [webpack][] \
         With a [clearer config][] setup with Typescript.
  - [ ] [microbundle][]
- **Publishing & documenting:**
  - [x] `git` hooks: [husky][]
  - [ ] Package releases: [np][]
  - [ ] Change log: [conventional-changelog-cli][]

## Project type options

- [ ] **Node package**
- [ ] **Squarespace site** \
       Uses Squarespace [developer toolset][] & [eslint config][].
- [ ] **Static site** \
       Need to decide on static generator setup. [Gatsby][]?
- [ ] **Vue.js project** \
       Uses [Nuxt.js][] and offical [Vue style guide][].

## Inspiration

[Lass](https://github.com/lassjs/lass)

---

[delusion]: https://en.wikipedia.org/wiki/Maya_(illusion)

[supreme law]: https://en.wikipedia.org/wiki/Dharma_(Buddhism)

[sao]: https://sao.js.org/

[eslint]: https://eslint.org

[prettier]: https://prettier.io

[zazen-eslint-config]: https://github.com/stormwarning/zazen-eslint-config

[stylelint]: https://stylelint.io

[remark]: http://remark.js.org

[commitlint]: https://github.com/marionebl/commitlint

[zazen-commit-types]: https://github.com/stormwarning/zazen-commit-types

[ava]: https://github.com/avajs/ava

[webpack]: https://webpack.js.org

[clearer config]: https://medium.com/webpack/unambiguous-webpack-config-with-typescript-8519def2cac7

[microbundle]: https://github.com/developit/microbundle

[husky]: https://github.com/typicode/husky

[np]: https://github.com/sindresorhus/np

[conventional-changelog-cli]: https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli

[developer toolset]: https://github.com/Squarespace/squarespace-toolbelt

[eslint config]: https://github.com/Squarespace/eslint-config-squarespace

[gatsby]: https://www.gatsbyjs.org

[nuxt.js]: https://nuxtjs.org

[vue style guide]: https://vuejs.org/v2/style-guide/
