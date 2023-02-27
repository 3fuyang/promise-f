import type { Executor, Resolve, Reject, OnResolvedHandler, OnRejectedHandler, Handlers, Thenable } from './types'
import { States } from './types'
import { isPossibleThenable } from './utils'

export class PromiseF<T> {
  private state: States = States.PENDING
  /** The value or reason. */
  private value?: T
  /** Registered handlers. */
  private handlers: Handlers<T, any>[] = []

  /**
   * An abstract operation taking as input a promise and a value.
   * @param value The resolved value.
   * @see https://promisesaplus.com/#the-promise-resolution-procedure
   */
  private resolutionProcedure = (value: any) => {
    process.env.VITEST && console.log(`Calling resolutionProcedure(${value})...`)
    if (this.state !== States.PENDING) {
      process.env.VITEST && console.log('  Promise is already settled, return!')
      return
    }

    // promise returned by then() === value returned by onResolved or onRejected
    // reject the returned promise with TypeError
    if (value === this) {
      return this.reject(new TypeError())
    }

    // if the x is a promise, adopt its state and value
    if (value instanceof PromiseF) {
      return value.then(
        this.resolve,
        this.reject
      )
    }

    // if the x is an object or function
    if (isPossibleThenable(value)) {
      process.env.VITEST && console.log('  The returned value is Thenable, call its then() method, maybe recursively?')

      let then: (...args: any[]) => unknown
      try {
        // retrieve the property `x.then`
        then = value.then

        if (typeof then === 'function') {
          // call `x.then` with `x` as `this`, `resolvePromise` and `rejectPromise` as args
          return then.call(value, this.resolve, this.reject)
        }
      } catch (e: any) {
        return this.reject(e)
      }

    }

    this.state = States.RESOLVED
    this.value = value
    process.env.VITEST && console.log(`  Set the state to ${this.state} and the value to ${this.value}.`)

    this.executeHandlers()
  }

  private resolve: Resolve<T> = (value: T) => {
    this.resolutionProcedure(value)
  }

  private reject: Reject = (reason: any) => {
    this.thenableReject(reason)
  }

  private thenableReject = (reason: any) => {
    if (this.state !== States.PENDING) {
      return
    }

    this.state = States.REJECTED
    this.value = reason

    this.executeHandlers()
  }

  public constructor(executor: Executor<T>) {
    // executed the executor synchronously
    try {
      executor(this.resolve, this.reject)
    } catch (e: any) {
      this.reject(e)
    }
  }

  private attachHandlers = (handler: Handlers<T>) => {
    this.handlers.push(handler)

    this.executeHandlers()
  }

  private executeHandlers = () => {
    process.env.VITEST && console.log('Calling executeHandlers...')

    if (this.state === States.PENDING) {
      process.env.VITEST && console.log('  Promise is still pending, return!')
      return
    }

    if (this.state === States.RESOLVED) {
      process.env.VITEST && console.log('  Queue all the onResolved handlers to microtask!')
      this.handlers.forEach(({ onResolved }) => {
        process.env.VITEST && console.log('    An onResolvedHandler is queued.')
        onResolved && queueMicrotask(() => onResolved(this.value as T))
      })
    } else if (this.state === States.REJECTED) {
      process.env.VITEST && console.log('  Queue all the onRejected handlers to microtask!')
      this.handlers.forEach(({ onRejected }) => {
        process.env.VITEST && console.log('    An onRejectedHandler is queued.')
        onRejected && queueMicrotask(() => onRejected(this.value as any))
      })
    }

    process.env.VITEST && console.log('  All handlers of this promise are queued.')
    // Clear the handlers.
    this.handlers.length = 0
  }

  /**
   * Catch the deferred or asynchronous result.
   * @param onResolved Invoked when the source promise fulfilled with the value.
   * @param onRejected Invoked when the source promise rejected with the reason.
   */
  public then<U>(onResolved?: OnResolvedHandler<T, U>, onRejected?: OnRejectedHandler<U>) {
    process.env.VITEST && console.log('Calling then method...')

    const p = new PromiseF<U | T>((resolve, reject) => {
      // wrap the handlers according to the PRP
      this.attachHandlers({
        onResolved: (result) => {
          // If `onResolved` is not a function, it must be ignored.
          if (typeof onResolved !== 'function') {
            return resolve(result)
          }

          // if onResolved is a function, the status of the promise returned by then() is determined by the return value of the onResolved
          try {
            return resolve(onResolved(result) as U)
          } catch (e) {
            return reject(e)
          }
        },
        onRejected: (reason) => {
          // If `onRejected` is not a function, it must be ignored.
          if (typeof onRejected !== 'function') {
            return reject(reason)
          }

          try {
            // Notice we use resolve here for promise created by `then()`
            return resolve(onRejected(reason) as U)
          } catch (e) {
            return reject(e)
          }
        }
      })
      process.env.VITEST && console.log('  Handlers registered.')
    })

    return p
  }

  // catch() is just an alias of the onRejected in then()
  public catch(onRejected: OnRejectedHandler) {
    return this.then(undefined, onRejected)
  }

  public finally<N>(onSettled: OnRejectedHandler & OnResolvedHandler<N>) {
    return this.then(onSettled, onSettled)
  }

  static resolve<R>(val: R) {
    return val instanceof PromiseF ? val : new PromiseF((resolve) => resolve(val))
  }

  static reject<U>(reason: any) {
    return new PromiseF<U>((_, reject) => reject(reason))
  }
}