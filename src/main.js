import normalizeException from 'normalize-exception'

import { normalizeArgs } from './args.js'
import { getStack } from './stack.js'

// Properly update an error's class
export default function setErrorClass(error, ErrorClass, currentName) {
  const errorA = normalizeException(error)
  const currentNameA = normalizeArgs(errorA, ErrorClass, currentName)
  updatePrototype(errorA, ErrorClass)
  updateStack(errorA, ErrorClass, currentNameA)
  return errorA
}

// In some JavaScript engines, `error.stack` includes `error.name`, but is
// not updated when `error.name` is modified. This fixes this.
const updateStack = function (error, newMessage, currentMessage) {
  if (!SHOULD_UPDATE_STACK || newMessage === currentMessage) {
    return
  }

  const stack = getStack(error, newMessage, currentMessage)
  setNonEnumProp(error, 'stack', stack)
}

// Only V8 includes `error.name` in `error.stack`
const stackIncludesName = function () {
  // eslint-disable-next-line fp/no-class
  class StackError extends Error {}
  const descriptor = {
    value: EXAMPLE_NAME,
    enumerable: false,
    writable: true,
    configurable: true,
  }
  // eslint-disable-next-line fp/no-mutating-methods
  Object.defineProperty(StackError, 'name', descriptor)
  // eslint-disable-next-line fp/no-mutating-methods
  Object.defineProperty(StackError.prototype, 'name', descriptor)
  const { stack } = new StackError('')
  return typeof stack === 'string' && stack.includes(EXAMPLE_NAME)
}

const EXAMPLE_NAME = 'SetErrorClassError'
const SHOULD_UPDATE_STACK = stackIncludesName()

const setNonEnumProp = function (error, propName, value) {
  // eslint-disable-next-line fp/no-mutating-methods
  Object.defineProperty(error, propName, {
    value,
    enumerable: false,
    writable: true,
    configurable: true,
  })
}
