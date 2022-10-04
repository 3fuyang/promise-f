// Three states of a promise
enum States {
  PENDING = 'pending',
  RESOLVED = 'resolved',
  REJECTED = 'rejected'
}

// The resolve method called in the executor
type Resolve<T> = (value: T) => void
// The reject method called in the executor
type Reject = (reason?: any) => void

// Executor function passed to the constructor
type Executor<T> = (resolve: Resolve<T>, reject: Reject) => void

// Resolve Handler passed to Then
type OnResolvedHandler<T, U = any> = (value: T) => U | Thenable<U>

// Rejected Handler passed to Then
type OnRejectedHandler<U = any> = (reason: any) => U | Thenable<U>

// Handlers passed to Then method
interface Handlers<T, U = any> {
  onResolved?: OnResolvedHandler<T, U>
  onRejected?: OnRejectedHandler<U>
}

// According to ECMAScript spec, as long as an object implements the then method,
// no matter the detail about the implementation, this object is considered to implement the Thenable interface
interface Thenable<T> {
  then<U>(
    onResolved?: OnResolvedHandler<T, U>,
    onRejected?: OnRejectedHandler<U>
  ): Thenable<U>
}

export type { Resolve, Reject, Executor, OnResolvedHandler, OnRejectedHandler, Handlers, Thenable }
export { States }
