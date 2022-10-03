// Three states of a promise
export enum States {
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
type OnResolvedHandler<T, U = any> = (value: T) => U

// Rejected Handler passed to Then
type OnRejectedHandler<U = any> = (reason: any) => U

// Handlers passed to Then method
interface Handlers<T, U = any> {
  onResolved?: OnResolvedHandler<T, U>
  onRejected?: OnRejectedHandler<U>
}
