type NormalizeError<ErrorArg> = ErrorArg extends Error ? ErrorArg : Error

/**
 *
 * @example
 * ```js
 * ```
 */
export default function setErrorClass<ErrorArg>(
  error: ErrorArg,
  ErrorClass: typeof Error,
  currentName?: string,
): NormalizeError<ErrorArg>
