import { setNonEnumProp } from './enum.js'

// In some JavaScript engines, `error.stack` includes `error.name`, but is
// not updated when `error.name` is modified. This fixes this.
export const updateStack = (error, currentName) => {
  if (!shouldUpdateStack(error, currentName)) {
    return
  }

  const stack = getStack(error, currentName)
  setNonEnumProp(error, 'stack', stack)
}

const shouldUpdateStack = (error, currentName) =>
  currentName !== error.name &&
  currentName !== '' &&
  error.stack.includes(currentName) &&
  stackIncludesName()

// Only V8 includes `error.name` in `error.stack`
const stackIncludesName = () => {
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

// We try to find the current name in `error.stack` and replace it.
// If we cannot find it, this is a noop.
//  - Unlike `error.message`, it is nice but not critical for the right
//    `error.name` to be included in the stack
// We only replace the first instance to prevent modifying the stack lines
// in case the `name` is also a filename present in those.
// `error.stack` is not standard so we do not try to assume its format.
const getStack = ({ name, stack }, currentName) => {
  if (stack.startsWith(`${currentName}: `)) {
    return stack.replace(currentName, name)
  }

  const replacers = getReplacers(currentName, name)
  const [fromA, to] = replacers.find(([from]) => stack.includes(from))
  return stack.replace(fromA, to)
}

// We try a series of most to least specific patterns to prevent changing
// error names present in previews (e.g. from Node.js `--enable-source-maps`).
const getReplacers = (currentName, newName) => [
  [`\n${currentName}: `, `\n${newName}: `],
  [`${currentName}: `, `${newName}: `],
  [`${currentName} `, `${newName} `],
  [currentName, newName],
]
