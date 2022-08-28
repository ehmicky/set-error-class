import { expectType, expectAssignable, expectError } from 'tsd'

import setErrorClass from './main.js'

const error = new Error('test')
expectAssignable<Error>(setErrorClass(error, Error))
setErrorClass(error, Error, '')

expectError(setErrorClass(error))
expectError(setErrorClass(error, 'Error'))
expectError(setErrorClass(error, Error, true))

expectAssignable<Error>(setErrorClass(null, Error))
expectType<true>(setErrorClass(error as Error & { prop: true }, Error).prop)
