export const updatePrototype = function (error, ErrorClass) {
  setPrototype(error, ErrorClass)
  fixConstructor(error, ErrorClass)
  fixName(error, ErrorClass)
}

const setPrototype = function (error, ErrorClass) {
  if (Object.getPrototypeOf(error) !== ErrorClass.prototype) {
    // eslint-disable-next-line fp/no-mutating-methods
    Object.setPrototypeOf(error, ErrorClass.prototype)
  }
}

const fixConstructor = function (error, ErrorClass) {
  if (error.constructor !== ErrorClass) {
    // eslint-disable-next-line fp/no-delete
    delete error.constructor
  }
}

const fixName = function (error, ErrorClass) {
  const prototypeName = getClassName(ErrorClass.prototype)

  if (
    prototypeName === error.name ||
    typeof prototypeName !== 'string' ||
    prototypeName === ''
  ) {
    return
  }

  // eslint-disable-next-line fp/no-delete
  delete error.name
}

const getClassName = function (prototype) {
  if (prototype === null) {
    return 'Error'
  }

  return typeof prototype.name === 'string' && prototype.name !== ''
    ? prototype.name
    : getClassName(Object.getPrototypeOf(prototype))
}
