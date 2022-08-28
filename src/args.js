// Normalize and validate arguments
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

  if (!isErrorClass(ErrorClass)) {
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

const isErrorClass = function (ErrorClass) {
  return (
    ErrorClass !== null &&
    (ErrorClass.name === 'Error' ||
      isErrorClass(Object.getPrototypeOf(ErrorClass)))
  )
}

const hasConstructor = function (ErrorClass) {
  return ErrorClass.prototype.constructor === ErrorClass
}
