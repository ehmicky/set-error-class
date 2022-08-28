// We try to find the current message in `error.stack` and replace it.
// If we cannot find it, we insert it instead.
//  - This is a common situation when `error.message` was modified without
//    re-computing `error.stack`
//  - This ensures the next call to `set-error-message` will now find
//    `currentMessage`
// `error.stack` is not standard so we do not try to assume its format.
export const getStack = function ({ name, stack }, newMessage, currentMessage) {
  return currentMessage !== '' && stack.includes(currentMessage)
    ? replaceMessage({ name, stack, newMessage, currentMessage })
    : insertMessage(name, stack, newMessage)
}

// We only replace the first instance to prevent modifying the stack lines
// in case the message is also a file name present in those.
const replaceMessage = function ({ name, stack, newMessage, currentMessage }) {
  const replacers = getReplacers(name, newMessage, currentMessage)
  const [fromA, to] = replacers.find(([from]) => stack.includes(from))
  return stack.replace(fromA, to)
}

// We try a series of most to least specific patterns to prevent changing
// messages present in previews (e.g. from Node.js `--enable-source-maps`).
const getReplacers = function (name, newMessage, currentMessage) {
  return [
    [`${name}: ${currentMessage}`, `${name}: ${newMessage}`],
    [`: ${currentMessage}`, `: ${newMessage}`],
    [`\n${currentMessage}`, `\n${newMessage}`],
    [` ${currentMessage}`, ` ${newMessage}`],
    [currentMessage, newMessage],
  ]
}

const insertMessage = function (name, stack, newMessage) {
  const errorName = `${name}: `
  const newMessageA = `${newMessage.trimEnd()}\n`
  return stack.startsWith(errorName)
    ? stack.replace(errorName, `${errorName}${newMessageA}`)
    : `${errorName}${newMessageA}${stack}`
}
