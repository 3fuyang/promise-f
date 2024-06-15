declare module 'promises-aplus-tests' {
  export = promisesAPlusTests

  function promisesAPlusTests(
    implementation: promisesAPlusTests.Adapter,
    callback: promisesAPlusTests.Callback,
  ): void
  function promisesAPlusTests(
    implementation: promisesAPlusTests.Adapter,
    mochaOptions: Record<string, unknown>,
    callback: promisesAPlusTests.Callback,
  ): void

  namespace promisesAPlusTests {
    export type Callback = (error_count: number) => void
    export type Tester = typeof promisesAPlusTests
    export type Adapter<T = unknown> = {
      resolved?: (value: T) => Promise<T>
      rejected?: (reason: unknown) => Promise<never>
      deferred: <T>() => Deferred<T>
    }
    export type Deferred<T, P> = {
      promise: P<T>
      resolve: (value: T) => void
      reject: (reason: unknown) => void
    }
    export function mocha(adapter: Adapter): void
  }
}
