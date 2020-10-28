/**
 * @file main
 * @author imcuttle
 * @date 2018/4/4
 */

import requireFallbackMiddle, { bypass } from '../src'
import { fixture, nodeModules } from './helper'

import test from 'ava'

test('spec requireFallbackMiddle', function (t) {
  const { unhook } = requireFallbackMiddle((id) => !id.startsWith('.'), [fixture(''), nodeModules('')])
  t.is(require.resolve('react'), fixture('node_modules/react.js'))
  t.is(require.resolve('react'), fixture('node_modules/react.js'))

  t.is(require.resolve('foo'), nodeModules('node_modules/foo.js'))

  const error = t.throws(
    () => {
      require.resolve('foo-404')
    },
    { instanceOf: Error }
  )
  t.regex(error.message, /Cannot find module 'foo-404'/)

  unhook()

  const reactError = t.throws(
    () => {
      require.resolve('react')
    },
    { instanceOf: Error }
  )
  t.regex(reactError.message, /Cannot find module 'react'/)
})
