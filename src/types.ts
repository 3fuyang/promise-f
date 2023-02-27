/**
 * Three mutually exclusive states, `pending`, `resolved` and `rejected`.
 */
enum States {
  PENDING = 'pending',
  RESOLVED = 'resolved',
  REJECTED = 'rejected'
}

/**
 * The `resolve()` method passed to the executor.
 */
type Resolve<T> = (value: T) => void
/**
 * The `reject()` method passed to the executor.
 */
type Reject = (reason?: any) => void

/**
 * The executor passed to the `promise` constructor.
 */
type Executor<T> = (resolve: Resolve<T>, reject: Reject) => void

/**
 * An on-resolved handler passed to `then()`.
 */
type OnResolvedHandler<T, U = any> = (value: T) => U | Thenable<U>

/**
 * An on-rejected handler passed to `then()`.
 */
type OnRejectedHandler<U = any> = (reason: any) => U | Thenable<U>

/**
 * Handlers registered via the `then()` method.
 */
interface Handlers<T, U = any> {
  onResolved?: OnResolvedHandler<T, U>
  onRejected?: OnRejectedHandler<U>
}

/**
 * According to [ECMAScript spec](), as long as an object implements the `then()` method,
 * no matter the detail about the implementation,
 * it is considered to implement the `Thenable` interface.
 */
interface Thenable<T> {
  then<U>(
    onResolved?: OnResolvedHandler<T, U>,
    onRejected?: OnRejectedHandler<U>
  ): Thenable<U>
}

export type { Resolve, Reject, Executor, OnResolvedHandler, OnRejectedHandler, Handlers, Thenable }
export { States }
