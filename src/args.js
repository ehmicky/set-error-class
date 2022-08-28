// Normalize and validate arguments
export const normalizeArgs = function (
  error,
  ErrorClass,
  currentName = error.name,
) {
  if (typeof ErrorClass !== 'function') {
    throw new TypeError(`ErrorClass must be a class: ${ErrorClass}`)
  }

  if (!isErrorClass(ErrorClass)) {
    throw new TypeError(`ErrorClass must inherit from Error: ${ErrorClass}`)
  }

  if (typeof currentName !== 'string') {
    throw new TypeError(`currentName must be a string: ${currentName}`)
  }

  return currentName
}

const isErrorClass = function (ErrorClass) {
  return (
    ErrorClass !== null &&
    (ErrorClass.name === 'Error' ||
      isErrorClass(Object.getPrototypeOf(ErrorClass)))
  )
}
