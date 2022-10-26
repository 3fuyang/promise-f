import type { Executor, Resolve, Reject, OnResolvedHandler, OnRejectedHandler, Handlers, Thenable } from './types'
import { States } from './types'
import { isThenable } from './utils'

export class PromiseF<T> {
  private state: States = States.PENDING
  private value?: T
  private handlers: Handlers<T, any>[] = []

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
        (val) => {
          this.resolve(val)
        },
        (err) => {
          this.reject(err)
        }
      )
    }

    // if the x is a thenable but a promise
    if (isThenable(value)) {
      process.env.VITEST && console.log('  The returned value is Thenable, call its then() method, maybe recursively?')

      // retrieve the property `x.then`
      let then: (...args: any[]) => unknown
      try {
        then = value.then
      } catch (e: any) {
        return this.reject(e)
      }

      // call `x.then` with `x` as `this`, `resolvePromise` and `rejectPromise` as args
      try {
        return then.call(value, this.resolve, this.reject)
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
        onResolved && queueMicrotask(() => onResolved(this.value!))
      })
    } else if (this.state === States.REJECTED) {
      process.env.VITEST && console.log('  Queue all the onRejected handlers to microtask!')
      this.handlers.forEach(({ onRejected }) => {
        process.env.VITEST && console.log('    An onResolvedHandler is queued.')
        onRejected && queueMicrotask(() => onRejected(this.value!))
      })
    }

    process.env.VITEST && console.log('  All handlers executed.')
    this.handlers.length = 0
  }

  // then: refer to the Promise Resolution Procedure (PRP)
  public then<U>(onResolved?: OnResolvedHandler<T, U>, onRejected?: OnRejectedHandler<U>) {

    process.env.VITEST && console.log('Calling then method...')
    const p = new PromiseF<U | T>((resolve, reject) => {
      // wrap the handlers according to the PRP
      this.attachHandlers({
        onResolved: (result) => {
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
          if (typeof onRejected !== 'function') {
            return reject(reason)
          }

          try {
            // Notice we use resolve here for promise created by then method
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
    return new PromiseF<U>((resolve, reject) => reject(reason))
  }
}