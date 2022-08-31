[![Codecov](https://img.shields.io/codecov/c/github/ehmicky/set-error-class.svg?label=tested&logo=codecov)](https://codecov.io/gh/ehmicky/set-error-class)
[![TypeScript](https://img.shields.io/badge/-typed-brightgreen?logo=typescript&colorA=gray&logoColor=0096ff)](/src/main.d.ts)
[![Node](https://img.shields.io/node/v/set-error-class.svg?logo=node.js&logoColor=66cc33)](https://www.npmjs.com/package/set-error-class)
[![Twitter](https://img.shields.io/badge/%E2%80%8B-twitter-brightgreen.svg?logo=twitter)](https://twitter.com/intent/follow?screen_name=ehmicky)
[![Medium](https://img.shields.io/badge/%E2%80%8B-medium-brightgreen.svg?logo=medium)](https://medium.com/@ehmicky)

Properly update an error's class.

# Features

# Example

```js
import setErrorClass from 'set-error-class'

const typeError = new TypeError('test')
console.log(typeError instanceof TypeError) // true
console.log(typeError.stack) // TypeError: test ...

const rangeError = setErrorClass(typeError, RangeError)
console.log(rangeError === typeError) // true
console.log(rangeError instanceof RangeError) // true
console.log(rangeError.name) // 'RangeError'
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
`ErrorClass` `ErrorClass`\
`currentName` `string?`\
_Return value_: `Error`

Sets the `error`'s class:
[prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf),
[`name`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/name)
and
[`constructor`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor).

### Invalid errors

`error` is returned. If `error` is not an `Error` instance, it is converted to
one.

### `error.stack`

In V8 (Chrome, Node.js, Deno, etc.),
[`error.stack`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack)
includes
[`error.name`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/message).
However, if `error.name` is modified, `error.stack` might not be updated and
still contain the previous name.

This library ensures `error.stack` is updated accordingly. If `error.stack`
contains `currentName` (which defaults to the current `error.name`), it is
replaced by the new `error.name`.

### Error constructors

`ErrorClass` is assigned to `error`, but its constructor is not called. In some
instances, this might lead to invalid errors. If `ErrorClass`'s constructor is
doing anything significant, it should be replicated on `error` as well.

# Related projects

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
