// Normalize and validate arguments.
// `currentName` is undocumented, and mostly meant for `merge-error-cause`.
export const normalizeArgs = function (
  error,
  ErrorClass,
  currentName = error.name,
) {
  validateErrorClass(ErrorClass)

  if (typeof currentName !== 'string') {
    throw new TypeError(`currentName must be a string: ${currentName}`)
  }

  return currentName
}

const validateErrorClass = function (ErrorClass) {
  if (!isClass(ErrorClass)) {
    throw new TypeError(`ErrorClass must be a class: ${ErrorClass}`)
  }

  if (!isErrorClass(ErrorClass.prototype)) {
    throw new TypeError(`ErrorClass must inherit from Error: ${ErrorClass}`)
  }

  if (!hasConstructor(ErrorClass)) {
    throw new TypeError(
      `ErrorClass must be have a valid constructor: ${ErrorClass}`,
    )
  }
}

const isClass = function (ErrorClass) {
  return (
    typeof ErrorClass === 'function' &&
    typeof ErrorClass.prototype === 'object' &&
    ErrorClass.prototype !== null
  )
}

// Works cross-realm
const isErrorClass = function (prototype) {
  return (
    prototype !== null &&
    (prototype.name === 'Error' ||
      isErrorClass(Object.getPrototypeOf(prototype)))
  )
}

const hasConstructor = function (ErrorClass) {
  return typeof ErrorClass.prototype.constructor === 'function'
}
