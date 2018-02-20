const path = require('path')
const fs = require('fs')

const githubUsernameRegex = require('github-username-regex')
// const opn = require('opn');
const isURL = require('is-url')
const isEmail = require('is-email')
const semver = require('semver')
const spdxLicenseList = require('spdx-license-list/full')
const superb = require('superb')
const camelcase = require('camelcase')
const uppercamelcase = require('uppercamelcase')
const slug = require('speakingurl')
const npmConf = require('npm-conf')
const npmExists = require('npm-name-exists')
const isValidNpmName = require('is-valid-npm-name')
const fetchGithubUsername = require('github-username')

const conf = npmConf()

const defaultLicense =
    conf.get('init-license') === 'ISC' ? 'MIT' : conf.get('init-license')

module.exports = {
    enforceNewFolder: true,

    templateOptions: {
        context: {
            camelcase,
            uppercamelcase,
        },
    },

    prompts: {
        projectType: {
            message: 'New project type:',
            choices: [
                {
                    name: 'Node package',
                    value: 'node',
                },
                {
                    name: 'Squarespace site',
                    value: 'sqsp',
                    disabled: true,
                },
                {
                    name: 'Static site',
                    value: 'static',
                    disabled: true,
                },
                {
                    name: 'Vue.js project',
                    value: 'vue',
                    disabled: true,
                },
            ],
            type: 'list',
            // store: true,
        },

        name: {
            message: 'Project name',
            default: ':folderName:',
            validate: async (val, answers) => {
                if (
                    answers.projectType !== 'node' ||
                    (process.env.NODE_ENV === 'test' && val === 'zazen')
                ) {
                    return true
                }
                const check = isValidNpmName(val)
                if (check !== true) return check
                return (await npmExists(val))
                    ? `The package "${val}" already exists on npm`
                    : true
            },
        },

        description: {
            message: 'Project description:',
            default: `My ${superb()} project.`,
        },

        pm: {
            message: 'Package manager:',
            choices: ['npm', 'yarn'],
            type: 'list',
            default: 'npm',
            store: true,
        },

        linting: {
            message: 'Linters needed:',
            type: 'checkbox',
            choices: [
                {
                    name: 'Eslint',
                    value: 'eslint',
                    checked: true,
                },
                {
                    name: 'Remark',
                    value: 'remark',
                },
                {
                    name: 'Stylelint',
                    value: 'stylelint',
                },
            ],
            store: true,
        },

        public: {
            message: 'Publicly available:',
            type: 'confirm',
            default: true,
        },

        license: {
            message: 'Source code license:',
            choices: Object.keys(spdxLicenseList),
            type: 'list',
            default: defaultLicense,
            store: true,
        },

        version: {
            message: 'Initial version:',
            default: '0.0.0',
            validate: val =>
                semver.valid(val) ? true : 'Invalid semver version',
        },

        author: {
            message: 'Author name:',
            default: conf.get('init-author-name') || ':gitUser:',
            store: true,
        },

        email: {
            message: 'Author email:',
            default: conf.get('init-author-email') || ':gitEmail:',
            store: true,
            validate: val => (isEmail(val) ? true : 'Invalid email'),
        },

        website: {
            message: 'Author website:',
            default: conf.get('init-author-url') || '',
            store: true,
            validate: val => (val === '' || isURL(val) ? true : 'Invalid URL'),
        },

        username: {
            message: 'GitHub user/org:',
            store: true,
            default: async answers => {
                if (answers.name.indexOf('@') === 0) {
                    return answers.name.split('/')[0].substring(1)
                }
                try {
                    const githubUsername = await fetchGithubUsername(
                        answers.email,
                    )
                    return githubUsername
                } catch (err) {
                    return ':gitUser:'
                }
            },
            validate: val =>
                githubUsernameRegex.test(val)
                    ? true
                    : 'Invalid GitHub username',
        },

        repo: {
            message: 'GitHub repository URL:',
            default (answers) {
                const name =
                    answers.name.indexOf('@') === 0
                        ? answers.name.split('/')[1]
                        : slug(answers.name)
                return `https://github.com/${slug(answers.username, {
                    maintainCase: true,
                })}/${name}`
            },
            validate: val => {
                return isURL(val) &&
                    val.indexOf('https://github.com/') === 0 &&
                    val.lastIndexOf('/') !== val.length - 1
                    ? true
                    : 'Please include a valid GitHub.com URL without a trailing slash'
            },
        },

        keywords: {
            message: 'Package keywords (comma/space separated):',
            default (answers) {
                return `${answers.name}`
            },
        },
    },

    data (answers) {
        return {
            eslint: answers.linting.find(el => el === 'eslint'),
            remark: answers.linting.find(el => el === 'remark'),
            stylelint: answers.linting.find(el => el === 'stylelint'),
        }
    },

    move (answers) {
        return {
            'common/.editorconfig': '.editorconfig',
            'common/.npmrc': '.npmrc',
            'common/.prettierignore': '.prettierignore',
            // We keep `.gitignore` as `gitignore` in the project
            // Because when it's published to npm
            // `.gitignore` file will be ignored!
            'common/gitignore': '.gitignore',
            'common/package': 'package.json',
            'common/README.md': 'README.md',
            'common/.eslint.js': answers.eslint ? '.eslintrc.js' : null,
            'common/.stylelintrc.json': answers.stylelint
                ? '.stylelintrc.json'
                : null,
        }
    },

    filters: answers => {
        return {
            // exclude MIT license from being copied
            LICENSE: 'license === "MIT"',
            // until this issue is resolved we need this line:
            // <https://github.com/saojs/sao/issues/59>
            'node_modules/**': false,
            'common/.eslint.js': answers.eslint,
            'common/.stylelintrc.json': answers.stylelint,
        }
    },

    post: async ctx => {
        ctx.gitInit()

        if (ctx.answers.pm === 'yarn') {
            // ctx.yarnInstall()
        } else {
            // ctx.npmInstall()
        }

        // create `LICENSE` file with license selected
        if (ctx.answers.license !== 'MIT') {
            try {
                fs.writeFileSync(
                    path.join(ctx.folderName, 'LICENSE'),
                    spdxLicenseList[ctx.answers.license].licenseText,
                )
                ctx.log.warn(
                    `You should update the ${ctx.chalk.yellow(
                        'LICENSE',
                    )} file accordingly (e.g. add your name/company/year)`,
                )
            } catch (err) {
                ctx.log.error(err)
            }
        }

        ctx.showTip()
    },
}
