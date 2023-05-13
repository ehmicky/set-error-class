import { expectType, expectAssignable } from 'tsd'

import setErrorClass from 'set-error-class'

const error = new Error('test')
expectAssignable<Error>(setErrorClass(error, Error))

setErrorClass(error, Error)
setErrorClass(error, TypeError)
// eslint-disable-next-line fp/no-class
class TestError extends Error {}
setErrorClass(error, TestError)

// @ts-expect-error
setErrorClass(error)
// @ts-expect-error
setErrorClass(error, 'Error')
// @ts-expect-error
setErrorClass(error, () => new Error(''))
// @ts-expect-error
setErrorClass(error, Error, true)

expectAssignable<Error>(setErrorClass(null, Error))
expectType<true>(setErrorClass(error as Error & { prop: true }, Error).prop)
