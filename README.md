[![Codecov](https://img.shields.io/codecov/c/github/ehmicky/set-error-class.svg?label=tested&logo=codecov)](https://codecov.io/gh/ehmicky/set-error-class)
[![TypeScript](https://img.shields.io/badge/-typed-brightgreen?logo=typescript&colorA=gray&logoColor=0096ff)](/src/main.d.ts)
[![Node](https://img.shields.io/node/v/set-error-class.svg?logo=node.js&logoColor=66cc33)](https://www.npmjs.com/package/set-error-class)
[![Twitter](https://img.shields.io/badge/%E2%80%8B-twitter-brightgreen.svg?logo=twitter)](https://twitter.com/intent/follow?screen_name=ehmicky)
[![Medium](https://img.shields.io/badge/%E2%80%8B-medium-brightgreen.svg?logo=medium)](https://medium.com/@ehmicky)

Properly update an error's class.

# Features

- Sets an error's
  [prototype, name and constructor](#seterrorclasserror-errorclass-currentname)
- Update the [error's `stack`](#errorstack) with its new `name`
- Handles [invalid errors](#invalid-errors)

# Example

```js
import setErrorClass from 'set-error-class'

const typeError = new TypeError('test')
console.log(typeError instanceof TypeError) // true
console.log(typeError.name) // 'TypeError'
console.log(typeError.constructor) // TypeError
console.log(typeError.stack) // TypeError: test ...

const rangeError = setErrorClass(typeError, RangeError)
console.log(rangeError === typeError) // true
console.log(rangeError instanceof RangeError) // true
console.log(rangeError.name) // 'RangeError'
console.log(rangeError.constructor) // RangeError
console.log(rangeError.stack) // RangeError: test ...
```

# Install

```bash
npm install set-error-class
```

This package is an ES module and must be loaded using
[an `import` or `import()` statement](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c),
not `require()`.

# API

## setErrorClass(error, ErrorClass, currentName?)

`error` `Error | unknown`\
`ErrorClass` `typeof Error`\
`currentName` `string?`\
_Return value_: `Error`

Sets the `error`'s
[prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf),
[`name`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/name)
and
[`constructor`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor).

# Usage

## Invalid errors

`error` is returned. If `error` is not an `Error` instance, it is converted to
one.

## `error.stack`

In V8 (Chrome, Node.js, Deno, etc.),
[`error.stack`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack)
includes
[`error.name`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/message).
If `error.stack` contains `currentName` (which defaults to the current
`error.name`), it is replaced with the new `error.name`.

## Error constructors

`ErrorClass` is assigned to `error`, but its constructor is not called. In some
instances, this might lead to invalid errors. If `ErrorClass`'s constructor is
doing anything significant, that logic should be performed on `error` as well.

# Related projects

- [`modern-errors`](https://github.com/ehmicky/modern-errors): Handle errors
  like it's 2022 🔮
- [`modern-errors-plugins`](https://github.com/ehmicky/modern-errors-plugins):
  Plugins for `modern-errors`
- [`error-custom-class`](https://github.com/ehmicky/error-custom-class): Create
  one error class
- [`error-class-utils`](https://github.com/ehmicky/error-class-utils): Utilities
  to properly create error classes
- [`error-serializer`](https://github.com/ehmicky/error-serializer): Convert
  errors to/from plain objects
- [`normalize-exception`](https://github.com/ehmicky/normalize-exception):
  Normalize exceptions/errors
- [`set-error-message`](https://github.com/ehmicky/set-error-message): Properly
  update an error's message
- [`set-error-props`](https://github.com/ehmicky/set-error-props): Properly
  update an error's properties
- [`merge-error-cause`](https://github.com/ehmicky/merge-error-cause): Merge an
  error with its `cause`
- [`error-cause-polyfill`](https://github.com/ehmicky/error-cause-polyfill):
  Polyfill `error.cause`
- [`handle-cli-error`](https://github.com/ehmicky/handle-cli-error): 💣 Error
  handler for CLI applications 💥
- [`log-process-errors`](https://github.com/ehmicky/log-process-errors): Show
  some ❤ to Node.js process errors

# Support

For any question, _don't hesitate_ to [submit an issue on GitHub](../../issues).

Everyone is welcome regardless of personal background. We enforce a
[Code of conduct](CODE_OF_CONDUCT.md) in order to promote a positive and
inclusive environment.

# Contributing

This project was made with ❤️. The simplest way to give back is by starring and
sharing it online.

If the documentation is unclear or has a typo, please click on the page's `Edit`
button (pencil icon) and suggest a correction.

If you would like to help us fix a bug or add a new feature, please check our
[guidelines](CONTRIBUTING.md). Pull requests are welcome!

<!-- Thanks go to our wonderful contributors: -->

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- prettier-ignore -->
<!--
<table><tr><td align="center"><a href="https://twitter.com/ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4" width="100px;" alt="ehmicky"/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/set-error-class/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/set-error-class/commits?author=ehmicky" title="Documentation">📖</a></td></tr></table>
 -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
