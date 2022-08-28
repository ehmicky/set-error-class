import { setNonEnumProp } from './enum.js'

export const updatePrototype = function (error, ErrorClass) {
  setPrototype(error, ErrorClass)
  deleteOwnProperty(error, 'constructor')
  fixName(error, ErrorClass)
}

const setPrototype = function (error, ErrorClass) {
  if (Object.getPrototypeOf(error) !== ErrorClass.prototype) {
    // eslint-disable-next-line fp/no-mutating-methods
    Object.setPrototypeOf(error, ErrorClass.prototype)
  }
}

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

const deleteOwnProperty = function (error, propName) {
  if (isOwn.call(error, propName)) {
    // eslint-disable-next-line fp/no-delete
    delete error[propName]
  }
}

const { hasOwnProperty: isOwn } = Object.prototype
