

> promise-f@ aplus D:\github\promise-f
> ts-node ./tests/a-plus-test.ts



  2.1.2.1: When fulfilled, a promise: must not transition to any other state.
    √ already-fulfilled
    √ immediately-fulfilled
    √ eventually-fulfilled
    √ trying to fulfill then immediately reject
    √ trying to fulfill then reject, delayed
    √ trying to fulfill immediately then reject delayed

  2.1.3.1: When rejected, a promise: must not transition to any other state.
    √ already-rejected
    √ immediately-rejected
    √ eventually-rejected
    √ trying to reject then immediately fulfill
    √ trying to reject then fulfill, delayed
    √ trying to reject immediately then fulfill delayed

  2.2.1: Both `onFulfilled` and `onRejected` are optional arguments.
    2.2.1.1: If `onFulfilled` is not a function, it must be ignored.
      applied to a directly-rejected promise
        √ `onFulfilled` is `undefined`
        √ `onFulfilled` is `null`
        √ `onFulfilled` is `false`
        √ `onFulfilled` is `5`
        √ `onFulfilled` is an object
      applied to a promise rejected and then chained off of
        √ `onFulfilled` is `undefined`
        √ `onFulfilled` is `null`
        √ `onFulfilled` is `false`
        √ `onFulfilled` is `5`
        √ `onFulfilled` is an object
    2.2.1.2: If `onRejected` is not a function, it must be ignored.
      applied to a directly-fulfilled promise
        √ `onRejected` is `undefined`
        √ `onRejected` is `null`
        √ `onRejected` is `false`
        √ `onRejected` is `5`
        √ `onRejected` is an object
      applied to a promise fulfilled and then chained off of
        √ `onFulfilled` is `undefined`
        √ `onFulfilled` is `null`
        √ `onFulfilled` is `false`
        √ `onFulfilled` is `5`
        √ `onFulfilled` is an object

  2.2.2: If `onFulfilled` is a function,
    2.2.2.1: it must be called after `promise` is fulfilled, with `promise`’s fulfillment value as its first argument.
      √ already-fulfilled
      √ immediately-fulfilled
      √ eventually-fulfilled
    2.2.2.2: it must not be called before `promise` is fulfilled
      √ fulfilled after a delay
      √ never fulfilled
    2.2.2.3: it must not be called more than once.
      √ already-fulfilled
      √ trying to fulfill a pending promise more than once, immediately
      √ trying to fulfill a pending promise more than once, delayed
      √ trying to fulfill a pending promise more than once, immediately then delayed
      √ when multiple `then` calls are made, spaced apart in time
      √ when `then` is interleaved with fulfillment

  2.2.3: If `onRejected` is a function,
    2.2.3.1: it must be called after `promise` is rejected, with `promise`’s rejection reason as its first argument.
      √ already-rejected
      √ immediately-rejected
      √ eventually-rejected
    2.2.3.2: it must not be called before `promise` is rejected
      √ rejected after a delay
      √ never rejected
    2.2.3.3: it must not be called more than once.
      √ already-rejected
      √ trying to reject a pending promise more than once, immediately
      √ trying to reject a pending promise more than once, delayed
      √ trying to reject a pending promise more than once, immediately then delayed
      √ when multiple `then` calls are made, spaced apart in time
      √ when `then` is interleaved with rejection

  2.2.4: `onFulfilled` or `onRejected` must not be called until the execution context stack contains only platform code.
    `then` returns before the promise becomes fulfilled or rejected
      √ already-fulfilled
      √ immediately-fulfilled
      √ eventually-fulfilled
      √ already-rejected
      √ immediately-rejected
      √ eventually-rejected
    Clean-stack execution ordering tests (fulfillment case)
      √ when `onFulfilled` is added immediately before the promise is fulfilled
      √ when `onFulfilled` is added immediately after the promise is fulfilled
      √ when one `onFulfilled` is added inside another `onFulfilled`
      √ when `onFulfilled` is added inside an `onRejected`
      √ when the promise is fulfilled asynchronously
    Clean-stack execution ordering tests (rejection case)
      √ when `onRejected` is added immediately before the promise is rejected
      √ when `onRejected` is added immediately after the promise is rejected
      √ when `onRejected` is added inside an `onFulfilled`
      √ when one `onRejected` is added inside another `onRejected`
      √ when the promise is rejected asynchronously

  2.2.5 `onFulfilled` and `onRejected` must be called as functions (i.e. with no `this` value).
    strict mode
      √ fulfilled
      √ rejected
    sloppy mode
      √ fulfilled
      √ rejected

  2.2.6: `then` may be called multiple times on the same promise.
    2.2.6.1: If/when `promise` is fulfilled, all respective `onFulfilled` callbacks must execute in the order of their originating calls to `then`.
      multiple boring fulfillment handlers
        √ already-fulfilled
        √ immediately-fulfilled
        √ eventually-fulfilled
      multiple fulfillment handlers, one of which throws
        √ already-fulfilled
        √ immediately-fulfilled
        √ eventually-fulfilled
      results in multiple branching chains with their own fulfillment values
        √ already-fulfilled
        √ immediately-fulfilled
        √ eventually-fulfilled
      `onFulfilled` handlers are called in the original order
        √ already-fulfilled
        √ immediately-fulfilled
        √ eventually-fulfilled
        even when one handler is added inside another handler
          √ already-fulfilled
          √ immediately-fulfilled
          √ eventually-fulfilled
    2.2.6.2: If/when `promise` is rejected, all respective `onRejected` callbacks must execute in the order of their originating calls to `then`.
      multiple boring rejection handlers
        √ already-rejected
        √ immediately-rejected
        √ eventually-rejected
      multiple rejection handlers, one of which throws
        √ already-rejected
        √ immediately-rejected
        √ eventually-rejected
      results in multiple branching chains with their own fulfillment values
        √ already-rejected
        √ immediately-rejected
        √ eventually-rejected
      `onRejected` handlers are called in the original order
        √ already-rejected
        √ immediately-rejected
        √ eventually-rejected
        even when one handler is added inside another handler
          √ already-rejected
          √ immediately-rejected
          √ eventually-rejected

  2.2.7: `then` must return a promise: `promise2 = promise1.then(onFulfilled, onRejected)`
    √ is a promise
    2.2.7.1: If either `onFulfilled` or `onRejected` returns a value `x`, run the Promise Resolution Procedure `[[Resolve]](promise2, x)`
      √ see separate 3.3 tests
    2.2.7.2: If either `onFulfilled` or `onRejected` throws an exception `e`, `promise2` must be rejected with `e` as the reason.
      The reason is `undefined`
        √ already-fulfilled
        √ immediately-fulfilled
        √ eventually-fulfilled
        √ already-rejected
        √ immediately-rejected
        √ eventually-rejected
      The reason is `null`
        √ already-fulfilled
        √ immediately-fulfilled
        √ eventually-fulfilled
        √ already-rejected
        √ immediately-rejected
        √ eventually-rejected
      The reason is `false`
        √ already-fulfilled
        √ immediately-fulfilled
        √ eventually-fulfilled
        √ already-rejected
        √ immediately-rejected
        √ eventually-rejected
      The reason is `0`
        √ already-fulfilled
        √ immediately-fulfilled
        √ eventually-fulfilled
        √ already-rejected
        √ immediately-rejected
        √ eventually-rejected
      The reason is an error
        √ already-fulfilled
        √ immediately-fulfilled
        √ eventually-fulfilled
        √ already-rejected
        √ immediately-rejected
        √ eventually-rejected
      The reason is an error without a stack
        √ already-fulfilled
        √ immediately-fulfilled
        √ eventually-fulfilled
        √ already-rejected
        √ immediately-rejected
        √ eventually-rejected
      The reason is a date
        √ already-fulfilled
        √ immediately-fulfilled
        √ eventually-fulfilled
        √ already-rejected
        √ immediately-rejected
        √ eventually-rejected
      The reason is an object
        √ already-fulfilled
        √ immediately-fulfilled
        √ eventually-fulfilled
        √ already-rejected
        √ immediately-rejected
        √ eventually-rejected
      The reason is an always-pending thenable
        √ already-fulfilled
        √ immediately-fulfilled
        √ eventually-fulfilled
        √ already-rejected
        √ immediately-rejected
        √ eventually-rejected
      The reason is a fulfilled promise
        √ already-fulfilled
        √ immediately-fulfilled
        √ eventually-fulfilled
        √ already-rejected
        √ immediately-rejected
        √ eventually-rejected
      The reason is a rejected promise
        √ already-fulfilled
        √ immediately-fulfilled
        √ eventually-fulfilled
        √ already-rejected
        √ immediately-rejected
        √ eventually-rejected
    2.2.7.3: If `onFulfilled` is not a function and `promise1` is fulfilled, `promise2` must be fulfilled with the same value.
      `onFulfilled` is `undefined`
        √ already-fulfilled
        √ immediately-fulfilled
        √ eventually-fulfilled
      `onFulfilled` is `null`
        √ already-fulfilled
        √ immediately-fulfilled
        √ eventually-fulfilled
      `onFulfilled` is `false`
        √ already-fulfilled
        √ immediately-fulfilled
        √ eventually-fulfilled
      `onFulfilled` is `5`
        √ already-fulfilled
        √ immediately-fulfilled
        √ eventually-fulfilled
      `onFulfilled` is an object
        √ already-fulfilled
        √ immediately-fulfilled
        √ eventually-fulfilled
      `onFulfilled` is an array containing a function
        √ already-fulfilled
        √ immediately-fulfilled
        √ eventually-fulfilled
    2.2.7.4: If `onRejected` is not a function and `promise1` is rejected, `promise2` must be rejected with the same reason.
      `onRejected` is `undefined`
        √ already-rejected
        √ immediately-rejected
        √ eventually-rejected
      `onRejected` is `null`
        √ already-rejected
        √ immediately-rejected
        √ eventually-rejected
      `onRejected` is `false`
        √ already-rejected
        √ immediately-rejected
        √ eventually-rejected
      `onRejected` is `5`
        √ already-rejected
        √ immediately-rejected
        √ eventually-rejected
      `onRejected` is an object
        √ already-rejected
        √ immediately-rejected
        √ eventually-rejected
      `onRejected` is an array containing a function
        √ already-rejected
        √ immediately-rejected
        √ eventually-rejected

  2.3.1: If `promise` and `x` refer to the same object, reject `promise` with a `TypeError' as the reason.
    √ via return from a fulfilled promise
    √ via return from a rejected promise

  2.3.2: If `x` is a promise, adopt its state
    2.3.2.1: If `x` is pending, `promise` must remain pending until `x` is fulfilled or rejected.
      √ via return from a fulfilled promise
      √ via return from a rejected promise
    2.3.2.2: If/when `x` is fulfilled, fulfill `promise` with the same value.
      `x` is already-fulfilled
        √ via return from a fulfilled promise
        √ via return from a rejected promise
      `x` is eventually-fulfilled
        √ via return from a fulfilled promise
        √ via return from a rejected promise
    2.3.2.3: If/when `x` is rejected, reject `promise` with the same reason.
      `x` is already-rejected
        √ via return from a fulfilled promise
        √ via return from a rejected promise
      `x` is eventually-rejected
        √ via return from a fulfilled promise
        √ via return from a rejected promise

  2.3.3: Otherwise, if `x` is an object or function,
    2.3.3.1: Let `then` be `x.then`
      `x` is an object with null prototype
        1) via return from a fulfilled promise
        2) via return from a rejected promise
      `x` is an object with normal Object.prototype
        3) via return from a fulfilled promise
        4) via return from a rejected promise
      `x` is a function
        5) via return from a fulfilled promise
        6) via return from a rejected promise
    2.3.3.2: If retrieving the property `x.then` results in a thrown exception `e`, reject `promise` with `e` as the reason.
      `e` is `undefined`
        √ via return from a fulfilled promise
        √ via return from a rejected promise
      `e` is `null`
        √ via return from a fulfilled promise
        √ via return from a rejected promise
      `e` is `false`
        √ via return from a fulfilled promise
        √ via return from a rejected promise
      `e` is `0`
        √ via return from a fulfilled promise
        √ via return from a rejected promise
      `e` is an error
        √ via return from a fulfilled promise
        √ via return from a rejected promise
      `e` is an error without a stack
        √ via return from a fulfilled promise
        √ via return from a rejected promise
      `e` is a date
        √ via return from a fulfilled promise
        √ via return from a rejected promise
      `e` is an object
        √ via return from a fulfilled promise
        √ via return from a rejected promise
      `e` is an always-pending thenable
        √ via return from a fulfilled promise
        √ via return from a rejected promise
      `e` is a fulfilled promise
        √ via return from a fulfilled promise
        √ via return from a rejected promise
      `e` is a rejected promise
        √ via return from a fulfilled promise
        √ via return from a rejected promise
    2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise`
      Calls with `x` as `this` and two function arguments
        √ via return from a fulfilled promise
        √ via return from a rejected promise
      Uses the original value of `then`
        √ via return from a fulfilled promise
        √ via return from a rejected promise
      2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)`
        `y` is not a thenable
          `y` is `undefined`
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is `null`
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is `false`
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is `5`
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an object
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an array
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
        `y` is a thenable
          `y` is a synchronously-fulfilled custom thenable
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an asynchronously-fulfilled custom thenable
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is a synchronously-fulfilled one-time thenable
            `then` calls `resolvePromise` synchronously
              7) via return from a fulfilled promise
              8) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              9) via return from a fulfilled promise
              10) via return from a rejected promise
          `y` is a thenable that tries to fulfill twice
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is a thenable that fulfills but then throws
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an already-fulfilled promise
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an eventually-fulfilled promise
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is a synchronously-rejected custom thenable
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an asynchronously-rejected custom thenable
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is a synchronously-rejected one-time thenable
            `then` calls `resolvePromise` synchronously
              11) via return from a fulfilled promise
              12) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              13) via return from a fulfilled promise
              14) via return from a rejected promise
          `y` is a thenable that immediately throws in `then`
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an object with a throwing `then` accessor
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              15) via return from a fulfilled promise
              16) via return from a rejected promise
          `y` is an already-rejected promise
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an eventually-rejected promise
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
        `y` is a thenable for a thenable
          `y` is a synchronously-fulfilled custom thenable for a synchronously-fulfilled custom thenable
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is a synchronously-fulfilled custom thenable for an asynchronously-fulfilled custom thenable
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is a synchronously-fulfilled custom thenable for a synchronously-fulfilled one-time thenable
            `then` calls `resolvePromise` synchronously
              17) via return from a fulfilled promise
              18) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              19) via return from a fulfilled promise
              20) via return from a rejected promise
          `y` is a synchronously-fulfilled custom thenable for a thenable that tries to fulfill twice
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is a synchronously-fulfilled custom thenable for a thenable that fulfills but then throws
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is a synchronously-fulfilled custom thenable for an already-fulfilled promise
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is a synchronously-fulfilled custom thenable for an eventually-fulfilled promise
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is a synchronously-fulfilled custom thenable for a synchronously-rejected custom thenable
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is a synchronously-fulfilled custom thenable for an asynchronously-rejected custom thenable
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is a synchronously-fulfilled custom thenable for a synchronously-rejected one-time thenable
            `then` calls `resolvePromise` synchronously
              21) via return from a fulfilled promise
              22) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              23) via return from a fulfilled promise
              24) via return from a rejected promise
          `y` is a synchronously-fulfilled custom thenable for a thenable that immediately throws in `then`
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is a synchronously-fulfilled custom thenable for an object with a throwing `then` accessor
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is a synchronously-fulfilled custom thenable for an already-rejected promise
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is a synchronously-fulfilled custom thenable for an eventually-rejected promise
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an asynchronously-fulfilled custom thenable for a synchronously-fulfilled custom thenable
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an asynchronously-fulfilled custom thenable for an asynchronously-fulfilled custom thenable
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an asynchronously-fulfilled custom thenable for a synchronously-fulfilled one-time thenable
            `then` calls `resolvePromise` synchronously
              25) via return from a fulfilled promise
              26) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              27) via return from a fulfilled promise
              28) via return from a rejected promise
          `y` is an asynchronously-fulfilled custom thenable for a thenable that tries to fulfill twice
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an asynchronously-fulfilled custom thenable for a thenable that fulfills but then throws
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an asynchronously-fulfilled custom thenable for an already-fulfilled promise
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an asynchronously-fulfilled custom thenable for an eventually-fulfilled promise
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an asynchronously-fulfilled custom thenable for a synchronously-rejected custom thenable
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an asynchronously-fulfilled custom thenable for an asynchronously-rejected custom thenable
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an asynchronously-fulfilled custom thenable for a synchronously-rejected one-time thenable
            `then` calls `resolvePromise` synchronously
              29) via return from a fulfilled promise
              30) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              31) via return from a fulfilled promise
              32) via return from a rejected promise
          `y` is an asynchronously-fulfilled custom thenable for a thenable that immediately throws in `then`
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an asynchronously-fulfilled custom thenable for an object with a throwing `then` accessor
            `then` calls `resolvePromise` synchronously
              33) via return from a fulfilled promise
              34) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              35) via return from a fulfilled promise
              36) via return from a rejected promise
          `y` is an asynchronously-fulfilled custom thenable for an already-rejected promise
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an asynchronously-fulfilled custom thenable for an eventually-rejected promise
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is a synchronously-fulfilled one-time thenable for a synchronously-fulfilled custom thenable
            `then` calls `resolvePromise` synchronously
              37) via return from a fulfilled promise
              38) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              39) via return from a fulfilled promise
              40) via return from a rejected promise
          `y` is a synchronously-fulfilled one-time thenable for an asynchronously-fulfilled custom thenable
            `then` calls `resolvePromise` synchronously
              41) via return from a fulfilled promise
              42) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              43) via return from a fulfilled promise
              44) via return from a rejected promise
          `y` is a synchronously-fulfilled one-time thenable for a synchronously-fulfilled one-time thenable
            `then` calls `resolvePromise` synchronously
              45) via return from a fulfilled promise
              46) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              47) via return from a fulfilled promise
              48) via return from a rejected promise
          `y` is a synchronously-fulfilled one-time thenable for a thenable that tries to fulfill twice
            `then` calls `resolvePromise` synchronously
              49) via return from a fulfilled promise
              50) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              51) via return from a fulfilled promise
              52) via return from a rejected promise
          `y` is a synchronously-fulfilled one-time thenable for a thenable that fulfills but then throws
            `then` calls `resolvePromise` synchronously
              53) via return from a fulfilled promise
              54) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              55) via return from a fulfilled promise
              56) via return from a rejected promise
          `y` is a synchronously-fulfilled one-time thenable for an already-fulfilled promise
            `then` calls `resolvePromise` synchronously
              57) via return from a fulfilled promise
              58) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              59) via return from a fulfilled promise
              60) via return from a rejected promise
          `y` is a synchronously-fulfilled one-time thenable for an eventually-fulfilled promise
            `then` calls `resolvePromise` synchronously
              61) via return from a fulfilled promise
              62) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              63) via return from a fulfilled promise
              64) via return from a rejected promise
          `y` is a synchronously-fulfilled one-time thenable for a synchronously-rejected custom thenable
            `then` calls `resolvePromise` synchronously
              65) via return from a fulfilled promise
              66) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              67) via return from a fulfilled promise
              68) via return from a rejected promise
          `y` is a synchronously-fulfilled one-time thenable for an asynchronously-rejected custom thenable
            `then` calls `resolvePromise` synchronously
              69) via return from a fulfilled promise
              70) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              71) via return from a fulfilled promise
              72) via return from a rejected promise
          `y` is a synchronously-fulfilled one-time thenable for a synchronously-rejected one-time thenable
            `then` calls `resolvePromise` synchronously
              73) via return from a fulfilled promise
              74) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              75) via return from a fulfilled promise
              76) via return from a rejected promise
          `y` is a synchronously-fulfilled one-time thenable for a thenable that immediately throws in `then`
            `then` calls `resolvePromise` synchronously
              77) via return from a fulfilled promise
              78) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              79) via return from a fulfilled promise
              80) via return from a rejected promise
          `y` is a synchronously-fulfilled one-time thenable for an object with a throwing `then` accessor
            `then` calls `resolvePromise` synchronously
              81) via return from a fulfilled promise
              82) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              83) via return from a fulfilled promise
              84) via return from a rejected promise
          `y` is a synchronously-fulfilled one-time thenable for an already-rejected promise
            `then` calls `resolvePromise` synchronously
              85) via return from a fulfilled promise
              86) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              87) via return from a fulfilled promise
              88) via return from a rejected promise
          `y` is a synchronously-fulfilled one-time thenable for an eventually-rejected promise
            `then` calls `resolvePromise` synchronously
              89) via return from a fulfilled promise
              90) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              91) via return from a fulfilled promise
              92) via return from a rejected promise
          `y` is a thenable that tries to fulfill twice for a synchronously-fulfilled custom thenable
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is a thenable that tries to fulfill twice for an asynchronously-fulfilled custom thenable
            `then` calls `resolvePromise` synchronously
              93) via return from a fulfilled promise
              94) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              95) via return from a fulfilled promise
              96) via return from a rejected promise
          `y` is a thenable that tries to fulfill twice for a synchronously-fulfilled one-time thenable
            `then` calls `resolvePromise` synchronously
              97) via return from a fulfilled promise
              98) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              99) via return from a fulfilled promise
              100) via return from a rejected promise
          `y` is a thenable that tries to fulfill twice for a thenable that tries to fulfill twice
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is a thenable that tries to fulfill twice for a thenable that fulfills but then throws
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is a thenable that tries to fulfill twice for an already-fulfilled promise
            `then` calls `resolvePromise` synchronously
              101) via return from a fulfilled promise
              102) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              103) via return from a fulfilled promise
              104) via return from a rejected promise
          `y` is a thenable that tries to fulfill twice for an eventually-fulfilled promise
            `then` calls `resolvePromise` synchronously
              105) via return from a fulfilled promise
              106) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              107) via return from a fulfilled promise
              108) via return from a rejected promise
          `y` is a thenable that tries to fulfill twice for a synchronously-rejected custom thenable
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is a thenable that tries to fulfill twice for an asynchronously-rejected custom thenable
            `then` calls `resolvePromise` synchronously
              109) via return from a fulfilled promise
              110) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              111) via return from a fulfilled promise
              112) via return from a rejected promise
          `y` is a thenable that tries to fulfill twice for a synchronously-rejected one-time thenable
            `then` calls `resolvePromise` synchronously
              113) via return from a fulfilled promise
              114) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              115) via return from a fulfilled promise
              116) via return from a rejected promise
          `y` is a thenable that tries to fulfill twice for a thenable that immediately throws in `then`
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is a thenable that tries to fulfill twice for an object with a throwing `then` accessor
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is a thenable that tries to fulfill twice for an already-rejected promise
            `then` calls `resolvePromise` synchronously
              117) via return from a fulfilled promise
              118) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              119) via return from a fulfilled promise
              120) via return from a rejected promise
          `y` is a thenable that tries to fulfill twice for an eventually-rejected promise
            `then` calls `resolvePromise` synchronously
              121) via return from a fulfilled promise
              122) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              123) via return from a fulfilled promise
              124) via return from a rejected promise
          `y` is a thenable that fulfills but then throws for a synchronously-fulfilled custom thenable
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is a thenable that fulfills but then throws for an asynchronously-fulfilled custom thenable
            `then` calls `resolvePromise` synchronously
              125) via return from a fulfilled promise
              126) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              127) via return from a fulfilled promise
              128) via return from a rejected promise
          `y` is a thenable that fulfills but then throws for a synchronously-fulfilled one-time thenable
            `then` calls `resolvePromise` synchronously
              129) via return from a fulfilled promise
              130) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              131) via return from a fulfilled promise
              132) via return from a rejected promise
          `y` is a thenable that fulfills but then throws for a thenable that tries to fulfill twice
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is a thenable that fulfills but then throws for a thenable that fulfills but then throws
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is a thenable that fulfills but then throws for an already-fulfilled promise
            `then` calls `resolvePromise` synchronously
              133) via return from a fulfilled promise
              134) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              135) via return from a fulfilled promise
              136) via return from a rejected promise
          `y` is a thenable that fulfills but then throws for an eventually-fulfilled promise
            `then` calls `resolvePromise` synchronously
              137) via return from a fulfilled promise
              138) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              139) via return from a fulfilled promise
              140) via return from a rejected promise
          `y` is a thenable that fulfills but then throws for a synchronously-rejected custom thenable
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is a thenable that fulfills but then throws for an asynchronously-rejected custom thenable
            `then` calls `resolvePromise` synchronously
              141) via return from a fulfilled promise
              142) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              143) via return from a fulfilled promise
              144) via return from a rejected promise
          `y` is a thenable that fulfills but then throws for a synchronously-rejected one-time thenable
            `then` calls `resolvePromise` synchronously
              145) via return from a fulfilled promise
              146) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              147) via return from a fulfilled promise
              148) via return from a rejected promise
          `y` is a thenable that fulfills but then throws for a thenable that immediately throws in `then`
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is a thenable that fulfills but then throws for an object with a throwing `then` accessor
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is a thenable that fulfills but then throws for an already-rejected promise
            `then` calls `resolvePromise` synchronously
              149) via return from a fulfilled promise
              150) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              151) via return from a fulfilled promise
              152) via return from a rejected promise
          `y` is a thenable that fulfills but then throws for an eventually-rejected promise
            `then` calls `resolvePromise` synchronously
              153) via return from a fulfilled promise
              154) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              155) via return from a fulfilled promise
              156) via return from a rejected promise
          `y` is an already-fulfilled promise for a synchronously-fulfilled custom thenable
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an already-fulfilled promise for an asynchronously-fulfilled custom thenable
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an already-fulfilled promise for a synchronously-fulfilled one-time thenable
            `then` calls `resolvePromise` synchronously
              157) via return from a fulfilled promise
              158) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              159) via return from a fulfilled promise
              160) via return from a rejected promise
          `y` is an already-fulfilled promise for a thenable that tries to fulfill twice
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an already-fulfilled promise for a thenable that fulfills but then throws
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an already-fulfilled promise for an already-fulfilled promise
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an already-fulfilled promise for an eventually-fulfilled promise
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an already-fulfilled promise for a synchronously-rejected custom thenable
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an already-fulfilled promise for an asynchronously-rejected custom thenable
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an already-fulfilled promise for a synchronously-rejected one-time thenable
            `then` calls `resolvePromise` synchronously
              161) via return from a fulfilled promise
              162) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              163) via return from a fulfilled promise
              164) via return from a rejected promise
          `y` is an already-fulfilled promise for a thenable that immediately throws in `then`
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an already-fulfilled promise for an object with a throwing `then` accessor
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              165) via return from a fulfilled promise
              166) via return from a rejected promise
          `y` is an already-fulfilled promise for an already-rejected promise
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an already-fulfilled promise for an eventually-rejected promise
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an eventually-fulfilled promise for a synchronously-fulfilled custom thenable
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an eventually-fulfilled promise for an asynchronously-fulfilled custom thenable
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an eventually-fulfilled promise for a synchronously-fulfilled one-time thenable
            `then` calls `resolvePromise` synchronously
              167) via return from a fulfilled promise
              168) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              169) via return from a fulfilled promise
              170) via return from a rejected promise
          `y` is an eventually-fulfilled promise for a thenable that tries to fulfill twice
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an eventually-fulfilled promise for a thenable that fulfills but then throws
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an eventually-fulfilled promise for an already-fulfilled promise
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an eventually-fulfilled promise for an eventually-fulfilled promise
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an eventually-fulfilled promise for a synchronously-rejected custom thenable
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an eventually-fulfilled promise for an asynchronously-rejected custom thenable
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an eventually-fulfilled promise for a synchronously-rejected one-time thenable
            `then` calls `resolvePromise` synchronously
              171) via return from a fulfilled promise
              172) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              173) via return from a fulfilled promise
              174) via return from a rejected promise
          `y` is an eventually-fulfilled promise for a thenable that immediately throws in `then`
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an eventually-fulfilled promise for an object with a throwing `then` accessor
            `then` calls `resolvePromise` synchronously
              175) via return from a fulfilled promise
              176) via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              177) via return from a fulfilled promise
              178) via return from a rejected promise
          `y` is an eventually-fulfilled promise for an already-rejected promise
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
          `y` is an eventually-fulfilled promise for an eventually-rejected promise
            `then` calls `resolvePromise` synchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
            `then` calls `resolvePromise` asynchronously
              √ via return from a fulfilled promise
              √ via return from a rejected promise
      2.3.3.3.2: If/when `rejectPromise` is called with reason `r`, reject `promise` with `r`
        `r` is `undefined`
          `then` calls `rejectPromise` synchronously
            √ via return from a fulfilled promise
            √ via return from a rejected promise
          `then` calls `rejectPromise` asynchronously
            √ via return from a fulfilled promise
            √ via return from a rejected promise
        `r` is `null`
          `then` calls `rejectPromise` synchronously
            √ via return from a fulfilled promise
            √ via return from a rejected promise
          `then` calls `rejectPromise` asynchronously
            √ via return from a fulfilled promise
            √ via return from a rejected promise
        `r` is `false`
          `then` calls `rejectPromise` synchronously
            √ via return from a fulfilled promise
            √ via return from a rejected promise
          `then` calls `rejectPromise` asynchronously
            √ via return from a fulfilled promise
            √ via return from a rejected promise
        `r` is `0`
          `then` calls `rejectPromise` synchronously
            √ via return from a fulfilled promise
            √ via return from a rejected promise
          `then` calls `rejectPromise` asynchronously
            √ via return from a fulfilled promise
            √ via return from a rejected promise
        `r` is an error
          `then` calls `rejectPromise` synchronously
            √ via return from a fulfilled promise
            √ via return from a rejected promise
          `then` calls `rejectPromise` asynchronously
            √ via return from a fulfilled promise
            √ via return from a rejected promise
        `r` is an error without a stack
          `then` calls `rejectPromise` synchronously
            √ via return from a fulfilled promise
            √ via return from a rejected promise
          `then` calls `rejectPromise` asynchronously
            √ via return from a fulfilled promise
            √ via return from a rejected promise
        `r` is a date
          `then` calls `rejectPromise` synchronously
            √ via return from a fulfilled promise
            √ via return from a rejected promise
          `then` calls `rejectPromise` asynchronously
            √ via return from a fulfilled promise
            √ via return from a rejected promise
        `r` is an object
          `then` calls `rejectPromise` synchronously
            √ via return from a fulfilled promise
            √ via return from a rejected promise
          `then` calls `rejectPromise` asynchronously
            √ via return from a fulfilled promise
            √ via return from a rejected promise
        `r` is an always-pending thenable
          `then` calls `rejectPromise` synchronously
            √ via return from a fulfilled promise
            √ via return from a rejected promise
          `then` calls `rejectPromise` asynchronously
            √ via return from a fulfilled promise
            √ via return from a rejected promise
        `r` is a fulfilled promise
          `then` calls `rejectPromise` synchronously
            √ via return from a fulfilled promise
            √ via return from a rejected promise
          `then` calls `rejectPromise` asynchronously
            √ via return from a fulfilled promise
            √ via return from a rejected promise
        `r` is a rejected promise
          `then` calls `rejectPromise` synchronously
            √ via return from a fulfilled promise
            √ via return from a rejected promise
          `then` calls `rejectPromise` asynchronously
            √ via return from a fulfilled promise
            √ via return from a rejected promise
      2.3.3.3.3: If both `resolvePromise` and `rejectPromise` are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored.
        calling `resolvePromise` then `rejectPromise`, both synchronously
          √ via return from a fulfilled promise
          √ via return from a rejected promise
        calling `resolvePromise` synchronously then `rejectPromise` asynchronously
          √ via return from a fulfilled promise
          √ via return from a rejected promise
        calling `resolvePromise` then `rejectPromise`, both asynchronously
          √ via return from a fulfilled promise
          √ via return from a rejected promise
        calling `resolvePromise` with an asynchronously-fulfilled promise, then calling `rejectPromise`, both synchronously
          179) via return from a fulfilled promise
          180) via return from a rejected promise
        calling `resolvePromise` with an asynchronously-rejected promise, then calling `rejectPromise`, both synchronously
          181) via return from a fulfilled promise
          182) via return from a rejected promise
        calling `rejectPromise` then `resolvePromise`, both synchronously
          √ via return from a fulfilled promise
          √ via return from a rejected promise
        calling `rejectPromise` synchronously then `resolvePromise` asynchronously
          √ via return from a fulfilled promise
          √ via return from a rejected promise
        calling `rejectPromise` then `resolvePromise`, both asynchronously
          √ via return from a fulfilled promise
          √ via return from a rejected promise
        calling `resolvePromise` twice synchronously
          √ via return from a fulfilled promise
          √ via return from a rejected promise
        calling `resolvePromise` twice, first synchronously then asynchronously
          √ via return from a fulfilled promise
          √ via return from a rejected promise
        calling `resolvePromise` twice, both times asynchronously
          √ via return from a fulfilled promise
          √ via return from a rejected promise
        calling `resolvePromise` with an asynchronously-fulfilled promise, then calling it again, both times synchronously
          183) via return from a fulfilled promise
          184) via return from a rejected promise
        calling `resolvePromise` with an asynchronously-rejected promise, then calling it again, both times synchronously
          185) via return from a fulfilled promise
          186) via return from a rejected promise
        calling `rejectPromise` twice synchronously
          √ via return from a fulfilled promise
          √ via return from a rejected promise
        calling `rejectPromise` twice, first synchronously then asynchronously
          √ via return from a fulfilled promise
          √ via return from a rejected promise
        calling `rejectPromise` twice, both times asynchronously
          √ via return from a fulfilled promise
          √ via return from a rejected promise
        saving and abusing `resolvePromise` and `rejectPromise`
          √ via return from a fulfilled promise
          √ via return from a rejected promise
      2.3.3.3.4: If calling `then` throws an exception `e`,
        2.3.3.3.4.1: If `resolvePromise` or `rejectPromise` have been called, ignore it.
          `resolvePromise` was called with a non-thenable
            √ via return from a fulfilled promise
            √ via return from a rejected promise
          `resolvePromise` was called with an asynchronously-fulfilled promise
            187) via return from a fulfilled promise
            188) via return from a rejected promise
          `resolvePromise` was called with an asynchronously-rejected promise
            189) via return from a fulfilled promise
            190) via return from a rejected promise
          `rejectPromise` was called
            √ via return from a fulfilled promise
            √ via return from a rejected promise
          `resolvePromise` then `rejectPromise` were called
            √ via return from a fulfilled promise
            √ via return from a rejected promise
          `rejectPromise` then `resolvePromise` were called
            √ via return from a fulfilled promise
            √ via return from a rejected promise
        2.3.3.3.4.2: Otherwise, reject `promise` with `e` as the reason.
          straightforward case
            √ via return from a fulfilled promise
            √ via return from a rejected promise
          `resolvePromise` is called asynchronously before the `throw`
            √ via return from a fulfilled promise
            √ via return from a rejected promise
          `rejectPromise` is called asynchronously before the `throw`
            √ via return from a fulfilled promise
            √ via return from a rejected promise
    2.3.3.4: If `then` is not a function, fulfill promise with `x`
      `then` is `5`
        √ via return from a fulfilled promise
        √ via return from a rejected promise
      `then` is an object
        √ via return from a fulfilled promise
        √ via return from a rejected promise
      `then` is an array containing a function
        √ via return from a fulfilled promise
        √ via return from a rejected promise
      `then` is a regular expression
        √ via return from a fulfilled promise
        √ via return from a rejected promise
      `then` is an object inheriting from `Function.prototype`
        √ via return from a fulfilled promise
        √ via return from a rejected promise

  2.3.4: If `x` is not an object or function, fulfill `promise` with `x`
    The value is `undefined`
      √ already-fulfilled
      √ immediately-fulfilled
      √ eventually-fulfilled
      √ already-rejected
      √ immediately-rejected
      √ eventually-rejected
    The value is `null`
      √ already-fulfilled
      √ immediately-fulfilled
      √ eventually-fulfilled
      √ already-rejected
      √ immediately-rejected
      √ eventually-rejected
    The value is `false`
      √ already-fulfilled
      √ immediately-fulfilled
      √ eventually-fulfilled
      √ already-rejected
      √ immediately-rejected
      √ eventually-rejected
    The value is `true`
      √ already-fulfilled
      √ immediately-fulfilled
      √ eventually-fulfilled
      √ already-rejected
      √ immediately-rejected
      √ eventually-rejected
    The value is `0`
      √ already-fulfilled
      √ immediately-fulfilled
      √ eventually-fulfilled
      √ already-rejected
      √ immediately-rejected
      √ eventually-rejected
    The value is `true` with `Boolean.prototype` modified to have a `then` method
      √ already-fulfilled
      √ immediately-fulfilled
      √ eventually-fulfilled
      √ already-rejected
      √ immediately-rejected
      √ eventually-rejected
    The value is `1` with `Number.prototype` modified to have a `then` method
      √ already-fulfilled
      √ immediately-fulfilled
      √ eventually-fulfilled
      √ already-rejected
      √ immediately-rejected
      √ eventually-rejected


  682 passing (2m)
  190 failing

  1) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.1: Let `then` be `x.then` `x` is an object with null prototype via return from a fulfilled promise:
     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  2) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.1: Let `then` be `x.then` `x` is an object with null prototype via return from a rejected promise:
     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  3) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.1: Let `then` be `x.then` `x` is an object with normal Object.prototype via return from a fulfilled promise:
     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  4) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.1: Let `then` be `x.then` `x` is an object with normal Object.prototype via return from a rejected promise:
     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  5) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.1: Let `then` be `x.then` `x` is a function via return from a fulfilled promise:
     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  6) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.1: Let `then` be `x.then` `x` is a function via return from a rejected promise:
     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  7) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable `y` is a synchronously-fulfilled one-time thenable `then` calls `resolvePromise` synchronously via return from a fulfilled promise:
     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  8) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable `y` is a synchronously-fulfilled one-time thenable `then` calls `resolvePromise` synchronously via return from a rejected promise:
     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  9) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable `y` is a synchronously-fulfilled one-time thenable `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:
     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  10) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable `y` is a synchronously-fulfilled one-time thenable `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  11) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable `y` is a synchronously-rejected one-time thenable `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  12) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable `y` is a synchronously-rejected one-time thenable `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  13) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable `y` is a synchronously-rejected one-time thenable `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  14) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable `y` is a synchronously-rejected one-time thenable `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  15) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable `y` is an object with a throwing `then` accessor `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: the object {
  "sentinel": "sentinel"
  "uncaught": true
} was thrown, throw an Error :)
      at Runner.fail (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:226:11)
      at Runner.uncaught (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:695:8)
      at process.uncaught (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:778:10)
      at process.emit (node:events:525:35)
      at process.emit (node:domain:489:12)
      at process.emit.sharedData.processEmitHook.installedValue [as emit] (D:\github\promise-f\node_modules\.pnpm\@cspotcode+source-map-support@0.8.1\node_modules\@cspotcode\source-map-support\source-map-support.js:745:40)
      at process._fatalException (node:internal/process/execution:146:25)

  16) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable `y` is an object with a throwing `then` accessor `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: the object {
  "sentinel": "sentinel"
  "uncaught": true
} was thrown, throw an Error :)
      at Runner.fail (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:226:11)
      at Runner.uncaught (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:695:8)
      at process.uncaught (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:778:10)
      at process.emit (node:events:525:35)
      at process.emit (node:domain:489:12)
      at process.emit.sharedData.processEmitHook.installedValue [as emit] (D:\github\promise-f\node_modules\.pnpm\@cspotcode+source-map-support@0.8.1\node_modules\@cspotcode\source-map-support\source-map-support.js:745:40)
      at process._fatalException (node:internal/process/execution:146:25)

  17) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled custom thenable for a synchronously-fulfilled one-time thenable `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  18) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled custom thenable for a synchronously-fulfilled one-time thenable `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  19) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled custom thenable for a synchronously-fulfilled one-time thenable `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  20) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled custom thenable for a synchronously-fulfilled one-time thenable `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  21) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled custom thenable for a synchronously-rejected one-time thenable `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  22) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled custom thenable for a synchronously-rejected one-time thenable `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  23) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled custom thenable for a synchronously-rejected one-time thenable `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  24) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled custom thenable for a synchronously-rejected one-time thenable `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  25) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is an asynchronously-fulfilled custom thenable for a synchronously-fulfilled one-time thenable `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  26) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is an asynchronously-fulfilled custom thenable for a synchronously-fulfilled one-time thenable `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  27) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is an asynchronously-fulfilled custom thenable for a synchronously-fulfilled one-time thenable `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  28) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is an asynchronously-fulfilled custom thenable for a synchronously-fulfilled one-time thenable `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  29) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is an asynchronously-fulfilled custom thenable for a synchronously-rejected one-time thenable `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  30) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is an asynchronously-fulfilled custom thenable for a synchronously-rejected one-time thenable `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  31) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is an asynchronously-fulfilled custom thenable for a synchronously-rejected one-time thenable `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  32) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is an asynchronously-fulfilled custom thenable for a synchronously-rejected one-time thenable `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  33) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is an asynchronously-fulfilled custom thenable for an object with a throwing `then` accessor `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: the object {
  "sentinel": "sentinel"
  "uncaught": true
} was thrown, throw an Error :)
      at Runner.fail (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:226:11)
      at Runner.uncaught (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:695:8)
      at process.uncaught (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:778:10)
      at process.emit (node:events:525:35)
      at process.emit (node:domain:489:12)
      at process.emit.sharedData.processEmitHook.installedValue [as emit] (D:\github\promise-f\node_modules\.pnpm\@cspotcode+source-map-support@0.8.1\node_modules\@cspotcode\source-map-support\source-map-support.js:745:40)
      at process._fatalException (node:internal/process/execution:146:25)

  34) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is an asynchronously-fulfilled custom thenable for an object with a throwing `then` accessor `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: the object {
  "sentinel": "sentinel"
  "uncaught": true
} was thrown, throw an Error :)
      at Runner.fail (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:226:11)
      at Runner.uncaught (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:695:8)
      at process.uncaught (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:778:10)
      at process.emit (node:events:525:35)
      at process.emit (node:domain:489:12)
      at process.emit.sharedData.processEmitHook.installedValue [as emit] (D:\github\promise-f\node_modules\.pnpm\@cspotcode+source-map-support@0.8.1\node_modules\@cspotcode\source-map-support\source-map-support.js:745:40)
      at process._fatalException (node:internal/process/execution:146:25)

  35) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is an asynchronously-fulfilled custom thenable for an object with a throwing `then` accessor `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: the object {
  "sentinel": "sentinel"
  "uncaught": true
} was thrown, throw an Error :)
      at Runner.fail (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:226:11)
      at Runner.uncaught (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:695:8)
      at process.uncaught (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:778:10)
      at process.emit (node:events:525:35)
      at process.emit (node:domain:489:12)
      at process.emit.sharedData.processEmitHook.installedValue [as emit] (D:\github\promise-f\node_modules\.pnpm\@cspotcode+source-map-support@0.8.1\node_modules\@cspotcode\source-map-support\source-map-support.js:745:40)
      at process._fatalException (node:internal/process/execution:146:25)

  36) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is an asynchronously-fulfilled custom thenable for an object with a throwing `then` accessor `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: the object {
  "sentinel": "sentinel"
  "uncaught": true
} was thrown, throw an Error :)
      at Runner.fail (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:226:11)
      at Runner.uncaught (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:695:8)
      at process.uncaught (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:778:10)
      at process.emit (node:events:525:35)
      at process.emit (node:domain:489:12)
      at process.emit.sharedData.processEmitHook.installedValue [as emit] (D:\github\promise-f\node_modules\.pnpm\@cspotcode+source-map-support@0.8.1\node_modules\@cspotcode\source-map-support\source-map-support.js:745:40)
      at process._fatalException (node:internal/process/execution:146:25)

  37) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for a synchronously-fulfilled custom thenable `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  38) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for a synchronously-fulfilled custom thenable `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  39) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for a synchronously-fulfilled custom thenable `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  40) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for a synchronously-fulfilled custom thenable `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  41) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for an asynchronously-fulfilled custom thenable `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  42) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for an asynchronously-fulfilled custom thenable `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  43) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for an asynchronously-fulfilled custom thenable `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  44) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for an asynchronously-fulfilled custom thenable `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  45) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for a synchronously-fulfilled one-time thenable `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  46) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for a synchronously-fulfilled one-time thenable `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  47) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for a synchronously-fulfilled one-time thenable `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  48) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for a synchronously-fulfilled one-time thenable `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  49) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for a thenable that tries to fulfill twice `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  50) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for a thenable that tries to fulfill twice `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  51) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for a thenable that tries to fulfill twice `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  52) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for a thenable that tries to fulfill twice `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  53) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for a thenable that fulfills but then throws `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  54) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for a thenable that fulfills but then throws `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  55) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for a thenable that fulfills but then throws `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  56) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for a thenable that fulfills but then throws `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  57) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for an already-fulfilled promise `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  58) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for an already-fulfilled promise `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  59) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for an already-fulfilled promise `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  60) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for an already-fulfilled promise `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  61) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for an eventually-fulfilled promise `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  62) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for an eventually-fulfilled promise `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  63) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for an eventually-fulfilled promise `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  64) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for an eventually-fulfilled promise `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  65) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for a synchronously-rejected custom thenable `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  66) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for a synchronously-rejected custom thenable `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  67) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for a synchronously-rejected custom thenable `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  68) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for a synchronously-rejected custom thenable `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  69) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for an asynchronously-rejected custom thenable `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  70) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for an asynchronously-rejected custom thenable `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  71) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for an asynchronously-rejected custom thenable `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  72) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for an asynchronously-rejected custom thenable `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  73) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for a synchronously-rejected one-time thenable `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  74) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for a synchronously-rejected one-time thenable `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  75) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for a synchronously-rejected one-time thenable `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  76) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for a synchronously-rejected one-time thenable `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  77) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for a thenable that immediately throws in `then` `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  78) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for a thenable that immediately throws in `then` `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  79) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for a thenable that immediately throws in `then` `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  80) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for a thenable that immediately throws in `then` `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  81) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for an object with a throwing `then` accessor `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  82) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for an object with a throwing `then` accessor `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  83) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for an object with a throwing `then` accessor `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  84) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for an object with a throwing `then` accessor `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  85) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for an already-rejected promise `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  86) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for an already-rejected promise `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  87) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for an already-rejected promise `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  88) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for an already-rejected promise `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  89) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for an eventually-rejected promise `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  90) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for an eventually-rejected promise `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  91) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for an eventually-rejected promise `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  92) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a synchronously-fulfilled one-time thenable for an eventually-rejected promise `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  93) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that tries to fulfill twice for an asynchronously-fulfilled custom thenable `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  94) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that tries to fulfill twice for an asynchronously-fulfilled custom thenable `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  95) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that tries to fulfill twice for an asynchronously-fulfilled custom thenable `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  96) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that tries to fulfill twice for an asynchronously-fulfilled custom thenable `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  97) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that tries to fulfill twice for a synchronously-fulfilled one-time thenable `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  98) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that tries to fulfill twice for a synchronously-fulfilled one-time thenable `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  99) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that tries to fulfill twice for a synchronously-fulfilled one-time thenable `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  100) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that tries to fulfill twice for a synchronously-fulfilled one-time thenable `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  101) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that tries to fulfill twice for an already-fulfilled promise `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  102) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that tries to fulfill twice for an already-fulfilled promise `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  103) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that tries to fulfill twice for an already-fulfilled promise `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  104) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that tries to fulfill twice for an already-fulfilled promise `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  105) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that tries to fulfill twice for an eventually-fulfilled promise `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  106) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that tries to fulfill twice for an eventually-fulfilled promise `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  107) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that tries to fulfill twice for an eventually-fulfilled promise `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  108) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that tries to fulfill twice for an eventually-fulfilled promise `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  109) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that tries to fulfill twice for an asynchronously-rejected custom thenable `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  110) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that tries to fulfill twice for an asynchronously-rejected custom thenable `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  111) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that tries to fulfill twice for an asynchronously-rejected custom thenable `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  112) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that tries to fulfill twice for an asynchronously-rejected custom thenable `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  113) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that tries to fulfill twice for a synchronously-rejected one-time thenable `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  114) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that tries to fulfill twice for a synchronously-rejected one-time thenable `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  115) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that tries to fulfill twice for a synchronously-rejected one-time thenable `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  116) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that tries to fulfill twice for a synchronously-rejected one-time thenable `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  117) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that tries to fulfill twice for an already-rejected promise `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  118) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that tries to fulfill twice for an already-rejected promise `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  119) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that tries to fulfill twice for an already-rejected promise `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  120) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that tries to fulfill twice for an already-rejected promise `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  121) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that tries to fulfill twice for an eventually-rejected promise `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  122) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that tries to fulfill twice for an eventually-rejected promise `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  123) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that tries to fulfill twice for an eventually-rejected promise `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  124) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that tries to fulfill twice for an eventually-rejected promise `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  125) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that fulfills but then throws for an asynchronously-fulfilled custom thenable `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  126) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that fulfills but then throws for an asynchronously-fulfilled custom thenable `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  127) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that fulfills but then throws for an asynchronously-fulfilled custom thenable `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  128) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that fulfills but then throws for an asynchronously-fulfilled custom thenable `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  129) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that fulfills but then throws for a synchronously-fulfilled one-time thenable `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  130) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that fulfills but then throws for a synchronously-fulfilled one-time thenable `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  131) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that fulfills but then throws for a synchronously-fulfilled one-time thenable `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  132) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that fulfills but then throws for a synchronously-fulfilled one-time thenable `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  133) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that fulfills but then throws for an already-fulfilled promise `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  134) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that fulfills but then throws for an already-fulfilled promise `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  135) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that fulfills but then throws for an already-fulfilled promise `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  136) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that fulfills but then throws for an already-fulfilled promise `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  137) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that fulfills but then throws for an eventually-fulfilled promise `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  138) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that fulfills but then throws for an eventually-fulfilled promise `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  139) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that fulfills but then throws for an eventually-fulfilled promise `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  140) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that fulfills but then throws for an eventually-fulfilled promise `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  141) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that fulfills but then throws for an asynchronously-rejected custom thenable `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  142) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that fulfills but then throws for an asynchronously-rejected custom thenable `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  143) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that fulfills but then throws for an asynchronously-rejected custom thenable `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  144) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that fulfills but then throws for an asynchronously-rejected custom thenable `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  145) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that fulfills but then throws for a synchronously-rejected one-time thenable `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  146) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that fulfills but then throws for a synchronously-rejected one-time thenable `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  147) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that fulfills but then throws for a synchronously-rejected one-time thenable `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  148) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that fulfills but then throws for a synchronously-rejected one-time thenable `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  149) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that fulfills but then throws for an already-rejected promise `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  150) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that fulfills but then throws for an already-rejected promise `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  151) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that fulfills but then throws for an already-rejected promise `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  152) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that fulfills but then throws for an already-rejected promise `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  153) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that fulfills but then throws for an eventually-rejected promise `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  154) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that fulfills but then throws for an eventually-rejected promise `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  155) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that fulfills but then throws for an eventually-rejected promise `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  156) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that fulfills but then throws for an eventually-rejected promise `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  157) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is an already-fulfilled promise for a synchronously-fulfilled one-time thenable `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  158) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is an already-fulfilled promise for a synchronously-fulfilled one-time thenable `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  159) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is an already-fulfilled promise for a synchronously-fulfilled one-time thenable `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  160) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is an already-fulfilled promise for a synchronously-fulfilled one-time thenable `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  161) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is an already-fulfilled promise for a synchronously-rejected one-time thenable `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  162) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is an already-fulfilled promise for a synchronously-rejected one-time thenable `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  163) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is an already-fulfilled promise for a synchronously-rejected one-time thenable `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  164) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is an already-fulfilled promise for a synchronously-rejected one-time thenable `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  165) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is an already-fulfilled promise for an object with a throwing `then` accessor `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: the object {
  "sentinel": "sentinel"
  "uncaught": true
} was thrown, throw an Error :)
      at Runner.fail (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:226:11)
      at Runner.uncaught (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:695:8)
      at process.uncaught (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:778:10)
      at process.emit (node:events:525:35)
      at process.emit (node:domain:489:12)
      at process.emit.sharedData.processEmitHook.installedValue [as emit] (D:\github\promise-f\node_modules\.pnpm\@cspotcode+source-map-support@0.8.1\node_modules\@cspotcode\source-map-support\source-map-support.js:745:40)
      at process._fatalException (node:internal/process/execution:146:25)

  166) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is an already-fulfilled promise for an object with a throwing `then` accessor `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: the object {
  "sentinel": "sentinel"
  "uncaught": true
} was thrown, throw an Error :)
      at Runner.fail (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:226:11)
      at Runner.uncaught (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:695:8)
      at process.uncaught (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:778:10)
      at process.emit (node:events:525:35)
      at process.emit (node:domain:489:12)
      at process.emit.sharedData.processEmitHook.installedValue [as emit] (D:\github\promise-f\node_modules\.pnpm\@cspotcode+source-map-support@0.8.1\node_modules\@cspotcode\source-map-support\source-map-support.js:745:40)
      at process._fatalException (node:internal/process/execution:146:25)

  167) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is an eventually-fulfilled promise for a synchronously-fulfilled one-time thenable `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  168) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is an eventually-fulfilled promise for a synchronously-fulfilled one-time thenable `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  169) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is an eventually-fulfilled promise for a synchronously-fulfilled one-time thenable `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  170) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is an eventually-fulfilled promise for a synchronously-fulfilled one-time thenable `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  171) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is an eventually-fulfilled promise for a synchronously-rejected one-time thenable `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  172) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is an eventually-fulfilled promise for a synchronously-rejected one-time thenable `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  173) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is an eventually-fulfilled promise for a synchronously-rejected one-time thenable `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  174) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is an eventually-fulfilled promise for a synchronously-rejected one-time thenable `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  175) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is an eventually-fulfilled promise for an object with a throwing `then` accessor `then` calls `resolvePromise` synchronously via return from a fulfilled promise:

     Error: the object {
  "sentinel": "sentinel"
  "uncaught": true
} was thrown, throw an Error :)
      at Runner.fail (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:226:11)
      at Runner.uncaught (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:695:8)
      at process.uncaught (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:778:10)
      at process.emit (node:events:525:35)
      at process.emit (node:domain:489:12)
      at process.emit.sharedData.processEmitHook.installedValue [as emit] (D:\github\promise-f\node_modules\.pnpm\@cspotcode+source-map-support@0.8.1\node_modules\@cspotcode\source-map-support\source-map-support.js:745:40)
      at process._fatalException (node:internal/process/execution:146:25)

  176) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is an eventually-fulfilled promise for an object with a throwing `then` accessor `then` calls `resolvePromise` synchronously via return from a rejected promise:

     Error: the object {
  "sentinel": "sentinel"
  "uncaught": true
} was thrown, throw an Error :)
      at Runner.fail (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:226:11)
      at Runner.uncaught (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:695:8)
      at process.uncaught (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:778:10)
      at process.emit (node:events:525:35)
      at process.emit (node:domain:489:12)
      at process.emit.sharedData.processEmitHook.installedValue [as emit] (D:\github\promise-f\node_modules\.pnpm\@cspotcode+source-map-support@0.8.1\node_modules\@cspotcode\source-map-support\source-map-support.js:745:40)
      at process._fatalException (node:internal/process/execution:146:25)

  177) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is an eventually-fulfilled promise for an object with a throwing `then` accessor `then` calls `resolvePromise` asynchronously via return from a fulfilled promise:

     Error: the object {
  "sentinel": "sentinel"
  "uncaught": true
} was thrown, throw an Error :)
      at Runner.fail (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:226:11)
      at Runner.uncaught (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:695:8)
      at process.uncaught (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:778:10)
      at process.emit (node:events:525:35)
      at process.emit (node:domain:489:12)
      at process.emit.sharedData.processEmitHook.installedValue [as emit] (D:\github\promise-f\node_modules\.pnpm\@cspotcode+source-map-support@0.8.1\node_modules\@cspotcode\source-map-support\source-map-support.js:745:40)
      at process._fatalException (node:internal/process/execution:146:25)

  178) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is an eventually-fulfilled promise for an object with a throwing `then` accessor `then` calls `resolvePromise` asynchronously via return from a rejected promise:

     Error: the object {
  "sentinel": "sentinel"
  "uncaught": true
} was thrown, throw an Error :)
      at Runner.fail (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:226:11)
      at Runner.uncaught (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:695:8)
      at process.uncaught (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:778:10)
      at process.emit (node:events:525:35)
      at process.emit (node:domain:489:12)
      at process.emit.sharedData.processEmitHook.installedValue [as emit] (D:\github\promise-f\node_modules\.pnpm\@cspotcode+source-map-support@0.8.1\node_modules\@cspotcode\source-map-support\source-map-support.js:745:40)
      at process._fatalException (node:internal/process/execution:146:25)

  179) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.3: If both `resolvePromise` and `rejectPromise` are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored. calling `resolvePromise` with an asynchronously-fulfilled promise, then calling `rejectPromise`, both synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  180) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.3: If both `resolvePromise` and `rejectPromise` are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored. calling `resolvePromise` with an asynchronously-fulfilled promise, then calling `rejectPromise`, both synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  181) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.3: If both `resolvePromise` and `rejectPromise` are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored. calling `resolvePromise` with an asynchronously-rejected promise, then calling `rejectPromise`, both synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  182) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.3: If both `resolvePromise` and `rejectPromise` are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored. calling `resolvePromise` with an asynchronously-rejected promise, then calling `rejectPromise`, both synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  183) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.3: If both `resolvePromise` and `rejectPromise` are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored. calling `resolvePromise` with an asynchronously-fulfilled promise, then calling it again, both times synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  184) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.3: If both `resolvePromise` and `rejectPromise` are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored. calling `resolvePromise` with an asynchronously-fulfilled promise, then calling it again, both times synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  185) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.3: If both `resolvePromise` and `rejectPromise` are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored. calling `resolvePromise` with an asynchronously-rejected promise, then calling it again, both times synchronously via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  186) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.3: If both `resolvePromise` and `rejectPromise` are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored. calling `resolvePromise` with an asynchronously-rejected promise, then calling it again, both times synchronously via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  187) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.4: If calling `then` throws an exception `e`, 2.3.3.3.4.1: If `resolvePromise` or `rejectPromise` have been called, ignore it. `resolvePromise` was called with an asynchronously-fulfilled promise via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  188) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.4: If calling `then` throws an exception `e`, 2.3.3.3.4.1: If `resolvePromise` or `rejectPromise` have been called, ignore it. `resolvePromise` was called with an asynchronously-fulfilled promise via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  189) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.4: If calling `then` throws an exception `e`, 2.3.3.3.4.1: If `resolvePromise` or `rejectPromise` have been called, ignore it. `resolvePromise` was called with an asynchronously-rejected promise via return from a fulfilled promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)

  190) 2.3.3: Otherwise, if `x` is an object or function, 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.4: If calling `then` throws an exception `e`, 2.3.3.3.4.1: If `resolvePromise` or `rejectPromise` have been called, ignore it. `resolvePromise` was called with an asynchronously-rejected promise via return from a rejected promise:

     Error: timeout of 200ms exceeded. Ensure the done() callback is being called in this test.
      at Timeout.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runnable.js:226:19)
      at listOnTimeout (node:internal/timers:564:17)
      at processTimers (node:internal/timers:507:7)



 Error: Test suite failed with 190 failures.
    at D:\github\promise-f\node_modules\.pnpm\promises-aplus-tests@2.1.2\node_modules\promises-aplus-tests\lib\programmaticRunner.js:58:27
    at done (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\mocha.js:498:13)
    at Runner.<anonymous> (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:799:5)
    at Runner.emit (node:events:525:35)
    at Runner.emit (node:domain:489:12)
    at D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:786:12
    at D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:639:9
    at next (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:284:14)
    at Immediate._onImmediate (D:\github\promise-f\node_modules\.pnpm\mocha@2.5.3\node_modules\mocha\lib\runner.js:320:5)
    at processImmediate (node:internal/timers:471:21) {
  failures: 190
}