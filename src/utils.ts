export const isFunction = (func: unknown) => typeof func === 'function'

export const isObject = (obj: unknown) =>
  obj && !Array.isArray(obj) && typeof obj === 'object'

export const isPossibleThenable = (obj: unknown) => isObject(obj) || isFunction(obj)
