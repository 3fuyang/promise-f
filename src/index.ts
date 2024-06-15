import type {
  Executor,
  Handlers,
  OnRejectedHandler,
  OnResolvedHandler,
  Reject,
  Resolve,
  Thenable,
} from './types'
import { PromiseState } from './types'
import { isPossibleThenable } from './utils'

/**
 * A promise implementation following the [Promises/A+ spec](https://promisesaplus.com/).
 * @template T The type of the resolved value.
 */
export class PromiseF<T> {
  /** The intrinsic state of the promise. */
  private state: PromiseState = PromiseState.PENDING
  /** Stores value when resolved. */
  private value?: T
  /** Stores reason when rejected. */
  private reason?: unknown
  /** Registered handlers. */
  private handlers: Handlers<T, unknown>[] = []

  /** Hack the promise's state, used only under hood. */
  public getState() {
    return this.state
  }

  /** Hack the promise's value, used only under hood. */
  public getValue() {
    return this.value
  }

  /** Hack the promise's reason, used only under hood. */
  public getReason() {
    return this.reason
  }

  /**
   * An abstract operation taking as input a promise and a value.
   * @param value The resolved value.
   * @see https://promisesaplus.com/#the-promise-resolution-procedure
   */
  private resolutionProcedure = (value: T | Thenable<T>) => {
    process.env.VITEST &&
      console.log(`Calling resolutionProcedure(${value})...`)
    if (this.state !== PromiseState.PENDING) {
      process.env.VITEST && console.log('  Promise is already settled, return!')
      return
    }

    /**
     * If the derived promise and the value returned by `onResolved` or `onRejected`
     * refer to the same object,
     * reject the derived promise with a `TypeError`.
     * @see https://promisesaplus.com/#point-48
     */
    if (value === this) {
      return this.reject(new TypeError())
    }

    /**
     * If `x` is a promise, adopt its state and value.
     * @see https://promisesaplus.com/#point-49
     */
    /** TODO: Must be `PromiseF` or just thenable? */
    /** TODO: Maybe this should be performed synchronously? */
    if (value instanceof PromiseF) {
      if (value.getState() === PromiseState.RESOLVED) {
        return this.resolve(value.getValue())
      }
      if (value.getState() === PromiseState.REJECTED) {
        return this.reject(value.getReason())
      }
      return value.then(this.resolve, this.reject)
    }

    // If `x` is an object or function
    if (isPossibleThenable(value)) {
      process.env.VITEST &&
        console.log(
          '  The returned value is Thenable, call its then() method, maybe recursively?',
        )

      try {
        // Retrieve the property `x.then`
        const then = (value as Record<string, unknown>).then

        if (typeof then === 'function') {
          // call `x.then` with `x` as `this`, `resolvePromise` and `rejectPromise` as args
          return then.call(value, this.resolve, this.reject)
        }
      } catch (e) {
        return this.reject(e)
      }
    }

    this.state = PromiseState.RESOLVED
    this.value = value as T
    process.env.VITEST &&
      console.log(
        `  Set the state to ${this.state} and the value to ${this.value}.`,
      )

    this.executeHandlers()
  }

  private resolve: Resolve<T> = (value: T) => {
    this.resolutionProcedure(value)
  }

  private reject: Reject = (reason: unknown) => {
    this.thenableReject(reason)
  }

  private thenableReject = (reason: unknown) => {
    if (this.state !== PromiseState.PENDING) {
      return
    }

    this.state = PromiseState.REJECTED
    this.reason = reason

    this.executeHandlers()
  }

  public constructor(executor?: Executor<T>) {
    // Execute the `executor` synchronously
    try {
      executor?.(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }

  private attachHandlers = (handler: Handlers<T>) => {
    this.handlers.push(handler)

    this.executeHandlers()
  }

  private executeHandlers = () => {
    process.env.VITEST && console.log('Calling executeHandlers...')

    if (this.state === PromiseState.PENDING) {
      process.env.VITEST && console.log('  Promise is still pending, return!')
      return
    }

    if (this.state === PromiseState.RESOLVED) {
      process.env.VITEST &&
        console.log('  Queue all the onResolved handlers to microtask!')
      this.handlers.forEach(({ onResolved }) => {
        process.env.VITEST && console.log('    An onResolvedHandler is queued.')
        onResolved && queueMicrotask(() => onResolved(this.value as T))
      })
    } else if (this.state === PromiseState.REJECTED) {
      process.env.VITEST &&
        console.log('  Queue all the onRejected handlers to microtask!')
      this.handlers.forEach(({ onRejected }) => {
        process.env.VITEST && console.log('    An onRejectedHandler is queued.')
        onRejected && queueMicrotask(() => onRejected(this.reason))
      })
    }

    process.env.VITEST &&
      console.log('  All handlers of this promise are queued.')
    // Clear the handlers.
    this.handlers.length = 0
  }

  /**
   * Catch the deferred or asynchronous result.
   * @param onResolved Invoked when the source promise fulfilled with the value.
   * @param onRejected Invoked when the source promise rejected with the reason.
   */
  public then<U>(
    onResolved?: OnResolvedHandler<T, U>,
    onRejected?: OnRejectedHandler<U>,
  ) {
    process.env.VITEST && console.log('Calling then method...')

    const p = new PromiseF<U | T>((resolve, reject) => {
      // wrap the handlers according to the PRP
      this.attachHandlers({
        onResolved: (result) => {
          // If `onResolved` is not a function, it must be ignored.
          if (typeof onResolved !== 'function') {
            return resolve(result)
          }

          // if `onResolved` is a function, the status of the promise returned by then() is determined by the return value of the onResolved
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
            // Notice we use `resolve` here for promise created by `then`
            return resolve(onRejected(reason) as U)
          } catch (e) {
            return reject(e)
          }
        },
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
    return val instanceof PromiseF
      ? val
      : new PromiseF((resolve) => resolve(val))
  }

  static reject<U>(reason: unknown) {
    return new PromiseF<U>((_, reject) => reject(reason))
  }

  /**
   * Helper method to create a deferred promise.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers
   */
  static withResolvers<T>() {
    let resolve: Resolve<T>
    let reject: Reject

    const promise = new PromiseF<T>((res, rej) => {
      resolve = res
      reject = rej
    })

    return {
      promise,
      resolve: resolve!,
      reject: reject!,
    }
  }
}
