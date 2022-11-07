import { expectType, expectAssignable, expectError } from 'tsd'

import setErrorClass from 'set-error-class'

const error = new Error('test')
expectAssignable<Error>(setErrorClass(error, Error))

setErrorClass(error, Error, '')
setErrorClass(error, TypeError, '')
class TestError extends Error {}
setErrorClass(error, TestError, '')

expectError(setErrorClass(error))
expectError(setErrorClass(error, 'Error'))
expectError(setErrorClass(error, Error, true))

expectAssignable<Error>(setErrorClass(null, Error))
expectType<true>(setErrorClass(error as Error & { prop: true }, Error).prop)
