# quick-install
[![npm](https://img.shields.io/npm/v/quick-install.svg)](https://www.npmjs.com/package/quick-install)
[![CI Status](https://github.com/vinsonchuong/quick-install/workflows/CI/badge.svg)](https://github.com/vinsonchuong/quick-install/actions?query=workflow%3ACI)
[![dependencies Status](https://david-dm.org/vinsonchuong/quick-install/status.svg)](https://david-dm.org/vinsonchuong/quick-install)
[![devDependencies Status](https://david-dm.org/vinsonchuong/quick-install/dev-status.svg)](https://david-dm.org/vinsonchuong/quick-install?type=dev)

Quickly install the package you're working on for faster tests

`quick-install` aims to speed up automated tests during package development by
performing a fake package installation. Given a target directory, the package is
symlinked into its `node_modules` directory, and any executables (listed in the
`bin` field of `package.json`) are symlinked into `node_modules/.bin`

If run in a CI environment (detected via the presence of the `CI` environment
variable), `quick-install` will instead use `yarn add file:` to ensure correct
dependency resolution.

## Usage
Install [quick-install](https://www.npmjs.com/package/quick-install)
by running:

```sh
yarn add quick-install
```

Then use in your test cases as follows:

```js
import install from 'quick-install'

test('my package works', async t => {
  await install(process.cwd(), '/tmp/test-project')
})
```
