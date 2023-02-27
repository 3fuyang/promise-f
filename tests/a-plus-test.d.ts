declare module 'promises-aplus-tests' {
  export = promisesAPlusTests

  function promisesAPlusTests(
    implementation: promisesAPlusTests.Adapter<any>,
    callback: promisesAPlusTests.Callback
  ): void
  function promisesAPlusTests(
    implementation: promisesAPlusTests.Adapter<any>,
    mochaOptions: any,
    callback: promisesAPlusTests.Callback
  ): void

  namespace promisesAPlusTests {
    export type Callback = (error_count: number) => void
    export type Tester = typeof promisesAPlusTests
    export type Adapter<T = any> = {
      resolved?: (value: T) => Promise<T>
      rejected?: (reason: any) => Promise<never>
      deferred: <T>() => Deferred<T>
    }
    export type Deferred<T = any> = {
      promise: Promise<T>
      resolve: (value: T) => void
      reject: (reason: any) => void
    }
    export function mocha(adapter: Adapter<any>): void
  }
}
