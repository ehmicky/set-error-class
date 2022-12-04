import test from 'ava'
import { each } from 'test-each'

import setErrorClass from 'set-error-class'

test('Sets the prototype', (t) => {
  const error = new Error('test')
  t.false(error instanceof TypeError)
  setErrorClass(error, TypeError)
  t.true(error instanceof TypeError)
})

test('Keeps the prototype if equal', (t) => {
  const error = new TypeError('test')
  setErrorClass(error, TypeError)
  t.true(error instanceof TypeError)
})

test('Fix constructor shadowing', (t) => {
  const error = new Error('test')
  // eslint-disable-next-line no-self-assign
  error.constructor = error.constructor
  setErrorClass(error, TypeError)
  t.is(error.constructor, TypeError)
})

test('Fix name shadowing', (t) => {
  const error = new Error('test')
  // eslint-disable-next-line no-self-assign
  error.name = error.name
  setErrorClass(error, TypeError)
  t.is(error.name, TypeError.prototype.name)
})

test('Does not fix name shadowing if class has not changed', (t) => {
  const error = new TypeError('test')
  error.name = 'RangeError'
  setErrorClass(error, TypeError)
  t.is(error.name, 'RangeError')
})

each([undefined, true, ''], ({ title }, name) => {
  test(`Works with classes without a prototype name | ${title}`, (t) => {
    // eslint-disable-next-line fp/no-class
    class NoPrototypeNameError extends Error {}
    // eslint-disable-next-line fp/no-mutation
    NoPrototypeNameError.prototype.name = name

    const error = new Error('test')
    setErrorClass(error, NoPrototypeNameError)
    t.is(error.name, NoPrototypeNameError.name)
    t.false(Object.getOwnPropertyDescriptor(error, 'name').enumerable)
  })

  test(`Works with classes without a prototype nor constructor name | ${title}`, (t) => {
    // eslint-disable-next-line fp/no-class
    class NoNamesError extends RangeError {}

    // eslint-disable-next-line fp/no-mutating-methods
    Object.defineProperty(NoNamesError, 'name', {
      value: name,
      enumerable: false,
      writable: false,
      configurable: true,
    })

    const error = new TypeError('test')
    setErrorClass(error, NoNamesError)
    t.is(error.name, 'RangeError')
  })
})

test('Works with classes without a prototype name nor valid constructor', (t) => {
  // eslint-disable-next-line fp/no-class
  class NoValidConstructorError extends RangeError {}
  // eslint-disable-next-line fp/no-mutation
  NoValidConstructorError.prototype.constructor = null
  // eslint-disable-next-line fp/no-class
  class NoValidNameError extends NoValidConstructorError {}
  // eslint-disable-next-line fp/no-mutating-methods
  Object.defineProperty(NoValidNameError, 'name', {
    value: '',
    enumerable: false,
    writable: false,
    configurable: true,
  })

  const error = new TypeError('test')
  setErrorClass(error, NoValidNameError)
  t.is(error.name, 'RangeError')
})
