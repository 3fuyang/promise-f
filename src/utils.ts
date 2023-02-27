export const isFunction = (func: any) => typeof func === 'function'

export const isObject = (obj: any) =>
  obj && !Array.isArray(obj) && typeof obj === 'object'

export const isPossibleThenable = (obj: any) => isObject(obj) || isFunction(obj)
