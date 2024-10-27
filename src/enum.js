// `error.stack` and `error.name` are not enumerable
export const setNonEnumProp = (error, propName, value) => {
  Object.defineProperty(error, propName, {
    value,
    enumerable: false,
    writable: true,
    configurable: true,
  })
}
