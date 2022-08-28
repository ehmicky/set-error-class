import { setNonEnumProp } from './enum.js'

// Changes an error's prototype, `constructor` and `name`
export const updatePrototype = function (error, ErrorClass) {
  setPrototype(error, ErrorClass)
  deleteOwnProperty(error, 'constructor')
  fixName(error, ErrorClass)
}

// Change the error's `__proto__`.
// This ensures all properties are inherited.
// However, `error` will have been instantiated with a different constructor,
// which is a difference, especially if error properties are not copied.
const setPrototype = function (error, ErrorClass) {
  if (Object.getPrototypeOf(error) !== ErrorClass.prototype) {
    // eslint-disable-next-line fp/no-mutating-methods
    Object.setPrototypeOf(error, ErrorClass.prototype)
  }
}

// Ensure `error` has a valid `name`.
// In theory, it should be `ErrorClass.prototype.name`. However, this is not
// always available, so we default to:
//  - `ErrorClass.name`
//  - Any parent classes' `prototype.name` or `constructor.name`
//  - "Error"
// In general, it will be set on `ErrorClass.prototype.name`, so `error.name`
// will already be correct and we do not need to create an own property
// shadowing it.
const fixName = function (error, ErrorClass) {
  deleteOwnProperty(error, 'name')

  const prototypeName = getClassName(ErrorClass.prototype)

  if (error.name !== prototypeName) {
    setNonEnumProp(error, 'name', prototypeName)
  }
}

const getClassName = function (prototype) {
  if (prototype === null) {
    return 'Error'
  }

  const prototypeName = getObjectName(prototype)

  if (prototypeName !== undefined) {
    return prototypeName
  }

  const constructorName = getObjectName(prototype.constructor)

  if (constructorName !== undefined) {
    return constructorName
  }

  return getClassName(Object.getPrototypeOf(prototype))
}

const getObjectName = function (object) {
  return isObject(object) &&
    typeof object.name === 'string' &&
    object.name !== ''
    ? object.name
    : undefined
}

const isObject = function (value) {
  return typeof value === 'object' && value !== null
}

// Delete `error.constructor|name` to ensure it is not shadowing
// `error.__proto__.constructor|name`.
const deleteOwnProperty = function (error, propName) {
  if (isOwn.call(error, propName)) {
    // eslint-disable-next-line fp/no-delete
    delete error[propName]
  }
}

const { hasOwnProperty: isOwn } = Object.prototype
