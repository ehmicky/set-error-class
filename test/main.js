import test from 'ava'
import setErrorClass from 'set-error-class'
import { each } from 'test-each'

each([undefined, null, '', {}], ({ title }, notAnError) => {
  test(`Normalizes the error | ${title}`, (t) => {
    t.true(setErrorClass(notAnError, Error) instanceof Error)
  })
})

test('Returns the error', (t) => {
  const error = new Error('one')
  t.is(setErrorClass(error, Error), error)
})
