# require-fallback-middle

[![Build status](https://img.shields.io/travis/imcuttle/require-fallback-middle/master.svg?style=flat-square)](https://travis-ci.org/imcuttle/require-fallback-middle)
[![Test coverage](https://img.shields.io/codecov/c/github/imcuttle/require-fallback-middle.svg?style=flat-square)](https://codecov.io/github/imcuttle/require-fallback-middle?branch=master)
[![NPM version](https://img.shields.io/npm/v/require-fallback-middle.svg?style=flat-square)](https://www.npmjs.com/package/require-fallback-middle)
[![NPM Downloads](https://img.shields.io/npm/dm/require-fallback-middle.svg?style=flat-square&maxAge=43200)](https://www.npmjs.com/package/require-fallback-middle)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://prettier.io/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)

> Module to fallback the Node.js require and require.resolve function

It's useful in global cli, Allow Node.js resolve module in `process.cwd()` (local modules) and global modules.

## Installation

```bash
npm install require-fallback-middle
# or use yarn
yarn add require-fallback-middle
```

## Usage

```javascript
import requireFallbackMiddle from 'require-fallback-middle'
import { isAbsolute } from 'path'

const { unhook } = requireFallbackMiddle()
```

## API

#### `requireFallbackMiddle(match: Match, fallbackDirs?: string[] | ((id: string, parent: Module, isMain: boolean) => string[]))`

- `match`: The registered module match
- `fallbackDirs`: The registered module match (Default: `(id, parent) => [process.cwd(), dirname(parent?.filename) || __dirname]`)

- **Returns:** [require-resolve-hook result](https://github.com/imcuttle/require-resolve-hook/#api)

## Contributing

- Fork it!
- Create your new branch:  
  `git checkout -b feature-new` or `git checkout -b fix-which-bug`
- Start your magic work now
- Make sure npm test passes
- Commit your changes:  
  `git commit -am 'feat: some description (close #123)'` or `git commit -am 'fix: some description (fix #123)'`
- Push to the branch: `git push`
- Submit a pull request :)

## Authors

This library is written and maintained by imcuttle, <a href="mailto:imcuttle@163.com">imcuttle@163.com</a>.

## License

MIT - [imcuttle](https://github.com/imcuttle) 🐟
