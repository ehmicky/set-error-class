import test from 'ava'
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
