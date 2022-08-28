import normalizeException from 'normalize-exception'

import { normalizeArgs } from './args.js'
import { updatePrototype } from './prototype.js'
import { updateStack } from './stack.js'

// Properly update an error's class
export default function setErrorClass(error, ErrorClass, currentName) {
  const errorA = normalizeException(error)
  const currentNameA = normalizeArgs(errorA, ErrorClass, currentName)
  updatePrototype(errorA, ErrorClass)
  updateStack(errorA, currentNameA)
  return errorA
}
