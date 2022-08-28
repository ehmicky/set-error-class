import test from 'ava'
import setErrorClass from 'set-error-class'

test('Sets the class', (t) => {
  const error = new Error('test')
  t.false(error instanceof TypeError)
  setErrorClass(error, TypeError)
  t.true(error instanceof TypeError)
})
