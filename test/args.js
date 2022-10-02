import { runInNewContext } from 'vm'

import test from 'ava'
import setErrorClass from 'set-error-class'
import { each } from 'test-each'

const funcWithNullPrototype = function () {}
// eslint-disable-next-line fp/no-mutation
funcWithNullPrototype.prototype = null

// eslint-disable-next-line fp/no-class
class OddError extends Error {}
// eslint-disable-next-line fp/no-mutation
OddError.prototype.constructor = ''

each(
  [null, true, undefined, () => {}, funcWithNullPrototype, Set, OddError],
  ({ title }, notAClass) => {
    test(`Validate second argument is an error class | ${title}`, (t) => {
      t.throws(setErrorClass.bind(undefined, new Error('one'), notAClass))
    })
  },
)

// eslint-disable-next-line fp/no-class
class TestError extends Error {}

each(
  [
    Error,
    TypeError,
    runInNewContext('Error'),
    runInNewContext('TypeError'),
    TestError,
  ],
  ({ title }, ErrorClass) => {
    test(`Allows any error class | ${title}`, (t) => {
      t.notThrows(setErrorClass.bind(undefined, new Error('one'), ErrorClass))
    })
  },
)

each([null, true], ({ title }, notAName) => {
  test(`Validate third argument | ${title}`, (t) => {
    t.throws(setErrorClass.bind(undefined, new Error('one'), Error, notAName))
  })
})

test('Third argument can be specified', (t) => {
  const error = new Error('one')
  error.stack = 'TypeError: one'
  setErrorClass(error, RangeError, 'TypeError')
  t.is(error.stack, 'RangeError: one')
})

test('Third argument has a default value', (t) => {
  const error = new Error('one')
  error.stack = 'TypeError: one'
  error.name = 'TypeError'
  setErrorClass(error, RangeError)
  t.is(error.stack, 'RangeError: one')
})
