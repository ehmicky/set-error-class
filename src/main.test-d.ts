import { expectType, expectAssignable } from 'tsd'

import setErrorClass, { Options } from './main.js'

expectType<object>(setErrorClass(true))

setErrorClass(true, {})
expectAssignable<Options>({})
