/**
 * @file helper
 */

const nps = require('path')

function fixture(...args: string[]) {
  return nps.join.apply(nps, [__dirname, 'fixture'].concat(args))
}

function nodeModules(...args: string[]) {
  return nps.join.apply(nps, [__dirname, 'vendor'].concat(args))
}

export { fixture, nodeModules }
