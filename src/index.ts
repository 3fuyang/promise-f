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
   * **2.3. The Promise Resolution Procedure**
   *
   * An abstract operation taking as input a promise and a value.
   * @param x The resolved value.
   * @see https://promisesaplus.com/#the-promise-resolution-procedure
   */
  private resolutionProcedure = (x: T | Thenable<T>) => {
    if (this.state !== PromiseState.PENDING) {
      return
    }

    /**
     * 2.3.1 If `promise` and `x` refer to the same object,
     * reject `promise` with a `TypeError` as the reason.
     * @see https://promisesaplus.com/#point-48
     */
    if (x === this) {
      return this.reject(new TypeError())
    }

    /**
     * 2.3.2 If `x` is a promise, adopt its state.
     * @see https://promisesaplus.com/#point-49
     */
    /** TODO: Must be `PromiseF` or just thenable? */
    /** TODO: Maybe this should be performed synchronously? */
    if (x instanceof PromiseF) {
      // Perform resolution procedure instantly
      if (x.getState() === PromiseState.RESOLVED) {
        return this.resolve(x.getValue())
      }
      if (x.getState() === PromiseState.REJECTED) {
        return this.reject(x.getReason())
      }
      // Defer the resolution procedure
      return x.then(this.resolve, this.reject)
    }

    /**
     * 2.3.3 If `x` is an object or function
     * @see https://promisesaplus.com/#point-53
     */
    if (isPossibleThenable(x)) {
      /**
       * 2.3.3.1 Let `then` be `x.then`
       * @see https://promisesaplus.com/#point-54
       */
      let then
      try {
        then = (x as Record<string, unknown>).then
      } catch (e) {
        /**
         * 2.3.3.2 If retrieving the property `x.then` results in a thrown exception `e`,
         * reject `promise` with `e` as the reason.
         * @see https://promisesaplus.com/#point-55
         */
        return this.reject(e)
      }

      /**
       * 2.3.3.3 If `then` is a function,
       * call it with `x` as `this`,
       * first argument `resolvePromise`,
       * and second argument `rejectPromise`
       * @see https://promisesaplus.com/#point-56
       */
      if (typeof then === 'function') {
        let called = false

        try {
          /**
           * 2.3.3.3.1 If/when `resolvePromise` is called with a value `y`, run `[[Resolve]](promise, y)`.
           * @see https://promisesaplus.com/#point-57
           */
          const resolvePromise = (y: T) => {
            if (called) {
              return
            }
            called = true
            this.resolutionProcedure(y)
          }
          /**
           * 2.3.3.3.2 If/when `rejectPromise` is called with a reason `r`, reject `promise` with `r`.
           * @see https://promisesaplus.com/#point-58
           */
          const rejectPromise = (r: unknown) => {
            if (called) {
              return
            }
            called = true
            this.reject(r)
          }

          return then.call(x, resolvePromise, rejectPromise)
        } catch (e) {
          if (called) {
            return
          }
          return this.reject(e)
        }
      }
    }

    /**
     * 2.3.4 If `x` is not an object or function, fulfill `promise` with `x`.
     * @see https://promisesaplus.com/#point-64
     */
    this.state = PromiseState.RESOLVED
    this.value = x as T

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
    if (this.state === PromiseState.PENDING) {
      return
    }

    if (this.state === PromiseState.RESOLVED) {
      this.handlers.forEach(({ onResolved }) => {
        onResolved && queueMicrotask(() => onResolved(this.value as T))
      })
    } else if (this.state === PromiseState.REJECTED) {
      this.handlers.forEach(({ onRejected }) => {
        onRejected && queueMicrotask(() => onRejected(this.reason))
      })
    }

    // Clear the handlers
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

  static resolve<R>(val: R | Thenable<R>) {
    return val instanceof PromiseF
      ? val
      : new PromiseF((resolve) => resolve(val))
  }

  static reject<U>(reason: unknown) {
    return new PromiseF<U>((_, reject) => reject(reason))
  }

  /**
   * Utility method to create a promise while exposing its settle methods.
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
