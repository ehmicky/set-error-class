type NormalizeError<ErrorArg> = ErrorArg extends Error ? ErrorArg : Error

/**
 *
 * @example
 * ```js
 * ```
 */
export default function setErrorClass<ErrorArg>(
  error: ErrorArg,
  ErrorClass: Function,
  currentName?: string,
): NormalizeError<ErrorArg>
