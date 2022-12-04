import test from 'ava'
import { each } from 'test-each'

import setErrorClass from 'set-error-class'

each([undefined, null, '', {}], ({ title }, notAnError) => {
  test(`Normalizes the error | ${title}`, (t) => {
    t.true(setErrorClass(notAnError, Error) instanceof Error)
  })
})

test('Returns the error', (t) => {
  const error = new Error('one')
  t.is(setErrorClass(error, Error), error)
})
