import test from 'ava'
import setErrorClass from 'set-error-class'
import { each } from 'test-each'

each(['one', undefined], ({ title }, stack) => {
  test.serial(
    `Only update error stack if engine includes name in it | ${title}`,
    (t) => {
      // eslint-disable-next-line fp/no-mutation
      Error.prepareStackTrace = () => stack

      const error = new Error('one')
      setErrorClass(error, TypeError)
      t.false(error.stack.includes('TypeError'))

      // eslint-disable-next-line fp/no-delete
      delete Error.prepareStackTrace
    },
  )
})
