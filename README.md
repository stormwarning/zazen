# 座禅

> Zazen is not "step-by-step meditation". Rather it is simply the easy and pleasant practice of a Buddha, the realisation of the Buddha's Wisdom. The Truth appears, there being no [delusion][]. If you understand this, you are completely free, like a dragon that has obtained water or a tiger that reclines on a mountain. The [supreme Law][] will then appear of itself, *and you will be free of weariness and confusion*.

## Common settings & utilities

- [x] **Scaffolding:** [sao][]
- [ ] **Linting & formatting:**
  - [x] JavaScript: [eslint][] & [prettier][]\
         [standard][] style baseline with some modifcations for personal preference.
  - [x] Sass: [stylelint][]
  - [x] Markdown: [remark][]
  - [ ] Commit messages: [commitlint][]
- **Testing & coverage:**
  - [ ] [AVA][]
- **Compiling & bundling:**
  - [ ] [webpack][]\
         With a [clearer config][] setup with Typescript.
  - [ ] [microbundle][]
- **Publishing & documenting:**
  - [x] `git` hooks: [husky][]
  - [x] Commit messages: [commitizen][] & [emoji-cz][]
  - [ ] Package releases: [np][]
  - [ ] Change log: [release][]\
         Would be nice to have `release` write to a `CHANGELOG.md` file as well.

## Project type options

- [ ] **Node package**
- [ ] **Squarespace site**\
       Uses Squarespace [developer toolset][] & [eslint config][].
- [ ] **Static site**\
       Need to decide on static generator setup.

## Inspiration

[Lass](https://github.com/lassjs/lass)

---

[delusion]: https://en.wikipedia.org/wiki/Maya_(illusion)

[supreme law]: https://en.wikipedia.org/wiki/Dharma_(Buddhism)

[sao]: https://sao.js.org/

[eslint]: https://eslint.org

[prettier]: https://prettier.io

[standard]: https://standardjs.com

[stylelint]: https://stylelint.io

[remark]: http://remark.js.org

[commitlint]: https://github.com/marionebl/commitlint

[ava]: https://github.com/avajs/ava

[webpack]: https://webpack.js.org

[clearer config]: https://medium.com/webpack/unambiguous-webpack-config-with-typescript-8519def2cac7

[microbundle]: https://github.com/developit/microbundle

[husky]: https://github.com/typicode/husky

[commitizen]: http://commitizen.github.io/cz-cli/

[emoji-cz]: https://github.com/kevin940726/emoji-cz

[np]: https://github.com/sindresorhus/np

[release]: https://github.com/zeit/release

[developer toolset]: https://github.com/Squarespace/squarespace-toolbelt

[eslint config]: https://github.com/Squarespace/eslint-config-squarespace
