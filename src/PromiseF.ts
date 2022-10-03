import type { Executor, Resolve, Reject, OnResolvedHandler, OnRejectedHandler, Handlers } from './types'
import { States } from './types'

export class PromiseF<T> {
  private state: States = States.PENDING
  private value?: T
  private handlers: Handlers<T, any>[] = []

  private setResult = (value: any, state: States) => {
    if (this.state !== States.PENDING) {
      return
    }

    this.state = state
    this.value = value
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
  }

  private executeHandlers = () => {
    if (this.state === States.PENDING) {
      return
    }

    if (this.state === States.RESOLVED) {
      this.handlers.forEach(({ onResolved }) => {
        onResolved && onResolved(this.value!)
      })
    } else if (this.state === States.REJECTED) {
      this.handlers.forEach(({ onRejected }) => {
        onRejected && onRejected(this.value!)
      })
    }
  }

  public then<U>(onResolved?: OnResolvedHandler<T, U>, onRejected?: OnRejectedHandler<U>) {

    return new PromiseF<U | T>((resolve, reject) => {
      this.attachHandlers({
        onResolved: (result) => {
          if (typeof onResolved !== 'function') {
            return resolve(result)
          }

          try {
            return resolve(onResolved(result))
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
            return resolve(onRejected(reason))
          } catch (e) {
            return reject(e)
          }
        }
      })
    })
  }

  public catch(onRejected: OnRejectedHandler) {
    return this.then(undefined, onRejected)
  }
}