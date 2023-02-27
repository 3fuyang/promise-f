/// <reference path="./a-plus-test.d.ts" />
import promisesAplusTests, { type Adapter } from 'promises-aplus-tests'
import { PromiseF } from '../src'

const adapter: Adapter = {
  resolved: PromiseF.resolve as any,
  rejected: PromiseF.reject as any,
  deferred: () => {
    const p = new PromiseF(() => null)
    const { resolve, reject } = p as any
    return {
      promise: p,
      resolve,
      reject
    }
  }
}

promisesAplusTests(adapter, (err: any) => {
  console.log('\n', err)
})
