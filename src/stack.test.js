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

test('Updates stack', (t) => {
  const error = new Error('one')
  error.stack = 'Error: one\nstackLines'
  setErrorClass(error, TypeError)
  t.is(error.stack, 'TypeError: one\nstackLines')
  t.false(Object.getOwnPropertyDescriptor(error, 'stack').enumerable)
})

each(
  [
    ['Error: one', 'TypeError: one'],
    ['one Error: one\nError: one', 'one Error: one\nTypeError: one'],
    ['Error Error: one', 'Error TypeError: one'],
    ['ErrorOne Error one', 'ErrorOne TypeError one'],
    ['ErrorOne', 'TypeErrorOne'],
  ],
  ({ title }, [from, to]) => {
    test(`Prevent injecting in stack header | ${title}`, (t) => {
      const error = new Error('one')
      error.stack = `${from}\nstackLines`
      setErrorClass(error, TypeError)
      t.is(error.stack, `${to}\nstackLines`)
    })
  },
)

each(['', 'Other', 'TypeError'], ({ title }, name) => {
  test(`Is a noop if current name cannot be found or has not changed | ${title}`, (t) => {
    const error = new Error('one')
    const { stack } = error
    t.is(setErrorClass(error, TypeError, name).stack, stack)
  })
})
