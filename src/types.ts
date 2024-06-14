/**
 * Mutually exclusive states of promise - `pending`, `resolved` and `rejected`.
 * Governs how a promise will react to incoming calls to its `then` method.
 * @see https://tc39.es/ecma262/#sec-properties-of-the-promise-prototype-object
 */
enum PromiseState {
  PENDING = 'pending',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
}

/**
 * The `resolve` method passed to the executor.
 */
type Resolve<T> = (value: T) => void
/**
 * The `reject` method passed to the executor.
 */
type Reject = (reason?: unknown) => void

/**
 * The executor used to initialize a promise.
 */
type Executor<T> = (resolve: Resolve<T>, reject: Reject) => void

/**
 * An `onResolved` handler passed to `then`.
 */
type OnResolvedHandler<T, U = unknown> = (value: T) => U | Thenable<U>

/**
 * An `onRejected` handler passed to `then`.
 */
type OnRejectedHandler<U = unknown> = (reason: unknown) => U | Thenable<U>

/**
 * Handlers registered via calling `then()`.
 */
interface Handlers<T, U = unknown> {
  onResolved?: OnResolvedHandler<T, U>
  onRejected?: OnRejectedHandler<U>
}

/**
 * As long as an object implements `then()`,
 * no matter the detail about the implementation,
 * the object is considered to implement the `Thenable` interface.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#thenables
 */
interface Thenable<T> {
  then<U>(
    onResolved?: OnResolvedHandler<T, U>,
    onRejected?: OnRejectedHandler<U>,
  ): Thenable<U>
}

export type {
  Resolve,
  Reject,
  Executor,
  OnResolvedHandler,
  OnRejectedHandler,
  Handlers,
  Thenable,
}

export { PromiseState }
