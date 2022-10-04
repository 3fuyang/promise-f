import type { Executor, Resolve, Reject, OnResolvedHandler, OnRejectedHandler, Handlers, Thenable } from './types'
import { States } from './types'
import { isThenable } from './utils'

export class PromiseF<T> {
  private state: States = States.PENDING
  private value?: T
  private handlers: Handlers<T, any>[] = []

  private setResult = (value: any, state: States) => {
    console.log(`Calling setResult(${value}, ${state})...`)
    if (this.state !== States.PENDING) {
      console.log('  Promise is already settled, return!')
      return
    }

    // if the returned value from onResolved or onRejected handlers is thenable
    // we need to handle it recursively to ensure it's settled
    if (isThenable(value)) {
      console.log('  The resolved value is Thenable, call its then() method recursively!')
      return (value as Thenable<T>).then(this.resolve, this.reject)
    }

    this.state = state
    this.value = value
    console.log(`  Set the state to ${this.state} and the value to ${this.value}.`)

    this.executeHandlers()
  }

  private resolve: Resolve<T> = (value: T) => {
    this.setResult(value, States.RESOLVED)
  }

  private reject: Reject = (reason: any) => {
    this.setResult(reason, States.REJECTED)
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
    console.log('Calling executeHandlers...')

    if (this.state === States.PENDING) {
      console.log('  Promise is still pending, return!')
      return
    }

    if (this.state === States.RESOLVED) {
      console.log('  Queue all the onResolved handlers to microtask!')
      this.handlers.forEach(({ onResolved }) => {
        console.log('    An onResolvedHandler is queued.')
        onResolved && queueMicrotask(() => onResolved(this.value!))
      })
    } else if (this.state === States.REJECTED) {
      console.log('  Queue all the onRejected handlers to microtask!')
      this.handlers.forEach(({ onRejected }) => {
        console.log('    An onResolvedHandler is queued.')
        onRejected && queueMicrotask(() => onRejected(this.value!))
      })
    }

    console.log('  All handlers executed.')
    this.handlers.length = 0
  }

  // then: refer to the Promise Resolution Procedure (PRP)
  public then<U>(onResolved?: OnResolvedHandler<T, U>, onRejected?: OnRejectedHandler<U>) {

    console.log('Calling then method...')
    return new PromiseF<U | T>((resolve, reject) => {
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
      console.log('  Handlers registered.')
    })
  }

  // catch() is just an alias of the onRejected in then()
  public catch(onRejected: OnRejectedHandler) {
    return this.then(undefined, onRejected)
  }
}