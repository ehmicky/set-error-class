import test from 'ava'
import setErrorClass from 'set-error-class'
import { each } from 'test-each'

// eslint-disable-next-line unicorn/no-null
each([null, true, undefined], ({ title }, notAClass) => {
  test(`Validate second argument | ${title}`, (t) => {
    t.throws(setErrorClass.bind(undefined, new Error('one'), notAClass))
  })
})

// eslint-disable-next-line unicorn/no-null
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
